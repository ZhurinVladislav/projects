document.addEventListener('DOMContentLoaded', () => {
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

    let header = document.getElementById('header').classList,
      active_class = 'header_active',
      active_class_main = 'main_active';

    window.addEventListener('scroll', () => {
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

  const overflowHTML = () => {
    let scrollY = 0;

    const toggleClassOverflow = () => {
      scrollY = window.scrollY;

      window.scrollY >= 100 ? document.body.classList.add('overflow') : document.body.classList.remove('overflow');
    };

    if (document.getElementById('menu-inner')) {
      window.addEventListener('scroll', toggleClassOverflow, { passive: true });
    }
  };

  overflowHTML();

  // МОБИЛЬНОЕ МЕНЮ
  const mobMenu = () => {
    const burgerBtn = document.getElementById('burger-toggle');
    const burgerMenu = document.getElementById('burger-menu');
    const html = document.querySelector('html');
    const body = document.querySelector('body');

    // ОТКРЫТИЕ И ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('menu-toggle_active');
      burgerMenu.classList.toggle('active');
      body.classList.toggle('menu-open');
      html.classList.toggle('menu-open');
    });

    // ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ КНОПКОЙ "ESC"
    window.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') {
        burgerBtn.classList.remove('menu-toggle_active');
        burgerMenu.classList.remove('active');
        body.classList.remove('menu-open');
        html.classList.remove('menu-open');
      }
    });
  };

  mobMenu();

  // ОТКРЫТИЕ ВСПЛЫВАЮЩЕГО СПИСКА В МОБ. МЕНЮ
  const mobMenuList = () => {
    const parentItem = document.querySelectorAll('.item__btn');
    const listInner = document.querySelectorAll('.parent .list');

    let arrLength;

    listInner.forEach(el => {
      el.classList.add('overflow-hidden');
    });

    for (let i = 0; i < listInner.length; i++) {
      const el = listInner[i];
      const elChild = el.children;

      for (let i = 0; i < elChild.length; i++) {
        let parent = elChild[i].parentNode;
        const arrow = parent.previousElementSibling;

        arrLength = elChild.length;

        if (elChild[i].classList.contains('active')) {
          document.querySelectorAll('.list').forEach(el => (el.style.maxHeight = null));
          parent.style.maxHeight = 'max-content';

          arrow.classList.add('active');
        }
      }
    }

    parentItem.forEach(el => {
      el.addEventListener('click', () => {
        const acContent = el.nextElementSibling;

        if (acContent.style.maxHeight) {
          document.querySelectorAll('.menu__list .list').forEach(el => {
            el.style.maxHeight = null;
          });
          el.classList.remove('active');
        } else {
          document.querySelectorAll('.menu__list .list').forEach(el => {
            el.style.maxHeight = null;
            el.previousElementSibling.classList.remove('active');
          });
          acContent.style.maxHeight = acContent.scrollHeight + 'px';
          el.classList.add('active');
        }
      });
    });
  };

  mobMenuList();

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

  // COOKIES
  const cookiesHidden = () => {
    const wrapper = document.getElementById('cookies');
    const btn = document.getElementById('cookies-btn');
    let closeBtn = window.sessionStorage.getItem('close');

    if (!wrapper) return;

    if (closeBtn) wrapper.style.display = 'none';

    btn.addEventListener('click', () => {
      wrapper.style.display = 'none';
      window.sessionStorage.setItem('close', true);
    });
  };

  cookiesHidden();

  // СЛАЙДЕР НА СТРАНИЦЕ "ПОРТФОЛИО"
  const portfolioSlider = () => {
    if (!document.getElementById('portfolio-slider')) return;

    const swiper = new Swiper('#portfolio-slider', {
      spaceBetween: 80,
      slidesPerView: 1,
      onlyExternal: false,
      grabCursor: true,
      speed: 500,
      slideActiveClass: 'portfolio-slider__slide_active',
      // navigation: {
      //   lockClass: 'slider-navigation__btn_lock',
      //   disabledClass: 'slider-navigation__btn_disable',
      //   nextEl: '#certificates-btn-next',
      //   prevEl: '#certificates-btn-prev',
      // },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      pagination: {
        el: '#portfolio-pagination',
        lockClass: 'portfolio-pagination__item_lock',
        bulletClass: 'portfolio-pagination__item',
        bulletActiveClass: 'portfolio-pagination__item_active',
        clickable: true,
      },
      breakpoints: {
        32: {
          spaceBetween: 20,
        },
        767: {
          spaceBetween: 80,
        },
      },
    });
  };

  portfolioSlider();

  // СЛАЙДЕР НА СТРАНИЦЕ "СЕРТИФИКАТЫ"
  const certificatesSlider = () => {
    if (!document.getElementById('certificates-slider')) return;

    const textCertificates = document.getElementById('certificates-text');
    const sliderCertificates = document.getElementById('certificates-slider');

    const swiper = new Swiper('#certificates-slider', {
      spaceBetween: 40,
      slidesPerView: 1,
      onlyExternal: false,
      grabCursor: true,
      speed: 500,
      slideActiveClass: 'certificates-slider__slide_active',
      navigation: {
        lockClass: 'slider-navigation__btn_lock',
        disabledClass: 'slider-navigation__btn_disable',
        nextEl: '#certificates-btn-next',
        prevEl: '#certificates-btn-prev',
      },
      pagination: {
        el: '#certificates-pagination',
        lockClass: 'slider-navigation__pagination_lock',
        type: 'fraction',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      breakpoints: {
        32: {
          spaceBetween: 20,
        },
        767: {
          spaceBetween: 40,
        },
      },
      on: {
        slideNextTransitionStart: () => {
          textCertificates.classList.add('hidden');
          sliderCertificates.classList.add('active');
        },
        reachBeginning: () => {
          textCertificates.classList.remove('hidden');
          sliderCertificates.classList.remove('active');
        },
      },
    });
  };

  certificatesSlider();
});
