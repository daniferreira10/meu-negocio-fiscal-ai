
export enum ProfileType {
  PHYSICAL = 'physical',
  LEGAL = 'legal'
}

// Base profile fields shared by both CPF and CNPJ
export interface BaseProfileFormValues {
  email?: string;
  phone?: string;
  profile_type?: ProfileType;
  
  // Address fields
  address_street?: string;
  address_number?: string;
  address_neighborhood?: string;
  address_city?: string;
  address_state?: string;
  address_zipcode?: string;
  
  // Access credentials
  password?: string;
  confirmPassword?: string;
}

// CPF (Individual) specific fields
export interface CpfFormValues extends BaseProfileFormValues {
  profile_type?: ProfileType.PHYSICAL;
  full_name?: string;
  cpf?: string;
  birth_date?: string;
  profession?: string;
  marital_status?: string;
  
  // Financial information
  income_sources?: {
    source?: string;
    monthly_income?: number;
  }[];
  
  // Assets and liabilities
  assets?: {
    description?: string;
    value?: number;
  }[];
  
  debts?: {
    description?: string;
    value?: number;
    due_date?: string;
  }[];
  
  // Tax info
  has_dependents?: boolean;
  tax_return_info?: string;
}

// CNPJ (Company) specific fields
export interface CnpjFormValues extends BaseProfileFormValues {
  profile_type?: ProfileType.LEGAL;
  company_name?: string;
  trading_name?: string;
  cnpj?: string;
  founding_date?: string;
  legal_representative?: string;
  
  // Tax and company info
  tax_regime?: 'simples_nacional' | 'lucro_presumido' | 'lucro_real';
  activity_code?: string;
  legal_nature?: string;
  
  // Financial
  monthly_revenue?: number;
  monthly_expenses?: number;
  employee_count?: number;
  
  // Banking
  bank_accounts?: {
    bank_name?: string;
    account_type?: string;
    account_number?: string;
  }[];
  
  // Tax obligations
  tax_obligations?: {
    name?: string;
    frequency?: string;
    next_due_date?: string;
  }[];
  
  // Debts and liabilities
  public_debts?: {
    description?: string;
    value?: number;
    due_date?: string;
  }[];
  
  // Additional info
  has_accountant?: boolean;
  current_accounting_info?: string;
}

// Generic user profile that could be either type
export type UserProfileFormValues = CpfFormValues | CnpjFormValues;
