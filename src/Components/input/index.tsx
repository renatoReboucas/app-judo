import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  className?: string
}

export default function InputLabel({ label, className, ...rest }: InputProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        autoComplete="off"
        className={`input input-bordered border border-gray-400 text-zinc-950 w-full ${className}`}
        {...rest}
      />
    </label>
  )
}
