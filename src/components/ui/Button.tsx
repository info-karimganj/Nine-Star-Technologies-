import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    
    let sizeClass = '';
    if (size === 'sm') sizeClass = 'text-small px-3 py-1.5';
    if (size === 'lg') sizeClass = 'text-body px-8 py-4';

    const loadingClass = isLoading ? 'btn-loading' : '';
    const disabledClass = disabled || isLoading ? 'btn-disabled' : '';

    const combinedClasses = [baseClass, variantClass, sizeClass, loadingClass, disabledClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={combinedClasses}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {!isLoading && leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
