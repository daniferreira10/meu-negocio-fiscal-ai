import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CpfFormValues, ProfileType, cpfRegistrationSchema, RegistrationFormProps, MaritalStatus } from '@/types/userProfileTypes';
import { useRegistrationTabs } from './hooks/useRegistrationTabs';
import AccountTab from './tabs/AccountTab';
import PersonalTab from './tabs/PersonalTab';
import AddressTab from './tabs/AddressTab';
import FinancialTab from './tabs/FinancialTab';
import AssetsTab from './tabs/AssetsTab';
import OtherTab from './tabs/OtherTab';

const CpfRegistrationForm = ({ onRegistrationComplete, onBack }: RegistrationFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<CpfFormValues>({
    resolver: zodResolver(cpfRegistrationSchema),
    defaultValues: {
      // Dados de perfil
      profile_type: ProfileType.PHYSICAL,
      
      // Dados de conta
      email: "",
      password: "",
      confirmPassword: "",
      
      // Dados pessoais
      full_name: "",
      phone: "",
      birth_date: "",
      cpf: "",
      marital_status: MaritalStatus.SINGLE,
      
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
      monthly_income_range: undefined,
      income_tax_declarant: false,
      autonomous_activity: false,
      
      // Patrimônio e dívidas
      assets: [],
      debts: [],
      
      // Outras informações
      other_income_sources: "",
      main_bank_account: "",
      tax_return_info: "",
      
      // Additional
      dependents_count: 0,
    }
  });

  const { activeTab, setActiveTab, handleNextTab, handlePreviousTab } = useRegistrationTabs(form);

  const onSubmit = async (data: CpfFormValues) => {
    setLoading(true);
    console.log("Dados de PF:", data);
    
    try {
      // Simplified for now
      toast.success("Cadastro realizado com sucesso!");
      if (onRegistrationComplete) {
        onRegistrationComplete();
      }
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      toast.error("Erro ao criar conta. Tente novamente.");
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
        <h2 className="text-xl font-semibold">Cadastro de Pessoa Física</h2>
      </div>
      
      <ScrollArea className="h-[70vh] pr-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
              <TabsList className="grid grid-cols-6 mb-6">
                <TabsTrigger value="account">Conta</TabsTrigger>
                <TabsTrigger value="personal">Pessoal</TabsTrigger>
                <TabsTrigger value="address">Endereço</TabsTrigger>
                <TabsTrigger value="financial">Financeiro</TabsTrigger>
                <TabsTrigger value="assets">Patrimônio</TabsTrigger>
                <TabsTrigger value="other">Outros</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <AccountTab 
                  form={form} 
                  onNext={handleNextTab} 
                />
              </TabsContent>
              
              {activeTab === 'personal' && (
                <PersonalTab
                  form={form}
                  onNext={handleNextTab}
                  onPrevious={handlePreviousTab}
                />
              )}
              
              <TabsContent value="address">
                <AddressTab 
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
              
              <TabsContent value="assets">
                <AssetsTab 
                  form={form}
                  onNext={handleNextTab} 
                  onPrevious={handlePreviousTab}
                />
              </TabsContent>
              
              <TabsContent value="other">
                <OtherTab 
                  form={form}
                  onSubmit={form.handleSubmit(onSubmit)} 
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

export default CpfRegistrationForm;
