'use client'

import { useState } from 'react'
import { SolutionStep as SolutionStepType } from '@/lib/types/curriculum'
import SolutionStep from './SolutionStep'
import Button from '@/components/ui/Button'

interface StepByStepProps {
  steps: SolutionStepType[]
  finalAnswer: string
}

export default function StepByStep({ steps, finalAnswer }: StepByStepProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showAll, setShowAll] = useState(false)

  const visibleSteps = showAll ? steps : steps.slice(0, currentStep + 1)

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleShowAll = () => {
    setShowAll(true)
    setCurrentStep(steps.length - 1)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setShowAll(false)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {visibleSteps.map((step, index) => (
          <SolutionStep
            key={step.stepNumber}
            step={step}
            isActive={index === currentStep && !showAll}
            isCompleted={index < currentStep || showAll}
          />
        ))}
      </div>

      {!showAll && currentStep < steps.length - 1 && (
        <div className="flex gap-3">
          <Button onClick={handleNextStep} variant="primary">
            שלב הבא
          </Button>
          <Button onClick={handleShowAll} variant="outline">
            הצג את כל הפתרון
          </Button>
        </div>
      )}

      {(showAll || currentStep === steps.length - 1) && (
        <>
          <div className="mt-6 p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border-2 border-primary-500">
            <p className="text-sm font-medium text-primary-700 mb-2">
              ✓ תשובה סופית:
            </p>
            <p className="text-lg font-bold text-neutral-900">
              {finalAnswer}
            </p>
          </div>

          {showAll && (
            <div className="flex justify-center">
              <Button onClick={handleReset} variant="ghost">
                התחל מחדש
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
