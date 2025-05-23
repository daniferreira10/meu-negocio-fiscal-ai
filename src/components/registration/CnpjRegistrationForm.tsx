
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { registerUser } from '@/services/authService';
import { saveLegalPersonProfile } from '@/services/userProfileService';
import { 
  RegistrationFormProps,
  ProfileType,
  cnpjRegistrationSchema,
  CnpjFormValues,
  TaxRegime
} from '@/types/userProfileTypes';
import { useRegistrationTabs } from './hooks/useRegistrationTabs';
import AccountTab from './tabs/AccountTab';
import CompanyTab from './tabs/CompanyTab';
import AddressTab from './tabs/AddressTab';
import TaxTab from './tabs/TaxTab';
import FinancialTab from './tabs/FinancialTab';
import BankingTab from './tabs/BankingTab';

const CnpjRegistrationForm = ({ onRegistrationComplete, onBack }: RegistrationFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<CnpjFormValues>({
    resolver: zodResolver(cnpjRegistrationSchema),
    defaultValues: {
      // Dados de perfil
      profile_type: ProfileType.LEGAL,
      
      // Dados de conta
      email: '',
      password: '',
      confirmPassword: '',
      
      // Dados da empresa
      company_name: '',
      trading_name: '',
      cnpj: '',
      founding_date: '',
      legal_representative: '',
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
      tax_regime: TaxRegime.SIMPLES_NACIONAL,
      cnae: '',
      tax_status: '',
      
      // Informações Financeiras
      monthly_revenue: 0,
      employees_count: 0,
      average_payroll: 0,
      fixed_expenses: 0,
      variable_expenses: 0,
      
      // Contas bancárias
      bank_accounts: [],
      
      // Outras informações
      issues_invoices: false,
      invoice_type: '',
      public_debts: [],
      current_accounting_info: ''
    }
  });

  const { activeTab, setActiveTab, handleNextTab, handlePreviousTab } = useRegistrationTabs(form);

  const onSubmit = async (data: CnpjFormValues) => {
    setLoading(true);
    console.log("Dados de empresa:", data);
    
    try {
      // 1. Registrar usuário com email e senha
      const success = await registerUser(data.email, data.password);
      
      if (success) {
        // 2. Salvar perfil completo - todos os campos do schema são enviados
        const profileData = {
          user_id: "", // preenchido no backend pelo currentUser
          company_name: data.company_name,
          trading_name: data.trading_name || '',
          cnpj: data.cnpj,
          founding_date: data.founding_date,
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
          cnae: data.cnae,
          monthly_revenue: data.monthly_revenue,
          employees_count: data.employees_count,
          average_payroll: data.average_payroll || 0,
          fixed_expenses: data.fixed_expenses || 0,
          variable_expenses: data.variable_expenses || 0,
          bank_accounts: data.bank_accounts || [],
          issues_invoices: data.issues_invoices || false,
          invoice_type: data.invoice_type || '',
          tax_status: data.tax_status || '',
          public_debts: data.public_debts || [],
          current_accounting_info: data.current_accounting_info || '',
          profile_type: ProfileType.LEGAL // Using the specific enum value
        };
        
        // Type cast to ensure correct typing
        const savedProfile = await saveLegalPersonProfile(profileData);
        
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
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
              <TabsList className="grid grid-cols-6 mb-6">
                <TabsTrigger value="account">Conta</TabsTrigger>
                <TabsTrigger value="company">Empresa</TabsTrigger>
                <TabsTrigger value="address">Endereço</TabsTrigger>
                <TabsTrigger value="tax">Fiscal</TabsTrigger>
                <TabsTrigger value="financial">Financeiro</TabsTrigger>
                <TabsTrigger value="banking">Bancário</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <AccountTab 
                  form={form} 
                  onNext={handleNextTab} 
                />
              </TabsContent>
              
              <TabsContent value="company">
                <CompanyTab 
                  form={form}
                  onNext={handleNextTab}
                  onPrevious={handlePreviousTab}
                />
              </TabsContent>
              
              <TabsContent value="address">
                <AddressTab 
                  form={form}
                  onNext={handleNextTab}
                  onPrevious={handlePreviousTab}
                />
              </TabsContent>
              
              <TabsContent value="tax">
                <TaxTab 
                  form={form}
                  onNext={handleNextTab}
                  onPrevious={handlePreviousTab}
                />
              </TabsContent>
              
              <TabsContent value="financial">
                <FinancialTab 
                  form={form}
                  onNext={handleNextTab}
                  onPrevious={handlePreviousTab}
                />
              </TabsContent>
              
              <TabsContent value="banking">
                <BankingTab 
                  form={form}
                  onPrevious={handlePreviousTab}
                  loading={loading}
                />
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
};

export default CnpjRegistrationForm;
