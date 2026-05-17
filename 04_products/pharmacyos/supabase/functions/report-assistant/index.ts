// Supabase Edge Function — Report Assistant
// Triggered by: supabase.functions.invoke('report-assistant', { body: { question, data_summary, report_type } })
// Uses Claude Haiku to answer natural-language questions about current report data.
// Requires ANTHROPIC_API_KEY secret in Supabase project settings.

import Anthropic from 'npm:@anthropic-ai/sdk'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `You are a pharmacy business analyst assistant for Winchester Global Pharmacy, Kingston, Jamaica.
You answer questions about pharmacy operations data. The user will provide a summary of the current report data and ask a question about it.

Guidelines:
- Answer concisely in 2–4 sentences.
- Base your answer strictly on the data provided. Do not add assumptions or external context.
- If the data is insufficient to answer, say so clearly.
- Format numbers in JMD where relevant (e.g. JMD $12,500.00).
- Do not recommend specific business decisions — only describe what the data shows.
- Tone: factual, professional.`

interface RequestBody {
  question: string
  data_summary: string   // compact text representation of current report data
  report_type: string    // e.g. 'Revenue', 'Inventory', 'Dispensing'
}

// @ts-ignore — Deno globals in Edge Function context
const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY')
// @ts-ignore
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
// @ts-ignore
const serviceKey  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

async function getAiSettings(roleKey: string) {
  if (!supabaseUrl || !serviceKey) return null
  try {
    const { createClient } = await import('npm:@supabase/supabase-js')
    const db = createClient(supabaseUrl, serviceKey)
    const { data } = await db
      .from('ai_role_settings')
      .select('model, enabled, temperature, max_tokens')
      .eq('role_key', roleKey)
      .maybeSingle()
    return data
  } catch {
    return null
  }
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

  try {
    const { question, data_summary, report_type }: RequestBody = await req.json()

    if (!question?.trim() || !data_summary) {
      return new Response(
        JSON.stringify({ error: 'question and data_summary are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const aiSettings    = await getAiSettings('report_assistant')
    const aiModel       = aiSettings?.model      ?? 'claude-haiku-4-5-20251001'
    const aiEnabled     = aiSettings?.enabled    ?? true
    const aiTemperature = Number(aiSettings?.temperature ?? 0.20)
    const aiMaxTokens   = aiSettings?.max_tokens ?? 512   // increased from 256 — 2-4 sentences needs headroom

    if (!aiEnabled) {
      return new Response(JSON.stringify({ error: 'Report assistant AI is currently disabled.' }), {
        status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const anthropic = new Anthropic({ apiKey: anthropicKey })

    const userPrompt = `Report type: ${report_type}

Current report data:
${data_summary}

Question: ${question.trim()}`

    const response = await anthropic.messages.create({
      model:       aiModel,
      max_tokens:  aiMaxTokens,
      temperature: aiTemperature,
      // cache_control on system prompt — avoids re-processing the static analyst role instructions
      // on every report question (TTL 5 min; saves ~200 input tokens per call)
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: userPrompt }],
    })

    const content = response.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type from Claude')

    return new Response(
      JSON.stringify({ answer: content.text }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )

  } catch (err) {
    console.error('report-assistant error:', err)
    return new Response(
      JSON.stringify({ error: String((err as Error).message) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
