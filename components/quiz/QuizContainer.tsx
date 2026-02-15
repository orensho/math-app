'use client'

import { useState, useMemo } from 'react'
import { QuizQuestion as QuizQuestionType } from '@/lib/types/curriculum'
import { useProgress } from '@/contexts/ProgressContext'
import { shuffle } from '@/lib/utils/shuffle'
import { useStopwatch } from '@/lib/hooks/useStopwatch'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'
import QuizProgress from './QuizProgress'
import ScoreDisplay from './ScoreDisplay'
import StopwatchDisplay, { formatTime } from './StopwatchDisplay'
import Card from '../ui/Card'

interface QuizContainerProps {
  questions: QuizQuestionType[]
  unitId: string
}

export default function QuizContainer({ questions, unitId }: QuizContainerProps) {
  const { recordQuizAttempt, getTotalPoints } = useProgress()
  const { elapsedMs, pause, resume, getElapsedMs } = useStopwatch()

  // Keep question order (progressive difficulty), only shuffle options
  const preparedQuestions = useMemo(() => {
    return questions.map(question => ({
      ...question,
      options: shuffle(question.options)
    }))
  }, [questions])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [finalTimeMs, setFinalTimeMs] = useState<number | null>(null)

  const currentQuestion = preparedQuestions[currentQuestionIndex]

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId)
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return

    pause()

    const isCorrect = selectedAnswer === currentQuestion.correctAnswerId
    const earnedPoints = isCorrect ? currentQuestion.points : 0

    // Record the attempt in progress tracking
    recordQuizAttempt(unitId, currentQuestion.id, isCorrect, earnedPoints)

    setTotalScore((prev) => prev + earnedPoints)
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex < preparedQuestions.length - 1) {
      resume()
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setFinalTimeMs(getElapsedMs())
      setIsCompleted(true)
    }
  }

  const handleRetry = () => {
    resume()
    setSelectedAnswer(null)
    setShowResult(false)
  }

  if (isCompleted) {
    const maxScore = preparedQuestions.reduce((sum, q) => sum + q.points, 0)
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
          <p className="text-xl text-neutral-600 mb-2">
            השגת {percentage}% מהנקודות
          </p>
          <p className="text-sm text-neutral-400 mb-6">
            שאלות קלות = 5 נק׳ · בינוניות = 10 נק׳ · קשות = 15 נק׳
          </p>

          {finalTimeMs !== null && (
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center px-6 py-3 bg-primary-50 rounded-2xl">
                <div className="text-2xl font-bold text-primary-700 number-ltr">
                  {formatTime(finalTimeMs)}
                </div>
                <div className="text-sm text-primary-600">זמן כולל</div>
              </div>
              <div className="text-center px-6 py-3 bg-primary-50 rounded-2xl">
                <div className="text-2xl font-bold text-primary-700 number-ltr">
                  {formatTime(Math.round(finalTimeMs / preparedQuestions.length))}
                </div>
                <div className="text-sm text-primary-600">ממוצע לשאלה</div>
              </div>
            </div>
          )}

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
          total={preparedQuestions.length}
        />
        <div className="flex items-center gap-3">
          <StopwatchDisplay elapsedMs={elapsedMs} />
          <ScoreDisplay score={totalScore} />
        </div>
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
            isLastQuestion={currentQuestionIndex === preparedQuestions.length - 1}
          />
        )}
      </Card>
    </div>
  )
}
