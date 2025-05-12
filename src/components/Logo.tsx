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
  return <Link to="/" className={`flex items-center ${className}`}>
      <div className="relative w-8 h-8 mr-2">
        
      </div>
      {withText && <span className="font-bold text-xl">
          <span className="text-brand-blue">PrimeDask</span>
          <span className="text-brand-dark">Dask</span>
        </span>}
    </Link>;
};
export default Logo;