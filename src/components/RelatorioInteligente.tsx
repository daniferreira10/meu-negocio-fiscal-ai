
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Minus, ChevronLeft, Download, Share2 } from 'lucide-react';
import { ReportData, IntelligentReportResult, FinancialTransaction } from '@/types/chat';
import { gerarRelatorioInteligente, getSampleReportData } from '@/utils/financeUtils';
import { toast } from '@/components/ui/use-toast';

// Interface for component props
interface RelatorioInteligenteProps {
  onClose: () => void;
}

const RelatorioInteligente: React.FC<RelatorioInteligenteProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<ReportData>(getSampleReportData());
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<IntelligentReportResult | null>(null);
  const [activeTab, setActiveTab] = useState<string>("input");
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle transaction input changes (receitas/despesas)
  const handleTransactionChange = (type: 'receitas' | 'despesas', index: number, field: keyof FinancialTransaction, value: string) => {
    setFormData(prev => {
      const transactions = [...prev[type]];
      transactions[index] = {
        ...transactions[index],
        [field]: field === 'valor' ? parseFloat(value) || 0 : value
      };
      return {
        ...prev,
        [type]: transactions
      };
    });
  };

  // Add new transaction
  const handleAddTransaction = (type: 'receitas' | 'despesas') => {
    const newTransaction: FinancialTransaction = {
      data: new Date().toISOString().split('T')[0],
      valor: 0,
      descricao: '',
      categoria: ''
    };
    
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], newTransaction]
    }));
  };

  // Remove transaction
  const handleRemoveTransaction = (type: 'receitas' | 'despesas', index: number) => {
    setFormData(prev => {
      const transactions = [...prev[type]];
      transactions.splice(index, 1);
      return {
        ...prev,
        [type]: transactions
      };
    });
  };

  // Generate the report
  const handleGenerateReport = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate report with the utility function
      const reportResult = gerarRelatorioInteligente(formData);
      
      setReport(reportResult);
      setActiveTab("report");
      
      toast({
        title: "Relatório gerado com sucesso",
        description: "O relatório inteligente foi gerado com base nos dados fornecidos."
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar relatório",
        description: "Ocorreu um erro ao processar os dados. Por favor, tente novamente."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle report download
  const handleDownloadReport = () => {
    if (!report) return;
    
    // Create a JSON string of the report
    const reportJson = JSON.stringify(report, null, 2);
    const blob = new Blob([reportJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${report.data_geracao.replace(/\//g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Relatório baixado",
      description: "O arquivo JSON do relatório foi baixado com sucesso."
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onClose} className="mr-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          <CardTitle>Relatório Contábil Inteligente</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="input">Entrada de Dados</TabsTrigger>
            <TabsTrigger value="report" disabled={!report}>Relatório</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo">Tipo de Contribuinte</Label>
                <Select 
                  value={formData.tipo} 
                  onValueChange={(value) => handleSelectChange('tipo', value as 'PF' | 'PJ')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PF">Pessoa Física</SelectItem>
                    <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="periodo">Período</Label>
                <Input 
                  id="periodo" 
                  name="periodo" 
                  value={formData.periodo} 
                  onChange={handleInputChange} 
                  placeholder="MM/AAAA"
                />
              </div>
            </div>
            
            {formData.tipo === 'PJ' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="empresa_nome">Razão Social</Label>
                  <Input 
                    id="empresa_nome" 
                    name="empresa_nome" 
                    value={formData.empresa_nome || ''} 
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="empresa_cnpj">CNPJ</Label>
                  <Input 
                    id="empresa_cnpj" 
                    name="empresa_cnpj" 
                    value={formData.empresa_cnpj || ''} 
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="atividade">Setor de Atividade</Label>
                  <Input 
                    id="atividade" 
                    name="atividade" 
                    value={formData.atividade || ''} 
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="regime_tributario">Regime Tributário</Label>
                  <Select 
                    value={formData.regime_tributario || 'simples_nacional'} 
                    onValueChange={(value) => handleSelectChange('regime_tributario', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o regime" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simples_nacional">Simples Nacional</SelectItem>
                      <SelectItem value="lucro_presumido">Lucro Presumido</SelectItem>
                      <SelectItem value="lucro_real">Lucro Real</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pessoa_nome">Nome Completo</Label>
                  <Input 
                    id="pessoa_nome" 
                    name="pessoa_nome" 
                    value={formData.pessoa_nome || ''} 
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="pessoa_cpf">CPF</Label>
                  <Input 
                    id="pessoa_cpf" 
                    name="pessoa_cpf" 
                    value={formData.pessoa_cpf || ''} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            
            <div>
              <h3 className="font-semibold mb-2">Receitas</h3>
              {formData.receitas.map((receita, index) => (
                <div key={`receita-${index}`} className="grid grid-cols-5 gap-2 mb-2">
                  <Input 
                    value={receita.data} 
                    onChange={(e) => handleTransactionChange('receitas', index, 'data', e.target.value)} 
                    placeholder="Data" 
                    className="col-span-1"
                  />
                  <Input 
                    value={receita.valor} 
                    onChange={(e) => handleTransactionChange('receitas', index, 'valor', e.target.value)} 
                    placeholder="Valor" 
                    type="number"
                    className="col-span-1"
                  />
                  <Input 
                    value={receita.descricao || ''} 
                    onChange={(e) => handleTransactionChange('receitas', index, 'descricao', e.target.value)} 
                    placeholder="Descrição" 
                    className="col-span-1"
                  />
                  <Input 
                    value={receita.categoria || ''} 
                    onChange={(e) => handleTransactionChange('receitas', index, 'categoria', e.target.value)} 
                    placeholder="Categoria" 
                    className="col-span-1"
                  />
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveTransaction('receitas', index)}
                    className="col-span-1"
                  >
                    Remover
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAddTransaction('receitas')}
                className="mt-2"
              >
                Adicionar Receita
              </Button>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Despesas</h3>
              {formData.despesas.map((despesa, index) => (
                <div key={`despesa-${index}`} className="grid grid-cols-5 gap-2 mb-2">
                  <Input 
                    value={despesa.data} 
                    onChange={(e) => handleTransactionChange('despesas', index, 'data', e.target.value)} 
                    placeholder="Data" 
                    className="col-span-1"
                  />
                  <Input 
                    value={despesa.valor} 
                    onChange={(e) => handleTransactionChange('despesas', index, 'valor', e.target.value)} 
                    placeholder="Valor" 
                    type="number"
                    className="col-span-1"
                  />
                  <Input 
                    value={despesa.descricao || ''} 
                    onChange={(e) => handleTransactionChange('despesas', index, 'descricao', e.target.value)} 
                    placeholder="Descrição" 
                    className="col-span-1"
                  />
                  <Input 
                    value={despesa.categoria || ''} 
                    onChange={(e) => handleTransactionChange('despesas', index, 'categoria', e.target.value)} 
                    placeholder="Categoria" 
                    className="col-span-1"
                  />
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveTransaction('despesas', index)}
                    className="col-span-1"
                  >
                    Remover
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAddTransaction('despesas')}
                className="mt-2"
              >
                Adicionar Despesa
              </Button>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                onClick={handleGenerateReport} 
                disabled={isLoading}
              >
                {isLoading ? "Gerando..." : "Gerar Relatório"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="report" className="space-y-4 mt-4">
            {report && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">{report.titulo}</h2>
                  <div>
                    <span className="text-sm text-gray-500">Gerado em: {report.data_geracao}</span>
                  </div>
                </div>
                
                <Alert>
                  <AlertTitle>Resumo Executivo</AlertTitle>
                  <AlertDescription>
                    {report.resumo_executivo}
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {report.metricas_chave.map((metrica, index) => (
                    <Card key={`metrica-${index}`}>
                      <CardContent className="p-4">
                        <div className="text-sm text-gray-500">{metrica.nome}</div>
                        <div className="text-xl font-bold flex items-center">
                          {typeof metrica.valor === 'number' ? metrica.valor.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }) : metrica.valor}
                          {metrica.tendencia && (
                            <span className="ml-2">
                              {metrica.tendencia === 'up' ? (
                                <ArrowUp className="h-4 w-4 text-green-500" />
                              ) : metrica.tendencia === 'down' ? (
                                <ArrowDown className="h-4 w-4 text-red-500" />
                              ) : (
                                <Minus className="h-4 w-4 text-gray-500" />
                              )}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Seções do Relatório</h3>
                  <div className="space-y-6">
                    {report.secoes.map((secao, index) => (
                      <div key={`secao-${index}`} className="border rounded-md p-4">
                        <h4 className="font-semibold text-md mb-2">{secao.titulo}</h4>
                        <p className="text-sm text-gray-600">{secao.conteudo}</p>
                        
                        {secao.tipo === 'grafico' && secao.dados_grafico && (
                          <div className="mt-4 border-t pt-4">
                            <h5 className="text-sm font-medium mb-2">Dados do Gráfico</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {secao.dados_grafico.map((item: any, idx: number) => (
                                <Badge key={idx} variant="outline" className="flex justify-between items-center px-3 py-1">
                                  <span>{item.categoria}</span>
                                  <span className="font-medium">
                                    {new Intl.NumberFormat('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL'
                                    }).format(item.valor)}
                                  </span>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Conclusão</h3>
                  <p>{report.conclusao}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Recomendações</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {report.recomendacoes.map((recomendacao, index) => (
                      <li key={`recomendacao-${index}`}>{recomendacao}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={handleDownloadReport}>
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Relatório
                  </Button>
                  <Button>
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RelatorioInteligente;
