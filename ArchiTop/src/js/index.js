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

  // МОБИЛЬНОЕ МЕНЮ
  class MobMenu {
    html = null;
    body = null;
    btn = null;
    menu = null;

    constructor(html, body, btn, menu) {
      this.html = html;
      this.body = body;
      this.btn = btn;
      this.menu = menu;
    }

    handleBtn = () => {
      this.btn.addEventListener('click', () => {
        this.btn.classList.contains('menu-toggle_active') ? this.close() : this.open();
      });
    };

    handleESC = () => {
      window.addEventListener('keydown', ev => {
        if (ev.key === 'Escape') this.close();
      });
    };

    open = () => {
      this.btn.classList.add('menu-toggle_active');
      this.btn.setAttribute('aria-label', 'Закрыть мобильное меню');
      this.menu.classList.add('active');
      this.body.classList.add('menu-open');
      this.html.classList.add('menu-open');
    };

    close = () => {
      this.btn.classList.remove('menu-toggle_active');
      this.btn.setAttribute('aria-label', 'Открыть мобильное меню');
      this.menu.classList.remove('active');
      this.body.classList.remove('menu-open');
      this.html.classList.remove('menu-open');
    };

    init = () => {
      if (this.mobMenuBtn !== null) {
        this.handleBtn();
        this.handleESC();
      } else return;
    };
  }

  const mobMenu = new MobMenu(html, body, mobMenuBtn, mobMenuWrap);
  mobMenu.init();

  // ТЕКСТ "БОЛЬШЕ" НА ГЛАВНОЙ СТРАНИЦЕ САЙТА
  const textMore = () => {
    const btn = document.getElementById('more-btn');
    const text = document.getElementById('more-text');

    if (!btn || !text) return;

    const btnText = btn.querySelector('.js-btn-text');

    if (!btnText) return;

    text.style.display = 'none';
    text.classList.add('overflow-hidden');

    const open = () => {
      btn.classList.add('active');
      btnText.textContent = 'Скрыть текст';
      text.style.display = 'block';
      text.classList.remove('overflow-hidden');
    };

    const close = () => {
      btn.classList.remove('active');
      btnText.textContent = 'Читать полностью';
      text.style.display = 'none';
      text.classList.add('overflow-hidden');
    };

    btn.addEventListener('click', () => {
      btn.classList.contains('active') ? close() : open();
    });
  };

  textMore();

  // ПЛАВНЫЙ СКРОЛЛ НА ЯКОРНЫХ ССЫЛКАХ
  const scrollMenuLink = () => {
    const arrLink = Array.from(document.querySelectorAll('a[href^="#"]'));

    if (!arrLink || arrLink.length === 0 || arrLink === null) return;

    arrLink.forEach(anchor => {
      anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const itemLink = document.querySelector(this.getAttribute('href'));

        if (mobMenuWrap.classList.contains('active')) mobMenu.close();

        itemLink.scrollIntoView({ behavior: 'smooth', block: 'center' }, { passive: true });
      });
    });
  };

  scrollMenuLink();

  // Табы в фильтрах
  // class FilterTabs {
  //   constructor(wrap, btns, contents) {
  //     this.wrap = wrap;
  //     this.btns = btns;
  //     this.contents = contents;
  //   }
  // }

  const filter = () => {
    const btnArr = Array.from(document.querySelectorAll('.js-filter-btn'));
    const contentArr = Array.from(document.querySelectorAll('.js-filter-content'));

    if (!btnArr || !contentArr) return;

    contentArr.forEach(el => {
      el.classList.add('hidden');
      el.style.maxHeight = `${el.scrollHeight}px`;
    });

    btnArr.forEach(el => el.classList.add('active'));

    const open = (btn, content) => {
      btn.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
    };

    const close = (btn, content) => {
      btn.classList.remove('active');
      content.style.maxHeight = null;
    };

    const handleBtn = () => {
      btnArr.forEach(el => {
        el.addEventListener('click', ev => {
          const parent = ev.currentTarget.parentElement;
          const content = parent.querySelector('.js-filter-content');

          if (el.classList.contains('active')) {
            close(el, content);
          } else {
            open(el, content);
          }
        });
      });
    };

    handleBtn();
  };

  filter();

  // СТРЕЛКА ПРОКРУТКИ НА ВВЕРХ
  const scrollTop = () => {
    const scrollToTopButton = document.getElementById('scroll-top');

    // Функция для обновления видимости кнопки и прогресса бордера
    const updateScrollButton = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;

      // Показать или скрыть кнопку в зависимости от положения скролла
      if (scrollTop > 100) {
        scrollToTopButton.classList.add('visible');
      } else {
        scrollToTopButton.classList.remove('visible');
      }

      // Вычисление прогресса бордера
      const progress = scrollTop / scrollHeight;
      const degrees = Math.round(progress * 360);
      scrollToTopButton.style.borderImage = `conic-gradient(#fff ${degrees}deg, transparent ${degrees}deg 360deg) 1`;
      scrollToTopButton.style.borderStyle = 'solid';
    };

    // Обновляем кнопку при загрузке страницы и скролле
    document.addEventListener('DOMContentLoaded', updateScrollButton);
    window.addEventListener('scroll', updateScrollButton);

    // Обработка клика по кнопке для плавного возврата наверх
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  scrollTop();

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
});
