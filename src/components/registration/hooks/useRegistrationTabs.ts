
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { CpfFormValues } from '../types/cpfRegistrationTypes';

type TabType = 'account' | 'personal' | 'address' | 'financial' | 'assets' | 'other';

export const useRegistrationTabs = (form: UseFormReturn<CpfFormValues>) => {
  const [activeTab, setActiveTab] = useState<TabType>('account');

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

  return {
    activeTab,
    setActiveTab,
    handleNextTab,
    handlePreviousTab
  };
};
