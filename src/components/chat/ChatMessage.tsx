
import { Message } from '@/types/chat';
import { FileSpreadsheet, FileText, FileCog } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

const ChatMessage = ({ message, isLoading = false }: ChatMessageProps) => {
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.csv')) {
      return <FileSpreadsheet className="h-5 w-5" />;
    } else if (fileName.endsWith('.pdf') || fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      return <FileText className="h-5 w-5" />;
    } else {
      return <FileCog className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="mr-auto max-w-[80%] mb-4">
        <div className="bg-gray-800/80 border border-gray-700/50 p-3 rounded-lg rounded-tl-none text-gray-100 shadow-lg backdrop-blur-sm">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-brand-cyan/70 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-brand-cyan/70 animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-brand-cyan/70 animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mb-4 animate-fade-in ${
        message.role === 'user' 
          ? 'ml-auto max-w-[80%]' 
          : 'mr-auto max-w-[80%]'
      }`}
    >
      <div
        className={`p-3 rounded-lg backdrop-blur-sm ${
          message.role === 'user'
            ? 'bg-brand-blue text-white rounded-tr-none shadow-md border border-brand-blue/30'
            : 'bg-gray-800/80 border border-gray-700/50 text-gray-100 rounded-tl-none shadow-md'
        }`}
      >
        <div className="whitespace-pre-line">{message.content}</div>
        
        {message.attachment && (
          <div className="mt-2 p-2 bg-gray-900/60 rounded-md flex items-center gap-2 text-sm border border-gray-700/40">
            {getFileIcon(message.attachment.name)}
            <span className="truncate">{message.attachment.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
