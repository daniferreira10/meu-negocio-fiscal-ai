
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { SonnerToaster } from '@/components/ui/sonner';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Documents from '@/pages/Documents';
import TaxManagement from '@/pages/TaxManagement';
import AIAnalysis from '@/pages/AIAnalysis';
import Chat from '@/pages/Chat';
import NotFound from '@/pages/NotFound';
import ClientRegistration from '@/pages/ClientRegistration';
import ClientInformation from '@/pages/ClientInformation';
import PrivateRoute from '@/components/PrivateRoute';
import Pricing from '@/pages/Pricing';

function App() {
  return (
    <Router>
      <SonnerToaster />
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/documents" element={<PrivateRoute><Documents /></PrivateRoute>} />
        <Route path="/tax-management" element={<PrivateRoute><TaxManagement /></PrivateRoute>} />
        <Route path="/ai-analysis" element={<PrivateRoute><AIAnalysis /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/client-registration" element={<PrivateRoute><ClientRegistration /></PrivateRoute>} />
        <Route path="/client-information" element={<PrivateRoute><ClientInformation /></PrivateRoute>} />
        
        {/* Not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
