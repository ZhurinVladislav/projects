'use client';

import { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

type AnimationType = 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'fade-in-up';

interface AnimateOnViewProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
}

export const AnimateOnView = ({ children, animation = 'fade-in', delay = 0, duration = 0.6, className = '' }: AnimateOnViewProps) => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in':
        return isInView ? 'animate-fade-in' : 'opacity-0';
      case 'slide-up':
        return isInView ? 'animate-slide-up' : 'opacity-0 translate-y-10';
      case 'slide-down':
        return isInView ? 'animate-slide-down' : 'opacity-0 -translate-y-10';
      case 'slide-left':
        return isInView ? 'animate-slide-left' : 'opacity-0 translate-x-10';
      case 'slide-right':
        return isInView ? 'animate-slide-right' : 'opacity-0 -translate-x-10';
      case 'scale':
        return isInView ? 'animate-scale' : 'opacity-0 scale-95';
      case 'fade-in-up':
        return isInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10';
      default:
        return isInView ? 'animate-fade-in' : 'opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
};
