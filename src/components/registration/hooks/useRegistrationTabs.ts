
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

type TabType = 'account' | 'company' | 'address' | 'tax' | 'financial' | 'banking' | 'personal' | 'assets' | 'other';

// Generic type to handle different form types
export function useRegistrationTabs<T>(form: UseFormReturn<T>) {
  const [activeTab, setActiveTab] = useState<TabType>('account');

  const tabOrder: TabType[] = [
    'account', 
    'company', 
    'address', 
    'tax', 
    'financial', 
    'banking',
    'personal',
    'assets',
    'other'
  ];

  const isValidTabName = (tab: string): tab is TabType => {
    return tabOrder.includes(tab as TabType);
  };

  const handleNextTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      const nextTab = tabOrder[currentIndex + 1];
      
      // Skip tabs that don't exist in the specific form
      // This check could be more sophisticated based on the form's context
      if (activeTab === 'personal' && nextTab === 'assets' && !('assets' in form.getValues())) {
        setActiveTab('other');
      } else if (activeTab === 'company' && nextTab === 'address' && !('address_street' in form.getValues())) {
        setActiveTab('tax');
      } else {
        setActiveTab(nextTab);
      }
    }
  };

  const handlePreviousTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      const prevTab = tabOrder[currentIndex - 1];
      
      // Skip tabs that don't exist in the specific form
      // This check could be more sophisticated based on the form's context
      if (activeTab === 'assets' && prevTab === 'personal' && !('full_name' in form.getValues())) {
        setActiveTab('account');
      } else if (activeTab === 'tax' && prevTab === 'address' && !('address_street' in form.getValues())) {
        setActiveTab('company');
      } else {
        setActiveTab(prevTab);
      }
    }
  };

  const setActiveTabSafe = (tab: string) => {
    if (isValidTabName(tab)) {
      setActiveTab(tab);
    }
  };

  return {
    activeTab,
    setActiveTab: setActiveTabSafe,
    handleNextTab,
    handlePreviousTab,
  };
}
