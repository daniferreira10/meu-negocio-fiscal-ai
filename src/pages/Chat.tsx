
import Navbar from '@/components/Navbar';
import AIChat from '@/components/AIChat';
import Footer from '@/components/Footer';
import { MessageSquare } from 'lucide-react';

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-brand-light-blue p-2 rounded-full mb-4">
              <MessageSquare className="w-6 h-6 text-brand-blue" />
            </div>
            <h1 className="text-2xl font-bold text-brand-dark mb-2">Assistente Contábil com IA</h1>
            <p className="text-gray-600">
              Tire suas dúvidas sobre contabilidade, impostos e obrigações fiscais com nosso assistente especializado.
            </p>
          </div>
          <div className="h-[600px] shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <AIChat />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
