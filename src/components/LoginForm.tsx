
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { registerUser, loginUser } from '@/services/authService';

interface LoginFormProps {
  isRegister?: boolean;
}

const LoginForm = ({ isRegister = false }: LoginFormProps) => {
  const [activeTab, setActiveTab] = useState<string>(isRegister ? "register" : "login");
  const [accountType, setAccountType] = useState('cpf');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const rememberMe = Boolean(formData.get('rememberMe'));

    try {
      const result = await loginUser(email, password, rememberMe);
      
      if (result.success) {
        toast.success("Login realizado com sucesso!");
        navigate('/dashboard');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const success = await registerUser(email, password);
      
      if (success) {
        toast.success("Cadastro realizado com sucesso!");
        navigate('/register');
      }
    } catch (error: any) {
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
        toast.error("Este e-mail já está em uso. Tente outro ou faça login.");
      } else {
        toast.error("Erro ao criar conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="rounded-lg shadow-lg border border-gray-200 bg-white">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-brand-dark">
                  Entrar na sua conta
                </h2>
                <p className="text-gray-600 mt-2">
                  Acesse sua contabilidade automatizada
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
                  <Input id="email" name="email" type="email" placeholder="exemplo@empresa.com.br" required />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
                  <Input id="password" name="password" type="password" placeholder="Sua senha" required />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Lembrar-me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-brand-blue hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-brand-dark">
                  Crie sua conta
                </h2>
                <p className="text-gray-600 mt-2">
                  Comece a usar nossa contabilidade automatizada com IA
                </p>
              </div>

              <Tabs defaultValue="cpf" onValueChange={setAccountType} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cpf">Pessoa Física</TabsTrigger>
                  <TabsTrigger value="cnpj">Pessoa Jurídica</TabsTrigger>
                </TabsList>
              </Tabs>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                    {accountType === 'cpf' ? 'Nome Completo' : 'Razão Social'}
                  </label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    placeholder={accountType === 'cpf' ? 'Seu nome completo' : 'Razão social da empresa'} 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="exemplo@email.com.br" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="Mínimo 8 caracteres" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirmar Senha</label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    placeholder="Confirme sua senha" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="document" className="block text-sm font-medium mb-1">
                    {accountType === 'cpf' ? 'CPF' : 'CNPJ'}
                  </label>
                  <Input 
                    id="document" 
                    name="document" 
                    placeholder={accountType === 'cpf' ? '000.000.000-00' : '00.000.000/0001-00'} 
                    required 
                  />
                </div>
                
                {accountType === 'cnpj' && (
                  <div>
                    <label htmlFor="responsavel" className="block text-sm font-medium mb-1">Nome do Responsável</label>
                    <Input 
                      id="responsavel" 
                      name="responsavel" 
                      placeholder="Nome do responsável legal" 
                      required 
                    />
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    Li e concordo com os <a href="#" className="text-brand-blue hover:underline">Termos de Serviço</a> e <a href="#" className="text-brand-blue hover:underline">Política de Privacidade</a>
                  </label>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Criando conta..." : "Criar Conta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Contabilidade automatizada com inteligência artificial <br />
              para empresários brasileiros
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoginForm;
