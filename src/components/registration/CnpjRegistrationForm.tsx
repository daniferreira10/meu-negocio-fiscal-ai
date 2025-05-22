
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { consultarCNPJ } from '@/utils/cnpjUtils';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { saveLegalPersonProfile } from '@/services/userProfileService';

interface CnpjRegistrationFormProps {
  onRegistrationComplete: () => void;
  onBack: () => void;
}

// Schema de validação para PJ completo
const cnpjSchema = z.object({
  company_name: z.string().min(3, { message: "Nome da empresa deve ter pelo menos 3 caracteres" }),
  cnpj: z.string().min(14, { message: "CNPJ deve ter 14 dígitos" }),
  legal_representative: z.string().min(3, { message: "Nome do responsável é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  
  // Endereço
  address_street: z.string().min(3, { message: "Rua é obrigatória" }),
  address_number: z.string().min(1, { message: "Número é obrigatório" }),
  address_neighborhood: z.string().min(3, { message: "Bairro é obrigatório" }),
  address_city: z.string().min(3, { message: "Cidade é obrigatória" }),
  address_state: z.string().min(2, { message: "Estado é obrigatório" }),
  address_zipcode: z.string().min(8, { message: "CEP deve ter 8 dígitos" }),
  
  // Informações Fiscais
  legal_nature: z.string().min(1, { message: "Natureza jurídica é obrigatória" }),
  tax_regime: z.string().min(1, { message: "Regime tributário é obrigatório" }),
  cnae_code: z.string().min(1, { message: "CNAE principal é obrigatório" }),
  
  // Informações Financeiras
  monthly_revenue: z.coerce.number().min(0, { message: "Faturamento não pode ser negativo" }),
  employees_count: z.coerce.number().int().min(0, { message: "Número de funcionários não pode ser negativo" }),
  average_payroll: z.coerce.number().min(0, { message: "Folha salarial não pode ser negativa" }),
  fixed_expenses: z.coerce.number().min(0, { message: "Despesas fixas não podem ser negativas" }),
  variable_expenses: z.coerce.number().min(0, { message: "Despesas variáveis não podem ser negativas" }),
  
  // Dados Bancários
  bank_accounts: z.array(z.object({
    bank: z.string().min(1, { message: "Nome do banco é obrigatório" }),
    account_type: z.string().min(1, { message: "Tipo de conta é obrigatório" }),
    account_number: z.string().min(1, { message: "Número da conta é obrigatório" }),
    agency: z.string().min(1, { message: "Agência é obrigatória" }),
  })).default([]),
  
  // Informações Fiscais Adicionais
  issues_invoices: z.boolean(),
  invoice_type: z.string().optional(),
  tax_status: z.string().min(1, { message: "Situação cadastral é obrigatória" }),
  public_debts: z.string().optional(),
  current_accounting_info: z.string().optional(),
});

type CnpjFormValues = z.infer<typeof cnpjSchema>;

const CnpjRegistrationForm = ({ onRegistrationComplete, onBack }: CnpjRegistrationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [loadingCNPJ, setLoadingCNPJ] = useState(false);
  const [activeTab, setActiveTab] = useState('company');

  const form = useForm<CnpjFormValues>({
    resolver: zodResolver(cnpjSchema),
    defaultValues: {
      company_name: '',
      cnpj: '',
      legal_representative: '',
      email: '',
      phone: '',
      
      // Endereço
      address_street: '',
      address_number: '',
      address_neighborhood: '',
      address_city: '',
      address_state: '',
      address_zipcode: '',
      
      // Informações Fiscais
      legal_nature: '',
      tax_regime: 'simples_nacional',
      cnae_code: '',
      
      // Informações Financeiras
      monthly_revenue: 0,
      employees_count: 0,
      average_payroll: 0,
      fixed_expenses: 0,
      variable_expenses: 0,
      
      // Dados Bancários
      bank_accounts: [],
      
      // Informações Fiscais Adicionais
      issues_invoices: false,
      invoice_type: '',
      tax_status: 'ativa',
      public_debts: '',
      current_accounting_info: '',
    }
  });

  // Consultar CNPJ
  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Formata CNPJ enquanto digita: 99.999.999/9999-99
    let formattedValue = value.replace(/\D/g, ''); // Remove não-dígitos
    
    if (formattedValue.length > 14) {
      formattedValue = formattedValue.substring(0, 14);
    }
    
    if (formattedValue.length > 0) {
      // Aplica máscara conforme vai digitando
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.replace(/^(\d{2})/, '$1.');
      }
      if (formattedValue.length > 6) {
        formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})/, '$1.$2.');
      }
      if (formattedValue.length > 10) {
        formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})/, '$1.$2.$3/');
      }
      if (formattedValue.length > 15) {
        formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})/, '$1.$2.$3/$4-');
      }
    }
    
    form.setValue('cnpj', formattedValue);
  };

  const handleConsultarCNPJ = async () => {
    const cnpj = form.getValues('cnpj');
    if (cnpj.replace(/\D/g, '').length !== 14) {
      toast.error('CNPJ inválido. Deve conter 14 dígitos.');
      return;
    }

    setLoadingCNPJ(true);
    try {
      const data = await consultarCNPJ(cnpj);
      if (data) {
        form.setValue('company_name', data.nome);
        form.setValue('email', data.email || '');
        form.setValue('phone', data.telefone || '');
        form.setValue('address_street', data.logradouro || '');
        form.setValue('address_number', data.numero || '');
        form.setValue('address_neighborhood', data.bairro || '');
        form.setValue('address_city', data.municipio || '');
        form.setValue('address_state', data.uf || '');
        form.setValue('address_zipcode', data.cep?.replace(/\D/g, '') || '');
        form.setValue('cnae_code', data.atividade_principal[0]?.code || '');
        form.setValue('tax_status', data.situacao.toLowerCase());
        
        // Verificar situação cadastral
        if (data.situacao !== 'ATIVA') {
          toast.warning(`Atenção: CNPJ com situação ${data.situacao}. Verifique a regularidade.`);
        } else {
          toast.success('Dados do CNPJ carregados com sucesso!');
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro na consulta do CNPJ');
    } finally {
      setLoadingCNPJ(false);
    }
  };

  const onSubmit = async (data: CnpjFormValues) => {
    setLoading(true);
    console.log("Dados de PJ:", data);
    
    try {
      // Salvar perfil completo
      const profileData = {
        user_id: "", // preenchido no backend pelo currentUser
        company_name: data.company_name,
        cnpj: data.cnpj,
        legal_representative: data.legal_representative,
        email: data.email,
        phone: data.phone,
        address_street: data.address_street,
        address_number: data.address_number,
        address_neighborhood: data.address_neighborhood,
        address_city: data.address_city,
        address_state: data.address_state,
        address_zipcode: data.address_zipcode,
        legal_nature: data.legal_nature,
        tax_regime: data.tax_regime,
        cnae_code: data.cnae_code,
        monthly_revenue: data.monthly_revenue,
        employees_count: data.employees_count,
        average_payroll: data.average_payroll,
        fixed_expenses: data.fixed_expenses,
        variable_expenses: data.variable_expenses,
        bank_accounts: data.bank_accounts,
        issues_invoices: data.issues_invoices,
        invoice_type: data.invoice_type || '',
        tax_status: data.tax_status,
        public_debts: data.public_debts || '',
        current_accounting_info: data.current_accounting_info || ''
      };
      
      const savedProfile = await saveLegalPersonProfile(profileData);
      
      if (savedProfile) {
        toast.success("Cadastro realizado com sucesso!");
        onRegistrationComplete();
      } else {
        toast.error("Erro ao salvar perfil. Tente novamente.");
      }
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      toast.error("Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Funções para adicionar/remover contas bancárias
  const addBankAccount = () => {
    const currentAccounts = form.getValues().bank_accounts;
    form.setValue('bank_accounts', [
      ...currentAccounts, 
      { bank: '', account_type: '', account_number: '', agency: '' }
    ]);
  };

  const removeBankAccount = (index: number) => {
    const currentAccounts = form.getValues().bank_accounts;
    form.setValue('bank_accounts', currentAccounts.filter((_, i) => i !== index));
  };

  const handleNextTab = () => {
    if (activeTab === 'company') {
      form.trigger(['company_name', 'cnpj', 'legal_representative', 'email', 'phone']).then(isValid => {
        if (isValid) setActiveTab('address');
      });
    } else if (activeTab === 'address') {
      form.trigger([
        'address_street', 
        'address_number', 
        'address_city', 
        'address_state', 
        'address_zipcode'
      ]).then(isValid => {
        if (isValid) setActiveTab('fiscal');
      });
    } else if (activeTab === 'fiscal') {
      form.trigger(['legal_nature', 'tax_regime', 'cnae_code']).then(isValid => {
        if (isValid) setActiveTab('financial');
      });
    } else if (activeTab === 'financial') {
      form.trigger(['monthly_revenue', 'employees_count']).then(isValid => {
        if (isValid) setActiveTab('other');
      });
    }
  };

  const handlePreviousTab = () => {
    if (activeTab === 'address') {
      setActiveTab('company');
    } else if (activeTab === 'fiscal') {
      setActiveTab('address');
    } else if (activeTab === 'financial') {
      setActiveTab('fiscal');
    } else if (activeTab === 'other') {
      setActiveTab('financial');
    }
  };

  // Formatação de valores monetários
  const formatCurrency = (value: number): string => {
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
        <h2 className="text-xl font-semibold">Cadastro de Pessoa Jurídica</h2>
      </div>
      
      <ScrollArea className="h-[70vh] pr-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="company">Empresa</TabsTrigger>
                <TabsTrigger value="address">Endereço</TabsTrigger>
                <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
                <TabsTrigger value="financial">Financeiro</TabsTrigger>
                <TabsTrigger value="other">Outros</TabsTrigger>
              </TabsList>
              
              <TabsContent value="company" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <FormField
                      control={form.control}
                      name="cnpj"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>CNPJ</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input 
                                placeholder="00.000.000/0000-00" 
                                value={field.value}
                                onChange={handleCnpjChange}
                              />
                            </FormControl>
                            <Button 
                              type="button" 
                              onClick={handleConsultarCNPJ}
                              disabled={loadingCNPJ}
                              className="whitespace-nowrap"
                            >
                              {loadingCNPJ ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Consultando...
                                </>
                              ) : (
                                "Consultar"
                              )}
                            </Button>
                          </div>
                          <FormDescription>
                            Digite o CNPJ e clique em consultar para preencher automaticamente
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Razão Social</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome oficial da empresa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="legal_representative"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Responsável Legal</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo do responsável" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail da Empresa</FormLabel>
                        <FormControl>
                          <Input placeholder="contato@empresa.com.br" type="email" {...field} />
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
                        <FormLabel>Telefone da Empresa</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
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
              
              <TabsContent value="fiscal" className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="legal_nature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Natureza Jurídica</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a natureza jurídica" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ei">Empresário Individual (EI)</SelectItem>
                            <SelectItem value="mei">Microempreendedor Individual (MEI)</SelectItem>
                            <SelectItem value="eireli">Empresa Individual de Resp. Limitada (EIRELI)</SelectItem>
                            <SelectItem value="ltda">Sociedade Empresária Limitada (LTDA)</SelectItem>
                            <SelectItem value="sa">Sociedade Anônima (S/A)</SelectItem>
                            <SelectItem value="sociedade_simples">Sociedade Simples</SelectItem>
                            <SelectItem value="cooperativa">Cooperativa</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tax_regime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regime Tributário</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o regime tributário" />
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
                    name="cnae_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNAE Principal</FormLabel>
                        <FormControl>
                          <Input placeholder="00.00-0-00" {...field} />
                        </FormControl>
                        <FormDescription>
                          Código da atividade econômica principal
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tax_status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Situação Cadastral na Receita Federal</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a situação" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ativa">Ativa</SelectItem>
                            <SelectItem value="baixada">Baixada</SelectItem>
                            <SelectItem value="suspensa">Suspensa</SelectItem>
                            <SelectItem value="inapta">Inapta</SelectItem>
                            <SelectItem value="nula">Nula</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="issues_invoices"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Emite notas fiscais</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {form.watch("issues_invoices") && (
                    <FormField
                      control={form.control}
                      name="invoice_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Nota Fiscal</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="produto">Produto</SelectItem>
                              <SelectItem value="servico">Serviço</SelectItem>
                              <SelectItem value="ambos">Ambos</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
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
                    name="monthly_revenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Faturamento Mensal Médio (R$)</FormLabel>
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
                  
                  <FormField
                    control={form.control}
                    name="employees_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Funcionários</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            min="0" 
                            step="1" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="average_payroll"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Folha Salarial Média (R$)</FormLabel>
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
                          Valor aproximado gasto com salários por mês
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fixed_expenses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Despesas Fixas (R$)</FormLabel>
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
                            Aluguel, internet, energia, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="variable_expenses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Despesas Variáveis (R$)</FormLabel>
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
                            Comissões, matéria-prima, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contas Bancárias</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Liste as contas bancárias da empresa
                    </p>
                    
                    {form.getValues().bank_accounts.map((_, index) => (
                      <Card key={index} className="mb-4">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Conta {index + 1}</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBankAccount(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`bank_accounts.${index}.bank`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Banco</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Nome do banco" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name={`bank_accounts.${index}.account_type`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Tipo de Conta</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="corrente">Corrente</SelectItem>
                                      <SelectItem value="poupanca">Poupança</SelectItem>
                                      <SelectItem value="investimento">Investimento</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <FormField
                              control={form.control}
                              name={`bank_accounts.${index}.agency`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Agência</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Número da agência" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name={`bank_accounts.${index}.account_number`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Conta</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Número da conta" {...field} />
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
                      onClick={addBankAccount}
                      className="w-full mt-2"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar Conta Bancária
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
                    name="public_debts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Débitos em Aberto com Órgãos Públicos</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva se há débitos em aberto com INSS, FGTS, Receita Federal, etc." 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Deixe em branco se não houver débitos
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="current_accounting_info"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Informações da Contabilidade Atual</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Empresa responsável pela contabilidade atual, há quanto tempo, etc." 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Deixe em branco se não tiver contabilidade
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2 mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      className="rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Concordo com os termos de uso e política de privacidade
                    </Label>
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
                      type="submit" 
                      disabled={loading}
                      className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Finalizar Cadastro"
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
};

export default CnpjRegistrationForm;
