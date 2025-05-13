
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
  FormControl,
  FormMessage
} from '@/components/ui/form';

import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';
import FormHeader from './FormHeader';
import FormFooter from './FormFooter';
import { loginUser } from '@/services/authService';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Schema de validação para login
const loginSchema = z.object({
  email: z.string()
    .email({ message: "E-mail inválido" })
    .min(1, { message: "E-mail é obrigatório" }),
  password: z.string()
    .min(1, { message: "Senha é obrigatória" }),
  rememberMe: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginFormContent = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
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
    setLoginError(null);
    console.log("Login data:", data);
    
    try {
      // Use the login service function with specific error handling
      const result = await loginUser(data.email, data.password, data.rememberMe || false);
      
      if (result.success) {
        toast.success(result.message);
        navigate('/dashboard');
      } else {
        // Display specific error message
        setLoginError(result.message);
      }
    } catch (error: any) {
      toast.error("Erro ao fazer login. Tente novamente.");
      console.error("Erro no login:", error);
      setLoginError("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
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

      {loginError && (
        <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200 text-red-800">
          <AlertCircle className="h-4 w-4 text-red-800" />
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}

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
