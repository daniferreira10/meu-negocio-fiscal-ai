
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getUserProfile, savePhysicalPersonProfile, UserProfile, PhysicalPersonProfile } from '@/services/userProfileService';
import { getCurrentUser } from '@/services/authService';

const profileSchema = z.object({
  full_name: z.string().min(3, { message: "Nome completo deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  cpf: z.string().min(11, { message: "CPF deve ter pelo menos 11 dígitos" }),
  profession: z.string().min(2, { message: "Profissão é obrigatória" }),
  monthly_expenses: z.coerce.number().min(0, { message: "Despesas mensais devem ser um valor positivo" })
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: '',
      email: '',
      cpf: '',
      profession: '',
      monthly_expenses: 0
    }
  });

  // Carregar dados do perfil do usuário
  useEffect(() => {
    const loadUserProfile = async () => {
      setLoading(true);
      try {
        const profile = await getUserProfile();
        const currentUser = getCurrentUser();
        
        if (profile && 'full_name' in profile) {
          // Preencher o formulário com os dados existentes
          form.reset({
            full_name: profile.full_name,
            email: profile.email || currentUser?.email || '',
            cpf: profile.cpf,
            profession: profile.profession,
            monthly_expenses: profile.monthly_expenses
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
      
      const profileData: Partial<PhysicalPersonProfile> = {
        user_id: currentUser.id,
        full_name: data.full_name,
        email: data.email,
        cpf: data.cpf,
        profession: data.profession,
        monthly_expenses: data.monthly_expenses
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
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profissão / Renda Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua profissão ou fonte de renda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthly_expenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Despesas Mensais (estimadas)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="0.00" 
                      type="number" 
                      step="0.01"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
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
