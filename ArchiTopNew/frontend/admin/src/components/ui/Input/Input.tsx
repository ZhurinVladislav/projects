'use client';

import clsx from 'clsx';
import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'filled'; // "filled" = с фоном
  className?: string; // контейнер
  inputClassName?: string; // input
  labelClassName?: string; // label
  errorClassName?: string; // error
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, iconPosition = 'left', variant = 'default', className, inputClassName, labelClassName, errorClassName, ...props }, ref) => {
    return (
      <div className={clsx('flex w-full flex-col gap-1', className)}>
        {/* Label */}
        {label && <label className={clsx('text-sm font-medium text-gray-700', labelClassName)}>{label}</label>}

        {/* Контейнер для input + icon */}
        <div
          className={clsx(
            'relative flex items-center rounded-lg border transition-all',
            variant === 'filled' ? 'border-(--gray-color) bg-(--gray-color) focus-within:border-indigo-400' : 'border-gray-300 bg-transparent focus-within:border-indigo-400',
            error && 'border-red-400 focus-within:border-red-400',
          )}
        >
          {/* Иконка слева */}
          {icon && iconPosition === 'left' && <span className="pointer-events-none absolute left-3 flex items-center text-gray-400">{icon}</span>}

          <input
            ref={ref}
            {...props}
            className={clsx(
              'w-full rounded-lg bg-transparent px-3 py-2 text-gray-900 placeholder-gray-400 outline-none',
              iconPosition === 'left' && 'pl-10',
              iconPosition === 'right' && 'pr-10',
              inputClassName,
            )}
          />

          {/* Иконка справа */}
          {icon && iconPosition === 'right' && <span className="pointer-events-none absolute right-3 flex items-center text-gray-400">{icon}</span>}
        </div>

        {/* Ошибка */}
        {error && <p className={clsx('mt-1 text-xs text-red-500', errorClassName)}>{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;

{
  /* 
	пример
	    'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Search, Mail } from 'lucide-react';

export default function InputDemo() {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col gap-6 p-6 max-w-md mx-auto">
      <Input
        label="Поиск"
        placeholder="Найти что-то..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        icon={<Search className="w-4 h-4" />}
        iconPosition="left"
        variant="filled"
      />

      <Input
        label="Email"
        type="email"
        placeholder="example@mail.com"
        icon={<Mail className="w-4 h-4" />}
        iconPosition="right"
        variant="default"
      />

      <Input
        label="Имя"
        placeholder="Введите имя"
        error="Поле обязательно для заполнения"
      />
    </div>
  );
}

	*/
}
