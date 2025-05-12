import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaxCalculator from '@/components/TaxCalculator';
import { toast } from 'sonner';
import Sidebar from '@/components/Sidebar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const TaxManagement = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [loading, setLoading] = useState(false);
  const [taxType, setTaxType] = useState('');
  const [referenceDate, setReferenceDate] = useState<Date | undefined>(new Date());

  const generateTaxDocument = () => {
    if (!taxType) {
      toast.error('Por favor, selecione um tipo de guia.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success(`Guia de ${taxType} gerada com sucesso!`);
      setLoading(false);
    }, 2000);
  };

  const taxDueList = [
    { name: 'DAS (Simples Nacional)', due: '20/05/2025', value: 'R$ 567,89', status: 'pending' },
    { name: 'IRPJ', due: '30/05/2025', value: 'R$ 1.245,67', status: 'pending' },
    { name: 'ICMS', due: '15/05/2025', value: 'R$ 823,45', status: 'pending' },
    { name: 'ISS', due: '10/05/2025', value: 'R$ 234,56', status: 'completed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeItem="taxes" />

        {/* Main Content */}
        <main className="ml-20 md:ml-64 w-full min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-brand-dark">
                  Gestão de Impostos
                </h1>
                <p className="text-gray-500">Calcule impostos e gere guias de pagamento</p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="calculator">Calculadora de Impostos</TabsTrigger>
                <TabsTrigger value="generator">Gerador de Guias</TabsTrigger>
                <TabsTrigger value="schedule">Agenda Tributária</TabsTrigger>
              </TabsList>
              
              <TabsContent value="calculator" className="space-y-4">
                <TaxCalculator />
              </TabsContent>
              
              <TabsContent value="generator" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-brand-dark mb-6">Gerador de Guias</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <Label htmlFor="taxType">Tipo de Imposto</Label>
                      <Select value={taxType} onValueChange={setTaxType}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione um imposto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DAS">DAS (Simples Nacional)</SelectItem>
                          <SelectItem value="DARF IRPJ">DARF IRPJ</SelectItem>
                          <SelectItem value="DARF CSLL">DARF CSLL</SelectItem>
                          <SelectItem value="DARF PIS">DARF PIS</SelectItem>
                          <SelectItem value="DARF COFINS">DARF COFINS</SelectItem>
                          <SelectItem value="ICMS">ICMS</SelectItem>
                          <SelectItem value="ISS">ISS</SelectItem>
                          <SelectItem value="GPS">GPS (INSS)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Período de Referência</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full mt-1 justify-start text-left font-normal"
                          >
                            {referenceDate ? (
                              format(referenceDate, "MMMM 'de' yyyy", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={referenceDate}
                            onSelect={setReferenceDate}
                            initialFocus
                            locale={ptBR}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex items-end">
                      <Button
                        className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
                        onClick={generateTaxDocument}
                        disabled={loading}
                      >
                        {loading ? "Gerando..." : "Gerar Guia"}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md mt-6">
                    <h3 className="text-lg font-semibold mb-4">Guias Pendentes:</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-full">
                        <thead>
                          <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Imposto</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Vencimento</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Valor</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {taxDueList.map((tax, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-4 px-4 text-sm text-gray-900 font-medium">{tax.name}</td>
                              <td className="py-4 px-4 text-sm text-gray-500">{tax.due}</td>
                              <td className="py-4 px-4 text-sm text-gray-900">{tax.value}</td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  tax.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                                }`}>
                                  {tax.status === 'pending' ? 'Pendente' : 'Concluído'}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <Button 
                                  variant="ghost" 
                                  className="text-brand-blue hover:text-brand-blue/80 text-sm font-medium"
                                  onClick={() => {
                                    toast.success(`Guia de ${tax.name} baixada com sucesso!`);
                                  }}
                                >
                                  Baixar
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-brand-dark mb-6">Agenda Tributária</h2>
                  
                  <div className="bg-gray-50 p-6 rounded-md">
                    <h3 className="text-lg font-semibold mb-4">Maio 2025</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-white p-4 rounded shadow-sm border-l-4 border-amber-500">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-lg">10 de Maio</p>
                            <p className="text-gray-600">ISS</p>
                          </div>
                          <Button 
                            size="sm"
                            className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                            onClick={() => setActiveTab('generator')}
                          >
                            Gerar Guia
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded shadow-sm border-l-4 border-amber-500">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-lg">15 de Maio</p>
                            <p className="text-gray-600">ICMS</p>
                          </div>
                          <Button 
                            size="sm"
                            className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                            onClick={() => setActiveTab('generator')}
                          >
                            Gerar Guia
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded shadow-sm border-l-4 border-amber-500">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-lg">20 de Maio</p>
                            <p className="text-gray-600">DAS (Simples Nacional)</p>
                          </div>
                          <Button 
                            size="sm"
                            className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                            onClick={() => setActiveTab('generator')}
                          >
                            Gerar Guia
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded shadow-sm border-l-4 border-amber-500">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-lg">30 de Maio</p>
                            <p className="text-gray-600">IRPJ</p>
                          </div>
                          <Button 
                            size="sm"
                            className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                            onClick={() => setActiveTab('generator')}
                          >
                            Gerar Guia
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline" onClick={() => toast.info("Funcionalidade de agenda avançada disponível em breve")}>
                        Ver Calendário Completo
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaxManagement;
