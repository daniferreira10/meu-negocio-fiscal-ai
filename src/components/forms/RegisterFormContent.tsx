import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';
import FormHeader from './FormHeader';
import FormFooter from './FormFooter';
import { Input } from '@/components/ui/input';
import { registerUser } from '@/services/authService';

// Schema de validação para pessoa física
const pessoaFisicaSchema = z.object({
  email: z.string().email({
    message: "E-mail inválido"
  }).min(1, {
    message: "E-mail é obrigatório"
  }),
  password: z.string().min(1, {
    message: "Senha é obrigatória"
  }).min(8, {
    message: "A senha deve ter pelo menos 8 caracteres"
  }),
  confirmPassword: z.string().min(1, {
    message: "Confirme sua senha"
  }),
  fullName: z.string().min(3, {
    message: "Nome completo deve ter pelo menos 3 caracteres"
  }),
  cpf: z.string().min(11, {
    message: "CPF deve ter 11 dígitos"
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos e condições"
  })
}).superRefine(({
  confirmPassword,
  password
}, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não coincidem",
      path: ["confirmPassword"]
    });
  }
});

// Schema de validação para pessoa jurídica
const pessoaJuridicaSchema = z.object({
  email: z.string().email({
    message: "E-mail inválido"
  }).min(1, {
    message: "E-mail é obrigatório"
  }),
  password: z.string().min(1, {
    message: "Senha é obrigatória"
  }).min(8, {
    message: "A senha deve ter pelo menos 8 caracteres"
  }),
  confirmPassword: z.string().min(1, {
    message: "Confirme sua senha"
  }),
  razaoSocial: z.string().min(3, {
    message: "Razão social deve ter pelo menos 3 caracteres"
  }),
  cnpj: z.string().min(14, {
    message: "CNPJ deve ter 14 dígitos"
  }),
  responsavel: z.string().min(3, {
    message: "Nome do responsável deve ter pelo menos 3 caracteres"
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos e condições"
  })
}).superRefine(({
  confirmPassword,
  password
}, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não coincidem",
      path: ["confirmPassword"]
    });
  }
});
type PessoaFisicaFormValues = z.infer<typeof pessoaFisicaSchema>;
type PessoaJuridicaFormValues = z.infer<typeof pessoaJuridicaSchema>;
const RegisterFormContent = () => {
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState('cpf');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Form para pessoa física
  const pfForm = useForm<PessoaFisicaFormValues>({
    resolver: zodResolver(pessoaFisicaSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      cpf: "",
      acceptTerms: false
    }
  });

  // Form para pessoa jurídica
  const pjForm = useForm<PessoaJuridicaFormValues>({
    resolver: zodResolver(pessoaJuridicaSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      razaoSocial: "",
      cnpj: "",
      responsavel: "",
      acceptTerms: false
    }
  });
  const onSubmitPF = async (data: PessoaFisicaFormValues) => {
    setLoading(true);
    console.log("Dados de cadastro PF:", data);
    try {
      // Registra o usuário usando o serviço de autenticação
      const success = await registerUser(data.email, data.password);
      if (success) {
        console.log("Cadastro PF realizado com sucesso");
        toast.success("Cadastro realizado com sucesso!");

        // Redirecionamento para o registro completo
        navigate('/register');
      }
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
        toast.error("Este e-mail já está em uso. Tente outro ou faça login.");
      } else {
        toast.error("Erro ao criar conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };
  const onSubmitPJ = async (data: PessoaJuridicaFormValues) => {
    setLoading(true);
    console.log("Dados de cadastro PJ:", data);
    try {
      // Registra o usuário usando o serviço de autenticação
      const success = await registerUser(data.email, data.password);
      if (success) {
        console.log("Cadastro PJ realizado com sucesso");
        toast.success("Cadastro realizado com sucesso!");

        // Redirecionamento para o registro completo
        navigate('/register');
      }
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
        toast.error("Este e-mail já está em uso. Tente outro ou faça login.");
      } else {
        toast.error("Erro ao criar conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };
  return <div>
      <FormHeader title="Crie sua conta" subtitle="Comece a usar nossa contabilidade automatizada com IA" />

      <Tabs value={accountType} onValueChange={setAccountType} className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cpf">Pessoa Física</TabsTrigger>
          <TabsTrigger value="cnpj">Pessoa Jurídica</TabsTrigger>
        </TabsList>
      </Tabs>

      {accountType === "cpf" ? <Form {...pfForm}>
          <form onSubmit={pfForm.handleSubmit(onSubmitPF)} className="space-y-4">
            <div className="space-y-4">
              <FormField control={pfForm.control} name="fullName" render={({
            field
          }) => <FormItem>
                    <FormLabel className="bg-neutral-50">Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <EmailInput form={pfForm} name="email" label="E-mail" placeholder="exemplo@email.com.br" />
              
              <PasswordInput form={pfForm} name="password" label="Senha" placeholder="Mínimo 8 caracteres" />
              
              <FormField control={pfForm.control} name="confirmPassword" render={({
            field
          }) => <FormItem>
                    <FormLabel className="bg-slate-50">Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirme sua senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={pfForm.control} name="cpf" render={({
            field
          }) => <FormItem>
                    <FormLabel className="bg-slate-50">CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={pfForm.control} name="acceptTerms" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="bg-gray-50">
                        Li e concordo com os <a href="#" className="text-brand-blue hover:underline">Termos de Serviço</a> e <a href="#" className="text-brand-blue hover:underline">Política de Privacidade</a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>} />
            </div>

            <SubmitButton loading={loading} text="Criar Conta" />
          </form>
        </Form> : <Form {...pjForm}>
          <form onSubmit={pjForm.handleSubmit(onSubmitPJ)} className="space-y-4">
            <div className="space-y-4">
              <FormField control={pjForm.control} name="razaoSocial" render={({
            field
          }) => <FormItem>
                    <FormLabel>Razão Social</FormLabel>
                    <FormControl>
                      <Input placeholder="Razão social da empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <EmailInput form={pjForm} name="email" label="E-mail" placeholder="contato@empresa.com.br" />
              
              <PasswordInput form={pjForm} name="password" label="Senha" placeholder="Mínimo 8 caracteres" />
              
              <FormField control={pjForm.control} name="confirmPassword" render={({
            field
          }) => <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirme sua senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={pjForm.control} name="cnpj" render={({
            field
          }) => <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="00.000.000/0001-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={pjForm.control} name="responsavel" render={({
            field
          }) => <FormItem>
                    <FormLabel>Nome do Responsável</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do responsável legal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={pjForm.control} name="acceptTerms" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Li e concordo com os <a href="#" className="text-brand-blue hover:underline">Termos de Serviço</a> e <a href="#" className="text-brand-blue hover:underline">Política de Privacidade</a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>} />
            </div>

            <SubmitButton loading={loading} text="Criar Conta" />
          </form>
        </Form>}

      <FormFooter text="Ao criar uma conta, você concorda com nossos Termos de Serviço e Política de Privacidade." />
    </div>;
};
export default RegisterFormContent;