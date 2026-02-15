import clsx from 'clsx'

interface DiagramToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
}

/**
 * Toggle switch for diagram features
 */
export default function DiagramToggle({
  checked,
  onChange,
  label,
  disabled = false
}: DiagramToggleProps) {
  return (
    <label className={clsx(
      'flex items-center gap-3 cursor-pointer',
      disabled && 'opacity-50 cursor-not-allowed'
    )}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
          aria-label={label}
        />
        <div
          className={clsx(
            'w-12 h-7 rounded-full transition-colors duration-200',
            'peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2',
            checked ? 'bg-primary-500' : 'bg-neutral-300'
          )}
        />
        <div
          className={clsx(
            'absolute right-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-200',
            checked && 'translate-x-5'
          )}
        />
      </div>
      <span className="text-sm text-neutral-700">{label}</span>
    </label>
  )
}
