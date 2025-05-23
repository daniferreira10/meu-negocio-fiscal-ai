
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CpfFormValues, CnpjFormValues } from '@/types/userProfileTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AccountTabProps {
  form: UseFormReturn<CpfFormValues | CnpjFormValues>;
  onNext: () => void;
}

const AccountTab: React.FC<AccountTabProps> = ({ form, onNext }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Informações de Acesso</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Configure suas credenciais de acesso ao sistema PrimeDash.
          </p>
        </div>
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="exemplo@empresa.com.br" {...field} />
              </FormControl>
              <FormDescription>
                Este será seu email de login e para comunicações importantes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormDescription>
                Utilize no mínimo 8 caracteres com letras, números e símbolos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="flex justify-end pt-4">
        <Button 
          type="button" 
          onClick={onNext}
          className="bg-brand-blue hover:bg-brand-blue/90 text-white"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default AccountTab;
