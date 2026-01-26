import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = 'flex max-h-max min-h-12 min-w-11 items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 px-5 py-2 rounded-sm';

  const variants = {
    primary: 'bg-(--secondary-color) px-2 text-center text-white transition-colors duration-300 ease-linear hover:bg-(--primary-color) focus:ring-(--secondary-color)',
    secondary:
      'border border-(--secondary-color) bg-(--bg-op-1-color) px-2 text-center text-white transition-colors duration-300 ease-linear hover:bg-(--primary-color) focus:ring-(--secondary-color)',
    success:
      'border border-(--success-color) bg-(--success-color) px-2 text-center text-white transition-colors duration-300 ease-linear hover:bg-transparent hover:text-(--success-color) focus:ring-(--success-color)',
    danger: 'flex-1 border border-(--error-color) transition-colors duration-300 ease-linear bg-(--error-color) text-white hover:bg-red-700',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
