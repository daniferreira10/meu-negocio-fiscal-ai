
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CpfFormValues, CnpjFormValues } from '@/types/userProfileTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Updated interface to use union type
interface OtherTabProps {
  form: UseFormReturn<CpfFormValues> | UseFormReturn<CnpjFormValues>;
  onSubmit: () => void;
  onPrevious: () => void;
  loading: boolean;
}

const OtherTab: React.FC<OtherTabProps> = ({ form, onSubmit, onPrevious, loading }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control as any}
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
          onClick={onSubmit}
        >
          {loading ? "Salvando..." : "Finalizar Cadastro"}
        </Button>
      </div>
    </div>
  );
};

export default OtherTab;
