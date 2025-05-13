
import { useState, useEffect } from 'react';
import ChatMessage from './chat/ChatMessage';
import ChatInput from './chat/ChatInput';
import { Message } from '@/types/chat';
import { findBestResponse } from '@/services/chatService';
import { toast } from 'sonner';

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Olá! Sou o assistente contábil inteligente da PrimeDash. Posso ajudar você com diversos assuntos:

Consultoria contábil personalizada
Análise de regime tributário
Processamento de documentos
Apuração de tributos e obrigações fiscais
Relatórios financeiros
Agenda fiscal e alertas
Compliance e segurança fiscal

Como posso ajudar sua empresa hoje?`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    businessType: 'unknown', // "cpf", "cnpj", "unknown"
    taxRegime: 'unknown', // "simples", "presumido", "real", "unknown"
  });

  // Attempt to load user profile data from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user_profile');
      if (userData) {
        setUserProfile(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Failed to load user profile:", error);
    }
  }, []);

  const analyzeDocument = (fileName: string, fileType: string) => {
    // Document processing logic based on type
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) {
      return processSpreadsheet(fileName);
    } else if (fileType.includes('pdf') || fileType.includes('document')) {
      return processDocument(fileName);
    } else if (fileType.includes('image')) {
      return processImage(fileName);
    } else {
      return processGenericFile(fileName);
    }
  };

  const processSpreadsheet = (fileName: string) => {
    // Module 3 - Document processing for spreadsheets
    return `Analisei sua planilha "${fileName}" e detectei:

**Análise Financeira**:
- ${Math.random() > 0.5 ? 'Receitas estão 12% acima do mês anterior' : 'Despesas aumentaram em 8% nos últimos 3 meses'}
- ${Math.random() > 0.5 ? 'Detectei possíveis lançamentos duplicados nas linhas 15-18' : 'Todas as categorias estão corretamente classificadas'}
- Margem de lucro atual: ${Math.floor(Math.random() * 30) + 10}%

**Recomendações**:
- Verificar despesas de ${Math.random() > 0.5 ? 'marketing' : 'operacionais'} que cresceram acima da média
- ${Math.random() > 0.5 ? 'Considere reclassificar alguns gastos como investimentos' : 'Alguns recebimentos podem estar sem a nota fiscal correspondente'}

Para análise mais detalhada, recomendo agendar uma consultoria com nossos especialistas contábeis.`;
  };

  const processDocument = (fileName: string) => {
    // Module 3 - Document processing for PDFs and text docs
    const isPdf = fileName.toLowerCase().endsWith('.pdf');
    const documentType = Math.random() > 0.5 ? 
      'contrato de prestação de serviços' : 
      Math.random() > 0.5 ? 'nota fiscal' : 'extrato bancário';

    return `Analisei seu ${isPdf ? 'PDF' : 'documento'} "${fileName}" e identifiquei que é ${documentType}.

**Informações extraídas**:
- ${Math.random() > 0.5 ? 'Valor total: R$ ' + (Math.random() * 10000).toFixed(2) : 'Data de emissão: ' + new Date().toLocaleDateString('pt-BR')}
- ${Math.random() > 0.5 ? 'CNPJ emissor: XX.XXX.XXX/0001-XX' : 'Tributos incluídos: IRRF, ISS, CSLL'}

**Atenção necessária**:
- ${Math.random() > 0.5 ? 'Este documento deve ser anexado à declaração mensal' : 'Recomendo arquivar este documento por 5 anos'}
- ${Math.random() > 0.5 ? 'Prazo de pagamento próximo: ' + new Date(Date.now() + 7*86400000).toLocaleDateString('pt-BR') : 'Document já classificado e armazenado'}

Este documento foi automaticamente classificado e armazenado em sua conta.`;
  };

  const processImage = (fileName: string) => {
    // Module 3 - Image processing
    return `Processei sua imagem "${fileName}" usando nosso sistema OCR.

