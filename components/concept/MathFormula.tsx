'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface MathFormulaProps {
  formula: string
  displayMode?: boolean
  className?: string
}

export default function MathFormula({
  formula,
  displayMode = false,
  className = '',
}: MathFormulaProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && formula) {
      try {
        katex.render(formula, containerRef.current, {
          displayMode,
          throwOnError: false,
          strict: false,
        })
      } catch (error) {
        console.error('KaTeX rendering error:', error)
        if (containerRef.current) {
          containerRef.current.textContent = formula
        }
      }
    }
  }, [formula, displayMode])

  return (
    <div
      ref={containerRef}
      className={`number-ltr inline-block ${className}`}
      dir="ltr"
    />
  )
}
