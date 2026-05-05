import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { ROUTING_AGENTS, getAgentByCode, validateAgentCodes, REGISTRY_COUNT_FLAG } from "../src/loaders/registry-loader.js";

// Canonical identities from 01_system/registry/final-approved-department-and-agent-registry.md (2026-04-24)
// This table is the enforcement layer. If the approved registry changes, this test MUST be updated.
const EXPECTED_IDENTITIES: Array<{ code: string; name: string; department: string }> = [
  // Supervisor Layer
  { code: "MOA", name: "Zayne", department: "Supervision" },
  { code: "QAS", name: "Imani", department: "Supervision" },
  { code: "CSM", name: "Josette", department: "Supervision" },
  { code: "HHC", name: "Desmond", department: "Supervision" },
  // Revenue & Sales
  { code: "SDA", name: "Marlon", department: "Sales" },
  { code: "OOA", name: "Althea", department: "Sales" },
  { code: "CRMA", name: "Daren", department: "Sales" },
  { code: "PEA", name: "Giselle", department: "Sales" },
  { code: "DCPA", name: "Vaughn", department: "Sales" },
  // Marketing & Content
  { code: "CEA", name: "Kalila", department: "Marketing" },
  { code: "BCA", name: "Nadine", department: "Marketing" },
  { code: "STAA", name: "Jermaine", department: "Marketing" },
  { code: "DSA", name: "Soraya", department: "Marketing" },
  { code: "CPA", name: "Dwayne", department: "Marketing" },
  // Delivery & Build
  { code: "PMA", name: "Keon", department: "Delivery" },
  { code: "SAA", name: "Samara", department: "Delivery" },
  { code: "RCA", name: "Deven", department: "Delivery" },
  { code: "SEA", name: "Malik", department: "Delivery" },
  { code: "FIS", name: "Kiara", department: "Delivery" },
  { code: "BLS", name: "Khari", department: "Delivery" },
  { code: "IDS", name: "Nia", department: "Delivery" },
  { code: "DAA", name: "Anika", department: "Delivery" },
  { code: "TVA", name: "Leandra", department: "Delivery" },
  { code: "AAA", name: "Rochelle", department: "Delivery" },
  { code: "DRA", name: "Terrence", department: "Delivery" },
  { code: "VDA", name: "Jeanine", department: "Delivery" },
  // Quality & Compliance
  { code: "QDA", name: "Patrice", department: "Quality" },
  { code: "QADM", name: "Fabian", department: "Quality" },
  { code: "IPGA", name: "Camille", department: "Quality" },
  { code: "SCA", name: "Omari", department: "Quality" },
  { code: "BPA", name: "Maritza", department: "Quality" },
  { code: "PLA", name: "Simone", department: "Quality" },
  { code: "LCA", name: "Dorothy", department: "Quality" },
  // Client Success
  { code: "COA", name: "Talia", department: "ClientSuccess" },
  { code: "CCA", name: "Renzo", department: "ClientSuccess" },
  { code: "RMA", name: "Celeste", department: "ClientSuccess" },
  { code: "PSA", name: "Donovan", department: "ClientSuccess" },
  // Finance & Bookkeeping
  { code: "IGA", name: "Shanice", department: "Commercial" },
  { code: "ARCA", name: "Ricardo", department: "Commercial" },
  { code: "ECFA", name: "Janelle", department: "Commercial" },
  { code: "FRA", name: "Winston", department: "Commercial" },
  // Strategic Intelligence
  { code: "TSA", name: "Kareem", department: "Intelligence" },
  { code: "MOA-G", name: "Aaliyah", department: "Intelligence" },
  { code: "CHSA", name: "Lennox", department: "Intelligence" },
  { code: "SRA", name: "Janice", department: "Intelligence" },
  // People, Roles & Governance
  { code: "PRGA", name: "Ayanna", department: "Governance" },
  { code: "PCA", name: "Trevon", department: "Governance" },
  { code: "TACA", name: "Khadija", department: "Governance" },
  { code: "KDGA", name: "Mikael", department: "Governance" },
  { code: "VPCA", name: "Sabine", department: "Governance" },
  { code: "SMA", name: "Yvonne", department: "Governance" },
  // Specialist Pool
  { code: "CDA", name: "Rochelle-Ann", department: "Specialists" },
  { code: "TCA", name: "Xiomara", department: "Specialists" },
  { code: "PDB", name: "Stefan", department: "Specialists" },
  { code: "DESA", name: "Niko", department: "Specialists" },
  { code: "DSS", name: "Marise", department: "Specialists" },
  { code: "PIS", name: "Keston", department: "Specialists" },
  { code: "POS", name: "Jovan", department: "Specialists" },
  { code: "ASIS", name: "Tameka", department: "Specialists" },
  { code: "QMA", name: "Solomon", department: "Specialists" },
  // Business Analysis
  { code: "BAO", name: "Cyrus", department: "BusinessAnalysis" },
  { code: "FMA", name: "Valentina", department: "BusinessAnalysis" },
  { code: "MCA", name: "Sterling", department: "BusinessAnalysis" },
  { code: "RSA", name: "Imara", department: "BusinessAnalysis" },
];

