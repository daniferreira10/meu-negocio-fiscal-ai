
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface TaxResults {
  darf: number;
  das: number;
  icms: number;
  iss: number;
  pis: number;
  cofins: number;
  irpj: number;
  csll: number;
  inss: number;
  total: number;
}

const TaxCalculator = () => {
  const [revenue, setRevenue] = useState<string>('');
  const [taxRegime, setTaxRegime] = useState<string>('Simples Nacional');
  const [activityType, setActivityType] = useState<string>('Comércio');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TaxResults | null>(null);

  const calculateTaxes = () => {
    if (!revenue || isNaN(parseFloat(revenue))) {
      toast.error('Por favor, insira um valor de receita válido.');
      return;
    }

    setLoading(true);
    const revenueValue = parseFloat(revenue);

    // Simulação de cálculo de impostos (valores simplificados)
    setTimeout(() => {
      let taxResults: TaxResults = {
        darf: 0,
        das: 0,
        icms: 0,
        iss: 0,
        pis: 0,
        cofins: 0,
        irpj: 0,
        csll: 0,
        inss: 0,
        total: 0
      };

      // Cálculos baseados no regime tributário
      if (taxRegime === 'Simples Nacional') {
        // Alíquotas simplificadas do Simples Nacional
        taxResults.das = revenueValue * 0.06; // 6% da receita
        taxResults.total = taxResults.das;
      } else if (taxRegime === 'Lucro Presumido') {
        // Alíquotas simplificadas de Lucro Presumido
        if (activityType === 'Comércio') {
          taxResults.irpj = revenueValue * 0.0148; // 1.48% sobre receita
          taxResults.csll = revenueValue * 0.0096; // 0.96% sobre receita
          taxResults.pis = revenueValue * 0.0065; // 0.65% sobre receita
          taxResults.cofins = revenueValue * 0.03; // 3% sobre receita
          taxResults.icms = revenueValue * 0.07; // 7% ICMS (exemplo)
        } else if (activityType === 'Serviço') {
          taxResults.irpj = revenueValue * 0.048; // 4.8% sobre receita
          taxResults.csll = revenueValue * 0.0288; // 2.88% sobre receita
          taxResults.pis = revenueValue * 0.0065; // 0.65% sobre receita
          taxResults.cofins = revenueValue * 0.03; // 3% sobre receita
          taxResults.iss = revenueValue * 0.05; // 5% ISS (exemplo)
        } else if (activityType === 'Indústria') {
          taxResults.irpj = revenueValue * 0.0148; // 1.48% sobre receita
          taxResults.csll = revenueValue * 0.0096; // 0.96% sobre receita
          taxResults.pis = revenueValue * 0.0065; // 0.65% sobre receita
          taxResults.cofins = revenueValue * 0.03; // 3% sobre receita
          taxResults.icms = revenueValue * 0.12; // 12% ICMS (exemplo)
          taxResults.inss = revenueValue * 0.02; // 2% INSS (exemplo)
        }
        taxResults.total = taxResults.irpj + taxResults.csll + taxResults.pis + 
                          taxResults.cofins + taxResults.icms + taxResults.iss + taxResults.inss;
      } else if (taxRegime === 'Lucro Real') {
        // Alíquotas simplificadas de Lucro Real (valores hipotéticos)
        taxResults.irpj = revenueValue * 0.15; // 15% de IRPJ
        taxResults.csll = revenueValue * 0.09; // 9% de CSLL
        taxResults.pis = revenueValue * 0.0165; // 1.65% de PIS
        taxResults.cofins = revenueValue * 0.076; // 7.6% de COFINS
        
        if (activityType === 'Comércio' || activityType === 'Indústria') {
          taxResults.icms = revenueValue * 0.18; // 18% de ICMS (exemplo)
        } else if (activityType === 'Serviço') {
          taxResults.iss = revenueValue * 0.05; // 5% de ISS (exemplo)
        }
        
        taxResults.total = taxResults.irpj + taxResults.csll + taxResults.pis + 
                          taxResults.cofins + taxResults.icms + taxResults.iss;
      } else if (taxRegime === 'MEI') {
        // Valor fixo mensal para MEI (exemplo)
        taxResults.darf = 70.60; // Valor hipotético
        taxResults.total = taxResults.darf;
      }

      // Arredonda todos os valores para 2 casas decimais
      for (const key in taxResults) {
        if (Object.prototype.hasOwnProperty.call(taxResults, key)) {
          taxResults[key as keyof TaxResults] = parseFloat(taxResults[key as keyof TaxResults].toFixed(2));
        }
      }

      setResults(taxResults);
      setLoading(false);
      toast.success('Cálculo de impostos concluído!');
    }, 1500);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-brand-dark mb-6">Calculadora de Impostos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <Label htmlFor="revenue">Faturamento Mensal</Label>
          <Input
            id="revenue"
            type="number"
            placeholder="0,00"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="taxRegime">Regime Tributário</Label>
          <Select value={taxRegime} onValueChange={setTaxRegime}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecione o regime tributário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Simples Nacional">Simples Nacional</SelectItem>
              <SelectItem value="Lucro Presumido">Lucro Presumido</SelectItem>
              <SelectItem value="Lucro Real">Lucro Real</SelectItem>
              <SelectItem value="MEI">MEI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="activityType">Tipo de Atividade</Label>
          <Select value={activityType} onValueChange={setActivityType}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecione o tipo de atividade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Comércio">Comércio</SelectItem>
              <SelectItem value="Serviço">Serviço</SelectItem>
              <SelectItem value="Indústria">Indústria</SelectItem>
              <SelectItem value="Agronegócio">Agronegócio</SelectItem>
              <SelectItem value="Outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <Button
          onClick={calculateTaxes}
          className="bg-brand-blue hover:bg-brand-blue/90 text-white"
          disabled={loading}
        >
          {loading ? "Calculando..." : "Calcular Impostos"}
        </Button>
      </div>

      {results && (
        <div className="mt-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Resultados:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {results.das > 0 && (
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">DAS (Simples Nacional)</p>
                <p className="text-lg font-bold text-brand-dark">{formatCurrency(results.das)}</p>
              </div>
            )}

            {results.darf > 0 && (
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">DARF (MEI)</p>
                <p className="text-lg font-bold text-brand-dark">{formatCurrency(results.darf)}</p>
              </div>
            )}

            {results.irpj > 0 && (
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">IRPJ</p>
                <p className="text-lg font-bold text-brand-dark">{formatCurrency(results.irpj)}</p>
              </div>
            )}

            {results.csll > 0 && (
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">CSLL</p>
                <p className="text-lg font-bold text-brand-dark">{formatCurrency(results.csll)}</p>
              </div>
            )}

            {results.pis > 0 && (
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">PIS</p>
                <p className="text-lg font-bold text-brand-dark">{formatCurrency(results.pis)}</p>
              </div>
            )}

            {results.cofins > 0 && (
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">COFINS</p>
                <p className="text-lg font-bold text-brand-dark">{formatCurrency(results.cofins)}</p>
              </div>
            )}

            {results.icms > 0 && (
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">ICMS</p>
                <p className="text-lg font-bold text-brand-dark">{formatCurrency(results.icms)}</p>
              </div>
            )}

            {results.iss > 0 && (
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">ISS</p>
                <p className="text-lg font-bold text-brand-dark">{formatCurrency(results.iss)}</p>
              </div>
            )}

            {results.inss > 0 && (
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">INSS</p>
                <p className="text-lg font-bold text-brand-dark">{formatCurrency(results.inss)}</p>
              </div>
            )}

            <div className="p-3 bg-brand-light-blue rounded shadow-sm border border-brand-blue col-span-2 md:col-span-3">
              <p className="text-sm text-brand-blue">Total de Impostos</p>
              <p className="text-xl font-bold text-brand-dark">{formatCurrency(results.total)}</p>
            </div>
          </div>

          <div className="mt-6">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => toast.success("Funcionalidade de geração de guias disponível em breve!")}
            >
              Gerar Guias de Pagamento
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TaxCalculator;
