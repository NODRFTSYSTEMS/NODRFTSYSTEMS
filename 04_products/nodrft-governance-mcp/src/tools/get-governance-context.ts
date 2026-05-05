import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  getSourcesForWorkflow,
  CANONICAL_SOURCES,
} from "../config/canonical-sources.js";
import { loadMultipleDocuments } from "../loaders/markdown-loader.js";
import type { WorkflowType } from "../policy/artifact-types.js";

const WORKFLOW_RULES: Record<WorkflowType, string[]> = {
  build: [
    "SMA pre-build health check is mandatory before any build begins",
    "SAA defines architecture — no implementation begins without architecture boundaries set",
    "TVA verification evidence required before QAS review",
    "SCA reviews all auth, PII, billing, and external data surfaces",
    "All T1+ builds require a branded 404 page — absent = release-gate blocker",
    "SBOM generated per project and logged to 05_QA/",
  ],
  strategy: [
    "Discovery Sprint ($2,000 fee) required before any build-ready output",
    "Discovery output is Scope Brief only — no design, code, or copy without signed SOW",
    "Founder approves all strategic decisions",
    "PMA + SRA lead synthesis; CSM assembles context packages",
  ],
  pricing: [
    "No package prices are displayed on any public surface (effective 2026-04-25)",
    "Only hourly and advisory rates are shown publicly",
    "reviewer_pricing_safety is mandatory on every commercial artifact",
    "Pricing exceptions require Founder authorization and Decision Log entry",
    "Amounts >$15K require Founder approval",
  ],
  legal: [
    "ALL legal-adjacent artifacts require Founder + qualified legal counsel — non-delegable",
    "Mandatory disclaimer on all business formation outputs",
    "Legal review logged to 01_system/legal/legal_review_log.md AND 06_handoff/",
    "CDA drafts from canonical templates only — no improvised legal language",
    "LCA and IPGA mandatory in review chain",
  ],
  release: [
    "disclosure_gate 13-item sweep must pass before any file transfer",
    "handover_protocol.md 6-gate sequence is mandatory",
    "Founder approval at Gate 5 — no deadline justifies skipping",
    "SBOM must be included in handoff package",
    "Access transfer log must be complete before handoff",
  ],
  intake: [
    "Client Evaluation Scorecard must be completed before any engagement decision",
    "Discovery Sprint is required for ambiguous engagements",
    "Do not proceed to proposal without Founder authorization",
    "All intake records logged to 02_client-system/[CLIENT-WORKSPACE]/01_intake/",
  ],
  governance: [
    "Canonical governance documents may only be modified with Founder authorization",
    "Decision Log entry required for all canonical changes",
    "ARE reviews proposed changes before Founder decision",
    "Registry count note: older docs show 59/60 agents; current approved registry shows 64 (as of 2026-04-24)",
  ],
  content: [
    "Brief must be confirmed before any writing begins",
    "No fabricated statistics, quotes, or named client evidence",
    "Bilingual content requires transcreation (not translation) and Bilingual Parity review",
    "reviewer_plain_language and reviewer_public_proof are mandatory",
    "QDA runs Pass 2 before QAS final clearance",
  ],
  "public-route": [
    "VDA must define route architecture before any implementation begins",
    "Full reviewer chain mandatory: BCA, reviewer_public_proof, STAA, reviewer_accessibility, reviewer_plain_language, reviewer_vecs",
    "Founder gates all market-facing route changes",
    "No fabricated proof, no motion-dependent comprehension",
    "VECS architecture amendment governs all public commercial routes",
  ],
  "business-analysis": [
    "Founder authorization is required before any Business Analysis Sprint begins",
    "Written client brief is required — BAO does not begin without it",
    "Capital/budget context from client is required before FMA can execute Section 2.6",
    "FACT-STRICT MODE is mandatory throughout: no invented figures, no unlabeled estimates, all calculations step-by-step",
    "RSA FACT-STRICT audit of the complete assembled output is required before QAS review",
    "Founder approval is mandatory before any output is delivered to the client — non-delegable",
    "At least one High Severity risk must appear in Section 2.12 — if none, justify explicitly",
    "LCA must be activated immediately if Section 2.5 or 2.12 identifies a regulatory flag",
  ],
};

