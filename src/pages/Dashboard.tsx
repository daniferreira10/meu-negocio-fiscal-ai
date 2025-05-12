import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import TransactionForm from '@/components/TransactionForm';
import AIChat from '@/components/AIChat';
import DashboardLayout from '@/components/DashboardLayout';
const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const renderActions = () => {
    if (activeTab === 'overview') {
      return <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">
          <TrendingUp className="w-4 h-4 mr-2" />
          Analisar com IA
        </Button>;
    }
    return null;
  };
  const getTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Dashboard';
      case 'transactions':
        return 'Nova Transação';
      case 'reports':
        return 'Relatórios';
      case 'ai-assistant':
        return 'Assistente IA';
      case 'calendar':
        return 'Calendário Fiscal';
      default:
        return 'Dashboard';
    }
  };
  const getSubtitle = () => {
    return 'Empresa: Minha Empresa LTDA - CNPJ: 00.000.000/0001-00';
  };
  return <DashboardLayout activeItem="dashboard" title={getTitle()} subtitle={getSubtitle()} actions={renderActions()}>
      {/* Dashboard tabs */}
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="transactions">Nova Transação</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="ai-assistant">Assistente IA</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Dashboard Content */}
      {activeTab === 'overview' && <Dashboard />}

      {/* Transactions Form */}
      {activeTab === 'transactions' && <TransactionForm />}

      {/* Reports */}
      {activeTab === 'reports' && <Card className="p-6">
          <h2 className="text-xl font-bold text-brand-dark mb-6">Relatórios Contábeis</h2>
          <Tabs defaultValue="dre">
            <TabsList className="mb-6">
              <TabsTrigger value="dre">DRE</TabsTrigger>
              <TabsTrigger value="balanco">Balanço</TabsTrigger>
              <TabsTrigger value="fluxo">Fluxo de Caixa</TabsTrigger>
            </TabsList>
            <TabsContent value="dre" className="space-y-4">
              <p className="text-gray-600">
                Esta é a Demonstração de Resultado do Exercício de sua empresa.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-center text-gray-500 italic">Funcionalidade disponível apenas no plano Premium</p>
              </div>
            </TabsContent>
            <TabsContent value="balanco" className="space-y-4">
              <p className="text-gray-600">
                Este é o Balanço Patrimonial de sua empresa.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-center text-gray-500 italic">Funcionalidade disponível apenas no plano Premium</p>
              </div>
            </TabsContent>
            <TabsContent value="fluxo" className="space-y-4">
              <p className="text-gray-600">
                Este é o Fluxo de Caixa de sua empresa.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-center text-gray-500 italic">Funcionalidade disponível apenas no plano Premium</p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>}

      {/* AI Assistant */}
      {activeTab === 'ai-assistant' && <div className="h-[calc(100vh-12rem)]">
          <AIChat />
        </div>}
    </DashboardLayout>;
};
export default DashboardPage;