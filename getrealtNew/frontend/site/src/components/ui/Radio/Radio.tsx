'use client';

import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'default';
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, variant = 'default', className, ...props }, ref) => {
  return (
    <label className="flex cursor-pointer items-center gap-2 select-none">
      <div
        className={clsx(
          'relative flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[rgba(86,82,232,0.35)] transition-all duration-200 focus-within:ring-2 focus-within:ring-(--link-second-color) focus-within:ring-offset-2 hover:bg-(--primary-color)',
          className,
        )}
      >
        <input ref={ref} type="radio" className="peer absolute inset-0 cursor-pointer opacity-0" {...props} />
        <span className="block h-2 w-2 scale-0 rounded-full bg-white opacity-0 transition-transform duration-150 peer-checked:scale-100 peer-checked:opacity-100" />
      </div>

      {label && <span className="text-base">{label}</span>}
    </label>
  );
});

Radio.displayName = 'Radio';
export default Radio;
