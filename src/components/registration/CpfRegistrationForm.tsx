
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import {
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group';
import { 
  UserIcon, 
  IdCardIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon,
  BriefcaseIcon,
  BanknoteIcon,
  KeyIcon,
  HomeIcon
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

// Validação de CPF
const validateCPF = (cpf: string) => {
  // Remove non-numeric characters
  cpf = cpf.replace(/[^\d]/g, '');
  
  // Check if it has 11 digits
  if (cpf.length !== 11) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cpf)) return false;
  
  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;
  
  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;
  
  return true;
};

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const cpfFormSchema = z.object({
  // Dados pessoais
  fullName: z.string().min(3, { message: "Nome completo deve ter pelo menos 3 caracteres." }),
  cpf: z.string()
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { message: "CPF deve estar no formato: 000.000.000-00" })
    .refine((cpf) => validateCPF(cpf), { message: "CPF inválido." }),
  email: z.string().email({ message: "E-mail inválido." }),
  phone: z.string()
    .regex(/^\(\d{2}\)\s\d{5}\-\d{4}$/, { message: "Telefone deve estar no formato: (00) 00000-0000" }),
  
  // Endereço
  address: z.string().min(5, { message: "Endereço deve ter pelo menos 5 caracteres." }),
  city: z.string().min(2, { message: "Cidade deve ter pelo menos 2 caracteres." }),
  state: z.string().min(2, { message: "Estado é obrigatório." }),
  zipCode: z.string()
    .regex(/^\d{5}-\d{3}$/, { message: "CEP deve estar no formato: 00000-000" }),
  
  // Dados financeiros e ocupacionais
  occupation: z.string().min(2, { message: "Ocupação é obrigatória." }),
  monthlyIncome: z.string().min(1, { message: "Renda mensal é obrigatória." }),
  otherIncome: z.string().optional(),
  healthExpenses: z.string().optional(),
  educationExpenses: z.string().optional(),
  dependents: z.array(
    z.object({
      name: z.string().min(3, { message: "Nome completo do dependente é obrigatório." }),
      cpf: z.string()
        .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { message: "CPF deve estar no formato: 000.000.000-00" })
        .refine((cpf) => validateCPF(cpf), { message: "CPF inválido." }).optional(),
      age: z.string().min(1, { message: "Idade é obrigatória." }).optional(),
    })
  ).default([]),
  socialSecurity: z.string().optional(),
  assets: z.string().optional(),
  debts: z.string().optional(),
  taxFreeIncome: z.string().optional(),
  
  // Dados profissionais (opcional)
  tradeName: z.string().optional(),
  businessArea: z.string().optional(),
  
  // Acesso
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: "A senha deve incluir letras e números." }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, { message: "Você precisa aceitar os termos para continuar." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

type CpfFormValues = z.infer<typeof cpfFormSchema>;

interface CpfRegistrationFormProps {
  onRegistrationComplete: () => void;
  onBack: () => void;
}

const CpfRegistrationForm = ({ onRegistrationComplete, onBack }: CpfRegistrationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [saveAndContinueLater, setSaveAndContinueLater] = useState(false);

  const form = useForm<CpfFormValues>({
    resolver: zodResolver(cpfFormSchema),
    defaultValues: {
      fullName: "",
      cpf: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      occupation: "",
      monthlyIncome: "",
      otherIncome: "",
      healthExpenses: "",
      educationExpenses: "",
      dependents: [],
      socialSecurity: "",
      assets: "",
      debts: "",
      taxFreeIncome: "",
      tradeName: "",
      businessArea: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    }
  });

  // Formatadores para campos monetários
  const formatAndSetCurrencyValue = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value) {
      value = (parseInt(value) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }
    onChange(value);
  };

  const onSubmit = async (data: CpfFormValues) => {
    setLoading(true);
    console.log("Dados de registro CPF:", data);
    
    try {
      // Simulação de API - aqui você faria a integração com seu backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (saveAndContinueLater) {
        toast.success("Dados salvos com sucesso! Você poderá continuar o cadastro mais tarde.");
        // Aqui você salvaria os dados parciais
      } else {
        toast.success("Cadastro realizado com sucesso!");
        onRegistrationComplete();
      }
    } catch (error) {
      toast.error("Erro ao realizar cadastro. Tente novamente.");
      console.error("Erro no cadastro:", error);
    } finally {
      setLoading(false);
    }
  };

  const addDependentField = () => {
    const currentDependents = form.getValues("dependents") || [];
    form.setValue("dependents", [...currentDependents, { name: "", cpf: "", age: "" }]);
  };

  const removeDependentField = (index: number) => {
    const currentDependents = form.getValues("dependents") || [];
    form.setValue(
      "dependents",
      currentDependents.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-brand-dark">Cadastro de Pessoa Física</h2>
        <p className="text-gray-600 mt-2">Preencha seus dados pessoais para criar sua conta</p>
      </div>
      
      <Button 
        variant="outline" 
        onClick={onBack} 
        className="mb-4"
        type="button"
      >
        ← Voltar para seleção de tipo
      </Button>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Dados Pessoais */}
          <Accordion type="single" collapsible defaultValue="personal">
            <AccordionItem value="personal">
              <AccordionTrigger className="text-lg font-semibold text-brand-dark">
                Dados Pessoais
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {/* Nome Completo */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Nome Completo</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <UserIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input placeholder="Seu nome completo" className="pl-10" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* CPF */}
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <IdCardIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input placeholder="000.000.000-00" className="pl-10" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MailIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input type="email" placeholder="seu.email@exemplo.com" className="pl-10" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Telefone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <PhoneIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input placeholder="(00) 00000-0000" className="pl-10" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Ocupação */}
                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Ocupação</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione sua ocupação" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Empregado CLT">Empregado CLT</SelectItem>
                            <SelectItem value="Autônomo">Autônomo</SelectItem>
                            <SelectItem value="Empresário">Empresário</SelectItem>
                            <SelectItem value="Servidor Público">Servidor Público</SelectItem>
                            <SelectItem value="Aposentado">Aposentado</SelectItem>
                            <SelectItem value="Investidor">Investidor</SelectItem>
                            <SelectItem value="Estudante">Estudante</SelectItem>
                            <SelectItem value="Outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Endereço */}
            <AccordionItem value="address">
              <AccordionTrigger className="text-lg font-semibold text-brand-dark">
                Endereço
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {/* Endereço */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Endereço</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MapPinIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input placeholder="Rua, número, complemento" className="pl-10" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Cidade */}
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Sua cidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Estado */}
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AC">Acre</SelectItem>
                            <SelectItem value="AL">Alagoas</SelectItem>
                            <SelectItem value="AP">Amapá</SelectItem>
                            <SelectItem value="AM">Amazonas</SelectItem>
                            <SelectItem value="BA">Bahia</SelectItem>
                            <SelectItem value="CE">Ceará</SelectItem>
                            <SelectItem value="DF">Distrito Federal</SelectItem>
                            <SelectItem value="ES">Espírito Santo</SelectItem>
                            <SelectItem value="GO">Goiás</SelectItem>
                            <SelectItem value="MA">Maranhão</SelectItem>
                            <SelectItem value="MT">Mato Grosso</SelectItem>
                            <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            <SelectItem value="PA">Pará</SelectItem>
                            <SelectItem value="PB">Paraíba</SelectItem>
                            <SelectItem value="PR">Paraná</SelectItem>
                            <SelectItem value="PE">Pernambuco</SelectItem>
                            <SelectItem value="PI">Piauí</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                            <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                            <SelectItem value="RO">Rondônia</SelectItem>
                            <SelectItem value="RR">Roraima</SelectItem>
                            <SelectItem value="SC">Santa Catarina</SelectItem>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="SE">Sergipe</SelectItem>
                            <SelectItem value="TO">Tocantins</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* CEP */}
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
              </AccordionContent>
            </AccordionItem>
            
            {/* Dados Financeiros */}
            <AccordionItem value="financial">
              <AccordionTrigger className="text-lg font-semibold text-brand-dark">
                Dados Financeiros
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {/* Renda Mensal */}
                  <FormField
                    control={form.control}
                    name="monthlyIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Renda Mensal Total</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BanknoteIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="R$ 0,00" 
                              className="pl-10" 
                              onChange={(e) => formatAndSetCurrencyValue(e, field.onChange)}
                              value={field.value}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Outras fontes de renda */}
                  <FormField
                    control={form.control}
                    name="otherIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Outras Fontes de Renda</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BanknoteIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="R$ 0,00" 
                              className="pl-10"
                              onChange={(e) => formatAndSetCurrencyValue(e, field.onChange)}
                              value={field.value}
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Aluguéis, dividendos, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gastos com Saúde */}
                  <FormField
                    control={form.control}
                    name="healthExpenses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gastos Anuais com Saúde</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BanknoteIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="R$ 0,00" 
                              className="pl-10"
                              onChange={(e) => formatAndSetCurrencyValue(e, field.onChange)}
                              value={field.value}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gastos com Educação */}
                  <FormField
                    control={form.control}
                    name="educationExpenses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gastos Anuais com Educação</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BanknoteIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="R$ 0,00" 
                              className="pl-10"
                              onChange={(e) => formatAndSetCurrencyValue(e, field.onChange)}
                              value={field.value}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Previdência */}
                  <FormField
                    control={form.control}
                    name="socialSecurity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gastos com Previdência (INSS ou Privada)</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BanknoteIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="R$ 0,00" 
                              className="pl-10"
                              onChange={(e) => formatAndSetCurrencyValue(e, field.onChange)}
                              value={field.value}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Bens */}
                  <FormField
                    control={form.control}
                    name="assets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Total de Bens em Nome Próprio</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <HomeIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="R$ 0,00" 
                              className="pl-10"
                              onChange={(e) => formatAndSetCurrencyValue(e, field.onChange)}
                              value={field.value}
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Imóveis, veículos, aplicações financeiras
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dívidas */}
                  <FormField
                    control={form.control}
                    name="debts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Total de Dívidas Ativas</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BanknoteIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="R$ 0,00" 
                              className="pl-10"
                              onChange={(e) => formatAndSetCurrencyValue(e, field.onChange)}
                              value={field.value}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Rendimentos Isentos */}
                  <FormField
                    control={form.control}
                    name="taxFreeIncome"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Valor Recebido via Rendimentos Isentos</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BanknoteIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="R$ 0,00" 
                              className="pl-10"
                              onChange={(e) => formatAndSetCurrencyValue(e, field.onChange)}
                              value={field.value}
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Ex: rendimentos de poupança, dividendos, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Dependentes */}
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-medium text-brand-dark">Dependentes</h3>
                    <Button 
                      type="button" 
                      variant="outline"
                      size="sm"
                      onClick={addDependentField}
                      className="text-brand-blue border-brand-blue"
                    >
                      + Adicionar Dependente
                    </Button>
                  </div>
                  
                  {form.watch("dependents").map((_, index) => (
                    <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-medium">Dependente {index + 1}</h4>
                        <Button 
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeDependentField(index)}
                        >
                          Remover
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Nome do Dependente */}
                        <FormField
                          control={form.control}
                          name={`dependents.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Nome Completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome do dependente" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Idade do Dependente */}
                        <FormField
                          control={form.control}
                          name={`dependents.${index}.age`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Idade</FormLabel>
                              <FormControl>
                                <Input placeholder="Idade" type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* CPF do Dependente */}
                        <FormField
                          control={form.control}
                          name={`dependents.${index}.cpf`}
                          render={({ field }) => (
                            <FormItem className="md:col-span-3">
                              <FormLabel>CPF</FormLabel>
                              <FormControl>
                                <Input placeholder="000.000.000-00 (opcional)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Dados Profissionais */}
            <AccordionItem value="professional">
              <AccordionTrigger className="text-lg font-semibold text-brand-dark">
                Dados Profissionais (Opcional)
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {/* Nome Fantasia (opcional) */}
                  <FormField
                    control={form.control}
                    name="tradeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Fantasia (opcional)</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input placeholder="Nome da sua marca ou negócio" className="pl-10" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Área de Atuação (opcional) */}
                  <FormField
                    control={form.control}
                    name="businessArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Área de Atuação (opcional)</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input placeholder="Ex: Consultoria, Marketing, etc." className="pl-10" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Dados de Acesso */}
            <AccordionItem value="access">
              <AccordionTrigger className="text-lg font-semibold text-brand-dark">
                Dados de Acesso
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {/* Senha */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <KeyIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input type="password" placeholder="Mínimo 8 caracteres" className="pl-10" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirmar Senha */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Senha</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <KeyIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Input type="password" placeholder="Confirme sua senha" className="pl-10" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Aceitar Termos */}
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
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

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline"
              className="border-brand-blue text-brand-blue hover:bg-brand-light-blue"
              onClick={() => {
                setSaveAndContinueLater(true);
                form.handleSubmit(onSubmit)();
              }}
              disabled={loading}
            >
              Salvar e continuar depois
            </Button>
            
            <Button 
              type="submit" 
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
              onClick={() => setSaveAndContinueLater(false)}
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
          </div>
        </form>
      </Form>
      
      <div className="text-center">
        <p className="text-gray-600">
          Já possui uma conta? <a href="/login" className="text-brand-blue hover:underline">Entrar</a>
        </p>
      </div>
    </div>
  );
};

export default CpfRegistrationForm;
