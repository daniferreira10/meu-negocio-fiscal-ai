
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import ClientRegistration from "./pages/ClientRegistration";
import TaxManagement from "./pages/TaxManagement";
import Documents from "./pages/Documents";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { isAuthenticated } from "./services/authService";

const queryClient = new QueryClient();

const App = () => {
  // Check authentication on initial load
  useEffect(() => {
    const currentPath = window.location.pathname;
    
    // If user is not on a public route and not authenticated, redirect to login
    if (
      !isAuthenticated() && 
      !["/", "/login", "/register", "/pricing"].includes(currentPath) &&
      !currentPath.startsWith("/pricing")
    ) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pricing" element={<Pricing />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/chat" element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            } />
            <Route path="/client-registration" element={
              <PrivateRoute>
                <ClientRegistration />
              </PrivateRoute>
            } />
            <Route path="/tax-management" element={
              <PrivateRoute>
                <TaxManagement />
              </PrivateRoute>
            } />
            <Route path="/documents" element={
              <PrivateRoute>
                <Documents />
              </PrivateRoute>
            } />
            
            {/* Fallback routes */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
