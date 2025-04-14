import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  className?: string;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  options,
  className = '',
  disabled = false
}) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`select ${className}`}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
  