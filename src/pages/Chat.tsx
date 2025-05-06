
import Navbar from '@/components/Navbar';
import AIChat from '@/components/AIChat';

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-brand-dark mb-6">Assistente Contábil com IA</h1>
          <p className="text-gray-600 mb-8">
            Tire suas dúvidas sobre contabilidade, impostos e obrigações fiscais com nosso assistente especializado.
          </p>
          <div className="h-[600px] shadow-lg rounded-lg overflow-hidden">
            <AIChat />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
