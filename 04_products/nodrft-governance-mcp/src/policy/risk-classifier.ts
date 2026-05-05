// Risk classifier for the NoDrftSystems Governance MCP Server.
// Determines whether an artifact/action combination is standard or high-risk
// when the caller does not explicitly specify a risk level.

import type { ArtifactType, ActionType, RiskLevel } from "./artifact-types.js";

export interface RiskClassificationInput {
  artifact_type: ArtifactType;
  action_type: ActionType;
  amount_usd?: number;
  has_client_pii?: boolean;
  has_billing?: boolean;
  is_production?: boolean;
  has_external_delivery?: boolean;
}

export interface RiskClassificationOutput {
  risk_level: RiskLevel;
  risk_factors: string[];
  justification: string;
}

// Artifact types that are always high-risk regardless of action
const ALWAYS_HIGH_RISK_ARTIFACTS: ArtifactType[] = ["legal", "escalation"];

// Actions that elevate any artifact to high-risk
const HIGH_RISK_ACTIONS: ActionType[] = [
  "send-to-client",
  "deploy",
  "publish",
  "transfer",
  "modify-canonical",
  "price-exception",
];

export function classifyRisk(input: RiskClassificationInput): RiskClassificationOutput {
  const factors: string[] = [];

  if (ALWAYS_HIGH_RISK_ARTIFACTS.includes(input.artifact_type)) {
    factors.push(`Artifact type '${input.artifact_type}' is always classified high-risk`);
  }

  if (HIGH_RISK_ACTIONS.includes(input.action_type)) {
    factors.push(`Action '${input.action_type}' is a high-risk action class`);
  }

  if ((input.amount_usd ?? 0) > 15000) {
    factors.push(`Commercial value $${input.amount_usd?.toLocaleString()} exceeds $15,000 Founder threshold`);
  }

  if (input.has_client_pii) {
    factors.push("Artifact involves client PII — privacy review required");
  }

  if (input.has_billing) {
    factors.push("Artifact touches billing systems — elevated scrutiny required");
  }

  if (input.is_production) {
    factors.push("Artifact targets production environment");
  }

  if (input.has_external_delivery) {
    factors.push("Artifact is intended for external delivery");
  }

  const isHighRisk = factors.length > 0;

  return {
    risk_level: isHighRisk ? "high-risk" : "standard",
    risk_factors: factors,
    justification: isHighRisk
      ? `Classified as high-risk due to: ${factors.join("; ")}`
      : "No high-risk factors identified — classified as standard",
  };
}
