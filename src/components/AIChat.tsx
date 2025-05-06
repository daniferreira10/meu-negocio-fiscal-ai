
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Olá! Sou o assistente contábil PrimeDesk. Como posso ajudá-lo hoje com questões relacionadas à contabilidade, impostos ou obrigações fiscais?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate response
    setTimeout(() => {
      const responses = [
        "Para responder sua pergunta sobre impostos, precisaria saber mais sobre seu regime tributário. Você é MEI, Simples Nacional, Lucro Presumido ou Lucro Real?",
        "Essa despesa específica pode ser deduzida sim, desde que seja comprovadamente relacionada à atividade da empresa e esteja documentada com nota fiscal.",
        "O prazo para pagamento do DAS do Simples Nacional é até o dia 20 do mês seguinte. Já para o IRPJ trimestral, o prazo vence no último dia útil do mês seguinte ao fechamento do trimestre.",
        "De acordo com a legislação atual, essa operação precisa ser registrada como receita bruta e entrará na base de cálculo dos impostos. Recomendo emitir uma nota fiscal para documentá-la adequadamente.",
        "Analisando seu perfil, sugiro avaliar a possibilidade de mudar para o regime de Lucro Presumido. Pela simulação que fiz, poderia economizar aproximadamente 15% em tributos anuais."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: randomResponse 
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' 
                ? 'ml-auto max-w-[80%]' 
                : 'mr-auto max-w-[80%]'
            }`}
          >
            <div
              className={`p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-brand-blue text-white rounded-tr-none'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="mr-auto max-w-[80%] mb-4">
            <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-tl-none text-gray-800">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua dúvida contábil..."
            className="min-h-12 resize-none flex-1"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim()}
            className="bg-brand-blue hover:bg-brand-blue/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;
