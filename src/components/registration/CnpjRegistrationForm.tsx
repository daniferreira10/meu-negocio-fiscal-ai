
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { toast } from 'sonner';
import { ArrowLeft, PlusCircle, MinusCircle } from 'lucide-react';

// Schema para obrigações acessórias
const obligationSchema = z.object({
  name: z.string().min(1, { message: "Nome da obrigação é obrigatório" }),
  frequency: z.string().min(1, { message: "Frequência é obrigatória" }),
  dueDate: z.string().optional()
});

// Schema para dívidas da empresa
const companyDebtSchema = z.object({
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  amount: z.string().min(1, { message: "Valor é obrigatório" }),
  installments: z.string().optional(),
  dueDate: z.string().optional()
});

// Schema principal para PJ
const cnpjSchema = z.object({
  companyName: z.string().min(3, { message: "Razão social deve ter pelo menos 3 caracteres" }),
  tradeName: z.string().min(1, { message: "Nome fantasia é obrigatório" }),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, { 
    message: "CNPJ deve estar no formato: 00.000.000/0001-00" 
  }),
  taxRegime: z.string().min(1, { message: "Regime tributário é obrigatório" }),
  monthlyRevenue: z.string().min(1, { message: "Faturamento mensal é obrigatório" }),
  operationalExpenses: z.string().min(1, { message: "Despesas operacionais são obrigatórias" }),
  payroll: z.string().min(1, { message: "Folha de pagamento é obrigatória" }),
  employeesCount: z.string().min(1, { message: "Quantidade de funcionários é obrigatória" }),
  issuesInvoices: z.boolean().default(false),
  
  // Campos opcionais com arrays
  obligations: z.array(obligationSchema).optional().default([]),
  debts: z.array(companyDebtSchema).optional().default([])
});

// Tipo para o formulário
type CnpjFormValues = z.infer<typeof cnpjSchema>;

interface CnpjRegistrationFormProps {
  onRegistrationComplete: () => void;
  onBack: () => void;
}

const CnpjRegistrationForm = ({ onRegistrationComplete, onBack }: CnpjRegistrationFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<CnpjFormValues>({
    resolver: zodResolver(cnpjSchema),
    defaultValues: {
      companyName: "",
      tradeName: "",
      cnpj: "",
      taxRegime: "",
      monthlyRevenue: "",
      operationalExpenses: "",
      payroll: "",
      employeesCount: "",
      issuesInvoices: false,
      obligations: [],
      debts: []
    }
  });

  // Função para adicionar uma nova obrigação acessória
  const addObligation = () => {
    const currentObligations = form.getValues().obligations || [];
    form.setValue("obligations", [
      ...currentObligations, 
      { name: "", frequency: "", dueDate: "" }
    ]);
  };

  // Função para remover uma obrigação
  const removeObligation = (index: number) => {
    const currentObligations = form.getValues().obligations || [];
    form.setValue("obligations", 
      currentObligations.filter((_, i) => i !== index)
    );
  };

  // Função para adicionar uma nova dívida
  const addDebt = () => {
    const currentDebts = form.getValues().debts || [];
    form.setValue("debts", [
      ...currentDebts, 
      { description: "", amount: "", installments: "", dueDate: "" }
    ]);
  };

  // Função para remover uma dívida
  const removeDebt = (index: number) => {
    const currentDebts = form.getValues().debts || [];
    form.setValue("debts", 
      currentDebts.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: CnpjFormValues) => {
    setLoading(true);
    console.log("Dados de PJ:", data);
    
    try {
      // Aqui seria a integração com um serviço de cadastro
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula uma chamada de API
      
      toast.success("Cadastro de Pessoa Jurídica realizado com sucesso!");
      onRegistrationComplete();
    } catch (error) {
      console.error("Erro no cadastro de PJ:", error);
      toast.error("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
        <h2 className="text-xl font-bold">Cadastro de Pessoa Jurídica</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Dados Básicos da Empresa */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Dados da Empresa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razão Social*</FormLabel>
                    <FormControl>
                      <Input placeholder="Razão social completa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tradeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Fantasia*</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome fantasia" {...field} />
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
                    <FormLabel>CNPJ*</FormLabel>
                    <FormControl>
                      <Input placeholder="00.000.000/0001-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="taxRegime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Regime Tributário*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o regime tributário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="simples_nacional">Simples Nacional</SelectItem>
                        <SelectItem value="lucro_presumido">Lucro Presumido</SelectItem>
                        <SelectItem value="lucro_real">Lucro Real</SelectItem>
                        <SelectItem value="mei">MEI</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Dados Financeiros */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Informações Financeiras</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="monthlyRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Faturamento Mensal (R$)*</FormLabel>
                    <FormControl>
                      <Input placeholder="0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="operationalExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Despesas Operacionais (R$)*</FormLabel>
                    <FormControl>
                      <Input placeholder="0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="payroll"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Folha de Pagamento (R$)*</FormLabel>
                    <FormControl>
                      <Input placeholder="0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employeesCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade de Funcionários*</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="issuesInvoices"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Emite Notas Fiscais?</FormLabel>
                      <FormDescription>
                        Sua empresa emite notas fiscais regularmente?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Obrigações Acessórias */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Obrigações Acessórias</h3>
              <Button 
                type="button" 
                variant="outline"
                className="text-brand-blue border-brand-blue hover:bg-brand-light-blue"
                onClick={addObligation}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Adicionar Obrigação
              </Button>
            </div>

            {form.getValues().obligations.map((_, index) => (
              <div key={index} className="p-4 bg-white rounded-md mb-4 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Obrigação {index + 1}</h4>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeObligation(index)}
                  >
                    <MinusCircle className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`obligations.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome*</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome da obrigação" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`obligations.${index}.frequency`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequência*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mensal">Mensal</SelectItem>
                            <SelectItem value="trimestral">Trimestral</SelectItem>
                            <SelectItem value="semestral">Semestral</SelectItem>
                            <SelectItem value="anual">Anual</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`obligations.${index}.dueDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vencimento (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Dia ou data de vencimento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            {form.getValues().obligations.length === 0 && (
              <p className="text-gray-500 text-sm italic">Nenhuma obrigação acessória informada.</p>
            )}
          </div>

          {/* Dívidas e Financiamentos */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Dívidas e Financiamentos</h3>
              <Button 
                type="button" 
                variant="outline"
                className="text-brand-blue border-brand-blue hover:bg-brand-light-blue"
                onClick={addDebt}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Adicionar Dívida
              </Button>
            </div>

            {form.getValues().debts.map((_, index) => (
              <div key={index} className="p-4 bg-white rounded-md mb-4 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Dívida {index + 1}</h4>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeDebt(index)}
                  >
                    <MinusCircle className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`debts.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição*</FormLabel>
                        <FormControl>
                          <Input placeholder="Descrição da dívida" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`debts.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Total (R$)*</FormLabel>
                        <FormControl>
                          <Input placeholder="0,00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`debts.${index}.installments`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parcelas (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Número de parcelas" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`debts.${index}.dueDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vencimento (opcional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            {form.getValues().debts.length === 0 && (
              <p className="text-gray-500 text-sm italic">Nenhuma dívida informada.</p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="mr-2"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
              disabled={loading}
            >
              {loading ? "Processando..." : "Concluir Cadastro"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CnpjRegistrationForm;
