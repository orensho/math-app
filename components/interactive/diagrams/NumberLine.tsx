'use client'

import { useState, useMemo } from 'react'
import { useDrag } from '@use-gesture/react'
import DiagramContainer from '../DiagramContainer'
import DiagramToggle from '../controls/DiagramToggle'
import DiagramReset from '../controls/DiagramReset'
import { createTickMarks } from '../utils/svg-helpers'
import { clamp } from '../utils/geometry'

interface Marker {
  value: number
  label: string
  color?: string
  draggable?: boolean
}

interface NumberLineParams {
  min: number
  max: number
  divisions: number
  markers?: Marker[]
  showFractions?: boolean
  showDecimals?: boolean
  draggable?: boolean
}

interface NumberLineProps {
  params: NumberLineParams
  showControls?: boolean
  isActive?: boolean
}

/**
 * Interactive number line diagram for visualizing numbers, fractions, and decimals
 */
export default function NumberLine({ params, showControls = true, isActive = true }: NumberLineProps) {
  const {
    min,
    max,
    divisions,
    markers: initialMarkers = [],
    showFractions: initialShowFractions = true,
    showDecimals: initialShowDecimals = false,
    draggable: defaultDraggable = true
  } = params

  // State
  const [markers, setMarkers] = useState<Marker[]>(initialMarkers)
  const [showFractions, setShowFractions] = useState(initialShowFractions)
  const [showDecimals, setShowDecimals] = useState(initialShowDecimals)

  // SVG dimensions
  const width = 600
  const height = 200
  const padding = 60
  const lineY = height / 2
  const lineLength = width - 2 * padding

  // Calculate tick positions
  const ticks = useMemo(
    () => createTickMarks(padding, lineY, lineLength, divisions),
    [padding, lineY, lineLength, divisions]
  )

  // Convert value to X coordinate
  const valueToX = (value: number): number => {
    const ratio = (value - min) / (max - min)
    return padding + ratio * lineLength
  }

  // Convert X coordinate to value
  const xToValue = (x: number): number => {
    const ratio = (x - padding) / lineLength
    return min + ratio * (max - min)
  }

  // Format value as fraction or decimal
  const formatValue = (value: number): string => {
    if (showFractions) {
      // Simple fraction representation
      const denominator = divisions
      const numerator = Math.round(value * denominator)

      if (numerator === 0) return '0'
      if (numerator === denominator) return '1'

      // Simplify fraction
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
      const divisor = gcd(Math.abs(numerator), denominator)
      const simpleNum = numerator / divisor
      const simpleDen = denominator / divisor

      if (simpleDen === 1) return String(simpleNum)
      return `${simpleNum}/${simpleDen}`
    }

    if (showDecimals) {
      return value.toFixed(2)
    }

    return value.toString()
  }

  // Handle marker drag
  const createMarkerDragHandler = (index: number) => {
    return useDrag(
      ({ movement: [mx], memo }) => {
        if (!isActive || !markers[index].draggable) return memo

        const initialX = memo || valueToX(markers[index].value)
        const newX = clamp(initialX + mx, padding, padding + lineLength)
        const newValue = xToValue(newX)

        // Snap to nearest tick
        const tickValue = Math.round(newValue * divisions) / divisions
        const clampedValue = clamp(tickValue, min, max)

        setMarkers((prev) => {
          const updated = [...prev]
          updated[index] = { ...updated[index], value: clampedValue }
          return updated
        })

        return initialX
      },
      {
        from: () => [valueToX(markers[index].value), 0]
      }
    )
  }

  // Reset to initial state
  const handleReset = () => {
    setMarkers(initialMarkers)
    setShowFractions(initialShowFractions)
    setShowDecimals(initialShowDecimals)
  }

  // Get marker color
  const getMarkerColor = (color?: string): string => {
    const colors: Record<string, string> = {
      primary: '#4f46e5',
      accent: '#ec4899',
      success: '#10b981',
      warning: '#f59e0b'
    }
    return colors[color || 'primary'] || '#4f46e5'
  }

  return (
    <div className="space-y-4">
      <DiagramContainer
        width={width}
        height={height}
        ariaLabel="ציר מספרים אינטראקטיבי"
      >
        {/* Main number line */}
        <line
          x1={padding}
          y1={lineY}
          x2={padding + lineLength}
          y2={lineY}
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Tick marks and labels */}
        {ticks.map((tick, i) => {
          const tickValue = min + (i / divisions) * (max - min)
          const label = formatValue(tickValue)

          return (
            <g key={i}>
              {/* Tick mark */}
              <line
                x1={tick.x}
                y1={lineY - 10}
                x2={tick.x}
                y2={lineY + 10}
                stroke="#6b7280"
                strokeWidth="2"
              />

              {/* Tick label */}
              <text
                x={tick.x}
                y={lineY + 30}
                textAnchor="middle"
                className="fill-neutral-700 text-sm number-ltr"
                style={{ fontSize: '14px' }}
              >
                {label}
              </text>
            </g>
          )
        })}

        {/* Markers */}
        {markers.map((marker, index) => {
          const x = valueToX(marker.value)
          const markerColor = getMarkerColor(marker.color)
          const dragBind = marker.draggable && defaultDraggable ? createMarkerDragHandler(index)() : {}

          return (
            <g
              key={index}
              {...dragBind}
              style={{ cursor: marker.draggable && isActive ? 'grab' : 'default' }}
              className="transition-transform duration-200 hover:scale-110"
            >
              {/* Marker circle */}
              <circle
                cx={x}
                cy={lineY}
                r="12"
                fill={markerColor}
                stroke="white"
                strokeWidth="3"
                className="drop-shadow-md"
              />

              {/* Marker label */}
              <text
                x={x}
                y={lineY - 25}
                textAnchor="middle"
                className="fill-neutral-900 font-bold number-ltr"
                style={{ fontSize: '16px' }}
              >
                {marker.label}
              </text>

              {/* Value label (decimal) */}
              {showDecimals && (
                <text
                  x={x}
                  y={lineY + 55}
                  textAnchor="middle"
                  className="fill-neutral-600 text-xs number-ltr"
                  style={{ fontSize: '12px' }}
                >
                  {marker.value.toFixed(2)}
                </text>
              )}
            </g>
          )
        })}

        {/* End arrows */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#374151" />
          </marker>
        </defs>
        <line
          x1={padding + lineLength}
          y1={lineY}
          x2={padding + lineLength + 10}
          y2={lineY}
          stroke="#374151"
          strokeWidth="3"
          markerEnd="url(#arrowhead)"
        />
      </DiagramContainer>

      {/* Controls */}
      {showControls && (
        <div className="flex flex-wrap items-center gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <DiagramToggle
            checked={showFractions}
            onChange={setShowFractions}
            label="הצג שברים"
            disabled={!isActive}
          />

          <DiagramToggle
            checked={showDecimals}
            onChange={setShowDecimals}
            label="הצג עשרוניים"
            disabled={!isActive}
          />

          <div className="mr-auto">
            <DiagramReset onReset={handleReset} />
          </div>
        </div>
      )}

      {/* Interaction hint */}
      {isActive && defaultDraggable && markers.some((m) => m.draggable) && (
        <div className="text-sm text-neutral-600 text-center">
          💡 ניתן לגרור את הסמנים על הציר
        </div>
      )}
    </div>
  )
}
