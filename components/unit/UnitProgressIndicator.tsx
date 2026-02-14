'use client'

import { useProgress } from '@/contexts/ProgressContext'
import Badge from '../ui/Badge'

interface UnitProgressIndicatorProps {
  unitId: string
  totalQuestions: number
}

export default function UnitProgressIndicator({ unitId, totalQuestions }: UnitProgressIndicatorProps) {
  const { getUnitProgress } = useProgress()
  const unitProgress = getUnitProgress(unitId)

  if (!unitProgress || unitProgress.quizAttempts.length === 0) {
    return null
  }

  const answeredQuestions = unitProgress.quizAttempts.length
  const correctAnswers = unitProgress.quizAttempts.filter(qa => qa.isCorrect).length
  const percentage = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0

  return (
    <div className="flex items-center gap-2">
      <Badge variant={percentage === 100 ? 'success' : 'primary'} size="sm">
        {percentage === 100 ? '✓ הושלם' : `${percentage}% הושלם`}
      </Badge>
      {correctAnswers > 0 && (
        <Badge variant="accent" size="sm">
          {correctAnswers}/{totalQuestions} נכון
        </Badge>
      )}
    </div>
  )
}
