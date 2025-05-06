
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  withText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ withText = true, className = '' }) => {
  return (
    <Link 
      to="/" 
      className={`flex items-center ${className}`}
    >
      <div className="relative w-8 h-8 mr-2">
        <img 
          src="/lovable-uploads/4a00739c-c792-4e4a-8807-5a9ccec80abd.png" 
          alt="PrimeDesk Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      {withText && (
        <span className="font-bold text-xl">
          <span className="text-brand-blue">Prime</span>
          <span className="text-brand-dark">Desk</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
