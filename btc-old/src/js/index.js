import MobMenu from './libs/mob-menu.min.js';
import utilts from './libs/utilts.min.js';

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация функций из файла utilts
  utilts();

  // Инициализация функций мобильного меню
  const mobMenuWrap = document.getElementById('menu-mobile');
  const mobMenuBtnOpen = document.getElementById('menu-btn-open');
  const mobMenuBtnClose = document.getElementById('menu-btn-close');

  const mobMenu = new MobMenu(document.documentElement, document.body, mobMenuBtnOpen, mobMenuBtnClose, mobMenuWrap, true);
  mobMenu.init();

  /**
   * Функция для управления кнопкой прокрутки вверх.
   */
  const scrollTop = () => {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    const updateScrollButton = () => {
      btn.classList.toggle('visible', window.scrollY > 100);
    };

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateScrollButton);
    updateScrollButton();
  };

  scrollTop();
});
