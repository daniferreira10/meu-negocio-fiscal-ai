
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { ArrowLeft, PlusCircle, MinusCircle } from 'lucide-react';

// Schema para dependente
const dependentSchema = z.object({
  name: z.string().min(1, { message: "Nome do dependente é obrigatório" }),
  age: z.string().min(1, { message: "Idade é obrigatória" }),
  relationship: z.string().min(1, { message: "Grau de parentesco é obrigatório" })
});

// Schema para bem
const assetSchema = z.object({
  type: z.string().min(1, { message: "Tipo do bem é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  value: z.string().min(1, { message: "Valor é obrigatório" })
});

// Schema para dívida
const debtSchema = z.object({
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  amount: z.string().min(1, { message: "Valor é obrigatório" }),
  installments: z.string().optional()
});

// Schema principal para PF
const cpfSchema = z.object({
  fullName: z.string().min(3, { message: "Nome completo deve ter pelo menos 3 caracteres" }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { 
    message: "CPF deve estar no formato: 000.000.000-00" 
  }),
  monthlyIncome: z.string().min(1, { message: "Renda mensal é obrigatória" }),
  monthlyExpenses: z.string().min(1, { message: "Despesas mensais são obrigatórias" }),
  
  // Campos opcionais com arrays
  dependents: z.array(dependentSchema).optional().default([]),
  assets: z.array(assetSchema).optional().default([]),
  debts: z.array(debtSchema).optional().default([]),
  
  // Gastos dedutíveis
  educationExpenses: z.string().optional(),
  healthExpenses: z.string().optional(),
  privateRetirement: z.string().optional()
});

// Tipo para o formulário
type CpfFormValues = z.infer<typeof cpfSchema>;

interface CpfRegistrationFormProps {
  onRegistrationComplete: () => void;
  onBack: () => void;
}

const CpfRegistrationForm = ({ onRegistrationComplete, onBack }: CpfRegistrationFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<CpfFormValues>({
    resolver: zodResolver(cpfSchema),
    defaultValues: {
      fullName: "",
      cpf: "",
      monthlyIncome: "",
      monthlyExpenses: "",
      dependents: [],
      assets: [],
      debts: [],
      educationExpenses: "",
      healthExpenses: "",
      privateRetirement: ""
    }
  });

  // Função para adicionar um novo dependente
  const addDependent = () => {
    const currentDependents = form.getValues().dependents || [];
    form.setValue("dependents", [
      ...currentDependents, 
      { name: "", age: "", relationship: "" }
    ]);
  };

  // Função para remover um dependente
  const removeDependent = (index: number) => {
    const currentDependents = form.getValues().dependents || [];
    form.setValue("dependents", 
      currentDependents.filter((_, i) => i !== index)
    );
  };

  // Função para adicionar um novo bem
  const addAsset = () => {
    const currentAssets = form.getValues().assets || [];
    form.setValue("assets", [
      ...currentAssets, 
      { type: "", description: "", value: "" }
    ]);
  };

  // Função para remover um bem
  const removeAsset = (index: number) => {
    const currentAssets = form.getValues().assets || [];
    form.setValue("assets", 
      currentAssets.filter((_, i) => i !== index)
    );
  };

  // Função para adicionar uma nova dívida
  const addDebt = () => {
    const currentDebts = form.getValues().debts || [];
    form.setValue("debts", [
      ...currentDebts, 
      { description: "", amount: "", installments: "" }
    ]);
  };

  // Função para remover uma dívida
  const removeDebt = (index: number) => {
    const currentDebts = form.getValues().debts || [];
    form.setValue("debts", 
      currentDebts.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: CpfFormValues) => {
    setLoading(true);
    console.log("Dados de PF:", data);
    
    try {
      // Aqui seria a integração com um serviço de cadastro
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula uma chamada de API
      
      toast.success("Cadastro de Pessoa Física realizado com sucesso!");
      onRegistrationComplete();
    } catch (error) {
      console.error("Erro no cadastro de PF:", error);
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
        <h2 className="text-xl font-bold">Cadastro de Pessoa Física</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Dados Básicos */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Dados Básicos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo*</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" {...field} />
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
                    <FormLabel>CPF*</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Renda Mensal (R$)*</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="monthlyExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Despesas Mensais (R$)*</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Dependentes */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Dependentes</h3>
              <Button 
                type="button" 
                variant="outline"
                className="text-brand-blue border-brand-blue hover:bg-brand-light-blue"
                onClick={addDependent}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Adicionar Dependente
              </Button>
            </div>

            {form.getValues().dependents.map((_, index) => (
              <div key={index} className="p-4 bg-white rounded-md mb-4 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Dependente {index + 1}</h4>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeDependent(index)}
                  >
                    <MinusCircle className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`dependents.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome*</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do dependente" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`dependents.${index}.age`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idade*</FormLabel>
                        <FormControl>
                          <Input placeholder="Idade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`dependents.${index}.relationship`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parentesco*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="filho(a)">Filho(a)</SelectItem>
                            <SelectItem value="cônjuge">Cônjuge</SelectItem>
                            <SelectItem value="pai/mãe">Pai/Mãe</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            {form.getValues().dependents.length === 0 && (
              <p className="text-gray-500 text-sm italic">Nenhum dependente informado.</p>
            )}
          </div>

          {/* Bens */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Bens</h3>
              <Button 
                type="button" 
                variant="outline"
                className="text-brand-blue border-brand-blue hover:bg-brand-light-blue"
                onClick={addAsset}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Adicionar Bem
              </Button>
            </div>

            {form.getValues().assets.map((_, index) => (
              <div key={index} className="p-4 bg-white rounded-md mb-4 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Bem {index + 1}</h4>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeAsset(index)}
                  >
                    <MinusCircle className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`assets.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="imóvel">Imóvel</SelectItem>
                            <SelectItem value="veículo">Veículo</SelectItem>
                            <SelectItem value="investimento">Investimento</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`assets.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição*</FormLabel>
                        <FormControl>
                          <Input placeholder="Descrição do bem" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`assets.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor (R$)*</FormLabel>
                        <FormControl>
                          <Input placeholder="0,00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            {form.getValues().assets.length === 0 && (
              <p className="text-gray-500 text-sm italic">Nenhum bem informado.</p>
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                </div>
              </div>
            ))}

            {form.getValues().debts.length === 0 && (
              <p className="text-gray-500 text-sm italic">Nenhuma dívida informada.</p>
            )}
          </div>

          {/* Gastos Dedutíveis */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Gastos Dedutíveis (Opcional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="educationExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gastos com Educação (R$/ano)</FormLabel>
                    <FormControl>
                      <Input placeholder="0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="healthExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gastos com Saúde (R$/ano)</FormLabel>
                    <FormControl>
                      <Input placeholder="0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="privateRetirement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previdência Privada (R$/ano)</FormLabel>
                    <FormControl>
                      <Input placeholder="0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

export default CpfRegistrationForm;
