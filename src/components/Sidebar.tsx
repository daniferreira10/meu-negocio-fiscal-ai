import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  HomeIcon,
  FileTextIcon,
  CalculatorIcon,
  BrainCircuitIcon,
  MessageSquareIcon,
  LineChartIcon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
  MenuIcon,
  UsersIcon,
  ClipboardIcon,
  UserIcon
} from 'lucide-react';

interface SidebarProps {
  activeItem?: string;
}

const Sidebar = ({ activeItem = 'dashboard' }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const isMobile = useIsMobile();

  const items = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { id: 'documents', name: 'Documentos', icon: FileTextIcon, path: '/documents' },
    { id: 'tax-management', name: 'Impostos', icon: CalculatorIcon, path: '/tax-management' },
    { id: 'ai-analysis', name: 'Análise IA', icon: BrainCircuitIcon, path: '/ai-analysis' },
    { id: 'chat', name: 'Chat', icon: MessageSquareIcon, path: '/chat' },
    { id: 'clients', name: 'Clientes', icon: UsersIcon, path: '/client-registration' },
    { id: 'client-info', name: 'Informações', icon: ClipboardIcon, path: '/client-information' },
  ];

  const bottomItems = [
    { id: 'settings', name: 'Configurações', icon: SettingsIcon, path: '/settings' },
    { id: 'help', name: 'Ajuda', icon: HelpCircleIcon, path: '/help' },
    { id: 'logout', name: 'Sair', icon: LogOutIcon, path: '/logout' },
  ];

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed z-50 top-3 left-3 md:hidden"
      >
        <MenuIcon className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out bg-gradient-to-b from-gray-900 to-brand-dark-blue text-white",
          collapsed && !isMobile ? "w-20" : "w-64",
          isMobile && collapsed && "-translate-x-full", // Hide completely on mobile when collapsed
          isMobile && !collapsed && "w-64" // Full width on mobile when expanded
        )}
      >
        {/* User section */}
        <div className="p-4">
          <div className={cn(
            "flex items-center",
            collapsed && !isMobile ? "justify-center" : "justify-start"
          )}>
            <div className="bg-gradient-to-tr from-brand-blue to-brand-cyan rounded-full w-10 h-10 flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-white" />
            </div>
            {(!collapsed || isMobile) && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium truncate">Usuário PrimeDesk</p>
                <p className="text-xs text-gray-400 truncate">user@example.com</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation links */}
        <nav className="mt-2 px-2">
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "flex items-center p-3 rounded-md transition-all hover:bg-gray-700/50",
                  activeItem === item.id && "bg-gray-800/70 text-brand-cyan",
                  collapsed && !isMobile && "justify-center px-0"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  activeItem === item.id ? "text-brand-cyan" : "text-gray-400"
                )} />
                {(!collapsed || isMobile) && (
                  <span className="ml-3 text-sm">{item.name}</span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom links */}
        <div className="absolute bottom-0 left-0 right-0 px-2 pb-4">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "flex items-center p-3 rounded-md transition-all hover:bg-gray-700/50",
                  collapsed && !isMobile && "justify-center px-0"
                )}
              >
                <item.icon className="h-5 w-5 text-gray-400" />
                {(!collapsed || isMobile) && (
                  <span className="ml-3 text-sm">{item.name}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
