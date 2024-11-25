document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const mobMenuWrap = document.getElementById('menu-mobile');
  const mobMenuBtn = document.getElementById('burger-toggle');

  function overflowHTML() {
    let scrollY = 0;

    const toggleClassOverflow = () => {
      scrollY = window.scrollY;

      if (window.scrollY >= 100) {
        body.classList.add('overflow');
      } else {
        body.classList.remove('overflow');
      }
    };

    if (document.getElementById('yacht') || document.getElementById('creating-an-ad')) {
      window.addEventListener('scroll', toggleClassOverflow, { passive: true });
    }
  }
  overflowHTML();

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
  const mobMenu = () => {
    // ОТКРЫТИЕ И ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
    mobMenuBtn.addEventListener('click', () => {
      mobMenuBtn.classList.toggle('menu-toggle_active');
      mobMenuWrap.classList.toggle('active');
      body.classList.toggle('menu-open');
      html.classList.toggle('menu-open');
    });

    // ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ КНОПКОЙ "ESC"
    window.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') {
        mobMenuBtn.classList.remove('menu-toggle_active');
        mobMenuWrap.classList.remove('active');
        body.classList.remove('menu-open');
        html.classList.remove('menu-open');
      }
    });
  };
  mobMenu();

  // ОТКРЫТИЕ ВСПЛЫВАЮЩЕГО СПИСКА В МОБ. МЕНЮ
  const mobMenuList = () => {
    const btnOpenMenu = Array.from(document.querySelectorAll('.js-mobile-btn'));
    const listInner = Array.from(document.querySelectorAll('.js-mobile-list'));

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
          const elBtn = el.querySelector('.js-mobile-btn');
          const eList = el.querySelector('.js-mobile-list');

          parentList.querySelector('.js-mobile-btn').classList.add('active');
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

  // СЛАЙДЕР В БЛОКЕ "НАШИ КЛИЕНТЫ"

  // АККОРДЕОН
  const accordion = () => {
    const ac = [...Array.from(document.querySelectorAll('.js-ac'))];
    const acBtn = [...Array.from(document.querySelectorAll('.js-ac-btn'))];
    const acText = [...Array.from(document.querySelectorAll('.js-ac-content'))];

    if (ac.length === 0) return;

    acText.forEach(el => el.classList.add('ac-hidden'));

    acBtn[0].classList.add('ac-active');
    acBtn[0].parentNode.classList.add('ac-active');
    acText[0].style.maxHeight = `${acText[0].scrollHeight}px`;

    acBtn.forEach(el => {
      el.addEventListener('click', () => {
        const parentItem = el.parentNode;
        const acContent = el.nextElementSibling;

        if (acContent.style.maxHeight) {
          acText.forEach(el => (el.style.maxHeight = null));
          parentItem.classList.remove('ac-active');
          el.classList.remove('ac-active');
        } else {
          acText.forEach(el => {
            el.style.maxHeight = null;
            el.parentNode.classList.remove('ac-active');
            el.previousElementSibling.classList.remove('ac-active');
          });
          acContent.style.maxHeight = acContent.scrollHeight + 'px';
          parentItem.classList.add('ac-active');
          el.classList.add('ac-active');
        }
      });
    });
  };
  accordion();

  const inputImg = () => {
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');

    if (!photoInput || !photoPreview) return;

    photoInput.addEventListener('change', event => {
      const files = Array.from(event.target.files);

      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = e => {
            const img = document.createElement('img');
            img.classList.add('photo-preview__img');
            img.src = e.target.result;
            photoPreview.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      });
    });
  };

  inputImg();
});
