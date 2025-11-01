'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ScrollToTopProps {
  threshold?: number; // на сколько px нужно проскроллить, чтобы показать кнопку
  variant?: 'default' | 'filled'; // стиль кнопки
  className?: string;
}

const ScrollToTop = ({ threshold = 300, variant = 'filled', className }: ScrollToTopProps) => {
  const [visible, setVisible] = useState(false);

  // Следим за скроллом
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  // Плавный скролл вверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Прокрутить наверх"
          className={clsx(
            'fixed right-6 bottom-6 z-50 rounded-full p-3 shadow-lg backdrop-blur-md transition-all duration-300',
            variant === 'filled' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'border border-indigo-300 bg-white/80 text-indigo-600 hover:bg-white',
            className,
          )}
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

ScrollToTop.displayName = 'ScrollToTop';

export default ScrollToTop;
