
import React from 'react';
import ClientInfoForm from '@/components/ClientInfoForm';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileText, UserPlus } from 'lucide-react';

const ClientInformation = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout 
      activeItem="clients"
      title="Informações Contábeis"
      subtitle="Preencha o formulário com suas informações fiscais e contábeis"
      actions={
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/client-registration')}
          className="flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Novo Cliente
        </Button>
      }
    >
      <div className="mb-4 flex items-center space-x-2">
        <FileText className="h-5 w-5 text-brand-blue" />
        <h2 className="text-xl font-medium">Formulário de Coleta de Dados</h2>
      </div>
      
      <ClientInfoForm />
      
      <div className="mt-4 text-sm text-gray-500">
        <p>
          Suas informações são armazenadas com segurança e utilizadas para gerar análises contábeis
          precisas e recomendações personalizadas pela Inteligência Artificial da PrimeDask.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default ClientInformation;
