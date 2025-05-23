
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CnpjFormValues, TaxRegime } from '@/types/userProfileTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TaxTabProps {
  form: UseFormReturn<CnpjFormValues>;
  onNext: () => void;
  onPrevious: () => void;
}

const TaxTab: React.FC<TaxTabProps> = ({ form, onNext, onPrevious }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="legal_nature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Natureza Jurídica</FormLabel>
              <FormControl>
                <Input placeholder="Ex: LTDA, S/A, MEI" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tax_regime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regime Tributário</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o regime tributário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={TaxRegime.SIMPLES_NACIONAL}>Simples Nacional</SelectItem>
                  <SelectItem value={TaxRegime.LUCRO_PRESUMIDO}>Lucro Presumido</SelectItem>
                  <SelectItem value={TaxRegime.LUCRO_REAL}>Lucro Real</SelectItem>
                  <SelectItem value={TaxRegime.MEI}>MEI</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cnae"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código CNAE</FormLabel>
              <FormControl>
                <Input placeholder="Código da atividade econômica" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tax_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Situação Fiscal</FormLabel>
              <FormControl>
                <Input placeholder="Status fiscal atual" {...field} />
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

export default TaxTab;