**Informações extraídas**:
- ${Math.random() > 0.5 ? 'Recibo de pagamento' : 'Comprovante de transferência'}
- Valor identificado: R$ ${(Math.random() * 1000).toFixed(2)}
- Data: ${new Date().toLocaleDateString('pt-BR')}

**Classificação sugerida**:
- Categoria: ${Math.random() > 0.5 ? 'Despesas operacionais' : 'Serviços prestados'}
- ${Math.random() > 0.5 ? 'Dedutível para ' + (Math.random() > 0.5 ? 'IRPJ' : 'CSLL') : 'Não dedutível para fins fiscais'}

Documento arquivado digitalmente. Recomendo guardar o original físico por 5 anos.`;
  };

  const processGenericFile = (fileName: string) => {
    // Generic file handling
    return `Recebi seu arquivo "${fileName}" e o adicionei ao seu registro contábil.

**Próximos passos**:
- Arquivo classificado como ${Math.random() > 0.5 ? 'Documento Fiscal' : 'Documento Administrativo'}
- Disponível para consulta em seu histórico de documentos
- ${Math.random() > 0.5 ? 'Recomendo classificar manualmente para melhor organização' : 'Processado com sucesso'}

Para mais detalhes sobre este documento, você pode consultar nossos especialistas contábeis.`;
  };

  const getTaxSuggestion = () => {
    // Module 1 - Tax regime analysis
    if (userProfile.businessType === 'cnpj') {
      if (userProfile.taxRegime === 'simples') {
        return `Baseado no seu perfil atual, o Simples Nacional pode ser adequado se seu faturamento anual estiver abaixo do limite de R$4,8 milhões e sua atividade for permitida. Considere analisar o Lucro Presumido se sua margem de lucro for alta.`;
      } else if (userProfile.taxRegime === 'presumido') {
        return `O Lucro Presumido é vantajoso para empresas com margens de lucro acima da presunção legal. Para prestadoras de serviço, o Simples pode ser mais vantajoso se o faturamento for menor.`;
      } else if (userProfile.taxRegime === 'real') {
        return `O Lucro Real é obrigatório para empresas com faturamento acima de R$78 milhões, mas pode ser vantajoso para negócios com margens baixas ou prejuízo fiscal.`;
      } else {
        return `Recomendo fazer uma análise tributária para determinar o regime fiscal mais vantajoso para o seu negócio, considerando faturamento, despesas e atividade.`;
      }
    } else {
      return `Para pessoas físicas, recomendo analisar os benefícios fiscais de abrir um CNPJ, especialmente se você presta serviços regularmente. Um MEI pode ser adequado para faturamento até R$81.000/ano.`;
    }
  };

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
      let response = "";
      
      // Check for attachment first
      if (userMessage.attachment) {
        response = analyzeDocument(userMessage.attachment.name, userMessage.attachment.type);
      } else {
        // Keywords for module detection 
        const query = userMessage.content.toLowerCase();
        
        // Module 1 - Tax consulting
        if (query.includes('regime') || query.includes('tribut') || 
            query.includes('simples') || query.includes('lucro') || 
            query.includes('mei') || query.includes('imposto')) {
          
          response = getTaxSuggestion() + "\n\nGostaria que eu fizesse uma simulação mais detalhada para seu caso específico?";
        } 
        // Module 4 - Tax calculation
        else if (query.includes('calcul') || query.includes('imposto') || 
                query.includes('das') || query.includes('darf') || 
                query.includes('guia') || query.includes('pagar')) {
          
          const taxValue = ((Math.random() * 1000) + 500).toFixed(2);
          const dueDate = new Date(Date.now() + 10*86400000).toLocaleDateString('pt-BR');
          
          response = `Com base no seu regime tributário${userProfile.taxRegime !== 'unknown' ? ' ' + userProfile.taxRegime : ''} e faturamento atual, calculei:

