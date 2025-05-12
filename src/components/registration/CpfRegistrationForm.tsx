
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { 
  UserIcon, 
  IdCardIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon,
  BriefcaseIcon,
  StoreIcon,
  AlertCircle
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Validação de CPF
const validateCPF = (cpf: string) => {
  // Remove non-numeric characters
  cpf = cpf.replace(/[^\d]/g, '');
  
  // Check if it has 11 digits
  if (cpf.length !== 11) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cpf)) return false;
  
  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;
  
  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;
  
  return true;
};

const cpfFormSchema = z.object({
  fullName: z.string().min(3, { message: "Nome completo deve ter pelo menos 3 caracteres." }),
  cpf: z.string()
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { message: "CPF deve estar no formato: 000.000.000-00" })
    .refine((cpf) => validateCPF(cpf), { message: "CPF inválido." }),
  email: z.string().email({ message: "E-mail inválido." }),
  phone: z.string()
    .regex(/^\(\d{2}\)\s\d{5}\-\d{4}$/, { message: "Telefone deve estar no formato: (00) 00000-0000" }),
  address: z.string().min(5, { message: "Endereço deve ter pelo menos 5 caracteres." }),
  city: z.string().min(2, { message: "Cidade deve ter pelo menos 2 caracteres." }),
  state: z.string().min(2, { message: "Estado é obrigatório." }),
  zipCode: z.string()
    .regex(/^\d{5}-\d{3}$/, { message: "CEP deve estar no formato: 00000-000" }),
  tradeName: z.string().optional(),
  businessArea: z.string().optional(),
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: "A senha deve incluir letras e números." }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, { message: "Você precisa aceitar os termos para continuar." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

type CpfFormValues = z.infer<typeof cpfFormSchema>;

interface CpfRegistrationFormProps {
  onRegistrationComplete: () => void;
  onBack: () => void;
}

const CpfRegistrationForm = ({ onRegistrationComplete, onBack }: CpfRegistrationFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<CpfFormValues>({
    resolver: zodResolver(cpfFormSchema),
    defaultValues: {
      fullName: "",
      cpf: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      tradeName: "",
      businessArea: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    }
  });

  const onSubmit = async (data: CpfFormValues) => {
    setLoading(true);
    console.log("Dados de registro CPF:", data);
    
    try {
      // Simulação de API - aqui você faria a integração com seu backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Cadastro realizado com sucesso!");
      onRegistrationComplete();
    } catch (error) {
      toast.error("Erro ao realizar cadastro. Tente novamente.");
      console.error("Erro no cadastro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-brand-dark">Cadastro de Pessoa Física</h2>
        <p className="text-gray-600 mt-2">Preencha seus dados pessoais para criar sua conta</p>
      </div>
      
      <Button 
        variant="outline" 
        onClick={onBack} 
        className="mb-4"
        type="button"
      >
        ← Voltar para seleção de tipo
      </Button>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome Completo */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Nome Completo</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormControl>
                      <Input placeholder="Seu nome completo" className="pl-10" {...field} />
                    </FormControl>
                  </div>
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
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <IdCardIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormControl>
                      <Input placeholder="000.000.000-00" className="pl-10" {...field} />
                    </FormControl>
                  </div>
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
                  <FormLabel>E-mail</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormControl>
                      <Input type="email" placeholder="seu.email@exemplo.com" className="pl-10" {...field} />
                    </FormControl>
                  </div>
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
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" className="pl-10" {...field} />
                    </FormControl>
                  </div>
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
                  <FormLabel>Endereço</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormControl>
                      <Input placeholder="Rua, número, complemento" className="pl-10" {...field} />
                    </FormControl>
                  </div>
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
                    <Input placeholder="Sua cidade" {...field} />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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

            {/* Nome Fantasia (opcional) */}
            <FormField
              control={form.control}
              name="tradeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Fantasia (opcional)</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <StoreIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormControl>
                      <Input placeholder="Nome da sua marca ou negócio" className="pl-10" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Área de Atuação (opcional) */}
            <FormField
              control={form.control}
              name="businessArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de Atuação (opcional)</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormControl>
                      <Input placeholder="Ex: Consultoria, Marketing, etc." className="pl-10" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Senha */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Mínimo 8 caracteres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirmar Senha */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirme sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Aceitar Termos */}
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Li e concordo com os <a href="#" className="text-brand-blue hover:underline">Termos de Serviço</a> e <a href="#" className="text-brand-blue hover:underline">Política de Privacidade</a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </>
            ) : "Criar Conta"}
          </Button>
        </form>
      </Form>
      
      <div className="text-center">
        <p className="text-gray-600">
          Já possui uma conta? <a href="/login" className="text-brand-blue hover:underline">Entrar</a>
        </p>
      </div>
    </div>
  );
};

export default CpfRegistrationForm;
