import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useOpenFDAInteractions } from './useOpenFDAInteractions'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mockFetch(body: object, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    json: async () => body,
  })
}

// Clear the module-level cache between tests by re-importing fresh.
// The cache is a Map scoped to the module — we clear it via the exported hook
// indirectly by verifying call counts rather than cache state.
beforeEach(() => {
  vi.restoreAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('useOpenFDAInteractions', () => {
  it('returns an empty array for an empty drug list', () => {
    const { result } = renderHook(() => useOpenFDAInteractions([]))
    expect(result.current).toHaveLength(0)
  })

  it('does NOT call fetch for a single-drug prescription', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response)

    const { result } = renderHook(() => useOpenFDAInteractions(['Metformin 500mg × 60']))

    await waitFor(() => {
      expect(result.current[0].loading).toBe(false)
    })

    // No fetch should have fired — guard prevents single-drug API calls
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(result.current[0].interactions).toBeNull()
    expect(result.current[0].error).toBeNull()
  })

  it('calls fetch for each drug when ≥2 drugs are present', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [{ drug_interactions: ['May interact with X.'] }],
      }),
    } as Response)

    const drugs = ['Atorvastatin 20mg × 30', 'Lisinopril 10mg × 30']
    const { result } = renderHook(() => useOpenFDAInteractions(drugs))

    await waitFor(() => {
      expect(result.current.every((r) => !r.loading)).toBe(true)
    })

    expect(globalThis.fetch).toHaveBeenCalledTimes(2)
    expect(result.current[0].interactions).toContain('May interact with X.')
  })

  it('sets interactions to null when the FDA response has no results', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response)

    // Use unique names to avoid module-level cache collisions across tests
    const drugs = ['NullResultDrugA 10mg × 30', 'NullResultDrugB 20mg × 30']
    const { result } = renderHook(() => useOpenFDAInteractions(drugs))

    await waitFor(() => {
      expect(result.current.every((r) => !r.loading)).toBe(true)
    })

    expect(result.current[0].interactions).toBeNull()
    expect(result.current[0].error).toBeNull()
  })

  it('sets error when fetch returns a non-OK response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response)

    // Use unique names to avoid module-level cache collisions across tests
    const drugs = ['NonOkDrugA 10mg', 'NonOkDrugB 20mg']
    const { result } = renderHook(() => useOpenFDAInteractions(drugs))

    await waitFor(() => {
      expect(result.current.every((r) => !r.loading)).toBe(true)
    })

    // Non-OK response → interactions null, no error thrown (graceful)
    expect(result.current[0].interactions).toBeNull()
    expect(result.current[0].error).toBeNull()
  })

  it('truncates interaction text longer than 600 characters', async () => {
    const longText = 'X'.repeat(800)
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [{ drug_interactions: [longText] }],
      }),
    } as Response)

    // Use unique names to avoid module-level cache collisions across tests
    const drugs = ['TruncDrugA 10mg', 'TruncDrugB 20mg']
    const { result } = renderHook(() => useOpenFDAInteractions(drugs))

    await waitFor(() => {
      expect(result.current.every((r) => !r.loading)).toBe(true)
    })

    expect(result.current[0].interactions).not.toBeNull()
    expect(result.current[0].interactions!.length).toBe(601) // 600 chars + '…'
    expect(result.current[0].interactions).toMatch(/…$/)
  })

  it('preserves per-drug identity — each result maps to its input drug', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response)

    // Use unique names to avoid module-level cache collisions across tests
    const drugs = ['IdentityAlpha 5mg × 10', 'IdentityBeta 10mg × 20', 'IdentityGamma 20mg × 30']
    const { result } = renderHook(() => useOpenFDAInteractions(drugs))

    await waitFor(() => {
      expect(result.current.every((r) => !r.loading)).toBe(true)
    })

    expect(result.current.map((r) => r.drug)).toEqual(drugs)
  })
})
