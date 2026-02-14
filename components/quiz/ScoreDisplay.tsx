interface ScoreDisplayProps {
  score: number
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-full border-2 border-accent-200">
      <span className="text-2xl">🏆</span>
      <div>
        <div className="text-xs text-accent-700 font-medium">נקודות</div>
        <div className="text-lg font-bold text-accent-700 number-ltr">
          {score}
        </div>
      </div>
    </div>
  )
}
