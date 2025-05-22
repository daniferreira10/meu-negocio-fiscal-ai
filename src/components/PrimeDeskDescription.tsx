
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Shield, Zap, Brain } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const PrimeDeskDescription = () => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="text-gray-300 space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <div className="bg-brand-light-blue rounded-full p-1 mr-3">
            <Brain className="h-4 w-4 text-brand-blue" />
          </div>
          <p className="text-sm text-left">
            IA revolucionária para automatizar contabilidade brasileira
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="bg-brand-light-blue rounded-full p-1 mr-3">
            <Shield className="h-4 w-4 text-brand-blue" />
          </div>
          <p className="text-sm text-left">
            Segurança e confidencialidade em conformidade com a LGPD
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="bg-brand-light-blue rounded-full p-1 mr-3">
            <Zap className="h-4 w-4 text-brand-blue" />
          </div>
          <p className="text-sm text-left">
            Transforme dados complexos em informações claras e acionáveis
          </p>
        </div>
      </div>
      
      {expanded ? (
        <ScrollArea className="h-[200px] pr-4">
          <div className="text-sm space-y-4">
            <p>
              A PrimeDask é uma inteligência artificial revolucionária desenvolvida em San Francisco, Califórnia, 
              especialmente projetada para transformar a maneira como as rotinas contábeis brasileiras são executadas. 
              Com foco em precisão, economia e inteligência, a PrimeDask representa um avanço significativo na 
              automação de processos contábeis, oferecendo soluções personalizadas para contadores, empresas de 
              pequeno e médio porte e profissionais autônomos que buscam otimizar seu controle financeiro e 
              reduzir custos operacionais.
            </p>
            <p>
              Ao interagir com a PrimeDask, você está se comunicando com uma tecnologia de ponta capaz de processar 
              e transformar dados contábeis complexos em informações claras e acionáveis. Nossa inteligência artificial 
              foi treinada com um vasto conjunto de dados fiscais e contábeis brasileiros, permitindo que ela compreenda 
              perfeitamente as nuances e particularidades da legislação tributária nacional.
            </p>
            <p>
              A PrimeDask recebe seus dados - como CPF, CNPJ, tipo de empresa, notas fiscais, despesas, receitas e 
              movimentações bancárias - e os transforma em ações contábeis automatizadas apresentadas em linguagem 
              simples e acessível. Nosso compromisso é tornar a contabilidade mais eficiente e compreensível, mesmo 
              para quem não possui conhecimentos técnicos na área.
            </p>
            <p>
              Após o cadastro, a PrimeDask estará pronta para processar suas informações contábeis e financeiras, 
              oferecendo insights valiosos e automatizando tarefas que normalmente consumiriam horas do seu tempo. 
              Nossa tecnologia trabalha 24 horas por dia, 7 dias por semana, garantindo que você tenha acesso às 
              informações mais atualizadas sempre que precisar.
            </p>
          </div>
        </ScrollArea>
      ) : null}
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-brand-cyan w-full text-sm"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <>
            Mostrar menos <ChevronUp className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Saiba mais sobre a PrimeDask <ChevronDown className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default PrimeDeskDescription;
