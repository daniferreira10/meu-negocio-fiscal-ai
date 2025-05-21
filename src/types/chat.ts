
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

// Export the LivroCaixaResult interface to fix the import error
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

// New interface for DAS Simples Nacional
export interface DASSimples {
  cnpj: string;
  periodo: string;
  valor: number;
  data_vencimento: string;
  codigo_barras?: string;
  url_boleto?: string;
}
