import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserTable from './UserTable'

const sampleUsers = [
  { id: 1, name: 'Charlie', email: 'c@x.io', plan: 'pro',        status: 'active',  health: 80, mrr:  200, createdAt: '2023-01-15' },
  { id: 2, name: 'Alice',   email: 'a@x.io', plan: 'starter',    status: 'active',  health: 60, mrr:   50, createdAt: '2023-03-10' },
  { id: 3, name: 'Bob',     email: 'b@x.io', plan: 'enterprise', status: 'at-risk', health: 90, mrr: 1000, createdAt: '2023-02-20' },
]

function renderedNames(container) {
  return Array.from(container.querySelectorAll('tbody .dc-user-name')).map(n => n.textContent)
}

describe('UserTable sort behavior', () => {
  test('default sort is by name ascending', () => {
    const { container } = render(<UserTable data={sampleUsers} />)
    expect(renderedNames(container)).toEqual(['Alice', 'Bob', 'Charlie'])
  })

  test('clicking the Plan header sorts by plan ascending', () => {
    const { container, getByText } = render(<UserTable data={sampleUsers} />)
    userEvent.click(getByText(/^Plan/))
    expect(renderedNames(container)).toEqual(['Bob', 'Charlie', 'Alice'])
  })
})
