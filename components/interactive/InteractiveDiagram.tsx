'use client'

import { Suspense, lazy } from 'react'
import { DiagramConfig } from '@/lib/types/curriculum'

// Lazy load diagram components
const NumberLine = lazy(() => import('./diagrams/NumberLine'))
const FractionVisualizer = lazy(() => import('./diagrams/FractionVisualizer'))
const ShapeBuilder = lazy(() => import('./diagrams/ShapeBuilder'))
const AngleVisualizer = lazy(() => import('./diagrams/AngleVisualizer'))

interface InteractiveDiagramProps {
  config: DiagramConfig
  isActive?: boolean
}

/**
 * Wrapper component that loads the appropriate diagram type
 * and provides common controls
 */
export default function InteractiveDiagram({ config, isActive = true }: InteractiveDiagramProps) {
  const { type, params, showControls = true, height } = config

  // Render loading state
  const LoadingFallback = () => (
    <div
      className="flex items-center justify-center p-8 bg-neutral-50 rounded-lg border-2 border-neutral-200"
      style={{ height: height || 300 }}
    >
      <div className="text-neutral-500">טוען דיאגרמה...</div>
    </div>
  )

  // Render error state
  const ErrorFallback = () => (
    <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
      <p className="text-red-700">שגיאה בטעינת הדיאגרמה</p>
    </div>
  )

  // Select the appropriate diagram component
  const renderDiagram = () => {
    try {
      switch (type) {
        case 'number-line':
          return <NumberLine params={params} showControls={showControls} isActive={isActive} />

        case 'fraction-visualizer':
          return (
            <FractionVisualizer params={params} showControls={showControls} isActive={isActive} />
          )

        case 'shape-builder':
          return <ShapeBuilder params={params} showControls={showControls} isActive={isActive} />

        case 'angle-visualizer':
          return <AngleVisualizer params={params} showControls={showControls} isActive={isActive} />

        default:
          return <ErrorFallback />
      }
    } catch (error) {
      console.error('Error rendering diagram:', error)
      return <ErrorFallback />
    }
  }

  return (
    <div className="my-4">
      <Suspense fallback={<LoadingFallback />}>{renderDiagram()}</Suspense>
    </div>
  )
}
