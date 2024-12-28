'use client'

import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

type Variants =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'
type ButtonTypes = 'button' | 'submit' | 'reset'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  type?: ButtonTypes
  variant?: Variants
  isLoading?: boolean
}
export default function Button({
  label,
  type = 'button',
  variant = 'primary',
  isLoading,
  className,
  ...rest
}: ButtonProps) {
  return (
    <>
      <button
        type={type}
        className={clsx(
          'btn',
          {
            'btn-primary': variant === 'primary',
            'btn-secondary': variant === 'secondary',
            'btn-neutral': variant === 'neutral',
            'btn-ghost': variant === 'ghost',
            'btn-link': variant === 'link',
            'btn-info': variant === 'info',
            'btn-success': variant === 'success',
            'btn-warning': variant === 'warning',
            'btn-error': variant === 'error',
          },
          className
        )}
        {...rest}
      >
        {label}
        {isLoading && <span className="loading loading-spinner"></span>}
      </button>
    </>
  )
}
