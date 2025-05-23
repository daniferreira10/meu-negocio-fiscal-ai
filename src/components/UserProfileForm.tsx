import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CurrencyInput } from '@/components/ui/currency-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  getUserProfile, 
  savePhysicalPersonProfile,
  ProfileType,
  MaritalStatus,
  IncomeRange
} from '@/services/userProfileService';
import { getCurrentUser } from '@/services/authService';
import { physicalPersonSchema } from '@/types/userProfileTypes';
import { z } from 'zod';

// Schema simplificado para o formulário de perfil
const profileFormSchema = physicalPersonSchema
  .pick({
    full_name: true,
    email: true,
    cpf: true,
    phone: true,
    profession: true,
    monthly_income: true,
    monthly_expenses: true,
    monthly_income_range: true,
    income_tax_declarant: true,
    autonomous_activity: true,
    other_income_sources: true,
    marital_status: true
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const UserProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: '',
      email: '',
      cpf: '',
      phone: '',
      profession: '',
      monthly_income: 0,
      monthly_expenses: 0,
      monthly_income_range: undefined,
      income_tax_declarant: false,
      autonomous_activity: false,
      other_income_sources: '',
      marital_status: 'solteiro' as MaritalStatus
    }
  });

  // Carregar dados do perfil do usuário
  useEffect(() => {
    const loadUserProfile = async () => {
      setLoading(true);
      try {
        const profile = await getUserProfile();
        const currentUser = getCurrentUser();
        
        if (profile && profile.profile_type === ProfileType.PHYSICAL) {
          const physicalProfile = profile as PhysicalPersonProfile;
          // Preencher o formulário com os dados existentes
          form.reset({
            full_name: physicalProfile.full_name,
            email: physicalProfile.email || currentUser?.email || '',
            cpf: physicalProfile.cpf,
            phone: physicalProfile.phone || '',
            profession: physicalProfile.profession,
            monthly_income: physicalProfile.monthly_income,
            monthly_expenses: physicalProfile.monthly_expenses,
            monthly_income_range: physicalProfile.monthly_income_range,
            income_tax_declarant: physicalProfile.income_tax_declarant || false,
            autonomous_activity: physicalProfile.autonomous_activity || false,
            other_income_sources: physicalProfile.other_income_sources || '',
            marital_status: physicalProfile.marital_status
          });
          setIsSaved(true);
        } else if (currentUser) {
          // Se não há perfil, mas tem usuário, pré-preenche o email
          form.setValue('email', currentUser.email);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Não foi possível carregar seus dados de perfil");
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [form]);

  const onSubmit = async (data: ProfileFormValues) => {
    setLoading(true);
    
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        toast.error("Você precisa estar conectado para salvar seu perfil");
        return;
      }
      
      // Preparar os dados com o schema do perfil físico completo
      const profileData: Partial<PhysicalPersonProfile> = {
        user_id: currentUser.id,
        profile_type: ProfileType.PHYSICAL,
        ...data,
        // Adicionar campos obrigatórios com valores padrão se não existirem
        address_street: '',
        address_number: '',
        address_neighborhood: '',
        address_city: '',
        address_state: '',
        address_zipcode: '',
        birth_date: '',
        dependents_count: 0,
        assets: [],
        debts: [],
        main_bank_account: data.other_income_sources || '' // Temporário até implementar o campo específico
      };
      
      const result = await savePhysicalPersonProfile(profileData as PhysicalPersonProfile);
      
      if (result) {
        toast.success("Perfil salvo com sucesso!");
        setIsSaved(true);
      } else {
        toast.error("Erro ao salvar perfil. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      toast.error("Ocorreu um erro ao salvar seu perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Perfil do Usuário</CardTitle>
        <CardDescription>
          Preencha suas informações pessoais para análises contábeis personalizadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profissão / Ocupação Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua profissão ou fonte de renda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="monthly_income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Renda Mensal Bruta</FormLabel>
                    <FormControl>
                      <CurrencyInput 
                        placeholder="0,00"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>Valor total antes dos descontos</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthly_expenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Despesas Mensais</FormLabel>
                    <FormControl>
                      <CurrencyInput 
                        placeholder="0,00"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>Estimativa total mensal</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="monthly_income_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faixa de Renda</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua faixa de renda" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={IncomeRange.RANGE_1}>Até R$ 2.000,00</SelectItem>
                      <SelectItem value={IncomeRange.RANGE_2}>R$ 2.001,00 a R$ 5.000,00</SelectItem>
                      <SelectItem value={IncomeRange.RANGE_3}>R$ 5.001,00 a R$ 10.000,00</SelectItem>
                      <SelectItem value={IncomeRange.RANGE_4}>R$ 10.001,00 a R$ 20.000,00</SelectItem>
                      <SelectItem value={IncomeRange.RANGE_5}>Acima de R$ 20.000,00</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Faixa aproximada de renda mensal</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marital_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado Civil</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu estado civil" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={MaritalStatus.SINGLE}>Solteiro(a)</SelectItem>
                      <SelectItem value={MaritalStatus.MARRIED}>Casado(a)</SelectItem>
                      <SelectItem value={MaritalStatus.DIVORCED}>Divorciado(a)</SelectItem>
                      <SelectItem value={MaritalStatus.WIDOWED}>Viúvo(a)</SelectItem>
                      <SelectItem value={MaritalStatus.SEPARATED}>Separado(a)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="income_tax_declarant"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Declarante de Imposto de Renda</FormLabel>
                      <FormDescription>
                        Selecione se você é obrigado a declarar IR
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="autonomous_activity"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Atividade Autônoma</FormLabel>
                      <FormDescription>
                        Selecione se você é autônomo/profissional liberal
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="other_income_sources"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outras Fontes de Renda</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Aluguel, investimentos, etc." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-brand-blue hover:bg-brand-blue/90" 
              disabled={loading}
            >
              {loading ? "Salvando..." : isSaved ? "Atualizar Dados" : "Salvar Dados"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;
