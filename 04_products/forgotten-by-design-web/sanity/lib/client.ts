import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

function buildClient(useCdn: boolean, token?: string): SanityClient {
  if (!projectId) {
    throw new Error(
      "Sanity project ID is not set. Add NEXT_PUBLIC_SANITY_PROJECT_ID to your .env.local file."
    );
  }
  return createClient({ projectId, dataset, apiVersion, useCdn, token });
}

let _client: SanityClient | null = null;
let _serverClient: SanityClient | null = null;

// Lazy getters — client is not instantiated until first use,
// so empty env vars during `next build` don't throw at module evaluation time.
export function getClient(): SanityClient {
  if (!_client) _client = buildClient(true);
  return _client;
}

export function getServerClient(): SanityClient {
  if (!_serverClient) _serverClient = buildClient(false, process.env.SANITY_API_TOKEN);
  return _serverClient;
}

// Convenience re-export for code that does `client.fetch()`
export const client = {
  fetch: (...args: Parameters<SanityClient["fetch"]>) => getClient().fetch(...args),
} as Pick<SanityClient, "fetch">;
