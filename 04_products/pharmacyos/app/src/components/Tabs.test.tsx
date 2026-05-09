import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from './Tabs'

const tabs = [
  { value: 'one', label: 'One', content: <p>panel one</p> },
  { value: 'two', label: 'Two', content: <p>panel two</p> },
  { value: 'three', label: 'Three', content: <p>panel three</p> },
]

describe('Tabs', () => {
  it('renders the first tab as active by default', () => {
    render(<Tabs tabs={tabs} />)
    expect(screen.getByText('panel one')).toBeInTheDocument()
    expect(screen.queryByText('panel two')).not.toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true')
  })

  it('honors defaultValue', () => {
    render(<Tabs tabs={tabs} defaultValue="two" />)
    expect(screen.getByText('panel two')).toBeInTheDocument()
    expect(screen.queryByText('panel one')).not.toBeInTheDocument()
  })

  it('switches panel content on tab click', async () => {
    render(<Tabs tabs={tabs} />)
    await userEvent.click(screen.getByRole('tab', { name: 'Three' }))
    expect(screen.getByText('panel three')).toBeInTheDocument()
    expect(screen.queryByText('panel one')).not.toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-selected', 'true')
  })

  it('renders a tablist + tabpanel for assistive tech', () => {
    render(<Tabs tabs={tabs} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tabpanel')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })
})
