
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  attachment?: {
    name: string;
    type: string;
  } | null;
}

export interface KnowledgeQA {
  question: string;
  answer: string;
}

export interface KnowledgeBase {
  [category: string]: KnowledgeQA[];
}
