
import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  activeItem?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

const DashboardLayout = ({ 
  children, 
  activeItem = 'dashboard', 
  title, 
  subtitle, 
  actions 
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar activeItem={activeItem} />
        
        <main className="ml-20 md:ml-64 w-full min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-brand-dark">
                  {title}
                </h1>
                {subtitle && <p className="text-gray-500">{subtitle}</p>}
              </div>
              {actions && <div>{actions}</div>}
            </div>
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
