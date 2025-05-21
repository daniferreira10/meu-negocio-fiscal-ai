
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';
import { gerarLivroCaixa, getSampleFinancialData } from '@/utils/financeUtils';
import { FinancialTransaction, LivroCaixaResult } from '@/types/chat';

interface LivroCaixaProps {
  onClose: () => void;
}

const LivroCaixa = ({ onClose }: LivroCaixaProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultado, setResultado] = useState<LivroCaixaResult | null>(null);
  const [formData, setFormData] = useState<{
    receitas: FinancialTransaction[];
    despesas: FinancialTransaction[];
  }>(getSampleFinancialData());

  const handleGenerateSample = () => {
    setFormData(getSampleFinancialData());
  };

  const handleProcess = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = gerarLivroCaixa(formData);
      setResultado(result);
      setIsLoading(false);
    }, 1500);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onClose} className="mr-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Livro Caixa</h2>
      </div>

      {!resultado ? (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Dados Financeiros</h3>
            <p className="text-gray-500 mb-6">
              Adicione suas receitas e despesas para gerar o livro caixa automático com IA.
            </p>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Receitas</h4>
              {formData.receitas.map((item, index) => (
                <div key={`receita-${index}`} className="flex gap-2 mb-2">
                  <Input 
                    type="date" 
                    value={item.data} 
                    onChange={(e) => {
                      const newReceitas = [...formData.receitas];
                      newReceitas[index].data = e.target.value;
                      setFormData({...formData, receitas: newReceitas});
                    }} 
                  />
                  <Input 
                    type="number" 
                    placeholder="Valor" 
                    value={item.valor}
                    onChange={(e) => {
                      const newReceitas = [...formData.receitas];
                      newReceitas[index].valor = Number(e.target.value);
                      setFormData({...formData, receitas: newReceitas});
                    }}
                  />
                  <Input 
                    placeholder="Descrição"
                    value={item.descricao || ''}
                    onChange={(e) => {
                      const newReceitas = [...formData.receitas];
                      newReceitas[index].descricao = e.target.value;
                      setFormData({...formData, receitas: newReceitas});
                    }}
                  />
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFormData({
                  ...formData, 
                  receitas: [...formData.receitas, { data: new Date().toISOString().split('T')[0], valor: 0, descricao: '' }]
                })}
                className="mt-2"
              >
                + Adicionar Receita
              </Button>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Despesas</h4>
              {formData.despesas.map((item, index) => (
                <div key={`despesa-${index}`} className="flex gap-2 mb-2">
                  <Input 
                    type="date" 
                    value={item.data} 
                    onChange={(e) => {
                      const newDespesas = [...formData.despesas];
                      newDespesas[index].data = e.target.value;
                      setFormData({...formData, despesas: newDespesas});
                    }} 
                  />
                  <Input 
                    type="number" 
                    placeholder="Valor" 
                    value={item.valor}
                    onChange={(e) => {
                      const newDespesas = [...formData.despesas];
                      newDespesas[index].valor = Number(e.target.value);
                      setFormData({...formData, despesas: newDespesas});
                    }}
                  />
                  <Input 
                    placeholder="Descrição"
                    value={item.descricao || ''}
                    onChange={(e) => {
                      const newDespesas = [...formData.despesas];
                      newDespesas[index].descricao = e.target.value;
                      setFormData({...formData, despesas: newDespesas});
                    }}
                  />
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFormData({
                  ...formData, 
                  despesas: [...formData.despesas, { data: new Date().toISOString().split('T')[0], valor: 0, descricao: '' }]
                })}
                className="mt-2"
              >
                + Adicionar Despesa
              </Button>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button variant="outline" onClick={handleGenerateSample} className="flex-1">
                Usar Dados de Exemplo
              </Button>
              <Button onClick={handleProcess} disabled={isLoading} className="flex-1">
                {isLoading ? 'Processando...' : 'Gerar Livro Caixa'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Livro Caixa Gerado
              </h3>
              <div className="text-right">
                <p className="text-sm text-gray-500">Saldo Final</p>
                <p className={`font-bold text-xl ${resultado.saldo_final >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(resultado.saldo_final)}
                </p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Data</th>
                    <th className="py-2 text-left">Descrição</th>
                    <th className="py-2 text-left">Categoria</th>
                    <th className="py-2 text-left">Tipo</th>
                    <th className="py-2 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.livro_caixa.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{formatDate(item.data)}</td>
                      <td className="py-2">{item.descricao || '-'}</td>
                      <td className="py-2">{item.categoria || '-'}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.tipo === 'receita' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.tipo === 'receita' ? 'Receita' : 'Despesa'}
                        </span>
                      </td>
                      <td className="py-2 text-right font-medium">
                        {formatCurrency(item.valor)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex flex-col space-y-2">
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Exportar como PDF
              </Button>
              <Button variant="outline" onClick={() => setResultado(null)}>
                Voltar para Edição
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LivroCaixa;
