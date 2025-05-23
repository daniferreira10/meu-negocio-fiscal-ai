
// Tipos de perfil de usuário aprimorados para PrimeDask
import { z } from 'zod';

// Enums compartilhados
export enum ProfileType {
  PHYSICAL = 'physical',
  LEGAL = 'legal'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  BLOCKED = 'blocked'
}

export enum TaxRegime {
  SIMPLES_NACIONAL = 'simples_nacional',
  LUCRO_PRESUMIDO = 'lucro_presumido',
  LUCRO_REAL = 'lucro_real',
  MEI = 'mei'
}

export enum IncomeRange {
  RANGE_1 = 'até_2000',
  RANGE_2 = '2001_5000',
  RANGE_3 = '5001_10000',
  RANGE_4 = '10001_20000',
  RANGE_5 = 'acima_20000'
}

export enum RevenueRange {
  RANGE_1 = 'até_20000',
  RANGE_2 = '20001_100000',
  RANGE_3 = '100001_500000',
  RANGE_4 = '500001_1000000',
  RANGE_5 = 'acima_1000000'
}

export enum MaritalStatus {
  SINGLE = 'solteiro',
  MARRIED = 'casado',
  DIVORCED = 'divorciado',
  WIDOWED = 'viuvo',
  SEPARATE = 'separado'
}

// Esquema básico de usuário
export const userSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email({ message: "E-mail inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }).optional(),
  created_at: z.string().datetime().optional(),
  last_login: z.string().datetime().optional(),
  status: z.nativeEnum(UserStatus).optional().default(UserStatus.ACTIVE),
  preferences: z.record(z.string(), z.any()).optional()
});

// Esquema base compartilhado por ambos os tipos de perfil
const baseProfileSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  profile_type: z.nativeEnum(ProfileType),
  email: z.string().email({ message: "E-mail inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }).optional(),
  
  // Endereço
  address_street: z.string().min(3, { message: "Rua é obrigatória" }),
  address_number: z.string().min(1, { message: "Número é obrigatório" }),
  address_neighborhood: z.string().min(2, { message: "Bairro é obrigatório" }),
  address_city: z.string().min(2, { message: "Cidade é obrigatória" }),
  address_state: z.string().min(2, { message: "Estado é obrigatório" }),
  address_zipcode: z.string().min(8, { message: "CEP deve ter 8 dígitos" }),
  
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// Esquema específico para pessoa física
export const physicalPersonSchema = baseProfileSchema.extend({
  profile_type: z.literal(ProfileType.PHYSICAL),
  full_name: z.string().min(3, { message: "Nome completo deve ter pelo menos 3 caracteres" }),
  cpf: z.string().min(11, { message: "CPF deve ter 11 dígitos" }),
  birth_date: z.string().min(1, { message: "Data de nascimento é obrigatória" }),
  marital_status: z.nativeEnum(MaritalStatus),
  dependents_count: z.number().int().min(0),
  profession: z.string().min(2, { message: "Profissão é obrigatória" }),
  monthly_income: z.number().min(0, { message: "Renda não pode ser negativa" }),
  monthly_expenses: z.number().min(0, { message: "Despesas não podem ser negativas" }),
  income_tax_declarant: z.boolean().optional().default(false),
  autonomous_activity: z.boolean().optional().default(false),
  monthly_income_range: z.nativeEnum(IncomeRange).optional(),
  assets: z.array(z.object({
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    value: z.number().min(0, { message: "Valor não pode ser negativo" })
  })).default([]),
  debts: z.array(z.object({
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    value: z.number().min(0, { message: "Valor não pode ser negativo" })
  })).default([]),
  other_income_sources: z.string().optional(),
  main_bank_account: z.string().min(1, { message: "Informações bancárias são obrigatórias" }),
  tax_return_info: z.string().optional()
});

// Esquema específico para pessoa jurídica
export const legalPersonSchema = baseProfileSchema.extend({
  profile_type: z.literal(ProfileType.LEGAL),
  company_name: z.string().min(2, { message: "Razão social deve ter pelo menos 2 caracteres" }),
  trading_name: z.string().min(2, { message: "Nome fantasia deve ter pelo menos 2 caracteres" }).optional(),
  cnpj: z.string().min(14, { message: "CNPJ deve ter 14 dígitos" }),
  founding_date: z.string().min(1, { message: "Data de fundação é obrigatória" }),
  legal_representative: z.string().min(3, { message: "Nome do representante legal é obrigatório" }),
  tax_regime: z.nativeEnum(TaxRegime),
  legal_nature: z.string().min(2, { message: "Natureza jurídica é obrigatória" }),
  cnae: z.string().min(5, { message: "Código CNAE é obrigatório" }),
  monthly_revenue: z.number().min(0, { message: "Receita não pode ser negativa" }),
  monthly_revenue_range: z.nativeEnum(RevenueRange).optional(),
  employees_count: z.number().int().min(0),
  average_payroll: z.number().min(0, { message: "Folha de pagamento não pode ser negativa" }),
  fixed_expenses: z.number().min(0, { message: "Despesas fixas não podem ser negativas" }),
  variable_expenses: z.number().min(0, { message: "Despesas variáveis não podem ser negativas" }),
  bank_accounts: z.array(z.object({
    bank_name: z.string().min(1, { message: "Nome do banco é obrigatório" }),
    account_type: z.string().min(1, { message: "Tipo de conta é obrigatório" }),
    account_number: z.string().min(1, { message: "Número da conta é obrigatório" })
  })).default([]),
  issues_invoices: z.boolean().default(false),
  invoice_type: z.string().optional(),
  tax_status: z.string().optional(),
  public_debts: z.array(z.object({
    description: z.string().min(1),
    value: z.number().min(0),
    due_date: z.string().optional()
  })).default([]),
  current_accounting_info: z.string().optional()
});

// Tipos TypeScript baseados nos schemas Zod
export type User = z.infer<typeof userSchema>;
export type PhysicalPersonProfile = z.infer<typeof physicalPersonSchema>;
export type LegalPersonProfile = z.infer<typeof legalPersonSchema>;
export type UserProfile = PhysicalPersonProfile | LegalPersonProfile;

// Schemas para validação de formulários
export const cpfRegistrationSchema = physicalPersonSchema
  .omit({ id: true, user_id: true, created_at: true, updated_at: true })
  .extend({
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    confirmPassword: z.string().min(1, { message: "Confirme sua senha" })
  })
  .superRefine(({confirmPassword, password}, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirmPassword"]
      });
    }
  });

export const cnpjRegistrationSchema = legalPersonSchema
  .omit({ id: true, user_id: true, created_at: true, updated_at: true })
  .extend({
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    confirmPassword: z.string().min(1, { message: "Confirme sua senha" })
  })
  .superRefine(({confirmPassword, password}, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirmPassword"]
      });
    }
  });

// Tipos para os formulários
export type CpfFormValues = z.infer<typeof cpfRegistrationSchema>;
export type CnpjFormValues = z.infer<typeof cnpjRegistrationSchema>;

// Interface para componentes de registro
export interface RegistrationFormProps {
  onRegistrationComplete: () => void;
  onBack: () => void;
}
