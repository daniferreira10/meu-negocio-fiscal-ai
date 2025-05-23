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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { clientInfoSchema, ClientFormValues } from '@/types/clientInfoTypes';
import { saveClientInfo } from '@/services/userProfileService';
import { getCurrentUser } from '@/services/authService';
import { Info, FileCheck, Users, BanknoteIcon, Receipt } from 'lucide-react';

const ClientInfoForm = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
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

  const nextTab = () => {
    if (activeTab === 'basic') setActiveTab('tax');
    else if (activeTab === 'tax') setActiveTab('financial');
    else if (activeTab === 'financial') setActiveTab('documents');
  };

  const prevTab = () => {
    if (activeTab === 'documents') setActiveTab('financial');
    else if (activeTab === 'financial') setActiveTab('tax');
    else if (activeTab === 'tax') setActiveTab('basic');
  };

  const onSubmit = async (values: ClientFormValues) => {
    setLoading(true);
    try {
      // Get current user
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        toast.error('Usuário não autenticado');
        navigate('/login');
        return;
      }

      // Process the form data - make sure nome_completo is always present
      const clientInfo = {
        ...values,
        nome_completo: values.nome_completo || '', // Ensure it always has a value
        user_id: currentUser.id,
      };

      // Save using our service
      const saved = await saveClientInfo(clientInfo);

      if (saved) {
        toast.success('Informações salvas com sucesso!');
        navigate('/dashboard');
      } else {
        toast.error('Erro ao salvar informações. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao processar requisição');
    } finally {
      setLoading(false);
    }
  };

  const tabIcons = {
    basic: <Info className="w-4 h-4" />,
    tax: <FileCheck className="w-4 h-4" />,
    financial: <BanknoteIcon className="w-4 h-4" />,
    documents: <Receipt className="w-4 h-4" />
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl">Cadastro de Informações Contábeis</CardTitle>
        <CardDescription>
          Preencha as informações para que possamos realizar análises contábeis precisas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  {tabIcons.basic} Básico
                </TabsTrigger>
                <TabsTrigger value="tax" className="flex items-center gap-2">
                  {tabIcons.tax} Tributário
                </TabsTrigger>
                <TabsTrigger value="financial" className="flex items-center gap-2">
                  {tabIcons.financial} Financeiro
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  {tabIcons.documents} Documentos
                </TabsTrigger>
              </TabsList>

              {/* Informações Básicas */}
              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nome_completo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo / Razão Social</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo ou razão social" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  <FormField
                    control={form.control}
                    name="data_abertura"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Abertura</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            value={field.value instanceof Date ? field.value.toISOString().substring(0, 10) : ''} 
                            onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={nextTab}>
                    Próximo
                  </Button>
                </div>
              </TabsContent>

              {/* Informações Tributárias */}
              <TabsContent value="tax" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="tipo_empresa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Empresa</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
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

                  <FormField
                    control={form.control}
                    name="regime_tributario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regime Tributário</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
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

                  <FormField
                    control={form.control}
                    name="cnae_atividade"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>CNAE / Atividade</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 62.01-5-01 - Desenvolvimento de sistemas" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Voltar
                  </Button>
                  <Button type="button" onClick={nextTab}>
                    Próximo
                  </Button>
                </div>
              </TabsContent>

              {/* Informações Financeiras */}
              <TabsContent value="financial" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="faturamento_mensal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Faturamento Mensal (R$)</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="folha_pagamento_total"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Folha de Pagamento Total (R$)</FormLabel>
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

                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="receitas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Receitas</FormLabel>
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

                    <FormField
                      control={form.control}
                      name="despesas"
                      render={({ field }) => (
                        <FormItem>
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
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Voltar
                  </Button>
                  <Button type="button" onClick={nextTab}>
                    Próximo
                  </Button>
                </div>
              </TabsContent>

              {/* Documentos */}
              <TabsContent value="documents" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="notas_fiscais_emitidas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notas Fiscais Emitidas</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Informe as notas fiscais emitidas (número, valor, data)"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="banco_movimentacoes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Banco e Movimentações</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Informe o banco e as movimentações principais"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Voltar
                  </Button>
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                  >
                    {loading ? 'Salvando...' : 'Finalizar Cadastro'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ClientInfoForm;
