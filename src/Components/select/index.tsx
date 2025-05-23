import { SelectHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  className?: string
  options: Array<{ value: string; label: string }>
}

export default function Select({
  label,
  className,
  options = [],
  ...rest
}: SelectProps) {
  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <select className="select select-bordered w-full" {...rest}>
          {options.map(option => (
            <option key={option.value} value={option.value.toString()}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </>
  )
}
