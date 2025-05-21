
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { preverImpostos, getSampleTaxPredictionData } from '@/utils/financeUtils';
import { TaxPredictionData, TaxPredictionResult } from '@/types/chat';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { CalendarDays, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface PrevisaoImpostosProps {
  onClose: () => void;
}

const PrevisaoImpostos: React.FC<PrevisaoImpostosProps> = ({ onClose }) => {
  const [taxData, setTaxData] = useState<TaxPredictionData>({
    faturamento_previsto: 0,
    despesas_previstas: 0,
    regime_tributario: 'simples_nacional',
    periodo_meses: 12,
    setor: 'tecnologia'
  });
  
  const [result, setResult] = useState<TaxPredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (field: keyof TaxPredictionData, value: any) => {
    setTaxData(prev => ({
      ...prev,
      [field]: field === 'faturamento_previsto' || field === 'despesas_previstas' || field === 'periodo_meses' 
        ? Number(value) 
        : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate inputs
      if (taxData.faturamento_previsto <= 0) {
        toast.error("O faturamento previsto deve ser maior que zero");
        setLoading(false);
        return;
      }
      
      if (taxData.periodo_meses <= 0 || taxData.periodo_meses > 60) {
        toast.error("O período deve estar entre 1 e 60 meses");
        setLoading(false);
        return;
      }
      
      // Simulate API call with local calculation
      setTimeout(() => {
        const resultado = preverImpostos(taxData);
        setResult(resultado);
        setLoading(false);
        toast.success("Previsão de impostos gerada com sucesso!");
      }, 1500);
    } catch (error) {
      console.error("Erro ao calcular previsão:", error);
      toast.error("Erro ao gerar previsão de impostos");
      setLoading(false);
    }
  };
  
  const loadSampleData = () => {
    const sampleData = getSampleTaxPredictionData();
    setTaxData(sampleData);
    toast.info("Dados de amostra carregados");
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value);
  };
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Previsão de Impostos</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Voltar
        </Button>
      </CardHeader>
      <CardContent>
        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="faturamento_previsto">Faturamento Previsto (R$)</Label>
                <Input 
                  id="faturamento_previsto"
                  type="number"
                  placeholder="Ex: 120000"
                  value={taxData.faturamento_previsto || ''}
                  onChange={(e) => handleInputChange('faturamento_previsto', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="despesas_previstas">Despesas Previstas (R$)</Label>
                <Input 
                  id="despesas_previstas"
                  type="number"
                  placeholder="Ex: 80000"
                  value={taxData.despesas_previstas || ''}
                  onChange={(e) => handleInputChange('despesas_previstas', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="regime_tributario">Regime Tributário</Label>
                <Select 
                  value={taxData.regime_tributario} 
                  onValueChange={(value) => handleInputChange('regime_tributario', value)}
                >
                  <SelectTrigger id="regime_tributario">
                    <SelectValue placeholder="Selecione o regime tributário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simples_nacional">Simples Nacional</SelectItem>
                    <SelectItem value="lucro_presumido">Lucro Presumido</SelectItem>
                    <SelectItem value="lucro_real">Lucro Real</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="periodo_meses">Período (meses)</Label>
                <Input 
                  id="periodo_meses"
                  type="number"
                  placeholder="Ex: 12"
                  min={1}
                  max={60}
                  value={taxData.periodo_meses || ''}
                  onChange={(e) => handleInputChange('periodo_meses', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="setor">Setor de Atuação</Label>
                <Select 
                  value={taxData.setor || ''} 
                  onValueChange={(value) => handleInputChange('setor', value)}
                >
                  <SelectTrigger id="setor">
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="comercio">Comércio</SelectItem>
                    <SelectItem value="servicos">Serviços</SelectItem>
                    <SelectItem value="industria">Indústria</SelectItem>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 pt-4">
              <Button type="button" variant="outline" onClick={loadSampleData} disabled={loading}>
                Carregar Dados de Exemplo
              </Button>
              <Button type="submit" className="w-full md:w-auto" disabled={loading}>
                {loading ? "Calculando..." : "Gerar Previsão de Impostos"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4">
                <div className="flex flex-col items-center space-y-2">
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                  <p className="text-sm font-medium text-gray-500">Total de Impostos no Período</p>
                  <h3 className="text-2xl font-bold">{formatCurrency(result.total_periodo)}</h3>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex flex-col items-center space-y-2">
                  <CalendarDays className="h-8 w-8 text-green-500" />
                  <p className="text-sm font-medium text-gray-500">Média Mensal</p>
                  <h3 className="text-2xl font-bold">{formatCurrency(result.media_mensal)}</h3>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex flex-col items-center space-y-2">
                  <TrendingUp className="h-8 w-8 text-amber-500" />
                  <p className="text-sm font-medium text-gray-500">Carga Tributária</p>
                  <h3 className="text-2xl font-bold">
                    {formatPercentage(result.total_periodo / (taxData.faturamento_previsto || 1))}
                  </h3>
                </div>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-bold mb-4">Impostos por Período</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.impostos_mensais} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="mes" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70} 
                        tick={{ fontSize: 10 }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} 
                      />
                      <Tooltip 
                        formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']} 
                        labelFormatter={(label) => `Período: ${label}`} 
                      />
                      <Bar dataKey="valor" fill="#0088FE">
                        {
                          result.impostos_mensais.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))
                        }
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-bold mb-4">Composição dos Impostos</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={result.impostos_detalhados}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="total"
                        nameKey="tipo"
                        label={({ tipo, percentual }) => `${tipo} (${formatPercentage(percentual)})`}
                      >
                        {
                          result.impostos_detalhados.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))
                        }
                      </Pie>
                      <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Valor']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo de Imposto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentual
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.impostos_detalhados.map((imposto, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {imposto.tipo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(imposto.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatPercentage(imposto.percentual)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      Total
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {formatCurrency(result.total_periodo)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      100%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button onClick={() => setResult(null)} variant="outline">
                Voltar ao Formulário
              </Button>
              <Button onClick={() => {
                toast.success("Relatório de previsão gerado com sucesso!");
              }}>
                Gerar Relatório PDF
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrevisaoImpostos;
