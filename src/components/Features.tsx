
import { FileText, DollarSign, BellRing, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-12 h-12 text-brand-blue" />,
    title: "Classificação Automática",
    description: "Nossa IA classifica automaticamente suas transações e gera relatórios contábeis completos."
  },
  {
    icon: <DollarSign className="w-12 h-12 text-brand-blue" />,
    title: "Cálculo de Impostos",
    description: "Cálculo automático dos impostos a pagar, como DAS, ISS e IRPJ, de acordo com seu regime tributário."
  },
  {
    icon: <BellRing className="w-12 h-12 text-brand-blue" />,
    title: "Alertas de Obrigações",
    description: "Receba alertas sobre prazos de obrigações fiscais e evite multas por atraso."
  },
  {
    icon: <MessageSquare className="w-12 h-12 text-brand-blue" />,
    title: "Assistente Contábil IA",
    description: "Tire suas dúvidas contábeis a qualquer momento com nosso chatbot especializado em contabilidade brasileira."
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Contabilidade Simplificada com IA
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma utiliza inteligência artificial para automatizar tarefas contábeis complexas,
            economizando seu tempo e dinheiro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-brand-dark">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
