
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CnpjFormValues } from '@/types/userProfileTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CompanyTabProps {
  form: UseFormReturn<CnpjFormValues>;
  onNext: () => void;
  onPrevious: () => void;
}

const CompanyTab: React.FC<CompanyTabProps> = ({ form, onNext, onPrevious }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razão Social</FormLabel>
              <FormControl>
                <Input placeholder="Razão Social da empresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="trading_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Fantasia</FormLabel>
              <FormControl>
                <Input placeholder="Nome Fantasia (opcional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <Input placeholder="00.000.000/0001-00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="founding_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Fundação</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="legal_representative"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Representante Legal</FormLabel>
              <FormControl>
                <Input placeholder="Nome do representante legal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="(00) 00000-0000" {...field} />
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

export default CompanyTab;
