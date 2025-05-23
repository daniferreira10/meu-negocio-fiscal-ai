
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// Updated interface to use a more flexible type
interface OtherTabProps {
  form: UseFormReturn<any>; // Using 'any' to allow both form types
  onSubmit: () => void;
  onPrevious: () => void;
  loading: boolean;
}

const OtherTab: React.FC<OtherTabProps> = ({ form, onSubmit, onPrevious, loading }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="current_accounting_info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Informações Contábeis Atuais</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Informações sobre contabilidade atual"
                  className="min-h-[120px]"
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
