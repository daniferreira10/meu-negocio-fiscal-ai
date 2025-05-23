
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CnpjFormValues } from '@/types/userProfileTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FinancialTabProps {
  form: UseFormReturn<CnpjFormValues>;
  onNext: () => void;
  onPrevious: () => void;
}

const FinancialTab: React.FC<FinancialTabProps> = ({ form, onNext, onPrevious }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="monthly_revenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receita Mensal</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  {...field} 
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="employees_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Funcionários</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0" 
                  {...field} 
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="average_payroll"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Folha de Pagamento Média</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  {...field} 
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="fixed_expenses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Despesas Fixas</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  {...field} 
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="variable_expenses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Despesas Variáveis</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  {...field} 
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
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
