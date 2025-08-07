import MobMenu from './libs/mob-menu.min.js';

document.addEventListener('DOMContentLoaded', () => {
  // Базовые переменные
  const html = document.querySelector('html');
  const body = document.body;
  // Инициализация функций мобильного меню
  const mobMenuWrap = document.getElementById('menu-mobile');
  const mobMenuBtn = document.getElementById('menu-toggle');

  const mobMenu = new MobMenu(document.documentElement, document.body, mobMenuBtn, mobMenuWrap, true);
  mobMenu.init();

  /**
   * Добавление класса overflow для "position: stick"
   */
  const overflowHTML = () => {
    let scrollY = 0;

    const toggleClassOverflow = () => {
      scrollY = window.scrollY;

      if (window.scrollY >= 100) {
        body.classList.add('overflow');
      } else {
        body.classList.remove('overflow');
      }
    };

    if (document.querySelector('.js-sticky')) {
      window.addEventListener('scroll', toggleClassOverflow, { passive: true });
    }
  };
  overflowHTML();

  /**
   * Выпадающий список
   */
  const dropdown = () => {
    const wrap = document.querySelectorAll('.js-dropdown');

    if (!wrap || wrap.length === 0) return;

    wrap.forEach(item => {
      const btn = item.querySelector('.js-dropdown-btn');
      const list = item.querySelector('.js-dropdown-list');

      if (!btn || !list) return;

      btn.addEventListener('click', () => {
        if (!list.classList.contains('active')) {
          list.classList.add('active');
          if (!btn.classList.contains('active')) btn.classList.add('active');
        } else {
          list.classList.remove('active');
          if (btn.classList.contains('active')) btn.classList.remove('active');
        }
      });

      window.addEventListener('keydown', ev => {
        if (ev.key === 'Escape') {
          if (list.classList.contains('active')) {
            list.classList.remove('active');
            if (btn.classList.contains('active')) btn.classList.remove('active');
          }
        }
      });

      document.addEventListener('click', ev => {
        if (!btn.contains(ev.target) && !list.contains(ev.target) && list.classList.contains('active')) {
          list.classList.remove('active');
          if (btn.classList.contains('active')) btn.classList.remove('active');
        }
      });
    });
  };

  dropdown();

  /**
   * Табы
   */
  const tabs = (tabsBtns, tabsContentWraps) => {
    if (!tabsBtns || !tabsContentWraps || !tabsBtns.length === 0 || !tabsContentWraps.length === 0) {
      console.warn('Не переданы переменные в функцию tabs');
      return;
    }

    if (tabsBtns.length !== tabsContentWraps.length) {
      console.warn('Длина tabsBtns и tabsContentWraps должны совпадать');
      return;
    }

    tabsBtns.forEach((btn, index) => {
      if (index === 0) {
        btn.classList.add('active');
        tabsContentWraps[index].classList.add('active');
      }

      btn.addEventListener('click', () => {
        tabsBtns.forEach(btn => btn.classList.remove('active'));
        tabsContentWraps.forEach(content => content.classList.remove('active'));

        btn.classList.add('active');
        tabsContentWraps[index].classList.add('active');
      });
    });
  };

  const iniCatalogTabs = () => {
    const tabsWrap = document.getElementById('tabs');
    const tabsContentWrap = document.getElementById('tabs-content-wrap');

    if (!tabsWrap || !tabsContentWrap) {
      return;
    }

    const tabsBtns = tabsWrap.querySelectorAll('.js-tabs-btn');
    const tabsContentWraps = tabsContentWrap.querySelectorAll('.js-tabs-content');

    tabs(tabsBtns, tabsContentWraps);
  };

  iniCatalogTabs();

  /**
   * Аккордеон
   * @returns void
   */
  const accordion = () => {
    const accordion = Array.from(document.querySelectorAll('.js-accordion'));
    const accordionBtn = Array.from(document.querySelectorAll('.js-accordion-btn'));
    const accordionText = Array.from(document.querySelectorAll('.js-accordion-content'));

    if (accordion.length === 0) return;

    accordionText.forEach(el => el.classList.add('accordion-hidden'));

    accordionBtn[0].classList.add('active');
    accordionBtn[0].parentNode.classList.add('active');
    accordionText[0].style.maxHeight = `${accordionText[0].scrollHeight}px`;

    accordionBtn.forEach(el => {
      el.addEventListener('click', () => {
        const parentItem = el.parentNode;
        const accordionContent = el.nextElementSibling;

        if (accordionContent.style.maxHeight) {
          accordionText.forEach(el => (el.style.maxHeight = null));
          parentItem.classList.remove('active');
          el.classList.remove('active');
        } else {
          accordionText.forEach(el => {
            el.style.maxHeight = null;
            el.parentNode.classList.remove('active');
            el.previousElementSibling.classList.remove('active');
          });
          accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
          parentItem.classList.add('active');
          el.classList.add('active');
        }
      });
    });
  };

  accordion();

  /**
   * Меню на странице каталога
   * @returns void
   */
  class MenuLust {
    constructor(menuWrap) {
      if (!menuWrap) {
        throw new Error('Не передан родитель списка');
      }

      this.menuWrap = menuWrap;
    }

    addClassHidden = () => {
      const parentArr = this.menuWrap.querySelectorAll('.parent');

      if (!parentArr || parentArr.length === 0) return;

      parentArr.forEach(parent => {
        const btn = parent.querySelector('.js-menu-btn');
        const list = parent.querySelector('.js-menu-list');

        if (!list || !btn) return;
        const isActiveItem = list.querySelector('.active');

        if (parent.classList.contains('active') || isActiveItem) {
          btn.classList.add('active');
        } else {
          list.classList.add('none');
        }
      });
    };

    /**
     * Проверка есть ли класс active на кнопке и списке
     *
     * @param {HTMLElement} item родитель в котором ищем кнопку и список
     * @returns bool
     */
    isActive = item => {
      if (!item) {
        throw new Error('Не передан элемент item метод isActive');
      }

      const btn = item.querySelector('.js-menu-btn');

      if (!btn) {
        throw new Error('Не найдена кнопка');
      }

      const list = item.querySelector('.js-menu-list');

      if (!list) {
        throw new Error('Не найден список');
      }

      if (btn.classList.contains('active') && !list.classList.contains('none')) {
        return true;
      } else {
        return false;
      }
    };

    handleOpen = (btn, list) => {
      btn.classList.add('active');
      list.classList.remove('none');
    };

    handleClose = (btn, list) => {
      btn.classList.remove('active');
      list.classList.add('none');
    };

    /**
     * Событие для выпадающего списка
     */
    handlerList = () => {
      const parentsArr = this.menuWrap.querySelectorAll('.parent');

      parentsArr.forEach(parent => {
        const btn = parent.querySelector('.js-menu-btn');

        if (!btn) return;

        const list = parent.querySelector('.js-menu-list');

        if (!list) return;

        btn.addEventListener('click', () => {
          const isActive = this.isActive(parent);

          if (isActive) {
            this.handleClose(btn, list);
          } else {
            this.handleOpen(btn, list);
          }
        });
      });
    };

    /**
     * Инициализация обработчиков.
     */
    init = () => {
      if (this.menuWrap) {
        this.addClassHidden();
        this.handlerList();
      } else {
        console.warn('Не все элементы найдены. MenuLust не инициализирован.');
      }
    };
  }

  const initMenuListCatalog = () => {
    const wrap = document.getElementById('catalog-menu');

    if (!wrap) return;

    const menuLust = new MenuLust(wrap);
    menuLust.init();
  };

  initMenuListCatalog();

  /**
   * Функция для управления кнопкой прокрутки вверх.
   */
  const scrollTop = () => {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    const updateScrollButton = () => {
      btn.classList.toggle('visible', window.scrollY > 100);
    };

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateScrollButton);
    updateScrollButton();
  };

  scrollTop();

  /**
   * Скрытие лишних изображений на странице карточки товара
   */
  const hiddenGalleryItem = (gallery, classItem, classLink, count) => {
    if (!gallery && classItem && classItem !== '' && classLink && classLink !== '' && typeof count !== 'number') {
      return;
    }

    const itemArr = gallery.querySelectorAll(`.${classItem}`);

    if ((!itemArr || itemArr.length === 0) && itemArr.length >= count++) return;

    itemArr.forEach((item, index) => {
      if (index === count - 1) {
        const link = item.querySelector(`.${classLink}`);
        const countNumber = itemArr.length - (index + 1);
        const text = document.createElement('span');
        text.classList.add('card-gallery__list-link-text');
        text.textContent = `+ ${countNumber} фото`;
        link.append(text);
      }

      if (index >= count) item.classList.add('none');
    });
  };

  const initCardGallery = () => {
    const gallery = document.getElementById('card-gallery');
    if (!gallery) return;

    const classItem = 'js-gallery-item';
    const classLink = 'js-gallery-link';

    hiddenGalleryItem(gallery, classItem, classLink, 5);
  };
  initCardGallery();

  /**
   * Плавный скролл на якорных ссылках
   */
  const scrollLink = () => {
    const linkArr = Array.from(document.querySelectorAll('a[href^="#"]'));

    if (!linkArr || linkArr.length === 0 || linkArr === null) return;

    linkArr.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const itemLink = document.querySelector(this.getAttribute('href'));

        if (mobMenuWrap.classList.contains('active')) mobMenu.close();

        itemLink.scrollIntoView({ behavior: 'smooth', block: 'center' }, { passive: true });
      });
    });
  };

  scrollLink();

  /**
   * Функция для небольшого всплывающего окна
   */
  const popupMini = () => {
    const btnOpen = document.getElementById('popup-mini-btn-open');
    const btnClose = document.getElementById('popup-mini-btn-close');
    const popup = document.getElementById('popup-mini');

    if (!btnOpen || !btnClose || !popup) return;

    btnOpen.addEventListener('click', () => {
      if (!btnOpen.classList.contains('active') && !popup.classList.contains('active')) {
        btnOpen.classList.add('active');
        popup.classList.add('active');
      }
    });

    btnClose.addEventListener('click', () => {
      if (btnOpen.classList.contains('active') && popup.classList.contains('active')) {
        btnOpen.classList.remove('active');
        popup.classList.remove('active');
      }
    });

    window.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') {
        if (btnOpen.classList.contains('active') && popup.classList.contains('active')) {
          btnOpen.classList.remove('active');
          popup.classList.remove('active');
        }
      }
    });

    document.addEventListener('click', ev => {
      if (!btnOpen.contains(ev.target) && !popup.contains(ev.target) && btnOpen.classList.contains('active') && popup.classList.contains('active')) {
        btnOpen.classList.remove('active');
        popup.classList.remove('active');
      }
    });
  };

  popupMini();

  /**
   * Инициализация галереи.
   */
  const initGallery = () => {
    Fancybox.bind('[data-fancybox]', {
      infinite: false,
      keyboard: {
        Escape: 'close',
      },
      iframe: {
        preload: false,
        width: 800,
        height: 450,
        autoplay: true,
      },
    });
  };

  initGallery();
});
