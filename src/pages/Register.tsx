
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-brand-dark mb-6 text-center">Criar uma conta PrimeDesk</h1>
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
            <LoginForm isRegister={true} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
