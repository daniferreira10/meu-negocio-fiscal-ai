
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield } from 'lucide-react';
import AccountTypeSelection from '@/components/AccountTypeSelection';
import CpfRegistrationForm from '@/components/registration/CpfRegistrationForm';
import CnpjRegistrationForm from '@/components/registration/CnpjRegistrationForm';
import LoginForm from '@/components/LoginForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

const Register = () => {
  const [registrationStep, setRegistrationStep] = useState<'selection' | 'cpf' | 'cnpj' | 'complete'>('selection');
  
  const handleAccountTypeSelection = (type: 'cpf' | 'cnpj') => {
    setRegistrationStep(type);
  };
  
  const handleRegistrationComplete = () => {
    setRegistrationStep('complete');
    
    // Redirecionamento automático para o dashboard após 3 segundos
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 3000);
  };
  
  const handleBackToSelection = () => {
    setRegistrationStep('selection');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-brand-light-blue rounded-full p-2">
              <Shield className="h-8 w-8 text-brand-blue" />
            </div>
          </div>
          
          {registrationStep === 'selection' && (
            <>
              <h1 className="text-3xl font-bold text-brand-dark mb-2 text-center">Crie sua conta</h1>
              <p className="text-gray-500 mb-6 text-center">E comece a utilizar contabilidade automatizada</p>
            
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                <AccountTypeSelection onSelect={handleAccountTypeSelection} />
              </div>
            </>
          )}
          
          {registrationStep === 'cpf' && (
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <CpfRegistrationForm 
                onRegistrationComplete={handleRegistrationComplete}
                onBack={handleBackToSelection}
              />
            </div>
          )}
          
          {registrationStep === 'cnpj' && (
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 overflow-hidden">
              <CnpjRegistrationForm
                onRegistrationComplete={handleRegistrationComplete}
                onBack={handleBackToSelection}
              />
            </div>
          )}
          
          {registrationStep === 'complete' && (
            <>
              <h1 className="text-3xl font-bold text-brand-dark mb-2 text-center">Cadastro Concluído</h1>
              <p className="text-gray-500 mb-6 text-center">Sua conta foi criada com sucesso</p>
              
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                <Alert className="border-green-100 bg-green-50">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <AlertTitle className="text-green-800">Cadastro realizado com sucesso!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Você será redirecionado para o dashboard em instantes...
                  </AlertDescription>
                </Alert>
                
                <div className="flex justify-center mt-8">
                  <div className="w-16 h-16 border-t-4 border-brand-blue rounded-full animate-spin"></div>
                </div>
              </div>
            </>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Contabilidade automatizada com inteligência artificial <br />
              para empresários brasileiros
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
