'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

const Modal = ({ open, onClose, children, title, className }: ModalProps) => {
  // Блокировка прокрутки фона
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [open]);

  // Закрытие по ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Если окно закрыто — не рендерим ничего
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Затемнение фона */}
          <motion.div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

          {/* Модалка */}
          <motion.div
            className={clsx('fixed top-1/2 left-1/2 z-[110] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg', className)}
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Заголовок */}
            <div className="mb-4 flex items-center justify-between">
              {title && <h2 className="text-xl font-semibold">{title}</h2>}
              <button onClick={onClose} className="text-gray-500 transition-colors hover:text-gray-800" aria-label="Закрыть">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Контент */}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

Modal.displayName = 'Modal';

export default Modal;
