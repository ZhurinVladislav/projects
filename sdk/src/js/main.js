document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  const body = document.querySelector('body');

  // ДОБАВЛЕНИЕ КЛАССА ДЛЯ HTML
  if (document.getElementById('service')) {
    document.querySelector('html').classList.add('overflow');
    document.querySelector('body').classList.add('overflow');
  }

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

  // ДОБАВЛЕНИЕ ОТСТУПА СПРАВА ПРИ ОТКРЫТИЕ ГАЛЕРИИ
  const addIndentation = () => {
    html.addEventListener('click', () => {
      if (body.classList.contains('lg-on')) {
        html.classList.add('galleryActive');
      } else {
        html.classList.remove('galleryActive');
      }
    });

    // УБИРАЕМ КЛАСС ПРИ НАЖАТИЕ НА "ESC"
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') html.classList.remove('galleryActive');
    });
  };
  addIndentation();

  // HOVER НА КНОПКАХ
  const hoverBtn = () => {
    const btn = document.querySelectorAll('.js-hover-btn');

    btn.forEach(element => {
      element.addEventListener('mouseenter', ev => {
        const $this = ev.currentTarget;
        const relX = ev.offsetX + 'px';
        const relY = ev.offsetY + 'px';

        $this.querySelector('.js-hover-btn__bg').style.cssText = `top: ${relY}; left: ${relX};`;
      });

      element.addEventListener('mouseleave', ev => {
        const $this = ev.currentTarget;
        const relX = ev.offsetX + 'px';
        const relY = ev.offsetY + 'px';

        $this.querySelector('.js-hover-btn__bg').style.cssText = `top: ${relY};left: ${relX};`;
      });
    });
  };
  hoverBtn();

  // МОБИЛЬНОЕ МЕНЮ
  const mobMenu = () => {
    const burgerBtn = document.getElementById('burger-toggle');
    const burgerMenu = document.getElementById('burger-menu');

    // ОТКРЫТИЕ И ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
    burgerBtn.addEventListener('click', () => {
      body.classList.toggle('menu-open');
      html.classList.toggle('menu-open');
      burgerBtn.classList.toggle('menu-toggle_active');
      burgerMenu.classList.toggle('active');
    });

    // ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ КНОПКОЙ "ESC"
    window.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') {
        body.classList.remove('menu-open');
        html.classList.remove('menu-open');
        burgerBtn.classList.remove('menu-toggle_active');
        burgerMenu.classList.remove('active');
      }
    });
  };
  mobMenu();

  // ОТКРЫТИЕ ВСПЛЫВАЮЩЕГО СПИСКА В МОБ. МЕНЮ
  const mobList = () => {
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
  mobList();

  // СТРЕЛКА ПРОКРУТКИ НА ВВЕРХ
  const scrollTop = () => {
    const btn = document.getElementById('scroll-top');
    let scrollY = 0;

    window.addEventListener(
      'scroll',
      () => {
        scrollY = window.scrollY;

        window.scrollY >= 100 ? btn.classList.add('scroll-top_active') : btn.classList.remove('scroll-top_active');
      },
      { passive: true }
    );

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };
  scrollTop();

  // СЛАЙДЕР В HERO
  const slideHero = () => {
    const swiper = new Swiper('#slider-hero', {
      speed: 600,
      parallax: true,
      lazy: true,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: '.hero-slider__btn_next',
        prevEl: '.hero-slider__btn_prev',
      },
      pagination: {
        el: '.hero-slider__pagination',
        clickable: true,
        bulletClass: 'hero-slider__pagination-item',
        bulletActiveClass: 'hero-slider__pagination-item_active',
      },
      keyboard: true,
    });
  };

  if (document.querySelector('#slider-hero')) slideHero();

  // СЛАЙДЕР В БЛОКЕ КЛИНИКА НА ГЛАВНОЙ СТРАНИЦЕ
  const slideClinic = () => {
    const swiper = new Swiper('#slider-clinic', {
      speed: 600,
      slidesPerView: 3,
      spaceBetween: 25,
      lazy: true,
      loop: true,
      navigation: {
        nextEl: '.clinic__btn_next',
        prevEl: '.clinic__btn_prev',
      },
      keyboard: true,
      breakpoints: {
        50: {
          slidesPerView: 1,
        },

        768: {
          slidesPerView: 2,
        },

        1024: {
          slidesPerView: 3,
        },

        1300: {
          slidesPerView: 3,
        },
      },
    });
  };

  if (document.querySelector('#slider-clinic')) slideClinic();

  // СЛАЙДЕР В БЛОКЕ СПЕЦИАЛИСТЫ НА ГЛАВНОЙ СТРАНИЦЕ
  const slideSpecialists = () => {
    const swiper = new Swiper('#slider-specialists', {
      speed: 600,
      slidesPerView: 1,
      spaceBetween: 70,
      centeredSlides: true,
      lazy: true,
      parallax: true,
      navigation: {
        disabledClass: 'slider-arrow__btn_disable',
        nextEl: '.specialists__btn_next',
        prevEl: '.specialists__btn_prev',
      },
      keyboard: true,
    });
  };

  if (document.querySelector('#slider-specialists')) slideSpecialists();

  // СЛАЙДЕР В БЛОКЕ СПЕЦИАЛИСТЫ НА СТРАНИЦЕ УСЛУГИ
  const slideSpecialistsService = () => {
    const swiper = new Swiper('#slider-specialists-service', {
      speed: 600,
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
      lazy: true,
      parallax: true,
      navigation: {
        disabledClass: 'slider-arrow__btn_disable',
        nextEl: '.service__slider-btn_next',
        prevEl: '.service__slider-btn_prev',
      },
      keyboard: true,
    });
  };

  if (document.querySelector('#slider-specialists-service')) slideSpecialistsService();

  // ПОДКЛЮЧЕНИЕ ВСПЛЫВАЮЩЕЙ ГАЛЕРЕИ
  $('#slider-clinic').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.clinic__slider-link',
    getCaptionFromTitleOrAlt: false,
  });

  $('.main').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.gallery__link',
    getCaptionFromTitleOrAlt: false,
  });

  $('.service').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.gallery__link',
    getCaptionFromTitleOrAlt: false,
  });

  // СКРЫТИЕ СПИСКА УСЛУГ НА ПЛАНШЕТАХ И МОБ. УСТРОЙСТВАХ
  const hiddenList = () => {
    const btn = document.getElementById('service-btn');
    const list = document.getElementById('service-list');

    list.classList.add('overflow-hidden');

    btn.addEventListener('click', el => {
      const itemTarget = el.currentTarget;

      if (list.style.maxHeight) {
        itemTarget.classList.remove('active');
        list.style.maxHeight = null;
      } else {
        list.style.maxHeight = list.scrollHeight + 'px';
        itemTarget.classList.add('active');
      }
    });
  };

  if (document.getElementById('service-btn')) {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 991) hiddenList();
    });

    if (window.innerWidth <= 991) hiddenList();
  }
});
