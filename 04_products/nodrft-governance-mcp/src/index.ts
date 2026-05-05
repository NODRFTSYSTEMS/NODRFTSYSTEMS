import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { CANONICAL_SOURCES } from "./config/canonical-sources.js";
import { loadCanonicalDocument } from "./loaders/markdown-loader.js";
import { REGISTRY_COUNT_FLAG } from "./loaders/registry-loader.js";

import { register as registerGetGovernanceContext } from "./tools/get-governance-context.js";
import { register as registerRouteTaskToAgent } from "./tools/route-task-to-agent.js";
import { register as registerGenerateContextPackage } from "./tools/generate-context-package.js";
import { register as registerRunScopeDriftCheck } from "./tools/run-scope-drift-check.js";
import { register as registerRunAuthorityCheck } from "./tools/run-authority-check.js";
import { register as registerPrepareEscalationLogEntry } from "./tools/prepare-escalation-log-entry.js";

import { register as registerStartupDeclaration } from "./prompts/startup-declaration.js";
import { register as registerEscalationBrief } from "./prompts/escalation-brief.js";

const server = new McpServer({
  name: "nodrft-governance-mcp",
  version: "0.1.0",
});

// ── Resources — one per allowlisted governance document ──────────────────────
// Each document is served as a read-only resource at nodrft://governance/{id}
for (const source of CANONICAL_SOURCES) {
  server.resource(source.label, `nodrft://governance/${source.id}`, async (uri) => {
    try {
      const doc = await loadCanonicalDocument(source.id);
      return {
        contents: [
          {
            uri: uri.href,
            text: doc.content,
            mimeType: "text/plain",
          },
        ],
      };
    } catch (err) {
      return {
        contents: [
          {
            uri: uri.href,
            text: `Error loading ${source.id}: ${err instanceof Error ? err.message : String(err)}`,
            mimeType: "text/plain",
          },
        ],
      };
    }
  });
}

// ── Tools ─────────────────────────────────────────────────────────────────────
registerGetGovernanceContext(server);
registerRouteTaskToAgent(server);
registerGenerateContextPackage(server);
registerRunScopeDriftCheck(server);
registerRunAuthorityCheck(server);
registerPrepareEscalationLogEntry(server);

// ── Prompts ───────────────────────────────────────────────────────────────────
registerStartupDeclaration(server);
registerEscalationBrief(server);

// ── Start ─────────────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);

// Startup log to stderr (not stdout — stdout is the MCP protocol stream)
process.stderr.write(
  `[nodrft-governance-mcp v0.1.0] Server started on stdio.\n` +
    `  Resources: ${CANONICAL_SOURCES.length} canonical documents\n` +
    `  Tools: get_governance_context, route_task_to_agent, generate_context_package, ` +
    `run_scope_drift_check, run_authority_check, prepare_escalation_log_entry\n` +
    `  Prompts: startup_declaration, human_escalation_brief\n` +
    `  Registry flag: ${REGISTRY_COUNT_FLAG.message}\n`
);
