
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CompanyRegistrationForm from '@/components/CompanyRegistrationForm';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { UserPlus, Building, FileCheck, Search } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');

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
    <DashboardLayout 
      activeItem="clients" 
      title="Cadastros"
      subtitle="Gerencie informações de clientes e empresas"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-brand-blue" />
            <h2 className="text-xl font-medium">Novo Cadastro</h2>
          </div>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar clientes..."
              className="pl-8 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="client" className="flex items-center gap-2 flex-1">
              <UserPlus className="h-4 w-4" />
              Cliente (Pessoa Física)
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2 flex-1">
              <Building className="h-4 w-4" />
              Empresa
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="client" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cadastrar Cliente</CardTitle>
                <CardDescription>
                  Preencha os dados do cliente para cadastro no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
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

                    <div className="flex justify-end pt-4 space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                      >
                        Limpar
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                        disabled={loading}
                      >
                        {loading ? (
                          <>Salvando...</>
                        ) : (
                          <>
                            <FileCheck className="mr-2 h-4 w-4" />
                            Cadastrar Cliente
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="company" className="space-y-4">
            <CompanyRegistrationForm />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientRegistration;
