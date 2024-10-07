import removeFocus from './libs/removeFocus/index.min.js';

document.addEventListener('DOMContentLoaded', () => {
  // УБИРАЕМ ФОКУС ПОСЛЕ НАЖАТИЯ НА КНОПКУ ИЛИ ССЫЛКУ
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
