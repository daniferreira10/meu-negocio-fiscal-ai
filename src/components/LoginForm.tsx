
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface LoginFormProps {
  isRegister?: boolean;
}

const LoginForm = ({ isRegister = false }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Form validation
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }
    
    if (isRegister && password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      setLoading(false);
      return;
    }

    // Simulate authentication (in a real app, this would be connected to a backend)
    setTimeout(() => {
      if (isRegister) {
        toast.success("Cadastro realizado com sucesso!");
        // In a real app, we would redirect to login or directly to dashboard
      } else {
        toast.success("Login realizado com sucesso!");
        // In a real app, we would redirect to dashboard
        window.location.href = '/dashboard';
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-brand-dark">
          {isRegister ? "Crie sua conta" : "Bem-vindo de volta"}
        </h2>
        <p className="text-gray-600 mt-2">
          {isRegister 
            ? "Comece a usar nossa contabilidade automatizada com IA" 
            : "Faça login para acessar sua conta"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <Input
            id="email"
            type="email"
            placeholder="exemplo@empresa.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>

        {isRegister && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Senha
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
        )}

        {!isRegister && (
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-brand-blue hover:underline">
              Esqueceu sua senha?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-6"
          disabled={loading}
        >
          {loading ? "Carregando..." : isRegister ? "Criar Conta" : "Entrar"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}
          <Link 
            to={isRegister ? "/login" : "/register"} 
            className="text-brand-blue hover:underline ml-1"
          >
            {isRegister ? "Faça login" : "Cadastre-se"}
          </Link>
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Ao {isRegister ? "criar uma conta" : "fazer login"}, você concorda com nossos{" "}
          <a href="#" className="text-brand-blue hover:underline">Termos de Serviço</a> e{" "}
          <a href="#" className="text-brand-blue hover:underline">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
