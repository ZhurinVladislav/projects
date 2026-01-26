'use client';

import { SITE } from '@/config/site.config';
import { MENU } from '@/shared/data/menu.data';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { useEffect, useState } from 'react';
import CustomLink from '../ui/CustomLink';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(prev => !prev);

  // 🚫 Блокируем скролл при открытом меню
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Кнопка меню */}
      <button aria-label="Toggle menu" onClick={toggleMenu} className="rounded-lg border border-gray-300 p-2 transition hover:bg-gray-100">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Затемнение фона + анимация меню */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div key="overlay" className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleMenu} />

            <motion.nav
              key="menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className="fixed top-0 right-0 z-50 flex h-full w-64 flex-col bg-white p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                {/* <h2 className="text-xl font-semibold">Меню</h2> */}
                <button onClick={toggleMenu}>
                  <X size={24} />
                </button>
              </div>

              <ul className="space-y-4">
                {MENU.map(item => (
                  <li key={item.id}>
                    <CustomLink type="text" href={item.href} text={item.name} isActive={!!match(item.href)(pathname)} onClick={() => setIsOpen(false)} />
                  </li>
                ))}
              </ul>

              <div className="mt-auto border-t border-gray-200 pt-6">
                <Link href={`tel:${SITE.PHONE_MAIN}`} className="block text-lg font-semibold text-blue-600" onClick={() => setIsOpen(false)}>
                  {SITE.PHONE_MAIN}
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
