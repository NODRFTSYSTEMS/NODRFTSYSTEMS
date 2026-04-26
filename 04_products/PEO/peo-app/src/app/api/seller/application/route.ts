import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { lintEventPayload, sanitizeEventPayload } from "@/lib/events/pii-lint";
import { getSessionContext } from "@/lib/auth/session";
import { requireRole, SELLER_ROLES } from "@/lib/auth/rbac";
import { sendApplicationConfirmationEmail } from "@/lib/email/send";
import type { Prisma } from "@prisma/client";

const createSchema = z.object({
  address: z.string().min(1),
  goals: z.record(z.string(), z.unknown()).optional(),
  timeline: z.string().optional(),
  expectedSalePrice: z.coerce.number().min(0).optional(),
  mortgagePayoff: z.coerce.number().min(0).optional(),
});

const isDevBypass = process.env.NODE_ENV === "development" && process.env.ENABLE_DEV_BYPASS === "true";

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionContext();
    if (!session || !requireRole(session.role, SELLER_ROLES)) {
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

    // PII lint on event-like payload (skipped in dev bypass for local testing)
    if (!isDevBypass) {
      const lint = lintEventPayload(body);
      if (!lint.clean) {
        return NextResponse.json(
          { error: "PII detected in payload", violations: lint.violations },
          { status: 400 }
        );
      }
    }

    // Dev bypass: skip database, return synthetic application
    if (isDevBypass) {
      const syntheticApp = {
        id: `dev-app-${Date.now()}`,
        userId: session.userId,
        context: "seller_application",
        address: data.address,
        goals: data.goals ?? {},
        timeline: data.timeline ?? null,
        expectedSalePrice: data.expectedSalePrice ?? null,
        mortgagePayoff: data.mortgagePayoff ?? null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return NextResponse.json({ application: syntheticApp }, { status: 201 });
    }

    const app = await prisma.sellerApplication.create({
      data: {
        userId: session.userId,
        context: "seller_application",
        address: data.address,
        goals: (data.goals ?? {}) as unknown as Prisma.InputJsonValue,
        timeline: data.timeline,
        expectedSalePrice: data.expectedSalePrice,
        mortgagePayoff: data.mortgagePayoff,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "application_submit",
        resource: "seller_applications",
        resourceId: app.id,
        meta: sanitizeEventPayload({ address: data.address }) as unknown as Prisma.InputJsonValue,
      },
    });

    const dbUser = await prisma.user.findUnique({ where: { id: session.userId }, select: { email: true } });
    if (dbUser?.email) {
      sendApplicationConfirmationEmail(dbUser.email, app.id, data.address).catch(() => {});
    }

    return NextResponse.json({ application: app }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
