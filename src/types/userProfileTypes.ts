
import { z } from 'zod';

export enum ProfileType {
  PHYSICAL = 'physical',
  LEGAL = 'legal'
}

export enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
  SEPARATED = 'separated'
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
  
  // Additional fields for CpfForm
  monthly_income?: number;
  monthly_expenses?: number;
  monthly_income_range?: string;
  income_tax_declarant?: boolean;
  autonomous_activity?: boolean;
  other_income_sources?: string;
  main_bank_account?: string;
  dependents_count?: number;
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
  
  // Additional fields for CNPJ registrations
  issues_invoices?: boolean;
  invoice_type?: string;
  average_payroll?: number;
  fixed_expenses?: number;
  variable_expenses?: number;
  employees_count?: number;
}

// Generic user profile that could be either type
export type UserProfileFormValues = CpfFormValues | CnpjFormValues;

// Registration form props interface
export interface RegistrationFormProps {
  onRegistrationComplete?: () => void;
  onBack?: () => void;
}

// Schemas for form validation
export const cpfRegistrationSchema = z.object({
  profile_type: z.literal(ProfileType.PHYSICAL).default(ProfileType.PHYSICAL),
  full_name: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  confirmPassword: z.string(),
  cpf: z.string().min(11, "CPF deve ter 11 dígitos"),
  phone: z.string().optional(),
  birth_date: z.string().optional(),
  marital_status: z.string().optional(),
  profession: z.string().optional(),
  address_street: z.string().optional(),
  address_number: z.string().optional(),
  address_neighborhood: z.string().optional(),
  address_city: z.string().optional(),
  address_state: z.string().optional(),
  address_zipcode: z.string().optional(),
  monthly_income: z.number().optional(),
  monthly_expenses: z.number().optional(),
  income_tax_declarant: z.boolean().optional(),
  dependents_count: z.number().optional(),
  assets: z.array(z.object({
    description: z.string().optional(),
    value: z.number().optional()
  })).optional(),
  debts: z.array(z.object({
    description: z.string().optional(),
    value: z.number().optional(),
    due_date: z.string().optional()
  })).optional(),
  other_income_sources: z.string().optional(),
  main_bank_account: z.string().optional(),
  tax_return_info: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});

export const cnpjRegistrationSchema = z.object({
  profile_type: z.literal(ProfileType.LEGAL).default(ProfileType.LEGAL),
  company_name: z.string().min(2, "Nome da empresa deve ter pelo menos 2 caracteres"),
  trading_name: z.string().optional(),
  cnpj: z.string().min(14, "CNPJ deve ter 14 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  confirmPassword: z.string(),
  phone: z.string().optional(),
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
  bank_accounts: z.array(z.object({
    bank_name: z.string().optional(),
    account_type: z.string().optional(),
    account_number: z.string().optional()
  })).optional(),
  tax_obligations: z.array(z.object({
    name: z.string().optional(),
    frequency: z.string().optional(),
    next_due_date: z.string().optional()
  })).optional(),
  public_debts: z.array(z.object({
    description: z.string().optional(),
    value: z.number().optional(),
    due_date: z.string().optional()
  })).optional(),
  has_accountant: z.boolean().optional(),
  current_accounting_info: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});
