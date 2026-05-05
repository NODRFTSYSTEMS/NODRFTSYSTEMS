import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { checkScopeDrift, type DriftStatus } from "../src/tools/run-scope-drift-check.js";

describe("run-scope-drift-check: checkScopeDrift()", () => {
  describe("NO_DRIFT cases", () => {
    test("implementation task matching scope description — no drift", () => {
      const result = checkScopeDrift({
        requested_action: "Implement homepage hero section with responsive layout",
        action_type: "draft",
        artifact_type: "build",
        active_scope: "Build homepage hero section navigation footer and contact form with responsive layout",
        project_phase: "implementation",
        agent_code: "SEA",
        loaded_skills: ["system-maintenance", "web_build"],
      });
      assert.equal(result.drift_status, "NO_DRIFT");
      assert.equal(result.blocked_actions.length, 0);
      assert.ok(result.safe_next_actions.some((a) => a.includes("Continue")), "Safe actions should include Continue");
    });

    test("review action in any phase — never drifts on action type alone", () => {
      const result = checkScopeDrift({
        requested_action: "Review QA pass 1 results for build artifacts",
        action_type: "review",
        artifact_type: "build",
        active_scope: "QA review of all build artifacts for T2 business site",
        project_phase: "qa",
        agent_code: "QAS",
        loaded_skills: ["qa_multipass"],
      });
      assert.notEqual(result.drift_status, "CONFIRMED_DRIFT");
      assert.equal(result.blocked_actions.length, 0);
    });
  });

  describe("POSSIBLE_DRIFT cases", () => {
    test("scope-expansion language in request triggers POSSIBLE_DRIFT", () => {
      const result = checkScopeDrift({
        requested_action: "Add new feature for user dashboard beyond the original scope",
        action_type: "draft",
        artifact_type: "build",
        active_scope: "Build homepage contact form and about page for T2 site",
        project_phase: "implementation",
        agent_code: "SEA",
        loaded_skills: ["system-maintenance"],
      });
      assert.ok(
        result.drift_status === "POSSIBLE_DRIFT" || result.drift_status === "CONFIRMED_DRIFT",
        `Expected drift to be detected for scope-expansion language, got: ${result.drift_status}`
      );
      assert.ok(result.findings.length > 0, "Should have findings");
    });

    test("missing required skills triggers a finding", () => {
      const result = checkScopeDrift({
        requested_action: "Deploy the completed site to Vercel production",
        action_type: "deploy",
        artifact_type: "release",
        active_scope: "Deploy website to production and complete client handoff",
        project_phase: "release",
        agent_code: "DRA",
        loaded_skills: [], // disclosure_gate and release-gate-review are missing
      });
      assert.ok(
        result.required_skills_missing.length > 0,
        "Should flag missing required skills for release artifact"
      );
      assert.ok(
        result.required_skills_missing.includes("disclosure_gate"),
        "disclosure_gate must be flagged as missing for release"
      );
    });
  });

  describe("CONFIRMED_DRIFT cases", () => {
    test("wrong artifact type for project phase — confirmed drift", () => {
      const result = checkScopeDrift({
        requested_action: "Deploy website to production",
        action_type: "deploy",
        artifact_type: "release",
        active_scope: "Build and implement website features",
        project_phase: "intake", // release artifact in intake phase = confirmed drift
        agent_code: "DRA",
        loaded_skills: [],
      });
      assert.equal(result.drift_status, "CONFIRMED_DRIFT");
      assert.ok(result.blocked_actions.length > 0, "Actions should be blocked on confirmed drift");
      assert.ok(
        result.safe_next_actions.some((a) => a.includes("STOP")),
        "Safe actions should include STOP instruction on confirmed drift"
      );
    });

    test("transfer action in implementation phase — confirmed drift", () => {
      const result = checkScopeDrift({
        requested_action: "Transfer repository to client",
        action_type: "transfer",
        artifact_type: "release",
        active_scope: "Implement website components",
        project_phase: "implementation", // handoff in implementation phase = wrong phase
        agent_code: "HHC",
        loaded_skills: [],
      });
      assert.equal(result.drift_status, "CONFIRMED_DRIFT");
    });
  });

  describe("structural invariants", () => {
    test("always returns a governance_source string", () => {
      const result = checkScopeDrift({
        requested_action: "Any task",
        action_type: "draft",
        artifact_type: "build",
        active_scope: "Active project scope",
        project_phase: "implementation",
        agent_code: "SEA",
      });
      assert.ok(
        typeof result.governance_source === "string" && result.governance_source.length > 0,
        "governance_source must always be present"
      );
    });

    test("always returns an array of safe_next_actions", () => {
      const result = checkScopeDrift({
        requested_action: "Any task",
        action_type: "draft",
        artifact_type: "content",
        active_scope: "Write blog posts",
        project_phase: "implementation",
        agent_code: "CEA",
      });
      assert.ok(Array.isArray(result.safe_next_actions), "safe_next_actions must be an array");
      assert.ok(result.safe_next_actions.length > 0, "safe_next_actions must not be empty");
    });

    test("CONFIRMED_DRIFT always has at least one blocked action", () => {
      const result = checkScopeDrift({
        requested_action: "Transfer repo to client",
        action_type: "transfer",
        artifact_type: "release",
        active_scope: "Build initial components",
        project_phase: "intake",
        agent_code: "HHC",
        loaded_skills: [],
      });
      if (result.drift_status === "CONFIRMED_DRIFT") {
        assert.ok(result.blocked_actions.length > 0, "CONFIRMED_DRIFT must have blocked actions");
      }
    });

    test("always-check actions generate at least one finding", () => {
      const alwaysCheckActions = ["deploy", "transfer", "publish", "modify-canonical", "price-exception"] as const;
      for (const action of alwaysCheckActions) {
        const result = checkScopeDrift({
          requested_action: `Perform ${action} action`,
          action_type: action,
          artifact_type: "build",
          active_scope: "Build website for client",
          project_phase: "implementation",
          agent_code: "SEA",
          loaded_skills: [],
        });
        assert.ok(
          result.findings.length > 0,
          `Action '${action}' should always generate at least one finding`
        );
      }
    });
  });
});
