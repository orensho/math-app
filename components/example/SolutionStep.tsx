import { SolutionStep as SolutionStepType } from '@/lib/types/curriculum'
import Badge from '../ui/Badge'
import clsx from 'clsx'

interface SolutionStepProps {
  step: SolutionStepType
  isActive: boolean
  isCompleted: boolean
}

export default function SolutionStep({ step, isActive, isCompleted }: SolutionStepProps) {
  return (
    <div
      className={clsx(
        'p-4 rounded-lg border-2 transition-all duration-300',
        isActive && 'border-primary-500 bg-primary-50 shadow-soft',
        isCompleted && !isActive && 'border-neutral-200 bg-white',
        !isActive && !isCompleted && 'border-neutral-200 bg-neutral-50 opacity-60'
      )}
    >
      <div className="flex items-start gap-3">
        <Badge
          variant={isActive ? 'primary' : isCompleted ? 'success' : 'neutral'}
          className="flex-shrink-0"
        >
          {isCompleted && !isActive ? '✓' : step.stepNumber}
        </Badge>

        <div className="flex-1">
          <h4 className="font-bold text-neutral-900 mb-2">
            {step.description}
          </h4>

          {step.calculation && (
            <div className="p-3 bg-white rounded border border-neutral-200 mb-2 font-mono text-sm number-ltr">
              {step.calculation}
            </div>
          )}

          <p className="text-neutral-700 text-sm leading-relaxed">
            {step.explanation}
          </p>
        </div>
      </div>
    </div>
  )
}
