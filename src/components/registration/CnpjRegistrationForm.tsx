
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
  BuildingIcon,
  StoreIcon,
  KeyIcon
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Validação de CNPJ
const validateCNPJ = (cnpj: string) => {
  // Remove non-numeric characters
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  // Check if it has 14 digits
  if (cnpj.length !== 14) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cnpj)) return false;
  
  // Validate first check digit
  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let remainder = sum % 11;
  let checkDigit1 = remainder < 2 ? 0 : 11 - remainder;
  if (checkDigit1 !== parseInt(cnpj.charAt(12))) return false;
  
  // Validate second check digit
  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  remainder = sum % 11;
  let checkDigit2 = remainder < 2 ? 0 : 11 - remainder;
  if (checkDigit2 !== parseInt(cnpj.charAt(13))) return false;
  
  return true;
};

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

const cnpjFormSchema = z.object({
  companyName: z.string().min(3, { message: "Razão social deve ter pelo menos 3 caracteres." }),
  tradeName: z.string().min(2, { message: "Nome fantasia deve ter pelo menos 2 caracteres." }),
  cnpj: z.string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, { message: "CNPJ deve estar no formato: 00.000.000/0001-00" })
    .refine((cnpj) => validateCNPJ(cnpj), { message: "CNPJ inválido." }),
  stateRegistration: z.string().optional(),
  taxRegime: z.string(),
  cnae: z.string().min(5, { message: "CNAE principal é obrigatório." }),
  address: z.string().min(5, { message: "Endereço deve ter pelo menos 5 caracteres." }),
  city: z.string().min(2, { message: "Cidade deve ter pelo menos 2 caracteres." }),
  state: z.string().min(2, { message: "Estado é obrigatório." }),
  zipCode: z.string()
    .regex(/^\d{5}-\d{3}$/, { message: "CEP deve estar no formato: 00000-000" }),
  corporateEmail: z.string().email({ message: "E-mail inválido." }),
  legalRepresentativeName: z.string().min(3, { message: "Nome do responsável legal deve ter pelo menos 3 caracteres." }),
  legalRepresentativeCpf: z.string()
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { message: "CPF deve estar no formato: 000.000.000-00" })
    .refine((cpf) => validateCPF(cpf), { message: "CPF inválido." }),
  phone: z.string()
    .regex(/^\(\d{2}\)\s\d{5}\-\d{4}$/, { message: "Telefone deve estar no formato: (00) 00000-0000" }),
  bankName: z.string().optional(),
  bankAgency: z.string().optional(),
  bankAccount: z.string().optional(),
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: "A senha deve incluir letras e números." }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, { message: "Você precisa aceitar os termos para continuar." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

type CnpjFormValues = z.infer<typeof cnpjFormSchema>;

interface CnpjRegistrationFormProps {
  onRegistrationComplete: () => void;
  onBack: () => void;
}

const CnpjRegistrationForm = ({ onRegistrationComplete, onBack }: CnpjRegistrationFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<CnpjFormValues>({
    resolver: zodResolver(cnpjFormSchema),
    defaultValues: {
      companyName: "",
      tradeName: "",
      cnpj: "",
      stateRegistration: "",
      taxRegime: "Simples Nacional",
      cnae: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      corporateEmail: "",
      legalRepresentativeName: "",
      legalRepresentativeCpf: "",
      phone: "",
      bankName: "",
      bankAgency: "",
      bankAccount: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    }
  });

  const onSubmit = async (data: CnpjFormValues) => {
    setLoading(true);
    console.log("Dados de registro CNPJ:", data);
    
    try {
      // Simulação de API - aqui você faria a integração com seu backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Cadastro empresarial realizado com sucesso!");
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
        <h2 className="text-2xl font-bold text-brand-dark">Cadastro de Pessoa Jurídica</h2>
        <p className="text-gray-600 mt-2">Preencha os dados da sua empresa para criar sua conta</p>
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
          {/* Dados da Empresa */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-4 text-brand-dark">Dados da Empresa</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Razão Social */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Razão Social</FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <BuildingIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input placeholder="Razão Social da empresa" className="pl-10" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nome Fantasia */}
              <FormField
                control={form.control}
                name="tradeName"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Nome Fantasia</FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <StoreIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input placeholder="Nome fantasia da empresa" className="pl-10" {...field} />
                      </FormControl>
                    </div>
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
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <IdCardIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input placeholder="00.000.000/0001-00" className="pl-10" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Inscrição Estadual */}
              <FormField
                control={form.control}
                name="stateRegistration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inscrição Estadual</FormLabel>
                    <FormControl>
                      <Input placeholder="Inscrição estadual" {...field} />
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

              {/* CNAE */}
              <FormField
                control={form.control}
                name="cnae"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNAE Principal</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 62.01-5-01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Endereço */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-4 text-brand-dark">Endereço</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Endereço */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Endereço Completo</FormLabel>
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
            </div>
          </div>
          
          {/* Dados de Contato */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-4 text-brand-dark">Dados de Contato</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* E-mail Corporativo */}
              <FormField
                control={form.control}
                name="corporateEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail Corporativo</FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MailIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input type="email" placeholder="contato@empresa.com.br" className="pl-10" {...field} />
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

              {/* Responsável Legal */}
              <FormField
                control={form.control}
                name="legalRepresentativeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Responsável Legal</FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input placeholder="Nome completo" className="pl-10" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CPF do Responsável */}
              <FormField
                control={form.control}
                name="legalRepresentativeCpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF do Responsável</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Dados Bancários (Opcional) */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-4 text-brand-dark">Dados Bancários (Opcional)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Banco */}
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banco</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do banco" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Agência */}
              <FormField
                control={form.control}
                name="bankAgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agência</FormLabel>
                    <FormControl>
                      <Input placeholder="Número da agência" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conta */}
              <FormField
                control={form.control}
                name="bankAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conta</FormLabel>
                    <FormControl>
                      <Input placeholder="Número da conta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Dados de Acesso */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-4 text-brand-dark">Dados de Acesso</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Senha */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <KeyIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="Mínimo 8 caracteres" className="pl-10" {...field} />
                      </FormControl>
                    </div>
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
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <KeyIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="Confirme sua senha" className="pl-10" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

export default CnpjRegistrationForm;
