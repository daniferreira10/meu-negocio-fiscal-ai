
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User } from 'lucide-react';

// Example chat messages
const initialMessages = [
  {
    role: 'assistant',
    content: 'Olá! Sou seu assistente contábil. Como posso ajudá-lo hoje?'
  }
];

const suggestedQuestions = [
  'Quais impostos devo pagar este mês?',
  'Como classificar uma nota fiscal de serviço?',
  'Explique o que é DAS para MEI',
  'Como deduzir despesas da minha empresa?'
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      if (content.toLowerCase().includes('imposto') || content.toLowerCase().includes('devo pagar')) {
        response = 'Com base no seu regime tributário (Simples Nacional), você precisa pagar o DAS até o dia 20 de maio. O valor estimado é de R$ 567,89 com base na sua receita mensal.';
      } else if (content.toLowerCase().includes('nota fiscal') || content.toLowerCase().includes('classificar')) {
        response = 'Para classificar uma nota fiscal de serviço, você deve verificar a natureza do serviço prestado. Geralmente, esses valores entram como "Serviços Prestados" na receita. Se for uma nota de serviço tomado, classifique como despesa na categoria correspondente ao tipo de serviço.';
      } else if (content.toLowerCase().includes('das') || content.toLowerCase().includes('mei')) {
        response = 'O DAS (Documento de Arrecadação do Simples Nacional) é o imposto unificado que os MEIs e empresas do Simples Nacional pagam mensalmente. Ele inclui IRPJ, CSLL, PIS, COFINS, IPI, ICMS, ISS e a Contribuição Previdenciária. Para MEIs, o valor é fixo dependendo da atividade.';
      } else if (content.toLowerCase().includes('deduzir') || content.toLowerCase().includes('despesa')) {
        response = 'Você pode deduzir despesas que sejam relacionadas à atividade da empresa e estejam devidamente documentadas com nota fiscal ou recibo. Exemplos incluem: aluguel do escritório, salários, insumos, materiais de escritório, serviços contratados, etc. Guarde todos os comprovantes por pelo menos 5 anos.';
      } else {
        response = 'Entendi sua pergunta. Para responder de forma mais precisa, precisaria analisar seus dados financeiros. Posso ajudar com dúvidas sobre impostos, obrigações fiscais, interpretação de relatórios contábeis e recomendações para sua empresa.';
      }
      
      // Add AI response
      const aiMessage: Message = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center bg-brand-blue text-white rounded-t-lg">
        <Bot className="w-6 h-6 mr-2" />
        <h2 className="text-lg font-semibold">Assistente Contábil</h2>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-brand-blue text-white rounded-tr-none'
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              <div className="flex items-start">
                {message.role === 'assistant' && (
                  <Bot className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                )}
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                {message.role === 'user' && (
                  <User className="w-5 h-5 ml-2 mt-1 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none max-w-[80%] p-3">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <div className="text-sm">Digitando...</div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length < 3 && (
        <div className="px-4 py-2 bg-gray-50 border-t">
          <p className="text-xs text-gray-500 mb-2">Perguntas sugeridas:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input Area */}
      <div className="p-4 border-t bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta sobre contabilidade..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
            className="flex-1"
            disabled={loading}
          />
          <Button
            onClick={() => handleSendMessage(input)}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white px-3"
            disabled={!input.trim() || loading}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Nosso assistente AI responde a perguntas sobre contabilidade, impostos e finanças para seu negócio.
        </p>
      </div>
    </div>
  );
};

export default AIChat;
