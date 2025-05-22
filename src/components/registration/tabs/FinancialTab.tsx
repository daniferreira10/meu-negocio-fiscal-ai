
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CpfFormValues, IncomeRange } from '@/types/userProfileTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CurrencyInput } from '@/components/ui/currency-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
          name="monthly_income_range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faixa de Renda</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua faixa de renda" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={IncomeRange.RANGE_1}>Até R$ 2.000,00</SelectItem>
                  <SelectItem value={IncomeRange.RANGE_2}>R$ 2.001,00 a R$ 5.000,00</SelectItem>
                  <SelectItem value={IncomeRange.RANGE_3}>R$ 5.001,00 a R$ 10.000,00</SelectItem>
                  <SelectItem value={IncomeRange.RANGE_4}>R$ 10.001,00 a R$ 20.000,00</SelectItem>
                  <SelectItem value={IncomeRange.RANGE_5}>Acima de R$ 20.000,00</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Faixa aproximada da sua renda mensal
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
          name="income_tax_declarant"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Declarante de Imposto de Renda</FormLabel>
                <FormDescription>
                  Selecione se você é obrigado a declarar Imposto de Renda
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="autonomous_activity"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Possui atividade autônoma</FormLabel>
                <FormDescription>
                  Selecione se você exerce atividade como autônomo/profissional liberal
                </FormDescription>
              </div>
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
