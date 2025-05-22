
import { MailIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control, UseFormReturn } from 'react-hook-form';

interface EmailInputProps {
  control?: Control<any>;
  form?: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
}

const EmailInput = ({
  control,
  form,
  name,
  label,
  placeholder
}: EmailInputProps) => {
  // Use the control directly if provided, otherwise get it from the form
  const actualControl = control || (form ? form.control : undefined);
  
  if (!actualControl) {
    console.error("EmailInput requires either a control or form prop");
    return null;
  }

  return (
    <FormField
      control={actualControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MailIcon className="h-5 w-5 text-gray-400" />
            </div>
            <FormControl>
              <Input placeholder={placeholder} className="pl-10" {...field} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailInput;
