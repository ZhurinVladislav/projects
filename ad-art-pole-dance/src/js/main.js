document.addEventListener('DOMContentLoaded', () => {
  function overflowHTML() {
    let scrollY = 0;

    const toggleClassOverflow = () => {
      scrollY = window.scrollY;

      if (window.scrollY >= 100) {
        document.body.classList.add('overflow');
      } else {
        document.body.classList.remove('overflow');
      }
    };

    if (document.getElementById('reviews-video') || document.getElementById('coach')) {
      window.addEventListener('scroll', toggleClassOverflow, { passive: true });
    }
  }
  overflowHTML();

  // УБИРАЕМ ФОКУС ПОСЛЕ НАЖАТИЯ НА КНОПКУ ИЛИ ССЫЛКУ
  const removeFocus = () => {
    const arrBtn = document.querySelectorAll('button');
    const arrLink = document.querySelectorAll('a');

    arrBtn.forEach(el => {
      el.addEventListener('mousedown', ev => {
        ev.preventDefault();
      });
      el.addEventListener('mouseup', ev => {
        ev.preventDefault();
      });
    });

    arrLink.forEach(el => {
      el.addEventListener('mousedown', ev => {
        ev.preventDefault();
      });
      el.addEventListener('mouseup', ev => {
        ev.preventDefault();
      });
    });
  };
  removeFocus();

  //ФИКСИРОВАННАЯ ШАПКА ПРИ СКРОЛЛЕ
  const fixHeader = () => {
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
  fixHeader();

  // ОТКРЫТИЕ МЕНЮ В HEADER
  const openMenu = () => {
    const btn = document.getElementById('open-menu');
    const menu = document.getElementById('menu');

    btn.addEventListener('click', () => {
      const windowWidth = window.innerWidth;

      if (windowWidth > 991) {
        if (menu.classList.contains('active')) {
          btn.classList.remove('menu-toggle_active');
          menu.classList.remove('active');
        } else {
          btn.classList.add('menu-toggle_active');
          menu.classList.add('active');
        }

        window.addEventListener('keydown', ev => {
          if (ev.key === 'Escape') {
            menu.style.maxWidth = null;
            btn.classList.remove('menu-toggle_active');
            menu.classList.remove('active');
          }
        });
      } else {
        const burgerMenu = document.getElementById('burger-menu');
        const html = document.querySelector('html');
        const body = document.querySelector('body');

        // ОТКРЫТИЕ И ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
        btn.classList.toggle('menu-toggle_active');
        burgerMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        html.classList.toggle('menu-open');

        // ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ КНОПКОЙ "ESC"
        window.addEventListener('keydown', ev => {
          if (ev.key === 'Escape') {
            btn.classList.remove('menu-toggle_active');
            burgerMenu.classList.remove('active');
            body.classList.remove('menu-open');
            html.classList.remove('menu-open');
          }
        });
      }
    });
  };
  openMenu();

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

  // ТАБЫ НА СТРАНИЦЕ
  const tab = () => {
    const tab = document.querySelectorAll('.js-btn');
    const tabWrapper = document.querySelector('.js-btn-wrapper');
    const tabContent = document.querySelectorAll('.js-item-content');

    if (!tab || !tabWrapper) return;

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

  // СЛАЙДЕР В БЛОКЕ ВИДЕО НА ГЛАВНОЙ СТРАНИЦЕ
  const videoSlider = () => {
    if (!document.getElementById('video-slider')) return;
  };
  videoSlider();

  // ВИДЕО
  const videoPoster = () => {
    const posterArr = document.querySelectorAll('.js-poster');

    if (!posterArr) return;

    posterArr.forEach(el => {
      const parent = el.parentNode;
      const poster = parent.querySelector('.poster-wrapper');
      const btnStart = parent.querySelector('.js-btn-start');
      const preloader = parent.querySelector('.js-preloader');
      const video = parent.querySelector('iframe');
      let loadIframe = false;

      video.addEventListener('load', () => {
        loadIframe = true;
        poster.classList.add('active');
        preloader.classList.remove('active');
        btnStart.classList.add('active');
      });

      el.addEventListener('click', () => {
        if (!loadIframe) return;
        video.src = video.src + '&js_api=1';
        setTimeout(() => el.classList.add('hidden'), 400);
        const player = VK.VideoPlayer(video);
        player.play();
      });
    });
  };
  videoPoster();

  // const video = () => {
  //   const video = document.querySelectorAll('.js-video');

  //   video.forEach(el => {
  //     const parent = el.parentNode;
  //     const videoPlay = parent.querySelector('.js-btn-start');
  //     const videoPause = parent.querySelector('.js-btn-pause');
  //     const bar = parent.querySelector('.js-bar');
  //     const barLine = parent.querySelector('.js-bar-line');

  //     el.addEventListener('click', () => {
  //       if (videoPlay.classList.contains('active')) {
  //         el.play();
  //         videoPlay.classList.remove('active');
  //         videoPause.classList.add('active');
  //       } else {
  //         el.pause();
  //         videoPause.classList.remove('active');
  //         videoPlay.classList.add('active');
  //       }
  //     });

  //     videoPlay.addEventListener('click', () => {
  //       el.play();
  //       videoPlay.classList.remove('active');
  //       videoPause.classList.add('active');
  //     });

  //     videoPause.addEventListener('click', () => {
  //       el.pause();
  //       videoPause.classList.remove('active');
  //       videoPlay.classList.add('active');
  //     });

  //     el.ontimeupdate = function () {
  //       let percentage = (el.currentTime / el.duration) * 100;
  //       bar.classList.add('active');

  //       barLine.style.width = percentage + '%';
  //     };
  //   });
  // }
  // video();

  // ПОДКЛЮЧЕНИЕ ВСПЛЫВАЮЩЕЙ ГАЛЕРЕИ
  $('#gallery').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.gallery__link',
    getCaptionFromTitleOrAlt: false,
  });

  $('.main').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.gallery__link',
    getCaptionFromTitleOrAlt: false,
  });
});
