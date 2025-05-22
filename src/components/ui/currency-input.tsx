
import React, { useState, useEffect } from "react";
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
  const [displayValue, setDisplayValue] = useState("");
  
  // Format the initial value when component mounts or value changes
  useEffect(() => {
    if (value === 0 || value === "") {
      setDisplayValue("");
      return;
    }
    
    // Convert to string and ensure it uses comma as decimal separator
    const formattedValue = typeof value === 'number' 
      ? value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : value.toString().replace('.', ',');
    
    setDisplayValue(formattedValue);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and comma/dot for decimal
    const inputValue = e.target.value.replace(/[^0-9.,]/g, '');
    
    // Replace dots with commas for consistency in display
    const formattedValue = inputValue.replace('.', ',');
    setDisplayValue(formattedValue);
    
    // For the onChange handler, we need to convert to a number with dot as decimal separator
    if (formattedValue) {
      const numericValue = parseFloat(formattedValue.replace(',', '.'));
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
