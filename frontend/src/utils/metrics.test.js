// Characterization tests for metrics.js.
// These pin the CURRENT behavior (quirks included) so a later refactor can
// prove it preserved behavior. They are not a statement of what's "correct".

import {
  calculateMRR,
  calculateMRRNew,
  calculateChurnRate,
  calculateGrowth,
  calculateNetRevenueRetention,
  buildMonthlySeries,
  calculateRetentionScore,
} from './metrics'

describe('calculateMRR', () => {
  test('sums mrr of active subscriptions only', () => {
    const subs = [
      { status: 'active', mrr: 100 },
      { status: 'churned', mrr: 50 },
      { status: 'active', mrr: 25 },
    ]
    expect(calculateMRR(subs)).toBe(125)
  })

  test('coerces string mrr to a number', () => {
    expect(calculateMRR([{ status: 'active', mrr: '30' }])).toBe(30)
  })

  test('treats missing mrr on an active sub as 0', () => {
    expect(calculateMRR([{ status: 'active' }])).toBe(0)
  })

  test('non-numeric mrr yields NaN', () => {
    expect(calculateMRR([{ status: 'active', mrr: 'abc' }])).toBeNaN()
  })

  test('empty array is 0', () => {
    expect(calculateMRR([])).toBe(0)
  })

  test('throws when given null/undefined (no guard)', () => {
    expect(() => calculateMRR(null)).toThrow()
    expect(() => calculateMRR(undefined)).toThrow()
  })
})

describe('calculateMRRNew', () => {
  test('sums mrr of active subscriptions only', () => {
    const subs = [
      { status: 'active', mrr: 100 },
      { status: 'churned', mrr: 50 },
      { status: 'active', mrr: 25 },
    ]
    expect(calculateMRRNew(subs)).toBe(125)
  })

  test('coerces string mrr to a number', () => {
    expect(calculateMRRNew([{ status: 'active', mrr: '30' }])).toBe(30)
  })

  test('treats missing mrr on an active sub as 0', () => {
    expect(calculateMRRNew([{ status: 'active' }])).toBe(0)
  })

  test('non-numeric mrr is treated as 0 (differs from calculateMRR)', () => {
    // Number('abc') is NaN, and `NaN || 0` collapses to 0 here.
    expect(calculateMRRNew([{ status: 'active', mrr: 'abc' }])).toBe(0)
  })

  test('tolerates null/undefined input and returns 0', () => {
    expect(calculateMRRNew(null)).toBe(0)
    expect(calculateMRRNew(undefined)).toBe(0)
  })

  test('tolerates null entries within the array', () => {
    expect(calculateMRRNew([null, { status: 'active', mrr: 10 }])).toBe(10)
  })
})

describe('calculateChurnRate', () => {
  test('returns churned / total', () => {
    expect(calculateChurnRate(2, 10)).toBe(0.2)
  })

  test('returns 0 when total is 0 (avoids divide-by-zero)', () => {
    expect(calculateChurnRate(5, 0)).toBe(0)
  })

  test('returns 0 when total is falsy', () => {
    expect(calculateChurnRate(5, undefined)).toBe(0)
  })
})

describe('calculateGrowth', () => {
  test('returns relative change vs previous', () => {
    expect(calculateGrowth(150, 100)).toBe(0.5)
  })

  test('handles decline', () => {
    expect(calculateGrowth(80, 100)).toBeCloseTo(-0.2)
  })

  test('returns 0 when previous is 0 or falsy', () => {
    expect(calculateGrowth(100, 0)).toBe(0)
    expect(calculateGrowth(100, undefined)).toBe(0)
  })
})

describe('calculateNetRevenueRetention', () => {
  test('computes (opening + expansion - contraction - churn) / opening', () => {
    // (1000 + 200 - 50 - 100) / 1000 = 1.05
    expect(calculateNetRevenueRetention(1000, 200, 50, 100)).toBeCloseTo(1.05)
  })

  test('returns 0 when opening is 0 or falsy', () => {
    expect(calculateNetRevenueRetention(0, 200, 50, 100)).toBe(0)
  })
})

describe('buildMonthlySeries', () => {
  // Use Date objects (not strings) so formatting is timezone-independent:
  // formatDateForChart reads local getMonth/getDate/getFullYear.
  test('maps rows to {label, value} using the default "value" key', () => {
    const rows = [
      { date: new Date(2024, 0, 5), value: 10 },
      { date: new Date(2024, 11, 25), value: 20 },
    ]
    expect(buildMonthlySeries(rows)).toEqual([
      { label: '1/5/24', value: 10 },
      { label: '12/25/24', value: 20 },
    ])
  })

  test('reads the provided key', () => {
    const rows = [{ date: new Date(2024, 2, 1), mrr: 500 }]
    expect(buildMonthlySeries(rows, 'mrr')).toEqual([
      { label: '3/1/24', value: 500 },
    ])
  })

  test('value is undefined when the key is missing', () => {
    const rows = [{ date: new Date(2024, 2, 1) }]
    expect(buildMonthlySeries(rows, 'mrr')).toEqual([
      { label: '3/1/24', value: undefined },
    ])
  })

  test('empty rows produce an empty series', () => {
    expect(buildMonthlySeries([])).toEqual([])
  })
})

describe('calculateRetentionScore', () => {
  // z = ((d - e) / (d || 1)) * 0.6 + min(f / 90, 1) * 0.4, then round(z * 100).
  test('typical inputs', () => {
    // x = (100 - 20) / 100 = 0.8; y = min(45/90,1) = 0.5
    // z = 0.8*0.6 + 0.5*0.4 = 0.48 + 0.2 = 0.68 -> 68
    expect(calculateRetentionScore(100, 20, 45)).toBe(68)
  })

  test('f is capped at 90 days (y maxes at 1)', () => {
    // x = (100-0)/100 = 1; y = min(180/90,1) = 1; z = 0.6 + 0.4 = 1 -> 100
    expect(calculateRetentionScore(100, 0, 180)).toBe(100)
  })

  test('guards divide-by-zero with (d || 1)', () => {
    // x = (0 - 0) / 1 = 0; y = min(90/90,1) = 1; z = 0.4 -> 40
    expect(calculateRetentionScore(0, 0, 90)).toBe(40)
  })
})
