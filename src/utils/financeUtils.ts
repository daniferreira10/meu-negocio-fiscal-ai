/**
 * Utility functions for financial calculations and transformations
 */

import { FinancialTransaction, LivroCaixaItem, LivroCaixaResult, DASSimples, IRResult, SimpleIRData, SimpleIRResult, FiscalAnalysisData, FiscalAnalysisResult } from '@/types/chat';

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

/**
 * Calculates Income Tax (IR) based on financial data - Complex version
 * @param dados Object containing income and deductions data
 * @returns Calculated IR with detailed breakdown
 */
export function calcularIR(dados: {
  rendimentos_tributaveis: number;
  rendimentos_isentos?: number;
  deducoes?: number;
  periodo?: string;
}): IRResult {
  // Default values
  const rendimentosTributaveis = dados.rendimentos_tributaveis || 0;
  const rendimentosIsentos = dados.rendimentos_isentos || 0;
  const deducoes = dados.deducoes || 0;
  
  // Calculate taxable base
  const baseCalculo = Math.max(0, rendimentosTributaveis - deducoes);
  
  // IR tax brackets (2024 values)
  const faixasIR = [
    { limite: 2259.20, aliquota: 0, deducao: 0 },
    { limite: 2826.65, aliquota: 0.075, deducao: 169.44 },
    { limite: 3751.05, aliquota: 0.15, deducao: 381.44 },
    { limite: 4664.68, aliquota: 0.225, deducao: 662.77 },
    { limite: Infinity, aliquota: 0.275, deducao: 896.00 }
  ];
  
  // Find the tax bracket
  const faixaAplicavel = faixasIR.find(faixa => baseCalculo <= faixa.limite) || faixasIR[faixasIR.length - 1];
  
  // Calculate tax due using the formula: (base * rate) - deduction
  const impostoBruto = (baseCalculo * faixaAplicavel.aliquota) - faixaAplicavel.deducao;
  const impostoDevido = Math.max(0, impostoBruto);
  
  // Calculate effective tax rate
  const aliquotaEfetiva = rendimentosTributaveis > 0 ? (impostoDevido / rendimentosTributaveis) : 0;
  
  // Detailed breakdown by tax bracket
  const faixasUtilizadas = [];
  let valorRestante = baseCalculo;
  let faixaAnterior = 0;
  
  for (const faixa of faixasIR) {
    const valorNaFaixa = Math.min(Math.max(0, valorRestante), Math.max(0, faixa.limite - faixaAnterior));
    
    if (valorNaFaixa > 0) {
      faixasUtilizadas.push({
        faixa: faixasIR.indexOf(faixa) + 1,
        valor_na_faixa: valorNaFaixa,
        aliquota: faixa.aliquota,
        imposto_na_faixa: valorNaFaixa * faixa.aliquota
      });
      
      valorRestante -= valorNaFaixa;
    }
    
    faixaAnterior = faixa.limite;
    
    if (valorRestante <= 0) break;
  }
  
  return {
    rendimentos_tributaveis: rendimentosTributaveis,
    rendimentos_isentos: rendimentosIsentos,
    deducoes: deducoes,
    base_calculo: baseCalculo,
    imposto_devido: impostoDevido,
    aliquota_efetiva: aliquotaEfetiva,
    faixas_utilizadas: faixasUtilizadas
  };
}

/**
 * Simplified Income Tax (IR) calculation based on the provided Python function
 * @param dados Object containing taxpayer type and income
 * @returns Calculated tax amount
 */
export function calcularIRSimples(dados: SimpleIRData): SimpleIRResult {
  const { tipo, rendimento } = dados;
  
  let aliquota: number;
  
  if (tipo === 'PF') {
    aliquota = rendimento < 50000 ? 0.15 : 0.275;
  } else {
    aliquota = rendimento < 240000 ? 0.10 : 0.15;
  }
  
  const imposto_devido = rendimento * aliquota;
  
  return {
    tipo: tipo,
    imposto_devido: imposto_devido
  };
}

