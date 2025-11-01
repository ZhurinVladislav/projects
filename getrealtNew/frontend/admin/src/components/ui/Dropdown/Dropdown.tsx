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
  selectedValue?: string | null; // ✅ добавлено
}

const Dropdown = ({
  label,
  items,
  onSelect,
  variant = 'default',
  maxHeight = 200,
  className,
  selectedValue = null, // ✅ значение по умолчанию
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // ✅ Если передан selectedValue — ищем label и устанавливаем его
  useEffect(() => {
    if (selectedValue) {
      const found = items.find(item => item.value === selectedValue);
      if (found) setSelected(found.label);
    }
  }, [selectedValue, items]);

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
      <div
        onClick={() => setOpen(prev => !prev)}
        className={clsx(
          'flex w-full justify-between rounded-lg border px-4 py-2 transition-colors duration-200',
          variant === 'filled'
            ? 'rounded-sm border border-(--secondary-color) bg-(--bg-op-1-color) px-2 hover:bg-(--primary-color) focus:ring-(--secondary-color)'
            : 'border-(--secondary-color) bg-(--bg-op-1-color) hover:bg-(--primary-color) focus:ring-(--secondary-color)',
        )}
      >
        <span>{selected || label}</span>
        <ChevronDown className={clsx('ml-2 h-4 w-4 transition-transform duration-200', open && 'rotate-180')} />
      </div>

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
              'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent absolute left-0 z-10 mt-2 w-full overflow-auto rounded-sm border-(--primary-color) bg-(--secondary-color)',
              variant === 'filled' && 'bg-(--secondary-color)',
            )}
            style={{ maxHeight }}
          >
            {items.map(item => (
              <motion.li
                key={item.value || item.label}
                whileHover={{ backgroundColor: 'rgba(99,102,241,0.1)' }}
                onClick={() => handleSelect(item)}
                className={clsx('flex cursor-pointer items-center gap-2 px-4 py-2 select-none', selected === item.label && 'bg-(--primary-color)/10 font-medium')}
              >
                {item.icon && <span className="h-5 w-5 text-white">{item.icon}</span>}
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
