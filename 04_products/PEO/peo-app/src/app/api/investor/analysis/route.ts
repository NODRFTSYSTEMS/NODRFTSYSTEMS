import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionContext } from "@/lib/auth/session";
import { requireRole, INVESTOR_ROLES } from "@/lib/auth/rbac";
import { lintEventPayload } from "@/lib/events/pii-lint";
import { runInvestorAnalysis, filterInvestorResponse } from "@/lib/investor/engine";
import { fetchPropertyFacts, fetchSoldComps, fetchActiveListings } from "@/lib/property-data/stub";
import { calculateInvestorDeal, calculateVerifiedArv, calculateMarketArv, calculateCompQualityScore, calculateInvestorAdvancedDeal } from "@/lib/formulas";
import { runTriage } from "@/lib/triage/engine";
import type { Prisma } from "@prisma/client";

const createSchema = z.object({
  address: z.string().min(1),
  purchasePrice: z.coerce.number().min(0),
  arv: z.coerce.number().min(0),
  repairs: z.coerce.number().min(0),
  holdMonths: z.coerce.number().min(0).default(6),
  purchaseClosingRate: z.coerce.number().min(0).default(0.02),
  dispositionCostRate: z.coerce.number().min(0).default(0.09),
  annualInterestRate: z.coerce.number().min(0).default(0.12),
  pointsRate: z.coerce.number().min(0).default(0.02),
  // Advanced fields
  monthlyRent: z.coerce.number().min(0).optional(),
  operatingExpenseRate: z.coerce.number().min(0).optional(),
  refiLtv: z.coerce.number().min(0).optional(),
  refiInterestRate: z.coerce.number().min(0).optional(),
  refiTermYears: z.coerce.number().min(0).optional(),
  contractPrice: z.coerce.number().min(0).optional(),
  cashInvested: z.coerce.number().min(0).optional(),
  rehabItems: z.array(z.object({
    category: z.string(),
    description: z.string(),
    quantity: z.coerce.number().min(0),
    unitCost: z.coerce.number().min(0),
    regionalMultiplier: z.coerce.number().optional(),
  })).optional(),
  globalRegionalMultiplier: z.coerce.number().min(0).optional(),
  activeKillSwitches: z.array(z.string()).optional().default([]),
  investorProfile: z.enum(["conservative", "balanced", "aggressive"]).optional().default("balanced"),
});

