
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { consultarCNPJ } from '@/utils/cnpjUtils';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const CnpjRegistrationForm = () => {
  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [faturamentoMensal, setFaturamentoMensal] = useState('');
  const [regimeTributario, setRegimeTributario] = useState('simples_nacional');
  const [numeroFuncionarios, setNumeroFuncionarios] = useState('');
  const [atividadePrincipal, setAtividadePrincipal] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');
  const [situacao, setSituacao] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Formata CNPJ enquanto digita: 99.999.999/9999-99
    let formattedValue = value.replace(/\D/g, ''); // Remove não-dígitos
    
    if (formattedValue.length > 14) {
      formattedValue = formattedValue.substring(0, 14);
    }
    
    if (formattedValue.length > 0) {
      // Aplica máscara conforme vai digitando
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.replace(/^(\d{2})/, '$1.');
      }
      if (formattedValue.length > 6) {
        formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})/, '$1.$2.');
      }
      if (formattedValue.length > 10) {
        formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})/, '$1.$2.$3/');
      }
      if (formattedValue.length > 15) {
        formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})/, '$1.$2.$3/$4-');
      }
    }
    
    setCnpj(formattedValue);
  };

  const handleConsultarCNPJ = async () => {
    if (cnpj.replace(/\D/g, '').length !== 14) {
      toast.error('CNPJ inválido. Deve conter 14 dígitos.');
      return;
    }

    setLoading(true);
    try {
      const data = await consultarCNPJ(cnpj);
      if (data) {
        setRazaoSocial(data.nome);
        setNomeFantasia(data.fantasia || '');
        setAtividadePrincipal(data.atividade_principal[0]?.text || '');
        setSituacao(data.situacao);
        setDataAbertura(data.data_abertura);
        setEmail(data.email || '');
        setTelefone(data.telefone || '');
        
        // Verificar situação cadastral
        if (data.situacao !== 'ATIVA') {
          toast.warning(`Atenção: CNPJ com situação ${data.situacao}. Verifique a regularidade.`);
        } else {
          toast.success('Dados do CNPJ carregados com sucesso!');
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro na consulta do CNPJ');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validação de formulário
    if (!cnpj || !razaoSocial || !email) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }
    
    // Simulação de envio de dados para o backend
    toast.success('Empresa cadastrada com sucesso!');
  };

  // Formatação para valores monetários
  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue === '') return '';
    
    const number = parseInt(numericValue, 10) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number);
  };

  const handleFaturamentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    
    if (numericValue === '') {
      setFaturamentoMensal('');
      return;
    }
    
    const formattedValue = formatCurrency(numericValue);
    setFaturamentoMensal(formattedValue);
  };

  return (
    <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Cadastro de Pessoa Jurídica</h2>
            <p className="text-sm text-gray-500">
              Preencha os dados do CNPJ para ativar as funcionalidades contábeis avançadas.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Seção: Dados do CNPJ */}
            <div className="grid gap-4">
              <h3 className="text-md font-medium text-gray-700">Dados da Empresa</h3>
              
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="cnpj"
                      placeholder="00.000.000/0000-00"
                      value={cnpj}
                      onChange={handleCnpjChange}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={handleConsultarCNPJ} 
                      disabled={loading}
                      className="whitespace-nowrap"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Consultando...
                        </>
                      ) : (
                        "Consultar"
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="razaoSocial">Razão Social</Label>
                  <Input 
                    id="razaoSocial" 
                    placeholder="Nome oficial da empresa" 
                    value={razaoSocial}
                    onChange={(e) => setRazaoSocial(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                  <Input 
                    id="nomeFantasia" 
                    placeholder="Nome comercial (opcional)" 
                    value={nomeFantasia}
                    onChange={(e) => setNomeFantasia(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="atividadePrincipal">Atividade Principal</Label>
                  <Input 
                    id="atividadePrincipal" 
                    placeholder="CNAE e descrição" 
                    value={atividadePrincipal}
                    onChange={(e) => setAtividadePrincipal(e.target.value)}
                    className="mt-1"
                    readOnly={!!atividadePrincipal}
                  />
                </div>
                <div>
                  <Label htmlFor="dataAbertura">Data de Abertura</Label>
                  <Input 
                    id="dataAbertura" 
                    placeholder="DD/MM/AAAA" 
                    value={dataAbertura}
                    onChange={(e) => setDataAbertura(e.target.value)}
                    className="mt-1"
                    readOnly={!!dataAbertura}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="situacao">Situação Cadastral</Label>
                  <Input 
                    id="situacao" 
                    value={situacao}
                    className="mt-1"
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="regimeTributario">Regime Tributário</Label>
                  <Select value={regimeTributario} onValueChange={setRegimeTributario}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o regime tributário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simples_nacional">Simples Nacional</SelectItem>
                      <SelectItem value="lucro_presumido">Lucro Presumido</SelectItem>
                      <SelectItem value="lucro_real">Lucro Real</SelectItem>
                      <SelectItem value="mei">MEI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Seção: Contato */}
            <div className="grid gap-4">
              <h3 className="text-md font-medium text-gray-700">Dados de Contato</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="responsavel">Nome do Responsável</Label>
                  <Input 
                    id="responsavel" 
                    placeholder="Quem responde pela empresa" 
                    value={responsavel}
                    onChange={(e) => setResponsavel(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="contato@empresa.com.br" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input 
                    id="telefone" 
                    placeholder="(00) 00000-0000" 
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="faturamentoMensal">Faturamento Mensal Médio</Label>
                  <Input 
                    id="faturamentoMensal" 
                    placeholder="R$ 0,00" 
                    value={faturamentoMensal}
                    onChange={handleFaturamentoChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="numeroFuncionarios">Número de Funcionários</Label>
                <Input 
                  id="numeroFuncionarios" 
                  placeholder="Quantidade de colaboradores" 
                  value={numeroFuncionarios}
                  onChange={(e) => setNumeroFuncionarios(e.target.value.replace(/\D/g, ''))}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Seção: Termos e Envio */}
            <div className="grid gap-4">
              <div>
                <RadioGroup defaultValue="aceito">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aceito" id="termos" />
                    <Label htmlFor="termos" className="text-sm">
                      Concordo com os termos de uso e política de privacidade
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full">
                Cadastrar Empresa
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CnpjRegistrationForm;
