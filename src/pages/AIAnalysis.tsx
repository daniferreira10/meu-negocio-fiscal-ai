
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, TrendingUp, BarChart4, PieChart, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const AIAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate AI analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisCompleted(true);
      toast.success("Análise financeira concluída com sucesso!");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout 
      activeItem="dashboard" 
      title="Análise Financeira com IA" 
      subtitle="Insights automatizados sobre seus dados financeiros"
      actions={
        <Link to="/dashboard">
          <Button variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </Link>
      }
    >
      {isAnalyzing ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-blue"></div>
            <h2 className="text-2xl font-bold text-brand-dark">Analisando seus dados financeiros</h2>
            <p className="text-gray-600">Nosso assistente de IA está processando suas informações. Isso pode levar alguns segundos.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-r from-brand-light-blue to-white">
            <div className="flex items-start">
              <div className="p-3 bg-brand-blue rounded-full mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-brand-dark">Resumo da Análise Financeira</h2>
                <p className="text-gray-600 mt-1">
                  Com base nos dados financeiros dos últimos 6 meses, sua empresa demonstra um crescimento 
                  de receita consistente, com aumento de 14% na receita média mensal e redução de 3% nas 
                  despesas operacionais. Veja abaixo detalhes específicos.
                </p>
              </div>
            </div>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="revenue">Receitas</TabsTrigger>
              <TabsTrigger value="expenses">Despesas</TabsTrigger>
              <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Principais Insights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="p-1 bg-green-100 rounded-full mr-2 mt-0.5">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <p>Crescimento consistente de receitas nos últimos 3 meses.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 bg-blue-100 rounded-full mr-2 mt-0.5">
                      <BarChart4 className="w-4 h-4 text-blue-600" />
                    </div>
                    <p>Margem de lucro de 31.8%, acima da média do setor (27.5%).</p>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 bg-yellow-100 rounded-full mr-2 mt-0.5">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    </div>
                    <p>Alerta: Gastos com marketing aumentaram 15% sem crescimento proporcional nas receitas.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 bg-purple-100 rounded-full mr-2 mt-0.5">
                      <PieChart className="w-4 h-4 text-purple-600" />
                    </div>
                    <p>Oportunidade: Redução de 23% em custos administrativos através de automação.</p>
                  </li>
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-4 mt-4">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Análise de Receitas</h3>
                <p className="text-gray-600 mb-4">
                  Suas receitas têm crescido consistentemente, com uma taxa média de crescimento mensal de 5.2%.
                </p>
                <div className="h-60 bg-gray-50 flex items-center justify-center border rounded-md">
                  <p className="text-gray-400">Gráfico de evolução de receitas</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-4 mt-4">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Análise de Despesas</h3>
                <p className="text-gray-600 mb-4">
                  Suas despesas estão concentradas em salários (45%), aluguel (20%), insumos (15%) e marketing (10%).
                </p>
                <div className="h-60 bg-gray-50 flex items-center justify-center border rounded-md">
                  <p className="text-gray-400">Gráfico de composição de despesas</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4 mt-4">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Recomendações da IA</h3>
                <ul className="space-y-4">
                  <li className="p-4 border rounded-md bg-brand-light-blue/20">
                    <h4 className="font-medium text-brand-dark">Renegociar contratos com fornecedores</h4>
                    <p className="text-gray-600 mt-1">
                      Identificamos potencial economia de até 12% nos custos de insumos através de renegociação de contratos.
                    </p>
                  </li>
                  <li className="p-4 border rounded-md bg-green-50">
                    <h4 className="font-medium text-brand-dark">Otimizar estratégia de marketing</h4>
                    <p className="text-gray-600 mt-1">
                      Realocar 30% do orçamento de marketing para canais digitais com melhor ROI.
                    </p>
                  </li>
                  <li className="p-4 border rounded-md bg-amber-50">
                    <h4 className="font-medium text-brand-dark">Planejar expansão de serviços</h4>
                    <p className="text-gray-600 mt-1">
                      Com base no fluxo de caixa atual, há capacidade para investir em novos serviços no próximo trimestre.
                    </p>
                  </li>
                </ul>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AIAnalysis;
