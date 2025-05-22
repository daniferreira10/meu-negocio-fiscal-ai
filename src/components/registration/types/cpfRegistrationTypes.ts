
import { z } from "zod";

// Schema de validação para PF completa
export const cpfSchema = z.object({
  // Dados de conta
  email: z.string()
    .email({ message: "E-mail inválido" })
    .min(1, { message: "E-mail é obrigatório" }),
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  confirmPassword: z.string()
    .min(1, { message: "Confirme sua senha" }),
  
  // Dados pessoais
  full_name: z.string()
    .min(3, { message: "Nome completo deve ter pelo menos 3 caracteres" }),
  phone: z.string()
    .min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  birth_date: z.string()
    .min(1, { message: "Data de nascimento é obrigatória" }),
  cpf: z.string()
    .min(11, { message: "CPF deve ter 11 dígitos" }),
  marital_status: z.string({ required_error: "Estado civil é obrigatório" }),
  dependents_count: z.coerce.number()
    .int({ message: "Deve ser um número inteiro" })
    .min(0, { message: "Não pode ser negativo" }),
  
  // Endereço
  address_street: z.string()
    .min(3, { message: "Rua é obrigatória" }),
  address_number: z.string()
    .min(1, { message: "Número é obrigatório" }),
  address_neighborhood: z.string()
    .min(3, { message: "Bairro é obrigatório" }),
  address_city: z.string()
    .min(3, { message: "Cidade é obrigatória" }),
  address_state: z.string()
    .min(2, { message: "Estado é obrigatório" }),
  address_zipcode: z.string()
    .min(8, { message: "CEP deve ter 8 dígitos" }),
  
  // Dados financeiros
  profession: z.string()
    .min(3, { message: "Profissão é obrigatória" }),
  monthly_income: z.coerce.number()
    .min(0, { message: "Renda não pode ser negativa" }),
  monthly_expenses: z.coerce.number()
    .min(0, { message: "Despesas não podem ser negativas" }),
  
  // Patrimônio
  assets: z.array(z.object({
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    value: z.coerce.number().min(0, { message: "Valor não pode ser negativo" })
  })).default([]),
  
  // Dívidas
  debts: z.array(z.object({
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    value: z.coerce.number().min(0, { message: "Valor não pode ser negativo" })
  })).default([]),
  
  // Outras informações
  other_income_sources: z.string().optional(),
  main_bank_account: z.string().min(1, { message: "Informações bancárias são obrigatórias" }),
  tax_return_info: z.string().optional()
}).superRefine(({confirmPassword, password}, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não coincidem",
      path: ["confirmPassword"]
    });
  }
});

export type CpfFormValues = z.infer<typeof cpfSchema>;

export interface CpfRegistrationFormProps {
  onRegistrationComplete: () => void;
  onBack: () => void;
}
