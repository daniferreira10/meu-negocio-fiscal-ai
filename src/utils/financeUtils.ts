
/**
 * Utility functions for financial calculations and transformations
 */

interface FinancialTransaction {
  data: string;
  valor: number;
  descricao?: string;
  categoria?: string;
}

interface LivroCaixaItem {
  data: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  descricao?: string;
  categoria?: string;
}

interface LivroCaixaResult {
  livro_caixa: LivroCaixaItem[];
  saldo_final: number;
}

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
