'use client'

import dynamic from 'next/dynamic'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import MathFormula from './MathFormula'
import { Concept } from '@/lib/types/curriculum'

// Lazy load InteractiveDiagram for client-side only
const InteractiveDiagram = dynamic(
  () => import('@/components/interactive/InteractiveDiagram'),
  { ssr: false }
)

interface ConceptCardProps {
  concept: Concept
  index: number
}

export default function ConceptCard({ concept, index }: ConceptCardProps) {
  return (
    <Card className="p-6" hover={false}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Badge variant="primary" size="lg">
            {index + 1}
          </Badge>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold font-display text-neutral-900 mb-3">
            {concept.title}
          </h3>

          <div className="text-neutral-700 leading-relaxed mb-4">
            {concept.content}
          </div>

          {concept.formula && (
            <div className="p-4 bg-neutral-50 rounded-lg border-2 border-primary-200 flex items-center justify-center">
              <MathFormula formula={concept.formula} displayMode={true} />
            </div>
          )}

          {concept.diagram && (
            <div className="mt-4">
              <InteractiveDiagram config={concept.diagram} />
            </div>
          )}

          {concept.visualAid && (
            <div className="mt-4">
              <img
                src={concept.visualAid}
                alt={concept.title}
                className="rounded-lg max-w-full"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
