import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { routeTask } from "../policy/routing.js";
import { checkAuthority } from "../policy/authority-rules.js";
import { getSourcesForWorkflow } from "../config/canonical-sources.js";
import { loadMultipleDocuments } from "../loaders/markdown-loader.js";
import { REGISTRY_COUNT_FLAG } from "../loaders/registry-loader.js";
import type {
  ArtifactType,
  ActionType,
  ProjectPhase,
  RiskLevel,
  WorkflowType,
} from "../policy/artifact-types.js";

const ARTIFACT_TO_WORKFLOW: Record<ArtifactType, WorkflowType> = {
  commercial: "pricing",
  legal: "legal",
  build: "build",
  release: "release",
  content: "content",
  strategy: "strategy",
  "public-route": "public-route",
  governance: "governance",
  escalation: "governance",
  intake: "intake",
  "business-analysis": "business-analysis",
};

export function register(server: McpServer): void {
  server.tool(
    "generate_context_package",
    "Assemble a complete, structured context package for a project phase. Loads relevant governance docs, determines agent routing, runs an authority check, and identifies required approvals. This is the primary tool for CSM-equivalent context assembly at the start of any governed session or phase.",
    {
      project_id: z
        .string()
        .min(2)
        .describe("Project identifier (e.g., WALCOTT_homepage-website)"),
      phase: z
        .enum([
          "intake",
          "discovery",
          "strategy",
          "architecture",
          "implementation",
          "qa",
          "release",
          "handoff",
          "maintenance",
        ])
        .describe("Current project phase"),
      artifact_type: z
        .enum([
          "commercial",
          "legal",
          "build",
          "release",
          "content",
          "strategy",
          "public-route",
          "governance",
          "escalation",
          "intake",
          "business-analysis",
        ])
        .describe("Primary artifact type for this phase"),
      agent_codes: z
        .array(z.string())
        .optional()
        .describe("Optional: agent codes that will be active in this context"),
      primary_action: z
        .enum([
          "draft",
          "review",
          "approve",
          "send-to-client",
          "deploy",
          "publish",
          "transfer",
          "modify-canonical",
          "price-exception",
        ])
        .optional()
        .default("draft")
        .describe("The primary action that will be performed in this context"),
      risk_level: z
        .enum(["standard", "high-risk"])
        .optional()
        .default("standard")
        .describe("Risk classification for this context"),
      task_summary: z
        .string()
        .optional()
        .describe("Optional: brief description of the work to be done in this context"),
    },
    async ({
      project_id,
      phase,
      artifact_type,
      agent_codes,
      primary_action,
      risk_level,
      task_summary,
    }) => {
      const wf = ARTIFACT_TO_WORKFLOW[artifact_type as ArtifactType];
      const sources = getSourcesForWorkflow(wf);

      // Start async doc load, run sync routing/authority in parallel while it fetches.
      const loadPromise = loadMultipleDocuments(sources.map((s) => s.id));

      const routing = routeTask({
        task_summary: task_summary ?? `${phase} phase — ${artifact_type} artifact`,
        artifact_type: artifact_type as ArtifactType,
        risk_level: (risk_level ?? "standard") as RiskLevel,
        project_phase: phase as ProjectPhase,
      });

      const authority = checkAuthority({
        artifact_type: artifact_type as ArtifactType,
        action_type: (primary_action ?? "draft") as ActionType,
        risk_level: (risk_level ?? "standard") as RiskLevel,
      });

      const { loaded, errors } = await loadPromise;

      const package_ = {
        meta: {
          project_id,
          phase,
          artifact_type,
          workflow: wf,
          primary_action: primary_action ?? "draft",
          risk_level: risk_level ?? "standard",
          assembled_at: new Date().toISOString(),
          session_note:
            "This context package is session-scoped. Do not share across client sessions without Founder authorization. Reset context package when switching client workspaces.",
        },
        governance_documents: {
          loaded: loaded.map((d) => ({
            id: d.id,
            label: d.label,
            sourcePath: d.sourcePath,
            wordCount: d.wordCount,
          })),
          errors: errors,
          total_loaded: loaded.length,
          total_errors: errors.length,
        },
        agent_routing: routing,
        authority_check: authority,
        active_agents: agent_codes ?? [],
        required_agents: [
          routing.primary_agent,
          ...routing.supporting_agents,
          ...routing.review_chain,
        ],
        required_skills: routing.required_skills,
        risks: buildRiskList(artifact_type as ArtifactType, phase as ProjectPhase, authority),
        human_approvals_required: buildApprovalList(authority, routing),
        registry_flags: REGISTRY_COUNT_FLAG.inconsistency ? [REGISTRY_COUNT_FLAG.message] : [],
        blocking_gaps: buildBlockingGaps(loaded.length, errors, authority),
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(package_, null, 2) }],
      };
    }
  );
}

