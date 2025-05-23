
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { clientInfoSchema, ClientFormValues } from '@/types/clientInfoTypes';
import { supabase } from '@/services/supabaseClient';

const ClientInfoForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues: {
      nome_completo: '',
      cpf: '',
      cnpj: '',
      tipo_empresa: '',
      regime_tributario: '',
      cnae_atividade: '',
      receitas: '',
      despesas: '',
      notas_fiscais_emitidas: '',
      banco_movimentacoes: ''
    }
  });

  const onSubmit = async (values: ClientFormValues) => {
    setLoading(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Usuário não autenticado');
        navigate('/login');
        return;
      }

      // Process the form data
      const clientInfo = {
        user_id: user.id,
        ...values
      };

      // Insert data into the database
      const { data, error } = await supabase
        .from('client_info')
        .insert(clientInfo)
        .select();

      if (error) {
        console.error('Error submitting form:', error);
        toast.error('Erro ao salvar informações. Por favor, tente novamente.');
      } else {
        toast.success('Informações salvas com sucesso!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao processar requisição');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome Completo */}
            <FormField
              control={form.control}
              name="nome_completo"
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

            {/* CNPJ */}
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="00.000.000/0000-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Data de Abertura */}
            <FormField
              control={form.control}
              name="data_abertura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Abertura</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value instanceof Date ? field.value.toISOString().substring(0, 10) : ''} 
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo de Empresa */}
            <FormField
              control={form.control}
              name="tipo_empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Empresa</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de empresa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MEI">MEI</SelectItem>
                      <SelectItem value="LTDA">LTDA</SelectItem>
                      <SelectItem value="EI">EI</SelectItem>
                      <SelectItem value="EIRELI">EIRELI</SelectItem>
                      <SelectItem value="SA">S.A.</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Regime Tributário */}
            <FormField
              control={form.control}
              name="regime_tributario"
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
                  <FormLabel>CNAE / Atividade</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 62.01-5-01 - Desenvolvimento de sistemas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Faturamento Mensal */}
            <FormField
              control={form.control}
              name="faturamento_mensal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faturamento Mensal</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Receitas */}
            <FormField
              control={form.control}
              name="receitas"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Receitas (descrever ou copiar de planilha)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Liste ou copie seus itens de receita"
                      className="min-h-[100px]"
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
                <FormItem className="md:col-span-2">
                  <FormLabel>Despesas</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Liste ou copie seus itens de despesa"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Número de Funcionários */}
            <FormField
              control={form.control}
              name="funcionarios"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Funcionários</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Folha de Pagamento Total */}
            <FormField
              control={form.control}
              name="folha_pagamento_total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folha de Pagamento Total</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notas Fiscais Emitidas */}
            <FormField
              control={form.control}
              name="notas_fiscais_emitidas"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Notas Fiscais Emitidas</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Informe as notas fiscais emitidas"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Banco e Movimentações */}
            <FormField
              control={form.control}
              name="banco_movimentacoes"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Banco e Movimentações</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Informe o banco e as movimentações"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Limpar
            </Button>
            <Button 
              type="submit"
              disabled={loading}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
            >
              {loading ? 'Salvando...' : 'Salvar Informações'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default ClientInfoForm;
