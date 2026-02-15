import { describe, it, expect } from 'vitest'
import {
  distance,
  angleBetweenPoints,
  triangleArea,
  polygonPerimeter,
  quadrilateralArea,
  snapToGrid,
  clamp,
  isPointInCircle,
  triangleHeight,
  type Point
} from './geometry'

describe('geometry utilities', () => {
  describe('distance', () => {
    it('calculates distance between two points', () => {
      const p1: Point = { x: 0, y: 0 }
      const p2: Point = { x: 3, y: 4 }
      expect(distance(p1, p2)).toBe(5)
    })

    it('returns 0 for same point', () => {
      const p: Point = { x: 5, y: 5 }
      expect(distance(p, p)).toBe(0)
    })
  })

  describe('angleBetweenPoints', () => {
    it('calculates right angle', () => {
      const p1: Point = { x: 1, y: 0 }
      const p2: Point = { x: 0, y: 0 }
      const p3: Point = { x: 0, y: 1 }
      expect(angleBetweenPoints(p1, p2, p3)).toBeCloseTo(90, 1)
    })

    it('calculates straight angle', () => {
      const p1: Point = { x: -1, y: 0 }
      const p2: Point = { x: 0, y: 0 }
      const p3: Point = { x: 1, y: 0 }
      expect(angleBetweenPoints(p1, p2, p3)).toBeCloseTo(180, 1)
    })
  })

  describe('triangleArea', () => {
    it('calculates area of right triangle', () => {
      const p1: Point = { x: 0, y: 0 }
      const p2: Point = { x: 4, y: 0 }
      const p3: Point = { x: 0, y: 3 }
      expect(triangleArea(p1, p2, p3)).toBe(6)
    })

    it('returns 0 for degenerate triangle', () => {
      const p1: Point = { x: 0, y: 0 }
      const p2: Point = { x: 1, y: 1 }
      const p3: Point = { x: 2, y: 2 }
      expect(triangleArea(p1, p2, p3)).toBeCloseTo(0, 1)
    })
  })

  describe('polygonPerimeter', () => {
    it('calculates perimeter of square', () => {
      const square: Point[] = [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 4 },
        { x: 0, y: 4 }
      ]
      expect(polygonPerimeter(square)).toBe(16)
    })

    it('calculates perimeter of triangle', () => {
      const triangle: Point[] = [
        { x: 0, y: 0 },
        { x: 3, y: 0 },
        { x: 0, y: 4 }
      ]
      expect(polygonPerimeter(triangle)).toBe(12)
    })
  })

  describe('quadrilateralArea', () => {
    it('calculates area of square', () => {
      const square: Point[] = [
        { x: 0, y: 0 },
        { x: 5, y: 0 },
        { x: 5, y: 5 },
        { x: 0, y: 5 }
      ]
      expect(quadrilateralArea(square)).toBe(25)
    })

    it('returns 0 for non-quadrilateral', () => {
      const triangle: Point[] = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 }
      ]
      expect(quadrilateralArea(triangle)).toBe(0)
    })
  })

  describe('snapToGrid', () => {
    it('snaps value to nearest grid', () => {
      expect(snapToGrid(7, 5)).toBe(5)
      expect(snapToGrid(8, 5)).toBe(10)
      expect(snapToGrid(12.3, 5)).toBe(10)
    })

    it('handles exact grid values', () => {
      expect(snapToGrid(10, 5)).toBe(10)
      expect(snapToGrid(15, 5)).toBe(15)
    })
  })

  describe('clamp', () => {
    it('clamps value within range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(15, 0, 10)).toBe(10)
    })

    it('handles boundary values', () => {
      expect(clamp(0, 0, 10)).toBe(0)
      expect(clamp(10, 0, 10)).toBe(10)
    })
  })

  describe('isPointInCircle', () => {
    it('detects point inside circle', () => {
      const center: Point = { x: 0, y: 0 }
      const point: Point = { x: 2, y: 2 }
      expect(isPointInCircle(point, center, 5)).toBe(true)
    })

    it('detects point outside circle', () => {
      const center: Point = { x: 0, y: 0 }
      const point: Point = { x: 5, y: 5 }
      expect(isPointInCircle(point, center, 5)).toBe(false)
    })

    it('detects point on circle boundary', () => {
      const center: Point = { x: 0, y: 0 }
      const point: Point = { x: 3, y: 0 }
      expect(isPointInCircle(point, center, 3)).toBe(true)
    })
  })

  describe('triangleHeight', () => {
    it('calculates height of right triangle', () => {
      const base: Point = { x: 0, y: 0 }
      const apex: Point = { x: 0, y: 4 }
      const basePoint2: Point = { x: 3, y: 0 }
      expect(triangleHeight(base, apex, basePoint2)).toBe(4)
    })

    it('returns 0 for degenerate triangle', () => {
      const base: Point = { x: 0, y: 0 }
      const apex: Point = { x: 0, y: 0 }
      const basePoint2: Point = { x: 0, y: 0 }
      expect(triangleHeight(base, apex, basePoint2)).toBe(0)
    })
  })
})
