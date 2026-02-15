import { describe, it, expect } from 'vitest'
import {
  gcd,
  lcm,
  simplifyFraction,
  fractionToDecimal,
  decimalToFraction,
  addFractions,
  subtractFractions,
  multiplyFractions,
  divideFractions,
  compareFractions,
  areFractionsEquivalent,
  fractionToPercentage,
  formatFraction,
  getEquivalentFraction,
  type Fraction
} from './fractions'

describe('fractions utilities', () => {
  describe('gcd', () => {
    it('calculates greatest common divisor', () => {
      expect(gcd(12, 8)).toBe(4)
      expect(gcd(15, 25)).toBe(5)
      expect(gcd(7, 13)).toBe(1)
    })

    it('handles zero', () => {
      expect(gcd(0, 5)).toBe(5)
      expect(gcd(5, 0)).toBe(5)
    })
  })

  describe('lcm', () => {
    it('calculates least common multiple', () => {
      expect(lcm(4, 6)).toBe(12)
      expect(lcm(3, 5)).toBe(15)
      expect(lcm(12, 18)).toBe(36)
    })
  })

  describe('simplifyFraction', () => {
    it('simplifies fractions', () => {
      expect(simplifyFraction({ numerator: 6, denominator: 8 })).toEqual({
        numerator: 3,
        denominator: 4
      })
      expect(simplifyFraction({ numerator: 10, denominator: 15 })).toEqual({
        numerator: 2,
        denominator: 3
      })
    })

    it('handles already simplified fractions', () => {
      expect(simplifyFraction({ numerator: 3, denominator: 7 })).toEqual({
        numerator: 3,
        denominator: 7
      })
    })

    it('throws error for zero denominator', () => {
      expect(() => simplifyFraction({ numerator: 5, denominator: 0 })).toThrow()
    })
  })

  describe('fractionToDecimal', () => {
    it('converts fractions to decimals', () => {
      expect(fractionToDecimal({ numerator: 1, denominator: 2 })).toBe(0.5)
      expect(fractionToDecimal({ numerator: 1, denominator: 4 })).toBe(0.25)
      expect(fractionToDecimal({ numerator: 3, denominator: 4 })).toBe(0.75)
    })

    it('handles zero numerator', () => {
      expect(fractionToDecimal({ numerator: 0, denominator: 5 })).toBe(0)
    })
  })

  describe('decimalToFraction', () => {
    it('converts decimals to fractions', () => {
      expect(decimalToFraction(0.5)).toEqual({ numerator: 1, denominator: 2 })
      expect(decimalToFraction(0.25)).toEqual({ numerator: 1, denominator: 4 })
      expect(decimalToFraction(0.75)).toEqual({ numerator: 3, denominator: 4 })
    })

    it('handles zero', () => {
      expect(decimalToFraction(0)).toEqual({ numerator: 0, denominator: 1 })
    })
  })

  describe('addFractions', () => {
    it('adds fractions with same denominator', () => {
      const result = addFractions(
        { numerator: 1, denominator: 4 },
        { numerator: 1, denominator: 4 }
      )
      expect(result).toEqual({ numerator: 1, denominator: 2 })
    })

    it('adds fractions with different denominators', () => {
      const result = addFractions(
        { numerator: 1, denominator: 3 },
        { numerator: 1, denominator: 4 }
      )
      expect(result).toEqual({ numerator: 7, denominator: 12 })
    })
  })

  describe('subtractFractions', () => {
    it('subtracts fractions', () => {
      const result = subtractFractions(
        { numerator: 3, denominator: 4 },
        { numerator: 1, denominator: 4 }
      )
      expect(result).toEqual({ numerator: 1, denominator: 2 })
    })
  })

  describe('multiplyFractions', () => {
    it('multiplies fractions', () => {
      const result = multiplyFractions(
        { numerator: 2, denominator: 3 },
        { numerator: 3, denominator: 4 }
      )
      expect(result).toEqual({ numerator: 1, denominator: 2 })
    })
  })

  describe('divideFractions', () => {
    it('divides fractions', () => {
      const result = divideFractions(
        { numerator: 1, denominator: 2 },
        { numerator: 1, denominator: 4 }
      )
      expect(result).toEqual({ numerator: 2, denominator: 1 })
    })

    it('throws error when dividing by zero', () => {
      expect(() =>
        divideFractions({ numerator: 1, denominator: 2 }, { numerator: 0, denominator: 4 })
      ).toThrow()
    })
  })

  describe('compareFractions', () => {
    it('compares fractions correctly', () => {
      expect(compareFractions({ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 3 })).toBe(1)
      expect(compareFractions({ numerator: 1, denominator: 4 }, { numerator: 1, denominator: 2 })).toBe(-1)
      expect(compareFractions({ numerator: 2, denominator: 4 }, { numerator: 1, denominator: 2 })).toBe(0)
    })
  })

  describe('areFractionsEquivalent', () => {
    it('detects equivalent fractions', () => {
      expect(areFractionsEquivalent({ numerator: 1, denominator: 2 }, { numerator: 2, denominator: 4 })).toBe(
        true
      )
      expect(areFractionsEquivalent({ numerator: 2, denominator: 3 }, { numerator: 4, denominator: 6 })).toBe(
        true
      )
    })

    it('detects non-equivalent fractions', () => {
      expect(areFractionsEquivalent({ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 3 })).toBe(
        false
      )
    })
  })

  describe('fractionToPercentage', () => {
    it('converts fractions to percentages', () => {
      expect(fractionToPercentage({ numerator: 1, denominator: 2 })).toBe(50)
      expect(fractionToPercentage({ numerator: 1, denominator: 4 })).toBe(25)
      expect(fractionToPercentage({ numerator: 3, denominator: 4 })).toBe(75)
    })
  })

  describe('formatFraction', () => {
    it('formats simple fractions', () => {
      expect(formatFraction({ numerator: 3, denominator: 4 })).toBe('3/4')
      expect(formatFraction({ numerator: 1, denominator: 2 })).toBe('1/2')
    })

    it('formats whole numbers', () => {
      expect(formatFraction({ numerator: 4, denominator: 1 })).toBe('4')
    })

    it('formats mixed numbers', () => {
      expect(formatFraction({ numerator: 7, denominator: 3 }, true)).toBe('2 1/3')
      expect(formatFraction({ numerator: 9, denominator: 4 }, true)).toBe('2 1/4')
    })
  })

  describe('getEquivalentFraction', () => {
    it('gets equivalent fraction with target denominator', () => {
      const result = getEquivalentFraction({ numerator: 1, denominator: 2 }, 8)
      expect(result).toEqual({ numerator: 4, denominator: 8 })
    })

    it('returns null for impossible conversion', () => {
      const result = getEquivalentFraction({ numerator: 1, denominator: 3 }, 8)
      expect(result).toBeNull()
    })
  })
})
