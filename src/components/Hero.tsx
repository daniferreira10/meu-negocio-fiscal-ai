import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CircuitBoard, Shield, Zap } from 'lucide-react';
const Hero = () => {
  return <section className="bg-gradient-to-br from-brand-dark-blue to-brand-dark py-16 md:py-24 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="flex items-center mb-4">
              <CircuitBoard className="h-8 w-8 mr-2 text-brand-cyan" />
              <span className="bg-gradient-brand px-4 py-1 rounded-full text-xs font-semibold">
                Plataforma Inteligente
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Contabilidade automatizada com <span className="bg-gradient-brand bg-clip-text text-transparent">Inteligência Artificial</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Faça sua própria contabilidade sem complicações. Nossa IA cuida das obrigações fiscais, 
              relatórios e impostos para o seu negócio no Brasil.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register">
                <Button className="w-full sm:w-auto bg-gradient-brand hover:opacity-90 text-white px-8 py-6 text-lg border-0">
                  Comece Gratuitamente
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="w-full sm:w-auto border-white px-8 py-6 text-lg text-cyan-600 bg-slate-50">
                  Ver Planos
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-brand-cyan" />
                <span className="text-sm">Dados Seguros</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-brand-cyan" />
                <span className="text-sm">Contabilidade Simplificada</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-brand blur-2xl opacity-20 rounded-full"></div>
              <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Dashboard de contabilidade automatizada" className="rounded-lg shadow-xl w-full max-w-md object-cover relative z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;