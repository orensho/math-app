/**
 * Geometry utility functions for interactive diagrams
 */

export interface Point {
  x: number
  y: number
}

/**
 * Calculate distance between two points
 */
export function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Calculate angle in degrees between three points (p1-p2-p3)
 * p2 is the vertex
 */
export function angleBetweenPoints(p1: Point, p2: Point, p3: Point): number {
  const v1 = { x: p1.x - p2.x, y: p1.y - p2.y }
  const v2 = { x: p3.x - p2.x, y: p3.y - p2.y }

  const dot = v1.x * v2.x + v1.y * v2.y
  const det = v1.x * v2.y - v1.y * v2.x
  const angle = Math.atan2(det, dot)

  return Math.abs(angle * (180 / Math.PI))
}

/**
 * Calculate area of a triangle given three vertices
 */
export function triangleArea(p1: Point, p2: Point, p3: Point): number {
  const area = Math.abs(
    (p1.x * (p2.y - p3.y) +
     p2.x * (p3.y - p1.y) +
     p3.x * (p1.y - p2.y)) / 2
  )
  return Math.round(area * 100) / 100 // Round to 2 decimal places
}

/**
 * Calculate perimeter of a polygon given vertices
 */
export function polygonPerimeter(points: Point[]): number {
  let perimeter = 0
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i]
    const p2 = points[(i + 1) % points.length]
    perimeter += distance(p1, p2)
  }
  return Math.round(perimeter * 100) / 100
}

/**
 * Calculate area of a quadrilateral using the Shoelace formula
 */
export function quadrilateralArea(points: Point[]): number {
  if (points.length !== 4) return 0

  let sum1 = 0
  let sum2 = 0

  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4
    sum1 += points[i].x * points[j].y
    sum2 += points[j].x * points[i].y
  }

  const area = Math.abs(sum1 - sum2) / 2
  return Math.round(area * 100) / 100
}

/**
 * Snap a value to the nearest grid increment
 */
export function snapToGrid(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Check if a point is inside a circle
 */
export function isPointInCircle(point: Point, center: Point, radius: number): boolean {
  return distance(point, center) <= radius
}

/**
 * Calculate the height of a triangle from a given base
 * Returns the perpendicular distance from the opposite vertex to the base
 */
export function triangleHeight(base: Point, apex: Point, basePoint2: Point): number {
  // Calculate area first
  const area = triangleArea(base, basePoint2, apex)

  // Height = 2 * Area / Base
  const baseLength = distance(base, basePoint2)
  if (baseLength === 0) return 0

  return (2 * area) / baseLength
}
