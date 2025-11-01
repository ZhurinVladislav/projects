document.addEventListener('DOMContentLoaded', () => {
  // Инициализация функций из файла utilts
  utilts();

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
   * Функция анимации в блоке hero на главной странице
   */
  const initHeroScrollEffect = () => {
    const wrapper = document.getElementById('home-hero-scroll');
    const heroSection = document.getElementById('home-hero');
    const overlay = document.getElementById('home-hero-bg');

    if (!heroSection || !overlay || !wrapper) return;

    // Установка фоновых изображений из data-атрибутов
    const mainBg = heroSection.dataset.image;
    const overlayBg = overlay.dataset.image;

    if (mainBg) {
      heroSection.style.backgroundImage = `url('${mainBg}')`;
    }

    if (overlayBg) {
      overlay.style.backgroundImage = `url('${overlayBg}')`;
    }

    // Обновление прозрачности фона при скролле
    const updateOpacity = () => {
      const wrapperTop = wrapper.offsetTop;
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;

      const progress = (scrollY - wrapperTop) / windowHeight;
      const opacity = Math.min(Math.max(progress, 0), 1);

      overlay.style.setProperty('--hero-overlay-opacity', opacity.toString());
    };

    window.addEventListener('scroll', updateOpacity, { passive: true });
    window.addEventListener('resize', updateOpacity);

    updateOpacity(); // при загрузке
  };

  initHeroScrollEffect();

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
    const currentSum = document.getElementById('bar-current');
    const targetSum = document.getElementById('bar-target');

    if (!line || !currentSum || !targetSum) return;

    const currentAttr = currentSum.dataset.barCurrent;
    const targetAttr = targetSum.dataset.barTarget;

    try {
      const percentage = calculatePercentage(currentAttr, targetAttr);

      line.style.width = `${percentage}%`;
      currentSum.textContent = formatNumberWithSpaces(currentAttr);
      targetSum.textContent = formatNumberWithSpaces(targetAttr);
    } catch (error) {
      console.error(error.message);
    }
  };

  progressBar();

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

  $('body').on('click', '.header .menu button', function () {
    $('html').addClass('mod-open');
    $('.top-menu, .top-menu-overlay').addClass('active');
  });

  $('body').on('click', '.top-menu .close, .top-menu-overlay', function () {
    $('html').removeClass('mod-open');
    $('.top-menu, .top-menu-overlay').removeClass('active');
  });

  $('body').on('click', '.aside .dropdown, .top-menu .dropdown', function () {
    $(this).toggleClass('active');
  });

  $('body').on('click', '.form-item .eye', function () {
    $(this).toggleClass('cross');
    if ($(this).parent().find('input').attr('type') == 'password') {
      $(this).parent().find('input').attr('type', 'text');
    } else {
      $(this).parent().find('input').attr('type', 'password');
    }
  });

  $('body').on('click', '.tabs .tab-item', function () {
    let tab_name = $(this).attr('data-tab');

    $('.tabs .tab-item').removeClass('active');
    $('.tab-content[data-tab="' + tab_name + '"]')
      .parent()
      .find('.tab-content')
      .removeClass('active');

    $(this).addClass('active');
    $('.tab-content[data-tab="' + tab_name + '"]').addClass('active');
  });

  $('body').on('click', '.faq-button', function () {
    $(this).blur();
    $(this).parents('.faq-item').toggleClass('active');
    let text = $(this).find('.caption').text();

    if (text == '+') {
      $(this).find('.caption').text('-');
    } else {
      $(this).find('.caption').text('+');
    }
  });

  // список слайдеров на странице Краудфандинг
  const addSliderIdentifier = nameClass => {
    const sliders = Array.from(document.querySelectorAll(`${nameClass}`));

    if (!sliders) return;

    for (let i = 0; i < sliders.length; i++) {
      const el = sliders[i];
      el.id = `slider-${i}`;
    }
  };

  addSliderIdentifier('.js-slider');

  const slidersProject = () => {
    const wrapperSliders = document.getElementById('roadmap');
    if (!wrapperSliders) return;
    const navWrapper = Array.from(wrapperSliders.querySelectorAll('.js-navigation'));

    for (let i = 0; i < navWrapper.length; i++) {
      const el = navWrapper[i];
      el.querySelector('.js-btn-prev').classList.add(`p-${i}`);
      el.querySelector('.js-btn-next').classList.add(`n-${i}`);
    }

    const buildSwiperSlider = (index, sliderElm) => {
      return new Swiper(`#${sliderElm.id}`, {
        spaceBetween: 20,
        slidesPerView: 4,
        onlyExternal: false,
        preloadImages: true,
        lazy: true,
        lazyPreloadPrevNext: 1,
        speed: 500,
        navigation: {
          nextEl: `.n-${index}`,
          prevEl: `.p-${index}`,
        },
        breakpoints: {
          60: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1360: {
            slidesPerView: 4,
          },
        },
      });
    };

    const allSliders = document.querySelectorAll('.js-slider');

    allSliders.forEach((slider, index) => buildSwiperSlider(index, slider));
  };

  slidersProject();

  /**
   * Табы
   */
  const tabs = (tabsBtns, tabsContentWraps, navBtns) => {
    if (!tabsBtns || !tabsContentWraps || !tabsBtns.length === 0 || !tabsContentWraps.length === 0 || navBtns.length === 0) {
      console.warn('Не переданы переменные в функцию tabs');
      return;
    }

    if (tabsBtns.length !== tabsContentWraps.length) {
      console.warn('Длина tabsBtns и tabsContentWraps должны совпадать');
      return;
    }

    tabsBtns.forEach((btn, index) => {
      if (index === 0) {
        btn.classList.add('blue');
        tabsContentWraps[index].classList.add('active');
        navBtns[index].classList.add('active');
      }

      btn.addEventListener('click', () => {
        tabsBtns.forEach(btn => btn.classList.remove('blue'));
        navBtns.forEach(navBtn => navBtn.classList.remove('active'));
        tabsContentWraps.forEach(content => content.classList.remove('active'));

        btn.classList.add('blue');
        tabsContentWraps[index].classList.add('active');
        navBtns[index].classList.add('active');
      });
    });
  };

  const iniTabs = () => {
    const tabsWrap = document.getElementById('tabs');
    const tabsContentWrap = document.getElementById('tabs-content-wrap');
    const navBtns = document.querySelectorAll('.js-navigation');

    if (!tabsWrap || !tabsContentWrap || !navBtns || navBtns.length === 0) {
      return;
    }

    const tabsBtns = tabsWrap.querySelectorAll('.js-tabs-btn');
    const tabsContentWraps = tabsContentWrap.querySelectorAll('.js-tabs-content');

    tabs(tabsBtns, tabsContentWraps, navBtns);
  };

  iniTabs();
});
