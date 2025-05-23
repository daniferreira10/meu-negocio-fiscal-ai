
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Check, FileCode, FileText, PiggyBank, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Cálculos Tributários Automáticos",
      description: "IRPJ, IRPF, CSLL e outros tributos calculados automaticamente com precisão e segurança.",
      icon: <PiggyBank className="h-6 w-6" />
    },
    {
      title: "Geração de Documentos Fiscais",
      description: "Livro-caixa, DARFs e guias de pagamento gerados com apenas alguns cliques.",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Análise e Recomendações",
      description: "Identificação de oportunidades de economia fiscal baseadas na legislação tributária brasileira.",
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: "Assistente Contábil Inteligente",
      description: "Chat com IA especializada em contabilidade brasileira para tirar dúvidas a qualquer momento.",
      icon: <FileCode className="h-6 w-6" />
    },
    {
      title: "Alertas de Prazos Fiscais",
      description: "Notificações sobre obrigações fiscais para nunca perder um prazo importante.",
      icon: <Shield className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-brand-dark-blue text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            PrimeDask - Inteligência Artificial Contábil
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Desenvolvida em San Francisco, Califórnia, para automatizar rotinas contábeis com extrema precisão, economia e inteligência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Quem Somos</h2>
            <p className="text-gray-300 mb-6">
              PrimeDask é uma inteligência artificial especializada em contabilidade brasileira, 
              atendendo contadores, empresas de pequeno e médio porte e profissionais autônomos.
            </p>
            <p className="text-gray-300 mb-6">
              Nossa tecnologia combina o poder da inteligência artificial com um profundo conhecimento
              das complexas leis fiscais brasileiras, facilitando a vida contábil de milhares de empresas.
            </p>
            <Button 
              size="lg" 
              className="bg-brand-blue hover:bg-brand-blue/90 mt-4"
              onClick={() => navigate('/register')}
            >
              Comece Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur">
            <h3 className="text-xl font-bold mb-4">Tecnologias Utilizadas</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2">Backend</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>Flask (Framework Python)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>MongoDB (Banco de dados)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>OpenAI API (GPT-4)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>JWT (Autenticação)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>FPDF2 (Geração de PDFs)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2">Frontend</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>React</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>Tailwind CSS</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>React Router</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>React Hook Form</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>Framer Motion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">Principais Funcionalidades</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="bg-brand-blue/20 rounded-full p-3 w-fit mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Fluxo de Cadastro</h2>
          <p className="text-gray-300 text-center mb-8">
            O cadastro de clientes segue um fluxo em etapas (wizard) para facilitar o processo:
          </p>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0 md:space-x-4">
            <div className="text-center">
              <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Informações Básicas</h3>
              <p className="text-sm text-gray-400">Nome, CPF/CNPJ, data de abertura</p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">Informações Tributárias</h3>
              <p className="text-sm text-gray-400">Tipo de empresa, regime tributário, CNAE</p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Informações Financeiras</h3>
              <p className="text-sm text-gray-400">Faturamento, receitas, despesas, funcionários</p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">4</div>
              <h3 className="font-semibold mb-2">Documentos</h3>
              <p className="text-sm text-gray-400">Notas fiscais, movimentações bancárias</p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">5</div>
              <h3 className="font-semibold mb-2">Revisão</h3>
              <p className="text-sm text-gray-400">Confirmação dos dados antes de finalizar</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para transformar sua contabilidade?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Comece agora a usar a PrimeDask e experimente uma revolução na forma
            de lidar com sua contabilidade e obrigações fiscais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-brand-blue hover:bg-brand-blue/90"
              onClick={() => navigate('/register')}
            >
              Criar Conta
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/pricing')}
            >
              Ver Planos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
