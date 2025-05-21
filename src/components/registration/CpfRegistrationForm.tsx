
import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubmitButton from '../forms/SubmitButton';
import EmailInput from '../forms/EmailInput';
import PasswordInput from '../forms/PasswordInput';

// Importando o serviço de autenticação para registro
import { registerUser } from '@/services/authService';

interface CpfRegistrationFormProps {
  onRegistrationComplete: () => void;
  onBack: () => void;
}

// Schema de validação para PF
const cpfSchema = z.object({
  email: z.string()
    .email({ message: "E-mail inválido" })
    .min(1, { message: "E-mail é obrigatório" }),
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  confirmPassword: z.string()
    .min(1, { message: "Confirme sua senha" }),
  fullName: z.string()
    .min(3, { message: "Nome completo deve ter pelo menos 3 caracteres" }),
  cpf: z.string()
    .min(11, { message: "CPF deve ter 11 dígitos" })
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { 
      message: "CPF deve estar no formato: 000.000.000-00" 
    }),
  monthlyIncome: z.string().optional(),
  monthlyExpenses: z.string().optional(),
  dependents: z.array(z.object({
    name: z.string(),
    relationship: z.string(),
    birthdate: z.string()
  })).default([]),
  assets: z.array(z.object({
    description: z.string(),
    value: z.string()
  })).default([]),
  debts: z.array(z.object({
    description: z.string(),
    value: z.string()
  })).default([]),
  educationExpenses: z.string().optional(),
  healthExpenses: z.string().optional(),
  privateRetirement: z.string().optional()
}).superRefine(({confirmPassword, password}, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não coincidem",
      path: ["confirmPassword"]
    });
  }
});

type CpfFormValues = z.infer<typeof cpfSchema>;

const CpfRegistrationForm = ({ onRegistrationComplete, onBack }: CpfRegistrationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<CpfFormValues>({
    resolver: zodResolver(cpfSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      cpf: "",
      monthlyIncome: "",
      monthlyExpenses: "",
      dependents: [],
      assets: [],
      debts: [],
      educationExpenses: "",
      healthExpenses: "",
      privateRetirement: ""
    }
  });

  const onSubmit = async (data: CpfFormValues) => {
    setLoading(true);
    console.log("Dados de PF:", data);
    
    try {
      // Registrar usuário com email e senha
      const success = await registerUser(data.email, data.password);
      
      if (success) {
        toast.success("Cadastro realizado com sucesso!");
        onRegistrationComplete();
      }
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
        toast.error("Este e-mail já está em uso. Tente outro ou faça login.");
      } else {
        toast.error("Erro ao criar conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNextTab = () => {
    if (activeTab === 'account') {
      // Verificar validação dos campos da conta antes de avançar
      const accountValid = form.trigger(['email', 'password', 'confirmPassword']);
      if (accountValid) {
        setActiveTab('personal');
      }
    } else if (activeTab === 'personal') {
      // Verificar validação dos campos pessoais antes de avançar
      const personalValid = form.trigger(['fullName', 'cpf']);
      if (personalValid) {
        setActiveTab('financial');
      }
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2 p-0 h-8 w-8"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">Cadastro de Pessoa Física</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="account">Conta</TabsTrigger>
              <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="financial">Dados Financeiros</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="space-y-6">
              <div className="space-y-4">
                <EmailInput
                  form={form}
                  name="email"
                  label="E-mail"
                  placeholder="seu@email.com"
                />
                
                <PasswordInput
                  form={form}
                  name="password"
                  label="Senha"
                  placeholder="Mínimo 8 caracteres"
                />
                
                <FormField
                  control={form.control}
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
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-10"
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
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  type="button" 
                  onClick={handleNextTab}
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                >
                  Próximo
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="personal" className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setActiveTab('account')}
                >
                  Voltar
                </Button>
                <Button 
                  type="button" 
                  onClick={handleNextTab}
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                >
                  Próximo
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="financial" className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="monthlyIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Renda Mensal</FormLabel>
                      <FormControl>
                        <Input placeholder="Renda mensal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="monthlyExpenses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Despesas Mensais</FormLabel>
                      <FormControl>
                        <Input placeholder="Despesas mensais" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="educationExpenses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gastos com Educação</FormLabel>
                        <FormControl>
                          <Input placeholder="Gastos anuais" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="healthExpenses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gastos com Saúde</FormLabel>
                        <FormControl>
                          <Input placeholder="Gastos anuais" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setActiveTab('personal')}
                >
                  Voltar
                </Button>
                <SubmitButton loading={loading} text="Finalizar Cadastro" />
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default CpfRegistrationForm;
