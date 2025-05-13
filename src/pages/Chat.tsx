
import { useState } from 'react';
import { MessageSquare, BookOpen, FileCog, Calculator, UserRound, FileBarChart2, CalendarClock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';
import AIChat from '@/components/AIChat';
import ContabilidadeAI from '@/components/ContabilidadeAI';

const Chat = () => {
  const [activeTab, setActiveTab] = useState('contabilidade');

  return (
    <DashboardLayout 
      title="Sistema Contábil Inteligente" 
      subtitle="Assistência fiscal, contábil e tributária com processamento automático"
      activeItem="chat"
    >
      <div className="relative">
        {/* Decorative elements for tech feel */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-16 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-brand-dark-blue/20 rounded-full blur-2xl"></div>
        
        {/* Circuit board pattern overlays */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMjBMMjAgME00MCAyMEwyMCAwTTAgMjBMMjAgNDBNNDAgMjBMMjAgNDAiLz48L2c+PC9zdmc+')]"></div>
        
        <Tabs defaultValue="contabilidade" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full justify-start bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-lg">
            <TabsTrigger value="contabilidade" className="flex items-center data-[state=active]:bg-brand-blue/90 data-[state=active]:shadow-md">
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>IA Contábil</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center data-[state=active]:bg-brand-blue/90 data-[state=active]:shadow-md">
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>Assistente Geral</span>
            </TabsTrigger>
            <TabsTrigger value="topics" className="flex items-center data-[state=active]:bg-brand-blue/90 data-[state=active]:shadow-md">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>Biblioteca Fiscal</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="contabilidade" className="mt-0">
            <div className="h-[600px] shadow-2xl rounded-lg overflow-hidden border border-gray-700/50 bg-gradient-to-b from-gray-900 to-brand-dark-blue backdrop-blur-md">
              <ContabilidadeAI />
            </div>
          </TabsContent>
          
          <TabsContent value="chat" className="mt-0">
            <div className="h-[600px] shadow-2xl rounded-lg overflow-hidden border border-gray-700/50 bg-gradient-to-b from-gray-900 to-brand-dark-blue backdrop-blur-md">
              <AIChat />
            </div>
          </TabsContent>
          
          <TabsContent value="topics" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TopicCard 
                icon={<FileCog />}
                title="Regularização Empresarial" 
                description="Constituição societária, elaboração de contratos, registro, obtenção de CNPJ e licenças."
                onClick={() => {
                  setActiveTab('contabilidade');
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
                description="Enquadramento tributário (Simples Nacional, Lucro Presumido, Lucro Real), otimização da carga tributária."
                onClick={() => {
                  setActiveTab('contabilidade');
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
                title="Contabilidade Digital" 
                description="Registro automatizado de operações financeiras, geração de demonstrativos contábeis e financeiros."
                onClick={() => {
                  setActiveTab('contabilidade');
                  setTimeout(() => {
                    document.querySelector('textarea')?.focus();
                    document.querySelector('textarea')?.setAttribute('value', 'Como automatizar a contabilidade da minha empresa?');
                    const event = new Event('change', { bubbles: true });
                    document.querySelector('textarea')?.dispatchEvent(event);
                  }, 100);
                }}
              />
              <TopicCard 
                icon={<FileCog />}
                title="Obrigações Fiscais" 
                description="Apuração automática de impostos, geração de guias, envio de declarações acessórias (DCTF, SPED, EFD)."
                onClick={() => {
                  setActiveTab('contabilidade');
                  setTimeout(() => {
                    document.querySelector('textarea')?.focus();
                    document.querySelector('textarea')?.setAttribute('value', 'Quais são as principais declarações fiscais que minha empresa precisa entregar?');
                    const event = new Event('change', { bubbles: true });
                    document.querySelector('textarea')?.dispatchEvent(event);
                  }, 100);
                }}
              />
              <TopicCard 
                icon={<UserRound />}
                title="Gestão de RH Integrada" 
                description="Processamento de folha de pagamento, admissão/demissão, cálculo de benefícios e encargos."
                onClick={() => {
                  setActiveTab('contabilidade');
                  setTimeout(() => {
                    document.querySelector('textarea')?.focus();
                    document.querySelector('textarea')?.setAttribute('value', 'Como automatizar a folha de pagamento da minha empresa?');
                    const event = new Event('change', { bubbles: true });
                    document.querySelector('textarea')?.dispatchEvent(event);
                  }, 100);
                }}
              />
              <TopicCard 
                icon={<CalendarClock />}
                title="Análise Financeira Avançada" 
                description="Relatórios de desempenho, projeções de fluxo de caixa, indicadores financeiros e recomendações estratégicas."
                onClick={() => {
                  setActiveTab('contabilidade');
                  setTimeout(() => {
                    document.querySelector('textarea')?.focus();
                    document.querySelector('textarea')?.setAttribute('value', 'Como elaborar projeções financeiras com base nos dados contábeis?');
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

// Helper component for topic cards with updated design
interface TopicCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const TopicCard = ({ icon, title, description, onClick }: TopicCardProps) => {
  return (
    <Card 
      className="p-4 hover:shadow-xl transition-all duration-300 cursor-pointer border-gray-700/30 bg-gradient-to-br from-gray-900 to-brand-dark-blue backdrop-blur-sm hover:translate-y-[-3px] hover:border-brand-cyan/30"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="mt-1 p-2 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-md text-white">
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
