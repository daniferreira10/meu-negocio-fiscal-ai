
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { gerarLivroCaixa, getSampleFinancialData, type LivroCaixaResult } from '@/utils/financeUtils';
import { ArrowDownUp, Download, FileText, Printer } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface LivroCaixaProps {
  onClose: () => void;
}

const LivroCaixa = ({ onClose }: LivroCaixaProps) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [livroData, setLivroData] = useState<LivroCaixaResult>(() => {
    // Initialize with sample data
    return gerarLivroCaixa(getSampleFinancialData());
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    
    // Re-sort the data
    const sortedData = {...livroData};
    sortedData.livro_caixa = [...livroData.livro_caixa].sort((a, b) => {
      const dateA = new Date(a.data).getTime();
      const dateB = new Date(b.data).getTime();
      return newOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    setLivroData(sortedData);
  };

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Export or print handlers
  const handleExport = () => {
    toast.success("Livro Caixa exportado com sucesso");
  };
  
  const handlePrint = () => {
    toast.success("Enviando para impressão");
    window.print();
  };

  // Format date from ISO string
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, 'dd/MM/yyyy');
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Livro Caixa
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={toggleSortOrder}>
            <ArrowDownUp className="h-4 w-4 mr-1" />
            Ordenar {sortOrder === 'asc' ? '↓' : '↑'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-1" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1" />
            Imprimir
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {livroData.livro_caixa.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(item.data)}</TableCell>
                  <TableCell>{item.descricao || '-'}</TableCell>
                  <TableCell>{item.categoria || '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.tipo === 'receita' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.tipo === 'receita' ? 'Receita' : 'Despesa'}
                    </span>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    item.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(item.valor)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 border-t pt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Total de registros: {livroData.livro_caixa.length}
          </span>
          <div className="text-right">
            <div className="text-sm text-gray-500">Saldo Final:</div>
            <div className={`text-xl font-bold ${
              livroData.saldo_final >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(livroData.saldo_final)}
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={onClose}>
            Voltar ao Painel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivroCaixa;
