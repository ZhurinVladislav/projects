import MobMenu from './libs/mob-menu.min.js';
// import utilts from './libs/utilts.min.js';

const utilts = () => {
  /* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
  const webp = callback => {
    const webP = new Image();

    webP.onload = webP.onerror = () => callback(webP.height == 2);

    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  };

  webp(support => {
    const className = support === true ? 'webp' : 'no-webp';

    document.documentElement.classList.add(className);
  });

  /* Убираем фокус после нажатия на кнопку или ссылку */
  const removeFocus = () => {
    const arrBtn = document.querySelectorAll('button');
    const arrLink = document.querySelectorAll('a');
    const arrElements = [...arrBtn, ...arrLink];

    arrElements.forEach(ev => {
      ev.addEventListener('mousedown', el => el.preventDefault());
      ev.addEventListener('mouseup', el => el.preventDefault());
    });
  };

  removeFocus();

  /* Нормализуем ссылки на номер телефона. */
  const normalizePhoneLink = () => {
    const arrLinks = document.querySelectorAll('a[href^="tel:"]');

    if (arrLinks.length === 0) return;

    arrLinks.forEach(el => {
      const normalizeHref = el.href.replace(/[^+\d]/g, '');
      el.href = `tel:${normalizeHref}`;
    });
  };

  normalizePhoneLink();
};

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация функций из файла utilts
  utilts();

  // Инициализация функций мобильного меню
  const mobMenuWrap = document.getElementById('menu-mobile');
  const mobMenuBtn = document.getElementById('menu-toggle');

  const mobMenu = new MobMenu(document.documentElement, document.body, mobMenuBtn, mobMenuWrap, true);
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

  /**
   * Слайдер в блоке "hero" на главной странице
   */
  const heroSlider = () => {
    if (!document.getElementById('hero-slider')) return;

    const slider = new Swiper('#hero-slider', {
      slidesPerView: 1,
      spaceBetween: 0,
      grabCursor: true,
      freeMode: false,
      speed: 900,
      loop: true,
      lazy: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        disabledClass: 'slider__btn_disable',
        nextEl: '#hero-slider-next',
        prevEl: '#hero-slider-prev',
      },
      slideActiveClass: 'slide_active',
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
    });
  };

  heroSlider();

  /**
   * Инициализация галереи.
   */
  const initGallery = () => {
    Fancybox.bind('[data-fancybox]', {
      infinite: false,
      keyboard: {
        Escape: 'close',
      },
      iframe: {
        preload: false,
        width: 800,
        height: 450,
        autoplay: true,
      },
    });
  };

  initGallery();
});
