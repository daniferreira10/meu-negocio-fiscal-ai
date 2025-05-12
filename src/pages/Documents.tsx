
import { Button } from '@/components/ui/button';
import DocumentStorage from '@/components/DocumentStorage';
import DashboardLayout from '@/components/DashboardLayout';
import { FileUp } from 'lucide-react';

const Documents = () => {
  return (
    <DashboardLayout 
      title="Gerenciamento de Documentos" 
      subtitle="Organize, visualize e gerencie seus documentos contábeis e fiscais"
      activeItem="documents"
      actions={
        <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">
          <FileUp className="w-4 h-4 mr-2" />
          Novo Documento
        </Button>
      }
    >
      <DocumentStorage />
    </DashboardLayout>
  );
};

export default Documents;
