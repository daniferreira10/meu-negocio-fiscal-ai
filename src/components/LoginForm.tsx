
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import LoginFormContent from './forms/LoginFormContent';
import RegisterFormContent from './forms/RegisterFormContent';

interface LoginFormProps {
  isRegister?: boolean;
}

const LoginForm = ({ isRegister = false }: LoginFormProps) => {
  const [activeTab, setActiveTab] = useState<string>(isRegister ? "register" : "login");
  
  return (
    <Card className="rounded-lg shadow-lg border border-gray-200 bg-white">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Cadastro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-0">
            <LoginFormContent />
          </TabsContent>
          
          <TabsContent value="register" className="mt-0">
            <RegisterFormContent />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
