document.addEventListener('DOMContentLoaded', () => {
  // ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ
  const openButton = document.querySelectorAll('.js-open-modal');
  const closeButton = document.querySelectorAll('.js-close-modal');
  const formSuccess = document.getElementById('form-success');
  const html = document.querySelector('html');
  let modalAtr, modWindow;

  // ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
  openButton.forEach(el => {
    el.addEventListener('click', () => {
      modalAtr = el.getAttribute('data-open');
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
      modalArr.forEach(el => {
        el.classList.remove('open');
        html.classList.remove('mod-open');
      });
      return;
    }

    // ЗАКРЫТИЕ ПО НАЖАТИЮ НА КНОПКУ
    closeButton.forEach(el => {
      el.addEventListener('click', () => {
        modalArr.forEach(el => {
          el.classList.remove('open');
          html.classList.remove('mod-open');
        });
      });
    });

    // ЗАКРЫТИЕ НАЖАТИЕМ КНОПКИ "ESC"
    window.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') {
        modalArr.forEach(el => {
          el.classList.remove('open');
          html.classList.remove('mod-open');
        });
      }
    });

    // ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА ПО КНОПКЕ ИЛИ КЛИКУ НА ФОН
    modWindow.addEventListener('click', ev => {
      ev._isClickWithInModal = true;
    });

    modalArr.forEach(el => {
      el.addEventListener('click', ev => {
        if (ev._isClickWithInModal) return;
        ev.currentTarget.classList.remove('open');
        html.classList.remove(`mod-open`);
      });
    });
  }

  // УСПЕШНАЯ ОТПРАВКА ДЛЯ MODX AJAX FORM
  $(document).on('af_complete', function (event, response) {
    if (response.success) openFormSuccess();
  });
});
