import type { ReactNode, ElementType } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
type TextVariant = HeadingLevel | 'body' | 'small';

type TypographyProps = {
  readonly variant?: TextVariant;
  readonly children: ReactNode;
  readonly className?: string;
};

export function Typography({ 
  variant = 'body', 
  children, 
  className = '' 
}: TypographyProps) {
  const variantClasses = {
    h1: 'text-xl sm:text-2xl md:text-3xl font-bold',
    h2: 'text-lg sm:text-xl md:text-2xl font-semibold',
    h3: 'text-base sm:text-lg md:text-xl font-medium',
    h4: 'text-sm sm:text-base md:text-lg font-medium',
    body: 'text-sm sm:text-base',
    small: 'text-xs sm:text-sm',
  };

  const Component = ((): ElementType => {
    switch (variant) {
      case 'h1':
        return 'h1';
      case 'h2':
        return 'h2';
      case 'h3':
        return 'h3';
      case 'h4':
        return 'h4';
      case 'body':
        return 'p';
      case 'small':
        return 'span';
      default:
        return 'p';
    }
  })();
  
  return (
    <Component className={`${variantClasses[variant]} ${className}`}>
      {children}
    </Component>
  );
}