function buildRiskList(
  artifactType: ArtifactType,
  phase: ProjectPhase,
  authority: ReturnType<typeof checkAuthority>
): string[] {
  const risks: string[] = [];

  if (authority.verdict === "HOLD") {
    risks.push(`HOLD condition active: ${authority.blocking_rule}`);
  }
  if (authority.verdict === "ESCALATE") {
    risks.push(`ESCALATE condition active: ${authority.blocking_rule}`);
  }
  if (artifactType === "legal") {
    risks.push("Legal artifact — qualified legal counsel review is mandatory before any external delivery");
  }
  if (artifactType === "release" || phase === "release") {
    risks.push("Release phase — disclosure_gate sweep must complete before any file transfer");
    risks.push("handover_protocol.md 6-gate sequence mandatory");
  }
  if (phase === "handoff") {
    risks.push("Handoff phase — Founder must explicitly approve at Gate 5 before any transfer");
  }
  if (artifactType === "commercial") {
    risks.push("Commercial artifact — reviewer_pricing_safety must clear before human review");
  }
  if (artifactType === "governance") {
    risks.push("Governance artifact — canonical changes require Decision Log entry and Founder authorization");
    risks.push(
      "Registry count inconsistency: verify against 01_system/registry/final-approved-department-and-agent-registry.md"
    );
  }

  return risks;
}

function buildApprovalList(
  authority: ReturnType<typeof checkAuthority>,
  routing: ReturnType<typeof routeTask>
): Array<{ authority: string; condition: string; blocking: boolean }> {
  const approvals: Array<{ authority: string; condition: string; blocking: boolean }> = [];

  if (authority.verdict !== "PROCEED") {
    approvals.push({
      authority: authority.required_authority,
      condition: authority.blocking_rule ?? "Authority check result",
      blocking: authority.verdict === "HOLD" || authority.verdict === "ESCALATE",
    });
  }

  if (routing.human_gate_required && routing.human_gate_authority) {
    const alreadyListed = approvals.some((a) => a.authority === routing.human_gate_authority);
    if (!alreadyListed) {
      approvals.push({
        authority: routing.human_gate_authority,
        condition: `Required by routing rule for ${routing.primary_agent} lead`,
        blocking: true,
      });
    }
  }

  return approvals;
}

function buildBlockingGaps(
  loadedCount: number,
  errors: Array<{ id: string; error: string }>,
  authority: ReturnType<typeof checkAuthority>
): string[] {
  const gaps: string[] = [];

  if (errors.length > 0) {
    gaps.push(
      `${errors.length} governance document(s) failed to load: ${errors.map((e) => e.id).join(", ")}. ` +
        `Verify files exist at expected paths in 01_system/ai-governance/ and 03_agent-skills/.`
    );
  }

  if (loadedCount === 0) {
    gaps.push("No governance documents loaded — cannot assemble a governed context package");
  }

  if (authority.verdict === "ESCALATE") {
    gaps.push("ESCALATE condition — all work is blocked until HHC resolves the escalation");
  }

  if (authority.verdict === "HOLD" && authority.decision_log_required) {
    gaps.push("Decision Log entry required before any action may proceed — create entry and obtain authorization");
  }

  return gaps;
}
