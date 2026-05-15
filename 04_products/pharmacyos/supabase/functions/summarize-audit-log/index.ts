// Supabase Edge Function — Audit Log Summarizer
// Triggered by: supabase.functions.invoke('summarize-audit-log', { body: { from_date, to_date } })
// Uses Claude Haiku to produce a plain-English summary of audit events for a date range.
// Requires ANTHROPIC_API_KEY secret in Supabase project settings.

import Anthropic from 'npm:@anthropic-ai/sdk'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `You are a compliance analyst assistant for Winchester Global Pharmacy, Kingston, Jamaica.
Your task is to produce a plain-English summary of pharmacy system audit events for a given date range.

Guidelines:
- Write 3–5 bullet points covering the most important activity patterns.
- Highlight any anomalies: access denials, after-hours activity, deactivated accounts, high-frequency voids.
- State counts factually. Do not fabricate details not in the data.
- Tone: professional, concise. Suitable for a compliance officer reading a summary report.
- If there are no events, say "No audit events recorded for this period."
- Do not include markdown headers — use plain bullet points only.`

interface RequestBody {
  from_date: string   // YYYY-MM-DD
  to_date: string     // YYYY-MM-DD
}

interface AuditRow {
  actor_name: string | null
  action: string
  table_name: string | null
  record_id: string | null
  details: unknown
  created_at: string
}

// @ts-ignore — Deno globals in Edge Function context
const supabaseUrl  = Deno.env.get('SUPABASE_URL')!
// @ts-ignore
const serviceKey   = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
// @ts-ignore
const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY')

// Roles permitted to receive audit log summaries — mirrors audit_view permission
const AUDIT_VIEW_ROLES = ['ADMIN', 'MANAGER', 'AUDITOR']

async function getSupabaseClient() {
  const { createClient } = await import('npm:@supabase/supabase-js')
  return createClient(supabaseUrl, serviceKey)
}

async function getCallerRole(authHeader: string | null): Promise<string | null> {
  if (!authHeader) return null
  const token = authHeader.replace('Bearer ', '')
  const db = await getSupabaseClient()
  // Verify the JWT via the service client — this validates the token server-side
  const { data: { user }, error } = await db.auth.getUser(token)
  if (error || !user) return null
  // Look up the staff profile role directly
  const { data } = await db
    .from('staff_profiles')
    .select('role')
    .eq('id', user.id)
    .eq('is_active', true)
    .maybeSingle()
  return data?.role ?? null
}

// @ts-ignore — Deno serve
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (!anthropicKey) {
    return new Response(
      JSON.stringify({ error: 'ANTHROPIC_API_KEY is not configured in Supabase secrets.' }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  // Permission gate: only roles with audit_view may retrieve audit summaries
  const callerRole = await getCallerRole(req.headers.get('authorization'))
  if (!callerRole || !AUDIT_VIEW_ROLES.includes(callerRole)) {
    return new Response(
      JSON.stringify({ error: 'Forbidden: audit_view permission required.' }),
      { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  try {
    const { from_date, to_date }: RequestBody = await req.json()

    if (!from_date || !to_date) {
      return new Response(
        JSON.stringify({ error: 'from_date and to_date are required (YYYY-MM-DD)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const db = await getSupabaseClient()

    // Fetch audit entries for the period (max 200 — enough for a meaningful summary)
    const { data, error } = await db
      .from('audit_log')
      .select('actor_name, action, table_name, record_id, details, created_at')
      .gte('created_at', `${from_date}T00:00:00-05:00`) // Jamaica UTC-5
      .lte('created_at', `${to_date}T23:59:59-05:00`)
      .order('created_at', { ascending: true })
      .limit(200)

    if (error) {
      return new Response(
        JSON.stringify({ error: `Database error: ${error.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const rows = (data ?? []) as AuditRow[]

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ summary: 'No audit events recorded for this period.', event_count: 0 }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // Compact text representation — keep token count low for Haiku
    const eventText = rows.map(r => {
      const ts  = new Date(r.created_at).toLocaleString('en-JM', { timeZone: 'America/Jamaica' })
      const who = r.actor_name ?? 'System'
      const det = r.details ? ` | ${JSON.stringify(r.details).slice(0, 80)}` : ''
      return `[${ts}] ${who} — ${r.action} on ${r.table_name ?? 'unknown'}${det}`
    }).join('\n')

    // Count by action type for the prompt header
    const actionCounts: Record<string, number> = {}
    for (const r of rows) {
      actionCounts[r.action] = (actionCounts[r.action] ?? 0) + 1
    }
    const countSummary = Object.entries(actionCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ')

    const userPrompt = `Date range: ${from_date} to ${to_date}
Total events: ${rows.length}
Action breakdown: ${countSummary}

Audit log entries:
${eventText}

Please summarise the key activity and any compliance concerns for this period.`

    const anthropic = new Anthropic({ apiKey: anthropicKey })
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const content = response.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type from Claude')

    return new Response(
      JSON.stringify({
        summary: content.text,
        event_count: rows.length,
        from_date,
        to_date,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )

  } catch (err) {
    console.error('summarize-audit-log error:', err)
    return new Response(
      JSON.stringify({ error: String((err as Error).message) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
