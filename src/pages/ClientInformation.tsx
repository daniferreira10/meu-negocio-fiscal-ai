
import React from 'react';
import ClientInfoForm from '@/components/ClientInfoForm';
import Sidebar from '@/components/Sidebar';

const ClientInformation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeItem="clients" />

        {/* Main Content */}
        <main className="ml-20 md:ml-64 w-full min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-brand-dark">
                Informações do Cliente
              </h1>
              <p className="text-gray-500">Preencha o formulário com suas informações contábeis</p>
            </div>
            
            <ClientInfoForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientInformation;
