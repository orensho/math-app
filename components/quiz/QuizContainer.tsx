'use client'

import { useState, useMemo } from 'react'
import { QuizQuestion as QuizQuestionType } from '@/lib/types/curriculum'
import { useProgress } from '@/contexts/ProgressContext'
import { shuffle } from '@/lib/utils/shuffle'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'
import QuizProgress from './QuizProgress'
import ScoreDisplay from './ScoreDisplay'
import Card from '../ui/Card'

interface QuizContainerProps {
  questions: QuizQuestionType[]
  unitId: string
}

export default function QuizContainer({ questions, unitId }: QuizContainerProps) {
  const { recordQuizAttempt, getTotalPoints } = useProgress()

  // Shuffle questions and their options on component mount
  const shuffledQuestions = useMemo(() => {
    return shuffle(questions).map(question => ({
      ...question,
      options: shuffle(question.options)
    }))
  }, [questions])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const currentQuestion = shuffledQuestions[currentQuestionIndex]

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId)
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswerId
    const earnedPoints = isCorrect ? currentQuestion.points : 0

    // Record the attempt in progress tracking
    recordQuizAttempt(unitId, currentQuestion.id, isCorrect, earnedPoints)

    setTotalScore((prev) => prev + earnedPoints)
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setIsCompleted(true)
    }
  }

  const handleRetry = () => {
    setSelectedAnswer(null)
    setShowResult(false)
  }

  if (isCompleted) {
    const maxScore = shuffledQuestions.reduce((sum, q) => sum + q.points, 0)
    const percentage = Math.round((totalScore / maxScore) * 100)

    return (
      <Card className="p-12 text-center" hover={false}>
        <div className="max-w-2xl mx-auto">
          <div className="text-7xl mb-6">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '💪'}
          </div>
          <h2 className="text-4xl font-bold font-display text-neutral-900 mb-4">
            {percentage >= 80 ? 'מעולה!' : percentage >= 60 ? 'יפה מאוד!' : 'המשך להתאמן!'}
          </h2>
          <div className="text-6xl font-bold text-primary-600 mb-2 number-ltr">
            {totalScore} / {maxScore}
          </div>
          <p className="text-xl text-neutral-600 mb-8">
            השגת {percentage}% מהנקודות
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium shadow-float"
            >
              נסה שוב
            </button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <QuizProgress
          current={currentQuestionIndex + 1}
          total={shuffledQuestions.length}
        />
        <ScoreDisplay score={totalScore} />
      </div>

      <Card className="p-8" hover={false}>
        {!showResult ? (
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onSubmit={handleSubmit}
          />
        ) : (
          <QuizResult
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onNext={handleNext}
            onRetry={handleRetry}
            isLastQuestion={currentQuestionIndex === shuffledQuestions.length - 1}
          />
        )}
      </Card>
    </div>
  )
}
