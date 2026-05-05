// Routing-critical agent registry for the NoDrftSystems Governance MCP Server.
//
// Source of truth: 01_system/registry/final-approved-department-and-agent-registry.md
// This file is auto-validated against the approved registry via tests.
// Do not hand-edit without updating the registry and running tests.

export interface AgentRecord {
  code: string;
  name: string;
  canonicalName: string;
  department: string;
  tier: 1 | 2 | 3;
  routingRole: "supervisor" | "producer" | "reviewer" | "specialist" | "authority";
}

export const ROUTING_AGENTS: AgentRecord[] = [
  // === Tier 1 — Supervisor Layer (4) ===
  { code: "MOA",  name: "Zayne",    canonicalName: "Master Orchestrator Agent",              department: "Supervision",      tier: 1, routingRole: "supervisor" },
  { code: "QAS",  name: "Imani",    canonicalName: "Quality Assurance Supervisor",           department: "Supervision",      tier: 1, routingRole: "supervisor" },
  { code: "CSM",  name: "Josette",  canonicalName: "Context & State Manager",                department: "Supervision",      tier: 1, routingRole: "supervisor" },
  { code: "HHC",  name: "Desmond",  canonicalName: "Human Handoff Coordinator",              department: "Supervision",      tier: 1, routingRole: "supervisor" },

  // === Tier 2 — Revenue & Sales (5) ===
  { code: "SDA",  name: "Marlon",   canonicalName: "Sales Development Agent",                department: "Sales",            tier: 2, routingRole: "producer" },
  { code: "OOA",  name: "Althea",   canonicalName: "Outreach Orchestration Agent",           department: "Sales",            tier: 2, routingRole: "producer" },
  { code: "CRMA", name: "Daren",    canonicalName: "CRM Operations Agent",                   department: "Sales",            tier: 2, routingRole: "producer" },
  { code: "PEA",  name: "Giselle",  canonicalName: "Proposal Engine Agent",                  department: "Sales",            tier: 2, routingRole: "producer" },
  { code: "DCPA", name: "Vaughn",   canonicalName: "Discovery Call Prep Agent",              department: "Sales",            tier: 2, routingRole: "producer" },

  // === Tier 2 — Marketing & Content (5) ===
  { code: "CEA",  name: "Kalila",   canonicalName: "Content Engine Agent",                   department: "Marketing",        tier: 2, routingRole: "producer" },
  { code: "BCA",  name: "Nadine",   canonicalName: "Brand Consistency Agent",                department: "Marketing",        tier: 2, routingRole: "reviewer" },
  { code: "STAA", name: "Jermaine", canonicalName: "SEO Technical Audit Agent",              department: "Marketing",        tier: 2, routingRole: "reviewer" },
  { code: "DSA",  name: "Soraya",   canonicalName: "Distribution & Scheduling Agent",        department: "Marketing",        tier: 2, routingRole: "producer" },
  { code: "CPA",  name: "Dwayne",   canonicalName: "Campaign Performance Agent",             department: "Marketing",        tier: 2, routingRole: "specialist" },

  // === Tier 2 — Delivery & Build (12) ===
  { code: "PMA",  name: "Keon",     canonicalName: "Product Manager Agent",                  department: "Delivery",         tier: 2, routingRole: "supervisor" },
  { code: "SAA",  name: "Samara",   canonicalName: "Solution Architecture Assistant",        department: "Delivery",         tier: 2, routingRole: "producer" },
  { code: "RCA",  name: "Deven",    canonicalName: "Repository Context Assistant",           department: "Delivery",         tier: 2, routingRole: "specialist" },
  { code: "SEA",  name: "Malik",    canonicalName: "Software Engineer Agent",                department: "Delivery",         tier: 2, routingRole: "producer" },
  { code: "FIS",  name: "Kiara",    canonicalName: "Frontend Implementation Specialist",     department: "Delivery",         tier: 2, routingRole: "producer" },
  { code: "BLS",  name: "Khari",    canonicalName: "Backend & Logic Specialist",             department: "Delivery",         tier: 2, routingRole: "producer" },
  { code: "IDS",  name: "Nia",      canonicalName: "Integration & Debugging Specialist",     department: "Delivery",         tier: 2, routingRole: "specialist" },
  { code: "DAA",  name: "Anika",    canonicalName: "Design Assistance Agent",                department: "Delivery",         tier: 2, routingRole: "producer" },
  { code: "TVA",  name: "Leandra",  canonicalName: "Test & Verification Assistant",          department: "Delivery",         tier: 2, routingRole: "reviewer" },
  { code: "AAA",  name: "Rochelle", canonicalName: "Accessibility Audit Agent",              department: "Delivery",         tier: 2, routingRole: "reviewer" },
  { code: "DRA",  name: "Terrence", canonicalName: "Deployment Readiness Agent",             department: "Delivery",         tier: 2, routingRole: "reviewer" },
  { code: "VDA",  name: "Jeanine",  canonicalName: "Visual Direction Agent",                 department: "Delivery",         tier: 2, routingRole: "producer" },

  // === Tier 2 — Quality & Compliance (7) ===
  { code: "QDA",  name: "Patrice",  canonicalName: "QA & Documentation Agent",               department: "Quality",          tier: 2, routingRole: "reviewer" },
  { code: "QADM", name: "Fabian",   canonicalName: "QA Drift Monitor Agent",                 department: "Quality",          tier: 2, routingRole: "reviewer" },
  { code: "IPGA", name: "Camille",  canonicalName: "IP Guardian Agent",                      department: "Quality",          tier: 2, routingRole: "reviewer" },
  { code: "SCA",  name: "Omari",    canonicalName: "Security Compliance Agent",              department: "Quality",          tier: 2, routingRole: "reviewer" },
  { code: "BPA",  name: "Maritza",  canonicalName: "Bilingual Parity Agent",                 department: "Quality",          tier: 2, routingRole: "reviewer" },
  { code: "PLA",  name: "Simone",   canonicalName: "Plain Language Agent",                   department: "Quality",          tier: 2, routingRole: "reviewer" },
  { code: "LCA",  name: "Dorothy",  canonicalName: "Legal Compliance Agent",                 department: "Quality",          tier: 2, routingRole: "reviewer" },

  // === Tier 2 — Client Success (4) ===
  { code: "COA",  name: "Talia",    canonicalName: "Client Onboarding Agent",                department: "ClientSuccess",    tier: 2, routingRole: "producer" },
  { code: "CCA",  name: "Renzo",    canonicalName: "Client Communication Agent",             department: "ClientSuccess",    tier: 2, routingRole: "producer" },
  { code: "RMA",  name: "Celeste",  canonicalName: "Retainer Management Agent",              department: "ClientSuccess",    tier: 2, routingRole: "producer" },
  { code: "PSA",  name: "Donovan",  canonicalName: "Project Status Agent",                   department: "ClientSuccess",    tier: 2, routingRole: "specialist" },

  // === Tier 2 — Finance & Bookkeeping (4) ===
  { code: "IGA",  name: "Shanice",  canonicalName: "Invoice Generation Agent",               department: "Commercial",       tier: 2, routingRole: "producer" },
  { code: "ARCA", name: "Ricardo",  canonicalName: "Accounts Receivable & Collections Agent", department: "Commercial",       tier: 2, routingRole: "producer" },
  { code: "ECFA", name: "Janelle",  canonicalName: "Expense & Cash Flow Agent",              department: "Commercial",       tier: 2, routingRole: "producer" },
  { code: "FRA",  name: "Winston",  canonicalName: "Financial Reporting Agent",              department: "Commercial",       tier: 2, routingRole: "producer" },

  // === Tier 2 — Strategic Intelligence (4) ===
  { code: "TSA",  name: "Kareem",   canonicalName: "Trend Surveillance Agent",               department: "Intelligence",     tier: 2, routingRole: "specialist" },
  { code: "MOA-G",name: "Aaliyah",  canonicalName: "Market Opportunity Agent",               department: "Intelligence",     tier: 2, routingRole: "specialist" },
  { code: "CHSA", name: "Lennox",   canonicalName: "Client Health Score Agent",              department: "Intelligence",     tier: 2, routingRole: "specialist" },
  { code: "SRA",  name: "Janice",   canonicalName: "Strategic Review Agent",                 department: "Intelligence",     tier: 2, routingRole: "supervisor" },

  // === Tier 2 — People, Roles & Governance (6) ===
  { code: "PRGA", name: "Ayanna",   canonicalName: "People, Roles & Governance Agent",       department: "Governance",       tier: 2, routingRole: "supervisor" },
  { code: "PCA",  name: "Trevon",   canonicalName: "Prompt Configuration Agent",             department: "Governance",       tier: 2, routingRole: "specialist" },
  { code: "TACA", name: "Khadija",  canonicalName: "Tooling & Access Control Agent",         department: "Governance",       tier: 2, routingRole: "specialist" },
  { code: "KDGA", name: "Mikael",   canonicalName: "Knowledge & Documentation Governance Agent", department: "Governance",   tier: 2, routingRole: "specialist" },
  { code: "VPCA", name: "Sabine",   canonicalName: "Vendor & Procurement Control Agent",     department: "Governance",       tier: 2, routingRole: "specialist" },
  { code: "SMA",  name: "Yvonne",   canonicalName: "System Maintenance Agent",               department: "Governance",       tier: 2, routingRole: "specialist" },

  // === Tier 3 — Specialist Pool (9) ===
  { code: "CDA",  name: "Rochelle-Ann", canonicalName: "Contract Drafting Assistant",        department: "Specialists",      tier: 3, routingRole: "specialist" },
  { code: "TCA",  name: "Xiomara",  canonicalName: "Transcreation Agent",                    department: "Specialists",      tier: 3, routingRole: "producer" },
  { code: "PDB",  name: "Stefan",   canonicalName: "Presentation & Deck Builder",            department: "Specialists",      tier: 3, routingRole: "specialist" },
  { code: "DESA", name: "Niko",     canonicalName: "Data Extraction & Structuring Agent",    department: "Specialists",      tier: 3, routingRole: "specialist" },
  { code: "DSS",  name: "Marise",   canonicalName: "Database & Schema Specialist",           department: "Specialists",      tier: 3, routingRole: "specialist" },
  { code: "PIS",  name: "Keston",   canonicalName: "Platform & Infrastructure Specialist",   department: "Specialists",      tier: 3, routingRole: "specialist" },
  { code: "POS",  name: "Jovan",    canonicalName: "Performance Optimization Specialist",    department: "Specialists",      tier: 3, routingRole: "specialist" },
  { code: "ASIS", name: "Tameka",   canonicalName: "Agent Systems Integration Specialist",   department: "Specialists",      tier: 3, routingRole: "specialist" },
  { code: "QMA",  name: "Solomon",  canonicalName: "Quantitative Mathematics Agent",         department: "Specialists",      tier: 3, routingRole: "specialist" },

  // === Tier 2 — Business Analysis (4) ===
  { code: "BAO",  name: "Cyrus",    canonicalName: "Business Analysis Orchestrator",         department: "BusinessAnalysis", tier: 2, routingRole: "supervisor" },
  { code: "FMA",  name: "Valentina",canonicalName: "Financial Modeling Agent",               department: "BusinessAnalysis", tier: 2, routingRole: "producer" },
  { code: "MCA",  name: "Sterling", canonicalName: "Market & Competitive Analyst",           department: "BusinessAnalysis", tier: 2, routingRole: "producer" },
  { code: "RSA",  name: "Imara",    canonicalName: "Risk & Strategy Analyst",                department: "BusinessAnalysis", tier: 2, routingRole: "producer" },

  // === Authority layer (not agents — human roles that appear in review chains) ===
  { code: "ARE",  name: "ARE",      canonicalName: "AI Reliability Engineer",                department: "Authority",        tier: 2, routingRole: "authority" },

  // === Reviewers (stateless review agents — invoked as tools in review chains) ===
  { code: "reviewer_pricing_safety",    name: "N/A", canonicalName: "Pricing Safety Reviewer",    department: "Reviewers", tier: 3, routingRole: "reviewer" },
  { code: "reviewer_plain_language",    name: "N/A", canonicalName: "Plain Language Reviewer",    department: "Reviewers", tier: 3, routingRole: "reviewer" },
  { code: "reviewer_public_proof",      name: "N/A", canonicalName: "Public Proof Reviewer",      department: "Reviewers", tier: 3, routingRole: "reviewer" },
  { code: "reviewer_localization",      name: "N/A", canonicalName: "Localization Reviewer",      department: "Reviewers", tier: 3, routingRole: "reviewer" },
  { code: "reviewer_accessibility",     name: "N/A", canonicalName: "Accessibility Reviewer",     department: "Reviewers", tier: 3, routingRole: "reviewer" },
  { code: "reviewer_package_integrity", name: "N/A", canonicalName: "Package Integrity Reviewer", department: "Reviewers", tier: 3, routingRole: "reviewer" },
  { code: "reviewer_vecs",              name: "N/A", canonicalName: "VECS Route Reviewer",        department: "Reviewers", tier: 3, routingRole: "reviewer" },
];

export const REGISTRY_COUNT_FLAG = {
  inconsistency: false,
  message: "Registry validated: 64 official agents + 7 reviewers + 1 authority role. Source of truth: 01_system/registry/final-approved-department-and-agent-registry.md (2026-04-24).",
  embeddedCount: ROUTING_AGENTS.length,
  canonicalCount: 64,
  lastVerified: "2026-05-05",
};

export function getAgentByCode(code: string): AgentRecord | undefined {
  return ROUTING_AGENTS.find((a) => a.code === code);
}

export function getTier1Agents(): AgentRecord[] {
  return ROUTING_AGENTS.filter((a) => a.tier === 1);
}

export function getAgentsByDepartment(dept: string): AgentRecord[] {
  return ROUTING_AGENTS.filter((a) => a.department === dept);
}

const KNOWN_AGENT_CODES: ReadonlySet<string> = new Set(ROUTING_AGENTS.map((a) => a.code));

export function validateAgentCodes(codes: string[]): { valid: string[]; unknown: string[] } {
  return {
    valid: codes.filter((c) => KNOWN_AGENT_CODES.has(c)),
    unknown: codes.filter((c) => !KNOWN_AGENT_CODES.has(c)),
  };
}
