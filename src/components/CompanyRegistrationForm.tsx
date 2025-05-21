
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { consultarCNPJ } from '@/utils/cnpjUtils';
import { Loader } from 'lucide-react';

// Validação do formulário usando Zod
const companyFormSchema = z.object({
  companyName: z.string().min(2, { message: "Nome da empresa deve ter pelo menos 2 caracteres." }),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, { 
    message: "CNPJ deve estar no formato: 00.000.000/0001-00" 
  }),
  taxRegime: z.string(),
  activityType: z.string(),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos." }),
  email: z.string().email({ message: "Email inválido." }),
  address: z.string().min(5, { message: "Endereço deve ter pelo menos 5 caracteres." }),
  city: z.string().min(2, { message: "Cidade deve ter pelo menos 2 caracteres." }),
  state: z.string().min(2, { message: "Estado deve ter pelo menos 2 caracteres." }),
  zipCode: z.string().regex(/^\d{5}-\d{3}$/, { message: "CEP deve estar no formato: 00000-000" })
});

const CompanyRegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [consultingCNPJ, setConsultingCNPJ] = useState(false);

  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: "",
      cnpj: "",
      taxRegime: "Simples Nacional",
      activityType: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof companyFormSchema>) => {
    setLoading(true);
    console.log("Dados da empresa:", data);
    
    try {
      // Aqui seria a integração com o backend
      // Por enquanto, simularemos um atraso e sucesso
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Empresa cadastrada com sucesso!");
      form.reset();
    } catch (error) {
      toast.error("Erro ao cadastrar empresa. Tente novamente.");
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConsultarCNPJ = async () => {
    const cnpj = form.getValues('cnpj');

    if (!cnpj) {
      toast.error("Por favor, digite um CNPJ válido.");
      return;
    }

    try {
      setConsultingCNPJ(true);
      const data = await consultarCNPJ(cnpj);
      
      if (data) {
        form.setValue('companyName', data.nome);
        
        // Defina o tipo de atividade com base na atividade principal
        if (data.atividade_principal && data.atividade_principal.length > 0) {
          const atividadeText = data.atividade_principal[0].text.toLowerCase();
          
          if (atividadeText.includes('comércio')) {
            form.setValue('activityType', 'Comércio');
          } else if (atividadeText.includes('serviço') || atividadeText.includes('servico')) {
            form.setValue('activityType', 'Serviço');
          } else if (atividadeText.includes('indústria') || atividadeText.includes('industria')) {
            form.setValue('activityType', 'Indústria');
          } else if (atividadeText.includes('agro') || atividadeText.includes('agricultura')) {
            form.setValue('activityType', 'Agronegócio');
          } else {
            form.setValue('activityType', 'Outro');
          }
        }

        if (data.telefone) {
          form.setValue('phone', data.telefone);
        }
        
        if (data.email) {
          form.setValue('email', data.email);
        }

        // Endereço
        const endereco = [data.endereco, data.bairro].filter(Boolean).join(', ');
        if (endereco) {
          form.setValue('address', endereco);
        }
        
        if (data.municipio) {
          form.setValue('city', data.municipio);
        }
        
        if (data.uf) {
          form.setValue('state', data.uf);
        }
        
        if (data.cep) {
          const formattedCep = data.cep.replace(/[^\d]+/g, '');
          if (formattedCep.length === 8) {
            form.setValue('zipCode', `${formattedCep.substring(0, 5)}-${formattedCep.substring(5)}`);
          }
        }

        toast.success("Dados da empresa carregados com sucesso!");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao consultar CNPJ");
    } finally {
      setConsultingCNPJ(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-brand-dark mb-6">Cadastrar Empresa</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CNPJ com botão de consulta */}
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <div className="flex space-x-2">
                    <FormControl>
                      <Input placeholder="00.000.000/0001-00" {...field} />
                    </FormControl>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleConsultarCNPJ}
                      disabled={consultingCNPJ}
                    >
                      {consultingCNPJ ? <Loader className="h-4 w-4 animate-spin" /> : "Consultar"}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nome da Empresa */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Razão Social / Nome Fantasia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Regime Tributário */}
            <FormField
              control={form.control}
              name="taxRegime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Regime Tributário</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o regime tributário" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Simples Nacional">Simples Nacional</SelectItem>
                      <SelectItem value="Lucro Presumido">Lucro Presumido</SelectItem>
                      <SelectItem value="Lucro Real">Lucro Real</SelectItem>
                      <SelectItem value="MEI">MEI</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo de Atividade */}
            <FormField
              control={form.control}
              name="activityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Atividade</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de atividade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Comércio">Comércio</SelectItem>
                      <SelectItem value="Serviço">Serviço</SelectItem>
                      <SelectItem value="Indústria">Indústria</SelectItem>
                      <SelectItem value="Agronegócio">Agronegócio</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
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

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="contato@empresa.com.br" type="email" {...field} />
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
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, número, complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cidade */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estado */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AC">Acre</SelectItem>
                      <SelectItem value="AL">Alagoas</SelectItem>
                      <SelectItem value="AP">Amapá</SelectItem>
                      <SelectItem value="AM">Amazonas</SelectItem>
                      <SelectItem value="BA">Bahia</SelectItem>
                      <SelectItem value="CE">Ceará</SelectItem>
                      <SelectItem value="DF">Distrito Federal</SelectItem>
                      <SelectItem value="ES">Espírito Santo</SelectItem>
                      <SelectItem value="GO">Goiás</SelectItem>
                      <SelectItem value="MA">Maranhão</SelectItem>
                      <SelectItem value="MT">Mato Grosso</SelectItem>
                      <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="PA">Pará</SelectItem>
                      <SelectItem value="PB">Paraíba</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="PE">Pernambuco</SelectItem>
                      <SelectItem value="PI">Piauí</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="RO">Rondônia</SelectItem>
                      <SelectItem value="RR">Roraima</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="SE">Sergipe</SelectItem>
                      <SelectItem value="TO">Tocantins</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CEP */}
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="00000-000" {...field} />
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
              {loading ? "Salvando..." : "Cadastrar Empresa"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default CompanyRegistrationForm;
