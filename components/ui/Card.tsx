import { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'bordered'
  hover?: boolean
  children: ReactNode
}

export default function Card({
  variant = 'default',
  hover = true,
  className,
  children,
  ...props
}: CardProps) {
  const baseStyles = 'bg-white rounded-2xl transition-all duration-300'

  const variants = {
    default: 'shadow-float',
    flat: 'shadow-soft',
    bordered: 'border-2 border-neutral-200'
  }

  const hoverStyles = hover ? 'hover:shadow-depth hover:-translate-y-1 active:scale-[0.98] cursor-pointer' : ''

  return (
    <div
      className={clsx(
        baseStyles,
        variants[variant],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
