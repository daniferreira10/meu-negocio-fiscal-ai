
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  withText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  withText = true,
  className = ''
}) => {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <div className="relative w-8 h-8 mr-2">
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full"
        >
          <rect width="40" height="40" rx="8" fill="#0066CC" />
          <path 
            d="M10 15H30M10 20H30M10 25H20" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <path 
            d="M24 30L27 27L30 30" 
            stroke="#50E3C2" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M27 27V32" 
            stroke="#50E3C2" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
        </svg>
      </div>
      {withText && (
        <span className="font-bold text-xl">
          <span className="text-brand-blue">Prime</span>
          <span className="text-brand-dark">Dask</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
