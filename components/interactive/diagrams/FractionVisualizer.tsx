'use client'

import { useState } from 'react'
import DiagramContainer from '../DiagramContainer'
import DiagramSlider from '../controls/DiagramSlider'
import DiagramToggle from '../controls/DiagramToggle'
import DiagramReset from '../controls/DiagramReset'
import { createArcPath } from '../utils/svg-helpers'
import { fractionToPercentage, formatFraction } from '../utils/fractions'

interface FractionVisualizerParams {
  mode?: 'pie' | 'bar' | 'area'
  numerator: number
  denominator: number
  showPercentage?: boolean
  editable?: boolean
  maxDenominator?: number
}

interface FractionVisualizerProps {
  params: FractionVisualizerParams
  showControls?: boolean
  isActive?: boolean
}

/**
 * Fraction Visualizer with pie chart, bar model, and area model modes
 */
export default function FractionVisualizer({
  params,
  showControls = true,
  isActive = true
}: FractionVisualizerProps) {
  const {
    mode: initialMode = 'pie',
    numerator: initialNumerator,
    denominator: initialDenominator,
    showPercentage: initialShowPercentage = true,
    editable = false,
    maxDenominator = 12
  } = params

  const [mode, setMode] = useState<'pie' | 'bar' | 'area'>(initialMode)
  const [numerator, setNumerator] = useState(initialNumerator)
  const [denominator, setDenominator] = useState(initialDenominator)
  const [showPercentage, setShowPercentage] = useState(initialShowPercentage)

  const width = 600
  const height = 400

  const handleReset = () => {
    setMode(initialMode)
    setNumerator(initialNumerator)
    setDenominator(initialDenominator)
    setShowPercentage(initialShowPercentage)
  }

  const renderPieChart = () => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = 120
    const anglePerSection = 360 / denominator

    const sections = []
    for (let i = 0; i < denominator; i++) {
      const startAngle = i * anglePerSection
      const endAngle = (i + 1) * anglePerSection
      const isFilled = i < numerator

      sections.push(
        <g key={i}>
          <path
            d={createArcPath(centerX, centerY, radius, startAngle, endAngle)}
            fill={isFilled ? '#4f46e5' : '#e5e7eb'}
            stroke="white"
            strokeWidth="2"
            className="transition-colors duration-200"
          />
        </g>
      )
    }

    return (
      <>
        {sections}
        {/* Center circle */}
        <circle cx={centerX} cy={centerY} r="5" fill="white" />
      </>
    )
  }

  const renderBarModel = () => {
    const barWidth = 400
    const barHeight = 60
    const barX = (width - barWidth) / 2
    const barY = height / 2 - barHeight / 2
    const sectionWidth = barWidth / denominator

    const sections = []
    for (let i = 0; i < denominator; i++) {
      const x = barX + i * sectionWidth
      const isFilled = i < numerator

      sections.push(
        <rect
          key={i}
          x={x}
          y={barY}
          width={sectionWidth}
          height={barHeight}
          fill={isFilled ? '#4f46e5' : '#e5e7eb'}
          stroke="white"
          strokeWidth="2"
          className="transition-colors duration-200"
        />
      )
    }

    return <>{sections}</>
  }

  const renderAreaModel = () => {
    const gridSize = 200
    const cols = Math.ceil(Math.sqrt(denominator))
    const rows = Math.ceil(denominator / cols)
    const cellWidth = gridSize / cols
    const cellHeight = gridSize / rows
    const gridX = (width - gridSize) / 2
    const gridY = (height - gridSize) / 2

    const cells = []
    for (let i = 0; i < denominator; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = gridX + col * cellWidth
      const y = gridY + row * cellHeight
      const isFilled = i < numerator

      cells.push(
        <rect
          key={i}
          x={x}
          y={y}
          width={cellWidth}
          height={cellHeight}
          fill={isFilled ? '#4f46e5' : '#e5e7eb'}
          stroke="white"
          strokeWidth="2"
          className="transition-colors duration-200"
        />
      )
    }

    return <>{cells}</>
  }

  const percentage = fractionToPercentage({ numerator, denominator })
  const fractionText = formatFraction({ numerator, denominator })

  return (
    <div className="space-y-4">
      <DiagramContainer width={width} height={height} ariaLabel="מ시각化 שבר אינטראקטיבי">
        {mode === 'pie' && renderPieChart()}
        {mode === 'bar' && renderBarModel()}
        {mode === 'area' && renderAreaModel()}

        {/* Fraction label */}
        <text
          x={width / 2}
          y={height - 40}
          textAnchor="middle"
          className="fill-neutral-900 font-bold"
          style={{ fontSize: '24px' }}
        >
          {fractionText}
          {showPercentage && ` = ${percentage}%`}
        </text>
      </DiagramContainer>

      {/* Controls */}
      {showControls && (
        <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          {/* Mode selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setMode('pie')}
              className={`px-3 py-2 sm:px-4 min-h-[44px] rounded-lg transition-colors ${
                mode === 'pie'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-neutral-700 border border-neutral-300 active:bg-neutral-100'
              }`}
              disabled={!isActive}
            >
              עוגה
            </button>
            <button
              onClick={() => setMode('bar')}
              className={`px-3 py-2 sm:px-4 min-h-[44px] rounded-lg transition-colors ${
                mode === 'bar'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-neutral-700 border border-neutral-300 active:bg-neutral-100'
              }`}
              disabled={!isActive}
            >
              פס
            </button>
            <button
              onClick={() => setMode('area')}
              className={`px-3 py-2 sm:px-4 min-h-[44px] rounded-lg transition-colors ${
                mode === 'area'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-neutral-700 border border-neutral-300 active:bg-neutral-100'
              }`}
              disabled={!isActive}
            >
              שטח
            </button>
          </div>

          {/* Sliders (if editable) */}
          {editable && (
            <div className="grid grid-cols-2 gap-4">
              <DiagramSlider
                value={numerator}
                onChange={setNumerator}
                min={0}
                max={denominator}
                label="מונה"
                disabled={!isActive}
              />
              <DiagramSlider
                value={denominator}
                onChange={(val) => {
                  setDenominator(val)
                  if (numerator > val) setNumerator(val)
                }}
                min={1}
                max={maxDenominator}
                label="מכנה"
                disabled={!isActive}
              />
            </div>
          )}

          {/* Toggles */}
          <div className="flex items-center justify-between">
            <DiagramToggle
              checked={showPercentage}
              onChange={setShowPercentage}
              label="הצג אחוזים"
              disabled={!isActive}
            />
            <DiagramReset onReset={handleReset} />
          </div>
        </div>
      )}

      {/* Interaction hint */}
      {isActive && editable && (
        <div className="text-sm text-neutral-600 text-center">
          💡 השתמש במחוונים לשנות את השבר
        </div>
      )}
    </div>
  )
}
