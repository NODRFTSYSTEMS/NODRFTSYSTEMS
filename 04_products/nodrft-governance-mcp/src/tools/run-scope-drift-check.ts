import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { ArtifactType, ActionType } from "../policy/artifact-types.js";

// Artifact classes allowed in each project phase
const PHASE_ALLOWED_ARTIFACTS: Record<string, ArtifactType[]> = {
  intake: ["intake", "strategy"],
  discovery: ["strategy", "content", "business-analysis"],
  strategy: ["strategy", "commercial", "business-analysis"],
  architecture: ["build", "governance"],
  implementation: ["build", "content"],
  qa: ["build", "governance"],
  release: ["release", "build"],
  handoff: ["release", "legal", "governance"],
  maintenance: ["build", "content", "commercial"],
};

// Actions that are never permitted without an explicit scope expansion
const ALWAYS_SCOPE_CHECK_ACTIONS: ActionType[] = [
  "deploy",
  "transfer",
  "publish",
  "modify-canonical",
  "price-exception",
];

// Skill requirements by artifact class
const ARTIFACT_REQUIRED_SKILLS: Partial<Record<ArtifactType, string[]>> = {
  commercial: ["pricing-safety-review", "scope_brief"],
  legal: ["legal-compliance"],
  build: ["system-maintenance"],
  release: ["disclosure_gate", "release-gate-review"],
  content: ["content_production"],
  strategy: ["scope_brief"],
  "public-route": ["visual-direction"],
  governance: ["completion_report"],
  "business-analysis": ["business-analysis-evaluation"],
};

export type DriftStatus = "NO_DRIFT" | "POSSIBLE_DRIFT" | "CONFIRMED_DRIFT";

export interface ScopeDriftResult {
  drift_status: DriftStatus;
  findings: string[];
  blocked_actions: string[];
  safe_next_actions: string[];
  required_skills_missing: string[];
  governance_source: string;
}

export function checkScopeDrift(input: {
  requested_action: string;
  action_type: ActionType;
  artifact_type: ArtifactType;
  active_scope: string;
  project_phase: string;
  agent_code: string;
  loaded_skills?: string[];
}): ScopeDriftResult {
  const findings: string[] = [];
  const blocked: string[] = [];
  const safe: string[] = [];

  // Phase vs artifact class check
  const allowed = PHASE_ALLOWED_ARTIFACTS[input.project_phase] ?? [];
  if (allowed.length > 0 && !allowed.includes(input.artifact_type)) {
    findings.push(
      `Artifact type '${input.artifact_type}' is not in the allowed artifact classes for phase '${input.project_phase}'. ` +
        `Allowed in this phase: ${allowed.join(", ")}`
    );
    blocked.push(input.requested_action);
  }

  // Always-check actions
  if (ALWAYS_SCOPE_CHECK_ACTIONS.includes(input.action_type)) {
    findings.push(
      `Action '${input.action_type}' always requires explicit scope verification and human authorization`
    );
  }

  // Scope text check — flag keywords that suggest scope expansion
  const scopeExpansionKeywords = [
    "beyond",
    "not in sow",
    "new feature",
    "additional",
    "expand",
    "outside",
    "extra",
    "unplanned",
    "change order",
  ];
  const requestLower = input.requested_action.toLowerCase();
  const expansionHints = scopeExpansionKeywords.filter((kw) => requestLower.includes(kw));
  if (expansionHints.length > 0) {
    findings.push(
      `Requested action contains scope-expansion language: "${expansionHints.join('", "')}". ` +
        `Verify this is within the signed SOW before proceeding.`
    );
  }

  // Required skills check
  const requiredSkills = ARTIFACT_REQUIRED_SKILLS[input.artifact_type] ?? [];
  const loadedSkills = input.loaded_skills ?? [];
  const missingSkills = requiredSkills.filter((s) => !loadedSkills.includes(s));

  if (missingSkills.length > 0) {
    findings.push(
      `Required skills not confirmed as loaded: ${missingSkills.join(", ")}. ` +
        `Load these skills before proceeding.`
    );
  }

  // Determine drift status
  let driftStatus: DriftStatus = "NO_DRIFT";
  if (findings.length > 0) {
    driftStatus = blocked.length > 0 ? "CONFIRMED_DRIFT" : "POSSIBLE_DRIFT";
  }

  // Safe next actions
  if (driftStatus === "NO_DRIFT") {
    safe.push("Continue with task — no drift detected");
    safe.push("Ensure QA passes are run before declaring completion");
  } else if (driftStatus === "POSSIBLE_DRIFT") {
    safe.push("Verify the requested work is explicitly covered in the active SOW");
    safe.push("Escalate to PMA (Keon) for scope clarification if uncertain");
    safe.push("Create a Change Order if work is confirmed to be out of scope");
  } else {
    safe.push("STOP — do not proceed with blocked actions");
    safe.push("Route to MOA for scope triage");
    safe.push("If scope expansion is needed, create a Change Order and obtain Founder authorization before proceeding");
  }

  return {
    drift_status: driftStatus,
    findings,
    blocked_actions: blocked,
    safe_next_actions: safe,
    required_skills_missing: missingSkills,
    governance_source: "plan_mode.md + CLAUDE.md Section 2.1 (No Drift)",
  };
}

export function register(server: McpServer): void {
  server.tool(
    "run_scope_drift_check",
    "Check whether a requested action is within the active project scope, permitted artifact class, required skill path, and agent authority. Returns NO_DRIFT, POSSIBLE_DRIFT, or CONFIRMED_DRIFT with specific findings. Call before expanding work or implementing anything not in the original task brief.",
    {
      requested_action: z
        .string()
        .min(5)
        .describe("Description of the specific action being requested"),
      action_type: z
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
        .describe("Action type classification"),
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
        .describe("Type of artifact being acted upon"),
      active_scope: z
        .string()
        .min(10)
        .describe("The current signed SOW scope or phase scope description"),
      project_phase: z
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
      agent_code: z
        .string()
        .describe("Code of the agent requesting to perform the action (e.g., SEA, FIS, CEA)"),
      loaded_skills: z
        .array(z.string())
        .optional()
        .describe("Optional: list of skill IDs currently loaded in this session"),
    },
    async ({
      requested_action,
      action_type,
      artifact_type,
      active_scope,
      project_phase,
      agent_code,
      loaded_skills,
    }) => {
      const result = checkScopeDrift({
        requested_action,
        action_type: action_type as ActionType,
        artifact_type: artifact_type as ArtifactType,
        active_scope,
        project_phase,
        agent_code,
        loaded_skills,
      });

      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
