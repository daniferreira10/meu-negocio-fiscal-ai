
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-brand-light-blue to-brand-light-green py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
              Contabilidade automatizada com Inteligência Artificial
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Faça sua própria contabilidade sem complicações. Nossa IA cuida das obrigações fiscais, 
              relatórios e impostos para o seu negócio no Brasil.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register">
                <Button className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-6 text-lg">
                  Comece Gratuitamente
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="w-full sm:w-auto border-brand-blue text-brand-blue hover:bg-brand-light-blue px-8 py-6 text-lg">
                  Ver Planos
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt="Dashboard de contabilidade automatizada" 
              className="rounded-lg shadow-xl w-full max-w-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
