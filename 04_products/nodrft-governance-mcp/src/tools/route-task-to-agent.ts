import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { routeTask } from "../policy/routing.js";
import { validateAgentCodes, REGISTRY_COUNT_FLAG } from "../loaders/registry-loader.js";
import type { ArtifactType, ProjectPhase, RiskLevel } from "../policy/artifact-types.js";

export function register(server: McpServer): void {
  server.tool(
    "route_task_to_agent",
    "Determine the correct primary agent, supporting agents, required skills, and review chain for a given task. Returns the human gate authority and reason. Always call this before assigning work to any agent cell.",
    {
      task_summary: z
        .string()
        .min(10)
        .describe("Brief description of the task to be executed (minimum 10 characters)"),
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
        .describe("Type of artifact being produced or acted upon"),
      risk_level: z
        .enum(["standard", "high-risk"])
        .describe("Risk classification — use run_authority_check if unsure"),
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
    },
    async ({ task_summary, artifact_type, risk_level, project_phase }) => {
      const routing = routeTask({
        task_summary,
        artifact_type: artifact_type as ArtifactType,
        risk_level: risk_level as RiskLevel,
        project_phase: project_phase as ProjectPhase,
      });

      // Validate that all agent codes in the response are known
      const allAgents = [routing.primary_agent, ...routing.supporting_agents, ...routing.review_chain];
      const { unknown } = validateAgentCodes(allAgents);

      const result = {
        task_summary,
        artifact_type,
        risk_level,
        project_phase,
        routing,
        registry_warnings: [
          ...(unknown.length > 0
            ? [`Unknown agent codes in routing output: ${unknown.join(", ")} — verify against registry`]
            : []),
          ...(REGISTRY_COUNT_FLAG.inconsistency
            ? [REGISTRY_COUNT_FLAG.message]
            : []),
        ],
        governance_note:
          "This routing is derived from ai-review-authority-matrix.md and skill-loading-matrix.md. " +
          "Verify against current canonical documents if registry or skill changes have occurred.",
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
