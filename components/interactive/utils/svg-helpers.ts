/**
 * SVG helper functions for creating paths and shapes
 */

import { Point } from './geometry'

/**
 * Create an SVG arc path for a pie chart segment
 * @param cx Center X
 * @param cy Center Y
 * @param radius Radius of the circle
 * @param startAngle Start angle in degrees (0 = top)
 * @param endAngle End angle in degrees
 */
export function createArcPath(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  // Convert angles to radians and adjust so 0 degrees is at the top
  const startRad = ((startAngle - 90) * Math.PI) / 180
  const endRad = ((endAngle - 90) * Math.PI) / 180

  // Calculate start and end points
  const startX = cx + radius * Math.cos(startRad)
  const startY = cy + radius * Math.sin(startRad)
  const endX = cx + radius * Math.cos(endRad)
  const endY = cy + radius * Math.sin(endRad)

  // Determine if arc should be large arc (> 180 degrees)
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

  // Create path: Move to center, Line to start, Arc to end, Line back to center
  return `M ${cx} ${cy} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`
}

/**
 * Create a polygon path from points
 */
export function createPolygonPath(points: Point[]): string {
  if (points.length === 0) return ''

  const pathData = points.map((point, index) => {
    const command = index === 0 ? 'M' : 'L'
    return `${command} ${point.x} ${point.y}`
  }).join(' ')

  return `${pathData} Z` // Z closes the path
}

/**
 * Create a line path between two points
 */
export function createLinePath(p1: Point, p2: Point): string {
  return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`
}

/**
 * Create a dashed line pattern
 */
export function createDashedPattern(dashLength: number = 5, gapLength: number = 5): string {
  return `${dashLength},${gapLength}`
}

/**
 * Calculate viewBox string for SVG
 */
export function createViewBox(x: number, y: number, width: number, height: number): string {
  return `${x} ${y} ${width} ${height}`
}

/**
 * Convert polar coordinates to cartesian (for circles/arcs)
 */
export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): Point {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

/**
 * Create a rounded rectangle path
 */
export function createRoundedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): string {
  const r = Math.min(radius, width / 2, height / 2)

  return `
    M ${x + r} ${y}
    L ${x + width - r} ${y}
    Q ${x + width} ${y}, ${x + width} ${y + r}
    L ${x + width} ${y + height - r}
    Q ${x + width} ${y + height}, ${x + width - r} ${y + height}
    L ${x + r} ${y + height}
    Q ${x} ${y + height}, ${x} ${y + height - r}
    L ${x} ${y + r}
    Q ${x} ${y}, ${x + r} ${y}
    Z
  `.trim().replace(/\s+/g, ' ')
}

/**
 * Create tick marks for a number line
 */
export function createTickMarks(
  startX: number,
  y: number,
  length: number,
  tickCount: number,
  tickHeight: number = 10
): { x: number; y: number }[] {
  const ticks: { x: number; y: number }[] = []
  const spacing = length / tickCount

  for (let i = 0; i <= tickCount; i++) {
    const x = startX + i * spacing
    ticks.push({ x, y })
  }

  return ticks
}

/**
 * Create a gradient definition for SVG
 */
export function createGradientId(baseId: string): string {
  return `gradient-${baseId}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Calculate text anchor position for centered text
 */
export function getTextAnchor(alignment: 'left' | 'center' | 'right'): 'start' | 'middle' | 'end' {
  switch (alignment) {
    case 'left':
      return 'start'
    case 'center':
      return 'middle'
    case 'right':
      return 'end'
  }
}

/**
 * Create a grid pattern for SVG backgrounds
 */
export function createGridLines(
  width: number,
  height: number,
  gridSize: number
): { horizontal: Point[][]; vertical: Point[][] } {
  const horizontal: Point[][] = []
  const vertical: Point[][] = []

  // Horizontal lines
  for (let y = 0; y <= height; y += gridSize) {
    horizontal.push([
      { x: 0, y },
      { x: width, y }
    ])
  }

  // Vertical lines
  for (let x = 0; x <= width; x += gridSize) {
    vertical.push([
      { x, y: 0 },
      { x, y: height }
    ])
  }

  return { horizontal, vertical }
}

/**
 * Format number for display in SVG (limit decimal places)
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return Number(value.toFixed(decimals)).toString()
}
