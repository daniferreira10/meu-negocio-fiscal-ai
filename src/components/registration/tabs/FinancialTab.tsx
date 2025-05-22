
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CpfFormValues } from '../types/cpfRegistrationTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CurrencyInput } from '@/components/ui/currency-input';

interface FinancialTabProps {
  form: UseFormReturn<CpfFormValues>;
  onNext: () => void;
  onPrevious: () => void;
}

const FinancialTab: React.FC<FinancialTabProps> = ({ form, onNext, onPrevious }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profissão/Ocupação Principal</FormLabel>
              <FormControl>
                <Input placeholder="Sua profissão atual" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="monthly_income"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Renda Mensal Bruta</FormLabel>
              <FormControl>
                <CurrencyInput
                  placeholder="0,00"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Valor total antes dos descontos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="monthly_expenses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Despesas Mensais Médias</FormLabel>
              <FormControl>
                <CurrencyInput
                  placeholder="0,00"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Estimativa de gastos mensais fixos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="other_income_sources"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Outras Fontes de Renda</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Aluguel, investimentos, etc." 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Descreva outras fontes de renda, se aplicável
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

export default FinancialTab;
