import MobMenu from './libs/mob-menu.min.js';
import utilts from './libs/utilts.min.js';

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
   * Слайдер в блоке "Документы"
   */
  const docsSlider = () => {
    if (!document.getElementById('docs-slider')) return;

    new Swiper('#docs-slider', {
      spaceBetween: 24,
      grabCursor: true,
      freeMode: false,
      speed: 500,
      // lazy: true,
      navigation: {
        disabledClass: 'slider__btn_disable',
        nextEl: '#docs-slider-next',
        prevEl: '#docs-slider-prev',
      },
      slideActiveClass: 'slide_active',
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      breakpoints: {
        60: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1360: {
          slidesPerView: 3,
        },
      },
    });
  };

  docsSlider();

  /**
   * Форматирует число, добавляя пробелы каждые три цифры.
   * @param {number|string} number - Число для форматирования.
   * @returns {string} Форматированное число.
   */
  const formatNumberWithSpaces = number => {
    if (number == null || number === '') {
      throw new Error('Не передано значение или оно пустое.');
    }

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  /**
   * Рассчитывает процент текущего значения относительно максимального.
   * @param {number|string} current - Текущее значение.
   * @param {number|string} max - Максимальное значение.
   * @returns {number} Процент текущего значения.
   */
  const calculatePercentage = (current, max) => {
    const curr = Number(current);
    const maximum = Number(max);

    if (curr <= 0) throw new Error('Текущая сумма не может быть ниже или равна нулю.');
    if (maximum <= 0) throw new Error('Максимальная сумма должна быть больше нуля.');
    if (curr > maximum) throw new Error('Текущая сумма не может быть больше максимального значения.');

    return (curr / maximum) * 100;
  };

  /**
   * Обновляет прогресс-бар на основе текущей и целевой суммы.
   */
  const progressBar = () => {
    const line = document.getElementById('bar-line');
    const percent = document.getElementById('bar-percent');
    const currentSum = document.getElementById('bar-current');
    const targetSum = document.getElementById('bar-target');

    if (!line || !percent || !currentSum || !targetSum) return;

    const currentAttr = currentSum.dataset.barCurrent;
    const targetAttr = targetSum.dataset.barTarget;

    try {
      const percentage = calculatePercentage(currentAttr, targetAttr);

      line.style.width = `${percentage}%`;
      percent.textContent = `${Math.round(percentage)}%`;
      currentSum.textContent = formatNumberWithSpaces(currentAttr);
      targetSum.textContent = formatNumberWithSpaces(targetAttr);
    } catch (error) {
      console.error(error.message);
    }
  };

  progressBar();

  /**
   * Инициализация галереи.
   */
  const initGallery = () => {
    Fancybox.bind('[data-fancybox]', {
      infinite: false,
      keyboard: {
        Escape: 'close',
      },
    });
  };

  initGallery();
});
