import type { InputHTMLAttributes } from 'react';

const SIZES = {
  sm: 'px-2 py-1 text-xs sm:text-sm',
  md: 'px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base',
  lg: 'px-3 py-2 sm:px-4 sm:py-3 text-base sm:text-lg',
} as const;

type InputSize = keyof typeof SIZES;

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: InputSize;
};

export function Input({ 
  size = 'md', 
  className = '', 
  ...props 
}: InputProps) {
  return (
    <input
      className={`border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border-gray-300 dark:border-gray-600 ${SIZES[size]} ${className}`}
      {...props}
    />
  );
}