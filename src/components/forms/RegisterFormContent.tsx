
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl
} from '@/components/ui/form';

import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';
import FormHeader from './FormHeader';
import FormFooter from './FormFooter';
import { registerUser } from '@/services/authService';

// Schema de validação para registro
const registerSchema = z.object({
  email: z.string()
    .email({ message: "E-mail inválido" })
    .min(1, { message: "E-mail é obrigatório" }),
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: "A senha deve incluir letras e números" }),
  confirmPassword: z.string()
    .min(1, { message: "Confirmar senha é obrigatório" }),
  acceptTerms: z.boolean()
    .refine(val => val === true, { message: "Você precisa aceitar os termos para continuar" })
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterFormContent = () => {
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Form para registro
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    }
  });

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    console.log("Register data:", data);
    
    try {
      // Use the register service function
      await registerUser(data.email, data.password);
      toast.success("Cadastro realizado com sucesso!");
      navigate('/dashboard');
    } catch (error: any) {
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
        toast.error("Este e-mail já está cadastrado. Tente fazer login.");
      } else {
        toast.error("Erro ao realizar cadastro. Tente novamente.");
        console.error("Erro no registro:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FormHeader 
        title="Crie sua conta"
        subtitle="Comece a usar nossa contabilidade automatizada com IA"
      />

      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
          <EmailInput 
            form={registerForm}
            name="email"
            label="E-mail"
            placeholder="exemplo@empresa.com.br"
          />

          <PasswordInput 
            form={registerForm}
            name="password"
            label="Senha"
            placeholder="Mínimo 8 caracteres"
          />

          <FormField
            control={registerForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <FormControl>
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder="Confirme sua senha" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 pr-10"
                      {...field} 
                    />
                  </FormControl>
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? (
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={registerForm.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Li e concordo com os <a href="#" className="text-brand-blue hover:underline">Termos de Serviço</a> e <a href="#" className="text-brand-blue hover:underline">Política de Privacidade</a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <SubmitButton loading={loading} text="Criar Conta" />
        </form>
      </Form>

      <FormFooter text="Ao criar uma conta, você concorda com nossos Termos de Serviço e Política de Privacidade." />
    </div>
  );
};

export default RegisterFormContent;
