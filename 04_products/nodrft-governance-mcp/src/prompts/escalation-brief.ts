import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function register(server: McpServer): void {
  server.prompt(
    "human_escalation_brief",
    "Generate a concise, structured escalation brief for the human authority (Founder, ARE, or QAS). Summarizes the situation, the specific decision required, the options available, and the consequence of each. Optimized for human decision-making speed — not comprehensive explanation.",
    {
      project_id: z.string().min(2).describe("Project identifier"),
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
        .describe("Type of escalation"),
      addressed_to: z
        .enum(["Founder", "ARE", "QAS", "HHC"])
        .describe("Human authority this brief is addressed to"),
      situation: z
        .string()
        .min(20)
        .describe("What happened and why it requires human decision (2-3 sentences maximum)"),
      decision_needed: z
        .string()
        .min(10)
        .describe("The exact yes/no or choice decision needed"),
      option_a: z.string().describe("First option available (e.g., Approve)"),
      option_a_consequence: z.string().describe("Consequence if option A is chosen"),
      option_b: z.string().describe("Second option available (e.g., Reject / Hold)"),
      option_b_consequence: z.string().describe("Consequence if option B is chosen"),
      time_sensitivity: z
        .enum(["IMMEDIATE", "WITHIN_24H", "WITHIN_48H", "NON_URGENT"])
        .default("WITHIN_24H")
        .describe("How time-sensitive this escalation is"),
    },
    async ({
      project_id,
      escalation_type,
      addressed_to,
      situation,
      decision_needed,
      option_a,
      option_a_consequence,
      option_b,
      option_b_consequence,
      time_sensitivity,
    }) => {
      const urgencyBadge: Record<string, string> = {
        IMMEDIATE: "🔴 IMMEDIATE ACTION REQUIRED",
        WITHIN_24H: "🟡 DECISION NEEDED WITHIN 24 HOURS",
        WITHIN_48H: "🟠 DECISION NEEDED WITHIN 48 HOURS",
        NON_URGENT: "🟢 NON-URGENT — DECISION AT YOUR CONVENIENCE",
      };

      const badge = urgencyBadge[time_sensitivity] ?? urgencyBadge["WITHIN_24H"];

      const text = [
        `# ESCALATION BRIEF — ${addressed_to} ACTION REQUIRED`,
        ``,
        `**${badge}**`,
        ``,
        `**Project:** ${project_id}`,
        `**Type:** ${escalation_type}`,
        `**Date:** ${new Date().toISOString().split("T")[0]}`,
        `**Addressed to:** ${addressed_to}`,
        ``,
        `---`,
        ``,
        `## Situation`,
        situation,
        ``,
        `## Decision Required`,
        decision_needed,
        ``,
        `## Options`,
        ``,
        `**A — ${option_a}**`,
        `Consequence: ${option_a_consequence}`,
        ``,
        `**B — ${option_b}**`,
        `Consequence: ${option_b_consequence}`,
        ``,
        `---`,
        ``,
        `## To Respond`,
        `Reply with A or B (or provide a specific instruction) to unblock the team.`,
        `All work on this item is HELD until your decision is received.`,
        ``,
        `*Prepared by nodrft-governance-mcp — human_escalation_brief prompt*`,
        `*File this response in the project Decision Log before work resumes.*`,
      ].join("\n");

      return {
        messages: [
          {
            role: "user" as const,
            content: { type: "text" as const, text: text },
          },
        ],
      };
    }
  );
}
