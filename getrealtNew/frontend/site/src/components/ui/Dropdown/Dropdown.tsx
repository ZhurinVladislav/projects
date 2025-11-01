'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface DropdownItem {
  label: string;
  icon?: ReactNode;
  value?: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  variant?: 'default' | 'filled';
  maxHeight?: number;
  className?: string;
}

const Dropdown = ({ label, items, onSelect, variant = 'default', maxHeight = 200, className }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне списка
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelect = (item: DropdownItem) => {
    setSelected(item.label);
    setOpen(false);
    onSelect(item.value || item.label);
  };

  return (
    <div ref={ref} className={clsx('relative inline-block text-left', className)}>
      {/* Кнопка */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className={clsx(
          'flex w-full items-center justify-between rounded-lg border px-4 py-2 transition-colors duration-200',
          variant === 'filled' ? 'rounded-xl bg-teal-400 px-4 py-2 text-white transition hover:bg-teal-500' : 'border-gray-200 bg-transparent hover:bg-gray-100',
        )}
      >
        <span>{selected || label}</span>
        <ChevronDown className={clsx('ml-2 h-4 w-4 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {/* Выпадающий список */}
      <AnimatePresence>
        {open && (
          <motion.ul
            key="dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={clsx(
              'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent absolute left-0 z-10 mt-2 w-full overflow-auto rounded-lg bg-white shadow-md',
              variant === 'filled' && 'bg-gray-50',
            )}
            style={{ maxHeight }}
          >
            {items.map(item => (
              <motion.li
                key={item.label}
                whileHover={{ backgroundColor: 'rgba(99,102,241,0.1)' }}
                onClick={() => handleSelect(item)}
                className="flex cursor-pointer items-center gap-2 px-4 py-2 text-gray-800 select-none"
              >
                {item.icon && <span className="h-5 w-5 text-gray-600">{item.icon}</span>}
                {item.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
