
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import EmailInput from '@/components/forms/EmailInput';
import PasswordInput from '@/components/forms/PasswordInput';
import SubmitButton from '@/components/forms/SubmitButton';

export interface RegisterFormContentProps {
  accountType: 'cpf' | 'cnpj';
  onSubmit: () => void;
}

const registerSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterFormContent: React.FC<RegisterFormContentProps> = ({ onSubmit }) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleSubmit = (values: RegisterFormValues) => {
    console.log('Form values:', values);
    onSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <EmailInput
          control={form.control}
          name="email"
          label="E-mail"
          placeholder="Seu e-mail"
        />
        <PasswordInput
          control={form.control}
          name="password"
          label="Senha"
          placeholder="Crie sua senha"
        />
        <PasswordInput
          control={form.control}
          name="confirmPassword"
          label="Confirme sua senha"
          placeholder="Digite sua senha novamente"
        />
        <SubmitButton text="Continuar" className="w-full" />
      </form>
    </Form>
  );
};

export default RegisterFormContent;
