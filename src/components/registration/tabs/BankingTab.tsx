
import React, { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { CnpjFormValues } from '@/types/userProfileTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface BankingTabProps {
  form: UseFormReturn<CnpjFormValues>;
  onPrevious: () => void;
  loading: boolean;
}

const BankingTab: React.FC<BankingTabProps> = ({ form, onPrevious, loading }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "bank_accounts"
  });
  
  const addBankAccount = () => {
    append({ bank_name: '', account_type: '', account_number: '' });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Contas Bancárias</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={addBankAccount}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Conta
          </Button>
        </div>
        
        {fields.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            Nenhuma conta bancária adicionada.
          </div>
        ) : (
          fields.map((field, index) => (
            <Card key={field.id} className="mb-4">
              <CardContent className="pt-6">
                <div className="flex justify-between mb-4">
                  <h4 className="font-medium">Conta {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name={`bank_accounts.${index}.bank_name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Banco</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nome do banco" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`bank_accounts.${index}.account_type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Conta</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Corrente, Poupança, etc." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`bank_accounts.${index}.account_number`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número da Conta</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Número da conta" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
        
        <FormField
          control={form.control}
          name="current_accounting_info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Informações Contábeis Atuais</FormLabel>
              <FormControl>
                <Input
                  placeholder="Informações sobre contabilidade atual (opcional)"
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
