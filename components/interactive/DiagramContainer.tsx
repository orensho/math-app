import { ReactNode } from 'react'
import clsx from 'clsx'

interface DiagramContainerProps {
  children: ReactNode
  width?: number
  height?: number
  viewBox?: string
  className?: string
  ariaLabel?: string
}

/**
 * Responsive SVG container for interactive diagrams
 * Maintains aspect ratio and provides consistent styling
 */
export default function DiagramContainer({
  children,
  width = 600,
  height = 300,
  viewBox,
  className,
  ariaLabel
}: DiagramContainerProps) {
  const defaultViewBox = viewBox || `0 0 ${width} ${height}`

  return (
    <div
      className={clsx(
        'w-full rounded-lg border-2 border-primary-200 bg-white overflow-hidden',
        className
      )}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={defaultViewBox}
        preserveAspectRatio="xMidYMid meet"
        className="max-w-full h-auto"
        role="img"
        aria-label={ariaLabel || 'דיאגרמה אינטראקטיבית'}
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </div>
  )
}
