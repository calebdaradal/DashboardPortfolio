import { cn } from '@/utils/cn';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export const Spinner: React.FC<SpinnerProps> = ({ 
  className, 
  size = 'md' 
}) => {
  return (
    <div
      className={cn(
        'spinner border-2 border-gray-200 border-t-primary-600',
        sizeClasses[size],
        className
      )}
    />
  );
};
