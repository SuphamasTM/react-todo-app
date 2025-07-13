import type { ReactNode } from 'react';

type CardProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 sm:p-4 md:p-6 ${className}`}>
      {children}
    </div>
  );
}