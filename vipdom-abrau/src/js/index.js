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

  // ХОВЕР У ЭЛЕМЕНТА В СЕКЦИИ "ПРЕИМУЩЕСТВА"
  const hoverAdvantages = () => {
    const arrItems = Array.from(document.querySelectorAll('.js-hover-item'));

    if (arrItems.length === 0) return;

    for (let i = 0; i < arrItems.length; i++) {
      const el = arrItems[i];
      arrItems[0].classList.add('active');

      el.addEventListener('mouseover', function () {
        if (this !== arrItems[0]) {
          this.classList.add('active');
          arrItems[0].classList.remove('active');
        } else {
          this.classList.add('active');
        }
      });

      el.addEventListener('mouseout', function () {
        if (this !== arrItems[0]) {
          this.classList.remove('active');
          arrItems[0].classList.add('active');
        }
      });

      el.addEventListener('click', function () {
        if (this !== arrItems[0]) {
          this.classList.add('active');
          arrItems[0].classList.remove('active');
        } else {
          this.classList.add('active');
        }
      });
    }
  };
  hoverAdvantages();

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
