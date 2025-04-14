interface Option {
    value: string
    label: string
  }
  
  interface SelectProps {
    options: Option[]
    value: string
    onChange: (value: string) => void
  }
  
  export function Select({ options, value, onChange }: SelectProps) {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  }
  