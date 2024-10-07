document.addEventListener('DOMContentLoaded', () => {
  (() => {
    // ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ
    const openButton = document.querySelectorAll('.js-open-modal'),
      closeButton = document.querySelectorAll('.js-close-modal'),
      formSuccess = document.getElementById('form-success'),
      html = document.querySelector('html');

    let modalAtr, modWindow;

    // ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
    openButton.forEach(e => {
      e.addEventListener('click', () => {
        modalAtr = e.getAttribute('data-open');
        document.getElementById(modalAtr).classList.add('open');
        html.classList.add(`mod-open`);
        modWindow = document.querySelector(`.${modalAtr} .modal-box`);
        closeMod();
      });
    });

    // ОТКРЫТИЕ МОДАЛЬНОГО ОКНА УСПЕШНОЙ ОТПРАВКИ ЗАЯВКИ
    function openFormSuccess() {
      closeMod('close'); // ЗАКРЫТИЕ ВСЕ ОКОН
      formSuccess.classList.add('open');
      html.classList.add(`mod-open`);
      modWindow = document.querySelector(`.form-success .modal-box`);
      closeMod();
    }

    // ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА

    function closeMod(closeAll = null) {
      const modalArr = document.querySelectorAll('.modal');
      if (closeAll !== null) {
        modalArr.forEach(e => {
          e.classList.remove('open');
          html.classList.remove('mod-open');
        });
        return;
      }

      // ЗАКРЫТИЕ ПО НАЖАТИЮ НА КНОПКУ
      closeButton.forEach(e => {
        e.addEventListener('click', () => {
          modalArr.forEach(e => {
            e.classList.remove('open');
            html.classList.remove('mod-open');
          });
        });
      });
      // ЗАКРЫТИЕ НАЖАТИЕМ КНОПКИ "ESC"
      window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          modalArr.forEach(e => {
            e.classList.remove('open');
            html.classList.remove('mod-open');
          });
        }
      });
      // ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА ПО КНОПКЕ ИЛИ КЛИКУ НА ФОН
      modWindow.addEventListener('click', e => {
        e._isClickWithInModal = true;
      });
      modalArr.forEach(e => {
        e.addEventListener('click', e => {
          if (e._isClickWithInModal) return;
          e.currentTarget.classList.remove('open');
          html.classList.remove(`mod-open`);
        });
      });
    }

    // ФУНКЦИЯ СКРЫТИЯ ФОРМЫ ПОСЛЕ ОТПРАВКИ ЗАЯВКИ
    function submitCalculator() {
      const wrap = document.getElementById('submit-wrap'),
        btnOpen = document.getElementById('submit-calculator'),
        form = document.getElementById('form-calculator');

      btnOpen.classList.remove('hidden');
      wrap.style.maxHeight = '60px';
      form.classList.remove('open');
    }

    // УСПЕШНАЯ ОТПРАВКА ДЛЯ MODX AJAX FORM
    $(document).on('af_complete', function (event, response) {
      if (response.success) {
        openFormSuccess();
        submitCalculator();
      }
    });

    // ПЕРЕДАЧА ДАННЫХ В МОДАЛЬНОЕ ОКНО СПЕЦИАЛИСТА
    (() => {
      const btnSpec = document.querySelectorAll('.js-btn-specialist'),
        modImg = document.getElementById('mod-img'),
        modTitle = document.getElementById('mod-title'),
        modText = document.getElementById('mod-text'),
        url = window.origin;

      btnSpec.forEach(element => {
        element.addEventListener('click', event => {
          const parent = event.currentTarget.parentNode,
            img = parent.parentNode.querySelector('.js-img-specialist').src.replace(url, '.'),
            title = parent.querySelector('.js-title-specialist'),
            text = parent.querySelector('.js-text-specialist');

          modImg.setAttribute('src', img);
          modTitle.textContent = title.textContent;
          modText.innerHTML = text.innerHTML;
        });

        element.addEventListener('mouseover', event => {
          const parent = event.currentTarget.parentNode;
          parent.classList.add('hover');
        });

        element.addEventListener('mouseout', event => {
          const parent = event.currentTarget.parentNode;
          parent.classList.remove('hover');
        });
      });
    })();
  })();
});
