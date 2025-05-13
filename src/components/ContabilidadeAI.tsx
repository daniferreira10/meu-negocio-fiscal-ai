
import { useState, useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { findBestResponse, getDevelopmentInfo, developmentPlan } from '@/services/chatService';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizonal, Paperclip, AlertCircle, BarChart2, Info, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const ContabilidadeAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou a IA Contábil especializada para sua empresa. Como posso ajudar hoje? Estou pronta para responder suas dúvidas sobre contabilidade, impostos e obrigações fiscais.',
      metadata: {
        category: 'general',
        suggestionType: 'general'
      }
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachmentDialogOpen, setAttachmentDialogOpen] = useState(false);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState(developmentPlan[0]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAttachment(file);
    }
    setAttachmentDialogOpen(false);
  };
  
  // Process attachment
  const processAttachment = (file: File) => {
    const fileType = file.type;
    const fileName = file.name;
    
    // Simulate file processing
    setLoading(true);
    
    const newUserMessage: Message = {
      role: 'user',
      content: `Análise do documento: ${fileName}`,
      attachment: {
        name: fileName,
        type: fileType
      }
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Simulate AI processing time
    setTimeout(() => {
      // Get response based on file type
      let responseContent = '';
      let suggestionType: 'tax' | 'document' | 'financial' | 'compliance' | 'general' = 'document';
      
      if (fileType.includes('pdf')) {
        responseContent = findBestResponse("analisar documento fiscal", true);
        suggestionType = 'document';
      } else if (fileType.includes('image')) {
        responseContent = findBestResponse("analisar comprovante", true);
        suggestionType = 'financial';
      } else if (fileType.includes('excel') || fileType.includes('sheet')) {
        responseContent = findBestResponse("analisar dados financeiros", true);
        suggestionType = 'financial';
      } else {
        responseContent = "Analisei seu documento. Este formato não é ideal para extração automática de dados. Recomendo enviar documentos nos formatos PDF, imagem ou planilha para melhores resultados.";
        suggestionType = 'general';
      }
      
      const newAIMessage: Message = {
        role: 'assistant',
        content: responseContent,
        metadata: {
          category: 'document_analysis',
          confidence: 0.85,
          processingTime: 2.3,
          suggestionType
        }
      };
      
      setMessages(prev => [...prev, newAIMessage]);
      setLoading(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 3000);
  };
  
  // Handle send message
  const handleSendMessage = () => {
    if (!input.trim() || loading) return;
    
    // Create new user message
    const newUserMessage: Message = {
      role: 'user',
      content: input
    };
    
    // Add user message to chat
    setMessages(prev => [...prev, newUserMessage]);
    
    // Clear input
    setInput('');
    
    // Set loading state
    setLoading(true);
    
    // Process user input and generate AI response
    setTimeout(() => {
      let responseContent = '';
      let suggestionType: 'tax' | 'document' | 'financial' | 'compliance' | 'general' | 'development' = 'general';
      let category = 'general';
      
      // Check if the query is about the development plan
      if (input.toLowerCase().includes('plano') || 
          input.toLowerCase().includes('desenvolvimento') || 
          input.toLowerCase().includes('fase') || 
          input.toLowerCase().includes('progresso') || 
          input.toLowerCase().includes('status')) {
        responseContent = getDevelopmentInfo(input);
        suggestionType = 'development';
        category = 'development_plan';
      } else {
        responseContent = findBestResponse(input);
        
        // Determine category and suggestion type based on input keywords
        if (input.toLowerCase().includes('imposto') || input.toLowerCase().includes('tributo')) {
          suggestionType = 'tax';
          category = 'tax_consultation';
        } else if (input.toLowerCase().includes('balanço') || input.toLowerCase().includes('financeiro')) {
          suggestionType = 'financial';
          category = 'financial_analysis';
        } else if (input.toLowerCase().includes('obrigação') || input.toLowerCase().includes('declaração')) {
          suggestionType = 'compliance';
          category = 'compliance_consultation';
        }
      }
      
      // Create AI response message
      const newAIMessage: Message = {
        role: 'assistant',
        content: responseContent,
        metadata: {
          category,
          confidence: 0.92,
          processingTime: 1.5,
          suggestionType
        }
      };
      
      // Add AI response to chat
      setMessages(prev => [...prev, newAIMessage]);
      
      // End loading state
      setLoading(false);
    }, 2000);
  };

  // Show development plan details
  const showPlanDetails = (phase: number) => {
    const selectedPhaseData = developmentPlan.find(p => p.phase === phase) || developmentPlan[0];
    setSelectedPhase(selectedPhaseData);
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-4 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-brand-blue text-white rounded-br-none' 
                  : 'bg-gray-800 text-white border border-gray-700 rounded-bl-none'
              }`}
            >
              {/* Attachment preview */}
              {message.attachment && (
                <div className="mb-2 p-2 rounded bg-gray-700 text-sm flex items-center">
                  <Paperclip className="h-4 w-4 mr-2" />
                  <span>{message.attachment.name}</span>
                </div>
              )}
              
              {/* Message content with metadata styling */}
              <div>
                <div className="whitespace-pre-wrap">
                  {message.content.split('\n').map((line, i) => (
                    <div key={i}>
                      {line.startsWith('**') && line.endsWith('**') ? (
                        <strong className="text-brand-cyan">
                          {line.substring(2, line.length - 2)}
                        </strong>
                      ) : line.startsWith('- ') ? (
                        <div className="pl-2 border-l-2 border-brand-cyan/50">
                          {line}
                        </div>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Metadata badges for AI messages */}
                {message.role === 'assistant' && message.metadata && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.metadata.suggestionType && (
                      <span className={`text-xs px-2 py-1 rounded ${
                        message.metadata.suggestionType === 'tax' 
                          ? 'bg-amber-700/30 text-amber-200' 
                          : message.metadata.suggestionType === 'financial'
                          ? 'bg-emerald-700/30 text-emerald-200'
                          : message.metadata.suggestionType === 'document'
                          ? 'bg-purple-700/30 text-purple-200'
                          : message.metadata.suggestionType === 'compliance'
                          ? 'bg-red-700/30 text-red-200'
                          : message.metadata.suggestionType === 'development'
                          ? 'bg-blue-700/30 text-blue-200'
                          : 'bg-gray-700/50 text-gray-300'
                      }`}>
                        {message.metadata.suggestionType === 'tax' && '💰 Fiscal'}
                        {message.metadata.suggestionType === 'financial' && '📊 Financeiro'}
                        {message.metadata.suggestionType === 'document' && '📄 Documento'}
                        {message.metadata.suggestionType === 'compliance' && '⚖️ Conformidade'}
                        {message.metadata.suggestionType === 'development' && '🔧 Desenvolvimento'}
                        {message.metadata.suggestionType === 'general' && '💬 Geral'}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-4 rounded-lg bg-gray-800 text-white border border-gray-700 rounded-bl-none">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Reference to scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="outline"
            className="shrink-0" 
            onClick={() => setAttachmentDialogOpen(true)}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Button 
            size="icon" 
            variant="outline"
            className="shrink-0"
            onClick={() => setPlanDialogOpen(true)}
          >
            <Info className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Textarea 
              placeholder="Digite sua pergunta sobre contabilidade, impostos ou obrigações fiscais..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[60px] resize-none pr-10 bg-gray-800 border-gray-700"
              onEnterPressed={handleSendMessage}
            />
            <Button 
              size="icon" 
              variant="ghost"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-brand-blue hover:text-brand-cyan hover:bg-transparent"
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
            >
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Attachment Dialog */}
      <Dialog open={attachmentDialogOpen} onOpenChange={setAttachmentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar documento</DialogTitle>
            <DialogDescription>
              Envie comprovantes, notas fiscais, extratos ou outros documentos para análise automática.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="file-upload" className="block text-sm font-medium">
                Selecione um arquivo
              </label>
              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-800 file:text-white
                  hover:file:bg-gray-700"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500">
                Formatos suportados: PDF, PNG, JPEG, Excel, CSV
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Development Plan Dialog */}
      <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Plano de Desenvolvimento da IA Contábil</DialogTitle>
            <DialogDescription>
              Este plano estruturado divide o desenvolvimento da plataforma em fases para garantir uma implementação organizada e eficiente.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="phase1" onClick={() => showPlanDetails(1)}>Fase 1</TabsTrigger>
              <TabsTrigger value="phase2" onClick={() => showPlanDetails(2)}>Fase 2</TabsTrigger>
              <TabsTrigger value="phase3" onClick={() => showPlanDetails(3)}>Fase 3</TabsTrigger>
              <TabsTrigger value="phase4" onClick={() => showPlanDetails(4)}>Fase 4</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Progresso Geral</h3>
                  <div className="space-y-4">
                    {developmentPlan.map((phase) => (
                      <div key={phase.phase} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Fase {phase.phase}: {phase.title}</span>
                          <span>{phase.progressPercentage}%</span>
                        </div>
                        <Progress value={phase.progressPercentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-gray-800 border-gray-700">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-brand-cyan" />
                      Próximos Passos
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <div className="h-5 w-5 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs">1</div>
                        <span>Completar validações de entrada em formulários</span>
                      </li>
                      <li className="flex gap-2">
                        <div className="h-5 w-5 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs">2</div>
                        <span>Finalizar endpoints para processamento de cadastro</span>
                      </li>
                      <li className="flex gap-2">
                        <div className="h-5 w-5 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs">3</div>
                        <span>Iniciar ajustes no modelo de banco de dados</span>
                      </li>
                    </ul>
                  </Card>
                  
                  <Card className="p-4 bg-gray-800 border-gray-700">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <BarChart2 className="h-4 w-4 text-brand-cyan" />
                      Métricas do Projeto
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="flex justify-between">
                          <span>Tarefas Concluídas</span>
                          <span>4/28</span>
                        </div>
                        <Progress value={(4/28)*100} className="h-1.5 mt-1" />
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span>Progresso Geral</span>
                          <span>14%</span>
                        </div>
                        <Progress value={14} className="h-1.5 mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-1 mt-2">
                        <div className="bg-gray-700 p-2 rounded">
                          <div className="text-xs text-gray-400">Tarefas Abertas</div>
                          <div className="font-medium">24</div>
                        </div>
                        <div className="bg-gray-700 p-2 rounded">
                          <div className="text-xs text-gray-400">Em Progresso</div>
                          <div className="font-medium">3</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Visão Geral das Fases</h3>
                  <div className="space-y-3">
                    {developmentPlan.map((phase) => (
                      <Card key={phase.phase} className="p-4 bg-gray-800 border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Fase {phase.phase}: {phase.title}</h4>
                          <span className={`px-2 py-1 rounded text-xs ${
                            phase.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                            phase.status === 'in_progress' ? 'bg-amber-600/20 text-amber-400' :
                            'bg-gray-600/20 text-gray-400'
                          }`}>
                            {phase.status === 'completed' ? 'Concluído' :
                             phase.status === 'in_progress' ? 'Em andamento' :
                             'Não iniciado'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{phase.description}</p>
                        <div className="text-xs text-gray-400">
                          Seções: {phase.sections.length} | 
                          Tarefas: {phase.sections.reduce((acc, section) => acc + section.tasks.length, 0)}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value={`phase${selectedPhase.phase}`}>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium">Fase {selectedPhase.phase}: {selectedPhase.title}</h3>
                    <p className="text-gray-400">{selectedPhase.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Exportar Plano
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Progresso da Fase</h4>
                  <div className="flex items-center gap-3">
                    <Progress value={selectedPhase.progressPercentage} className="h-2 flex-1" />
                    <span className="text-sm font-medium min-w-[45px] text-right">{selectedPhase.progressPercentage}%</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {selectedPhase.sections.map((section) => (
                    <Card key={section.id} className="p-4 bg-gray-800 border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{section.id} {section.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${
                          section.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                          section.status === 'in_progress' ? 'bg-amber-600/20 text-amber-400' :
                          'bg-gray-600/20 text-gray-400'
                        }`}>
                          {section.status === 'completed' ? 'Concluído' :
                           section.status === 'in_progress' ? 'Em andamento' :
                           'Não iniciado'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">{section.description}</p>
                      
                      <h5 className="font-medium text-sm mb-2">Tarefas:</h5>
                      <ul className="space-y-2">
                        {section.tasks.map((task, i) => (
                          <li key={i} className="flex gap-3 items-center">
                            <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                              task.completed ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'
                            }`}>
                              {task.completed ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <span className="text-xs">{i+1}</span>
                              )}
                            </div>
                            <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
                              {task.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContabilidadeAI;
