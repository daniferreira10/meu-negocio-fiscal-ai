
import { useState } from 'react';
import AIChat from '@/components/AIChat';
import { MessageSquare, BookOpen, FileCog, Calculator, UserRound, FileBarChart2, CalendarClock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';

const Chat = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <DashboardLayout 
      title="Assistente Contábil com IA" 
      subtitle="Tire suas dúvidas sobre contabilidade, impostos e obrigações fiscais"
      activeItem="chat"
    >
      <div className="relative">
        {/* Decorative elements for tech feel */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-brand-cyan/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-16 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl"></div>
        
        <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full justify-start bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-lg">
            <TabsTrigger value="chat" className="flex items-center data-[state=active]:bg-brand-blue">
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="topics" className="flex items-center data-[state=active]:bg-brand-blue">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>Tópicos</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-0">
            <div className="h-[600px] shadow-2xl rounded-lg overflow-hidden border border-gray-700/50 bg-gradient-to-b from-gray-900/50 to-brand-dark-blue/50 backdrop-blur-md">
              <AIChat />
            </div>
          </TabsContent>
          
          <TabsContent value="topics" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TopicCard 
                icon={<FileCog />}
                title="Abertura e Regularização de Empresas" 
                description="Escolha do tipo societário, elaboração de contratos, registro na junta comercial, obtenção de CNPJ e licenças."
                onClick={() => {
                  setActiveTab('chat');
                  setTimeout(() => {
                    document.querySelector('textarea')?.focus();
                    document.querySelector('textarea')?.setAttribute('value', 'Como funciona o processo de abertura de uma empresa?');
                    const event = new Event('change', { bubbles: true });
                    document.querySelector('textarea')?.dispatchEvent(event);
                  }, 100);
                }}
              />
              <TopicCard 
                icon={<Calculator />}
                title="Planejamento Tributário" 
                description="Enquadramento no regime ideal (Simples Nacional, Lucro Presumido, Lucro Real), redução legal da carga tributária."
                onClick={() => {
                  setActiveTab('chat');
                  setTimeout(() => {
                    document.querySelector('textarea')?.focus();
                    document.querySelector('textarea')?.setAttribute('value', 'Qual o melhor regime tributário para minha empresa?');
                    const event = new Event('change', { bubbles: true });
                    document.querySelector('textarea')?.dispatchEvent(event);
                  }, 100);
                }}
              />
              <TopicCard 
                icon={<FileBarChart2 />}
                title="Escrituração Contábil" 
                description="Registro de movimentações financeiras, elaboração de balanço patrimonial e demonstrativos de resultado."
                onClick={() => {
                  setActiveTab('chat');
                  setTimeout(() => {
                    document.querySelector('textarea')?.focus();
                    document.querySelector('textarea')?.setAttribute('value', 'Por que preciso de contabilidade para minha empresa?');
                    const event = new Event('change', { bubbles: true });
                    document.querySelector('textarea')?.dispatchEvent(event);
                  }, 100);
                }}
              />
              <TopicCard 
                icon={<FileCog />}
                title="Obrigações Fiscais" 
                description="Apuração e cálculo de impostos, geração de guias, entrega de declarações acessórias."
                onClick={() => {
                  setActiveTab('chat');
                  setTimeout(() => {
                    document.querySelector('textarea')?.focus();
                    document.querySelector('textarea')?.setAttribute('value', 'Quais são as principais declarações que minha empresa precisa entregar?');
                    const event = new Event('change', { bubbles: true });
                    document.querySelector('textarea')?.dispatchEvent(event);
                  }, 100);
                }}
              />
              <TopicCard 
                icon={<UserRound />}
                title="Departamento Pessoal" 
                description="Admissão e demissão de funcionários, folha de pagamento, cálculo de encargos e obrigações trabalhistas."
                onClick={() => {
                  setActiveTab('chat');
                  setTimeout(() => {
                    document.querySelector('textarea')?.focus();
                    document.querySelector('textarea')?.setAttribute('value', 'Quais documentos preciso para contratar um funcionário?');
                    const event = new Event('change', { bubbles: true });
                    document.querySelector('textarea')?.dispatchEvent(event);
                  }, 100);
                }}
              />
              <TopicCard 
                icon={<CalendarClock />}
                title="Assessoria e Obrigações Anuais" 
                description="Análise de fluxo de caixa, relatórios de desempenho, declarações anuais e planejamento financeiro."
                onClick={() => {
                  setActiveTab('chat');
                  setTimeout(() => {
                    document.querySelector('textarea')?.focus();
                    document.querySelector('textarea')?.setAttribute('value', 'Como elaborar um fluxo de caixa eficiente?');
                    const event = new Event('change', { bubbles: true });
                    document.querySelector('textarea')?.dispatchEvent(event);
                  }, 100);
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Helper component for topic cards
interface TopicCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const TopicCard = ({ icon, title, description, onClick }: TopicCardProps) => {
  return (
    <Card 
      className="p-4 hover:shadow-xl transition-all duration-300 cursor-pointer border-gray-700/30 bg-gradient-to-br from-gray-900/80 to-brand-dark-blue/80 backdrop-blur-sm hover:translate-y-[-3px] hover:border-brand-cyan/30"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="mt-1 p-2 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-full text-white">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-300 mt-1">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default Chat;
