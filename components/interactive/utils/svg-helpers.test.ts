import { describe, it, expect } from 'vitest'
import {
  createArcPath,
  createPolygonPath,
  createLinePath,
  createDashedPattern,
  createViewBox,
  polarToCartesian,
  createRoundedRectPath,
  createTickMarks,
  createGradientId,
  getTextAnchor,
  createGridLines,
  formatNumber,
  type Point
} from './svg-helpers'

describe('svg-helpers utilities', () => {
  describe('createArcPath', () => {
    it('creates arc path for semicircle', () => {
      const path = createArcPath(100, 100, 50, 0, 180)
      expect(path).toContain('M 100 100')
      expect(path).toContain('A 50 50')
      expect(path).toContain('Z')
    })

    it('handles small arcs', () => {
      const path = createArcPath(50, 50, 25, 0, 45)
      expect(path).toContain('0 0') // small arc flag
    })
  })

  describe('createPolygonPath', () => {
    it('creates path for triangle', () => {
      const triangle: Point[] = [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
        { x: 5, y: 10 }
      ]
      const path = createPolygonPath(triangle)
      expect(path).toContain('M 0 0')
      expect(path).toContain('L 10 0')
      expect(path).toContain('Z')
    })

    it('returns empty string for empty array', () => {
      expect(createPolygonPath([])).toBe('')
    })
  })

  describe('createLinePath', () => {
    it('creates path between two points', () => {
      const p1: Point = { x: 0, y: 0 }
      const p2: Point = { x: 10, y: 10 }
      const path = createLinePath(p1, p2)
      expect(path).toBe('M 0 0 L 10 10')
    })
  })

  describe('createDashedPattern', () => {
    it('creates dashed pattern', () => {
      expect(createDashedPattern(5, 3)).toBe('5,3')
      expect(createDashedPattern()).toBe('5,5')
    })
  })

  describe('createViewBox', () => {
    it('creates viewBox string', () => {
      expect(createViewBox(0, 0, 100, 100)).toBe('0 0 100 100')
      expect(createViewBox(10, 20, 300, 400)).toBe('10 20 300 400')
    })
  })

  describe('polarToCartesian', () => {
    it('converts polar to cartesian coordinates', () => {
      const point = polarToCartesian(0, 0, 10, 0)
      expect(point.x).toBeCloseTo(10, 1)
      expect(point.y).toBeCloseTo(0, 1)
    })

    it('handles 90 degree angle', () => {
      const point = polarToCartesian(0, 0, 10, 90)
      expect(point.x).toBeCloseTo(0, 1)
      expect(point.y).toBeCloseTo(10, 1)
    })
  })

  describe('createRoundedRectPath', () => {
    it('creates rounded rectangle path', () => {
      const path = createRoundedRectPath(0, 0, 100, 50, 5)
      expect(path).toContain('M 5 0')
      expect(path).toContain('Q')
      expect(path).toContain('Z')
    })

    it('limits radius to half of smallest dimension', () => {
      const path = createRoundedRectPath(0, 0, 100, 50, 30)
      expect(path).toContain('M 25 0') // capped at 25 (half of 50)
    })
  })

  describe('createTickMarks', () => {
    it('creates correct number of tick marks', () => {
      const ticks = createTickMarks(0, 100, 100, 10)
      expect(ticks).toHaveLength(11) // 0 to 10 inclusive
    })

    it('spaces tick marks evenly', () => {
      const ticks = createTickMarks(0, 100, 100, 4)
      expect(ticks[0].x).toBe(0)
      expect(ticks[1].x).toBe(25)
      expect(ticks[2].x).toBe(50)
      expect(ticks[4].x).toBe(100)
    })
  })

  describe('createGradientId', () => {
    it('creates unique gradient IDs', () => {
      const id1 = createGradientId('test')
      const id2 = createGradientId('test')
      expect(id1).toContain('gradient-test')
      expect(id1).not.toBe(id2) // should be unique
    })
  })

  describe('getTextAnchor', () => {
    it('returns correct anchor for alignment', () => {
      expect(getTextAnchor('left')).toBe('start')
      expect(getTextAnchor('center')).toBe('middle')
      expect(getTextAnchor('right')).toBe('end')
    })
  })

  describe('createGridLines', () => {
    it('creates grid lines', () => {
      const grid = createGridLines(100, 100, 25)
      expect(grid.horizontal).toHaveLength(5) // 0, 25, 50, 75, 100
      expect(grid.vertical).toHaveLength(5)
    })

    it('creates correct line coordinates', () => {
      const grid = createGridLines(100, 100, 50)
      expect(grid.horizontal[0][0]).toEqual({ x: 0, y: 0 })
      expect(grid.horizontal[0][1]).toEqual({ x: 100, y: 0 })
      expect(grid.vertical[0][0]).toEqual({ x: 0, y: 0 })
      expect(grid.vertical[0][1]).toEqual({ x: 0, y: 100 })
    })
  })

  describe('formatNumber', () => {
    it('formats numbers with specified decimals', () => {
      expect(formatNumber(3.14159, 2)).toBe('3.14')
      expect(formatNumber(10, 2)).toBe('10')
      expect(formatNumber(1.5, 0)).toBe('2')
    })

    it('removes trailing zeros', () => {
      expect(formatNumber(3.5, 2)).toBe('3.5')
      expect(formatNumber(3.0, 2)).toBe('3')
    })
  })
})
