
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { ChevronLeft, BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';
import { FiscalAnalysisData, FiscalAnalysisResult } from '@/types/chat';
import { analiseFiscal, getSampleFiscalAnalysisData } from '@/utils/financeUtils';

interface AnaliseFiscalProps {
  onClose: () => void;
}

const AnaliseFiscal: React.FC<AnaliseFiscalProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FiscalAnalysisData>(getSampleFiscalAnalysisData());
  const [result, setResult] = useState<FiscalAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'numero_funcionarios' ? parseInt(value) || 0 : parseFloat(value) || 0
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAnalyze = () => {
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        const resultado = analiseFiscal(formData);
        setResult(resultado);
        toast({
          title: "Análise fiscal concluída",
          description: "Os resultados da análise fiscal foram gerados com sucesso."
        });
      } catch (error) {
        toast({
          title: "Erro ao processar análise",
          description: "Ocorreu um erro ao processar a análise fiscal.",
          variant: "destructive"
        });
        console.error('Erro na análise fiscal:', error);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="shadow-lg">
        <CardHeader className="bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center">
              <BarChart2 className="mr-2" size={22} />
              Análise Fiscal
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ChevronLeft size={18} className="mr-1" />
              Voltar
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {!result ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="faturamento_mensal">Faturamento Mensal (R$)</Label>
                  <Input
                    id="faturamento_mensal"
                    name="faturamento_mensal"
                    type="number"
                    value={formData.faturamento_mensal}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custos_fixos">Custos Fixos (R$)</Label>
                  <Input
                    id="custos_fixos"
                    name="custos_fixos"
                    type="number"
                    value={formData.custos_fixos}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="custos_variaveis">Custos Variáveis (R$)</Label>
                  <Input
                    id="custos_variaveis"
                    name="custos_variaveis"
                    type="number"
                    value={formData.custos_variaveis}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="numero_funcionarios">Número de Funcionários</Label>
                  <Input
                    id="numero_funcionarios"
                    name="numero_funcionarios"
                    type="number"
                    value={formData.numero_funcionarios || 0}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regime_tributario">Regime Tributário</Label>
                  <Select 
                    value={formData.regime_tributario} 
                    onValueChange={(value) => handleSelectChange('regime_tributario', value)}
                  >
                    <SelectTrigger>
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
                  <Label htmlFor="setor">Setor de Atuação</Label>
                  <Input
                    id="setor"
                    name="setor"
                    value={formData.setor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Carga Tributária Mensal</p>
                      <p className="text-3xl font-bold mt-2">
                        {new Intl.NumberFormat('pt-BR', { 
                          style: 'currency', 
                          currency: 'BRL' 
                        }).format(result.carga_tributaria)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">Economia Potencial</p>
                      <p className="text-3xl font-bold mt-2">
                        {new Intl.NumberFormat('pt-BR', { 
                          style: 'currency', 
                          currency: 'BRL' 
                        }).format(result.economia_potencial)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className={`
                  ${result.risco_fiscal === 'baixo' ? 'bg-green-50 dark:bg-green-900/20' : ''}
                  ${result.risco_fiscal === 'medio' ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}
                  ${result.risco_fiscal === 'alto' ? 'bg-red-50 dark:bg-red-900/20' : ''}
                `}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Risco Fiscal</p>
                      <p className={`
                        text-xl font-bold mt-2 uppercase
                        ${result.risco_fiscal === 'baixo' ? 'text-green-600 dark:text-green-400' : ''}
                        ${result.risco_fiscal === 'medio' ? 'text-yellow-600 dark:text-yellow-400' : ''}
                        ${result.risco_fiscal === 'alto' ? 'text-red-600 dark:text-red-400' : ''}
                      `}>
                        {result.risco_fiscal}
                        {result.risco_fiscal === 'alto' && <AlertTriangle className="inline ml-1" size={20} />}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <TrendingUp className="mr-2" size={18} />
                  Recomendações
                </h3>
                <div className="space-y-3">
                  {result.recomendacoes.map((recomendacao, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{recomendacao.titulo}</h4>
                        <span className={`
                          text-xs px-2 py-1 rounded-full
                          ${recomendacao.impacto === 'alto' ? 'bg-red-100 text-red-700' : ''}
                          ${recomendacao.impacto === 'medio' ? 'bg-yellow-100 text-yellow-700' : ''}
                          ${recomendacao.impacto === 'baixo' ? 'bg-green-100 text-green-700' : ''}
                        `}>
                          Impacto {recomendacao.impacto}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{recomendacao.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Oportunidades de Economia</h3>
                <div className="space-y-3">
                  {result.oportunidades.map((oportunidade, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{oportunidade.titulo}</h4>
                        <span className="text-sm font-medium text-green-600">
                          {new Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                          }).format(oportunidade.economia_estimada)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{oportunidade.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-end gap-3 border-t p-4">
          {!result ? (
            <>
              <Button variant="outline" onClick={onClose}>Cancelar</Button>
              <Button 
                onClick={handleAnalyze} 
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? "Analisando..." : "Analisar"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setResult(null)}>Nova Análise</Button>
              <Button onClick={onClose}>Concluir</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AnaliseFiscal;
