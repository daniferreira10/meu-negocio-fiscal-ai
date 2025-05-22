
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CpfFormValues } from '../types/cpfRegistrationTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/forms/SubmitButton';

interface OtherTabProps {
  form: UseFormReturn<CpfFormValues>;
  onPrevious: () => void;
  loading: boolean;
}

const OtherTab: React.FC<OtherTabProps> = ({ form, onPrevious, loading }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="main_bank_account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta Bancária Principal</FormLabel>
              <FormControl>
                <Input placeholder="Banco, tipo e número da conta" {...field} />
              </FormControl>
              <FormDescription>
                Exemplo: Banco XYZ, Conta Corrente nº 12345-6
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tax_return_info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Informações de Declaração de Imposto de Renda</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Detalhe sua situação com o Imposto de Renda" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Exemplo: Declarante, isento, última declaração em 2024
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={onPrevious}
        >
          Voltar
        </Button>
        <SubmitButton loading={loading} text="Finalizar Cadastro" />
      </div>
    </div>
  );
};

export default OtherTab;
