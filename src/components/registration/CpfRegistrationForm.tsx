
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
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubmitButton from '../forms/SubmitButton';
import EmailInput from '../forms/EmailInput';
import PasswordInput from '../forms/PasswordInput';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { savePhysicalPersonProfile } from '@/services/userProfileService';
import { registerUser } from '@/services/authService';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CpfRegistrationFormProps {
  onRegistrationComplete: () => void;
  onBack: () => void;
}

// Schema de validação para PF completa
const cpfSchema = z.object({
  // Dados de conta
  email: z.string()
    .email({ message: "E-mail inválido" })
    .min(1, { message: "E-mail é obrigatório" }),
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  confirmPassword: z.string()
    .min(1, { message: "Confirme sua senha" }),
  
  // Dados pessoais
  full_name: z.string()
    .min(3, { message: "Nome completo deve ter pelo menos 3 caracteres" }),
  phone: z.string()
    .min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  birth_date: z.string()
    .min(1, { message: "Data de nascimento é obrigatória" }),
  cpf: z.string()
    .min(11, { message: "CPF deve ter 11 dígitos" }),
  marital_status: z.string({ required_error: "Estado civil é obrigatório" }),
  dependents_count: z.coerce.number()
    .int({ message: "Deve ser um número inteiro" })
    .min(0, { message: "Não pode ser negativo" }),
  
  // Endereço
  address_street: z.string()
    .min(3, { message: "Rua é obrigatória" }),
  address_number: z.string()
    .min(1, { message: "Número é obrigatório" }),
  address_neighborhood: z.string()
    .min(3, { message: "Bairro é obrigatório" }),
  address_city: z.string()
    .min(3, { message: "Cidade é obrigatória" }),
  address_state: z.string()
    .min(2, { message: "Estado é obrigatório" }),
  address_zipcode: z.string()
    .min(8, { message: "CEP deve ter 8 dígitos" }),
  
  // Dados financeiros
  profession: z.string()
    .min(3, { message: "Profissão é obrigatória" }),
  monthly_income: z.coerce.number()
    .min(0, { message: "Renda não pode ser negativa" }),
  monthly_expenses: z.coerce.number()
    .min(0, { message: "Despesas não podem ser negativas" }),
  
  // Patrimônio
  assets: z.array(z.object({
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    value: z.coerce.number().min(0, { message: "Valor não pode ser negativo" })
  })).default([]),
  
  // Dívidas
  debts: z.array(z.object({
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    value: z.coerce.number().min(0, { message: "Valor não pode ser negativo" })
  })).default([]),
  
  // Outras informações
  other_income_sources: z.string().optional(),
  main_bank_account: z.string().min(1, { message: "Informações bancárias são obrigatórias" }),
  tax_return_info: z.string().optional()
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
      // Dados de conta
      email: "",
      password: "",
      confirmPassword: "",
      
      // Dados pessoais
      full_name: "",
      phone: "",
      birth_date: "",
      cpf: "",
      marital_status: "solteiro",
      dependents_count: 0,
      
      // Endereço
      address_street: "",
      address_number: "",
      address_neighborhood: "",
      address_city: "",
      address_state: "",
      address_zipcode: "",
      
      // Dados financeiros
      profession: "",
      monthly_income: 0,
      monthly_expenses: 0,
      
      // Patrimônio e dívidas
      assets: [],
      debts: [],
      
      // Outras informações
      other_income_sources: "",
      main_bank_account: "",
      tax_return_info: ""
    }
  });

  const onSubmit = async (data: CpfFormValues) => {
    setLoading(true);
    console.log("Dados de PF:", data);
    
    try {
      // 1. Registrar usuário com email e senha
      const success = await registerUser(data.email, data.password);
      
      if (success) {
        // 2. Salvar perfil completo
        const profileData = {
          user_id: "", // preenchido no backend pelo currentUser
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          birth_date: data.birth_date,
          cpf: data.cpf,
          address_street: data.address_street,
          address_number: data.address_number,
          address_neighborhood: data.address_neighborhood,
          address_city: data.address_city,
          address_state: data.address_state,
          address_zipcode: data.address_zipcode,
          marital_status: data.marital_status,
          dependents_count: data.dependents_count,
          profession: data.profession,
          monthly_income: data.monthly_income,
          monthly_expenses: data.monthly_expenses,
          assets: data.assets,
          debts: data.debts,
          other_income_sources: data.other_income_sources || "",
          main_bank_account: data.main_bank_account,
          tax_return_info: data.tax_return_info || ""
        };
        
        const savedProfile = await savePhysicalPersonProfile(profileData);
        
        if (savedProfile) {
          toast.success("Cadastro realizado com sucesso!");
          onRegistrationComplete();
        } else {
          toast.error("Erro ao salvar perfil. Tente novamente.");
        }
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

  // Funções para adicionar/remover patrimônios e dívidas
  const addAsset = () => {
    const currentAssets = form.getValues().assets;
    form.setValue('assets', [...currentAssets, { description: '', value: 0 }]);
  };

  const removeAsset = (index: number) => {
    const currentAssets = form.getValues().assets;
    form.setValue('assets', currentAssets.filter((_, i) => i !== index));
  };

  const addDebt = () => {
    const currentDebts = form.getValues().debts;
    form.setValue('debts', [...currentDebts, { description: '', value: 0 }]);
  };

  const removeDebt = (index: number) => {
    const currentDebts = form.getValues().debts;
    form.setValue('debts', currentDebts.filter((_, i) => i !== index));
  };

  const handleNextTab = () => {
    if (activeTab === 'account') {
      // Verificar campos da conta
      form.trigger(['email', 'password', 'confirmPassword']).then(isValid => {
        if (isValid) setActiveTab('personal');
      });
    } else if (activeTab === 'personal') {
      // Verificar campos pessoais
      form.trigger(['full_name', 'cpf', 'phone', 'birth_date', 'marital_status']).then(isValid => {
        if (isValid) setActiveTab('address');
      });
    } else if (activeTab === 'address') {
      // Verificar campos de endereço
      form.trigger(['address_street', 'address_number', 'address_city', 'address_state', 'address_zipcode']).then(isValid => {
        if (isValid) setActiveTab('financial');
      });
    } else if (activeTab === 'financial') {
      // Verificar campos financeiros
      form.trigger(['profession', 'monthly_income']).then(isValid => {
        if (isValid) setActiveTab('assets');
      });
    } else if (activeTab === 'assets') {
      // Verificar patrimônio
      const assets = form.getValues().assets;
      let isValid = true;
      
      // Validar cada patrimônio
      for (let i = 0; i < assets.length; i++) {
        if (!assets[i].description || assets[i].value < 0) {
          isValid = false;
          break;
        }
      }
      
      if (isValid) {
        setActiveTab('other');
      } else {
        toast.error("Verifique os dados de patrimônio");
      }
    }
  };

  const handlePreviousTab = () => {
    if (activeTab === 'personal') {
      setActiveTab('account');
    } else if (activeTab === 'address') {
      setActiveTab('personal');
    } else if (activeTab === 'financial') {
      setActiveTab('address');
    } else if (activeTab === 'assets') {
      setActiveTab('financial');
    } else if (activeTab === 'other') {
      setActiveTab('assets');
    }
  };

  // Formatação de valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
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
      
      <ScrollArea className="h-[70vh] pr-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-6 mb-6">
                <TabsTrigger value="account">Conta</TabsTrigger>
                <TabsTrigger value="personal">Pessoal</TabsTrigger>
                <TabsTrigger value="address">Endereço</TabsTrigger>
                <TabsTrigger value="financial">Financeiro</TabsTrigger>
                <TabsTrigger value="assets">Patrimônio</TabsTrigger>
                <TabsTrigger value="other">Outros</TabsTrigger>
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
                          <FormControl>
                            <Input 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="Confirme sua senha" 
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
                    name="full_name"
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione seu estado civil" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                            <SelectItem value="casado">Casado(a)</SelectItem>
                            <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                            <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                            <SelectItem value="uniao_estavel">União Estável</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dependents_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Dependentes</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
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
                    onClick={handlePreviousTab}
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
                    name="address_street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rua/Avenida</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome da rua" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input placeholder="Número" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address_neighborhood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bairro</FormLabel>
                          <FormControl>
                            <Input placeholder="Bairro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address_city"
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
                      name="address_state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="UF" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="AC">AC</SelectItem>
                              <SelectItem value="AL">AL</SelectItem>
                              <SelectItem value="AM">AM</SelectItem>
                              <SelectItem value="AP">AP</SelectItem>
                              <SelectItem value="BA">BA</SelectItem>
                              <SelectItem value="CE">CE</SelectItem>
                              <SelectItem value="DF">DF</SelectItem>
                              <SelectItem value="ES">ES</SelectItem>
                              <SelectItem value="GO">GO</SelectItem>
                              <SelectItem value="MA">MA</SelectItem>
                              <SelectItem value="MG">MG</SelectItem>
                              <SelectItem value="MS">MS</SelectItem>
                              <SelectItem value="MT">MT</SelectItem>
                              <SelectItem value="PA">PA</SelectItem>
                              <SelectItem value="PB">PB</SelectItem>
                              <SelectItem value="PE">PE</SelectItem>
                              <SelectItem value="PI">PI</SelectItem>
                              <SelectItem value="PR">PR</SelectItem>
                              <SelectItem value="RJ">RJ</SelectItem>
                              <SelectItem value="RN">RN</SelectItem>
                              <SelectItem value="RO">RO</SelectItem>
                              <SelectItem value="RR">RR</SelectItem>
                              <SelectItem value="RS">RS</SelectItem>
                              <SelectItem value="SC">SC</SelectItem>
                              <SelectItem value="SE">SE</SelectItem>
                              <SelectItem value="SP">SP</SelectItem>
                              <SelectItem value="TO">TO</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address_zipcode"
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
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handlePreviousTab}
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
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profissão/Ocupação Principal</FormLabel>
                        <FormControl>
                          <Input placeholder="Sua profissão atual" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="monthly_income"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Renda Mensal Bruta (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0,00" 
                            min="0" 
                            step="0.01" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Valor total antes dos descontos
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="monthly_expenses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Despesas Mensais Médias (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0,00" 
                            min="0" 
                            step="0.01" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Estimativa de gastos mensais fixos
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="other_income_sources"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Outras Fontes de Renda</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Aluguel, investimentos, etc." 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Descreva outras fontes de renda, se aplicável
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handlePreviousTab}
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
              
              <TabsContent value="assets" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Patrimônio</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Liste seus bens como imóveis, veículos e investimentos
                    </p>
                    
                    {form.getValues().assets.map((_, index) => (
                      <Card key={index} className="mb-4">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Item {index + 1}</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAsset(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`assets.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Descrição</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Apto, carro, investimento..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name={`assets.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Valor (R$)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      placeholder="0,00" 
                                      min="0" 
                                      step="0.01" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addAsset}
                      className="w-full mt-2"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar Item
                    </Button>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-2">Dívidas</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Liste seus financiamentos e empréstimos
                    </p>
                    
                    {form.getValues().debts.map((_, index) => (
                      <Card key={index} className="mb-4">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Dívida {index + 1}</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDebt(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`debts.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Descrição</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Financiamento, empréstimo..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name={`debts.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Valor (R$)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      placeholder="0,00" 
                                      min="0" 
                                      step="0.01" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addDebt}
                      className="w-full mt-2"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar Dívida
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handlePreviousTab}
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
              
              <TabsContent value="other" className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="main_bank_account"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conta Bancária Principal</FormLabel>
                        <FormControl>
                          <Input placeholder="Banco, tipo e número da conta" {...field} />
                        </FormControl>
                        <FormDescription>
                          Exemplo: Banco XYZ, Conta Corrente nº 12345-6
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tax_return_info"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Informações de Declaração de Imposto de Renda</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Detalhe sua situação com o Imposto de Renda" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Exemplo: Declarante, isento, última declaração em 2024
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handlePreviousTab}
                  >
                    Voltar
                  </Button>
                  <SubmitButton loading={loading} text="Finalizar Cadastro" />
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
};

export default CpfRegistrationForm;
