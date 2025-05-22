
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: number | string;
  onChange: (value: number | string) => void;
  className?: string;
  placeholder?: string;
}

const CurrencyInput = ({
  value,
  onChange,
  className,
  placeholder = "0,00",
  ...props
}: CurrencyInputProps) => {
  const [displayValue, setDisplayValue] = useState(() => {
    return value ? value.toString() : '';
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and comma/dot for decimal
    const inputValue = e.target.value.replace(/[^0-9.,]/g, '');
    setDisplayValue(inputValue);
    
    // Convert to number for the form
    if (inputValue) {
      const numericValue = parseFloat(inputValue.replace(',', '.'));
      onChange(isNaN(numericValue) ? 0 : numericValue);
    } else {
      onChange(0);
    }
  };

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        R$
      </span>
      <Input
        type="text"
        value={displayValue}
        onChange={handleChange}
        className={`pl-8 ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export { CurrencyInput };
