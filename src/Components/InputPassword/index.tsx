'use client'
import { Eye, EyeOff } from 'lucide-react'
import { useState, type InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  msgError?: string
  placeholder: string
  name?: string
}

export default function InputPassword({
  label,
  msgError,
  placeholder,
  className,
  name,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div
        className={`input input-bordered  w-full max-w-xs flex items-center gap-2 ${className}`}
        {...rest}
      >
        <input
          autoComplete="off"
          name={name}
          type={showPassword ? 'text' : 'password'}
          className="grow bg-white text-zinc-900"
          placeholder={placeholder}
        />
        <button onClick={togglePasswordVisibility} type="button">
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </label>
  )
}
