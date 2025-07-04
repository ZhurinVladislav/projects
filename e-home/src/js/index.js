import utilts from './libs/utilts.min.js';

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация функций из файла utilts
  utilts();

  const countInput = () => {
    const wrapArr = [...document.querySelectorAll('.js-count-wrap')];

    if (!wrapArr || wrapArr === null || wrapArr.length === 0) return;

    wrapArr.forEach(el => {
      const btnMinus = el.querySelector('.js-count-btn-minus');
      const btnPlus = el.querySelector('.js-count-btn-plus');
      const input = el.querySelector('.js-count-input');

      if (!btnMinus || btnMinus === null) return;
      if (!btnPlus || btnPlus === null) return;
      if (!input || input === null) return;

      btnMinus.addEventListener('click', () => {
        if (input.value > 0) --input.value;
      });

      btnPlus.addEventListener('click', () => {
        if (input.value < 10) ++input.value;
      });
    });
  };

  countInput();

  const ratingReview = () => {
    const wrap = document.getElementById('star-list');
    const input = document.getElementById('star-value');
    const countText = document.getElementById('star-count-text');

    if (!wrap || wrap === null) return;
    if (!input || input === null) return;
    if (!countText || countText === null) return;

    const itemsArr = Array.from(wrap.querySelectorAll('.js-star'));

    if (itemsArr.length === 0 || !itemsArr || itemsArr === null) return;

    itemsArr.forEach(el => {
      el.addEventListener('click', () => {
        const value = el.getAttribute('data-value');

        itemsArr.forEach(s => s.classList.remove('selected'));

        itemsArr.forEach(s => {
          if (parseInt(s.getAttribute('data-value')) <= value) {
            s.classList.add('selected');
          }
        });

        input.value = value;
        countText.textContent = value;
      });
    });
  };

  ratingReview();

  /**
   * Аккордеон
   * @returns void
   */
  const accordion = () => {
    const accordion = Array.from(document.querySelectorAll('.js-accordion'));
    const accordionBtn = Array.from(document.querySelectorAll('.js-accordion-btn'));
    const accordionText = Array.from(document.querySelectorAll('.js-accordion-content'));

    if (accordion.length === 0) return;

    accordionText.forEach(el => el.classList.add('accordion-hidden'));

    accordionBtn[0].classList.add('active');
    accordionBtn[0].parentNode.classList.add('active');
    accordionText[0].style.maxHeight = `${accordionText[0].scrollHeight}px`;

    accordionBtn.forEach(el => {
      el.addEventListener('click', () => {
        const parentItem = el.parentNode;
        const accordionContent = el.nextElementSibling;

        if (accordionContent.style.maxHeight) {
          accordionText.forEach(el => (el.style.maxHeight = null));
          parentItem.classList.remove('active');
          el.classList.remove('active');
        } else {
          accordionText.forEach(el => {
            el.style.maxHeight = null;
            el.parentNode.classList.remove('active');
            el.previousElementSibling.classList.remove('active');
          });
          accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
          parentItem.classList.add('active');
          el.classList.add('active');
        }
      });
    });
  };

  accordion();

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

  // Универсальная функция переключения меню
  const toggleMenu = (menu, trigger, className) => {
    if (!menu || !trigger) {
      console.warn('toggleMenu: элемент не найден', { menu, trigger });
      return;
    }
    // Открытие/закрытие меню при клике на кнопку
    trigger.addEventListener('click', e => {
      e.preventDefault();
      menu.classList.toggle(className);
      body.classList.toggle('noscroll');
    });
    // Закрытие меню при клике вне области
    document.addEventListener('click', e => {
      if (!menu.contains(e.target) && !trigger.contains(e.target)) {
        menu.classList.remove(className);
        body.classList.remove('noscroll');
      }
    });
  };
  // Универсальная функция для добавления/удаления класса при событиях
  const toggleOnEvent = (element, className, addEvent, removeEvent) => {
    if (!element) {
      console.warn('toggleOnEvent: элемент не найден', { element });
      return;
    }
    element.addEventListener(addEvent, () => {
      element.classList.add(className);
      body.classList.add('noscroll');
    });

    element.addEventListener(removeEvent, () => {
      element.classList.remove(className);
      body.classList.remove('noscroll');
    });
  };

  // Элементы
  const body = document.body;
  const btnMenuOpen = document.querySelector('.header__toggle');
  const mobMenu = document.querySelector('.mobMenu');
  const btnMenuClose = document.querySelector('.mobMenu__close');
  const navLinks = document.querySelectorAll('.mobMenu .nav-link');
  const header = document.querySelector('.header');
  const sections = document.querySelector('.sections');

  // Открытие/закрытие мобильного меню
  toggleMenu(mobMenu, btnMenuOpen, 'active');
  toggleMenu(body, btnMenuOpen, 'noscroll');

  // Если есть кнопка закрытия меню, добавляем обработчик
  if (btnMenuClose) {
    btnMenuClose.addEventListener('click', e => {
      e.preventDefault();
      mobMenu.classList.remove('active');
      body.classList.remove('noscroll');
    });
  }
  if (navLinks) {
    navLinks.forEach(navLink => {
      navLink.addEventListener('click', () => {
        mobMenu.classList.remove('active');
        body.classList.remove('noscroll');
      });
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header.classList.add('scroll');
      sections.classList.add('scroll');
    } else {
      header.classList.remove('scroll');
      sections.classList.remove('scroll');
    }
  });
  // Получаем все модалки и кнопки открытия
  const modals = document.querySelectorAll('.modal');
  const modalOpen = document.querySelectorAll('.modal-open');

  // Функция для закрытия всех модалок
  const closeAllModals = () => {
    modals.forEach(modal => {
      modal.classList.remove('active');
    });
  };

  // Функция для открытия конкретной модалки по ID
  const openModal = modalId => {
    const modal = document.querySelector(`.modal[data-modal-id="${modalId}"]`);
    if (modal) {
      closeAllModals(); // Закрываем все модалки перед открытием новой
      modal.classList.add('active');
    }
  };

  // Добавляем обработчики для открытия модалок
  modalOpen.forEach(element => {
    element.addEventListener('click', e => {
      e.preventDefault(); // Предотвращаем действие по умолчанию

      // Получаем ID модалки из атрибута data-modal-target
      const modalId = element.getAttribute('data-modal-target');
      if (modalId) {
        openModal(modalId); // Открываем модалку по ID
      }
    });
  });

  // Добавляем обработчики для закрытия модалок
  modals.forEach(modal => {
    const closeButton = modal.querySelector('.modal__close');
    const overlay = modal.querySelector('.modal__overlay');

    if (closeButton) {
      closeButton.addEventListener('click', closeAllModals);
    }

    if (overlay) {
      overlay.addEventListener('click', closeAllModals);
    }
  });

  // Закрытие модалок при нажатии на Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  //fancybox
  // Fancybox.bind('[data-fancybox]', {
  //   // Your custom options
  // });
  // Функция инициализации свайпера
  function initSwiper(selector, config) {
    const element = document.querySelector(selector);
    if (element) {
      return new Swiper(selector, config);
    }
    return null;
  }
  const promoSlider = {
    direction: 'horizontal',
    spaceBetween: 0,
    watchOverflow: false,
    slidesPerView: 1,
    freemode: true,
    keyboard: true,
    loop: true,
    navigation: {
      nextEl: '.promo-btn.next',
      prevEl: '.promo-btn.prev',
    },
    pagination: {
      el: '.promo-pagination',
      clickable: true,
    },
  };
  const certSlider = {
    direction: 'horizontal',
    spaceBetween: 20,
    slidesPerView: 'auto',
    keyboard: true,
    loop: true,
  };
  const projectsSlider = {
    direction: 'horizontal',
    spaceBetween: 20,
    watchOverflow: false,
    slidesPerView: 'auto',
    freemode: true,
    keyboard: true,
    navigation: {
      nextEl: '.controls__btn.next',
      prevEl: '.controls__btn.prev',
    },
    // Добавляем обработчики событий для счетчика
    on: {
      init: function () {
        updateSliderCounter(this);
      },
      slideChange: function () {
        updateSliderCounter(this);
      },
      // Для корректной работы в loop-режиме
      realIndexChange: function () {
        updateSliderCounter(this);
      },
    },
  };

  const videoSlider = {
    direction: 'horizontal',
    spaceBetween: 20,
    watchOverflow: false,
    slidesPerView: 'auto',
    freemode: true,
    keyboard: true,
    navigation: {
      nextEl: '.video__slider .controls__btn.next',
      prevEl: '.video__slider .controls__btn.prev',
    },
    // Добавляем обработчики событий для счетчика
    on: {
      init: function () {
        updateSliderCounter(this);
      },
      slideChange: function () {
        updateSliderCounter(this);
      },
      // Для корректной работы в loop-режиме
      realIndexChange: function () {
        updateSliderCounter(this);
      },
    },
  };
  // Функция для обновления счетчика слайдов
  function updateSliderCounter(swiper) {
    const current = swiper.realIndex + 1;
    const total = swiper.slides.length;
    const counterElement = document.querySelector('.video__slider .controls__current span');

    if (counterElement) {
      counterElement.textContent = `${current}/${total}`;
    }
  }
  // Инициализация свайперов
  if (document.querySelector('.promo-slider.swiper')) {
    initSwiper('.promo-slider.swiper', promoSlider);
  }
  if (document.querySelector('.cert__slider.swiper')) {
    initSwiper('.cert__slider.swiper', certSlider);
  }
  if (document.querySelector('.projects__slider.swiper')) {
    initSwiper('.projects__slider.swiper', projectsSlider);
  }
  if (document.querySelector('.video__slider .swiper')) {
    initSwiper('.video__slider .swiper', projectsSlider);
  }
});
