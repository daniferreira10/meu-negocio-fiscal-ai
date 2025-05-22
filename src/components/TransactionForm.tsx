import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CurrencyInput } from '@/components/ui/currency-input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState('receita');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | string>('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Categories based on transaction type
  const expenseCategories = [
    'Aluguel',
    'Salários',
    'Insumos',
    'Marketing',
    'Serviços',
    'Impostos',
    'Transporte',
    'Alimentação',
    'Outros'
  ];

  const incomeCategories = [
    'Vendas',
    'Serviços',
    'Investimentos',
    'Reembolsos',
    'Outros'
  ];

  const paymentMethods = [
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Transferência Bancária',
    'PIX',
    'Boleto',
    'Cheque'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || !category || !paymentMethod || !date) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success(`${transactionType === 'receita' ? 'Receita' : 'Despesa'} cadastrada com sucesso!`);
      setLoading(false);
      
      // Reset form
      setDescription('');
      setAmount('');
      setCategory('');
      setPaymentMethod('');
      setDate(new Date().toISOString().split('T')[0]);
      setUploadedFile(null);
    }, 1500);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-brand-dark mb-6">Registrar Transação</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transaction Type */}
          <div className="col-span-1 md:col-span-2">
            <Label className="block mb-2">Tipo de Transação</Label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="income"
                  name="transactionType"
                  checked={transactionType === 'receita'}
                  onChange={() => setTransactionType('receita')}
                  className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300"
                />
                <label htmlFor="income" className="ml-2 text-gray-700">
                  Receita
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="expense"
                  name="transactionType"
                  checked={transactionType === 'despesa'}
                  onChange={() => setTransactionType('despesa')}
                  className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300"
                />
                <label htmlFor="expense" className="ml-2 text-gray-700">
                  Despesa
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={transactionType === 'receita' ? 'Ex: Venda de produtos' : 'Ex: Aluguel do escritório'}
              className="mt-1"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <Label htmlFor="amount">Valor</Label>
            <CurrencyInput
              id="amount"
              value={amount}
              onChange={setAmount}
              placeholder="0,00"
              className="mt-1"
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {(transactionType === 'receita' ? incomeCategories : expenseCategories).map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payment Method */}
          <div>
            <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione a forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method} value={method}>{method}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* Document Upload */}
          <div>
            <Label htmlFor="document">Comprovante (opcional)</Label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 flex items-center space-x-2 hover:bg-gray-50 transition"
              >
                <Upload className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {uploadedFile ? uploadedFile.name : 'Anexar arquivo'}
                </span>
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.csv,.jpg,.png"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Formatos aceitos: PDF, CSV, JPG, PNG
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            className="mr-2 border-brand-blue text-brand-blue hover:bg-brand-light-blue"
            onClick={() => {
              setDescription('');
              setAmount('');
              setCategory('');
              setPaymentMethod('');
              setDate(new Date().toISOString().split('T')[0]);
              setUploadedFile(null);
            }}
          >
            Limpar
          </Button>
          <Button 
            type="submit" 
            className="bg-brand-blue hover:bg-brand-blue/90 text-white"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar Transação"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default TransactionForm;
