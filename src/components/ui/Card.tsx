import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`card ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className = '', children, ...props }: CardProps) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ className = '', children, ...props }: CardProps) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className = '', children, ...props }: CardProps) => (
  <div className={`mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);
