
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import LivroCaixa from '@/components/LivroCaixa';
import EmitirDAS from '@/components/EmitirDAS';
import CalcularIR from '@/components/CalcularIR';
import AnaliseFiscal from '@/components/AnaliseFiscal';
import PrevisaoImpostos from '@/components/PrevisaoImpostos';

const Dashboard = () => {
  const [accountType, setAccountType] = useState('cpf');
  const [step, setStep] = useState('init');
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const handleContinue = () => {
    setStep('collect');
  };

  const handleSubmitData = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('ai');
  };

  const handleModuleSelect = (module: string) => {
    setActiveModule(module);
  };

  const handleCloseModule = () => {
    setActiveModule(null);
  };

  return (
    <DashboardLayout 
      activeItem="dashboard" 
      title="IA Contábil" 
      subtitle="Contabilidade automatizada com IA"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {activeModule === 'livro-caixa' ? (
          <LivroCaixa onClose={handleCloseModule} />
        ) : activeModule === 'emitir-das' ? (
          <EmitirDAS onClose={handleCloseModule} />
        ) : activeModule === 'calcular-ir' ? (
          <CalcularIR onClose={handleCloseModule} />
        ) : activeModule === 'analise-fiscal' ? (
          <AnaliseFiscal onClose={handleCloseModule} />
        ) : activeModule === 'previsao-impostos' ? (
          <PrevisaoImpostos onClose={handleCloseModule} />
        ) : (
          <Card className="rounded-2xl shadow-xl bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              {step === 'init' && (
                <div>
                  <h1 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Bem-vindo ao Painel da IA Contábil</h1>
                  <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
                    Para começar, selecione o tipo de conta e insira as informações básicas para ativar a automação contábil.
                  </p>
                  <Tabs defaultValue="cpf" onValueChange={setAccountType} className="mb-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="cpf">Pessoa Física</TabsTrigger>
                      <TabsTrigger value="cnpj">Pessoa Jurídica</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Button onClick={handleContinue} className="w-full">Começar cadastro</Button>
                </div>
              )}

              {step === 'collect' && (
                <form onSubmit={handleSubmitData} className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Informações {accountType === 'cpf' ? 'Pessoais' : 'da Empresa'}</h2>
                  <Input placeholder={accountType === 'cpf' ? 'Nome completo' : 'Razão Social'} required />
                  <Input placeholder="E-mail" type="email" required />
                  <Input placeholder={accountType === 'cpf' ? 'CPF' : 'CNPJ'} required />
                  {accountType === 'cnpj' && (
                    <>
                      <Input placeholder="Nome do responsável" required />
                      <Input placeholder="Faturamento mensal estimado" required />
                      <Input placeholder="Número de funcionários" required />
                    </>
                  )}
                  {accountType === 'cpf' && (
                    <>
                      <Input placeholder="Profissão / Renda principal" required />
                      <Input placeholder="Despesas mensais estimadas" required />
                    </>
                  )}
                  <Button type="submit" className="w-full">Ativar IA Contábil</Button>
                </form>
              )}

              {step === 'ai' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Inteligência Artificial Ativada</h2>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A IA está agora processando os dados e irá gerar recomendações personalizadas com base na legislação contábil do Brasil.
                  </p>
                  <div className="grid gap-3">
                    <Button 
                      className="w-full" 
                      onClick={() => handleModuleSelect('livro-caixa')}
                    >
                      Gerar Livro Caixa
                    </Button>
                    <Button 
                      className="w-full"
                      onClick={() => handleModuleSelect('emitir-das')}
                    >
                      Emitir DAS Simples Nacional
                    </Button>
                    <Button 
                      className="w-full"
                      onClick={() => handleModuleSelect('calcular-ir')}
                    >
                      Calcular IRPF / IRPJ
                    </Button>
                    <Button 
                      className="w-full"
                      onClick={() => handleModuleSelect('analise-fiscal')}
                    >
                      Análise Fiscal Completa
                    </Button>
                    <Button 
                      className="w-full"
                      onClick={() => handleModuleSelect('previsao-impostos')}
                    >
                      Previsão de Impostos
                    </Button>
                    <Button className="w-full">Relatório Contábil Inteligente</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
