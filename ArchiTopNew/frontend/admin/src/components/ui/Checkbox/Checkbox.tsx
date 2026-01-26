'use client';

import clsx from 'clsx';
import { Check } from 'lucide-react';
import { InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'default';
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, variant = 'default', className, ...props }, ref) => {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 select-none">
      <div
        className={clsx(
          'relative flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-sm border border-(--link-second-color) bg-transparent transition-all duration-200 focus-within:ring-2 focus-within:ring-(--link-second-color) focus-within:ring-offset-2 hover:border-(--primary-color)',
          className,
        )}
      >
        <input ref={ref} type="checkbox" className="peer absolute inset-0 cursor-pointer opacity-0" {...props} />

        <div className="absolute top-0 left-0 h-full w-full bg-[rgba(86,82,232,0.12)] opacity-0 transition-opacity duration-150 peer-checked:opacity-100"></div>
        <Check className="h-4 w-4 scale-0 text-(--link-second-color) opacity-0 transition-transform duration-150 peer-checked:scale-100 peer-checked:opacity-100" />
      </div>

      {label && <span className="text-base">{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;
