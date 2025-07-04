document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  const body = document.body;
  const mobMenuWrap = document.getElementById('menu-mobile');
  const mobMenuBtn = document.getElementById('burger-toggle');

  const copyUrlPage = () => {
    const btn = document.getElementById('copy-btn');

    if (!btn) return;

    btn.addEventListener('click', () => {
      const message = document.getElementById('copy-message');

      if (!message) return;

      const currentUrl = window.location.href;

      // Функция для отображения сообщения
      const showMessage = () => {
        message.classList.remove('fade-out');
        message.classList.add('fade-in');
        message.style.display = 'flex';

        // Скрыть сообщение через 2 секунды
        setTimeout(() => {
          message.classList.remove('fade-in');
          message.classList.add('fade-out');
        }, 2000);
      };

      // Резервный метод копирования текста
      const fallbackCopyText = text => {
        // Создание временного textarea элемента
        const textarea = document.createElement('textarea');
        textarea.value = text;
        // Избегаем смещения страницы при добавлении элемента
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
          const successful = document.execCommand('copy');
          if (successful) {
            showMessage();
          } else {
            throw new Error('Не удалось скопировать текст');
          }
        } catch (err) {
          console.error('Ошибка копирования с помощью fallback:', err);
          alert('Не удалось скопировать ссылку. Пожалуйста, скопируйте её вручную.');
        }

        // Удаление временного элемента
        document.body.removeChild(textarea);
      };

      // Проверка поддержки navigator.clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(currentUrl)
          .then(() => {
            showMessage();
          })
          .catch(err => {
            console.error('Ошибка копирования: ', err);
            fallbackCopyText(currentUrl);
          });
      } else {
        // Использование резервного метода
        fallbackCopyText(currentUrl);
      }
    });
  };

  copyUrlPage();

  // УБИРАЕМ ФОКУС ПОСЛЕ НАЖАТИЯ НА КНОПКУ ИЛИ ССЫЛКУ
  const removeFocus = () => {
    const arrBtn = Array.from(document.querySelectorAll('button'));
    const arrLink = Array.from(document.querySelectorAll('a'));
    const arrElements = [...arrBtn, ...arrLink];

    arrElements.forEach(ev => {
      ev.addEventListener('mousedown', el => el.preventDefault());
      ev.addEventListener('mouseup', el => el.preventDefault());
    });
  };

  removeFocus();

  // Нормализуем ссылки на номер телефона.
  const normalizePhoneLink = () => {
    const arrLinks = Array.from(document.querySelectorAll('a[href^="tel:"]'));

    if (arrLinks.length === 0) return;

    arrLinks.forEach(el => {
      const normalizeHref = el.href.replace(/[^+\d]/g, '');
      el.href = `tel:${normalizeHref}`;
    });
  };

  normalizePhoneLink();

  //ФИКСИРОВАННАЯ ШАПКА ПРИ СКРОЛЛЕ
  const fixedHeader = () => {
    if (!document.getElementById('main-block') || !document.getElementById('header')) return;

    const main = document.getElementById('main-block').classList;
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

  // Открытие в шапке списка для обратной связи
  const feedbackList = () => {
    const btn = document.getElementById('feedback-btn');
    const list = document.getElementById('feedback-list');

    if (!btn || !list) return;

    list.classList.add('hidden');

    btn.addEventListener('click', () => {
      if (list.style.maxHeight) {
        list.style.maxHeight = null;
      } else {
        list.style.maxHeight = list.scrollHeight + 'px';
      }
    });

    window.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') {
        if (list.style.maxHeight) {
          list.style.maxHeight = null;
        }
      }
    });

    document.addEventListener('click', ev => {
      if (!btn.contains(ev.target) && !list.contains(ev.target) && list.style.maxHeight) {
        list.style.maxHeight = null;
        btn.classList.remove('active');
      }
    });
  };

  feedbackList();

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

      document.addEventListener('click', ev => {
        if (!btn.contains(ev.target) && !list.contains(ev.target) && list.style.maxHeight) {
          list.style.maxHeight = null;
          btn.classList.remove('active');
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

  // Выпадающий текст
  const textMore = () => {
    const arrWraps = Array.from(document.querySelectorAll('.js-more-wrap'));
    if (arrWraps.length === 0 || !arrWraps) return;

    arrWraps.forEach(el => {
      const text = el.querySelector('.js-more-text');
      const btn = el.querySelector('.js-more-btn');
      if (!text || !btn) return;

      const btnText = btn.querySelector('.js-more-btn-text');

      text.style.display = 'none';
      text.classList.add('overflow-hidden');

      const open = () => {
        btn.classList.add('active');
        if (btnText) btnText.textContent = 'Скрыть текст';
        text.style.display = 'block';
        text.classList.remove('overflow-hidden');
      };

      const close = () => {
        btn.classList.remove('active');
        if (btnText) btnText.textContent = 'Читать полностью';
        text.style.display = 'none';
        text.classList.add('overflow-hidden');
      };

      btn.addEventListener('click', () => {
        btn.classList.contains('active') ? close() : open();
      });
    });

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

  // Список больше на странице компании в блоке услуги
  const listMore = () => {
    const arrListWrap = Array.from(document.querySelectorAll('.js-list-wrap'));

    if (arrListWrap.length === 0 || !arrListWrap) return;

    arrListWrap.forEach(wrap => {
      const listChild = Array.from(wrap.querySelectorAll('.js-list-item'));
      const listItemsHidden = [];
      const btn = wrap.querySelector('.js-list-btn');
      const btnText = btn.querySelector('.js-list-btn-text');

      if (!btn) return;

      if (listChild || listChild !== null) {
        if (listChild.length > 8) {
          for (let i = 8; i < listChild.length; i++) {
            const el = listChild[i];

            listItemsHidden.push(el);

            el.classList.add('hidden');
          }
        } else {
          btn.classList.add('hidden');
        }
      }

      if (listItemsHidden.length === 0 || !listItemsHidden || listItemsHidden === null) return;

      const visible = () => {
        btn.classList.add('active');
        if (btnText) btnText.textContent = 'Свернуть';

        listItemsHidden.forEach(el => {
          el.classList.remove('hidden');
        });
      };

      const hidden = () => {
        btn.classList.remove('active');
        if (btnText) btnText.textContent = 'Развернуть';

        listItemsHidden.forEach(el => {
          el.classList.add('hidden');
        });
      };

      btn.addEventListener('click', () => {
        const isActive = btn.classList.contains('active');

        isActive ? hidden() : visible();
      });
    });
  };

  listMore();

  const ratingReview = () => {
    const wrap = document.getElementById('rating-review');
    const input = document.getElementById('rating-value');

    if (!wrap || wrap === null) return;
    if (!input || input === null) return;

    const itemsArr = Array.from(wrap.querySelectorAll('.js-review-star'));

    if (itemsArr.length === 0 || !itemsArr || itemsArr === null) return;

    itemsArr.forEach(el => {
      el.classList.add('selected');
    });

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
      });
    });
  };

  ratingReview();

  const createReview = () => {
    const form = document.getElementById('form-review');
    const content = document.getElementById('popup-reviews-content');

    if (!form || content === null) return;

    // if (content || content !== null) {
    //   content.innerHTML = '';
    //   const title = document.createElement('h3');
    //   const text = document.createElement('p');

    //   title.classList.add('popup__title');
    //   text.classList.add('popup__text');

    //   title.textContent = 'Спасибо за отзыв!';
    //   text.textContent = 'Отзыв был отправлен на модерацию.';

    //   content.append(title);
    //   content.append(text);
    // }

    form.addEventListener('submit', ev => {
      ev.preventDefault();
    });
  };

  createReview();

  // Список больше на странице компании в блоке портфолио
  const listGalleryMore = () => {
    const list = document.getElementById('gallery-list');
    const btn = document.getElementById('gallery-btn');
    const btnCount = document.getElementById('gallery-btn-count');

    if (!list || !btn || list === null || btn === null) return;

    const listChild = Array.from(list.querySelectorAll('.js-gallery-item'));
    const listItemsHidden = [];

    if (listChild || listChild !== null) {
      if (listChild.length > 4) {
        for (let i = 4; i < listChild.length; i++) {
          const el = listChild[i];

          listItemsHidden.push(el);

          el.classList.add('hidden');
        }

        if (btnCount) btnCount.textContent = listItemsHidden.length;
      } else {
        btn.classList.add('hidden');
      }
    }

    const visible = () => {
      btn.classList.add('hidden');
      listItemsHidden.forEach(el => {
        el.classList.remove('hidden');
      });
    };

    btn.addEventListener('click', () => {
      visible();
    });
  };

  listGalleryMore();

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
    html.addEventListener('click', () => {
      if (body.classList.contains('lg-on')) {
        html.classList.add('galleryActive');
      } else {
        html.classList.remove('galleryActive');
      }
    });

    window.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') html.classList.remove('galleryActive');
    });
  };
  addIndent();

  const portfolioGallery = () => {
    if (!document.getElementById('portfolio') || document.getElementById('portfolio') === null) return;

    $('#portfolio').lightGallery({
      thumbnail: false,
      share: false,
      selector: '.project-portfolio__list-link',
    });
  };

  portfolioGallery();

  /**
   * Фильтра на странице компаний
   */
  class FilterHandler {
    /**
     * Конструктор класса FilterHandler.
     * @param {string} filterContainerSelector - CSS-селектор контейнера с фильтрами.
     * @param {string} tagContainerSelector - CSS-селектор контейнера для тегов.
     * @param {string} [topListSelector] - CSS-селектор верхнего списка (необязательно).
     */
    constructor(filterContainerSelector, tagContainerSelector, topListSelector = null) {
      this.filterContainer = document.querySelector(filterContainerSelector);
      this.tagContainer = document.querySelector(tagContainerSelector);
      this.topList = topListSelector ? document.querySelector(topListSelector) : null;

      this.urlParams = new URLSearchParams(window.location.search);

      this.initFilters();
      this.initTags();

      if (this.topList) {
        this.initTopListFilters();
      }
    }

    /**
     * Проверка существует ли тег
     * @param {string} text - Текст для тега.
     * @returns {boolean} Возвращает true или false.
     */
    tagExists(text) {
      return Array.from(this.tagContainer.children).some(tag => tag.textContent.includes(text));
    }

    /**
     * Создает тег фильтрации
     * @param {string} text - Текст для тега.
     * @param {string} type - Тип фильтра для удаления (type или rating).
     */
    createTag(text, type) {
      if (this.tagExists(text)) return;

      const item = document.createElement('li');
      const itemTextWrap = document.createElement('div');
      const itemText = document.createElement('span');
      const btn = document.createElement('button');
      const btnIcon = `<svg class="filters-list__item-btn-icon">
                            <use xlink:href="./app/img/icons/icons.svg#close"></use>
                          </svg>`;
      item.classList.add('filters-list__item', 'js-filters-list-item');
      item.setAttribute('data-filter', text);
      itemTextWrap.classList.add('filters-list__item-text-wrap');
      itemText.classList.add('filters-list__item-text', 'js-filters-item-text');
      btn.classList.add('filters-list__item-btn', 'js-filters-list-btn');
      btn.innerHTML = btnIcon;
      btn.append(itemTextWrap);
      if (!isNaN(text)) {
        itemTextWrap.innerHTML = `
                <span class="filters-list__item-text">${text}</span>
                <svg
                  class="filters-list__item-text-icon">
                  <use xlink:href="./app/img/icons/icons.svg#star"></use>
                </svg>`;
      } else {
        itemText.textContent = text;
        itemTextWrap.append(itemText);
      }

      btn.addEventListener('click', () => this.removeFilter(type, text));
      item.append(itemTextWrap);
      item.append(btn);
      this.tagContainer.appendChild(item);
    }

    /**
     * Удаляет фильтр и тег
     * @param {string} type - Тип фильтра (type или rating).
     * @param {string} text - Текст фильтра.
     */
    removeFilter(type, text) {
      const checkboxes = this.filterContainer.querySelectorAll(`input[data-filter-${type}]`);

      checkboxes.forEach(checkbox => {
        const textNormalize = checkbox.getAttribute(`data-filter-${type}`).trim().replace(/\s+/g, ' ');

        if (textNormalize === text) {
          checkbox.checked = false;
        }
      });

      const values = this.urlParams.get(type)?.split(',').map(decodeURIComponent) || [];
      const updatedValues = values.filter(value => value !== text);

      if (updatedValues.length > 0) {
        this.urlParams.set(type, updatedValues.map(encodeURIComponent).join(','));
      } else {
        this.urlParams.delete(type);
      }

      this.updateURL();
      this.updateTags();
      this.sendRequest();
    }

    /**
     * Инициализация фильтров из верхнего списка
     */
    initTopListFilters() {
      const topListItems = Array.from(this.topList.querySelectorAll('[data-filter-item]'));

      topListItems.forEach(item => {
        item.addEventListener('click', () => {
          const value = item.dataset.filterItem;

          if (!value) {
            console.warn('Параметр value отсутствуют в элементе:', item);
            return;
          }

          const checkboxes = this.filterContainer.querySelectorAll(`input[data-filter-type]`);

          checkboxes.forEach(checkbox => {
            const textNormalize = checkbox.getAttribute(`data-filter-type`).trim().replace(/\s+/g, ' ');

            if (textNormalize === value) {
              // checkbox.checked = true;
              checkbox.checked = !checkbox.checked;
              this.handleFilterChange(checkbox);
            } else {
              console.warn(`Чекбокс для типа type и значения ${value} не найден.`);
            }
          });
        });
      });
    }

    /**
     * Инициализация фильтров
     */
    initFilters() {
      const typeCheckboxes = this.filterContainer.querySelectorAll('input[data-filter-type]');
      const ratingCheckboxes = this.filterContainer.querySelectorAll('input[data-filter-rating]');

      [...typeCheckboxes, ...ratingCheckboxes].forEach(checkbox => {
        checkbox.addEventListener('change', () => this.handleFilterChange(checkbox));
      });

      this.restoreFiltersFromURL();
    }

    /**
     * Обработка изменения фильтров
     * @param {HTMLInputElement} checkbox - Чекбокс, который изменился.
     */
    handleFilterChange(checkbox) {
      const type = checkbox.dataset.filterType ? 'type' : 'rating';
      const value = checkbox.getAttribute(`data-filter-${type}`).trim().replace(/\s+/g, ' ');

      const values = this.urlParams.get(type)?.split(',').map(decodeURIComponent) || [];

      if (checkbox.checked) {
        if (!values.includes(value)) {
          values.push(value);
        }
      } else {
        const index = values.indexOf(value);
        if (index !== -1) {
          values.splice(index, 1);
        }
      }

      if (values.length > 0) {
        this.urlParams.set(type, values.map(encodeURIComponent).join(','));
      } else {
        this.urlParams.delete(type);
      }

      this.updateURL();
      this.updateTags();
      this.sendRequest();
    }

    /**
     * Восстанавливает фильтры из URL
     */
    restoreFiltersFromURL() {
      this.urlParams.forEach((value, key) => {
        const values = value.split(',').map(decodeURIComponent);

        values.forEach(singleValue => {
          const checkboxes = this.filterContainer.querySelectorAll(`input[data-filter-${key}]`);
          let matchFound = false;

          checkboxes.forEach(checkbox => {
            const text = checkbox.getAttribute(`data-filter-${key}`).trim().replace(/\s+/g, ' ');
            if (text === singleValue) {
              checkbox.checked = true;
              this.createTag(singleValue, key);
              matchFound = true;
            }
          });

          if (!matchFound) {
            console.warn(`Не найден чекбокс для параметра ${key} со значением ${singleValue}.`);
          }
        });
      });
    }

    /**
     * Обновляет URL с параметрами фильтров
     */
    updateURL() {
      const newURL = this.urlParams.toString() ? `${window.location.pathname}?${this.urlParams.toString()}` : window.location.pathname;
      window.history.replaceState({}, '', newURL);
    }

    /**
     * Обновляет теги отображаемых фильтров
     */
    updateTags() {
      this.tagContainer.innerHTML = '';
      this.urlParams.forEach((value, key) => {
        value
          .split(',')
          .map(decodeURIComponent)
          .forEach(singleValue => {
            this.createTag(singleValue, key);
          });
      });
    }

    /**
     * Отправляет запрос на сервер с текущими параметрами фильтрации.
     */
    sendRequest() {
      const data = Object.fromEntries(this.urlParams.entries());

      ajax(
        {
          controller: 'reviewsCompany/createReview',
          data: data,
        },
        response => {
          console.log('Ответ сервера:', response);
          // Можно добавить обработку ответа сервера
        }
      );
    }

    /**
     * Инициализация тегов
     */
    initTags() {
      this.tagContainer.innerHTML = '';
      this.restoreFiltersFromURL();
    }
  }

  const filterHandler = new FilterHandler('.section-filter__main-wrap', '.filter-results__filters-list', '.services-inner__list');
});