const isDevBypass = process.env.NODE_ENV === "development" && process.env.ENABLE_DEV_BYPASS === "true";

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionContext();
    if (!session || !requireRole(session.role, INVESTOR_ROLES)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // PII lint skipped in dev bypass for local testing
    if (!isDevBypass) {
      const lint = lintEventPayload(body);
      if (!lint.clean) {
        return NextResponse.json(
          { error: "PII detected in payload", violations: lint.violations },
          { status: 400 }
        );
      }
    }
    const isAdvanced = session.role === "investor_elite" || session.role === "admin_internal";

    // Dev bypass: skip database, compute directly
    if (isDevBypass) {
      const [propertyFacts, soldComps, activeListings] = await Promise.all([
        fetchPropertyFacts(data.address),
        fetchSoldComps(data.address),
        fetchActiveListings(data.address),
      ]);

      const verifiedArv = calculateVerifiedArv(soldComps);
      const marketArv = calculateMarketArv(activeListings);
      const compQualityScore = soldComps.length > 0
        ? soldComps.reduce((sum, c) => sum + calculateCompQualityScore(c, propertyFacts), 0) / soldComps.length
        : 0;

      const baseInputs = {
        purchasePrice: data.purchasePrice,
        arv: data.arv,
        repairs: data.repairs,
        holdMonths: data.holdMonths,
        purchaseClosingRate: data.purchaseClosingRate,
        dispositionCostRate: data.dispositionCostRate,
        annualInterestRate: data.annualInterestRate,
        pointsRate: data.pointsRate,
        activeKillSwitches: data.activeKillSwitches as import("@/lib/formulas/types").KillSwitchId[],
        investorProfile: data.investorProfile as import("@/lib/formulas/types").InvestorProfile,
      };

      const advancedInputs = isAdvanced ? {
        ...baseInputs,
        monthlyRent: data.monthlyRent ?? 0,
        operatingExpenseRate: data.operatingExpenseRate ?? 0,
        refiLtv: data.refiLtv ?? 0,
        refiInterestRate: data.refiInterestRate ?? 0,
        refiTermYears: data.refiTermYears ?? 0,
        contractPrice: data.contractPrice ?? 0,
        cashInvested: data.cashInvested ?? 0,
        rehabItems: data.rehabItems ?? [],
        globalRegionalMultiplier: data.globalRegionalMultiplier ?? 1,
      } : undefined;

      const inputsForPass = advancedInputs ?? baseInputs;
      const baseDealForPass = isAdvanced && advancedInputs
        ? calculateInvestorAdvancedDeal(advancedInputs)
        : calculateInvestorDeal(baseInputs, "HIGH");

      const triageResult = runTriage({
        addressConfirmed: true,
        hasPropertyFacts: !!propertyFacts,
        expectedSalePrice: verifiedArv,
        missingUploads: 0,
        data: {
          primarySource: true,
          noMaterialConflicts: true,
          dataAgeDays: 15,
          secondarySource: false,
          materialConflictsResolved: true,
          estimatedFields: 0,
        },
        comp: {
          qualifiedCompCount: soldComps.length,
          sameSubdivisionCompCount: 1,
          radiusMiles: 0.5,
          compQualityScore,
          timeAdjustmentRequired: false,
        },
        valuation: {
          valueRangePercent: 12,
          strongCompSupport: soldComps.length >= 3,
          recentMarketActivity: true,
          limitedMarketActivity: false,
        },
        model: {
          allFormulasExecuted: true,
          defaultsTriggered: 0,
          overrideEvents: 0,
          keyAssumptionsConfirmed: true,
        },
        pass: {
          canGeocodeAddress: true,
          propertyTypeReconcilable: true,
          expectedProfit: baseDealForPass.profit,
          roi: baseDealForPass.roi,
          stressProfit: baseDealForPass.stressProfit,
          requiredProfitFloor: baseDealForPass.requiredProfit,
        },
      });

      const investorOutputs = isAdvanced && advancedInputs
        ? calculateInvestorAdvancedDeal(advancedInputs)
        : calculateInvestorDeal(baseInputs, triageResult.confidenceTier);

      const result = {
        applicationId: "dev-analysis-id",
        propertyFacts,
        soldComps,
        activeListings,
        verifiedArv,
        marketArv,
        compQualityScore: Number(compQualityScore.toFixed(2)),
        confidenceScore: triageResult.confidenceScore,
        confidenceTier: triageResult.confidenceTier,
        triggers: triageResult.triggers,
        passTriggered: triageResult.passTriggered,
        investorOutputs,
        recommendation: triageResult.recommendation,
        isAdvanced,
      };

      return NextResponse.json(
        { analysis: filterInvestorResponse(result, session.role) },
        { status: 201 }
      );
    }

    // Production path with database
    const context = isAdvanced ? "investor_elite_analysis" : "investor_core_analysis";

    const app = await prisma.sellerApplication.create({
      data: {
        userId: session.userId,
        context,
        address: data.address,
        investorInputs: data as unknown as Prisma.InputJsonValue,
      },
    });

    const baseInputs = {
      purchasePrice: data.purchasePrice,
      arv: data.arv,
      repairs: data.repairs,
      holdMonths: data.holdMonths,
      purchaseClosingRate: data.purchaseClosingRate,
      dispositionCostRate: data.dispositionCostRate,
      annualInterestRate: data.annualInterestRate,
      pointsRate: data.pointsRate,
      activeKillSwitches: data.activeKillSwitches as import("@/lib/formulas/types").KillSwitchId[],
      investorProfile: data.investorProfile as import("@/lib/formulas/types").InvestorProfile,
    };

    const advancedInputs = isAdvanced ? {
      ...baseInputs,
      monthlyRent: data.monthlyRent ?? 0,
      operatingExpenseRate: data.operatingExpenseRate ?? 0,
      refiLtv: data.refiLtv ?? 0,
      refiInterestRate: data.refiInterestRate ?? 0,
      refiTermYears: data.refiTermYears ?? 0,
      contractPrice: data.contractPrice ?? 0,
      cashInvested: data.cashInvested ?? 0,
      rehabItems: data.rehabItems ?? [],
      globalRegionalMultiplier: data.globalRegionalMultiplier ?? 1,
    } : undefined;

    const result = await runInvestorAnalysis({
      applicationId: app.id,
      investorInputs: baseInputs,
      userId: session.userId,
      isAdvanced,
      advancedInputs,
    });

    return NextResponse.json(
      { analysis: filterInvestorResponse(result, session.role) },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest) {
  try {
    const session = await getSessionContext();
    if (!session || !requireRole(session.role, INVESTOR_ROLES)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (isDevBypass) {
      return NextResponse.json({ analyses: [] });
    }

    const analyses = await prisma.sellerApplication.findMany({
      where: {
        userId: session.userId,
        context: { in: ["investor_core_analysis", "investor_elite_analysis"] },
      },
      orderBy: { createdAt: "desc" },
      include: { triage: true },
    });

    return NextResponse.json({ analyses });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
