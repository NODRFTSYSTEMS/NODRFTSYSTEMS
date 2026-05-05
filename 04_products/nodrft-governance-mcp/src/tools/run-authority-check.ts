import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { checkAuthority } from "../policy/authority-rules.js";
import type { ArtifactType, ActionType, RiskLevel } from "../policy/artifact-types.js";

export function register(server: McpServer): void {
  server.tool(
    "run_authority_check",
    "Check whether an agent action is permitted (PROCEED), requires human sign-off (HOLD), or must be immediately escalated (ESCALATE). Returns the governing rule, required authority level, and whether a Decision Log entry is required. This is the primary authority gate — call it before any consequential action.",
    {
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
        .describe("The specific action being requested"),
      risk_level: z
        .enum(["standard", "high-risk"])
        .describe("Risk classification for this action — use high-risk when touching PII, billing, production, or external delivery"),
      amount_usd: z
        .number()
        .optional()
        .describe("Dollar value for commercial artifacts — required when artifact_type is 'commercial'"),
      notes: z
        .string()
        .optional()
        .describe("Additional context that may affect the authority decision"),
    },
    async ({ artifact_type, action_type, risk_level, amount_usd, notes }) => {
      const result = checkAuthority({
        artifact_type: artifact_type as ArtifactType,
        action_type: action_type as ActionType,
        risk_level: risk_level as RiskLevel,
        amount_usd,
        notes,
      });

      const response = {
        input: { artifact_type, action_type, risk_level, amount_usd, notes },
        ...result,
        enforcement_note:
          result.verdict === "HOLD"
            ? "Action is BLOCKED until the required authority grants approval. Do not proceed."
            : result.verdict === "ESCALATE"
            ? "Escalate immediately to HHC (Desmond). Do not attempt to resolve this without human authority."
            : "PROCEED — complete the review chain noted above before any external delivery.",
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(response, null, 2) }],
      };
    }
  );
}
