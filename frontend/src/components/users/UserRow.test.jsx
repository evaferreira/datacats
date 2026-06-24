import React from 'react'
import { render } from '@testing-library/react'
import UserRow from './UserRow'

function renderRow(status) {
  const user = {
    id: 1,
    name: 'Test User',
    email: 't@x.io',
    plan: 'pro',
    status,
    health: 50,
    mrr: 100,
    createdAt: '2024-01-01',
  }
  const { container } = render(
    <table><tbody><UserRow user={user} /></tbody></table>
  )
  return container.querySelector('tbody tr td:nth-child(4) span')
}

describe('UserRow status badge', () => {
  test('active renders the success tone', () => {
    const badge = renderRow('active')
    expect(badge).toHaveAttribute('data-tone', 'success')
    expect(badge).toHaveTextContent('active')
  })

  test('at-risk renders the warning tone', () => {
    const badge = renderRow('at-risk')
    expect(badge).toHaveAttribute('data-tone', 'warning')
    expect(badge).toHaveTextContent('at-risk')
  })

  test('churned renders the danger tone', () => {
    const badge = renderRow('churned')
    expect(badge).toHaveAttribute('data-tone', 'danger')
    expect(badge).toHaveTextContent('churned')
  })

  test('unknown status falls back to the neutral tone', () => {
    const badge = renderRow('something-unmapped')
    expect(badge).toHaveAttribute('data-tone', 'neutral')
    expect(badge).toHaveTextContent('something-unmapped')
  })
})
