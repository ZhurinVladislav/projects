'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoaderProps {
  type?: 'spinner' | 'dots' | 'skeleton';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ type = 'spinner', label = 'Загрузка...', size = 'md', fullScreen = false }) => {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const containerClasses = `
    flex flex-col items-center justify-center
    ${fullScreen ? 'fixed inset-0 z-50 bg-white/70 backdrop-blur-sm' : 'w-full py-10'}
  `;

  const textClasses = `
    mt-4 text-gray-600 text-sm font-medium select-none
  `;

  // --- Разные типы загрузки ---
  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="block h-3 w-3 rounded-full bg-indigo-500"
                animate={{
                  y: ['0%', '-50%', '0%'],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        );

      case 'skeleton':
        return (
          <div className="flex w-full max-w-sm flex-col gap-3">
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
        );

      default: // spinner
        return <Loader2 className={`${sizeMap[size]} animate-spin text-indigo-500`} strokeWidth={2.5} />;
    }
  };

  return (
    <div className={containerClasses}>
      {renderLoader()}
      {label && <p className={textClasses}>{label}</p>}
    </div>
  );
};

export default Loader;
