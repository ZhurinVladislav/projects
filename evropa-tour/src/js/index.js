import MobMenu from './libs/mob-menu.min.js';

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация функций мобильного меню
  const mobMenuWrap = document.getElementById('menu-mobile');
  const mobMenuBtn = document.getElementById('menu-toggle');

  const mobMenu = new MobMenu(document.documentElement, document.body, mobMenuBtn, mobMenuWrap, true);
  mobMenu.init();

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

  const initNewsTabs = () => {
    const tabsWrap = document.getElementById('tabs');
    const tabsContentWrap = document.getElementById('tabs-content-wrap');

    if (!tabsWrap || !tabsContentWrap) {
      return;
    }

    const tabsBtns = tabsWrap.querySelectorAll('.js-tabs-btn');
    const tabsContentWraps = tabsContentWrap.querySelectorAll('.js-tabs-content');

    tabs(tabsBtns, tabsContentWraps);
  };

  initNewsTabs();

  const quiz = () => {
    const wrap = document.getElementById('quiz');
    if (!wrap) return;

    const items = [...wrap.querySelectorAll('.js-quiz-item')];
    if (items.length === 0) return;

    items.forEach((el, i) => {
      const index = i + 1;
      el.setAttribute('data-quiz-item', index);
      if (i === 0) el.classList.add('active');

      const btnPrev = el.querySelector('.js-btn-prev');
      const btnNext = el.querySelector('.js-btn-next');

      if (btnPrev) {
        btnPrev.setAttribute('data-quiz-prev', i);
        btnPrev.addEventListener('click', () => activateItem(btnPrev.getAttribute('data-quiz-prev')));
      }

      if (btnNext) {
        btnNext.setAttribute('data-quiz-next', index + 1);
        btnNext.addEventListener('click', () => activateItem(btnNext.getAttribute('data-quiz-next')));
      }
    });

    const activateItem = index => {
      items.forEach(item => item.classList.remove('active'));
      const target = wrap.querySelector(`[data-quiz-item="${index}"]`);
      if (target) target.classList.add('active');
    };
  };

  quiz();

  const countInput = () => {
    const wrapArr = [...document.querySelectorAll('.js-count-wrap')];

    if (!wrapArr || wrapArr === null || wrapArr.length === 0) return;

    wrapArr.forEach(el => {
      const btnMinus = el.querySelector('.js-count-btn-minus');
      const btnPlus = el.querySelector('.js-count-btn-plus');
      const input = el.querySelector('.js-count-input');

      if (!btnMinus || btnMinus === null) return;
      if (!btnPlus || btnPlus === null) return;
      if (!input || input === null) return;

      btnMinus.addEventListener('click', () => {
        if (input.value > 0) --input.value;
      });

      btnPlus.addEventListener('click', () => {
        if (input.value < 10) ++input.value;
      });
    });
  };

  countInput();

  const ratingReview = () => {
    const wrap = document.getElementById('star-list');
    const input = document.getElementById('star-value');
    const countText = document.getElementById('star-count-text');

    if (!wrap || wrap === null) return;
    if (!input || input === null) return;
    if (!countText || countText === null) return;

    const itemsArr = Array.from(wrap.querySelectorAll('.js-star'));

    if (itemsArr.length === 0 || !itemsArr || itemsArr === null) return;

    itemsArr.forEach(el => {
      el.addEventListener('click', () => {
        const value = el.getAttribute('data-value');

        itemsArr.forEach(s => s.classList.remove('selected'));

        itemsArr.forEach(s => {
          if (parseInt(s.getAttribute('data-value')) <= value) {
            s.classList.add('selected');
          }
        });

        input.value = value;
        countText.textContent = value;
      });
    });
  };

  ratingReview();

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

    // accordionBtn[0].classList.add('active');
    // accordionBtn[0].parentNode.classList.add('active');
    // accordionText[0].style.maxHeight = `${accordionText[0].scrollHeight}px`;

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
});
