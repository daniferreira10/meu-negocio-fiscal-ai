
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingComponent from '@/components/Pricing';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Planos e Preços
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Escolha o plano ideal para o seu negócio. Todos os planos incluem 7 dias de teste gratuito.
              </p>
            </div>
          </div>
        </div>
        
        <PricingComponent />
        
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-brand-light-blue rounded-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-brand-dark mb-2">
                  Perguntas Frequentes
                </h2>
                <p className="text-gray-600">
                  Respostas para as dúvidas mais comuns sobre nossa plataforma.
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark mb-2">
                    Preciso ter conhecimentos de contabilidade?
                  </h3>
                  <p className="text-gray-600">
                    Não. Nossa plataforma foi projetada para que qualquer empresário possa utilizá-la, mesmo sem conhecimentos prévios de contabilidade. A IA irá guiá-lo em todas as etapas.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark mb-2">
                    Meus dados estão seguros?
                  </h3>
                  <p className="text-gray-600">
                    Sim. Utilizamos criptografia de ponta a ponta e seguimos todas as diretrizes da LGPD para proteger seus dados. Além disso, nossos servidores estão hospedados no Brasil.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark mb-2">
                    Posso cancelar minha assinatura a qualquer momento?
                  </h3>
                  <p className="text-gray-600">
                    Sim. Você pode cancelar sua assinatura a qualquer momento sem multas ou taxas adicionais. O cancelamento é feito diretamente em sua conta.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark mb-2">
                    A plataforma serve para qualquer regime tributário?
                  </h3>
                  <p className="text-gray-600">
                    Sim. Nossa plataforma atende empresas de todos os regimes tributários: MEI, Simples Nacional, Lucro Presumido e Lucro Real.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
