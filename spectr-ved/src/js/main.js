document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const mobMenuWrap = document.getElementById('menu-mobile');
  const mobMenuBtn = document.getElementById('burger-toggle');

  // УБИРАЕМ ФОКУС ПОСЛЕ НАЖАТИЯ НА КНОПКУ ИЛИ ССЫЛКУ
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

  //ФИКСИРОВАННАЯ ШАПКА ПРИ СКРОЛЛЕ
  const fixedHeader = () => {
    const main = document.getElementById('main').classList;
    const header = document.getElementById('header').classList;

    const active_class = 'header_active';
    const active_class_main = 'main_active';

    let scrollY = 0;

    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;

      if (scrollY > 20) {
        header.add(active_class);
        main.add(active_class_main);
      } else {
        header.remove(active_class);
        main.remove(active_class_main);
      }
    });
  };

  fixedHeader();

  const scrollMenuLink = () => {
    const arrLink = Array.from(document.querySelectorAll('a[href^="#"]'));

    if (!arrLink || arrLink.length === 0 || arrLink === null) return;

    arrLink.forEach(anchor => {
      anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const itemLink = document.querySelector(this.getAttribute('href'));

        // if (mobMenuWrap.classList.contains('active')) {
        // html.classList.remove('menu-open');
        // body.classList.remove('menu-open');
        // mobMenuWrap.classList.remove('active');
        // mobMenuBtn.classList.remove('menu-toggle_active');
        // }

        itemLink.scrollIntoView({ behavior: 'smooth', block: 'center' }, { passive: true });
      });
    });
  };

  scrollMenuLink();

  // МОБИЛЬНОЕ МЕНЮ
  const mobMenu = () => {
    // ОТКРЫТИЕ И ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
    mobMenuBtn.addEventListener('click', () => {
      mobMenuBtn.classList.toggle('menu-toggle_active');
      mobMenuWrap.classList.toggle('active');
      body.classList.toggle('menu-open');
      html.classList.toggle('menu-open');
    });

    // ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ КНОПКОЙ "ESC"
    window.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') {
        mobMenuBtn.classList.remove('menu-toggle_active');
        mobMenuWrap.classList.remove('active');
        body.classList.remove('menu-open');
        html.classList.remove('menu-open');
      }
    });
  };

  // mobMenu();

  // СТРЕЛКА ПРОКРУТКИ НА ВВЕРХ
  const scrollTop = () => {
    const btn = document.getElementById('scroll-top');
    let scrollY = 0;

    const addClassBtn = () => {
      scrollY = window.scrollY;

      window.scrollY >= 100 ? btn.classList.add('scroll-top_active') : btn.classList.remove('scroll-top_active');
    };

    const scrollPage = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', addClassBtn, { passive: true });

    btn.addEventListener('click', scrollPage);
  };

  scrollTop();

  // СЛАЙДЕР В БЛОКЕ "НАШИ КЛИЕНТЫ"
  const customersSwiper = () => {
    if (!document.getElementById('customers-swiper')) return;

    const swiper = new Swiper('#customers-swiper', {
      slidesPerView: 4,
      spaceBetween: 20,
      grabCursor: true,
      loop: true,
      speed: 400,
      slideActiveClass: 'customers-swiper__slide_active',
      navigation: {
        lockClass: 'swiper-navigation__btn_lock',
        disabledClass: 'swiper-navigation__btn_disable',
        nextEl: '#customers-btn-next',
        prevEl: '#customers-btn-prev',
      },
      autoplay: {
        delay: 3000,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      breakpoints: {
        // when window width is >= 320px
        60: {
          slidesPerView: 1,
        },
        // when window width is >= 480px
        768: {
          slidesPerView: 2,
        },
        // when window width is >= 640px
        1360: {
          slidesPerView: 4,
        },
      },
    });
  };

  customersSwiper();

  // АККОРДЕОН
  const accordion = () => {
    const ac = document.querySelectorAll('.js-ac');
    const acBtn = document.querySelectorAll('.js-ac-btn');
    const acText = document.querySelectorAll('.js-ac-content');

    if (!ac) return;

    acText.forEach(el => el.classList.add('ac-hidden'));

    acBtn.forEach(el => {
      el.addEventListener('click', () => {
        const acContent = el.nextElementSibling;

        if (acContent.style.maxHeight) {
          acText.forEach(el => (el.style.maxHeight = null));
          el.classList.remove('ac-active');
        } else {
          acText.forEach(el => {
            el.style.maxHeight = null;
            el.previousElementSibling.classList.remove('ac-active');
          });
          acContent.style.maxHeight = acContent.scrollHeight + 'px';
          el.classList.add('ac-active');
        }
      });
    });
  };

  accordion();

  const getHoverItem = (arr = [], hover = '') => {
    if (arr === null || arr === undefined || arr.length === 0 || hover === '' || hover === undefined || hover === null) return;

    arr.forEach(item => {
      item.addEventListener('mouseover', () => {
        hover.classList.add('active');
      });
    });

    arr.forEach(item => {
      item.addEventListener('mouseout', () => {
        hover.classList.remove('active');
      });
    });
  };

  const hoverTableTariffs = () => {
    const hoverWrapper = document.getElementById('hover-wrapper');
    const arrChild = hoverWrapper.childNodes;

    arrChild.forEach(itemHover => {
      const arr = Array.from(document.querySelectorAll(`[data-hover^="${itemHover.id}"]`));

      getHoverItem(arr, itemHover);
    });
  };

  if (window.innerWidth >= 991) {
    hoverTableTariffs();
  }
});
