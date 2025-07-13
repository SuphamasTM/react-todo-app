import type { ReactNode } from 'react';

type ContainerProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`w-full max-w-[95%] sm:max-w-[85%] md:max-w-xl lg:max-w-2xl mx-auto ${className}`}>
      {children}
    </div>
  );
}