
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
    suggestionType?: 'tax' | 'document' | 'financial' | 'compliance' | 'general';
  };
}

export interface KnowledgeQA {
  question: string;
  answer: string;
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
