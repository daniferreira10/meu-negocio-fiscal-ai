
import LoginFormContent from './forms/LoginFormContent';
import RegisterFormContent from './forms/RegisterFormContent';

interface LoginFormProps {
  isRegister?: boolean;
}

const LoginForm = ({ isRegister = false }: LoginFormProps) => {
  return isRegister ? <RegisterFormContent /> : <LoginFormContent />;
};

export default LoginForm;
