
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CompanyRegistrationForm from '@/components/CompanyRegistrationForm';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

const clientSchema = z.object({
  fullName: z.string().min(3, { message: "Nome completo deve ter pelo menos 3 caracteres." }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { 
    message: "CPF deve estar no formato: 000.000.000-00" 
  }),
  email: z.string().email({ message: "Email inválido." }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos." }),
  address: z.string().min(5, { message: "Endereço deve ter pelo menos 5 caracteres." })
});

const ClientRegistration = () => {
  const [activeTab, setActiveTab] = useState('client');
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      fullName: "",
      cpf: "",
      email: "",
      phone: "",
      address: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof clientSchema>) => {
    setLoading(true);
    console.log("Dados do cliente:", data);
    
    try {
      // Aqui seria a integração com o backend
      // Por enquanto, simularemos um atraso e sucesso
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Cliente cadastrado com sucesso!");
      form.reset();
    } catch (error) {
      toast.error("Erro ao cadastrar cliente. Tente novamente.");
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-20 md:w-64 min-h-screen bg-white shadow-md flex flex-col fixed">
          <div className="p-4 border-b border-gray-100">
            <a href="/dashboard" className="text-xl font-bold text-brand-blue hidden md:flex items-center">
              <span className="text-brand-blue">Prime</span>
              <span className="text-brand-dark">Dask</span>
            </a>
            <div className="md:hidden flex justify-center">
              <span className="text-xl font-bold text-brand-blue">P</span>
            </div>
          </div>
          
          <nav className="flex-1 py-6">
            <ul className="space-y-1">
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <span className="h-5 w-5 md:mr-2">🏠</span>
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start bg-brand-light-blue text-brand-blue"
                >
                  <span className="h-5 w-5 md:mr-2">👤</span>
                  <span className="hidden md:inline">Cadastros</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600"
                >
                  <span className="h-5 w-5 md:mr-2">💰</span>
                  <span className="hidden md:inline">Finanças</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600"
                >
                  <span className="h-5 w-5 md:mr-2">📄</span>
                  <span className="hidden md:inline">Impostos</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600"
                >
                  <span className="h-5 w-5 md:mr-2">💬</span>
                  <span className="hidden md:inline">Assistente IA</span>
                </Button>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-100">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600"
              onClick={() => window.location.href = '/'}
            >
              <span className="h-5 w-5 md:mr-2">🚪</span>
              <span className="hidden md:inline">Sair</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-20 md:ml-64 w-full min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-brand-dark">
                  Cadastros
                </h1>
                <p className="text-gray-500">Gerencie informações de clientes e empresas</p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="client">Cliente (Pessoa Física)</TabsTrigger>
                <TabsTrigger value="company">Empresa</TabsTrigger>
              </TabsList>
              
              <TabsContent value="client" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-brand-dark mb-6">Cadastrar Cliente</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nome Completo */}
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome Completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome completo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* CPF */}
                        <FormField
                          control={form.control}
                          name="cpf"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CPF</FormLabel>
                              <FormControl>
                                <Input placeholder="000.000.000-00" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Email */}
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="email@exemplo.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Telefone */}
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl>
                                <Input placeholder="(00) 00000-0000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Endereço */}
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Endereço Completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Rua, número, complemento, bairro, cidade, estado, CEP" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="mr-2 border-brand-blue text-brand-blue hover:bg-brand-light-blue"
                          onClick={() => form.reset()}
                        >
                          Limpar
                        </Button>
                        <Button 
                          type="submit" 
                          className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                          disabled={loading}
                        >
                          {loading ? "Salvando..." : "Cadastrar Cliente"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </Card>
              </TabsContent>
              
              <TabsContent value="company" className="space-y-4">
                <CompanyRegistrationForm />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientRegistration;
