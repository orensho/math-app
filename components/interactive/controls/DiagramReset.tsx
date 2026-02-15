interface DiagramResetProps {
  onReset: () => void
  label?: string
}

/**
 * Reset button for diagrams
 */
export default function DiagramReset({ onReset, label = 'אפס' }: DiagramResetProps) {
  return (
    <button
      onClick={onReset}
      className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg border border-neutral-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      aria-label={`${label} את הדיאגרמה`}
    >
      {label}
    </button>
  )
}
