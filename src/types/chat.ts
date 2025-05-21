
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
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface KnowledgeBase {
  id: string;
  title: string;
  content: string;
}

export interface DevelopmentPhase {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  tasks: Task[];
}
