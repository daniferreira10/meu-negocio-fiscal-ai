
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CpfFormValues, CnpjFormValues } from '@/types/userProfileTypes';

// Define tabs that are used in registration processes
type RegistrationTab = 'account' | 'personal' | 'company' | 'address' | 'financial' | 'tax' | 'assets' | 'banking' | 'other';

// These are the CPF registration tab sequences
const cpfTabSequence: RegistrationTab[] = ['account', 'personal', 'address', 'financial', 'assets', 'other'];

// These are the CNPJ registration tab sequences
const cnpjTabSequence: RegistrationTab[] = ['account', 'company', 'address', 'tax', 'financial', 'banking'];

/**
 * Custom hook to manage registration tabs
 */
export const useRegistrationTabs = (form: UseFormReturn<CpfFormValues> | UseFormReturn<CnpjFormValues>) => {
  const [activeTab, setActiveTab] = useState<RegistrationTab>('account');
  
  // Determine if we're dealing with CPF or CNPJ form based on the form values
  const isCpfForm = (): boolean => {
    const watchedValue = form.watch();
    return !('company_name' in watchedValue) && !('trading_name' in watchedValue);
  };

  // Get the appropriate tab sequence based on form type
  const getTabSequence = (): RegistrationTab[] => {
    return isCpfForm() ? cpfTabSequence : cnpjTabSequence;
  };

  // Move to the next tab in sequence
  const handleNextTab = () => {
    const sequence = getTabSequence();
    const currentIndex = sequence.indexOf(activeTab);
    
    if (currentIndex < sequence.length - 1) {
      setActiveTab(sequence[currentIndex + 1]);
    }
  };
  
  // Move to the previous tab in sequence
  const handlePreviousTab = () => {
    const sequence = getTabSequence();
    const currentIndex = sequence.indexOf(activeTab);
    
    if (currentIndex > 0) {
      setActiveTab(sequence[currentIndex - 1]);
    }
  };

  return {
    activeTab,
    setActiveTab,
    handleNextTab,
    handlePreviousTab
  };
};
