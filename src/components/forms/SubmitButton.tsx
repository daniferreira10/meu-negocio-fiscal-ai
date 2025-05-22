
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export interface SubmitButtonProps {
  text: string;
  className?: string;
  loading?: boolean;
}

const SubmitButton = ({ 
  text, 
  className = '',
  loading = false 
}: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className={className}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Enviando...
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
