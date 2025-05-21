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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubmitButton from '../forms/SubmitButton';
import EmailInput from '../forms/EmailInput';
import PasswordInput from '../forms/PasswordInput';

// Importando o serviço de autenticação para registro
import { registerUser } from '@/services/authService';

interface CnpjRegistrationFormProps {
  onRegistrationComplete: () => void;
  onBack: () => void;
}

// Schema de validação para PJ
const cnpjSchema = z.object({
  email: z.string()
    .email({ message: "E-mail inválido" })
    .min(1, { message: "E-mail é obrigatório" }),
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  confirmPassword: z.string()
    .min(1, { message: "Confirme sua senha" }),
  companyName: z.string()
    .min(2, { message: "Nome da empresa deve ter pelo menos 2 caracteres" }),
  tradingName: z.string()
    .min(2, { message: "Nome fantasia deve ter pelo menos 2 caracteres" }),
  cnpj: z.string()
    .min(14, { message: "CNPJ deve ter 14 dígitos" })
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, { 
      message: "CNPJ deve estar no formato: 00.000.000/0001-00" 
    }),
  taxRegime: z.string({ required_error: "Selecione o regime tributário" }),
  companySize: z.string({ required_error: "Selecione o porte da empresa" }),
  activityArea: z.string({ required_error: "Selecione a área de atividade" }),
  foundingDate: z.string().optional(),
  address: z.string().min(5, { message: "Endereço deve ter pelo menos 5 caracteres" }),
  city: z.string().min(2, { message: "Cidade deve ter pelo menos 2 caracteres" }),
  state: z.string().min(2, { message: "Estado deve ter pelo menos 2 caracteres" }),
  zipCode: z.string().regex(/^\d{5}\-\d{3}$/, { message: "CEP deve estar no formato: 00000-000" }),
  phoneNumber: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
}).superRefine(({confirmPassword, password}, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não coincidem",
      path: ["confirmPassword"]
    });
  }
});

type CnpjFormValues = z.infer<typeof cnpjSchema>;

