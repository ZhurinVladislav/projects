document.addEventListener('DOMContentLoaded', () => {
  // УБИРАЕМ ФОКУС ПОСЛЕ НАЖАТИЯ НА КНОПКУ ИЛИ ССЫЛКУ
  const removeFocus = () => {
    const arrBtn = document.querySelectorAll('button');
    const arrLink = document.querySelectorAll('a');

    arrBtn.forEach(ev => {
      ev.addEventListener('mousedown', el => el.preventDefault());
      ev.addEventListener('mouseup', el => el.preventDefault());
    });

    arrLink.forEach(ev => {
      ev.addEventListener('mousedown', el => el.preventDefault());
      ev.addEventListener('mouseup', el => el.preventDefault());
    });
  };

  removeFocus();

  const overflowHTML = () => {
    if (window.innerWidth >= 991) {
      let scrollY = 0;

      const toggleClassOverflow = () => {
        scrollY = window.scrollY;

        window.scrollY >= 100 ? document.body.classList.add('overflow') : document.body.classList.remove('overflow');
      };

      if (document.getElementById('menu-inner')) {
        window.addEventListener('scroll', toggleClassOverflow, { passive: true });
      }
    }
  };

  overflowHTML();

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

  // СКРОЛЛ В БЛОКЕ HERO
  const scrollHero = () => {
    const btn = document.getElementById('hero-btn');

    if (!document.getElementById('hero-btn')) return;

    btn.addEventListener('click', () => {
      if (window.scrollY <= 100) window.scrollTo({ top: 100, behavior: 'smooth' });
    });
  };

  scrollHero();

  // УБИРАЕМ КНОПКУ ПРИ СКРОЛЛЕ В БЛОКЕ HERO
  const scrollHiddenBtnHero = () => {
    const wrapper = document.getElementById('hero-btn');
    const heroHomePage = document.getElementById('home-hero');
    let scrollY = window.scrollY;

    if (!wrapper) return;

    if (!heroHomePage) {
      wrapper.classList.add('js-scroll-active');
      return;
    }

    if (scrollY === 0) {
      wrapper.classList.add('js-scroll-active');
      wrapper.classList.remove('js-scroll-hidden');
    } else {
      wrapper.classList.remove('js-scroll-active');
      wrapper.classList.add('js-scroll-hidden');
    }

    window.addEventListener(
      'scroll',
      () => {
        scrollY = window.scrollY;

        if (scrollY >= 10) {
          wrapper.classList.remove('js-scroll-active');
          wrapper.classList.add('js-scroll-hidden');
        } else {
          wrapper.classList.add('js-scroll-active');
          wrapper.classList.remove('js-scroll-hidden');
        }
      },
      { passive: true }
    );
  };

  scrollHiddenBtnHero();

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

  // ЧИСЛОВОЕ ПОЛЕ
  const inputsCount = () => {
    const arrBtnMinus = Array.from(document.querySelectorAll('.js-btn-minus'));
    const arrBtnPlus = Array.from(document.querySelectorAll('.js-btn-plus'));
    const arrInputs = Array.from(document.querySelectorAll('.js-input-count'));
    const arrBtn = [...arrBtnPlus, ...arrBtnMinus];

    if (arrBtn.length === 0) return;

    const MIN_VALUE = arrInputs[0].getAttribute('min');
    const MAX_VALUE = arrInputs[0].getAttribute('max');

    arrInputs.forEach(el => {
      const parent = el.parentNode;
      let inputValueInt = parseInt(el.value);
      const btnMinus = parent.querySelector('.js-btn-minus');
      const btnPlus = parent.querySelector('.js-btn-plus');

      if (inputValueInt >= MAX_VALUE) btnPlus.disabled = true;

      if (inputValueInt <= MIN_VALUE) btnMinus.disabled = true;

      el.addEventListener('blur', ev => {
        const input = ev.currentTarget;

        inputValueInt = parseInt(input.value);

        if (inputValueInt <= MIN_VALUE) {
          input.setAttribute('value', `${MIN_VALUE}`);
          input.value = MIN_VALUE;
          btnPlus.disabled = false;
          btnMinus.disabled = true;
        } else if (inputValueInt >= MAX_VALUE) {
          input.setAttribute('value', `${MAX_VALUE}`);
          input.value = MAX_VALUE;
          btnPlus.disabled = true;
          btnMinus.disabled = false;
        } else return;
      });
    });

    arrBtn.forEach(el => {
      el.addEventListener('click', ev => {
        const btn = ev.currentTarget;
        const parent = btn.parentNode;
        const input = parent.querySelector('.js-input-count');
        const inputValue = parseInt(input.value);
        const btnMinus = parent.querySelector('.js-btn-minus');
        const btnPlus = parent.querySelector('.js-btn-plus');

        if (btn.classList.contains('js-btn-plus')) {
          if (input.value <= MAX_VALUE) {
            input.setAttribute('value', `${inputValue + 1}`);
            input.value = inputValue + 1;
            $('.js-input-count').change();
          }

          if (input.value >= MAX_VALUE) btn.disabled = true;

          if (input.value >= MIN_VALUE) btnMinus.disabled = false;
        }

        if (btn.classList.contains('js-btn-minus')) {
          if (input.value >= MIN_VALUE && input.value <= MAX_VALUE) {
            input.setAttribute('value', `${inputValue - 1}`);
            input.value = inputValue - 1;
            $('.js-input-count').change();
          }

          if (input.value <= MIN_VALUE) btn.disabled = true;

          if (input.value <= MAX_VALUE) btnPlus.disabled = false;
        }
      });
    });
  };

  inputsCount();

  // СЛАЙДЕР В БЛОКЕ "О НАС" НА ГЛАВНОЙ СТРАНИЦЕ
  const aboutSlider = () => {
    if (!document.getElementById('about-slider')) return;

    const swiper = new Swiper('#about-slider', {
      spaceBetween: 20,
      loop: true,
      onlyExternal: false,
      speed: 500,
      navigation: {
        disabledClass: 'arrow_disable',
        nextEl: '#about-btn-next',
        prevEl: '#about-btn-prev',
      },
      breakpoints: {
        60: {
          slidesPerView: 1,
        },

        992: {
          slidesPerView: 2,
        },

        1276: {
          slidesPerView: 2,
        },
      },
    });
  };

  aboutSlider();

  // СЛАЙДЕР В БЛОКЕ "БОЛЬШЕ БЛЮД" НА СТРАНИЦЕ БЛЮДА
  const dishesSlider = () => {
    if (!document.getElementById('dishes-slider')) return;

    const swiper = new Swiper('#dishes-slider', {
      spaceBetween: 20,
      loop: true,
      onlyExternal: false,
      speed: 500,
      navigation: {
        disabledClass: 'arrow_disable',
        nextEl: '#dishes-btn-next',
        prevEl: '#dishes-btn-prev',
      },
      breakpoints: {
        720: {
          slidesPerView: 2,
        },

        960: {
          slidesPerView: 3,
        },

        1276: {
          slidesPerView: 4,
        },
      },
    });
  };

  dishesSlider();

  // ПОДКЛЮЧЕНИЕ ВСПЛЫВАЮЩЕЙ ГАЛЕРЕИ
  $('.gallery').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.gallery__link',
    getCaptionFromTitleOrAlt: false,
  });

  $('#about-slider').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.slider__slide-link',
    getCaptionFromTitleOrAlt: false,
  });

  $('#list-img').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.list-img__item-link',
    getCaptionFromTitleOrAlt: false,
  });
});
