import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import FormHeader from '@/components/forms/FormHeader';
import FormFooter from '@/components/forms/FormFooter';
import RegisterFormContent from '@/components/forms/RegisterFormContent';
import CpfRegistrationForm from '@/components/registration/CpfRegistrationForm';
import CnpjRegistrationForm from '@/components/registration/CnpjRegistrationForm';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import AccountTypeSelection from '@/components/AccountTypeSelection';
import { Button } from '@/components/ui/button';
import PrimeDeskDescription from '@/components/PrimeDeskDescription';

// Define the wizard steps for better organization
const STEPS = {
  WELCOME: 'welcome',
  ACCOUNT_TYPE: 'account_type',
  CREDENTIALS: 'credentials',
  REGISTRATION: 'registration',
  SUCCESS: 'success'
};

const Register = () => {
  const [currentStep, setCurrentStep] = useState<string>(STEPS.WELCOME);
  const [accountType, setAccountType] = useState<'cpf' | 'cnpj'>('cpf');
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  
  // Update progress based on current step
  useEffect(() => {
    const stepToProgress = {
      [STEPS.WELCOME]: 0,
      [STEPS.ACCOUNT_TYPE]: 20,
      [STEPS.CREDENTIALS]: 40,
      [STEPS.REGISTRATION]: 60,
      [STEPS.SUCCESS]: 100
    };
    
    // Animate progress bar
    const newProgress = stepToProgress[currentStep] || 0;
    
    // Gradually animate the progress
    const timer = setTimeout(() => {
      setProgress(newProgress);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentStep]);
  
  const handleAccountTypeSelect = (type: 'cpf' | 'cnpj') => {
    setAccountType(type);
    setCurrentStep(STEPS.CREDENTIALS);
  };
  
  const handleNextToRegistration = () => {
    setCurrentStep(STEPS.REGISTRATION);
  };
  
  const handleBack = () => {
    if (currentStep === STEPS.CREDENTIALS) {
      setCurrentStep(STEPS.ACCOUNT_TYPE);
    } else if (currentStep === STEPS.REGISTRATION) {
      setCurrentStep(STEPS.CREDENTIALS);
    } else if (currentStep === STEPS.ACCOUNT_TYPE) {
      setCurrentStep(STEPS.WELCOME);
    }
  };
  
  const handleRegistrationComplete = () => {
    setCurrentStep(STEPS.SUCCESS);
    // Redirect to dashboard after showing success screen
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case STEPS.WELCOME:
        return (
          <div className="space-y-6 py-6">
            <FormHeader 
              title="Bem-vindo à PrimeDask"
              subtitle="Sua contabilidade automatizada com Inteligência Artificial"
            />
            
            <PrimeDeskDescription />
            
            <Button 
              onClick={() => setCurrentStep(STEPS.ACCOUNT_TYPE)} 
              className="w-full"
            >
              Começar
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
        
      case STEPS.ACCOUNT_TYPE:
        return (
          <AccountTypeSelection onSelect={handleAccountTypeSelect} />
        );
        
      case STEPS.CREDENTIALS:
        return (
          <>
            <FormHeader 
              title="Criar sua conta"
              subtitle="Preencha os dados para acessar a plataforma"
            />
            
            <Tabs defaultValue={accountType} onValueChange={(v) => setAccountType(v as 'cpf' | 'cnpj')} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cpf">Pessoa Física</TabsTrigger>
                <TabsTrigger value="cnpj">Pessoa Jurídica</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <RegisterFormContent 
              accountType={accountType}
              onSubmit={handleNextToRegistration}
            />
            
            <FormFooter
              text="Já tem uma conta?"
              linkText="Entrar agora"
              href="/login"
            />
          </>
        );
        
      case STEPS.REGISTRATION:
        return (
          accountType === 'cpf' ? (
            <CpfRegistrationForm 
              onRegistrationComplete={handleRegistrationComplete}
              onBack={handleBack}
            />
          ) : (
            <CnpjRegistrationForm 
              onRegistrationComplete={handleRegistrationComplete}
              onBack={handleBack}
            />
          )
        );
        
      case STEPS.SUCCESS:
        return (
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Cadastro Concluído!</h2>
            <p className="text-gray-600 mb-6">
              Parabéns! Sua conta foi criada com sucesso. Você será redirecionado para o seu painel personalizado.
            </p>
            
            <p className="text-sm text-gray-500">Redirecionando em alguns segundos...</p>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const showBackButton = currentStep !== STEPS.WELCOME && currentStep !== STEPS.SUCCESS;
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-brand-dark-blue">
      <div className="grid flex-1 place-items-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="border-gray-800 bg-gray-900/80 backdrop-blur">
            <CardContent className="p-6">
              {/* Progress indicator */}
              {currentStep !== STEPS.SUCCESS && (
                <div className="mb-6">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-400">Progresso</span>
                    <span className="text-brand-cyan">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
              
              {/* Back button */}
              {showBackButton && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mb-4"
                  onClick={handleBack}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              )}
              
              {/* Dynamic content based on current step */}
              {renderStepContent()}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
