import { QuizQuestion as QuizQuestionType } from '@/lib/types/curriculum'
import Button from '../ui/Button'
import Card from '../ui/Card'
import clsx from 'clsx'

interface QuizQuestionProps {
  question: QuizQuestionType
  selectedAnswer: string | null
  onAnswerSelect: (answerId: string) => void
  onSubmit: () => void
}

export default function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
  onSubmit,
}: QuizQuestionProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="p-4 sm:p-6 bg-neutral-50 rounded-xl border-2 border-neutral-200">
        <p className="text-xl sm:text-2xl font-medium text-neutral-900">
          {question.question}
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onAnswerSelect(option.id)}
            className={clsx(
              'w-full p-4 sm:p-5 text-right rounded-xl border-2 transition-all duration-200 cursor-pointer',
              'hover:shadow-soft active:scale-[0.98]',
              selectedAnswer === option.id
                ? 'border-primary-500 bg-primary-50 shadow-soft'
                : 'border-neutral-200 bg-white hover:border-primary-300 active:bg-primary-50'
            )}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={clsx(
                  'w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                  selectedAnswer === option.id
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-neutral-300'
                )}
              >
                {selectedAnswer === option.id && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                )}
              </div>
              <span className="text-base sm:text-lg text-neutral-900">{option.text}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center pt-2 sm:pt-4">
        <Button
          onClick={onSubmit}
          disabled={!selectedAnswer}
          variant="primary"
          size="lg"
          className="min-w-[180px] sm:min-w-[200px]"
        >
          בדוק תשובה
        </Button>
      </div>
    </div>
  )
}
