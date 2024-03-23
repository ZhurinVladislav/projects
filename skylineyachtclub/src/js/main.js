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

  // СМЕНА ЦВЕТА ПРИ СКРОЛЛЕ В БЛОКЕ СОЦ. СЕТЕЙ
  const scrollColor = () => {
    const wrapper = document.getElementById('social-panel');
    const heroHomePage = document.getElementById('home-hero');
    let scrollY = 0;

    if (!wrapper) return;

    if (!heroHomePage) {
      wrapper.classList.add('js-scroll-active');
      return;
    }

    window.addEventListener(
      'scroll',
      () => {
        scrollY = window.scrollY;

        window.scrollY >= 400 ? wrapper.classList.add('js-scroll-active') : wrapper.classList.remove('js-scroll-active');
      },
      { passive: true }
    );
  };

  scrollColor();

  // ДОПОЛНИТЕЛЬНЫЙ ТЕКСТ В БЛОКЕ "ABOUT"
  const textHidden = () => {
    const text = document.getElementById('about-text');
    const btn = document.getElementById('about-btn');

    if (!text) return;

    btn.addEventListener('click', ev => {
      const el = ev.currentTarget;

      if (text.style.maxHeight) {
        text.style.maxHeight = null;
        el.classList.remove('active');
      } else {
        text.style.maxHeight = text.scrollHeight + 'px';
        el.classList.add('active');
      }

      if (el.classList.contains('active')) {
        el.querySelector('.button-invert__text').textContent = `Свернуть текст`;
      } else {
        el.querySelector('.button-invert__text').textContent = `Читать больше`;
      }
    });
  };

  textHidden();

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

  // СЛАЙДЕР НА СТРАНИЦЕ ЯХТЫ
  const yachtSlider = () => {
    if (!document.getElementById('yacht-slider')) return;

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

  yachtSlider();

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

  // ПОДКЛЮЧЕНИЕ ВСПЛЫВАЮЩЕЙ ГАЛЕРЕИ
  $('.gallery').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.gallery__link',
    getCaptionFromTitleOrAlt: false,
  });

  $('#yacht-slider').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.slider-top__slide',
    getCaptionFromTitleOrAlt: false,
  });
});
