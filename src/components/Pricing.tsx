
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: "Plano Gratuito",
    price: "R$ 0",
    period: "para sempre",
    description: "Ideal para testar a plataforma",
    features: [
      "Dashboard financeiro",
      "Até 10 lançamentos por mês",
      "Classificação automática básica",
      "Relatórios simplificados"
    ],
    limitations: [
      "Sem cálculo de impostos",
      "Sem geração de guias fiscais",
      "Suporte por IA limitado"
    ],
    buttonText: "Começar Grátis",
    buttonVariant: "outline",
    buttonLink: "/register"
  },
  {
    name: "Plano Premium",
    price: "R$ 89,90",
    period: "por mês",
    description: "Contabilidade completa com IA",
    popular: true,
    features: [
      "Dashboard financeiro completo",
      "Lançamentos ilimitados",
      "Classificação automática avançada",
      "Cálculo de impostos (DAS, ISS, IRPJ)",
      "Geração de guias de pagamento",
      "Relatórios contábeis completos",
      "Suporte por IA ilimitado",
      "Alertas de obrigações fiscais",
      "Importação de extratos bancários",
      "OCR para notas fiscais em PDF"
    ],
    buttonText: "Teste Grátis por 7 Dias",
    buttonVariant: "default",
    buttonLink: "/register"
  }
];

const Pricing = () => {
  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Planos Simples e Transparentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o plano que melhor se adapta às necessidades do seu negócio.
            Cancele a qualquer momento, sem burocracia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-lg p-8 relative ${
                plan.popular 
                  ? 'bg-white border-2 border-brand-blue shadow-lg transform md:scale-105' 
                  : 'bg-white border border-gray-200 shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-brand-blue text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                  Mais Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-brand-dark">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="font-semibold text-brand-dark mb-3">O que está incluído:</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations && (
                  <>
                    <p className="font-semibold text-brand-dark mb-3 mt-6">Limitações:</p>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-500 mr-2 flex-shrink-0 font-bold">•</span>
                          <span className="text-gray-700">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <Link to={plan.buttonLink}>
                <Button 
                  variant={plan.buttonVariant as any} 
                  className={`w-full py-6 text-lg ${
                    plan.buttonVariant === 'outline' 
                      ? 'border-brand-blue text-brand-blue hover:bg-brand-light-blue' 
                      : 'bg-brand-blue hover:bg-brand-blue/90 text-white'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 text-gray-600">
          <p>Todos os planos incluem 7 dias de teste gratuito. Sem compromisso, cancele quando quiser.</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
