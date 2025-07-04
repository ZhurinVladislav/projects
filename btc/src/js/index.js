import utilts from './libs/utilts.min.js';

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
});
