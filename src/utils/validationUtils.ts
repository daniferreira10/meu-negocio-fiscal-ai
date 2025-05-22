
import { z } from 'zod';

/**
 * Funções de validação avançada para dados financeiros
 */

/**
 * Valida um CPF brasileiro
 */
export const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');
  
  // Verificar se tem 11 dígitos
  if (cpf.length !== 11) return false;
  
  // Verificar se todos os dígitos são iguais (caso inválido)
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;
  
  return true;
};

/**
 * Valida um CNPJ brasileiro
 */
export const validateCNPJ = (cnpj: string): boolean => {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/\D/g, '');
  
  // Verificar se tem 14 dígitos
  if (cnpj.length !== 14) return false;
  
  // Verificar se todos os dígitos são iguais (caso inválido)
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  
  // Tabela de multiplicadores
  const multiplier1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const multiplier2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * multiplier1[i];
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (digit1 !== parseInt(cnpj.charAt(12))) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * multiplier2[i];
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  if (digit2 !== parseInt(cnpj.charAt(13))) return false;
  
  return true;
};

/**
 * Valida um valor monetário
 * Verificando limites razoáveis e coerência
 */
export const validateMonetaryValue = (value: number, min = 0, max = 100000000): boolean => {
  if (isNaN(value)) return false;
  if (value < min) return false;
  if (value > max) return false;
  return true;
};

/**
 * Valida um conjunto de dados financeiros básicos
 * Verificando a relação entre renda e despesas
 */
export const validateFinancialData = (income: number, expenses: number): { valid: boolean; messages: string[] } => {
  const messages: string[] = [];
  let valid = true;
  
  // Verificar se despesas são muito próximas ou maiores que a renda (possível sinal de alerta)
  if (income > 0 && expenses / income > 0.9) {
    messages.push("Suas despesas estão muito próximas ou excedem sua renda mensal.");
    valid = false;
  }
  
  // Verificar valores muito discrepantes (possível erro de digitação)
  if (income > 0 && expenses / income < 0.1) {
    messages.push("Suas despesas parecem muito baixas em relação à sua renda. Verifique se todos os custos foram considerados.");
  }
  
  if (income > 1000000) {
    messages.push("Renda mensal muito alta. Verifique se o valor foi inserido corretamente.");
  }
  
  if (expenses > 1000000) {
    messages.push("Despesas mensais muito altas. Verifique se o valor foi inserido corretamente.");
  }
  
  return { valid, messages };
};

/**
 * Schemas Zod avançados com validações customizadas
 */
export const advancedCpfSchema = z.string()
  .min(11, { message: "CPF deve ter pelo menos 11 dígitos" })
  .refine((cpf) => validateCPF(cpf), {
    message: "CPF inválido. Verifique os dígitos inseridos."
  });

export const advancedCnpjSchema = z.string()
  .min(14, { message: "CNPJ deve ter pelo menos 14 dígitos" })
  .refine((cnpj) => validateCNPJ(cnpj), {
    message: "CNPJ inválido. Verifique os dígitos inseridos."
  });

export const advancedMonetarySchema = z.number()
  .min(0, { message: "Valor não pode ser negativo" })
  .max(100000000, { message: "Valor muito alto, verifique se está correto" });

/**
 * Formata um número como moeda brasileira (R$)
 */
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

/**
 * Formata um CPF (000.000.000-00)
 */
export const formatCPF = (cpf: string): string => {
  cpf = cpf.replace(/\D/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Formata um CNPJ (00.000.000/0000-00)
 */
export const formatCNPJ = (cnpj: string): string => {
  cnpj = cnpj.replace(/\D/g, '');
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};
