// Canonical type definitions for the NoDrftSystems Governance MCP Server.
// All policy modules import from here — do not redefine these elsewhere.

export type ArtifactType =
  | "commercial"           // proposals, SOWs, invoices, retainer agreements, pricing pages
  | "legal"                // MSA, NDA, SOW with legal language, TOS, privacy policies, disclaimers, formation templates
  | "build"                // code, API changes, integrations, schema migrations, infrastructure
  | "release"              // production deployments, final delivery packages, access-transfer packages
  | "content"              // copy, SEO articles, social content, email sequences, marketing pages
  | "strategy"             // scope briefs, discovery outputs, strategy recommendations
  | "public-route"         // homepage, packages pages, case studies, service pages
  | "governance"           // agent registry, pricing governance, canonical governance documents
  | "escalation"           // any CRITICAL finding, unresolvable blocker
  | "intake"               // new client inquiry, project kickoff
  | "business-analysis";   // Business Analysis Sprint — 17-section evaluation of a client's business idea

export type ActionType =
  | "draft"            // creating for internal review only
  | "review"           // reviewing an artifact
  | "approve"          // approving for next stage
  | "send-to-client"   // sending externally to a client
  | "deploy"           // deploying to production
  | "publish"          // publishing publicly
  | "transfer"         // repository or access transfer
  | "modify-canonical" // modifying a canonical governance document
  | "price-exception"; // pricing deviation, discount, or floor exception

export type ProjectPhase =
  | "intake"
  | "discovery"
  | "strategy"
  | "architecture"
  | "implementation"
  | "qa"
  | "release"
  | "handoff"
  | "maintenance";

export type RiskLevel = "standard" | "high-risk";

export type AuthorityLevel = "Founder" | "ARE" | "QAS" | "HHC" | "MOA" | "none";

export type Verdict = "PROCEED" | "HOLD" | "ESCALATE";

export type WorkflowType =
  | "build"
  | "strategy"
  | "pricing"
  | "legal"
  | "release"
  | "intake"
  | "governance"
  | "content"
  | "public-route"
  | "business-analysis";
