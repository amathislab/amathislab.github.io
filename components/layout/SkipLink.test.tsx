import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { SkipLink } from './SkipLink'

describe('SkipLink', () => {
  it('renders skip to main content link', () => {
    render(<SkipLink />)
    const link = screen.getByText(/skip to main content/i)
    expect(link).toBeInTheDocument()
  })

  it('links to main-content anchor', () => {
    render(<SkipLink />)
    const link = screen.getByText(/skip to main content/i)
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('has correct accessibility classes', () => {
    render(<SkipLink />)
    const link = screen.getByText(/skip to main content/i)
    // Should be screen-reader only by default
    expect(link).toHaveClass('sr-only')
  })
})
