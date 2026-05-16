// Supabase Edge Function - Daily Inconsistency Report
// Intended caller: a deployment scheduler, or an authenticated ADMIN/MANAGER.
// The report logic lives in public.generate_daily_inconsistency_report.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestBody {
  report_date?: string
}

// @ts-ignore - Deno globals in Edge Function context
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
// @ts-ignore
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const AUTHORIZED_ROLES = ['ADMIN', 'MANAGER']

async function getSupabaseClient() {
  const { createClient } = await import('npm:@supabase/supabase-js')
  return createClient(supabaseUrl, serviceKey)
}

async function isAuthorized(req: Request): Promise<boolean> {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '') ?? ''

  // Scheduled jobs can call this function with the service role key.
  if (token && token === serviceKey) return true

  if (!token) return false

  const db = await getSupabaseClient()
  const { data: { user }, error } = await db.auth.getUser(token)
  if (error || !user) return false

  const { data: profile } = await db
    .from('staff_profiles')
    .select('role')
    .eq('id', user.id)
    .eq('is_active', true)
    .maybeSingle()

  return Boolean(profile?.role && AUTHORIZED_ROLES.includes(profile.role))
}

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
}

// @ts-ignore - Deno serve
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'POST is required.' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  if (!(await isAuthorized(req))) {
    return new Response(
      JSON.stringify({ error: 'Forbidden: ADMIN, MANAGER, or scheduler service authorization required.' }),
      { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  try {
    const body = (await req.json().catch(() => ({}))) as RequestBody
    if (body.report_date && !isValidDate(body.report_date)) {
      return new Response(
        JSON.stringify({ error: 'report_date must be YYYY-MM-DD.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const db = await getSupabaseClient()
    const args = body.report_date ? { p_report_date: body.report_date } : {}
    const { data, error } = await db.rpc('generate_daily_inconsistency_report', args)

    if (error) {
      return new Response(
        JSON.stringify({ error: `Database error: ${error.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    return new Response(
      JSON.stringify({ report_id: data, status: 'generated' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    console.error('daily-inconsistency-report error:', err)
    return new Response(
      JSON.stringify({ error: String((err as Error).message) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
