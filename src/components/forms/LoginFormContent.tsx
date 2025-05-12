
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  FormControl
} from '@/components/ui/form';

import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';
import FormHeader from './FormHeader';
import FormFooter from './FormFooter';
import { loginUser } from '@/services/authService';

// Schema de validação para login
const loginSchema = z.object({
  email: z.string()
    .email({ message: "E-mail inválido" })
    .min(1, { message: "E-mail é obrigatório" }),
  password: z.string()
    .min(1, { message: "Senha é obrigatória" })
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  rememberMe: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginFormContent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form para login
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    console.log("Login data:", data);
    
    try {
      // Use the login service function
      const success = await loginUser(data.email, data.password, data.rememberMe || false);
      
      if (success) {
        toast.success("Login realizado com sucesso!");
        navigate('/dashboard');
      }
    } catch (error: any) {
      if (error.message === 'USER_NOT_FOUND') {
        toast.error("E-mail não encontrado. Verifique ou cadastre uma nova conta.");
      } else if (error.message === 'INVALID_PASSWORD') {
        toast.error("Senha incorreta. Tente novamente.");
      } else {
        toast.error("Erro ao fazer login. Tente novamente.");
      }
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FormHeader 
        title="Entrar na sua conta"
        subtitle="Acesse sua contabilidade automatizada"
      />

      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
          <EmailInput 
            form={loginForm}
            name="email"
            label="E-mail"
            placeholder="exemplo@empresa.com.br"
          />

          <PasswordInput 
            form={loginForm}
            name="password"
            label="Senha"
            placeholder="Sua senha"
          />

          <div className="flex items-center justify-between">
            <FormField
              control={loginForm.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm">
                      Lembrar-me
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Link to="/forgot-password" className="text-sm text-brand-blue hover:underline">
              Esqueceu sua senha?
            </Link>
          </div>

          <SubmitButton loading={loading} text="Entrar" />
        </form>
      </Form>

      <FormFooter />
    </div>
  );
};

export default LoginFormContent;
