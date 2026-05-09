import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { usePermissionsStore } from './permissions'

// Reset the store between tests so prior test state doesn't leak
beforeEach(() => {
  localStorage.clear()
  usePermissionsStore.setState({ actingRole: 'admin', overrides: {} })
})

afterEach(() => {
  localStorage.clear()
})

describe('permissions store', () => {
  it('defaults acting role to admin', () => {
    expect(usePermissionsStore.getState().actingRole).toBe('admin')
  })

  it('switches acting role', () => {
    usePermissionsStore.getState().setActingRole('front_desk_cashier')
    expect(usePermissionsStore.getState().actingRole).toBe('front_desk_cashier')
  })

  it('cashier cannot access /inventory by default (static matrix)', () => {
    const { canRoleAccess } = usePermissionsStore.getState()
    expect(canRoleAccess('front_desk_cashier', '/inventory')).toBe(false)
    expect(canRoleAccess('front_desk_cashier', '/inventory/catalog')).toBe(false)
    expect(canRoleAccess('front_desk_cashier', '/inventory/scanner')).toBe(false)
  })

  it('cashier cannot access /prescriptions by default', () => {
    const { canRoleAccess } = usePermissionsStore.getState()
    expect(canRoleAccess('front_desk_cashier', '/prescriptions')).toBe(false)
    expect(canRoleAccess('front_desk_cashier', '/prescriptions/new')).toBe(false)
    expect(canRoleAccess('front_desk_cashier', '/prescriptions/schedule-log')).toBe(false)
  })

  it('cashier can access /pos and /pos/loyalty by default', () => {
    const { canRoleAccess } = usePermissionsStore.getState()
    expect(canRoleAccess('front_desk_cashier', '/pos')).toBe(true)
    expect(canRoleAccess('front_desk_cashier', '/pos/loyalty')).toBe(true)
  })

  it('admin can access /admin/permissions; cashier cannot', () => {
    const { canRoleAccess } = usePermissionsStore.getState()
    expect(canRoleAccess('admin', '/admin/permissions')).toBe(true)
    expect(canRoleAccess('front_desk_cashier', '/admin/permissions')).toBe(false)
    expect(canRoleAccess('manager', '/admin/permissions')).toBe(false)
  })

  it('setOverride changes the effective roles', () => {
    const { setOverride, canRoleAccess, effectiveRoles } = usePermissionsStore.getState()
    expect(canRoleAccess('front_desk_cashier', '/inventory')).toBe(false)
    setOverride('/inventory', ['front_desk_cashier', 'admin'])
    // Pull from updated state
    expect(usePermissionsStore.getState().canRoleAccess('front_desk_cashier', '/inventory')).toBe(true)
    expect(usePermissionsStore.getState().effectiveRoles('/inventory')).toEqual(['front_desk_cashier', 'admin'])
    void effectiveRoles
  })

  it('resetOverride restores the static matrix for that key', () => {
    const { setOverride, resetOverride } = usePermissionsStore.getState()
    setOverride('/inventory', ['front_desk_cashier'])
    expect(usePermissionsStore.getState().canRoleAccess('pharmacist', '/inventory')).toBe(false)
    resetOverride('/inventory')
    expect(usePermissionsStore.getState().canRoleAccess('pharmacist', '/inventory')).toBe(true)
    expect(usePermissionsStore.getState().overrides['/inventory']).toBeUndefined()
  })

  it('resetAll clears all overrides', () => {
    const { setOverride, resetAll } = usePermissionsStore.getState()
    setOverride('/inventory', [])
    setOverride('/prescriptions', [])
    expect(Object.keys(usePermissionsStore.getState().overrides).length).toBe(2)
    resetAll()
    expect(Object.keys(usePermissionsStore.getState().overrides).length).toBe(0)
  })
})
