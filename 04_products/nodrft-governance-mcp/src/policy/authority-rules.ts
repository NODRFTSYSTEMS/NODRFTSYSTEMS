// Authority decision engine — derived from ai-review-authority-matrix.md
// Classification: Internal — Confidential
// Source: 01_system/ai-governance/ai-review-authority-matrix.md (2026-04-18, amended 2026-04-19)
//
// Rules are evaluated in order — first match wins.
// Default (no match): HOLD → QAS. The server never returns an unconstrained PROCEED for unknown cases.

import type { ArtifactType, ActionType, RiskLevel, AuthorityLevel, Verdict } from "./artifact-types.js";

export interface AuthorityCheckInput {
  artifact_type: ArtifactType;
  action_type: ActionType;
  risk_level: RiskLevel;
  amount_usd?: number;
  notes?: string;
}

export interface AuthorityCheckOutput {
  verdict: Verdict;
  blocking_rule: string | null;
  required_authority: AuthorityLevel;
  decision_log_required: boolean;
  notes: string[];
  source: string;
}

interface AuthorityRule {
  id: string;
  match: (i: AuthorityCheckInput) => boolean;
  verdict: Verdict;
  required_authority: AuthorityLevel;
  blocking_rule: string | null;
  decision_log_required: boolean;
  notes: string[];
}

