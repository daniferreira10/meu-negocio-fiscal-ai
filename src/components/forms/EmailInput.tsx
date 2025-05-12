
import { MailIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

interface EmailInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
}

const EmailInput = ({ form, name, label, placeholder }: EmailInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MailIcon className="h-5 w-5 text-gray-400" />
            </div>
            <FormControl>
              <Input 
                placeholder={placeholder} 
                className="pl-10" 
                {...field} 
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailInput;