**Tributos do mês corrente**:
- ${Math.random() > 0.5 ? 'DAS' : 'DARF'}: R$ ${taxValue}
- Vencimento: ${dueDate}
- Código de pagamento: ${Math.floor(Math.random() * 10000)}

**Atenção**: Verifique também outras obrigações como ${Math.random() > 0.5 ? 'INSS' : 'FGTS'} com vencimento próximo.

Posso gerar a guia de pagamento para você. Gostaria que eu emitisse agora?`;
        }
        // Module 5 - Reports
        else if (query.includes('relatório') || query.includes('dre') || query.includes('balanço') || 
                query.includes('fluxo de caixa') || query.includes('patrimônio')) {
          
          response = `Posso gerar os seguintes relatórios para sua empresa:

**Relatórios disponíveis**:
- DRE (Demonstrativo de Resultado)
- Balanço Patrimonial
- Fluxo de Caixa
- Relatório Tributário
- Análise de Rentabilidade

Qual relatório você gostaria de visualizar? Posso personalizá-lo por período (mensal, trimestral ou anual).`;
        }
        // Module 6 - Tax calendar
        else if (query.includes('calendar') || query.includes('prazo') || query.includes('vencimento') || 
                 query.includes('obrigação') || query.includes('data')) {
          
          const currentMonth = new Date().toLocaleDateString('pt-BR', {month: 'long'});
          
          response = `Aqui está seu calendário de obrigações fiscais para ${currentMonth}:

**Próximos vencimentos**:
- 07/${new Date().getMonth() + 1}: FGTS
- 15/${new Date().getMonth() + 1}: PIS/COFINS
- 20/${new Date().getMonth() + 1}: ${userProfile.taxRegime === 'simples' ? 'DAS (Simples Nacional)' : 'IRPJ/CSLL (Estimativa)'}
- 25/${new Date().getMonth() + 1}: ${Math.random() > 0.5 ? 'IPI' : 'ICMS'}

Configurei notificações para lembrá-lo 3 dias antes de cada vencimento.

Gostaria de ver as obrigações de outro mês específico?`;
        }
        // Module 10 - Business intelligence
        else if (query.includes('previs') || query.includes('tendência') || query.includes('futur') ||
                query.includes('crescimento') || query.includes('risco') || query.includes('insight')) {
          
          response = `Analisei os dados históricos da sua empresa e identifiquei:

**Insights de negócio**:
- Crescimento médio: ${Math.floor(Math.random() * 15) + 2}% nos últimos 3 meses
- Principal categoria de custo: ${Math.random() > 0.5 ? 'Despesas Operacionais' : 'Folha de Pagamento'}
- Sazonalidade: ${Math.random() > 0.5 ? 'Maior demanda no segundo semestre' : 'Picos de receita no início de cada trimestre'}

**Recomendações**:
- ${Math.random() > 0.5 ? 'Considere renegociar contratos com fornecedores' : 'Avalie oportunidades de antecipação de recebíveis'}
- ${Math.random() > 0.5 ? 'Há potencial para redução de até 12% em custos fixos' : 'Análise sugere espaço para expansão sem aumento proporcional de custos'}

Gostaria que eu gerasse um relatório completo de projeções para os próximos 6 meses?`;
        }
        // Default response from knowledge base
        else {
          response = findBestResponse(userMessage.content, !!attachedFile);
        }
      }
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      // Show contextual toasts with more professional messaging
      if (Math.random() > 0.6) { // 40% chance to show a toast
        const toasts = [
          "Você pode agendar uma consultoria especializada para aprofundar este assunto.",
          "Verifique seus próximos vencimentos fiscais no calendário.",
          "Mantenha seus documentos fiscais organizados para facilitar declarações anuais.",
          "Considere fazer uma revisão tributária trimestral para otimizar impostos.",
          "Seu próximo pagamento de imposto está se aproximando. Verifique o calendário fiscal."
        ];
        
        toast.info(toasts[Math.floor(Math.random() * toasts.length)], {
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

