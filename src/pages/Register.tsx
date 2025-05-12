
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import { Shield } from 'lucide-react';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-brand-light-blue rounded-full p-2">
              <Shield className="h-8 w-8 text-brand-blue" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-brand-dark mb-2 text-center">Crie sua conta</h1>
          <p className="text-gray-500 mb-6 text-center">E comece a utilizar contabilidade automatizada</p>
          
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
            <LoginForm isRegister={true} />
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Já possui uma conta? <a href="/login" className="text-brand-blue hover:underline">Entrar</a>
              </p>
            </div>
          </div>
          
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
