'use client'

import { useState } from 'react'
import DiagramContainer from '../DiagramContainer'
import DiagramSlider from '../controls/DiagramSlider'
import DiagramReset from '../controls/DiagramReset'
import { polarToCartesian } from '../utils/svg-helpers'

interface AngleVisualizerParams {
  angle1: number
  angle2?: number
  showComplementary?: boolean
  showSupplementary?: boolean
  editable?: boolean
  type?: 'single' | 'complementary' | 'supplementary' | 'vertical'
}

interface AngleVisualizerProps {
  params: AngleVisualizerParams
  showControls?: boolean
  isActive?: boolean
}

/**
 * Angle Visualizer for showing angles, complementary, supplementary, and vertical angles
 */
export default function AngleVisualizer({
  params,
  showControls = true,
  isActive = true
}: AngleVisualizerProps) {
  const {
    angle1: initialAngle1,
    angle2: initialAngle2,
    showComplementary = false,
    showSupplementary = false,
    editable = false,
    type = 'single'
  } = params

  const [angle1, setAngle1] = useState(initialAngle1)
  const [angle2, setAngle2] = useState(initialAngle2 || 0)

  const width = 600
  const height = 400
  const centerX = width / 2
  const centerY = height / 2
  const radius = 120
  const armLength = 150

  const handleReset = () => {
    setAngle1(initialAngle1)
    setAngle2(initialAngle2 || 0)
  }

  // Draw an arc for the angle
  const drawAngleArc = (startAngle: number, endAngle: number, arcRadius: number, color: string) => {
    const start = polarToCartesian(centerX, centerY, arcRadius, startAngle)
    const end = polarToCartesian(centerX, centerY, arcRadius, endAngle)

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${start.x} ${start.y}`,
      `A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      'Z'
    ].join(' ')

    return (
      <path
        d={pathData}
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="2"
      />
    )
  }

  // Draw angle arms
  const drawArm = (angle: number, color: string = '#374151') => {
    const end = polarToCartesian(centerX, centerY, armLength, angle)
    return (
      <line
        x1={centerX}
        y1={centerY}
        x2={end.x}
        y2={end.y}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    )
  }

  // Draw angle label
  const drawAngleLabel = (startAngle: number, endAngle: number, labelRadius: number, label: string) => {
    const midAngle = (startAngle + endAngle) / 2
    const labelPos = polarToCartesian(centerX, centerY, labelRadius, midAngle)

    return (
      <text
        x={labelPos.x}
        y={labelPos.y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-neutral-900 font-bold"
        style={{ fontSize: '16px' }}
      >
        {label}
      </text>
    )
  }

  const renderSingleAngle = () => {
    return (
      <>
        {/* Base arm (horizontal) */}
        {drawArm(0)}
        {/* Angle arm */}
        {drawArm(angle1, '#4f46e5')}
        {/* Angle arc */}
        {drawAngleArc(0, angle1, 40, '#4f46e5')}
        {/* Angle label */}
        {drawAngleLabel(0, angle1, 60, `${angle1}°`)}
      </>
    )
  }

  const renderComplementaryAngles = () => {
    const complement = 90 - angle1
    return (
      <>
        {/* Base arm (horizontal) */}
        {drawArm(0)}
        {/* Vertical arm */}
        {drawArm(90, '#6b7280')}
        {/* First angle arm */}
        {drawArm(angle1, '#4f46e5')}

        {/* First angle arc */}
        {drawAngleArc(0, angle1, 40, '#4f46e5')}
        {/* Complementary angle arc */}
        {drawAngleArc(angle1, 90, 50, '#ec4899')}

        {/* Angle labels */}
        {drawAngleLabel(0, angle1, 60, `${angle1}°`)}
        {drawAngleLabel(angle1, 90, 70, `${complement}°`)}

        {/* Right angle marker */}
        <rect
          x={centerX}
          y={centerY - 15}
          width="15"
          height="15"
          fill="none"
          stroke="#6b7280"
          strokeWidth="2"
        />
      </>
    )
  }

  const renderSupplementaryAngles = () => {
    const supplement = 180 - angle1
    return (
      <>
        {/* Base line (straight line) */}
        {drawArm(0)}
        {drawArm(180, '#6b7280')}
        {/* Angle arm */}
        {drawArm(angle1, '#4f46e5')}

        {/* First angle arc */}
        {drawAngleArc(0, angle1, 40, '#4f46e5')}
        {/* Supplementary angle arc */}
        {drawAngleArc(angle1, 180, 50, '#10b981')}

        {/* Angle labels */}
        {drawAngleLabel(0, angle1, 60, `${angle1}°`)}
        {drawAngleLabel(angle1, 180, 70, `${supplement}°`)}
      </>
    )
  }

  const renderVerticalAngles = () => {
    return (
      <>
        {/* Two intersecting lines */}
        {drawArm(angle1, '#4f46e5')}
        {drawArm(180 + angle1, '#4f46e5')}
        {drawArm(angle2, '#ec4899')}
        {drawArm(180 + angle2, '#ec4899')}

        {/* Vertical angle arcs */}
        {drawAngleArc(angle2, angle1, 40, '#4f46e5')}
        {drawAngleArc(180 + angle2, 180 + angle1, 40, '#4f46e5')}

        {/* Labels for vertical angles */}
        {drawAngleLabel(angle2, angle1, 60, `${Math.abs(angle1 - angle2)}°`)}
        {drawAngleLabel(180 + angle2, 180 + angle1, 60, `${Math.abs(angle1 - angle2)}°`)}
      </>
    )
  }

  return (
    <div className="space-y-4">
      <DiagramContainer width={width} height={height} ariaLabel="מ시각화 זווית אינטראקטיבית">
        {/* Center point */}
        <circle cx={centerX} cy={centerY} r="4" fill="#374151" />

        {/* Render based on type */}
        {type === 'single' && renderSingleAngle()}
        {type === 'complementary' && renderComplementaryAngles()}
        {type === 'supplementary' && renderSupplementaryAngles()}
        {type === 'vertical' && renderVerticalAngles()}

        {/* Info text */}
        <text
          x={width / 2}
          y={height - 30}
          textAnchor="middle"
          className="fill-neutral-600 text-sm"
          style={{ fontSize: '14px' }}
        >
          {type === 'complementary' && `סכום זוויות משלימות: ${angle1}° + ${90 - angle1}° = 90°`}
          {type === 'supplementary' && `סכום זוויות משוכללות: ${angle1}° + ${180 - angle1}° = 180°`}
          {type === 'vertical' && 'זוויות קודקודיות שוות זו לזו'}
        </text>
      </DiagramContainer>

      {/* Controls */}
      {showControls && (
        <div className="space-y-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          {/* Sliders (if editable) */}
          {editable && (
            <div className="space-y-4">
              <DiagramSlider
                value={angle1}
                onChange={setAngle1}
                min={0}
                max={type === 'complementary' ? 90 : type === 'supplementary' ? 180 : 360}
                label="זווית 1"
                disabled={!isActive}
              />
              {type === 'vertical' && (
                <DiagramSlider
                  value={angle2}
                  onChange={setAngle2}
                  min={0}
                  max={180}
                  label="זווית 2"
                  disabled={!isActive}
                />
              )}
            </div>
          )}

          {/* Reset button */}
          <div className="flex justify-end">
            <DiagramReset onReset={handleReset} />
          </div>
        </div>
      )}

      {/* Interaction hint */}
      {isActive && editable && (
        <div className="text-sm text-neutral-600 text-center">
          💡 השתמש במחוון לשנות את גודל הזווית
        </div>
      )}
    </div>
  )
}
