
/**
 * Utility functions for financial calculations and transformations
 */

import { FinancialTransaction, LivroCaixaItem, LivroCaixaResult, DASSimples } from '@/types/chat';

/**
 * Generates a cash book (Livro Caixa) from financial data
 * @param dados Object containing receitas (revenue) and despesas (expenses) arrays
 * @returns Ordered cash book with calculated balance
 */
export function gerarLivroCaixa(dados: { 
  receitas?: FinancialTransaction[],
  despesas?: FinancialTransaction[] 
}): LivroCaixaResult {
  // Extract revenue and expense entries
  const entradas = dados.receitas || [];
  const saidas = dados.despesas || [];
  
  // Convert all entries to a standard format
  const livro: LivroCaixaItem[] = [
    ...entradas.map(item => ({
      data: item.data,
      valor: item.valor,
      tipo: 'receita' as const,
      descricao: item.descricao,
      categoria: item.categoria
    })),
    ...saidas.map(item => ({
      data: item.data,
      valor: item.valor,
      tipo: 'despesa' as const,
      descricao: item.descricao,
      categoria: item.categoria
    }))
  ];
  
  // Sort entries by date
  const livro_ordenado = livro.sort((a, b) => 
    new Date(a.data).getTime() - new Date(b.data).getTime()
  );
  
  // Calculate final balance
  const saldo_final = livro_ordenado.reduce((total, item) => 
    item.tipo === 'receita' ? total + item.valor : total - item.valor, 0
  );
  
  return { 
    livro_caixa: livro_ordenado,
    saldo_final
  };
}

/**
 * Calculates and generates a DAS Simples Nacional document based on financial data
 * @param dados Object containing revenue (receitas) data
 * @returns DAS Simples Nacional document with payment information
 */
export function emitirDASSimples(dadosCnpj: { 
  cnpj: string,
  periodo: string,
  faturamento: number,
  anexo?: number
}): DASSimples {
  // Simulate tax calculation based on revenue
  const aliquota = dadosCnpj.faturamento <= 180000 ? 0.04 : 
                   dadosCnpj.faturamento <= 360000 ? 0.073 :
                   dadosCnpj.faturamento <= 720000 ? 0.095 :
                   dadosCnpj.faturamento <= 1800000 ? 0.107 :
                   dadosCnpj.faturamento <= 3600000 ? 0.143 :
                   dadosCnpj.faturamento <= 4800000 ? 0.19 : 0.33;
  
  // Calculate tax amount
  const valorImposto = Math.round(dadosCnpj.faturamento * aliquota * 100) / 100;
  
  // Generate due date (20th of next month)
  const [year, month] = dadosCnpj.periodo.split('-').map(Number);
  let dueMonth = month + 1;
  let dueYear = year;
  
  if (dueMonth > 12) {
    dueMonth = 1;
    dueYear += 1;
  }
  
  const dataVencimento = `${dueYear}-${String(dueMonth).padStart(2, '0')}-20`;
  
  // Generate dummy barcode and URL
  const codigoBarras = `${Math.floor(10000000000000000000 + Math.random() * 90000000000000000000)}`;
  const urlBoleto = `https://emissao.das.gov.br/${dadosCnpj.cnpj}/${dadosCnpj.periodo}`;
  
  return {
    cnpj: dadosCnpj.cnpj,
    periodo: dadosCnpj.periodo,
    valor: valorImposto,
    data_vencimento: dataVencimento,
    codigo_barras: codigoBarras,
    url_boleto: urlBoleto
  };
}

// Sample data generator for testing
export function getSampleFinancialData() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  return {
    receitas: [
      { data: `${currentYear}-${currentMonth+1}-05`, valor: 3500, descricao: "Salário", categoria: "Renda Fixa" },
      { data: `${currentYear}-${currentMonth+1}-12`, valor: 1200, descricao: "Freelance", categoria: "Renda Extra" },
      { data: `${currentYear}-${currentMonth+1}-20`, valor: 500, descricao: "Dividendos", categoria: "Investimentos" },
    ],
    despesas: [
      { data: `${currentYear}-${currentMonth+1}-07`, valor: 1200, descricao: "Aluguel", categoria: "Moradia" },
      { data: `${currentYear}-${currentMonth+1}-08`, valor: 450, descricao: "Supermercado", categoria: "Alimentação" },
      { data: `${currentYear}-${currentMonth+1}-15`, valor: 380, descricao: "Energia e Água", categoria: "Contas" },
      { data: `${currentYear}-${currentMonth+1}-18`, valor: 120, descricao: "Internet", categoria: "Serviços" },
      { data: `${currentYear}-${currentMonth+1}-22`, valor: 250, descricao: "Combustível", categoria: "Transporte" },
    ]
  };
}
