
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AIChat from '@/components/AIChat';
import Footer from '@/components/Footer';
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
      <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="chat" className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>Chat</span>
          </TabsTrigger>
          <TabsTrigger value="topics" className="flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>Tópicos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-0">
          <div className="h-[600px] shadow-lg rounded-lg overflow-hidden border border-gray-200">
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
      className="p-4 hover:shadow-md transition-shadow cursor-pointer border-gray-200"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="mt-1 p-2 bg-brand-light-blue rounded-full text-brand-blue">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default Chat;
