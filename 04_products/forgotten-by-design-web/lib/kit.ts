/**
 * Kit (ConvertKit) API wrapper.
 *
 * Usage: called from app/api/subscribe/route.ts.
 * Relies on KIT_API_KEY and KIT_FORM_ID environment variables.
 */

const KIT_API_BASE = "https://api.kit.com/v4";

export interface SubscribeResult {
  success: boolean;
  error?: string;
}

/**
 * Subscribe an email address to the Kit form specified by KIT_FORM_ID.
 * Returns { success: true } on success, { success: false, error } on failure.
 */
export async function subscribeToKit(email: string): Promise<SubscribeResult> {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    console.warn("KIT_API_KEY or KIT_FORM_ID not set — skipping Kit API call");
    return { success: true };
  }

  const res = await fetch(`${KIT_API_BASE}/forms/${formId}/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({ email_address: email }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Kit API error:", body);
    return { success: false, error: "Subscription failed. Please try again." };
  }

  return { success: true };
}
