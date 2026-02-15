import clsx from 'clsx'

interface DiagramSliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  label: string
  showValue?: boolean
  disabled?: boolean
}

/**
 * Slider control for numeric diagram parameters
 */
export default function DiagramSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  showValue = true,
  disabled = false
}: DiagramSliderProps) {
  return (
    <div className={clsx(
      'flex flex-col gap-2',
      disabled && 'opacity-50'
    )}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={`slider-${label}`}
          className="text-sm font-medium text-neutral-700"
        >
          {label}
        </label>
        {showValue && (
          <span className="text-sm font-mono text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
            {value}
          </span>
        )}
      </div>
      <input
        id={`slider-${label}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className={clsx(
          'w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:w-4',
          '[&::-webkit-slider-thumb]:h-4',
          '[&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-primary-500',
          '[&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-webkit-slider-thumb]:hover:bg-primary-600',
          '[&::-webkit-slider-thumb]:transition-colors',
          '[&::-moz-range-thumb]:w-4',
          '[&::-moz-range-thumb]:h-4',
          '[&::-moz-range-thumb]:rounded-full',
          '[&::-moz-range-thumb]:bg-primary-500',
          '[&::-moz-range-thumb]:border-0',
          '[&::-moz-range-thumb]:cursor-pointer',
          '[&::-moz-range-thumb]:hover:bg-primary-600',
          '[&::-moz-range-thumb]:transition-colors',
          disabled && 'cursor-not-allowed opacity-50'
        )}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      <div className="flex justify-between text-xs text-neutral-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}
