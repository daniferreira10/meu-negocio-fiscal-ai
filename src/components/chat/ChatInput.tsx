
import { useState, useRef } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { FileSpreadsheet, FileText, FileCog } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string, file: File | null) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Only accept common document types
      const validTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel', 
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv', 
        'application/xml', 
        'text/plain',
        'image/jpeg',
        'image/png'
      ];
      
      if (validTypes.includes(file.type) || file.name.endsWith('.xml')) {
        setAttachedFile(file);
        toast.success(`Arquivo "${file.name}" anexado com sucesso.`);
      } else {
        toast.error("Formato de arquivo não suportado. Por favor, envie documentos, planilhas ou arquivos de texto.");
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !attachedFile) || isLoading) return;
    
    onSendMessage(input, attachedFile);
    setInput('');
    setAttachedFile(null);
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.csv')) {
      return <FileSpreadsheet className="h-5 w-5" />;
    } else if (fileName.endsWith('.pdf') || fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      return <FileText className="h-5 w-5" />;
    } else {
      return <FileCog className="h-5 w-5" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700/50 bg-gray-800/50 backdrop-blur-md">
      {attachedFile && (
        <div className="mb-3 p-2 bg-gray-700/40 rounded-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getFileIcon(attachedFile.name)}
            <span className="text-sm text-gray-200 truncate">{attachedFile.name}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={removeAttachedFile}
            className="h-6 w-6 rounded-full hover:bg-gray-600/50"
          >
            <X className="h-4 w-4 text-gray-300" />
          </Button>
        </div>
      )}
      
      <div className="flex space-x-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua dúvida contábil ou fiscal..."
          className="min-h-12 resize-none flex-1 bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-400 focus-visible:ring-brand-cyan"
        />
        
        <Button 
          type="button" 
          variant="outline" 
          size="icon" 
          onClick={triggerFileInput}
          className="bg-transparent border-gray-700 hover:bg-gray-800 hover:text-brand-cyan"
        >
          <Paperclip className="h-5 w-5" />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.xlsx,.xls,.csv,.xml,.txt,.jpg,.jpeg,.png"
          />
        </Button>
        
        <Button 
          type="submit" 
          size="icon" 
          disabled={isLoading || (!input.trim() && !attachedFile)}
          className="bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-90 text-white"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
