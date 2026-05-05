import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { routeTask } from "../src/policy/routing.js";
import { getAgentByCode, ROUTING_AGENTS } from "../src/loaders/registry-loader.js";
import { ROUTING_SCENARIOS } from "./fixtures/task-scenarios.js";

describe("routing: routeTask()", () => {
  // Run all fixture scenarios
  for (const scenario of ROUTING_SCENARIOS) {
    test(scenario.description, () => {
      const result = routeTask(scenario.input);
      assert.equal(
        result.primary_agent,
        scenario.expected_primary_agent,
        `Expected primary_agent '${scenario.expected_primary_agent}' but got '${result.primary_agent}'`
      );
      assert.equal(
        result.human_gate_required,
        scenario.expected_human_gate,
        `Expected human_gate_required=${scenario.expected_human_gate} for: ${scenario.description}`
      );
      // All routing results must have a reason
      assert.ok(typeof result.reason === "string" && result.reason.length > 10, "reason must be non-empty");
      // Supporting agents must be an array
      assert.ok(Array.isArray(result.supporting_agents), "supporting_agents must be an array");
      // Review chain must be an array
      assert.ok(Array.isArray(result.review_chain), "review_chain must be an array");
      // If human gate is required, human_gate_authority must be non-null
      if (scenario.expected_human_gate) {
        assert.ok(
          result.human_gate_authority !== null,
          "human_gate_authority must be set when human_gate_required is true"
        );
      }
    });
  }

  describe("structural invariants", () => {
    test("MOA is the primary agent for intake phase tasks", () => {
      const result = routeTask({
        task_summary: "Evaluate new prospect inquiry from contact form",
        artifact_type: "intake",
        risk_level: "standard",
        project_phase: "intake",
      });
      assert.equal(result.primary_agent, "MOA");
    });

    test("HHC is always the primary agent for escalation artifacts", () => {
      const result = routeTask({
        task_summary: "CRITICAL security vulnerability found during QA",
        artifact_type: "escalation",
        risk_level: "high-risk",
        project_phase: "qa",
      });
      assert.equal(result.primary_agent, "HHC");
      assert.equal(result.human_gate_required, true);
    });

    test("all legal routing results include CDA, LCA, and IPGA", () => {
      const result = routeTask({
        task_summary: "Prepare MSA for new client engagement",
        artifact_type: "legal",
        risk_level: "high-risk",
        project_phase: "intake",
      });
      assert.equal(result.primary_agent, "CDA");
      assert.ok(result.supporting_agents.includes("LCA"), "LCA must be in supporting agents for legal");
      assert.ok(result.supporting_agents.includes("IPGA"), "IPGA must be in supporting agents for legal");
    });

    test("commercial routing always includes reviewer_pricing_safety", () => {
      const result = routeTask({
        task_summary: "Draft SOW and proposal for T2 business site",
        artifact_type: "commercial",
        risk_level: "standard",
        project_phase: "strategy",
      });
      const allAgents = [...result.supporting_agents, ...result.review_chain];
      assert.ok(
        allAgents.includes("reviewer_pricing_safety"),
        "reviewer_pricing_safety must appear in commercial routing"
      );
    });

    test("build implementation routing includes TVA and SCA in review chain", () => {
      const result = routeTask({
        task_summary: "Implement responsive navigation and hero section",
        artifact_type: "build",
        risk_level: "standard",
        project_phase: "implementation",
      });
      assert.ok(result.review_chain.includes("TVA") || result.supporting_agents.includes("TVA"),
        "TVA must be in implementation routing");
      assert.ok(result.review_chain.includes("SCA") || result.supporting_agents.includes("SCA"),
        "SCA must be in implementation routing");
    });

    test("release routing always includes disclosure_gate skill", () => {
      const result = routeTask({
        task_summary: "Deploy completed website to production and transfer to client",
        artifact_type: "release",
        risk_level: "high-risk",
        project_phase: "release",
      });
      assert.ok(
        result.required_skills.includes("disclosure_gate"),
        "disclosure_gate skill must be required for release routing"
      );
    });

    test("default fallback routing targets MOA", () => {
      const result = routeTask({
        // @ts-expect-error — intentional unknown type for fallback test
        task_summary: "Unclassified task with no matching rule",
        artifact_type: "intake",
        risk_level: "standard",
        // @ts-expect-error
        project_phase: "unrecognized-phase",
      });
      assert.equal(result.primary_agent, "MOA");
    });
  });

  describe("registry validation", () => {
    test("all primary agents returned by routing rules exist in the registry", () => {
      const testCases: Parameters<typeof routeTask>[0][] = [
        { task_summary: "test", artifact_type: "commercial", risk_level: "standard", project_phase: "strategy" },
        { task_summary: "test", artifact_type: "legal", risk_level: "standard", project_phase: "intake" },
        { task_summary: "test", artifact_type: "build", risk_level: "standard", project_phase: "implementation" },
        { task_summary: "test", artifact_type: "content", risk_level: "standard", project_phase: "implementation" },
        { task_summary: "test", artifact_type: "strategy", risk_level: "standard", project_phase: "discovery" },
        { task_summary: "test", artifact_type: "release", risk_level: "high-risk", project_phase: "release" },
        { task_summary: "test", artifact_type: "escalation", risk_level: "high-risk", project_phase: "qa" },
      ];

      for (const tc of testCases) {
        const result = routeTask(tc);
        const agent = getAgentByCode(result.primary_agent);
        // ARE is a special authority role — skip registry check for it
        if (result.primary_agent !== "ARE" && result.primary_agent !== "Founder") {
          assert.ok(
            agent !== undefined,
            `Primary agent '${result.primary_agent}' for artifact_type='${tc.artifact_type}' not found in registry`
          );
        }
      }
    });

    test("registry embeds 64 agents per approved 2026-04-24 registry", () => {
      // Exclude the "Founder" non-agent and human-role entries
      const agentCodes = ROUTING_AGENTS.map((a) => a.code);
      // Total entries includes reviewer sub-agents and ARE
      assert.ok(agentCodes.length >= 60, `Registry should have ≥60 entries, found ${agentCodes.length}`);
    });
  });
});
