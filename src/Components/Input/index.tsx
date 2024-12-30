'use client'

import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  msgError?: string
  placeholder: string
  name?: string
  type: 'text' | 'email' | 'date'
}

export default function Input({
  label,
  msgError,
  placeholder,
  type = 'text',
  className,
  name,
  ...rest
}: InputProps) {
  return (
    <label className="form-control w-full max-w-xs ">
      <div className="label ">
        <span className="label-text">{label}</span>
      </div>
      <input
        autoComplete="off"
        type={type}
        name={name}
        placeholder={placeholder}
        className={`input input-bordered  w-full max-w-xs  ${className}`}
        {...rest}
      />

      {msgError && (
        <div className="label">
          <span className="label-text-alt">{msgError}</span>
        </div>
      )}
    </label>
  )
}
