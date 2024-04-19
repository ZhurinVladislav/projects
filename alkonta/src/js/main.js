document.addEventListener('DOMContentLoaded', () => {
  // ДОБАВЛЕНИЕ КЛАССА ДЛЯ HTML
  const addOverflowClass = () => {
    if (!document.getElementById('card-internal')) return;

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

  // АНИМАЦИЯ С ЧИСЛАМИ В HERO
  const numberAnimate = () => {
    if (!document.querySelector('.js-number')) return;

    // const zeroValues = () => {
    //   const stat = document.getElementsByClassName('js-number');
    //   for (let i = 0; i < stat.length; i++) {
    //     stat[i].innerHTML = 0;
    //   }
    // };
    // zeroValues();

    const numScroll = () => {
      const animationDuration = 3000;
      // const animationDuration = 1000;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(animationDuration / frameDuration);
      const easeOutQuad = t => t * (2 - t);

      const animateCountUp = el => {
        let frame = 0;
        const countTo = parseInt(el.dataset.target.replace(/,/g, ''), 10);

        const counter = setInterval(() => {
          frame++;
          const progress = easeOutQuad(frame / totalFrames);
          const currentCount = Math.round(countTo * progress);

          if (parseInt(el.innerHTML, 10) !== currentCount) {
            el.innerHTML = currentCount;
          }

          if (frame === totalFrames) {
            clearInterval(counter);
            el.innerHTML = el.dataset.target;
          }
        }, frameDuration);
      };

      const numbersWrapper = document.querySelectorAll('.js-number-wrapper');

      numbersWrapper.forEach(el => {
        el.setAttribute('position', `${el.offsetTop}`);
        el.setAttribute('animate', false);
      });

      const startAnimate = el => {
        el.setAttribute('animate', true);
        el.querySelectorAll('.js-number').forEach(animateCountUp);
      };

      window.addEventListener('scroll', () => {
        let scrollY = 0;

        numbersWrapper.forEach(el => {
          const position = parseInt(el.getAttribute('position')) - document.documentElement.clientWidth / 3;
          const animate = el.getAttribute('animate');

          scrollY = window.scrollY;

          if (position <= scrollY && animate === 'false') startAnimate(el);
          return;
        });
      });

      for (let i = 0; i < 1; i++) {
        const el = numbersWrapper[i];
        const position = parseInt(el.getAttribute('position'));

        if (position <= 0) startAnimate(el);
      }
    };
    // zeroValues();

    window.addEventListener('load', () => {
      numScroll();
    });
  };

  numberAnimate();

  // HOVER В БЛОКЕ УСЛУГИ
  const hoverServices = () => {
    const arrLinks = document.querySelectorAll('.js-service-link');
    const arrImg = document.querySelectorAll('.js-service-img');

    if (!arrLinks) return;

    for (let i = 0; i < arrLinks.length; i++) {
      const el = arrLinks[i];

      el.setAttribute('data-hover-link', `${i}`);
    }

    for (let i = 0; i < arrImg.length; i++) {
      const el = arrImg[i];

      arrImg[0].classList.add('active');

      el.setAttribute('data-hover-img', `${i}`);
    }

    arrLinks.forEach(el => {
      el.addEventListener('mouseover', () => {
        const attr = el.getAttribute('data-hover-link');

        for (let i = 0; i < arrImg.length; i++) {
          arrImg[i].classList.remove('active');
        }

        document.querySelector(`[data-hover-img="${attr}"]`).classList.add('active');
      });

      el.addEventListener('mouseout', () => {
        const attr = el.getAttribute('data-hover-link');
        document.querySelector(`[data-hover-img="${attr}"]`).classList.add('active');
      });
    });
  };

  hoverServices();

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
    const parentItem = document.querySelectorAll('.item__btn');
    const listInner = document.querySelectorAll('.parent .list');

    listInner.forEach(el => {
      el.classList.add('overflow-hidden');
    });

    for (let i = 0; i < listInner.length; i++) {
      const el = listInner[i];
      const elChild = el.children;

      for (let i = 0; i < elChild.length; i++) {
        const parent = elChild[i].parentNode;
        const arrow = parent.previousElementSibling;

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

  // СЛАЙДЕР В БЛОКЕ УСЛУГИ НА ГЛАВНОЙ СТРАНИЦЕ
  const servicesSlider = () => {
    if (!document.getElementById('services')) return;

    new Swiper('#services-slider', {
      cssMode: true,
      spaceBetween: 10,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      breakpoints: {
        60: {
          slidesPerView: 1,
          grid: {
            rows: 1,
          },
        },
        521: {
          slidesPerView: 2,
          grid: {
            rows: 1,
          },
        },
        767: {
          slidesPerView: 3,
          grid: {
            rows: 1,
          },
        },
        992: {
          slidesPerView: 4,
          grid: {
            rows: 2,
          },
        },
      },
    });
  };
  servicesSlider();

  // ПОДКЛЮЧЕНИЕ ВСПЛЫВАЮЩЕЙ ГАЛЕРЕИ
  $('.gallery').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.gallery__link',
    getCaptionFromTitleOrAlt: false,
  });

  $('#news-img-list').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.img-list__link',
    getCaptionFromTitleOrAlt: false,
  });
});
