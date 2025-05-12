
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';

interface LoginFormProps {
  isRegister?: boolean;
}

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

// Schema de validação para registro - usado pelo componente legacy
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

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const LoginForm = ({ isRegister = false }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form para login
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  // Form para registro (legado)
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    }
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    console.log("Login data:", data);
    
    try {
      // Simulação de autenticação - aqui você faria a integração com seu backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Verificar se o email existe (simulação)
      const emailExists = true; // Em uma aplicação real você verificaria isso no backend
      
      if (!emailExists) {
        toast.error("E-mail não encontrado. Verifique ou cadastre uma nova conta.");
        setLoading(false);
        return;
      }
      
      // Verificar se a senha está correta (simulação)
      const passwordCorrect = true; // Em uma aplicação real você verificaria isso no backend
      
      if (!passwordCorrect) {
        toast.error("Senha incorreta. Tente novamente.");
        setLoading(false);
        return;
      }
      
      toast.success("Login realizado com sucesso!");
      // Em uma aplicação real, você redirecionaria para o dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    console.log("Register data:", data);
    
    try {
      // Simulação de registro - aqui você faria a integração com seu backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Cadastro realizado com sucesso!");
      
      // Em uma aplicação real, você redirecionaria para o dashboard ou login
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error("Erro ao realizar cadastro. Tente novamente.");
      console.error("Erro no registro:", error);
    } finally {
      setLoading(false);
    }
  };

  // Usado apenas para o registro legado (isRegister = true)
  if (isRegister) {
    return (
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-brand-dark">
            Crie sua conta
          </h2>
          <p className="text-gray-600 mt-2">
            Comece a usar nossa contabilidade automatizada com IA
          </p>
        </div>

        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="exemplo@empresa.com.br" 
                        className="pl-10" 
                        {...field} 
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Mínimo 8 caracteres" 
                        className="pl-10 pr-10" 
                        {...field} 
                      />
                    </FormControl>
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormControl>
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Confirme sua senha" 
                        className="pl-10 pr-10" 
                        {...field} 
                      />
                    </FormControl>
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
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

            <Button
              type="submit"
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </>
              ) : "Criar Conta"}
            </Button>
          </form>
        </Form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Ao criar uma conta, você concorda com nossos{" "}
            <a href="#" className="text-brand-blue hover:underline">Termos de Serviço</a> e{" "}
            <a href="#" className="text-brand-blue hover:underline">Política de Privacidade</a>.
          </p>
        </div>
      </div>
    );
  }

  // Formulário de login (isRegister = false)
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-brand-dark">
          Entrar na sua conta
        </h2>
        <p className="text-gray-600 mt-2">
          Acesse sua contabilidade automatizada
        </p>
      </div>

      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <FormControl>
                    <Input 
                      placeholder="exemplo@empresa.com.br" 
                      className="pl-10" 
                      {...field} 
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <FormControl>
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Sua senha" 
                      className="pl-10 pr-10" 
                      {...field} 
                    />
                  </FormControl>
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
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

          <Button
            type="submit"
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </>
            ) : "Entrar"}
          </Button>
        </form>
      </Form>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Ao fazer login, você concorda com nossos{" "}
          <a href="#" className="text-brand-blue hover:underline">Termos de Serviço</a> e{" "}
          <a href="#" className="text-brand-blue hover:underline">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
