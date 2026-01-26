import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = 'px-5 py-2 rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'font-montserrat flex max-h-max min-h-11 min-w-11 items-center justify-center rounded-2xl bg-(--link-second-color) px-3.5 text-center text-white transition-colors t duration-300 ease-linear hover:text-(--text-color) focus:ring-indigo-500 focus:ring-indigo-500',
    secondary:
      'font-montserrat flex max-h-max min-h-11 min-w-11 items-center justify-center rounded-2xl bg-(--primary-color) px-3.5 text-center text-white transition-colors duration-300 ease-linear hover:text-(--text-color) focus:ring-teal-300',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
