'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';

interface IProps {
  title?: string;
  description?: string;
  onConfirm: () => Promise<void> | void;
  triggerLabel?: string;
}

const AlertDelete: React.FC<IProps> = ({ title = 'Удалить элемент?', description = 'Это действие нельзя будет отменить. Подтвердите удаление.', onConfirm, triggerLabel = 'Удалить' }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  // Отложенный рендер — чтобы портал создавался только на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      setOpen(false);
    } catch (err) {
      console.error(err);
      setError('Ошибка при удалении. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  // пока компонент не смонтировался на клиенте — ничего не рендерим
  if (!mounted) return null;

  return (
    <>
      <button onClick={() => setOpen(true)} className="font-medium text-(--error-color) hover:underline">
        {triggerLabel}
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />

              <motion.div
                className="fixed top-1/2 left-1/2 z-[110] w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg dark:bg-neutral-900"
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <button onClick={() => setOpen(false)} className="text-gray-500 transition-colors hover:text-gray-800" aria-label="Закрыть">
                    <X className="h-5 w-5 text-white transition-colors duration-300 ease-linear" />
                  </button>
                </div>

                <div className="flex flex-col items-center text-center">
                  <AlertTriangle className="mb-3 h-10 w-10 text-(--error-color)" />
                  <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-300">{description}</p>

                  {error && <p className="mb-3 text-sm text-(--error-color)">{error}</p>}

                  <div className="flex w-full justify-between gap-3">
                    <Button variant="secondary" onClick={() => setOpen(false)} className="flex-1" disabled={loading}>
                      Отмена
                    </Button>

                    <Button variant="danger" onClick={handleConfirm} disabled={loading}>
                      {loading ? 'Удаляем...' : 'Удалить'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};

export default AlertDelete;
