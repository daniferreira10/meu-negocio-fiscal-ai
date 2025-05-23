
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CpfFormValues } from '@/types/userProfileTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MaritalStatus } from '@/types/userProfileTypes';

export interface PersonalTabProps {
  form: UseFormReturn<CpfFormValues>;
  onNext: () => void;
  onPrevious: () => void;
}

const PersonalTab: React.FC<PersonalTabProps> = ({ form, onNext, onPrevious }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="000.000.000-00" {...field} />
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="marital_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado Civil</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={MaritalStatus.SINGLE}>Solteiro(a)</SelectItem>
                    <SelectItem value={MaritalStatus.MARRIED}>Casado(a)</SelectItem>
                    <SelectItem value={MaritalStatus.DIVORCED}>Divorciado(a)</SelectItem>
                    <SelectItem value={MaritalStatus.WIDOWED}>Viúvo(a)</SelectItem>
                    <SelectItem value={MaritalStatus.SEPARATED}>Separado(a)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profissão</FormLabel>
              <FormControl>
                <Input placeholder="Sua profissão" {...field} />
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

export default PersonalTab;
