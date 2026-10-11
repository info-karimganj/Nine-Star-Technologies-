import React from 'react';

type TypographyVariant = 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'label' | 'caption';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  as,
  className = '',
  children,
  ...props
}) => {
  const Component = as || getDefaultElement(variant);
  
  let variantClass = '';
  switch (variant) {
    case 'display': variantClass = 'text-display'; break;
    case 'h1': variantClass = 'text-h1'; break;
    case 'h2': variantClass = 'text-h2'; break;
    case 'h3': variantClass = 'text-h3'; break;
    case 'body': variantClass = 'text-body'; break;
    case 'small': variantClass = 'text-small'; break;
    case 'label': variantClass = 'text-label'; break;
    case 'caption': variantClass = 'text-caption'; break;
  }

  return React.createElement(
    Component,
    { className: `${variantClass} ${className}`.trim(), ...props },
    children
  );
};

function getDefaultElement(variant: TypographyVariant): React.ElementType {
  switch (variant) {
    case 'display': return 'h1';
    case 'h1': return 'h1';
    case 'h2': return 'h2';
    case 'h3': return 'h3';
    case 'body': return 'p';
    case 'small': return 'p';
    case 'label': return 'label';
    case 'caption': return 'span';
    default: return 'p';
  }
}
