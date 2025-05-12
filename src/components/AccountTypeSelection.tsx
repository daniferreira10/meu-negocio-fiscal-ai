
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserIcon, Building2Icon } from 'lucide-react';

interface AccountTypeSelectionProps {
  onSelect: (type: 'cpf' | 'cnpj') => void;
}

const AccountTypeSelection = ({ onSelect }: AccountTypeSelectionProps) => {
  const [hoveredCard, setHoveredCard] = useState<'cpf' | 'cnpj' | null>(null);
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-brand-dark">Selecione o tipo de conta</h2>
        <p className="text-gray-600 mt-2">Você está se cadastrando como Pessoa Física (CPF) ou Pessoa Jurídica (CNPJ)?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer border-2 transition-all ${
            hoveredCard === 'cpf' ? 'border-brand-blue shadow-md' : 'border-gray-100'
          }`}
          onMouseEnter={() => setHoveredCard('cpf')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => onSelect('cpf')}
        >
          <CardContent className="flex flex-col items-center p-6">
            <div className={`rounded-full p-3 mb-4 ${
              hoveredCard === 'cpf' ? 'bg-brand-light-blue' : 'bg-gray-100'
            }`}>
              <UserIcon 
                className={`h-8 w-8 ${
                  hoveredCard === 'cpf' ? 'text-brand-blue' : 'text-gray-600'
                }`} 
              />
            </div>
            <h3 className="font-bold text-lg mb-2">Pessoa Física</h3>
            <p className="text-gray-500 text-center">Para profissionais autônomos, freelancers e pessoas físicas</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer border-2 transition-all ${
            hoveredCard === 'cnpj' ? 'border-brand-blue shadow-md' : 'border-gray-100'
          }`}
          onMouseEnter={() => setHoveredCard('cnpj')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => onSelect('cnpj')}
        >
          <CardContent className="flex flex-col items-center p-6">
            <div className={`rounded-full p-3 mb-4 ${
              hoveredCard === 'cnpj' ? 'bg-brand-light-blue' : 'bg-gray-100'
            }`}>
              <Building2Icon 
                className={`h-8 w-8 ${
                  hoveredCard === 'cnpj' ? 'text-brand-blue' : 'text-gray-600'
                }`} 
              />
            </div>
            <h3 className="font-bold text-lg mb-2">Pessoa Jurídica</h3>
            <p className="text-gray-500 text-center">Para empresas, microempresas e organizações com CNPJ</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-2">
        <p>Você poderá alterar essa seleção mais tarde se necessário.</p>
      </div>
    </div>
  );
};

export default AccountTypeSelection;
