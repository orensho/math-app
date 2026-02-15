interface StopwatchDisplayProps {
  elapsedMs: number
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export { formatTime }

export default function StopwatchDisplay({ elapsedMs }: StopwatchDisplayProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border-2 border-primary-200">
      <span className="text-2xl">&#9201;</span>
      <div>
        <div className="text-xs text-primary-700 font-medium">זמן</div>
        <div className="text-lg font-bold text-primary-700 number-ltr">
          {formatTime(elapsedMs)}
        </div>
      </div>
    </div>
  )
}
