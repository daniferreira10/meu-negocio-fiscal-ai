
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import AccountTab from '@/components/registration/tabs/AccountTab';
import CompanyTab from '@/components/registration/tabs/CompanyTab';
import AddressTab from '@/components/registration/tabs/AddressTab';
import TaxTab from '@/components/registration/tabs/TaxTab';
import FinancialTab from '@/components/registration/tabs/FinancialTab';
import BankingTab from '@/components/registration/tabs/BankingTab';
import OtherTab from '@/components/registration/tabs/OtherTab';
import { useRegistrationTabs } from '@/components/registration/hooks/useRegistrationTabs';
import { CnpjFormValues, ProfileType } from '@/types/userProfileTypes';
import { toast } from 'sonner';
import { saveLegalPersonProfile } from '@/services/userProfileService';
import { getCurrentUser } from '@/services/authService';
import { CompanyTabProps, BankingTabProps } from '@/types/accountTabTypes';

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  confirmPassword: z.string(),
  company_name: z.string().min(2, { message: "O nome da empresa deve ter pelo menos 2 caracteres" }),
  trading_name: z.string().optional(),
  cnpj: z.string().min(14, { message: "CNPJ deve ter 14 caracteres" }),
  founding_date: z.string().optional(),
  legal_representative: z.string().optional(),
  tax_regime: z.enum(['simples_nacional', 'lucro_presumido', 'lucro_real']).optional(),
  activity_code: z.string().optional(),
  legal_nature: z.string().optional(),
  address_street: z.string().optional(),
  address_number: z.string().optional(),
  address_neighborhood: z.string().optional(),
  address_city: z.string().optional(),
  address_state: z.string().optional(),
  address_zipcode: z.string().optional(),
  monthly_revenue: z.number().optional(),
  monthly_expenses: z.number().optional(),
  employee_count: z.number().optional(),
  bank_accounts: z.array(
    z.object({
      bank_name: z.string().optional(),
      account_type: z.string().optional(),
      account_number: z.string().optional()
    })
  ).optional(),
  tax_obligations: z.array(
    z.object({
      name: z.string().optional(),
      frequency: z.string().optional(),
      next_due_date: z.string().optional()
    })
  ).optional(),
  public_debts: z.array(
    z.object({
      description: z.string().optional(),
      value: z.number().optional(),
      due_date: z.string().optional()
    })
  ).optional(),
  has_accountant: z.boolean().optional(),
  current_accounting_info: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});

interface CnpjRegistrationFormProps {
  onRegistrationComplete?: () => void;
  onBack?: () => void;
}

const CnpjRegistrationForm: React.FC<CnpjRegistrationFormProps> = ({ onRegistrationComplete, onBack }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<CnpjFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile_type: ProfileType.LEGAL,
      email: '',
      password: '',
      confirmPassword: '',
      company_name: '',
      trading_name: '',
      cnpj: '',
      founding_date: '',
      legal_representative: '',
      tax_regime: undefined,
      activity_code: '',
      legal_nature: '',
      address_street: '',
      address_number: '',
      address_neighborhood: '',
      address_city: '',
      address_state: '',
      address_zipcode: '',
      monthly_revenue: undefined,
      monthly_expenses: undefined,
      employee_count: undefined,
      bank_accounts: [],
      tax_obligations: [],
      public_debts: [],
      has_accountant: false,
      current_accounting_info: '',
    },
  });

  const { activeTab, handleNextTab, handlePreviousTab } = useRegistrationTabs<CnpjFormValues>(form);
  const navigate = useNavigate();

  const onSubmit = async (data: CnpjFormValues) => {
    setLoading(true);
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        toast.error("Você precisa estar conectado para salvar seu perfil");
        return;
      }

      // Prepare data for saving
      const profileData = {
        ...data,
        user_id: currentUser.id,
        profile_type: ProfileType.LEGAL as const
      };
      
      // Save the profile using service
      const result = await saveLegalPersonProfile(profileData);
      
      if (result) {
        toast.success('Cadastro realizado com sucesso!');
        if (onRegistrationComplete) {
          onRegistrationComplete();
        } else {
          // Redirect to dashboard after a small delay
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        }
      } else {
        toast.error('Erro ao realizar o cadastro.');
      }
    } catch (error) {
      console.error('Erro durante o cadastro:', error);
      toast.error('Erro ao realizar o cadastro.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Cadastro de Pessoa Jurídica
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Preencha os dados da sua empresa para completar o cadastro.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="bg-white py-6 px-4 sm:p-6">
              {activeTab === 'account' && (
                <AccountTab 
                  form={form}
                  onNext={handleNextTab}
                />
              )}
              {activeTab === 'company' && (
                <CompanyTab 
                  form={form} 
                  onNext={handleNextTab} 
                  onPrevious={handlePreviousTab} 
                />
              )}
              {activeTab === 'address' && (
                <AddressTab 
                  form={form}
                  onNext={handleNextTab} 
                  onPrevious={handlePreviousTab} 
                />
              )}
              {activeTab === 'tax' && (
                <TaxTab 
                  form={form} 
                  onNext={handleNextTab} 
                  onBack={handlePreviousTab} 
                />
              )}
              {activeTab === 'financial' && (
                <FinancialTab 
                  form={form}
                  onNext={handleNextTab} 
                  onPrevious={handlePreviousTab} 
                />
              )}
              {activeTab === 'banking' && (
                <BankingTab 
                  form={form} 
                  onPrevious={handlePreviousTab} 
                  loading={loading} 
                />
              )}
              {activeTab === 'other' && (
                <OtherTab 
                  form={form}
                  onSubmit={handleSubmit} 
                  onPrevious={handlePreviousTab}
                  loading={loading} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CnpjRegistrationForm;
