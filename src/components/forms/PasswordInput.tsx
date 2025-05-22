
import { useState } from 'react';
import { LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control, UseFormReturn } from 'react-hook-form';

interface PasswordInputProps {
  control?: Control<any>;
  form?: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
}

const PasswordInput = ({
  control,
  form,
  name,
  label,
  placeholder
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Use the control directly if provided, otherwise get it from the form
  const actualControl = control || (form ? form.control : undefined);
  
  if (!actualControl) {
    console.error("PasswordInput requires either a control or form prop");
    return null;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={actualControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockIcon className="h-5 w-5 text-gray-400" />
            </div>
            <FormControl>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className="pl-10 pr-10"
                {...field}
              />
            </FormControl>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
