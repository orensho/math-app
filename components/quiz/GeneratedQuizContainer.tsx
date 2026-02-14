'use client'

import { useMemo } from 'react'
import { generateMultiplicationQuiz } from '@/lib/utils/generateMultiplicationQuiz'
import QuizContainer from './QuizContainer'

interface GeneratedQuizContainerProps {
  moduleId: string
  moduleName: string
  questionCount?: number
}

export default function GeneratedQuizContainer({
  moduleId,
  moduleName,
  questionCount = 10
}: GeneratedQuizContainerProps) {
  // Generate new questions on each component mount
  const questions = useMemo(() => {
    return generateMultiplicationQuiz(questionCount)
  }, [questionCount])

  return <QuizContainer questions={questions} unitId={moduleId} />
}