const EXPECTED_REVIEWERS = [
  "reviewer_pricing_safety",
  "reviewer_plain_language",
  "reviewer_public_proof",
  "reviewer_localization",
  "reviewer_accessibility",
  "reviewer_package_integrity",
  "reviewer_vecs",
];

describe("registry-loader: ROUTING_AGENTS identity validation", () => {
  test("every approved agent code exists in the embedded registry", () => {
    const codes = ROUTING_AGENTS.map((a) => a.code);
    for (const expected of EXPECTED_IDENTITIES) {
      assert.ok(
        codes.includes(expected.code),
        `Approved agent code '${expected.code}' is missing from ROUTING_AGENTS`
      );
    }
  });

  test("every approved agent has the correct Caribbean name", () => {
    for (const expected of EXPECTED_IDENTITIES) {
      const agent = getAgentByCode(expected.code);
      assert.ok(agent, `Agent '${expected.code}' not found`);
      assert.equal(
        agent.name,
        expected.name,
        `Agent '${expected.code}' name mismatch: expected '${expected.name}', got '${agent.name}'`
      );
    }
  });

  test("every approved agent is in the correct department", () => {
    for (const expected of EXPECTED_IDENTITIES) {
      const agent = getAgentByCode(expected.code);
      assert.ok(agent, `Agent '${expected.code}' not found`);
      assert.equal(
        agent.department,
        expected.department,
        `Agent '${expected.code}' department mismatch: expected '${expected.department}', got '${agent.department}'`
      );
    }
  });

  test("all reviewer agents are present", () => {
    for (const code of EXPECTED_REVIEWERS) {
      const agent = getAgentByCode(code);
      assert.ok(agent, `Reviewer '${code}' is missing from ROUTING_AGENTS`);
      assert.equal(agent.department, "Reviewers");
      assert.equal(agent.routingRole, "reviewer");
    }
  });

  test("ARE authority role is present", () => {
    const are = getAgentByCode("ARE");
    assert.ok(are, "ARE must be present in ROUTING_AGENTS");
    assert.equal(are.routingRole, "authority");
  });

  test("no previously drifted identities remain", () => {
    // Regression guard for the 2026-05-05 identity drift fix.
    const knownBadIdentities = [
      { code: "CSM", badName: "Deja" },
      { code: "OOA", badName: "Bianca" },
      { code: "DCPA", badName: "Kwame" },
      { code: "SEA", badName: "Nate" },
      { code: "BLS", badName: "Rashida" },
      { code: "DSS", badName: "Terrell" },
      { code: "PIS", badName: "Zara" },
      { code: "IDS", badName: "Marcus" },
      { code: "RCA", badName: "Ife" },
      { code: "ASIS", badName: "Kendrick" },
      { code: "QADM", badName: "Amara" },
      { code: "POS", badName: "Devlin" },
      { code: "SMA", badName: "Wendell" },
      { code: "COA", badName: "Nyesha" },
      { code: "CCA", badName: "Simone" },
      { code: "CHSA", badName: "Ketura" },
      { code: "PSA", badName: "Toyin" },
      { code: "ARCA", badName: "Monique" },
      { code: "FRA", badName: "Tanya" },
      { code: "ECFA", badName: "Whitney" },
      { code: "KDGA", badName: "Lena" },
      { code: "VPCA", badName: "Geneva" },
      { code: "TACA", badName: "Regine" },
      { code: "PCA", badName: "Leah" },
      { code: "DESA", badName: "Miriam" },
      { code: "PDB", badName: "Jared" },
    ];
    for (const { code, badName } of knownBadIdentities) {
      const agent = getAgentByCode(code);
      assert.ok(agent, `Agent '${code}' not found`);
      assert.notEqual(
        agent.name,
        badName,
        `Agent '${code}' still carries the old drifted name '${badName}'`
      );
    }
  });

  test("validateAgentCodes recognizes all official agents and reviewers", () => {
    const allCodes = [
      ...EXPECTED_IDENTITIES.map((a) => a.code),
      ...EXPECTED_REVIEWERS,
      "ARE",
    ];
    const { valid, unknown } = validateAgentCodes(allCodes);
    assert.equal(valid.length, allCodes.length, `All codes should be valid`);
    assert.equal(unknown.length, 0, `Unknown codes: ${unknown.join(", ")}`);
  });

  test("REGISTRY_COUNT_FLAG reports consistency after fix", () => {
    assert.equal(REGISTRY_COUNT_FLAG.inconsistency, false, "Inconsistency flag should be false");
    assert.equal(REGISTRY_COUNT_FLAG.canonicalCount, 64, "Canonical count should be 64");
  });

  test("total registry size is 72 (64 agents + 7 reviewers + 1 ARE)", () => {
    assert.equal(ROUTING_AGENTS.length, 72, `Expected 72 entries, found ${ROUTING_AGENTS.length}`);
  });
});
