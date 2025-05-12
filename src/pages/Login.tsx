
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-brand-dark mb-6 text-center">Entrar na PrimeDask</h1>
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
            <LoginForm />
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Não tem uma conta? <Link to="/register" className="text-brand-blue hover:underline">Registre-se</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
