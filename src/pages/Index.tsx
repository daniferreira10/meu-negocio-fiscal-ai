
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import { ArrowRight, Bot, Upload, ChartBar, Building } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      
      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <div className="bg-brand-light-blue p-1 w-fit rounded mb-4">
                <Building className="h-6 w-6 text-brand-blue" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Sobre Nós
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A PrimeDesk é uma empresa de tecnologia contábil fundada em São Francisco, 
                Califórnia, com o objetivo de automatizar rotinas fiscais por meio da 
                inteligência artificial. Nosso sistema, amplamente utilizado por empresas 
                nos Estados Unidos, chega ao Brasil com a missão de tornar a contabilidade 
                mais eficiente, acessível e inteligente.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Utilizamos IA para gerar relatórios, simular impostos e organizar finanças 
                de forma automatizada, com total conformidade à legislação brasileira. 
                Contabilidade do futuro, agora ao seu alcance.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-brand blur-xl opacity-20 rounded-xl"></div>
                <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-lg relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-brand-light-blue p-5 rounded-lg">
                      <h3 className="font-bold text-brand-dark mb-1">Fundação</h3>
                      <p className="text-gray-700">São Francisco, Califórnia</p>
                    </div>
                    <div className="bg-brand-light-cyan p-5 rounded-lg">
                      <h3 className="font-bold text-brand-dark mb-1">Tecnologia</h3>
                      <p className="text-gray-700">Inteligência Artificial</p>
                    </div>
                    <div className="bg-brand-light-cyan p-5 rounded-lg">
                      <h3 className="font-bold text-brand-dark mb-1">Foco</h3>
                      <p className="text-gray-700">Automatização Contábil</p>
                    </div>
                    <div className="bg-brand-light-blue p-5 rounded-lg">
                      <h3 className="font-bold text-brand-dark mb-1">Conformidade</h3>
                      <p className="text-gray-700">Legislação Brasileira</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