const ACTIVE_CONSTRAINTS: Record<WorkflowType, string[]> = {
  build: [
    "Wave deployment sequence must not be skipped",
    "No agent autonomously expands into adjacent domains",
    "Context package must be assigned before any agent executes",
  ],
  strategy: [
    "Scope expansion without authorization is a drift condition — stop and escalate",
    "Do not infer scope between sessions",
  ],
  pricing: [
    "Pricing display rule effective 2026-04-25 — contact-only for all package tiers",
    "No pricing commitment before Founder confirmation",
  ],
  legal: [
    "No recommendation of specific attorneys or state timelines beyond general Delaware guidance",
    "Do not project formation timelines",
  ],
  release: [
    ".claude/ and CLAUDE.md must never appear in any commit or handoff package",
    ".gitignore must contain .claude/ entry — verify before every commit",
  ],
  intake: [
    "Do not share scoring logic in any client-facing communication",
    "Decline below-threshold inquiries professionally — do not proceed to proposal",
  ],
  governance: [
    "No proprietary assets committed to public or client repositories",
    "System isolation: no cross-client context without explicit Founder authorization",
  ],
  content: [
    "Volume does not reduce QA standards — retainer content follows identical protocol",
    "No placeholder text in deliverables — use [REQUIRED: data point] and flag in completion report",
  ],
  "public-route": [
    "No public pricing display — contact-only for all package tiers",
    "reviewer_vecs enforces VECS commercial architecture compliance",
  ],
  "business-analysis": [
    "BAO does not begin without written client brief and Founder authorization on file",
    "FMA hard stop at Section 2.6 if capital context is missing — do not estimate, request",
    "RSA FACT-STRICT audit is non-optional — no output delivered to client before it clears",
  ],
};

export function register(server: McpServer): void {
  server.tool(
    "get_governance_context",
    "Load the canonical governance rules, constraints, and active source documents for a given workflow type. Returns loaded document metadata, applicable rules, and required checks. Use this at the start of any governed task.",
    {
      workflow: z
        .enum([
          "build",
          "strategy",
          "pricing",
          "legal",
          "release",
          "intake",
          "governance",
          "content",
          "public-route",
          "business-analysis",
        ])
        .describe("The workflow type to load governance context for"),
      artifact_type: z
        .string()
        .optional()
        .describe("Optional: the specific artifact type within this workflow"),
      include_document_text: z
        .boolean()
        .optional()
        .default(false)
        .describe("If true, include full document text in response (increases response size)"),
    },
    async ({ workflow, artifact_type, include_document_text }) => {
      const wf = workflow as WorkflowType;
      const sources = getSourcesForWorkflow(wf);
      const { loaded, errors } = await loadMultipleDocuments(sources.map((s) => s.id));

      const loadedSources = loaded.map((doc) => ({
        id: doc.id,
        label: doc.label,
        sourcePath: doc.sourcePath,
        wordCount: doc.wordCount,
        loadedAt: doc.loadedAt,
        ...(include_document_text ? { content: doc.content } : {}),
      }));

      const result = {
        workflow,
        artifact_type: artifact_type ?? null,
        loaded_sources: loadedSources,
        load_errors: errors,
        canonical_rules: WORKFLOW_RULES[wf] ?? [],
        active_constraints: ACTIVE_CONSTRAINTS[wf] ?? [],
        known_conflicts: [
          "Registry count inconsistency: older docs reference 59/60 agents; approved registry (2026-04-24) shows 64 agents",
        ],
        required_next_checks: getRequiredNextChecks(wf),
        total_documents_loaded: loaded.length,
        total_load_errors: errors.length,
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}

function getRequiredNextChecks(workflow: WorkflowType): string[] {
  const checks: Record<WorkflowType, string[]> = {
    build: [
      "run_authority_check before any deploy or release action",
      "route_task_to_agent to confirm correct build cell assignment",
      "run_scope_drift_check before implementing features not in original scope",
    ],
    strategy: [
      "run_authority_check before sending strategy artifacts to client",
      "route_task_to_agent to confirm PMA/SRA/CSM assignment",
    ],
    pricing: [
      "run_authority_check — all pricing artifacts require human gate",
      "reviewer_pricing_safety must be in review chain",
    ],
    legal: [
      "run_authority_check — all legal artifacts require Founder + counsel",
      "route_task_to_agent to confirm CDA/LCA/IPGA chain",
    ],
    release: [
      "run_authority_check — all releases require human gate",
      "prepare_escalation_log_entry if any disclosure issue found",
      "Verify .gitignore contains .claude/ and CLAUDE.md entries",
    ],
    intake: [
      "route_task_to_agent — intake always routes through MOA",
      "run_authority_check before any engagement authorization",
    ],
    governance: [
      "run_authority_check — governance changes require Founder",
      "run_scope_drift_check to confirm action is within authorized scope",
    ],
    content: [
      "route_task_to_agent to confirm CEA + reviewer chain",
      "run_authority_check if content contains regulatory claims",
    ],
    "public-route": [
      "run_authority_check — all public route changes require Founder",
      "route_task_to_agent to confirm full VECS reviewer chain",
    ],
    "business-analysis": [
      "run_authority_check — Business Analysis Sprint output requires Founder approval before client delivery",
      "route_task_to_agent to confirm BAO/FMA/MCA/RSA/QAS cell assignment",
      "Confirm Founder authorization and written client brief are on file before BAO activates",
      "Confirm capital/budget context from client is available before FMA begins Section 2.6",
    ],
  };
  return checks[workflow] ?? [];
}

// Re-export for testing
export { WORKFLOW_RULES, ACTIVE_CONSTRAINTS };
