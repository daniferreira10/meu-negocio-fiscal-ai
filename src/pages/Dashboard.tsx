
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  DollarSign, 
  Settings, 
  LogOut, 
  Plus, 
  Calendar,
  MessageSquare,
  User
} from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import TransactionForm from '@/components/TransactionForm';
import AIChat from '@/components/AIChat';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-20 md:w-64 min-h-screen bg-white shadow-md flex flex-col fixed">
          <div className="p-4 border-b border-gray-100">
            <Link to="/" className="text-xl font-bold text-brand-blue hidden md:flex items-center">
              <span className="text-brand-blue">Prime</span>
              <span className="text-brand-dark">Dask</span>
            </Link>
            <div className="md:hidden flex justify-center">
              <span className="text-xl font-bold text-brand-green">P</span>
            </div>
          </div>
          
          <nav className="flex-1 py-6">
            <ul className="space-y-1">
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === 'overview' ? 'bg-brand-light-blue text-brand-blue' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <Home className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Visão Geral</span>
                </Button>
              </li>
              <li>
                <Link to="/client-registration">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600"
                  >
                    <User className="h-5 w-5 md:mr-2" />
                    <span className="hidden md:inline">Cadastros</span>
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === 'transactions' ? 'bg-brand-light-blue text-brand-blue' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('transactions')}
                >
                  <Plus className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Nova Transação</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === 'reports' ? 'bg-brand-light-blue text-brand-blue' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('reports')}
                >
                  <FileText className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Relatórios</span>
                </Button>
              </li>
              <li>
                <Link to="/tax-management">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600"
                  >
                    <DollarSign className="h-5 w-5 md:mr-2" />
                    <span className="hidden md:inline">Impostos</span>
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === 'ai-assistant' ? 'bg-brand-light-blue text-brand-blue' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('ai-assistant')}
                >
                  <MessageSquare className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Assistente IA</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === 'calendar' ? 'bg-brand-light-blue text-brand-blue' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('calendar')}
                >
                  <Calendar className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Calendário Fiscal</span>
                </Button>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-100">
            <ul className="space-y-1">
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600"
                >
                  <User className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Meu Perfil</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600"
                >
                  <Settings className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Configurações</span>
                </Button>
              </li>
              <li>
                <Link to="/">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600"
                  >
                    <LogOut className="h-5 w-5 md:mr-2" />
                    <span className="hidden md:inline">Sair</span>
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-20 md:ml-64 w-full min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-brand-dark">
                  {activeTab === 'overview' && 'Dashboard'}
                  {activeTab === 'transactions' && 'Nova Transação'}
                  {activeTab === 'reports' && 'Relatórios'}
                  {activeTab === 'taxes' && 'Impostos e Obrigações'}
                  {activeTab === 'ai-assistant' && 'Assistente IA'}
                  {activeTab === 'calendar' && 'Calendário Fiscal'}
                </h1>
                <p className="text-gray-500">Empresa: Minha Empresa LTDA - CNPJ: 00.000.000/0001-00</p>
              </div>
              {activeTab === 'overview' && (
                <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">
                  Analisar com IA
                </Button>
              )}
            </div>

            {/* Dashboard Content */}
            {activeTab === 'overview' && (
              <Dashboard />
            )}

            {/* Transactions Form */}
            {activeTab === 'transactions' && (
              <TransactionForm />
            )}

            {/* Reports */}
            {activeTab === 'reports' && (
              <Card className="p-6">
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
              </Card>
            )}

            {/* Taxes */}
            {activeTab === 'taxes' && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-brand-dark mb-6">Impostos e Obrigações</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link to="/tax-management" className="block">
                    <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-lg py-8">
                      Calculadora de Impostos
                    </Button>
                  </Link>
                  <Link to="/tax-management?tab=generator" className="block">
                    <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-lg py-8">
                      Gerador de Guias
                    </Button>
                  </Link>
                </div>
              </Card>
            )}

            {/* AI Assistant */}
            {activeTab === 'ai-assistant' && (
              <div className="h-[calc(100vh-12rem)]">
                <AIChat />
              </div>
            )}

            {/* Calendar */}
            {activeTab === 'calendar' && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-brand-dark mb-6">Calendário Fiscal</h2>
                <Link to="/tax-management?tab=schedule" className="block">
                  <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white mb-6">
                    Ver Calendário Fiscal Completo
                  </Button>
                </Link>
                <div className="bg-gray-50 p-6 rounded-md">
                  <h3 className="text-lg font-semibold mb-4">Próximos Vencimentos:</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded shadow-sm border-l-4 border-amber-500">
                      <p className="font-bold text-lg">10 de Maio</p>
                      <p className="text-gray-600">ISS</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded shadow-sm border-l-4 border-amber-500">
                      <p className="font-bold text-lg">15 de Maio</p>
                      <p className="text-gray-600">ICMS</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded shadow-sm border-l-4 border-amber-500">
                      <p className="font-bold text-lg">20 de Maio</p>
                      <p className="text-gray-600">DAS (Simples Nacional)</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
