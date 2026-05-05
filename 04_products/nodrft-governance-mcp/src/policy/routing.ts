// Task routing policy — derived from ai-review-authority-matrix.md and skill-loading-matrix.md
// Classification: Internal — Confidential

import type { ArtifactType, ProjectPhase, RiskLevel } from "./artifact-types.js";

export interface RoutingInput {
  task_summary: string;
  artifact_type: ArtifactType;
  risk_level: RiskLevel;
  project_phase: ProjectPhase;
}

export interface RoutingOutput {
  primary_agent: string;
  supporting_agents: string[];
  required_skills: string[];
  review_chain: string[];
  human_gate_required: boolean;
  human_gate_authority: string | null;
  reason: string;
}

interface RoutingRule {
  id: string;
  match: (i: RoutingInput) => boolean;
  output: RoutingOutput;
}

const RULES: RoutingRule[] = [
  // ── Intake ────────────────────────────────────────────────────────────────────
  // Match only when artifact_type is "intake" — a legal or commercial artifact
  // in the intake phase routes by its artifact type, not by phase.
  {
    id: "route-intake",
    match: (i) => i.artifact_type === "intake",
    output: {
      primary_agent: "MOA",
      supporting_agents: ["CSM", "HHC", "DCPA"],
      required_skills: ["client_intake", "scope_brief"],
      review_chain: ["QAS"],
      human_gate_required: true,
      human_gate_authority: "Founder",
      reason: "All intake flows route through MOA. CSM assembles context package. DCPA prepares discovery agenda. HHC coordinates human touchpoints. Founder must authorize before any engagement proceeds.",
    },
  },

  // ── Commercial ────────────────────────────────────────────────────────────────
  {
    id: "route-commercial",
    match: (i) => i.artifact_type === "commercial",
    output: {
      primary_agent: "PEA",
      supporting_agents: ["CRMA", "IGA", "reviewer_pricing_safety"],
      required_skills: ["pricing-safety-review", "scope_brief"],
      review_chain: ["reviewer_pricing_safety", "IGA", "QAS"],
      human_gate_required: true,
      human_gate_authority: "Founder",
      reason: "PEA drafts against scope brief and pricing governance. reviewer_pricing_safety is mandatory. Amounts >$15K and all pricing exceptions require Founder. Growth Lead reviews between QAS and Founder.",
    },
  },

  // ── Legal ─────────────────────────────────────────────────────────────────────
  {
    id: "route-legal",
    match: (i) => i.artifact_type === "legal",
    output: {
      primary_agent: "CDA",
      supporting_agents: ["LCA", "IPGA"],
      required_skills: ["legal-compliance", "business_formation"],
      review_chain: ["LCA", "IPGA", "QAS"],
      human_gate_required: true,
      human_gate_authority: "Founder",
      reason: "CDA drafts from canonical templates in 01_system/legal/. LCA and IPGA mandatory compliance and IP checks. ALL legal artifacts require Founder + qualified legal counsel — no exceptions.",
    },
  },

  // ── Build — Architecture ──────────────────────────────────────────────────────
  {
    id: "route-build-architecture",
    match: (i) => i.artifact_type === "build" && i.project_phase === "architecture",
    output: {
      primary_agent: "SAA",
      supporting_agents: ["SEA", "DSS", "PIS", "SMA"],
      required_skills: ["system-maintenance", "web_build"],
      review_chain: ["QAS", "ARE"],
      human_gate_required: true,
      human_gate_authority: "ARE",
      reason: "SAA defines system boundaries and dependency plan. SMA runs pre-build health check. ARE approves architecture on T3+ builds. Founder required for T4/T5.",
    },
  },

  // ── Build — Implementation ────────────────────────────────────────────────────
  {
    id: "route-build-implementation",
    match: (i) =>
      i.artifact_type === "build" &&
      i.project_phase === "implementation",
    output: {
      primary_agent: "SEA",
      supporting_agents: ["FIS", "BLS", "TVA", "SCA", "RCA"],
      required_skills: ["system-maintenance", "web_build"],
      review_chain: ["TVA", "SCA", "QAS", "ARE"],
      human_gate_required: true,
      human_gate_authority: "ARE",
      reason: "SEA leads implementation within approved architecture. FIS handles UI, BLS handles server-side. TVA provides verification evidence. SCA reviews all security surfaces. QAS gates completeness. ARE approves before production.",
    },
  },

  // ── Build — QA Phase ─────────────────────────────────────────────────────────
  {
    id: "route-build-qa",
    match: (i) => i.artifact_type === "build" && i.project_phase === "qa",
    output: {
      primary_agent: "QAS",
      supporting_agents: ["QDA", "TVA", "SCA", "QADM"],
      required_skills: ["qa_multipass"],
      review_chain: ["QDA", "TVA", "SCA", "QAS"],
      human_gate_required: true,
      human_gate_authority: "ARE",
      reason: "QAS runs the 7-pass QA framework. QDA documents evidence. TVA confirms test results. SCA security sweep. QADM monitors for drift. All passes must complete before ARE gate.",
    },
  },

  // ── Release ───────────────────────────────────────────────────────────────────
  {
    id: "route-release",
    match: (i) =>
      i.artifact_type === "release" || i.project_phase === "release",
    output: {
      primary_agent: "DRA",
      supporting_agents: ["QDA", "SCA", "HHC"],
      required_skills: ["disclosure_gate", "release-gate-review"],
      review_chain: ["DRA", "QDA", "QAS", "HHC"],
      human_gate_required: true,
      human_gate_authority: "Founder",
      reason: "DRA leads deployment readiness. disclosure_gate 13-item sweep is mandatory before any file transfer. QAS formal sign-off required. HHC routes to ARE then Founder. handover_protocol.md 6-gate sequence must complete.",
    },
  },

  // ── Handoff ───────────────────────────────────────────────────────────────────
  {
    id: "route-handoff",
    match: (i) => i.project_phase === "handoff",
    output: {
      primary_agent: "HHC",
      supporting_agents: ["DRA", "QDA", "IPGA", "LCA"],
      required_skills: ["disclosure_gate", "completion_report"],
      review_chain: ["QAS", "HHC", "ARE"],
      human_gate_required: true,
      human_gate_authority: "Founder",
      reason: "HHC coordinates the 6-gate handover sequence. disclosure_gate sweep mandatory before any file is shared. Founder must explicitly approve handover — no deadline exception.",
    },
  },

  // ── Content ───────────────────────────────────────────────────────────────────
  {
    id: "route-content",
    match: (i) => i.artifact_type === "content",
    output: {
      primary_agent: "CEA",
      supporting_agents: [
        "BCA",
        "reviewer_plain_language",
        "reviewer_public_proof",
        "QDA",
      ],
      required_skills: ["content_production", "qa_multipass"],
      review_chain: [
        "reviewer_plain_language",
        "reviewer_public_proof",
        "BCA",
        "QDA",
        "QAS",
      ],
      human_gate_required: false,
      human_gate_authority: null,
      reason: "CEA drafts from approved brief. Reviewer chain clears before QAS signs off. Human gate required if content makes market-facing NoDrftSystems product claims or regulatory claims.",
    },
  },

  // ── Strategy ─────────────────────────────────────────────────────────────────
  {
    id: "route-strategy",
    match: (i) =>
      i.artifact_type === "strategy" ||
      i.project_phase === "discovery" ||
      i.project_phase === "strategy",
    output: {
      primary_agent: "PMA",
      supporting_agents: ["SRA", "TSA", "CSM", "MOA-G"],
      required_skills: ["scope_brief", "strategy-brief-builder"],
      review_chain: ["QAS"],
      human_gate_required: true,
      human_gate_authority: "Founder",
      reason: "PMA and SRA lead discovery synthesis and scope definition. TSA and MOA-G provide market context. CSM assembles the context package. Founder approves all strategic decisions.",
    },
  },

  // ── Public Route ─────────────────────────────────────────────────────────────
  {
    id: "route-public-route",
    match: (i) => i.artifact_type === "public-route",
    output: {
      primary_agent: "VDA",
      supporting_agents: [
        "DAA",
        "FIS",
        "BCA",
        "reviewer_public_proof",
        "STAA",
        "reviewer_accessibility",
        "reviewer_plain_language",
        "reviewer_vecs",
      ],
      required_skills: ["visual-direction", "release-gate-review", "legal-compliance"],
      review_chain: [
        "BCA",
        "reviewer_public_proof",
        "STAA",
        "reviewer_accessibility",
        "reviewer_plain_language",
        "reviewer_vecs",
        "QAS",
      ],
      human_gate_required: true,
      human_gate_authority: "Founder",
      reason: "VDA defines authority flow, proof rhythm, and CTA-path logic. DAA translates to component specs. FIS implements. Full reviewer chain required. Founder gates all market-facing route changes.",
    },
  },

  // ── Governance ────────────────────────────────────────────────────────────────
  {
    id: "route-governance",
    match: (i) => i.artifact_type === "governance",
    output: {
      primary_agent: "MOA",
      supporting_agents: ["HHC", "PRGA", "KDGA", "ARE"],
      required_skills: ["completion_report", "decision_log"],
      review_chain: ["QAS", "ARE"],
      human_gate_required: true,
      human_gate_authority: "Founder",
      reason: "All governance changes route through MOA. PRGA maintains organizational clarity. KDGA maintains knowledge integrity. ARE reviews before Founder. Decision Log required for all canonical changes.",
    },
  },

  // ── Business Analysis ─────────────────────────────────────────────────────────
  {
    id: "route-business-analysis",
    match: (i) => i.artifact_type === "business-analysis",
    output: {
      primary_agent: "BAO",
      supporting_agents: ["FMA", "MCA", "RSA", "QAS", "LCA"],
      required_skills: ["business-analysis-evaluation"],
      review_chain: ["RSA", "QAS"],
      human_gate_required: true,
      human_gate_authority: "Founder",
      reason: "BAO (Cyrus) orchestrates the 17-section Business Analysis Sprint. FMA owns financial modeling (Sections 2.6–2.8, 2.16). MCA owns market analysis (Sections 2.2, 2.3, 2.9, 2.14). RSA owns risk/feasibility (Sections 2.4, 2.5, 2.12, 2.13) and runs mandatory FACT-STRICT audit. QAS is non-optional. LCA activates if regulatory flags surface. Founder must approve before any client delivery.",
    },
  },

  // ── Escalation ────────────────────────────────────────────────────────────────
  {
    id: "route-escalation",
    match: (i) => i.artifact_type === "escalation",
    output: {
      primary_agent: "HHC",
      supporting_agents: ["MOA", "ARE"],
      required_skills: ["completion_report"],
      review_chain: ["HHC", "ARE"],
      human_gate_required: true,
      human_gate_authority: "Founder",
      reason: "All escalations route to HHC (Desmond) immediately. HHC coordinates ARE and Founder review. CRITICAL defects stop all related work until resolved.",
    },
  },
];

export function routeTask(input: RoutingInput): RoutingOutput {
  for (const rule of RULES) {
    if (rule.match(input)) {
      return rule.output;
    }
  }

  return {
    primary_agent: "MOA",
    supporting_agents: ["CSM", "QAS"],
    required_skills: ["scope_brief"],
    review_chain: ["QAS"],
    human_gate_required: true,
    human_gate_authority: "Founder",
    reason: "No specific routing rule matched. Defaulting to MOA for orchestration and triage.",
  };
}
