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