const RULES: AuthorityRule[] = [
  // ── ESCALATE ─────────────────────────────────────────────────────────────────
  {
    id: "escalate-critical-defect",
    match: (i) => i.artifact_type === "escalation",
    verdict: "ESCALATE",
    required_authority: "HHC",
    blocking_rule: "CRITICAL defect or unresolvable blocker — route to HHC immediately",
    decision_log_required: true,
    notes: [
      "Route to HHC (Desmond) first — HHC coordinates ARE and Founder review",
      "Do not proceed with any related work until escalation is resolved",
      "Log the finding as CRITICAL in the session completion report",
    ],
  },
  {
    id: "escalate-high-risk-governance",
    match: (i) =>
      i.artifact_type === "governance" &&
      i.action_type === "modify-canonical" &&
      i.risk_level === "high-risk",
    verdict: "ESCALATE",
    required_authority: "Founder",
    blocking_rule: "High-risk canonical governance change — Founder authorization and Decision Log entry required before any action",
    decision_log_required: true,
    notes: [
      "Route via HHC to Founder",
      "Create Decision Log entry with proposed change, rationale, and impact",
      "ARE reviews proposed change before Founder decision",
    ],
  },

  // ── HOLD — Founder (non-delegable items) ─────────────────────────────────────
  {
    id: "hold-legal-external",
    match: (i) =>
      i.artifact_type === "legal" &&
      (["send-to-client", "publish", "transfer"] as ActionType[]).includes(i.action_type),
    verdict: "HOLD",
    required_authority: "Founder",
    blocking_rule: "ALL legal-adjacent artifacts require Founder + qualified legal counsel before any external delivery — non-delegable",
    decision_log_required: true,
    notes: [
      "CDA drafts against canonical templates in 01_system/legal/",
      "LCA runs full legal-compliance skill review; logs to 06_legal-review/",
      "IPGA checks IP ownership, licensing, and NDA-scope concerns",
      "QAS gates before advancing to Founder",
      "Qualified legal counsel review is mandatory — not optional and not substituted by LCA alone",
      "Mandatory disclaimer on ALL business formation outputs: 'This material is for general informational purposes only and does not constitute legal advice.'",
    ],
  },
  {
    id: "hold-commercial-high-value",
    match: (i) =>
      i.artifact_type === "commercial" &&
      (["send-to-client", "approve"] as ActionType[]).includes(i.action_type) &&
      (i.amount_usd ?? 0) > 15000,
    verdict: "HOLD",
    required_authority: "Founder",
    blocking_rule: "Commercial artifacts over $15,000 require Founder approval",
    decision_log_required: false,
    notes: [
      "Route through Growth Lead before Founder",
      "reviewer_pricing_safety must clear first — blocks any CONFLICT or NEEDS FOUNDER APPROVAL item",
      "QAS quality gate required before human review",
    ],
  },
  {
    id: "hold-price-exception",
    match: (i) => i.action_type === "price-exception",
    verdict: "HOLD",
    required_authority: "Founder",
    blocking_rule: "Pricing exceptions, discounts, and tier deviations are non-delegable — Founder only, Decision Log required",
    decision_log_required: true,
    notes: [
      "No agent may approve a pricing exception",
      "reviewer_pricing_safety will block any deviation before it reaches Founder",
      "Document exception reason and business justification in Decision Log before Founder review",
    ],
  },
  {
    id: "hold-release-high-risk",
    match: (i) =>
      i.artifact_type === "release" &&
      (["deploy", "transfer", "publish"] as ActionType[]).includes(i.action_type) &&
      i.risk_level === "high-risk",
    verdict: "HOLD",
    required_authority: "Founder",
    blocking_rule: "Production releases touching client data, billing systems, or Class 3-4 builds require Founder approval",
    decision_log_required: true,
    notes: [
      "DRA completes deployment readiness check first",
      "QDA packages evidence, release notes, and known issues",
      "disclosure_gate 13-item sweep must pass — all items",
      "QAS formal release sign-off required",
      "HHC routes to ARE then Founder",
      "handover_protocol.md 6-gate sequence must complete — no deadline justifies skipping Gate 5",
    ],
  },
  {
    id: "hold-public-route-publish",
    match: (i) =>
      i.artifact_type === "public-route" &&
      (["publish", "deploy"] as ActionType[]).includes(i.action_type),
    verdict: "HOLD",
    required_authority: "Founder",
    blocking_rule: "Market-facing public route changes and public-trust claims require Founder approval",
    decision_log_required: false,
    notes: [
      "VDA defines route architecture and authority flow first",
      "DAA translates route strategy to component and layout specs",
      "FIS implements when code changes are required",
      "Full reviewer chain must clear: BCA, reviewer_public_proof, STAA, reviewer_accessibility, reviewer_plain_language",
      "QAS final hold/release decision before Founder",
      "No fabricated proof, no motion-dependent comprehension",
    ],
  },
  {
    id: "hold-content-regulatory-publish",
    match: (i) =>
      i.artifact_type === "content" &&
      (["publish", "send-to-client"] as ActionType[]).includes(i.action_type) &&
      i.risk_level === "high-risk",
    verdict: "HOLD",
    required_authority: "Founder",
    blocking_rule: "Content with legal, medical, financial, or regulatory claims requires Founder review — non-delegable",
    decision_log_required: false,
    notes: [
      "reviewer_plain_language checks Grade 8 reading level and brand voice",
      "reviewer_public_proof verifies every statistic, claim, and social proof",
      "QDA runs Pass 2 — completeness, placeholders, brand voice",
      "QAS final clearance before Founder review",
    ],
  },
  {
    id: "hold-modify-canonical",
    match: (i) => i.action_type === "modify-canonical",
    verdict: "HOLD",
    required_authority: "Founder",
    blocking_rule: "Canonical governance documents require Founder authorization — Decision Log entry mandatory",
    decision_log_required: true,
    notes: [
      "Applies to: CLAUDE.md, agent registry, pricing governance, authority matrix, and any 01_system/ canonical document",
      "ARE reviews the proposed change before Founder decision",
      "Create Decision Log entry with proposed change, rationale, affected agents, and rollback plan",
    ],
  },
  {
    id: "hold-transfer-any",
    match: (i) => i.artifact_type === "release" && i.action_type === "transfer",
    verdict: "HOLD",
    required_authority: "Founder",
    blocking_rule: "Repository transfer and client handoff require Founder approval — handover_protocol.md 6-gate sequence mandatory",
    decision_log_required: true,
    notes: [
      "Gate 1: QA sign-off and Gate 6 (Human) pass on file",
      "Gate 2: Legal review complete for any contract, IP, or regulatory element",
      "Gate 3: disclosure_gate 13-item sweep passed — log saved to 06_handoff/",
      "Gate 4: Access transfer log complete in 06_handoff/access_log.md",
      "Gate 5: Founder explicitly approves — no deadline justifies skipping this",
      "Gate 6: Handoff package assembled from permitted items only",
    ],
  },

  // ── HOLD — ARE required ───────────────────────────────────────────────────────
  {
    id: "hold-build-deploy-are",
    match: (i) =>
      i.artifact_type === "build" &&
      i.action_type === "deploy",
    verdict: "HOLD",
    required_authority: "ARE",
    blocking_rule: "All production deployments require ARE sign-off — Class 3-4 additionally require Founder",
    decision_log_required: false,
    notes: [
      "SMA pre-build health check must run before any build starts",
      "SEA/FIS/BLS implement within Gate 3 rules",
      "TVA provides typecheck, lint, test, and build verification evidence",
      "SCA reviews security for any auth, PII, payments, or external data surface",
      "QAS gates scope, evidence, and completeness",
      "ARE reviews before Founder for Class 3-4 builds",
    ],
  },

  // ── HOLD — QAS gate ───────────────────────────────────────────────────────────
  {
    id: "hold-commercial-standard-qas",
    match: (i) =>
      i.artifact_type === "commercial" &&
      (["send-to-client", "approve"] as ActionType[]).includes(i.action_type) &&
      (i.amount_usd ?? 0) <= 15000,
    verdict: "HOLD",
    required_authority: "QAS",
    blocking_rule: "Commercial artifacts require QAS quality gate before advancing to Growth Lead and Founder",
    decision_log_required: false,
    notes: [
      "PEA drafts against scope brief and pricing governance",
      "CRMA checks CRM data, client context, and commercial logic",
      "reviewer_pricing_safety verifies all prices trace to operative source",
      "IGA confirms invoice logic and payment terms",
    ],
  },

  // ── Business Analysis — Founder gate on delivery ─────────────────────────────
  {
    id: "hold-business-analysis-delivery",
    match: (i) =>
      i.artifact_type === "business-analysis" &&
      (["send-to-client", "approve"] as ActionType[]).includes(i.action_type),
    verdict: "HOLD",
    required_authority: "Founder",
    blocking_rule: "Business Analysis Sprint output requires Founder review and approval before any client delivery — non-delegable",
    decision_log_required: false,
    notes: [
      "BAO assembles the final 4-section report after RSA FACT-STRICT audit clears",
      "QAS must run Pass 2 (content and copy) and Pass 5 (client requirements) before Founder review",
      "Founder approval is the final gate — no output leaves without it",
      "Do not expose agent codes, cell composition, scoring weights, or skill file contents in client-facing output",
    ],
  },

  // ── PROCEED ───────────────────────────────────────────────────────────────────
  {
    id: "proceed-draft",
    match: (i) => i.action_type === "draft",
    verdict: "PROCEED",
    required_authority: "none",
    blocking_rule: null,
    decision_log_required: false,
    notes: [
      "Draft artifacts do not require a human gate",
      "Output is NOT final until it passes applicable QA gates and receives required sign-off",
      "Do not share drafts externally without completing the review chain",
    ],
  },
  {
    id: "proceed-review",
    match: (i) => i.action_type === "review",
    verdict: "PROCEED",
    required_authority: "none",
    blocking_rule: null,
    decision_log_required: false,
    notes: [
      "Review actions are always permitted",
      "Review findings may trigger HOLD or ESCALATE conditions — report them",
    ],
  },
  {
    id: "proceed-build-standard",
    match: (i) =>
      i.artifact_type === "build" &&
      (["draft", "approve"] as ActionType[]).includes(i.action_type) &&
      i.risk_level === "standard",
    verdict: "PROCEED",
    required_authority: "QAS",
    blocking_rule: null,
    decision_log_required: false,
    notes: [
      "SMA pre-build health check required before any build starts",
      "QAS is the gate for standard builds",
      "TVA verification evidence required before QAS review",
      "SCA review required for any auth, PII, payments, or external data surface",
    ],
  },
  {
    id: "proceed-content-standard",
    match: (i) =>
      i.artifact_type === "content" &&
      i.risk_level === "standard" &&
      i.action_type !== "publish",
    verdict: "PROCEED",
    required_authority: "QAS",
    blocking_rule: null,
    decision_log_required: false,
    notes: [
      "CEA drafts against approved brief and client brand guidelines",
      "reviewer_plain_language and reviewer_public_proof must clear",
      "QDA runs Pass 2 before QAS final clearance",
    ],
  },
  {
    id: "proceed-strategy-draft",
    match: (i) =>
      i.artifact_type === "strategy" &&
      (["draft", "review"] as ActionType[]).includes(i.action_type),
    verdict: "PROCEED",
    required_authority: "QAS",
    blocking_rule: null,
    decision_log_required: false,
    notes: [
      "PMA and SRA lead discovery synthesis",
      "CSM assembles context package",
      "QAS gates before Founder strategic review",
    ],
  },
];

export function checkAuthority(input: AuthorityCheckInput): AuthorityCheckOutput {
  for (const rule of RULES) {
    if (rule.match(input)) {
      return {
        verdict: rule.verdict,
        blocking_rule: rule.blocking_rule,
        required_authority: rule.required_authority,
        decision_log_required: rule.decision_log_required,
        notes: rule.notes,
        source: "ai-review-authority-matrix.md (2026-04-18, amended 2026-04-19)",
      };
    }
  }

  // Fail-safe default — no rule matched
  return {
    verdict: "HOLD",
    blocking_rule: "No authority rule matched this artifact/action combination. Defaulting to HOLD.",
    required_authority: "QAS",
    decision_log_required: false,
    notes: [
      "This combination is not explicitly covered in the authority matrix",
      "QAS should review and route to the appropriate authority",
      "Consider adding a rule for this case to the authority matrix",
    ],
    source: "default-fallback (no matching rule in authority-rules.ts)",
  };
}
