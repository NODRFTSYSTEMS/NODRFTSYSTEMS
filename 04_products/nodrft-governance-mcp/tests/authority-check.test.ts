import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { checkAuthority } from "../src/policy/authority-rules.js";
import { AUTHORITY_SCENARIOS } from "./fixtures/task-scenarios.js";

describe("authority-rules: checkAuthority()", () => {
  // Run all fixture scenarios
  for (const scenario of AUTHORITY_SCENARIOS) {
    test(scenario.description, () => {
      const result = checkAuthority(scenario.input);
      assert.equal(
        result.verdict,
        scenario.expected_verdict,
        `Expected verdict '${scenario.expected_verdict}' but got '${result.verdict}' for: ${scenario.description}`
      );
      assert.equal(
        result.required_authority,
        scenario.expected_authority,
        `Expected authority '${scenario.expected_authority}' but got '${result.required_authority}'`
      );
      assert.equal(
        result.decision_log_required,
        scenario.expected_decision_log,
        `Expected decision_log_required=${scenario.expected_decision_log} but got ${result.decision_log_required}`
      );
      // Every result must include notes
      assert.ok(Array.isArray(result.notes), "notes must be an array");
      assert.ok(result.notes.length > 0, "notes must not be empty");
      // Every result must include a source
      assert.ok(typeof result.source === "string" && result.source.length > 0, "source must be a non-empty string");
    });
  }

  // Edge cases
  describe("edge cases", () => {
    test("draft action always PROCEEDs — even for unknown artifact types (governance intent: drafts are internal)", () => {
      // @ts-expect-error — intentional unknown type for edge case test
      const result = checkAuthority({ artifact_type: "unknown-type", action_type: "draft", risk_level: "standard" });
      assert.equal(result.verdict, "PROCEED", "Draft is always PROCEED — drafts are internal work, no gate required");
    });

    test("send-to-client with no matching rule defaults to HOLD (fail-safe)", () => {
      // send-to-client on an unknown artifact type should hit the fallback → HOLD
      // (none of the specific HOLD rules match unknown types; proceed rules don't cover send-to-client)
      // @ts-expect-error — intentional unknown type for edge case test
      const result = checkAuthority({ artifact_type: "unknown-type", action_type: "send-to-client", risk_level: "standard" });
      assert.equal(result.verdict, "HOLD", "Unknown artifact + send-to-client must default to HOLD, not PROCEED");
      assert.ok(result.source.includes("default-fallback"), "Should identify itself as fallback");
    });

    test("commercial artifact at exactly $15,000 goes to QAS not Founder", () => {
      const result = checkAuthority({
        artifact_type: "commercial",
        action_type: "send-to-client",
        risk_level: "standard",
        amount_usd: 15000,
      });
      assert.equal(result.verdict, "HOLD");
      assert.equal(result.required_authority, "QAS", "At exactly $15K should route to QAS");
    });

    test("commercial artifact at $15,001 goes to Founder", () => {
      const result = checkAuthority({
        artifact_type: "commercial",
        action_type: "send-to-client",
        risk_level: "standard",
        amount_usd: 15001,
      });
      assert.equal(result.verdict, "HOLD");
      assert.equal(result.required_authority, "Founder");
    });

    test("legal review action is PROCEED (review is always permitted)", () => {
      const result = checkAuthority({
        artifact_type: "legal",
        action_type: "review",
        risk_level: "standard",
      });
      assert.equal(result.verdict, "PROCEED");
    });

    test("high-risk governance modify-canonical escalates not holds", () => {
      const result = checkAuthority({
        artifact_type: "governance",
        action_type: "modify-canonical",
        risk_level: "high-risk",
      });
      assert.equal(result.verdict, "ESCALATE");
      assert.equal(result.required_authority, "Founder");
    });

    test("standard governance modify-canonical holds for Founder", () => {
      const result = checkAuthority({
        artifact_type: "governance",
        action_type: "modify-canonical",
        risk_level: "standard",
      });
      assert.equal(result.verdict, "HOLD");
      assert.equal(result.required_authority, "Founder");
      assert.equal(result.decision_log_required, true);
    });

    test("build deploy always requires ARE regardless of risk level", () => {
      const standard = checkAuthority({ artifact_type: "build", action_type: "deploy", risk_level: "standard" });
      const highRisk = checkAuthority({ artifact_type: "build", action_type: "deploy", risk_level: "high-risk" });
      assert.equal(standard.verdict, "HOLD");
      assert.equal(standard.required_authority, "ARE");
      // High-risk release (not build) goes to Founder — build deploy to ARE
      assert.equal(highRisk.verdict, "HOLD");
      assert.equal(highRisk.required_authority, "ARE");
    });

    test("all HOLD and ESCALATE results have non-null blocking_rule", () => {
      const holdCases: Parameters<typeof checkAuthority>[0][] = [
        { artifact_type: "legal", action_type: "send-to-client", risk_level: "standard" },
        { artifact_type: "commercial", action_type: "price-exception", risk_level: "standard" },
        { artifact_type: "release", action_type: "transfer", risk_level: "standard" },
      ];
      for (const input of holdCases) {
        const result = checkAuthority(input);
        assert.ok(
          result.blocking_rule !== null && result.blocking_rule.length > 0,
          `blocking_rule must be non-null for HOLD/ESCALATE: ${JSON.stringify(input)}`
        );
      }
    });

    test("PROCEED results have null blocking_rule", () => {
      const result = checkAuthority({ artifact_type: "build", action_type: "draft", risk_level: "standard" });
      assert.equal(result.verdict, "PROCEED");
      assert.equal(result.blocking_rule, null);
    });
  });
});
