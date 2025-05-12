
import { useState } from 'react';
import ChatMessage from './chat/ChatMessage';
import ChatInput from './chat/ChatInput';
import { Message } from '@/types/chat';
import { findBestResponse } from '@/services/chatService';
import { toast } from 'sonner';

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Olá! Sou o assistente contábil da PrimeDask. Posso ajudar você com diversos assuntos relacionados à contabilidade e gestão empresarial, como:

1. Abertura e regularização de empresas
2. Planejamento tributário
3. Escrituração contábil
4. Obrigações fiscais
5. Departamento pessoal
6. Assessoria financeira
7. Obrigações anuais

Como posso ajudar você hoje?`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string, attachedFile: File | null) => {
    const userMessage: Message = { 
      role: 'user', 
      content: content || "Analisar o arquivo anexado",
      attachment: attachedFile ? {
        name: attachedFile.name,
        type: attachedFile.type
      } : null
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Use setTimeout to simulate processing time
    setTimeout(() => {
      let response = findBestResponse(userMessage.content, !!attachedFile);
      
      // If there's an attachment, add specific context about it
      if (userMessage.attachment) {
        if (userMessage.attachment.type.includes('spreadsheet') || userMessage.attachment.type.includes('excel')) {
          response = `Recebi sua planilha "${userMessage.attachment.name}" e a analisei com nosso sistema de IA. Para uma análise mais detalhada de planilhas, recomendamos a revisão por nossos contadores. Em uma análise preliminar, posso identificar:

1. Estrutura e organização dos dados
2. Possíveis inconsistências em fórmulas ou cálculos
3. Oportunidades para otimização fiscal

Recomendo agendar uma consultoria com nossos especialistas para um planejamento financeiro e tributário personalizado baseado nestes dados.`;
        } else if (userMessage.attachment.type.includes('pdf') || userMessage.attachment.type.includes('document')) {
          response = `Analisei seu documento "${userMessage.attachment.name}". Identifiquei que se trata de um ${userMessage.attachment.name.endsWith('.pdf') ? 'PDF' : 'documento de texto'} que pode conter informações fiscais ou contratuais importantes.

Nossa IA analisou os principais pontos e destaca:
1. Verifique se todos os dados cadastrais estão corretos
2. Confirme os valores e prazos mencionados
3. Guarde este documento de forma segura para eventual fiscalização

Para uma análise completa e orientação personalizada, recomendo agendar uma consulta com um de nossos especialistas.`;
        } else if (userMessage.attachment.type.includes('image')) {
          response = `Recebi sua imagem "${userMessage.attachment.name}". Nosso sistema pode analisar comprovantes de pagamento, notas fiscais ou documentos em formato de imagem.

Com base na imagem enviada, posso auxiliar em:
1. Classificação contábil do documento
2. Verificação de conformidade fiscal
3. Armazenamento adequado para obrigações legais

Para uma análise completa, recomendo agendar uma consulta com um de nossos especialistas contábeis.`;
        } else {
          response = `Recebi seu arquivo "${userMessage.attachment.name}". Nossa equipe contábil pode analisar este documento e oferecer orientações específicas para seu caso.

Os próximos passos recomendados são:
1. Classificação adequada deste documento na contabilidade
2. Verificação de conformidade com requisitos fiscais
3. Inclusão no seu histórico contábil para fins de auditoria

Entre em contato com nosso time para uma análise personalizada deste documento e orientações sobre como proceder.`;
        }
      }
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      // Notify user about scheduling a consultation
      if (Math.random() > 0.7) { // 30% chance to show this toast
        toast.info("Você pode agendar uma consulta especializada para aprofundar este assunto.", {
          duration: 6000,
        });
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 to-brand-dark-blue">
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && <ChatMessage message={{ role: 'assistant', content: '' }} isLoading={true} />}
      </div>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default AIChat;
