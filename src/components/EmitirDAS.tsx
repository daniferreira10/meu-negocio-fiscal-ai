
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { emitirDASSimples } from '@/utils/financeUtils';
import { DASSimples } from '@/types/chat';
import { ArrowLeft, FileText } from 'lucide-react';

interface EmitirDASProps {
  onClose: () => void;
}

const EmitirDAS = ({ onClose }: EmitirDASProps) => {
  const [cnpj, setCnpj] = useState('');
  const [faturamento, setFaturamento] = useState('');
  const [anexo, setAnexo] = useState('1');
  const [periodo, setPeriodo] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultado, setResultado] = useState<DASSimples | null>(null);

  const handleMaskCnpj = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    
    // Apply CNPJ mask (XX.XXX.XXX/XXXX-XX)
    if (numericValue.length <= 2) {
      return numericValue;
    } else if (numericValue.length <= 5) {
      return `${numericValue.slice(0, 2)}.${numericValue.slice(2)}`;
    } else if (numericValue.length <= 8) {
      return `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5)}`;
    } else if (numericValue.length <= 12) {
      return `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5, 8)}/${numericValue.slice(8)}`;
    } else {
      return `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5, 8)}/${numericValue.slice(8, 12)}-${numericValue.slice(12, 14)}`;
    }
  };

  const handleMaskFaturamento = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    
    // Convert to number and format with commas
    if (numericValue === '') return '';
    
    const number = parseInt(numericValue, 10) / 100;
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Remove formatting from values
    const cnpjValue = cnpj.replace(/\D/g, '');
    const faturamentoValue = parseFloat(faturamento.replace(/[^\d,]/g, '').replace(',', '.'));
    
    setTimeout(() => {
      const result = emitirDASSimples({
        cnpj: cnpjValue,
        periodo,
        faturamento: faturamentoValue,
        anexo: parseInt(anexo, 10)
      });
      
      setResultado(result);
      setIsSubmitting(false);
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
        <h2 className="text-2xl font-bold">Emitir DAS Simples Nacional</h2>
      </div>

      {!resultado ? (
        <Card>
          <CardHeader>
            <CardTitle>Preencha os dados para emissão do DAS</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">CNPJ</label>
                <Input 
                  placeholder="XX.XXX.XXX/XXXX-XX" 
                  value={cnpj}
                  onChange={(e) => setCnpj(handleMaskCnpj(e.target.value))}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Período de Apuração</label>
                <Input 
                  type="month" 
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Faturamento do Período</label>
                <Input 
                  placeholder="R$ 0,00" 
                  value={faturamento}
                  onChange={(e) => setFaturamento(handleMaskFaturamento(e.target.value))}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Anexo do Simples Nacional</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={anexo}
                  onChange={(e) => setAnexo(e.target.value)}
                >
                  <option value="1">Anexo I - Comércio</option>
                  <option value="2">Anexo II - Indústria</option>
                  <option value="3">Anexo III - Serviços</option>
                  <option value="4">Anexo IV - Serviços</option>
                  <option value="5">Anexo V - Serviços</option>
                </select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processando...' : 'Calcular e Emitir DAS'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-6 h-6 mr-2" />
              DAS Simples Nacional Gerado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">CNPJ</p>
                  <p className="font-medium">{cnpj}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Período de Apuração</p>
                  <p className="font-medium">{periodo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Valor do DAS</p>
                  <p className="font-medium text-xl">{formatCurrency(resultado.valor)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data de Vencimento</p>
                  <p className="font-medium">{formatDate(resultado.data_vencimento)}</p>
                </div>
              </div>

              <div className="mt-4 border p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500 mb-1">Código de Barras</p>
                <p className="font-mono text-xs break-all">{resultado.codigo_barras}</p>
              </div>

              <div className="mt-6 flex flex-col space-y-4">
                <Button className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Imprimir Documento
                </Button>
                <Button variant="outline" className="w-full">
                  Baixar PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmitirDAS;
