
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccountTabProps } from "@/types/accountTabTypes";

const AccountTab = ({ form, onNext }: AccountTabProps) => {
  const handleNext = () => {
    // Validate just the fields in this tab
    const { email, password, confirmPassword } = form.getValues();
    
    // Check if fields are valid before proceeding
    if (email && password && confirmPassword && password === confirmPassword) {
      onNext();
    } else {
      // Trigger validation on these fields
      form.trigger(["email", "password", "confirmPassword"]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Informações de Conta</h3>
        <p className="text-sm text-gray-500">
          Crie suas credenciais de acesso à plataforma
        </p>
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="seu.email@exemplo.com"
                type="email"
                autoComplete="email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <Input
                placeholder="********"
                type="password"
                autoComplete="new-password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirmar Senha</FormLabel>
            <FormControl>
              <Input
                placeholder="********"
                type="password"
                autoComplete="new-password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end pt-4">
        <Button type="button" onClick={handleNext}>
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default AccountTab;
