import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// This tool formats a structured escalation log entry as a markdown string.
// It does NOT write to any file — the human operator pastes or saves the output.
// Writing to governance files always requires explicit human action.

export function register(server: McpServer): void {
  server.tool(
    "prepare_escalation_log_entry",
    "Format a structured escalation log entry for human review and manual filing. This tool produces the log entry text only — it does NOT write to any file. The Founder or ARE must file the entry. Use when a HOLD or ESCALATE condition is encountered that requires human authorization.",
    {
      project_id: z
        .string()
        .min(2)
        .describe("Project identifier (e.g., WALCOTT_homepage-website)"),
      escalation_type: z
        .enum([
          "CRITICAL_DEFECT",
          "SCOPE_BEYOND_SOW",
          "PRICING_EXCEPTION_REQUEST",
          "AUTHORITY_HOLD",
          "DISCLOSURE_RISK",
          "LEGAL_REVIEW_REQUIRED",
          "PRODUCTION_RELEASE_GATE",
          "GOVERNANCE_CHANGE_REQUEST",
        ])
        .describe("Type of escalation condition"),
      agent_code: z
        .string()
        .describe("Code of the agent raising the escalation (e.g., QAS, SEA, MOA)"),
      finding: z
        .string()
        .min(10)
        .describe("Specific finding or condition that triggered the escalation"),
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
        ])
        .describe("Type of artifact involved"),
      action_blocked: z
        .string()
        .describe("The specific action that is blocked pending human decision"),
      required_decision: z
        .string()
        .describe("The exact decision or authorization needed from the human authority"),
      supporting_context: z
        .string()
        .optional()
        .describe("Optional: additional context for the authority reviewing this escalation"),
      severity: z
        .enum(["CRITICAL", "IMPORTANT", "ENHANCEMENT"])
        .default("CRITICAL")
        .describe("Defect or issue severity classification"),
    },
    async ({
      project_id,
      escalation_type,
      agent_code,
      finding,
      artifact_type,
      action_blocked,
      required_decision,
      supporting_context,
      severity,
    }) => {
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0];
      const timeStr = now.toISOString().split("T")[1]?.split(".")[0] ?? "00:00:00";

      const routingTarget = getRoutingTarget(escalation_type);
      const filePath = `02_client-system/${project_id}/00_admin/escalation-log.md`;

      const entry = [
        `## ESCALATION LOG ENTRY`,
        ``,
        `**Date:** ${dateStr}`,
        `**Time (UTC):** ${timeStr}`,
        `**Project:** ${project_id}`,
        `**Escalation Type:** ${escalation_type}`,
        `**Severity:** [${severity}]`,
        `**Raised By:** ${agent_code}`,
        `**Artifact Type:** ${artifact_type}`,
        `**Route To:** ${routingTarget}`,
        ``,
        `### Finding`,
        finding,
        ``,
        `### Action Blocked`,
        action_blocked,
        ``,
        `### Required Decision`,
        required_decision,
        ...(supporting_context
          ? [``, `### Supporting Context`, supporting_context]
          : []),
        ``,
        `### Governance Reference`,
        `- Authority source: \`01_system/ai-governance/ai-review-authority-matrix.md\``,
        `- Escalation protocol: \`01_system/ai-governance/exceptional-build-escalation-protocol-2026-04-15.md\``,
        `- Human routing: HHC (Desmond) coordinates all escalations to ARE and Founder`,
        ``,
        `### Resolution`,
        `- [ ] Reviewed by ${routingTarget}`,
        `- [ ] Decision recorded: ____________________________________`,
        `- [ ] Date resolved: ____________________________________`,
        `- [ ] Work may resume: YES / NO`,
        ``,
        `---`,
        `*This entry was prepared by the nodrft-governance-mcp server and requires human filing.*`,
        `*Suggested file path: \`${filePath}\`*`,
        `*Do not discard — log all escalations per NoDrftSystems governance protocol.*`,
      ].join("\n");

      const meta = {
        entry_prepared_at: now.toISOString(),
        project_id,
        escalation_type,
        severity,
        routing_target: routingTarget,
        suggested_file_path: filePath,
        write_instruction:
          "MANUAL ACTION REQUIRED: Copy this entry to the project escalation log. " +
          "The MCP server does not write to governance files — this is intentional. " +
          "Founder or ARE must review and complete the resolution section.",
      };

      const result = {
        meta,
        entry_markdown: entry,
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}

function getRoutingTarget(escalationType: string): string {
  const targets: Record<string, string> = {
    CRITICAL_DEFECT: "HHC → ARE → Founder",
    SCOPE_BEYOND_SOW: "HHC → Founder",
    PRICING_EXCEPTION_REQUEST: "Founder (non-delegable)",
    AUTHORITY_HOLD: "HHC → ARE or Founder (per authority matrix)",
    DISCLOSURE_RISK: "HHC → Founder (immediate — do not transfer any files)",
    LEGAL_REVIEW_REQUIRED: "Founder + qualified legal counsel",
    PRODUCTION_RELEASE_GATE: "ARE → Founder",
    GOVERNANCE_CHANGE_REQUEST: "ARE → Founder (Decision Log required)",
  };
  return targets[escalationType] ?? "HHC → Founder";
}
