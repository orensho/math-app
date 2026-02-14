import { QuizQuestion } from '@/lib/types/curriculum'
import Button from '../ui/Button'
import SolutionStep from '../example/SolutionStep'

interface QuizResultProps {
  question: QuizQuestion
  selectedAnswer: string | null
  onNext: () => void
  onRetry: () => void
  isLastQuestion: boolean
}

export default function QuizResult({
  question,
  selectedAnswer,
  onNext,
  onRetry,
  isLastQuestion,
}: QuizResultProps) {
  const isCorrect = selectedAnswer === question.correctAnswerId
  const selectedOption = question.options.find((opt) => opt.id === selectedAnswer)

  return (
    <div className="space-y-6">
      {/* Result Banner */}
      <div
        className={`p-6 rounded-xl border-2 ${
          isCorrect
            ? 'bg-green-50 border-green-500'
            : 'bg-red-50 border-red-500'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="text-4xl">
            {isCorrect ? '✓' : '✗'}
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">
              {isCorrect ? 'כל הכבוד! תשובה נכונה' : 'לא נכון, אבל זה בסדר'}
            </h3>
            <p className="text-neutral-700">
              {isCorrect
                ? `קיבלת ${question.points} נקודות!`
                : 'נסה שוב או למד מהפתרון'}
            </p>
          </div>
        </div>
      </div>

      {/* Your Answer */}
      {!isCorrect && selectedOption && (
        <div className="p-4 bg-neutral-50 rounded-lg">
          <p className="text-sm font-medium text-neutral-600 mb-1">התשובה שבחרת:</p>
          <p className="text-lg text-neutral-900">{selectedOption.text}</p>
        </div>
      )}

      {/* Correct Answer */}
      <div className="p-4 bg-primary-50 rounded-lg border-2 border-primary-200">
        <p className="text-sm font-medium text-primary-700 mb-1">התשובה הנכונה:</p>
        <p className="text-lg font-bold text-primary-900">
          {question.options.find((opt) => opt.id === question.correctAnswerId)?.text}
        </p>
      </div>

      {/* Explanation */}
      <div className="p-6 bg-white rounded-xl border-2 border-neutral-200">
        <h4 className="text-lg font-bold text-neutral-800 mb-3">הסבר:</h4>
        <p className="text-neutral-700 mb-4">{question.explanation}</p>

        {question.solutionSteps && question.solutionSteps.length > 0 && (
          <>
            <h4 className="text-lg font-bold text-neutral-800 mb-4 mt-6">
              פתרון צעד אחר צעד:
            </h4>
            <div className="space-y-3">
              {question.solutionSteps.map((step) => (
                <SolutionStep
                  key={step.stepNumber}
                  step={step}
                  isActive={false}
                  isCompleted={true}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center pt-4">
        {!isCorrect && (
          <Button onClick={onRetry} variant="outline" size="lg">
            נסה שוב
          </Button>
        )}
        {!isLastQuestion && (
          <Button onClick={onNext} variant="primary" size="lg">
            שאלה הבאה →
          </Button>
        )}
        {isLastQuestion && (
          <Button onClick={onNext} variant="secondary" size="lg">
            סיום החידון
          </Button>
        )}
      </div>
    </div>
  )
}
