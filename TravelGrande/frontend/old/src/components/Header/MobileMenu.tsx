'use client';

import { PAGES } from '@/config/pages.config';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface IProps {
  isWhite?: boolean;
}

const MobileMenu = ({ isWhite }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      {isWhite ? (
        <button onClick={() => setIsOpen(!isOpen)} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden" aria-label="Toggle menu">
          <span className={`h-0.5 w-6 bg-white transition-all ${isOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-white transition-all ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
        </button>
      ) : (
        <button onClick={() => setIsOpen(!isOpen)} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden" aria-label="Toggle menu">
          <span className={`h-0.5 w-6 bg-black transition-all ${isOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-black transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-black transition-all ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
        </button>
      )}

      {/* Mobile Menu Overlay */}
      {isOpen && <div className="fixed inset-0 z-1000 bg-black/50 md:hidden" onClick={() => setIsOpen(false)}></div>}

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 z-1100 h-full w-70 bg-white shadow-xl transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex h-full flex-col">
          {/* Close Button */}
          <div className="flex items-center justify-between border-b border-(--border-color) p-6">
            <span className="font-[--font-primary] text-xl font-normal">Меню</span>
            <button onClick={() => setIsOpen(false)} className="flex h-8 w-8 items-center justify-center" aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="#2B2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6L18 18" stroke="#2B2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex flex-col gap-1 p-6">
            <Link href={PAGES.HOME} onClick={() => setIsOpen(false)} className="rounded px-4 py-3 text-base font-normal transition-colors hover:bg-(--light-bg-color)">
              Главная
            </Link>
            <Link href={PAGES.OBJECTS} onClick={() => setIsOpen(false)} className="rounded px-4 py-3 text-base font-normal transition-colors hover:bg-(--light-bg-color)">
              Объекты
            </Link>
            <Link href={PAGES.CITIES} onClick={() => setIsOpen(false)} className="rounded px-4 py-3 text-base font-normal transition-colors hover:bg-(--light-bg-color)">
              Города
            </Link>
            <Link href={PAGES.ABOUT_US} onClick={() => setIsOpen(false)} className="rounded px-4 py-3 text-base font-normal transition-colors hover:bg-(--light-bg-color)">
              О нас
            </Link>
            {/* <Link href={PAGES.FAQ} onClick={() => setIsOpen(false)} className="rounded px-4 py-3 text-base font-normal transition-colors hover:bg-(--light-bg-color)">
              FAQ
            </Link> */}
            {/* <Link href={PAGES.CONTACTS} onClick={() => setIsOpen(false)} className="rounded px-4 py-3 text-base font-normal transition-colors hover:bg-(--light-bg-color)">
              Контакты
            </Link> */}
          </nav>

          {/* Bottom Button */}
          <div className="mt-auto border-t border-(--border-color) p-6">
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-(--text-color) px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              Разместить объект
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
