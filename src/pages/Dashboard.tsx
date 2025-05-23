
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import LivroCaixa from '@/components/LivroCaixa';
import EmitirDAS from '@/components/EmitirDAS';
import CalcularIR from '@/components/CalcularIR';
import AnaliseFiscal from '@/components/AnaliseFiscal';
import PrevisaoImpostos from '@/components/PrevisaoImpostos';
import RelatorioInteligente from '@/components/RelatorioInteligente';
import UserProfileForm from '@/components/UserProfileForm';
import { 
  BookOpen, 
  FileCheck, 
  Calculator, 
  PieChart, 
  TrendingUp, 
  FileText, 
  ArrowRight, 
  AlertCircle,
  Calendar,
  PlusCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [accountType, setAccountType] = useState('cpf');
  const [step, setStep] = useState('init');
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    setStep('collect');
  };

  const handleSubmitData = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('ai');
  };

  const handleModuleSelect = (module: string) => {
    setActiveModule(module);
  };

  const handleCloseModule = () => {
    setActiveModule(null);
  };

  // Mock próximos vencimentos
  const proximosVencimentos = [
    { name: "DAS - Simples Nacional", date: "20/06/2023", status: "pendente" },
    { name: "IRPF - Carnê-leão", date: "30/06/2023", status: "pendente" },
    { name: "DARF IRPJ", date: "29/06/2023", status: "pendente" }
  ];

  // Mock dados financeiros
  const dadosFinanceiros = {
    receitaMensal: 12000,
    despesasMensal: 7500,
    liquidoMensal: 4500,
    impostosMensal: 1380
  };

  return (
    <DashboardLayout 
      activeItem="dashboard" 
      title="IA Contábil" 
      subtitle="Contabilidade automatizada com Inteligência Artificial"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        {activeModule === 'livro-caixa' ? (
          <LivroCaixa onClose={handleCloseModule} />
        ) : activeModule === 'emitir-das' ? (
          <EmitirDAS onClose={handleCloseModule} />
        ) : activeModule === 'calcular-ir' ? (
          <CalcularIR onClose={handleCloseModule} />
        ) : activeModule === 'analise-fiscal' ? (
          <AnaliseFiscal onClose={handleCloseModule} />
        ) : activeModule === 'previsao-impostos' ? (
          <PrevisaoImpostos onClose={handleCloseModule} />
        ) : activeModule === 'relatorio-inteligente' ? (
          <RelatorioInteligente onClose={handleCloseModule} />
        ) : activeModule === 'profile' ? (
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setActiveModule(null)}
              className="mb-4"
            >
              ← Voltar
            </Button>
            <UserProfileForm />
          </div>
        ) : (
          <>
            {/* Welcome Banner */}
            <Card className="bg-gradient-to-r from-brand-blue to-blue-600 text-white mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Bem-vindo à PrimeDask</h2>
                    <p className="mb-4">
                      Sua contabilidade automatizada com Inteligência Artificial especializada
                    </p>
                  </div>
                  <Button 
                    className="bg-white text-brand-blue hover:bg-white/90 mt-3 md:mt-0"
                    onClick={() => navigate('/client-information')}
                  >
                    Cadastrar Informações Contábeis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Left Column - Próximos Vencimentos */}
              <Card className="col-span-1 md:row-span-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">
                      Próximos Vencimentos
                    </CardTitle>
                    <Calendar className="h-5 w-5 text-gray-500" />
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    {proximosVencimentos.map((item, i) => (
                      <div key={i} className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Vence em {item.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                          <span className="text-xs text-orange-500 font-medium">Pendente</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    Ver todos os vencimentos
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Middle Column - Resumo Financeiro */}
              <Card className="col-span-1 md:col-span-2 row-span-1">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">
                      Resumo Financeiro Mensal
                    </CardTitle>
                    <PieChart className="h-5 w-5 text-gray-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Receita</p>
                      <p className="text-xl font-bold text-green-600">
                        R$ {dadosFinanceiros.receitaMensal.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Despesas</p>
                      <p className="text-xl font-bold text-red-600">
                        R$ {dadosFinanceiros.despesasMensal.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Líquido</p>
                      <p className="text-xl font-bold text-blue-600">
                        R$ {dadosFinanceiros.liquidoMensal.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Impostos</p>
                      <p className="text-xl font-bold text-purple-600">
                        R$ {dadosFinanceiros.impostosMensal.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Ver relatório completo
                  </Button>
                </CardFooter>
              </Card>

              {/* Right Column - Ações Rápidas */}
              <Card className="col-span-1 md:col-span-2 row-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center h-auto py-3 gap-2"
                      onClick={() => handleModuleSelect('livro-caixa')}
                    >
                      <BookOpen className="h-5 w-5" />
                      <span className="text-xs">Livro Caixa</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center h-auto py-3 gap-2"
                      onClick={() => handleModuleSelect('emitir-das')}
                    >
                      <FileCheck className="h-5 w-5" />
                      <span className="text-xs">DAS Simples</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center h-auto py-3 gap-2"
                      onClick={() => handleModuleSelect('calcular-ir')}
                    >
                      <Calculator className="h-5 w-5" />
                      <span className="text-xs">IRPF/IRPJ</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center h-auto py-3 gap-2"
                      onClick={() => handleModuleSelect('analise-fiscal')}
                    >
                      <PieChart className="h-5 w-5" />
                      <span className="text-xs">Análise Fiscal</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center h-auto py-3 gap-2"
                      onClick={() => handleModuleSelect('previsao-impostos')}
                    >
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-xs">Previsão</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center h-auto py-3 gap-2"
                      onClick={() => handleModuleSelect('relatorio-inteligente')}
                    >
                      <FileText className="h-5 w-5" />
                      <span className="text-xs">Relatórios</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Clientes Recentes */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">
                    Meus Clientes
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => navigate('/client-registration')}
                  >
                    <PlusCircle className="h-4 w-4" /> Novo Cliente
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Ainda não há clientes registrados. Adicione seu primeiro cliente para começar.
                </p>
                <Button onClick={() => navigate('/client-registration')}>
                  Cadastrar Cliente
                </Button>
              </CardContent>
            </Card>
            
            {/* Serviços da Plataforma */}
            <Card>
              <CardHeader>
                <CardTitle>Serviços PrimeDask</CardTitle>
                <CardDescription>
                  Explore os recursos de IA Contábil disponíveis na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Análise Contábil Automatizada</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Diagnóstico fiscal automatizado com identificação de riscos e oportunidades de economia.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" size="sm" className="p-0">Saiba mais</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Chat com Especialista IA</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Tire dúvidas sobre contabilidade, legislação fiscal e tributária com nossa IA especializada.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" size="sm" className="p-0" onClick={() => navigate('/chat')}>Acessar Chat</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Documentos Automáticos</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Geração de livros fiscais, DARFs e guias de pagamento com apenas alguns cliques.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" size="sm" className="p-0" onClick={() => navigate('/documents')}>Ver Documentos</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
