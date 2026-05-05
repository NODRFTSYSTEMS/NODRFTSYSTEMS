// Test fixtures — known task scenarios with expected authority and routing outcomes.
// These represent real-world NoDrftSystems governance decisions.

import type { AuthorityCheckInput } from "../../src/policy/authority-rules.js";
import type { RoutingInput } from "../../src/policy/routing.js";

export interface AuthorityScenario {
  description: string;
  input: AuthorityCheckInput;
  expected_verdict: "PROCEED" | "HOLD" | "ESCALATE";
  expected_authority: string;
  expected_decision_log: boolean;
}

export interface RoutingScenario {
  description: string;
  input: RoutingInput;
  expected_primary_agent: string;
  expected_human_gate: boolean;
}

export const AUTHORITY_SCENARIOS: AuthorityScenario[] = [
  {
    description: "Legal artifact being sent to client — must HOLD for Founder + counsel",
    input: { artifact_type: "legal", action_type: "send-to-client", risk_level: "standard" },
    expected_verdict: "HOLD",
    expected_authority: "Founder",
    expected_decision_log: true,
  },
  {
    description: "Commercial proposal over $15K — must HOLD for Founder",
    input: { artifact_type: "commercial", action_type: "send-to-client", risk_level: "standard", amount_usd: 20000 },
    expected_verdict: "HOLD",
    expected_authority: "Founder",
    expected_decision_log: false,
  },
  {
    description: "Commercial proposal under $15K — HOLD for QAS gate (not Founder)",
    input: { artifact_type: "commercial", action_type: "send-to-client", risk_level: "standard", amount_usd: 8000 },
    expected_verdict: "HOLD",
    expected_authority: "QAS",
    expected_decision_log: false,
  },
  {
    description: "Pricing exception request — must HOLD, non-delegable to Founder",
    input: { artifact_type: "commercial", action_type: "price-exception", risk_level: "standard" },
    expected_verdict: "HOLD",
    expected_authority: "Founder",
    expected_decision_log: true,
  },
  {
    description: "Build deployment to production — HOLD for ARE sign-off",
    input: { artifact_type: "build", action_type: "deploy", risk_level: "standard" },
    expected_verdict: "HOLD",
    expected_authority: "ARE",
    expected_decision_log: false,
  },
  {
    description: "High-risk release with client data — HOLD for Founder",
    input: { artifact_type: "release", action_type: "deploy", risk_level: "high-risk" },
    expected_verdict: "HOLD",
    expected_authority: "Founder",
    expected_decision_log: true,
  },
  {
    description: "Repository transfer — HOLD for Founder, 6-gate sequence required",
    input: { artifact_type: "release", action_type: "transfer", risk_level: "standard" },
    expected_verdict: "HOLD",
    expected_authority: "Founder",
    expected_decision_log: true,
  },
  {
    description: "Public route publish — HOLD for Founder",
    input: { artifact_type: "public-route", action_type: "publish", risk_level: "standard" },
    expected_verdict: "HOLD",
    expected_authority: "Founder",
    expected_decision_log: false,
  },
  {
    description: "Modify canonical governance document — HOLD for Founder, Decision Log required",
    input: { artifact_type: "governance", action_type: "modify-canonical", risk_level: "standard" },
    expected_verdict: "HOLD",
    expected_authority: "Founder",
    expected_decision_log: true,
  },
  {
    description: "CRITICAL defect detected — must ESCALATE to HHC",
    input: { artifact_type: "escalation", action_type: "review", risk_level: "high-risk" },
    expected_verdict: "ESCALATE",
    expected_authority: "HHC",
    expected_decision_log: true,
  },
  {
    description: "Draft build artifact — PROCEED (draft is always allowed)",
    input: { artifact_type: "build", action_type: "draft", risk_level: "standard" },
    expected_verdict: "PROCEED",
    expected_authority: "none",
    expected_decision_log: false,
  },
  {
    description: "Review any artifact — PROCEED (review is always allowed)",
    input: { artifact_type: "legal", action_type: "review", risk_level: "standard" },
    expected_verdict: "PROCEED",
    expected_authority: "none",
    expected_decision_log: false,
  },
  {
    description: "Standard content draft — PROCEED to QAS",
    input: { artifact_type: "content", action_type: "draft", risk_level: "standard" },
    expected_verdict: "PROCEED",
    expected_authority: "none",
    expected_decision_log: false,
  },
  {
    description: "High-risk content publish (regulatory claims) — HOLD for Founder",
    input: { artifact_type: "content", action_type: "publish", risk_level: "high-risk" },
    expected_verdict: "HOLD",
    expected_authority: "Founder",
    expected_decision_log: false,
  },
];

export const ROUTING_SCENARIOS: RoutingScenario[] = [
  {
    description: "Intake routing — always routes through MOA",
    input: { task_summary: "New client inquiry for a business website", artifact_type: "intake", risk_level: "standard", project_phase: "intake" },
    expected_primary_agent: "MOA",
    expected_human_gate: true,
  },
  {
    description: "Commercial artifact routing — routes to PEA",
    input: { task_summary: "Draft proposal for T3 Authority Website build", artifact_type: "commercial", risk_level: "standard", project_phase: "strategy" },
    expected_primary_agent: "PEA",
    expected_human_gate: true,
  },
  {
    description: "Legal artifact routing — routes to CDA",
    input: { task_summary: "Draft NDA for new client engagement", artifact_type: "legal", risk_level: "high-risk", project_phase: "intake" },
    expected_primary_agent: "CDA",
    expected_human_gate: true,
  },
  {
    description: "Build architecture routing — routes to SAA",
    input: { task_summary: "Design system architecture for T3 website with CMS", artifact_type: "build", risk_level: "standard", project_phase: "architecture" },
    expected_primary_agent: "SAA",
    expected_human_gate: true,
  },
  {
    description: "Build implementation routing — routes to SEA",
    input: { task_summary: "Implement homepage and contact form components", artifact_type: "build", risk_level: "standard", project_phase: "implementation" },
    expected_primary_agent: "SEA",
    expected_human_gate: true,
  },
  {
    description: "Release routing — routes to DRA",
    input: { task_summary: "Deploy completed site to production", artifact_type: "release", risk_level: "high-risk", project_phase: "release" },
    expected_primary_agent: "DRA",
    expected_human_gate: true,
  },
  {
    description: "Content routing — routes to CEA",
    input: { task_summary: "Write 3 SEO blog posts for client", artifact_type: "content", risk_level: "standard", project_phase: "implementation" },
    expected_primary_agent: "CEA",
    expected_human_gate: false,
  },
  {
    description: "Strategy routing — routes to PMA",
    input: { task_summary: "Synthesize discovery findings into scope brief", artifact_type: "strategy", risk_level: "standard", project_phase: "discovery" },
    expected_primary_agent: "PMA",
    expected_human_gate: true,
  },
  {
    description: "Escalation routing — always routes to HHC",
    input: { task_summary: "CRITICAL: security vulnerability found in auth layer", artifact_type: "escalation", risk_level: "high-risk", project_phase: "qa" },
    expected_primary_agent: "HHC",
    expected_human_gate: true,
  },
  {
    description: "Public route routing — routes to VDA",
    input: { task_summary: "Redesign homepage hero section and packages page", artifact_type: "public-route", risk_level: "standard", project_phase: "implementation" },
    expected_primary_agent: "VDA",
    expected_human_gate: true,
  },
];