/**
 * Performs a fiscal analysis based on the provided financial data
 * @param dados Financial data for analysis
 * @returns Fiscal analysis results with recommendations
 */
export function analiseFiscal(dados: FiscalAnalysisData): FiscalAnalysisResult {
  // Calculate tax burden based on tax regime
  const cargaTributariaPorRegime = {
    simples_nacional: 0.06,
    lucro_presumido: 0.115,
    lucro_real: 0.15
  };
  
  const cargaTributaria = dados.faturamento_mensal * cargaTributariaPorRegime[dados.regime_tributario];
  
  // Calculate potential savings
  let economiaPotencial = 0;
  const recomendacoes = [];
  const oportunidades = [];
  let riscoFiscal: 'alto' | 'medio' | 'baixo' = 'baixo';
  
  // Analyze based on sector and tax regime to generate recommendations
  if (dados.regime_tributario === 'simples_nacional' && dados.faturamento_mensal > 300000) {
    recomendacoes.push({
      titulo: 'Revisão do regime tributário',
      descricao: 'Considerar mudança para Lucro Presumido devido ao faturamento elevado',
      impacto: 'alto' as const
    });
    
    oportunidades.push({
      titulo: 'Economia com créditos de PIS/COFINS',
      descricao: 'Possível aproveitamento de créditos não disponíveis no Simples Nacional',
      economia_estimada: dados.faturamento_mensal * 0.03
    });
    
    economiaPotencial += dados.faturamento_mensal * 0.03;
    riscoFiscal = 'medio';
  }
  
  if (dados.custos_fixos > dados.faturamento_mensal * 0.7) {
    recomendacoes.push({
      titulo: 'Otimização de custos fixos',
      descricao: 'Custos fixos muito elevados em relação ao faturamento',
      impacto: 'alto' as const
    });
    
    oportunidades.push({
      titulo: 'Renegociação de contratos fixos',
      descricao: 'Revisão e renegociação de contratos de aluguel e serviços continuados',
      economia_estimada: dados.custos_fixos * 0.15
    });
    
    economiaPotencial += dados.custos_fixos * 0.15;
    riscoFiscal = 'alto';
  }
  
  if (dados.numero_funcionarios && dados.numero_funcionarios > 0) {
    if (dados.faturamento_mensal / dados.numero_funcionarios < 10000) {
      recomendacoes.push({
        titulo: 'Análise de produtividade',
        descricao: 'Faturamento por funcionário abaixo da média do mercado',
        impacto: 'medio' as const
      });
      
      oportunidades.push({
        titulo: 'Revisão de estrutura organizacional',
        descricao: 'Otimização da equipe ou aumento de produtividade por colaborador',
        economia_estimada: dados.numero_funcionarios * 1000
      });
      
      economiaPotencial += dados.numero_funcionarios * 1000;
    }
  }
  
  // Add general recommendation
  recomendacoes.push({
    titulo: 'Planejamento tributário anual',
    descricao: 'Implementar planejamento tributário anual para otimizar impostos',
    impacto: 'medio' as const
  });
  
  return {
    carga_tributaria: cargaTributaria,
    economia_potencial: economiaPotencial,
    recomendacoes: recomendacoes,
    oportunidades: oportunidades,
    risco_fiscal: riscoFiscal
  };
}

// Sample data generators for testing
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

/**
 * Sample data for IR calculation
 */
export function getSampleIRData() {
  return {
    rendimentos_tributaveis: 5000,
    rendimentos_isentos: 1200,
    deducoes: 1100,
  };
}

/**
 * Sample data for Simple IR calculation
 */
export function getSampleSimpleIRData(): SimpleIRData {
  return {
    tipo: 'PF',
    rendimento: 60000
  };
}

/**
 * Sample data for fiscal analysis
 */
export function getSampleFiscalAnalysisData(): FiscalAnalysisData {
  return {
    faturamento_mensal: 120000,
    custos_fixos: 40000,
    custos_variaveis: 30000,
    regime_tributario: 'simples_nacional',
    setor: 'tecnologia',
    numero_funcionarios: 8
  };
}
