import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  User, 
  FileText, 
  DollarSign, 
  MessageSquare,
  Settings, 
  LogOut,
  Layout,
  FileText as FileTextIcon,
  Calculator,
  Users,
  CreditCard
} from 'lucide-react';

const sidebarItems = [
  {
    name: 'Dashboard',
    icon: <Layout className="w-5 h-5" />,
    path: '/dashboard',
    key: 'dashboard'
  },
  {
    name: 'Documentos',
    icon: <FileTextIcon className="w-5 h-5" />,
    path: '/documents',
    key: 'documents'
  },
  {
    name: 'Chat Contábil',
    icon: <MessageSquare className="w-5 h-5" />,
    path: '/chat',
    key: 'chat'
  },
  {
    name: 'Impostos',
    icon: <Calculator className="w-5 h-5" />,
    path: '/tax-management',
    key: 'taxes'
  },
  {
    name: 'Clientes',
    icon: <Users className="w-5 h-5" />,
    path: '/client-registration',
    key: 'clients'
  },
  {
    name: 'Planos',
    icon: <CreditCard className="w-5 h-5" />,
    path: '/pricing',
    key: 'pricing'
  }
];

const Sidebar = ({ activeItem = 'dashboard' }: { activeItem?: string }) => {
  return (
    <aside className="w-20 md:w-64 min-h-screen bg-white shadow-md flex flex-col fixed">
      <div className="p-4 border-b border-gray-100">
        <Link to="/dashboard" className="text-xl font-bold text-brand-blue hidden md:flex items-center">
          <span className="text-brand-blue">Prime</span>
          <span className="text-brand-dark">Dask</span>
        </Link>
        <div className="md:hidden flex justify-center">
          <span className="text-xl font-bold text-brand-blue">P</span>
        </div>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          <li>
            <Link to="/dashboard">
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeItem === 'dashboard' ? 'bg-brand-light-blue text-brand-blue' : 'text-gray-600'}`}
              >
                <Home className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/client-registration">
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeItem === 'clients' ? 'bg-brand-light-blue text-brand-blue' : 'text-gray-600'}`}
              >
                <User className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Cadastros</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/dashboard?tab=transactions">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600"
              >
                <FileText className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Transações</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/tax-management">
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeItem === 'taxes' ? 'bg-brand-light-blue text-brand-blue' : 'text-gray-600'}`}
              >
                <DollarSign className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Impostos</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/chat">
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeItem === 'chat' ? 'bg-brand-light-blue text-brand-blue' : 'text-gray-600'}`}
              >
                <MessageSquare className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Assistente IA</span>
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-100">
        <ul className="space-y-1">
          <li>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600"
            >
              <Settings className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Configurações</span>
            </Button>
          </li>
          <li>
            <Link to="/">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600"
              >
                <LogOut className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Sair</span>
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
