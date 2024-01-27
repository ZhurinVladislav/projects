document.addEventListener('DOMContentLoaded', () => {
  // ДОБАВЛЕНИЕ КЛАССА ДЛЯ HTML
  if (document.getElementById('service')) {
    document.querySelector('html').classList.add('overflow');
    document.querySelector('body').classList.add('overflow');
  }

  // УБИРАЕМ ФОКУС ПОСЛЕ НАЖАТИЯ НА КНОПКУ ИЛИ ССЫЛКУ
  (() => {
    const arrBtn = document.querySelectorAll('button'),
      arrLink = document.querySelectorAll('a');

    arrBtn.forEach(e => {
      e.addEventListener('mousedown', el => {
        el.preventDefault();
      });
      e.addEventListener('mouseup', el => {
        el.preventDefault();
      });
    });

    arrLink.forEach(e => {
      e.addEventListener('mousedown', el => {
        el.preventDefault();
      });
      e.addEventListener('mouseup', el => {
        el.preventDefault();
      });
    });
  })();

  // ОТКРЫТИЕ МЕНЮ В HEADER
  function openMenu() {
    const btn = document.getElementById('open-menu');
    const menu = document.getElementById('menu');
    btn.addEventListener('click', () => {
      if (menu.style.maxWidth) {
        menu.style.maxWidth = null;
        // acText.forEach(element => (element.style.maxHeight = null));
        btn.classList.remove('menu-toggle_active');
        menu.classList.remove('active');
      } else {
        // element.style.maxHeight = null;
        // element.previousElementSibling.classList.remove('ac-active')
        // acText.forEach(element => {
        //   element.style.maxHeight = null;
        //   element.previousElementSibling.classList.remove('ac-active')
        // });
        menu.style.maxWidth = menu.scrollWidth + 'px';
        btn.classList.add('menu-toggle_active');
        menu.classList.add('active');
      }
    });
  }

  openMenu();
  // openMenu()

  //ФИКСИРОВАННАЯ ШАПКА ПРИ СКРОЛЛЕ
  // (() => {
  //   const main = document.getElementById('main').classList;

  //   let header = document.getElementById('header').classList,
  //     active_class = 'header_active',
  //     active_class_main = 'main_active';

  //   window.addEventListener('scroll', () => {
  //     if (scrollY > 20) {
  //       header.add(active_class);
  //       main.add(active_class_main);
  //     } else {
  //       header.remove(active_class);
  //       main.remove(active_class_main);
  //     }
  //   });
  // })();

  // ДОБАВЛЕНИЕ ОТСТУПА СПРАВА ПРИ ОТКРЫТИЕ ГАЛЕРИИ
  (() => {
    let html = document.querySelector('html'),
      body = document.querySelector('body');

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
  })();

  // HOVER НА КНОПКАХ
  (() => {
    const btn = document.querySelectorAll('.js-hover-btn');

    btn.forEach(element => {
      element.addEventListener('mouseenter', e => {
        let $this = e.currentTarget,
          relX = e.offsetX + 'px',
          relY = e.offsetY + 'px';

        $this.querySelector('.js-hover-btn__bg').style.cssText = `top: ${relY}; left: ${relX};`;
      });

      element.addEventListener('mouseleave', e => {
        let $this = e.currentTarget,
          relX = e.offsetX + 'px',
          relY = e.offsetY + 'px';

        $this.querySelector('.js-hover-btn__bg').style.cssText = `top: ${relY};left: ${relX};`;
      });
    });
  })();

  // МОБИЛЬНОЕ МЕНЮ
  (() => {
    const burgerBtn = document.getElementById('burger-toggle'),
      burgerMenu = document.getElementById('burger-menu'),
      html = document.querySelector('html'),
      body = document.querySelector('body');

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
  })();

  // ОТКРЫТИЕ ВСПЛЫВАЮЩЕГО СПИСКА В МОБ. МЕНЮ
  (() => {
    const parentItem = document.querySelectorAll('.item__btn'),
      listInner = document.querySelectorAll('.parent .list');

    let arrLength;

    listInner.forEach(e => {
      e.classList.add('overflow-hidden');
    });

    for (let i = 0; i < listInner.length; i++) {
      const el = listInner[i],
        elChild = el.children;

      for (let i = 0; i < elChild.length; i++) {
        let parent = elChild[i].parentNode;
        const arrow = parent.previousElementSibling;

        arrLength = elChild.length;

        if (elChild[i].classList.contains('active')) {
          document.querySelectorAll('.list').forEach(e => (e.style.maxHeight = null));
          parent.style.maxHeight = 'max-content';

          arrow.classList.add('active');
        }
      }
    }

    parentItem.forEach(e => {
      e.addEventListener('click', () => {
        const acContent = e.nextElementSibling;

        if (acContent.style.maxHeight) {
          document.querySelectorAll('.menu__list .list').forEach(e => {
            e.style.maxHeight = null;
          });
          e.classList.remove('active');
        } else {
          document.querySelectorAll('.menu__list .list').forEach(e => {
            e.style.maxHeight = null;
            console.log(e.previousElementSibling.classList);
            e.previousElementSibling.classList.remove('active');
          });
          acContent.style.maxHeight = acContent.scrollHeight + 'px';
          e.classList.add('active');
        }
      });
    });
  })();

  // СТРЕЛКА ПРОКРУТКИ НА ВВЕРХ
  (() => {
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
  })();

  // СЛАЙДЕР В HERO
  function slideHero() {
    const swiper = new Swiper('#slider-hero', {
      speed: 600,
      parallax: true,
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
  }

  if (document.querySelector('#slider-hero')) {
    slideHero();
  }

  // СЛАЙДЕР В БЛОКЕ КЛИНИКА НА ГЛАВНОЙ СТРАНИЦЕ
  function slideClinic() {
    const swiper = new Swiper('#slider-clinic', {
      speed: 600,
      slidesPerView: 3,
      spaceBetween: 25,
      loop: true,
      // rewind: true,
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
  }

  if (document.querySelector('#slider-clinic')) {
    slideClinic();
  }

  // СЛАЙДЕР В БЛОКЕ СПЕЦИАЛИСТЫ НА ГЛАВНОЙ СТРАНИЦЕ
  function slideSpecialists() {
    const swiper = new Swiper('#slider-specialists', {
      speed: 600,
      slidesPerView: 1,
      spaceBetween: 70,
      centeredSlides: true,
      parallax: true,
      navigation: {
        disabledClass: 'slider-arrow__btn_disable',
        nextEl: '.specialists__btn_next',
        prevEl: '.specialists__btn_prev',
      },
      keyboard: true,
    });
  }

  if (document.querySelector('#slider-specialists')) {
    slideSpecialists();
  }

  // СЛАЙДЕР В БЛОКЕ СПЕЦИАЛИСТЫ НА СТРАНИЦЕ УСЛУГИ
  function slideSpecialistsService() {
    const swiper = new Swiper('#slider-specialists-service', {
      speed: 600,
      slidesPerView: 1,
      spaceBetween: 20,
      // loop: true,
      centeredSlides: true,
      parallax: true,
      navigation: {
        disabledClass: 'slider-arrow__btn_disable',
        nextEl: '.service__slider-btn_next',
        prevEl: '.service__slider-btn_prev',
      },
      keyboard: true,
    });
  }

  if (document.querySelector('#slider-specialists-service')) {
    slideSpecialistsService();
  }

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
  function hiddenList() {
    const btn = document.getElementById('service-btn'),
      list = document.getElementById('service-list');

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
  }

  if (document.getElementById('service-btn')) {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 991) {
        hiddenList();
      }
    });

    if (window.innerWidth <= 991) {
      hiddenList();
    }
  }

  // АНИМАЦИЯ
  // gsap.registerPlugin(ScrollTrigger, SmoothScroll)

  // if (ScrollTrigger.isTouch !== 1) {
  //   SmoothScroll({
  //       // Время скролла 400 = 0.4 секунды
  //       animationTime    : 800,
  //       // Размер шага в пикселях
  //       stepSize         : 50,

  //       // Дополнительные настройки:
  //       // Ускорение
  //       accelerationDelta : 30,
  //       // Максимальное ускорение
  //       accelerationMax   : 2,

  //       // Поддержка клавиатуры
  //       keyboardSupport   : true,
  //       // Шаг скролла стрелками на клавиатуре в пикселях
  //       arrowScroll       : 50,

  //       // Pulse (less tweakable)
  //       // ratio of "tail" to "acceleration"
  //       pulseAlgorithm   : true,
  //       pulseScale       : 4,
  //       pulseNormalize   : 1,

  //       // Поддержка тачпада
  //       touchpadSupport   : true,
  //   })
  // };
});
