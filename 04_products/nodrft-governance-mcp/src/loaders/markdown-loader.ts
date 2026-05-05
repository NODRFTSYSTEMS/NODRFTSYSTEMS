// Read-only loader for canonical governance documents.
// Only files in the CANONICAL_SOURCES allowlist are accessible.
// Path traversal is blocked at the assertion layer.

import fs from "node:fs/promises";
import path from "node:path";
import { CANONICAL_SOURCES, WORKSPACE_ROOT, getSourceById } from "../config/canonical-sources.js";

export interface LoadedDocument {
  id: string;
  label: string;
  sourcePath: string;
  content: string;
  loadedAt: string;
  wordCount: number;
}

export interface DocumentLoadError {
  id: string;
  error: string;
  sourcePath: string;
}

export async function loadCanonicalDocument(id: string): Promise<LoadedDocument> {
  const source = getSourceById(id);
  if (!source) {
    throw new Error(
      `Document '${id}' is not on the canonical allowlist. Access denied. ` +
        `Allowed IDs: ${CANONICAL_SOURCES.map((s) => s.id).join(", ")}`
    );
  }

  assertSafePath(source.path);

  const content = await fs.readFile(source.path, "utf-8");

  return {
    id: source.id,
    label: source.label,
    sourcePath: source.path,
    content,
    loadedAt: new Date().toISOString(),
    wordCount: content.split(/\s+/).filter(Boolean).length,
  };
}

export async function loadMultipleDocuments(
  ids: string[]
): Promise<{ loaded: LoadedDocument[]; errors: DocumentLoadError[] }> {
  const results = await Promise.allSettled(ids.map((id) => loadCanonicalDocument(id)));

  const loaded: LoadedDocument[] = [];
  const errors: DocumentLoadError[] = [];

  results.forEach((result, i) => {
    const id = ids[i]!;
    if (result.status === "fulfilled") {
      loaded.push(result.value);
    } else {
      errors.push({
        id,
        error: result.reason instanceof Error ? result.reason.message : String(result.reason),
        sourcePath: getSourceById(id)?.path ?? "unknown",
      });
    }
  });

  return { loaded, errors };
}

export function assertSafePath(filePath: string): void {
  const resolved = path.resolve(filePath);
  const root = path.resolve(WORKSPACE_ROOT);
  if (!resolved.startsWith(root)) {
    throw new Error(
      `Path traversal blocked. Requested path is outside workspace root.\n` +
        `  Requested: ${resolved}\n` +
        `  Root: ${root}`
    );
  }
}

export function listAllowedDocuments(): Array<{ id: string; label: string; category: string }> {
  return CANONICAL_SOURCES.map((s) => ({
    id: s.id,
    label: s.label,
    category: s.category,
  }));
}
