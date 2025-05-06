
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { ArrowRight, Bot, Upload, ChartBar } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforme sua contabilidade em apenas alguns passos simples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="bg-brand-light-blue w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-dark">1. Insira seus dados</h3>
              <p className="text-gray-600">
                Registre suas receitas, despesas ou importe documentos. Você pode fazer upload de extratos bancários ou notas fiscais.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="bg-brand-light-green w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-dark">2. Nossa IA faz a análise</h3>
              <p className="text-gray-600">
                A inteligência artificial classifica automaticamente suas transações, calcula impostos e prepara relatórios contábeis.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="bg-brand-light-blue w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <ChartBar className="w-8 h-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-dark">3. Visualize seus resultados</h3>
              <p className="text-gray-600">
                Acesse relatórios detalhados, guias de pagamento e insights personalizados para seu negócio.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/register">
              <button className="btn-primary inline-flex items-center">
                <span>Começar agora</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empresários brasileiros que economizam tempo e dinheiro com nossa plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-light-blue flex items-center justify-center text-brand-blue font-bold">
                  MR
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-brand-dark">Marcelo Ribeiro</h3>
                  <p className="text-sm text-gray-500">Microempreendedor Individual</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Não precisava mais de contador para meu MEI. Com esta plataforma, faço tudo sozinho e economizo muito por mês!"
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-light-green flex items-center justify-center text-brand-green font-bold">
                  CS
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-brand-dark">Carolina Santos</h3>
                  <p className="text-sm text-gray-500">E-commerce Simples Nacional</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "A IA classifica minhas vendas automaticamente e me ajuda a entender quais impostos devo pagar. Muito prático!"
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-light-blue flex items-center justify-center text-brand-blue font-bold">
                  RA
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-brand-dark">Rafael Almeida</h3>
                  <p className="text-sm text-gray-500">Agência de Marketing</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Finalmente entendo meus relatórios contábeis! O chatbot responde minhas perguntas em linguagem simples, sem termos técnicos."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
