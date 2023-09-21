document.addEventListener('DOMContentLoaded', () => {
  (() => {
    // ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ
    const openButton = document.querySelectorAll('.js-open-modal'),
          closeButton = document.querySelectorAll('.js-close-modal'),
          formSuccess = document.getElementById('form-success'),
          // formMod = document.querySelectorAll('.form-mod'),
          html = document.querySelector('html');

    let modalAtr,
        modWindow;
		
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
      };

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
        };
      });
      // ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА ПО КНОПКЕ ИЛИ КЛИКУ НА ФОН
      modWindow.addEventListener('click', e => {
        e._isClickWithInModal = true;
      });
      modalArr.forEach(e => {
        e.addEventListener('click', e => {
          console.log(e);
          if (e._isClickWithInModal) return;
          e.currentTarget.classList.remove('open');
          html.classList.remove(`mod-open`);
        });
      });
    };

    // ВАЛИДАЦИЯ ФОРМЫ В МОДАЛЬНОМ ОКНЕ
    /*
    function validation(form) {

      function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
          parent.querySelector('.error-label').remove();
          parent.classList.remove('error');
        }
      }

      function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label');

        errorLabel.classList.add('error-label');
        errorLabel.textContent = text;

        parent.classList.add('error');

        parent.append(errorLabel);
      }

      let result = true;

      let addClient = true;

      const allInputs = form.querySelectorAll('.js-input');

      for (const input of allInputs) {
        removeError(input);

        if (input.dataset.minLength) {
          if (input.value.length < input.dataset.minLength) {
            removeError(input);
            createError(input, `Минимальное кол-во символов: ${input.dataset.minLength}`);
            result = false;
          };
        };

        if (input.dataset.maxLength) {
          if (input.value.length > input.dataset.maxLength) {
            removeError(input);
            createError(input, `Максимальное кол-во символов: ${input.dataset.maxLength}`);
            result = false;
          };
        };

        if (input.dataset.required == 'true') {
          if (input.value == '') {
            removeError(input);
            createError(input, 'Поле не заполнено!');
            result = false;
          };
        };

        if (result === true) {
          input.value = ''
        }
      };

      return result;
    }
    */

    // УСПЕШНАЯ ОТПРАВКА ДЛЯ MODX AJAX FORM
    $(document).on('af_complete', function (event, response) {
      if (response.success) {
        openFormSuccess();
      };
    });

  })();
});