
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-blue flex items-center">
          <span className="text-brand-green">Meu</span>
          <span>NegócioFiscal</span>
          <span className="text-brand-green ml-1">AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-gray-700 hover:text-brand-blue transition-colors">
            Início
          </Link>
          <Link to="/pricing" className="font-medium text-gray-700 hover:text-brand-blue transition-colors">
            Planos
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-light-blue">
                Entrar
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">
                Cadastre-se
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-lg animate-in">
          <nav className="flex flex-col space-y-4 pb-4">
            <Link 
              to="/" 
              className="font-medium text-gray-700 hover:text-brand-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/pricing" 
              className="font-medium text-gray-700 hover:text-brand-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Planos
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-light-blue">
                  Entrar
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white">
                  Cadastre-se
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
