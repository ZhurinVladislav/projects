document.addEventListener('DOMContentLoaded', () => {
  // ДОБАВЛЕНИЕ КЛАССА ДЛЯ HTML
  const addOverflowClass = () => {
    if (!document.getElementById('menu-list')) return;

    document.querySelector('html').classList.add('overflow');
    document.querySelector('body').classList.add('overflow');
  };
  addOverflowClass();

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

  //ФИКСИРОВАННАЯ ШАПКА ПРИ СКРОЛЛЕ
  const fixHeader = () => {
    const main = document.getElementById('main').classList;
    const header = document.getElementById('header').classList;
    const activeClass = 'header_active';
    const activeClassMain = 'main_active';

    window.addEventListener('scroll', () => {
      if (scrollY > 20) {
        header.add(activeClass);
        main.add(activeClassMain);
      } else {
        header.remove(activeClass);
        main.remove(activeClassMain);
      }
    });
  };
  fixHeader();

  // СПИСОК ПЕРЕКЛЮЧЕНИЯ ГОРОДОВ
  const toggleSite = () => {
    const toggleSiteWrapper = document.querySelectorAll('.js-site-wrapper');

    if (!toggleSiteWrapper) return;

    toggleSiteWrapper.forEach(el => {
      const btn = el.querySelector('.js-btn-site-toggle');
      const list = el.querySelector('.js-list-site');

      btn.addEventListener('click', () => {
        if (list.style.maxHeight) {
          list.style.maxHeight = null;
          btn.classList.remove('active');
        } else {
          list.style.maxHeight = list.scrollHeight + 'px';
          btn.classList.add('active');
        }
      });

      window.addEventListener('keydown', ev => {
        if (ev.key === 'Escape') {
          if (list.style.maxHeight) {
            list.style.maxHeight = null;
            btn.classList.remove('active');
          }
        }
      });
    });
  };
  toggleSite();

  // ДОБАВЛЕНИЕ ОТСТУПА СПРАВА ПРИ ОТКРЫТИЕ ГАЛЕРИИ
  const addIndent = () => {
    const html = document.querySelector('html');
    const body = window.document.body;

    html.addEventListener('click', () => {
      body.classList.contains('lg-on') ? html.classList.add('galleryActive') : html.classList.remove('galleryActive');
    });

    // УБИРАЕМ КЛАСС ПРИ НАЖАТИЕ НА "ESC"
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') html.classList.remove('galleryActive');
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
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
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
    const btnOpenMenu = document.querySelectorAll('.item__btn');
    const listInner = document.querySelectorAll('.parent .list');

    listInner.forEach(el => el.classList.add('overflow-hidden'));
    listInner.forEach(el => (el.style.display = 'none'));

    btnOpenMenu.forEach(el => {
      el.addEventListener('click', ev => {
        const list = el.nextElementSibling;
        const btn = ev.currentTarget;

        if (!list.classList.contains('overflow-hidden')) {
          btn.classList.remove('active');
          list.classList.add('overflow-hidden');
          list.style.display = 'none';
        } else {
          btn.classList.add('active');
          list.classList.remove('overflow-hidden');
          list.style.display = 'flex';
        }
      });
    });

    for (let i = 0; i < listInner.length; i++) {
      const el = listInner[i];
      const arrChildList = Array.from(el.children);

      for (let i = 0; i < arrChildList.length; i++) {
        const el = arrChildList[i];

        if (el.classList.contains('active')) {
          const parentList = el.parentNode.parentNode;
          const parentItem = el.parentNode;
          const elBtn = el.querySelector('.item__btn');
          const eList = el.querySelector('.list');

          parentList.querySelector('.item__btn').classList.add('active');
          parentItem.classList.remove('overflow-hidden');
          parentItem.style.display = 'flex';
          elBtn.classList.add('active');
          eList.classList.remove('overflow-hidden');
          eList.style.display = 'flex';
        }
      }
    }
  };
  mobMenuList();

  // МЕНЮ НА СТРАНИЦЕ С КАРТОЧКАМИ
  const menuList = () => {
    const ac = Array.from(document.querySelectorAll('.js-ac'));
    const acBtn = Array.from(document.querySelectorAll('.js-ac-btn'));
    const acText = Array.from(document.querySelectorAll('.js-ac-content'));
    const listInner = Array.from(document.querySelectorAll('.menu-page__list-item'));
    const acParentList = Array.from(document.querySelectorAll('.level-1'));

    if (!ac) return;

    acText.forEach(el => el.classList.add('ac-hidden'));

    const removeClass = (item, list, className) => {
      list.classList.toggle(className);

      item.classList.contains('js-active') ? item.classList.remove('js-active') : item.classList.add('js-active');
    };

    acParentList.forEach(el => {
      const linkWrapper = el.querySelector('.js-link-wrapper');
      const btn = linkWrapper.querySelector('.js-ac-btn');

      btn.addEventListener('click', ev => {
        const list = ev.currentTarget.parentNode.nextElementSibling;
        const item = ev.currentTarget.parentNode.parentNode;

        removeClass(item, list, 'ac-hidden');
      });

      linkWrapper.addEventListener('click', ev => {
        const list = ev.currentTarget.nextElementSibling;
        const item = ev.currentTarget.parentNode;

        removeClass(item, list, 'ac-hidden');
      });
    });

    acBtn.forEach(el => {
      el.addEventListener('click', ev => {
        const list = ev.currentTarget.parentNode.nextElementSibling;
        const item = ev.currentTarget.parentNode.parentNode;

        removeClass(item, list, 'ac-hidden');
      });
    });

    if (window.innerWidth >= 991) {
      for (let i = 0; i < listInner.length; i++) {
        const el = listInner[i];

        if (el.classList.contains('parent') && el.classList.contains('active')) {
          el.classList.add('js-active');
          el.querySelector('.js-ac-content').classList.remove('ac-hidden');
        }
      }
    }
  };

  menuList();

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
    if (!document.querySelector('#slider-hero')) return;

    const swiper = new Swiper('#slider-hero', {
      speed: 600,
      parallax: true,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: '.js-slider-btn-next',
        prevEl: '.js-slider-btn-prev',
      },
      pagination: {
        el: '.js-pagination',
        type: 'fraction',
      },
      keyboard: true,
    });
  };

  slideHero();

  const gallerySlider = () => {
    if (!document.getElementById('gallery-slider')) return;

    const swiper = new Swiper('#gallery-slider', {
      spaceBetween: 20,
      slidesPerView: 1,
      onlyExternal: false,
      speed: 500,
      navigation: {
        disabledClass: 'slider-navigation__btn_disable',
        nextEl: '#gallery-btn-next',
        prevEl: '#gallery-btn-prev',
      },
      pagination: {
        el: '#gallery-pagination',
        type: 'fraction',
      },
    });
  };

  gallerySlider();

  // ПОДКЛЮЧЕНИЕ ВСПЛЫВАЮЩЕЙ ГАЛЕРЕИ
  $('.gallery').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.gallery__link',
    getCaptionFromTitleOrAlt: false,
  });

  $('.certificates').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.certificates__list-item-link',
    getCaptionFromTitleOrAlt: false,
  });

  $('#otkatnye-vorota').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.link-otkatnye-vorota',
    getCaptionFromTitleOrAlt: false,
  });

  // СПИСОК СЛАЙДЕРОВ НА СТРАНИЦЕ ПРОЕКТОВ В РАЗДЕЛЕ ПОРТФОЛИО
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
    const wrapperSliders = document.getElementById('projects');
    if (!wrapperSliders) return;
    const navWrapper = Array.from(wrapperSliders.querySelectorAll('.js-navigation'));

    for (let i = 0; i < navWrapper.length; i++) {
      const el = navWrapper[i];
      el.querySelector('.js-pagination').classList.add(`pagination-${i}`);
      el.querySelector('.js-btn-prev').classList.add(`p-${i}`);
      el.querySelector('.js-btn-next').classList.add(`n-${i}`);
    }

    const buildSwiperSlider = (index, sliderElm) => {
      $(`#${sliderElm.id}`).lightGallery({
        thumbnail: false,
        share: false,
        selector: '.slider__slide-link',
        getCaptionFromTitleOrAlt: false,
      });

      return new Swiper(`#${sliderElm.id}`, {
        spaceBetween: 20,
        slidesPerView: 1,
        onlyExternal: false,
        preloadImages: true,
        lazy: true,
        lazyPreloadPrevNext: 1,
        speed: 500,
        navigation: {
          nextEl: `.n-${index}`,
          prevEl: `.p-${index}`,
        },
        pagination: {
          el: `.pagination-${index}`,
          type: 'fraction',
        },
      });
    };

    const allSliders = document.querySelectorAll('.js-slider');

    allSliders.forEach((slider, index) => buildSwiperSlider(index, slider));
  };

  slidersProject();

  // ТАБЫ НА СТРАНИЦЕ ИНФОРМАЦИЯ
  const tab = () => {
    const tab = document.querySelectorAll('.js-btn');
    const tabWrapper = document.querySelector('.js-btn-wrapper');
    const tabContent = document.querySelectorAll('.js-item-content');

    if (!tab) return;
    if (!tabWrapper) return;

    function hideTabContent(a) {
      for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
      }
    }

    hideTabContent(1);

    // ДОБАВЛЕНИЕ ПЕРВЫМ ЭЛЕМЕНТАМ КЛАССЫ ACTIVE И SHOW
    function addActiveItem() {
      for (let i = 0; i < tab.length; i++) {
        const e = tab[i];

        if (i === 0) e.classList.add('active');
      }
      for (let i = 0; i < tabContent.length; i++) {
        const e = tabContent[i];

        if (i === 0) e.classList.add('show');
      }
    }

    addActiveItem();

    function showTabContent(b) {
      if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
      }
    }

    tabWrapper.addEventListener('click', ev => {
      const target = ev.target;

      if (target && target.classList.contains('js-btn')) {
        for (let i = 0; i < tab.length; i++) {
          if (target == tab[i]) {
            for (let a = 0; a < tab.length; a++) {
              tab[a].classList.remove('active');
            }
            tab[i].classList.add('active');
            hideTabContent(0);
            showTabContent(i);
            break;
          }
        }
      }
    });
  };

  tab();
});
