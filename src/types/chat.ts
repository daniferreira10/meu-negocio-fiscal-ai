
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  attachment?: {
    name: string;
    type: string;
  } | null;
  metadata?: {
    category?: string;
    confidence?: number;
    processingTime?: number;
    suggestionType?: 'tax' | 'document' | 'financial' | 'compliance' | 'general' | 'development';
    phase?: 'cadastro' | 'impostos' | 'obrigacoes' | 'folha_pagamento' | 'analise_financeira' | 'suporte_preditivo';
    referencePhase?: number; // 1, 2, 3, 4 (conforme as fases do plano)
    referenceSection?: string; // ex: "1.2", "3.1", etc.
    actionRequired?: boolean;
  };
}

export interface KnowledgeQA {
  question: string;
  answer: string;
  phase?: number; // 1-4, indicando a fase do plano
  section?: string; // ex: "1.2", "3.1"
}

export interface KnowledgeBase {
  [category: string]: KnowledgeQA[];
}

export interface TaxCalculation {
  taxType: string;
  amount: number;
  dueDate: string;
  code?: string;
  description?: string;
}

export interface FinancialMetric {
  name: string;
  value: number | string;
  trend?: 'up' | 'down' | 'stable';
  description?: string;
}

export interface DocumentAnalysis {
  documentType: string;
  extractedData: Record<string, any>;
  classification: string;
  confidence: number;
}

export interface BusinessRecommendation {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
}

export interface DevelopmentPhase {
  phase: number;
  title: string;
  description: string;
  sections: PhaseSection[];
  status: 'not_started' | 'in_progress' | 'completed';
  progressPercentage: number;
}

export interface PhaseSection {
  id: string; // ex: "1.1", "2.3"
  title: string;
  description: string;
  tasks: PhaseTask[];
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface PhaseTask {
  description: string;
  completed: boolean;
}
