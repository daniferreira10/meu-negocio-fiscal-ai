
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormHeader from '@/components/forms/FormHeader';
import FormFooter from '@/components/forms/FormFooter';
import RegisterFormContent from '@/components/forms/RegisterFormContent';
import CpfRegistrationForm from '@/components/registration/CpfRegistrationForm';
import CnpjRegistrationForm from '@/components/registration/CnpjRegistrationForm';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [step, setStep] = useState<'credentials' | 'registration'>('credentials');
  const [accountType, setAccountType] = useState<'cpf' | 'cnpj'>('cpf');
  const navigate = useNavigate();

  const handleRegistrationComplete = () => {
    navigate('/dashboard');
  };

  const handleBack = () => {
    setStep('credentials');
  };

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
              {step === 'credentials' ? (
                <>
                  <FormHeader 
                    title="Criar sua conta"
                  />
                  
                  <p className="text-gray-400 mb-6">Preencha os dados para acessar a plataforma</p>
                  
                  <Tabs defaultValue={accountType} onValueChange={(v) => setAccountType(v as 'cpf' | 'cnpj')} className="mb-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="cpf">Pessoa Física</TabsTrigger>
                      <TabsTrigger value="cnpj">Pessoa Jurídica</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <RegisterFormContent 
                    accountType={accountType}
                    onSubmit={() => setStep('registration')}
                  />
                  
                  <FormFooter
                    actionText="Entrar agora"
                    actionHref="/login"
                    question="Já tem uma conta?"
                  />
                </>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
