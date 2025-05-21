
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calculator } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { calcularIR, calcularIRSimples, getSampleIRData, getSampleSimpleIRData } from '@/utils/financeUtils';
import { IRResult, SimpleIRResult } from '@/types/chat';

interface CalcularIRProps {
  onClose: () => void;
}

const CalcularIR = ({ onClose }: CalcularIRProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultado, setResultado] = useState<IRResult | null>(null);
  const [resultadoSimples, setResultadoSimples] = useState<SimpleIRResult | null>(null);
  const [calculationType, setCalculationType] = useState<'detailed' | 'simple'>('detailed');
  
  const [formData, setFormData] = useState({
    rendimentos_tributaveis: 0,
    rendimentos_isentos: 0,
    deducoes: 0,
    periodo: new Date().getFullYear().toString()
  });
  
  const [simplifiedFormData, setSimplifiedFormData] = useState({
    tipo: 'PF' as 'PF' | 'PJ',
    rendimento: 0
  });

  const handleGenerateSample = () => {
    if (calculationType === 'detailed') {
      const sampleData = getSampleIRData();
      setFormData({
        ...formData,
        rendimentos_tributaveis: sampleData.rendimentos_tributaveis,
        rendimentos_isentos: sampleData.rendimentos_isentos,
        deducoes: sampleData.deducoes
      });
    } else {
      const sampleData = getSampleSimpleIRData();
      setSimplifiedFormData({
        tipo: sampleData.tipo,
        rendimento: sampleData.rendimento
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'periodo' ? value : Number(value)
    });
  };
  
  const handleSimpleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSimplifiedFormData({
      ...simplifiedFormData,
      [name]: name === 'tipo' ? value : Number(value)
    });
  };

  const handleProcess = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (calculationType === 'detailed') {
        const result = calcularIR(formData);
        setResultado(result);
        setResultadoSimples(null);
      } else {
        const result = calcularIRSimples(simplifiedFormData);
        setResultadoSimples(result);
        setResultado(null);
      }
      setIsLoading(false);
    }, 1500);
  };
  
  const handleTypeChange = (type: 'detailed' | 'simple') => {
    setCalculationType(type);
    setResultado(null);
    setResultadoSimples(null);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatPercentage = (value: number) => {
    return (value * 100).toFixed(2) + '%';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onClose} className="mr-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Calculadora de Imposto de Renda</h2>
      </div>
      
      <Tabs value={calculationType} onValueChange={(value: string) => handleTypeChange(value as 'detailed' | 'simple')} className="w-full mb-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="detailed">Cálculo Detalhado</TabsTrigger>
          <TabsTrigger value="simple">Cálculo Simplificado</TabsTrigger>
        </TabsList>
        
        <TabsContent value="detailed">
          {!resultado ? (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Dados para Cálculo Detalhado do IR</h3>
                <p className="text-gray-500 mb-6">
                  Informe seus rendimentos e deduções para calcular o imposto de renda a pagar.
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Ano-calendário</label>
                      <Input 
                        type="text" 
                        name="periodo"
                        value={formData.periodo}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Rendimentos Tributáveis</label>
                    <Input 
                      type="number" 
                      name="rendimentos_tributaveis"
                      value={formData.rendimentos_tributaveis}
                      onChange={handleInputChange}
                      placeholder="0,00"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Salários, proventos, pensões, aluguéis, etc.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Rendimentos Isentos</label>
                    <Input 
                      type="number" 
                      name="rendimentos_isentos"
                      value={formData.rendimentos_isentos}
                      onChange={handleInputChange}
                      placeholder="0,00"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      FGTS, seguro-desemprego, doações, etc.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Deduções</label>
                    <Input 
                      type="number" 
                      name="deducoes"
                      value={formData.deducoes}
                      onChange={handleInputChange}
                      placeholder="0,00"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Previdência, dependentes, educação, saúde, etc.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={handleGenerateSample} className="flex-1">
                    Usar Dados de Exemplo
                  </Button>
                  <Button onClick={handleProcess} disabled={isLoading} className="flex-1">
                    {isLoading ? 'Processando...' : 'Calcular IR'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Resultado da Simulação de IR
                  </h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Imposto Devido</p>
                    <p className="font-bold text-xl">
                      {formatCurrency(resultado.imposto_devido)}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Resumo</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Rendimentos Tributáveis:</span>
                        <span className="font-medium">{formatCurrency(resultado.rendimentos_tributaveis)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rendimentos Isentos:</span>
                        <span className="font-medium">{formatCurrency(resultado.rendimentos_isentos)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deduções:</span>
                        <span className="font-medium">{formatCurrency(resultado.deducoes)}</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-2 mt-2">
                        <span>Base de Cálculo:</span>
                        <span>{formatCurrency(resultado.base_calculo)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Imposto Calculado</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Imposto Devido:</span>
                        <span className="font-medium">{formatCurrency(resultado.imposto_devido)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Alíquota Efetiva:</span>
                        <span className="font-medium">{formatPercentage(resultado.aliquota_efetiva)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Composição por Faixa</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-left">
                          <th className="py-2 px-3 border">Faixa</th>
                          <th className="py-2 px-3 border">Valor na Faixa</th>
                          <th className="py-2 px-3 border">Alíquota</th>
                          <th className="py-2 px-3 border">Imposto na Faixa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultado.faixas_utilizadas.map((faixa, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="py-2 px-3 border">{faixa.faixa}ª Faixa</td>
                            <td className="py-2 px-3 border">{formatCurrency(faixa.valor_na_faixa)}</td>
                            <td className="py-2 px-3 border">{formatPercentage(faixa.aliquota)}</td>
                            <td className="py-2 px-3 border">{formatCurrency(faixa.imposto_na_faixa)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col space-y-2">
                  <Button>
                    <Calculator className="w-4 h-4 mr-2" />
                    Emitir Cálculo Detalhado
                  </Button>
                  <Button variant="outline" onClick={() => setResultado(null)}>
                    Voltar para Edição
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="simple">
          {!resultadoSimples ? (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Dados para Cálculo Simplificado do IR</h3>
                <p className="text-gray-500 mb-6">
                  Cálculo simplificado para Pessoa Física ou Jurídica.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo de Contribuinte</label>
                    <select 
                      name="tipo"
                      value={simplifiedFormData.tipo}
                      onChange={handleSimpleInputChange}
                      className="w-full border rounded-md p-2"
                    >
                      <option value="PF">Pessoa Física</option>
                      <option value="PJ">Pessoa Jurídica</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Rendimento Total</label>
                    <Input 
                      type="number" 
                      name="rendimento"
                      value={simplifiedFormData.rendimento}
                      onChange={handleSimpleInputChange}
                      placeholder="0,00"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {simplifiedFormData.tipo === 'PF' 
                        ? 'Total de rendimentos anuais' 
                        : 'Faturamento anual da empresa'}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={handleGenerateSample} className="flex-1">
                    Usar Dados de Exemplo
                  </Button>
                  <Button onClick={handleProcess} disabled={isLoading} className="flex-1">
                    {isLoading ? 'Processando...' : 'Calcular IR'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Resultado da Simulação de IR Simplificado
                  </h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Imposto Devido</p>
                    <p className="font-bold text-xl">
                      {formatCurrency(resultadoSimples.imposto_devido)}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium mb-2">Resumo</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tipo de Contribuinte:</span>
                      <span className="font-medium">{resultadoSimples.tipo === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alíquota Aplicada:</span>
                      <span className="font-medium">
                        {resultadoSimples.tipo === 'PF' 
                          ? (simplifiedFormData.rendimento < 50000 ? '15%' : '27,5%')
                          : (simplifiedFormData.rendimento < 240000 ? '10%' : '15%')}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2 mt-2">
                      <span>Imposto a Pagar:</span>
                      <span>{formatCurrency(resultadoSimples.imposto_devido)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col space-y-2">
                  <Button>
                    <Calculator className="w-4 h-4 mr-2" />
                    Emitir Cálculo
                  </Button>
                  <Button variant="outline" onClick={() => setResultadoSimples(null)}>
                    Voltar para Edição
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalcularIR;
