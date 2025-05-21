
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: 'open' | 'in-progress' | 'completed';
  dueDate: Date;
}

export interface PhaseSection {
  name: string;
  items: {
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed';
  }[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  phases: PhaseSection[];
  teamMembers: string[];
}

// Adding missing types required by other components
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  metadata?: {
    category?: string;
    confidence?: number;
    processingTime?: number;
    suggestionType?: 'tax' | 'document' | 'financial' | 'compliance' | 'development' | 'general';
  };
  attachment?: {
    name: string;
    type: string;
  };
}

export interface KnowledgeBase {
  id: string;
  title: string;
  content: string;
  "consultoria_contabil"?: any;
  "planejamento_tributario"?: any;
  "contabilidade"?: any;
}

export interface DevelopmentPhase {
  id: string;
  name: string;
  phase: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'not_started';
  sections: {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'in_progress' | 'not_started';
    tasks: {
      description: string;
      completed: boolean;
    }[];
  }[];
  progressPercentage: number;
  tasks: Task[];
}

// Financial transaction interfaces
export interface FinancialTransaction {
  data: string;
  valor: number;
  descricao?: string;
  categoria?: string;
}

export interface LivroCaixaItem {
  data: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  descricao?: string;
  categoria?: string;
}

export interface LivroCaixaResult {
  livro_caixa: LivroCaixaItem[];
  saldo_final: number;
}

// DAS Simples Nacional interface
export interface DASSimples {
  cnpj: string;
  periodo: string;
  valor: number;
  data_vencimento: string;
  codigo_barras?: string;
  url_boleto?: string;
}

// IR (Income Tax) calculation interface
export interface IRResult {
  rendimentos_tributaveis: number;
  rendimentos_isentos: number;
  deducoes: number;
  base_calculo: number;
  imposto_devido: number;
  aliquota_efetiva: number;
  faixas_utilizadas: {
    faixa: number;
    valor_na_faixa: number;
    aliquota: number;
    imposto_na_faixa: number;
  }[];
  tipo?: 'PF' | 'PJ'; // Added for the new implementation
}

// New Simple IR Data interface for the simpler calculation
export interface SimpleIRData {
  tipo: 'PF' | 'PJ';
  rendimento: number;
}

// New Simple IR Result interface
export interface SimpleIRResult {
  tipo: 'PF' | 'PJ';
  imposto_devido: number;
}

// Fiscal Analysis interfaces
export interface FiscalAnalysisData {
  faturamento_mensal: number;
  custos_fixos: number;
  custos_variaveis: number;
  regime_tributario: 'simples_nacional' | 'lucro_presumido' | 'lucro_real';
  setor: string;
  numero_funcionarios?: number;
  receita?: number; // Added for compatibility with Python function
  despesa?: number;
  folha_pagamento?: number;
}

export interface FiscalAnalysisResult {
  carga_tributaria: number;
  economia_potencial: number;
  recomendacoes: {
    titulo: string;
    descricao: string;
    impacto: 'alto' | 'medio' | 'baixo';
  }[];
  oportunidades: {
    titulo: string;
    descricao: string;
    economia_estimada: number;
  }[];
  risco_fiscal: 'alto' | 'medio' | 'baixo';
  alertas?: string[];
}

// Tax Prediction interfaces
export interface TaxPredictionData {
  faturamento_previsto: number;
  despesas_previstas: number;
  regime_tributario: 'simples_nacional' | 'lucro_presumido' | 'lucro_real';
  periodo_meses: number;
  setor?: string;
  receita?: number; // Added for compatibility with Python function
}

export interface TaxPredictionResult {
  impostos_mensais: {
    mes: string;
    valor: number;
    tipo: string;
  }[];
  total_periodo: number;
  media_mensal: number;
  impostos_detalhados: {
    tipo: string;
    total: number;
    percentual: number;
  }[];
}

// Intelligent Report interfaces
export interface ReportData {
  periodo: string;
  empresa_nome?: string;
  empresa_cnpj?: string;
  pessoa_nome?: string;
  pessoa_cpf?: string;
  tipo: 'PF' | 'PJ';
  receitas: FinancialTransaction[];
  despesas: FinancialTransaction[];
  regime_tributario?: 'simples_nacional' | 'lucro_presumido' | 'lucro_real';
  atividade?: string;
  receita?: number;
  despesa?: number;
  mensal?: any[];
  por_categoria?: Record<string, any>;
}

export interface ReportSection {
  titulo: string;
  conteudo: string;
  tipo: 'texto' | 'tabela' | 'grafico';
  dados_grafico?: any;
}

export interface IntelligentReportResult {
  titulo: string;
  data_geracao: string; 
  resumo_executivo: string;
  secoes: ReportSection[];
  conclusao: string;
  recomendacoes: string[];
  metricas_chave: {
    nome: string;
    valor: number | string;
    unidade?: string;
    tendencia?: 'up' | 'down' | 'stable';
  }[];
  resumo?: string;
  graficos?: {
    mensal: any[];
    categorias: Record<string, any>;
  };
}