const CnpjRegistrationForm = ({ onRegistrationComplete, onBack }: CnpjRegistrationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [consultingCNPJ, setConsultingCNPJ] = useState(false);

  const form = useForm<CnpjFormValues>({
    resolver: zodResolver(cnpjSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      tradingName: "",
      cnpj: "",
      taxRegime: "",
      companySize: "",
      activityArea: "",
      foundingDate: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
    }
  });

  const onSubmit = async (data: CnpjFormValues) => {
    setLoading(true);
    console.log("Dados de PJ:", data);
    
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
        setActiveTab('company');
      }
    } else if (activeTab === 'company') {
      // Verificar validação dos campos da empresa antes de avançar
      const companyValid = form.trigger(['companyName', 'tradingName', 'cnpj', 'taxRegime', 'companySize', 'activityArea']);
      if (companyValid) {
        setActiveTab('address');
      }
    }
  };

  const handleConsultarCNPJ = async () => {
    const cnpj = form.getValues('cnpj');

    if (!cnpj) {
      toast.error("Por favor, digite um CNPJ válido.");
      return;
    }

    try {
      setConsultingCNPJ(true);
      
      // Import dynamically to avoid circular dependencies
      const { consultarCNPJ } = await import('@/utils/cnpjUtils');
      const data = await consultarCNPJ(cnpj);
      
      if (data) {
        form.setValue('companyName', data.nome);
        if (data.fantasia) {
          form.setValue('tradingName', data.fantasia);
        }
        
        // Define activity area based on primary activity
        if (data.atividade_principal && data.atividade_principal.length > 0) {
          const atividadeText = data.atividade_principal[0].text.toLowerCase();
          
          if (atividadeText.includes('comércio')) {
            form.setValue('activityArea', 'comercio');
          } else if (atividadeText.includes('serviço') || atividadeText.includes('servico')) {
            form.setValue('activityArea', 'servicos');
          } else if (atividadeText.includes('indústria') || atividadeText.includes('industria')) {
            form.setValue('activityArea', 'industria');
          } else if (atividadeText.includes('agro') || atividadeText.includes('agricultura')) {
            form.setValue('activityArea', 'agronegocio');
          } else if (atividadeText.includes('tecnologia') || atividadeText.includes('software')) {
            form.setValue('activityArea', 'tecnologia');
          } else {
            form.setValue('activityArea', 'outro');
          }
        }

        // Address data
        const endereco = [data.endereco, data.bairro].filter(Boolean).join(', ');
        if (endereco) {
          form.setValue('address', endereco);
        }
        
        if (data.municipio) {
          form.setValue('city', data.municipio);
        }
        
        if (data.uf) {
          form.setValue('state', data.uf);
        }
        
        if (data.cep) {
          const formattedCep = data.cep.replace(/[^\d]+/g, '');
          if (formattedCep.length === 8) {
            form.setValue('zipCode', `${formattedCep.substring(0, 5)}-${formattedCep.substring(5)}`);
          }
        }

        if (data.telefone) {
          form.setValue('phoneNumber', data.telefone);
        }

        // If we have company data, move to the company tab
        if (activeTab === 'account') {
          setActiveTab('company');
        }
        
        toast.success("Dados da empresa carregados com sucesso!");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao consultar CNPJ");
    } finally {
      setConsultingCNPJ(false);
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
        <h2 className="text-xl font-semibold">Cadastro de Pessoa Jurídica</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="account">Conta</TabsTrigger>
              <TabsTrigger value="company">Dados da Empresa</TabsTrigger>
              <TabsTrigger value="address">Endereço e Contato</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="space-y-6">
              <div className="space-y-4">
                <EmailInput
                  form={form}
                  name="email"
                  label="E-mail"
                  placeholder="contato@empresa.com.br"
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
            
            <TabsContent value="company" className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Razão Social</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite a razão social" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tradingName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Fantasia</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome fantasia" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ</FormLabel>
                      <div className="flex space-x-2">
                        <FormControl>
                          <Input placeholder="00.000.000/0001-00" {...field} />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handleConsultarCNPJ}
                          disabled={consultingCNPJ}
                          className="whitespace-nowrap"
                        >
                          {consultingCNPJ ? <Loader className="h-4 w-4 animate-spin" /> : "Consultar CNPJ"}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="taxRegime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regime Tributário</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="simples_nacional">Simples Nacional</SelectItem>
                            <SelectItem value="lucro_presumido">Lucro Presumido</SelectItem>
                            <SelectItem value="lucro_real">Lucro Real</SelectItem>
                            <SelectItem value="mei">MEI</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Porte da Empresa</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mei">MEI</SelectItem>
                            <SelectItem value="microempresa">Microempresa</SelectItem>
                            <SelectItem value="pequeno_porte">Empresa de Pequeno Porte</SelectItem>
                            <SelectItem value="medio_porte">Empresa de Médio Porte</SelectItem>
                            <SelectItem value="grande_porte">Empresa de Grande Porte</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="activityArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Área de Atividade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="comercio">Comércio</SelectItem>
                          <SelectItem value="servicos">Serviços</SelectItem>
                          <SelectItem value="industria">Indústria</SelectItem>
                          <SelectItem value="agronegocio">Agronegócio</SelectItem>
                          <SelectItem value="tecnologia">Tecnologia</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="foundingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Fundação</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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
            
            <TabsContent value="address" className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua, número, complemento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Cidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="UF" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AC">AC</SelectItem>
                            <SelectItem value="AL">AL</SelectItem>
                            <SelectItem value="AP">AP</SelectItem>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="BA">BA</SelectItem>
                            <SelectItem value="CE">CE</SelectItem>
                            <SelectItem value="DF">DF</SelectItem>
                            <SelectItem value="ES">ES</SelectItem>
                            <SelectItem value="GO">GO</SelectItem>
                            <SelectItem value="MA">MA</SelectItem>
                            <SelectItem value="MT">MT</SelectItem>
                            <SelectItem value="MS">MS</SelectItem>
                            <SelectItem value="MG">MG</SelectItem>
                            <SelectItem value="PA">PA</SelectItem>
                            <SelectItem value="PB">PB</SelectItem>
                            <SelectItem value="PR">PR</SelectItem>
                            <SelectItem value="PE">PE</SelectItem>
                            <SelectItem value="PI">PI</SelectItem>
                            <SelectItem value="RJ">RJ</SelectItem>
                            <SelectItem value="RN">RN</SelectItem>
                            <SelectItem value="RS">RS</SelectItem>
                            <SelectItem value="RO">RO</SelectItem>
                            <SelectItem value="RR">RR</SelectItem>
                            <SelectItem value="SC">SC</SelectItem>
                            <SelectItem value="SP">SP</SelectItem>
                            <SelectItem value="SE">SE</SelectItem>
                            <SelectItem value="TO">TO</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input placeholder="00000-000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phoneNumber"
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
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setActiveTab('company')}
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

export default CnpjRegistrationForm;
