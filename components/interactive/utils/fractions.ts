/**
 * Fraction utility functions for interactive diagrams
 */

export interface Fraction {
  numerator: number
  denominator: number
}

/**
 * Find the greatest common divisor using Euclidean algorithm
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}

/**
 * Find the least common multiple
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b)
}

/**
 * Simplify a fraction to lowest terms
 */
export function simplifyFraction(fraction: Fraction): Fraction {
  if (fraction.denominator === 0) {
    throw new Error('Denominator cannot be zero')
  }

  const divisor = gcd(fraction.numerator, fraction.denominator)

  return {
    numerator: fraction.numerator / divisor,
    denominator: fraction.denominator / divisor
  }
}

/**
 * Convert fraction to decimal
 */
export function fractionToDecimal(fraction: Fraction): number {
  if (fraction.denominator === 0) return 0
  return fraction.numerator / fraction.denominator
}

/**
 * Convert decimal to fraction (approximate)
 */
export function decimalToFraction(decimal: number, maxDenominator: number = 100): Fraction {
  if (decimal === 0) return { numerator: 0, denominator: 1 }

  const sign = decimal < 0 ? -1 : 1
  decimal = Math.abs(decimal)

  let bestNumerator = 1
  let bestDenominator = 1
  let bestError = Math.abs(decimal - 1)

  for (let denominator = 1; denominator <= maxDenominator; denominator++) {
    const numerator = Math.round(decimal * denominator)
    const error = Math.abs(decimal - numerator / denominator)

    if (error < bestError) {
      bestNumerator = numerator
      bestDenominator = denominator
      bestError = error
    }

    if (error === 0) break
  }

  return simplifyFraction({
    numerator: sign * bestNumerator,
    denominator: bestDenominator
  })
}

/**
 * Add two fractions
 */
export function addFractions(f1: Fraction, f2: Fraction): Fraction {
  const commonDenominator = lcm(f1.denominator, f2.denominator)
  const numerator1 = f1.numerator * (commonDenominator / f1.denominator)
  const numerator2 = f2.numerator * (commonDenominator / f2.denominator)

  return simplifyFraction({
    numerator: numerator1 + numerator2,
    denominator: commonDenominator
  })
}

/**
 * Subtract two fractions
 */
export function subtractFractions(f1: Fraction, f2: Fraction): Fraction {
  return addFractions(f1, { numerator: -f2.numerator, denominator: f2.denominator })
}

/**
 * Multiply two fractions
 */
export function multiplyFractions(f1: Fraction, f2: Fraction): Fraction {
  return simplifyFraction({
    numerator: f1.numerator * f2.numerator,
    denominator: f1.denominator * f2.denominator
  })
}

/**
 * Divide two fractions
 */
export function divideFractions(f1: Fraction, f2: Fraction): Fraction {
  if (f2.numerator === 0) {
    throw new Error('Cannot divide by zero')
  }

  return multiplyFractions(f1, {
    numerator: f2.denominator,
    denominator: f2.numerator
  })
}

/**
 * Compare two fractions (-1 if f1 < f2, 0 if equal, 1 if f1 > f2)
 */
export function compareFractions(f1: Fraction, f2: Fraction): number {
  const diff = fractionToDecimal(f1) - fractionToDecimal(f2)
  if (Math.abs(diff) < 0.0001) return 0
  return diff < 0 ? -1 : 1
}

/**
 * Check if two fractions are equivalent
 */
export function areFractionsEquivalent(f1: Fraction, f2: Fraction): boolean {
  const s1 = simplifyFraction(f1)
  const s2 = simplifyFraction(f2)
  return s1.numerator === s2.numerator && s1.denominator === s2.denominator
}

/**
 * Convert fraction to percentage
 */
export function fractionToPercentage(fraction: Fraction): number {
  return Math.round(fractionToDecimal(fraction) * 100 * 100) / 100 // Round to 2 decimal places
}

/**
 * Format fraction as string (e.g., "3/4" or "1 2/3" for mixed numbers)
 */
export function formatFraction(fraction: Fraction, mixed: boolean = false): string {
  const simplified = simplifyFraction(fraction)

  if (simplified.denominator === 1) {
    return String(simplified.numerator)
  }

  if (mixed && Math.abs(simplified.numerator) >= simplified.denominator) {
    const whole = Math.floor(simplified.numerator / simplified.denominator)
    const remainder = simplified.numerator % simplified.denominator

    if (remainder === 0) {
      return String(whole)
    }

    return `${whole} ${Math.abs(remainder)}/${simplified.denominator}`
  }

  return `${simplified.numerator}/${simplified.denominator}`
}

/**
 * Get equivalent fractions with a specific denominator
 */
export function getEquivalentFraction(fraction: Fraction, targetDenominator: number): Fraction | null {
  if (targetDenominator % fraction.denominator !== 0) {
    return null // Not possible to get exact equivalent
  }

  const multiplier = targetDenominator / fraction.denominator

  return {
    numerator: fraction.numerator * multiplier,
    denominator: targetDenominator
  }
}
