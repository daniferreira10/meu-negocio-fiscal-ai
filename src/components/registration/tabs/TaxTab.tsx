
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CnpjFormValues } from '@/types/userProfileTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface TaxTabProps {
  form: UseFormReturn<CnpjFormValues>;
  onNext: () => void;
  onBack: () => void;
}

const TaxTab: React.FC<TaxTabProps> = ({ form, onNext, onBack }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="legal_nature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Natureza Jurídica</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a natureza jurídica" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sociedade_limitada">Sociedade Limitada (LTDA)</SelectItem>
                  <SelectItem value="empresario_individual">Empresário Individual (EI)</SelectItem>
                  <SelectItem value="empresa_individual">Empresa Individual (EIRELI)</SelectItem>
                  <SelectItem value="sociedade_anonima">Sociedade Anônima (S.A.)</SelectItem>
                  <SelectItem value="mei">Microempreendedor Individual (MEI)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Natureza jurídica conforme registro na Receita Federal
              </FormDescription>
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
                  <SelectItem value="simples_nacional">Simples Nacional</SelectItem>
                  <SelectItem value="lucro_presumido">Lucro Presumido</SelectItem>
                  <SelectItem value="lucro_real">Lucro Real</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Regime tributário atual da empresa
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="activity_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNAE Principal</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 6201-5/01" {...field} />
              </FormControl>
              <FormDescription>
                Código Nacional de Atividade Econômica principal
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
          onClick={onBack}
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
