
import { z } from 'zod';

// Define the ClientInfo type
export interface ClientInfo {
  id?: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
  nome_completo: string;  // this is required
  cpf?: string;
  cnpj?: string;
  data_abertura?: Date;
  tipo_empresa?: string;
  regime_tributario?: string;
  cnae_atividade?: string;
  faturamento_mensal?: number;
  receitas?: string;
  despesas?: string;
  funcionarios?: number;
  folha_pagamento_total?: number;
  notas_fiscais_emitidas?: string;
  banco_movimentacoes?: string;
}

// Schema for form validation
export const clientInfoSchema = z.object({
  nome_completo: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  data_abertura: z.date().optional(),
  tipo_empresa: z.string().optional(),
  regime_tributario: z.string().optional(),
  cnae_atividade: z.string().optional(),
  faturamento_mensal: z.coerce.number().optional(),
  receitas: z.string().optional(),
  despesas: z.string().optional(),
  funcionarios: z.coerce.number().optional(),
  folha_pagamento_total: z.coerce.number().optional(),
  notas_fiscais_emitidas: z.string().optional(),
  banco_movimentacoes: z.string().optional()
}).refine(data => Boolean(data.cpf) || Boolean(data.cnpj), {
  message: "Você deve fornecer um CPF ou CNPJ",
  path: ['cpf']
});

export type ClientFormValues = z.infer<typeof clientInfoSchema>;
