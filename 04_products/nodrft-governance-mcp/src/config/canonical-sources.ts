// Allowlist of governance documents the MCP server is permitted to read and serve.
// Files not on this list are NEVER accessible through the server — path traversal is blocked.
// Classification: Internal — Confidential

import path from "node:path";
import { fileURLToPath } from "node:url";
import type { WorkflowType } from "../policy/artifact-types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolves to the NODRFTSYSTEMS MASTER workspace root regardless of dev vs compiled context.
// src/config/ (dev) or dist/config/ (compiled) — both 4 levels up from workspace root.
export const WORKSPACE_ROOT: string =
  process.env["NODRFT_ROOT"] ?? path.resolve(__dirname, "../../../..");

export interface CanonicalSource {
  id: string;
  label: string;
  path: string;
  category: "governance" | "registry" | "skills" | "rules";
}

export const CANONICAL_SOURCES: CanonicalSource[] = [
  {
    id: "ai-review-authority-matrix",
    label: "AI Review Authority Matrix",
    path: path.join(WORKSPACE_ROOT, "01_system", "ai-governance", "ai-review-authority-matrix.md"),
    category: "governance",
  },
  {
    id: "mandatory-routing-signoff-protocol",
    label: "Mandatory Routing and Signoff Protocol",
    path: path.join(WORKSPACE_ROOT, "01_system", "ai-governance", "mandatory-routing-signoff-protocol.md"),
    category: "governance",
  },
  {
    id: "mcp-architecture-direction",
    label: "MCP Architecture Direction",
    path: path.join(WORKSPACE_ROOT, "01_system", "ai-governance", "mcp-architecture-direction-2026-04-19.md"),
    category: "governance",
  },
  {
    id: "mandatory-build-activation-protocol",
    label: "Mandatory Build Activation Protocol",
    path: path.join(WORKSPACE_ROOT, "01_system", "ai-governance", "mandatory-build-activation-protocol-2026-04-26.md"),
    category: "governance",
  },
  {
    id: "ai-native-operating-architecture",
    label: "AI Native Operating Architecture",
    path: path.join(WORKSPACE_ROOT, "01_system", "ai-governance", "ai-native-operating-architecture.md"),
    category: "governance",
  },
  {
    id: "engineering-standards-policy",
    label: "Engineering Standards Policy",
    path: path.join(WORKSPACE_ROOT, "01_system", "ai-governance", "engineering-standards-policy-2026-04-15.md"),
    category: "governance",
  },
  {
    id: "explicit-protocol-control-sweep",
    label: "Explicit Protocol Control Sweep",
    path: path.join(WORKSPACE_ROOT, "01_system", "ai-governance", "explicit-protocol-control-sweep-2026-04-15.md"),
    category: "governance",
  },
  {
    id: "exceptional-build-escalation-protocol",
    label: "Exceptional Build Escalation Protocol",
    path: path.join(WORKSPACE_ROOT, "01_system", "ai-governance", "exceptional-build-escalation-protocol-2026-04-15.md"),
    category: "governance",
  },
  {
    id: "build-context-engineering-standard",
    label: "Build Context Engineering Standard",
    path: path.join(WORKSPACE_ROOT, "01_system", "ai-governance", "build-context-engineering-standard-2026-04-15.md"),
    category: "governance",
  },
  {
    id: "technology-watch-protocol",
    label: "Technology Watch Protocol",
    path: path.join(WORKSPACE_ROOT, "01_system", "ai-governance", "technology-watch-protocol.md"),
    category: "governance",
  },
  {
    id: "agent-registry",
    label: "Final Approved Department and Agent Registry",
    path: path.join(WORKSPACE_ROOT, "01_system", "registry", "final-approved-department-and-agent-registry.md"),
    category: "registry",
  },
  {
    id: "document-registry",
    label: "Document Registry",
    path: path.join(WORKSPACE_ROOT, "01_system", "registry", "document-registry.md"),
    category: "registry",
  },
  {
    id: "skill-loading-matrix",
    label: "Skill Loading Matrix",
    path: path.join(WORKSPACE_ROOT, "03_agent-skills", "skill-loading-matrix.md"),
    category: "skills",
  },
  {
    id: "plan-mode-rule",
    label: "Plan Mode Rule",
    path: path.join(WORKSPACE_ROOT, ".claude", "rules", "plan_mode.md"),
    category: "rules",
  },
  {
    id: "github-disclosure-gate-rule",
    label: "GitHub Disclosure Gate Rule",
    path: path.join(WORKSPACE_ROOT, ".claude", "rules", "github_disclosure_gate.md"),
    category: "rules",
  },
  {
    id: "handover-protocol-rule",
    label: "Handover Protocol Rule",
    path: path.join(WORKSPACE_ROOT, ".claude", "rules", "handover_protocol.md"),
    category: "rules",
  },
  {
    id: "bao-business-analysis-skill",
    label: "BAO Business Analysis Orchestrator Skill",
    path: path.join(WORKSPACE_ROOT, "03_agent-skills", "department-skill-pack", "business-analysis", "bao-business-analysis-orchestrator", "SKILL.md"),
    category: "skills",
  },
];

// Authoritative workflow → document mapping.
// WORKFLOW_SOURCE_MAP is the single source of truth for which documents load per workflow.
// Sources are ordered by relevance within each workflow — first loaded is most referenced.
const WORKFLOW_SOURCE_MAP: Record<WorkflowType, string[]> = {
  build: [
    "mandatory-build-activation-protocol",
    "engineering-standards-policy",
    "ai-review-authority-matrix",
    "build-context-engineering-standard",
    "skill-loading-matrix",
    "plan-mode-rule",
  ],
  strategy: [
    "ai-native-operating-architecture",
    "ai-review-authority-matrix",
    "skill-loading-matrix",
    "agent-registry",
  ],
  pricing: [
    "ai-review-authority-matrix",
    "mandatory-routing-signoff-protocol",
    "skill-loading-matrix",
  ],
  legal: [
    "ai-review-authority-matrix",
    "mandatory-routing-signoff-protocol",
    "skill-loading-matrix",
  ],
  release: [
    "mandatory-routing-signoff-protocol",
    "handover-protocol-rule",
    "github-disclosure-gate-rule",
    "mandatory-build-activation-protocol",
    "exceptional-build-escalation-protocol",
  ],
  intake: [
    "skill-loading-matrix",
    "ai-native-operating-architecture",
    "agent-registry",
  ],
  governance: [
    "ai-native-operating-architecture",
    "ai-review-authority-matrix",
    "mandatory-routing-signoff-protocol",
    "mcp-architecture-direction",
    "explicit-protocol-control-sweep",
    "technology-watch-protocol",
    "agent-registry",
    "document-registry",
  ],
  content: [
    "ai-review-authority-matrix",
    "skill-loading-matrix",
  ],
  "public-route": [
    "ai-review-authority-matrix",
    "skill-loading-matrix",
    "mandatory-routing-signoff-protocol",
  ],
  "business-analysis": [
    "bao-business-analysis-skill",
    "agent-registry",
    "ai-review-authority-matrix",
    "skill-loading-matrix",
  ],
};

export function getSourceById(id: string): CanonicalSource | undefined {
  return CANONICAL_SOURCES.find((s) => s.id === id);
}

export function getSourcesForWorkflow(workflow: WorkflowType): CanonicalSource[] {
  const ids = WORKFLOW_SOURCE_MAP[workflow] ?? [];
  return ids.map((id) => getSourceById(id)).filter((s): s is CanonicalSource => s !== undefined);
}
