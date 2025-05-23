
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/services/authService';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { saveClientInfo } from '@/services/userProfileService';

// Define schema for form validation
const clientFormSchema = z.object({
  nome_completo: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  data_abertura: z.date().optional(),
  tipo_empresa: z.string().optional(),
  regime_tributario: z.string().optional(),
  cnae_atividade: z.string().optional(),
  faturamento_mensal: z.coerce.number().optional(),
  receitas: z.string().optional(),
  despesas: z.string().optional(),
  funcionarios: z.coerce.number().optional(),
  folha_pagamento_total: z.coerce.number().optional(),
  notas_fiscais_emitidas: z.string().optional(),
  banco_movimentacoes: z.string().optional()
}).refine(data => Boolean(data.cpf) || Boolean(data.cnpj), {
  message: "Você deve fornecer um CPF ou CNPJ",
  path: ['cpf']
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

const ClientInfoForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      nome_completo: '',
      cpf: '',
      cnpj: '',
      tipo_empresa: '',
      regime_tributario: '',
      cnae_atividade: '',
      faturamento_mensal: undefined,
      receitas: '',
      despesas: '',
      funcionarios: undefined,
      folha_pagamento_total: undefined,
      notas_fiscais_emitidas: '',
      banco_movimentacoes: ''
    }
  });

  const onSubmit = async (data: ClientFormValues) => {
    setLoading(true);
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        toast.error('Você precisa estar conectado para salvar informações');
        return;
      }
      
      const result = await saveClientInfo({
        ...data,
        user_id: currentUser.id,
        id: undefined,
        created_at: undefined,
        updated_at: undefined
      });
      
      if (result) {
        toast.success('Informações salvas com sucesso!');
        // Redirect to dashboard after saving successfully
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        toast.error('Erro ao salvar informações. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao salvar informações:', error);
      toast.error('Erro ao salvar informações. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Formulário de Informações do Cliente</h2>
        <p className="text-gray-500 mt-1">Preencha os dados abaixo para que possamos analisar seu perfil</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome completo */}
            <FormField
              control={form.control}
              name="nome_completo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome completo" {...field} />
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
                  <FormLabel>CPF (para pessoa física)</FormLabel>
                  <FormControl>
                    <Input placeholder="000.000.000-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CNPJ */}
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ (para pessoa jurídica)</FormLabel>
                  <FormControl>
                    <Input placeholder="00.000.000/0001-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Data de abertura */}
            <FormField
              control={form.control}
              name="data_abertura"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de abertura</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy", { locale: pt })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo de empresa */}
            <FormField
              control={form.control}
              name="tipo_empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de empresa</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MEI">MEI</SelectItem>
                      <SelectItem value="LTDA">LTDA</SelectItem>
                      <SelectItem value="EI">EI</SelectItem>
                      <SelectItem value="EIRELI">EIRELI</SelectItem>
                      <SelectItem value="SA">S.A.</SelectItem>
                      <SelectItem value="SLU">SLU</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Regime tributário */}
            <FormField
              control={form.control}
              name="regime_tributario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Regime tributário</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o regime" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="simples_nacional">Simples Nacional</SelectItem>
                      <SelectItem value="lucro_presumido">Lucro Presumido</SelectItem>
                      <SelectItem value="lucro_real">Lucro Real</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CNAE / Atividade */}
            <FormField
              control={form.control}
              name="cnae_atividade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNAE / Atividade principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 6202-3/00 - Desenvolvimento de software" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Faturamento mensal */}
            <FormField
              control={form.control}
              name="faturamento_mensal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faturamento mensal (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0,00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Número de funcionários */}
            <FormField
              control={form.control}
              name="funcionarios"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de funcionários</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Valor total da folha de pagamento */}
            <FormField
              control={form.control}
              name="folha_pagamento_total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor total da folha de pagamento (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0,00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Campos de texto longo */}
          <div className="space-y-6">
            {/* Receitas */}
            <FormField
              control={form.control}
              name="receitas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receitas (descreva ou cole de uma planilha)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva suas receitas ou cole dados de uma planilha"
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Despesas */}
            <FormField
              control={form.control}
              name="despesas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Despesas</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva suas despesas mensais"
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notas fiscais emitidas */}
            <FormField
              control={form.control}
              name="notas_fiscais_emitidas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas fiscais emitidas</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Lista de notas fiscais emitidas no período"
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Movimentações bancárias */}
            <FormField
              control={form.control}
              name="banco_movimentacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movimentações bancárias</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Resumo das movimentações bancárias"
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Enviar Informações"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default ClientInfoForm;
