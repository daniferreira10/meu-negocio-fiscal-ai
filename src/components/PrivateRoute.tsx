
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '@/services/authService';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Redirect to the login page, but save the current location they were
    // trying to go to when they were redirected
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
