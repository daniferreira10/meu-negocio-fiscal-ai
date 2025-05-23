
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CnpjFormValues } from '@/types/userProfileTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface BankingTabProps {
  form: UseFormReturn<CnpjFormValues>;
  onPrevious: () => void;
  loading: boolean;
}

const BankingTab: React.FC<BankingTabProps> = ({ form, onPrevious, loading }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Isso seria expandido para incluir campos para contas bancárias, 
            mas foi simplificado para este exemplo */}
        <FormField
          control={form.control}
          name="issues_invoices"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Empresa emite notas fiscais
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="invoice_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Nota Fiscal</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: NF-e, NFS-e" 
                  {...field} 
                  disabled={!form.watch('issues_invoices')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="current_accounting_info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Informações Contábeis Atuais</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Informações sobre contabilidade atual"
                  {...field}
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
          type="submit" 
          className="bg-brand-blue hover:bg-brand-blue/90 text-white"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Finalizar Cadastro"}
        </Button>
      </div>
    </div>
  );
};

export default BankingTab;
