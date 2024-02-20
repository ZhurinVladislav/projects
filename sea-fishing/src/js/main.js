document.addEventListener('DOMContentLoaded', () => {
  // УБИРАЕМ ФОКУС ПОСЛЕ НАЖАТИЯ НА КНОПКУ ИЛИ ССЫЛКУ
  const removeFocus = () => {
    const arrBtn = document.querySelectorAll('button');
    const arrLink = document.querySelectorAll('a');

    arrBtn.forEach(ev => {
      ev.addEventListener('mousedown', el => {
        el.preventDefault();
      });
      ev.addEventListener('mouseup', el => {
        el.preventDefault();
      });
    });

    arrLink.forEach(ev => {
      ev.addEventListener('mousedown', el => {
        el.preventDefault();
      });
      ev.addEventListener('mouseup', el => {
        el.preventDefault();
      });
    });
  };

  removeFocus();

  // ДОБАВЛЕНИЕ ОТСТУПА СПРАВА ПРИ ОТКРЫТИЕ ГАЛЕРИИ
  const addIndent = () => {
    const html = document.querySelector('html');
    const body = window.document.body;

    html.addEventListener('click', () => {
      body.classList.contains('lg-on') ? html.classList.add('galleryActive') : html.classList.remove('galleryActive');
    });

    // УБИРАЕМ КЛАСС ПРИ НАЖАТИЕ НА "ESC"
    window.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') html.classList.remove('galleryActive');
    });
  };

  addIndent();

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

  const scrollHero = () => {
    const btn = document.getElementById('btn-hero');

    btn.addEventListener('click', () => {
      if (window.scrollY <= 100) {
        window.scrollTo({ top: 100, behavior: 'smooth' });
      }
    });
  };

  if (document.getElementById('btn-hero')) scrollHero();

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

  // СЛАЙДЕР В БЛОКЕ РЫБА НА ГЛАВНОЙ СТРАНИЦЕ
  const fishSlider = () => {
    const swiper = new Swiper('#fish-slider', {
      spaceBetween: 20,
      slidesPerView: 1,
      loop: false,
      onlyExternal: false,
      speed: 500,
      navigation: {
        disabledClass: 'arrow_disable',
        nextEl: '#fish-btn-next',
        prevEl: '#fish-btn-prev',
      },
    });
  };

  if (document.getElementById('fish-slider')) fishSlider();

  // СЛАЙДЕР В БЛОКЕ ФЛОТ НА ГЛАВНОЙ СТРАНИЦЕ
  const fleetSlider = () => {
    const swiper = new Swiper('#fleet-slider', {
      spaceBetween: 20,
      slidesPerView: 1,
      loop: false,
      onlyExternal: false,
      speed: 500,
      navigation: {
        disabledClass: 'arrow_disable',
        nextEl: '#fleet-btn-next',
        prevEl: '#fleet-btn-prev',
      },
    });
  };

  if (document.getElementById('fleet-slider')) fleetSlider();

  const yachtSlider = () => {
    const swiper = new Swiper('.slider-bottom', {
      spaceBetween: 10,
      speed: 700,
      watchSlidesProgress: true,
      breakpoints: {
        60: {
          slidesPerView: 3,
        },

        768: {
          slidesPerView: 3,
        },

        1200: {
          slidesPerView: 4,
        },
      },
    });

    const swiper2 = new Swiper('.slider-top', {
      spaceBetween: 10,
      speed: 700,
      navigation: {
        nextEl: '.arrow_next',
        prevEl: '.arrow_prev',
      },
      thumbs: {
        swiper: swiper,
      },
    });
  };

  if (document.getElementById('yacht-slider')) yachtSlider();

  // ПОДКЛЮЧЕНИЕ ВСПЛЫВАЮЩЕЙ ГАЛЕРЕИ
  $('.gallery').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.gallery__link',
    getCaptionFromTitleOrAlt: false,
  });

  $('.yacht-slider').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.slider-top__slide',
    getCaptionFromTitleOrAlt: false,
  });
});
