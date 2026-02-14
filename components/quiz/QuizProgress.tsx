interface QuizProgressProps {
  current: number
  total: number
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = (current / total) * 100

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-neutral-600">
          שאלה {current} מתוך {total}
        </span>
        <span className="text-sm font-medium text-primary-600">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
