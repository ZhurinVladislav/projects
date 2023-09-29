document.addEventListener('DOMContentLoaded', () => {

  // МОБИЛЬНОЕ МЕНЮ
  (() => {
    const burgerBtn = document.getElementById('burger-toggle'),
      burgerMenu = document.getElementById('burger-menu'),
      html = document.querySelector('html'),
      body = document.querySelector('body');

    // ОТКРЫТИЕ И ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('menu-toggle_active');
      burgerMenu.classList.toggle('active');
      body.classList.toggle('menu-open');
      html.classList.toggle('menu-open');
    });

    // ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ КНОПКОЙ "ESC"
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        burgerBtn.classList.remove('menu-toggle_active');
        burgerMenu.classList.remove('active');
        body.classList.remove('menu-open');
        html.classList.remove('menu-open');
      }
    });
  })();

  // ОТКРЫТИЕ ВСПЛЫВАЮЩЕГО СПИСКА В МОБ. МЕНЮ
  (() => {
    const parentItem = document.querySelectorAll('.item__btn'),
      listInner = document.querySelectorAll('.parent .list');

    let arrLength;

    listInner.forEach((e) => {
      e.classList.add('overflow-hidden');
    });

    for (let i = 0; i < listInner.length; i++) {
      const el = listInner[i],
        elChild = el.children;

      for (let i = 0; i < elChild.length; i++) {
        let parent = elChild[i].parentNode;
        const arrow = parent.previousElementSibling;

        arrLength = elChild.length;

        if (elChild[i].classList.contains('active')) {
          document.querySelectorAll('.list').forEach(e => (e.style.maxHeight = null));
          parent.style.maxHeight = 'max-content';

          arrow.classList.add('active');
        }
      };
    };

    parentItem.forEach(e => {
      e.addEventListener('click', () => {
        const acContent = e.nextElementSibling;

        if (acContent.style.maxHeight) {
          document.querySelectorAll('.menu__list .list').forEach(e => {
            e.style.maxHeight = null;
          });
          e.classList.remove('active');
        } else {
          document.querySelectorAll('.menu__list .list').forEach(e => {
            e.style.maxHeight = null;
            console.log(e.previousElementSibling.classList);
            e.previousElementSibling.classList.remove('active')
          });
          acContent.style.maxHeight = acContent.scrollHeight + 'px';
          e.classList.add('active');
        }

      });

    });

  })();

  // СТРЕЛКА ПРОКРУТКИ НА ВВЕРХ
  (() => {
    const burgerMenu = document.getElementById('scrollTop');

    const btnUp = {
      el: burgerMenu,
      show() {
        this.el.classList.remove('scroll-top_active');
      },
      hide() {
        this.el.classList.add('scroll-top_active');
      },
      addEventListener() {
        window.addEventListener('scroll', () => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          scrollY > 400 ? this.show() : this.hide();
        });
        burgerMenu.onclick = () => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        };
      },
    };

    btnUp.addEventListener();
  })();

  // ФУНКЦИЯ УДАЛЕНИЕ ОТСТУПА У PAGINATION, ЕСЛИ У НЕГО НЕТ ДЕТЕЙ
  if (document.querySelector('.pagination')) {
    (() => {
      const pagination = document.querySelector('.pagination'),
        paginationChild = pagination.children;

      if (paginationChild.length === 0) pagination.style.paddingTop = '0';
    })();
  };

  // СЛАЙДЕР БЛОКА "PROJECTS"
  function swiperSliderOne() {
    const swiper = new Swiper('.projects-slider', {
      spaceBetween: 28,
      slidesPerView: 3,
      speed: 700,
      navigation: {
        nextEl: '.projects__swiper-wrapper .arrow-slider_next',
        prevEl: '.projects__swiper-wrapper .arrow-slider_prev',
      },
      breakpoints: {
        50: {
          slidesPerView: 1,
        },

        768: {
          slidesPerView: 2,
        },

        1024: {
          slidesPerView: 3,
        },

        1300: {
          slidesPerView: 3,
        },
      },
    });
  };

  if (document.querySelector('.projects')) {
    swiperSliderOne();
  };

  // СЛАЙДЕР БЛОКА "PORTFOLIO"
  function swiperSliderTwo() {
    const swiper = new Swiper('.portfolio-slider', {
      spaceBetween: 28,
      slidesPerView: 3,
      speed: 700,
      allowTouchMove: false,
      navigation: {
        nextEl: '.portfolio__swiper-wrapper .arrow-slider_next',
        prevEl: '.portfolio__swiper-wrapper .arrow-slider_prev',
      },
      breakpoints: {
        50: {
          slidesPerView: 1,
        },

        768: {
          slidesPerView: 2,
        },

        1024: {
          slidesPerView: 3,
        },

        1300: {
          slidesPerView: 3,
        },
      },
    });
  };

  if (document.querySelector('.portfolio')) {
    swiperSliderTwo();
  };

  // СЛАЙДЕР СТРАНИЦЫ "PORTFOLIO-IMAGE"
  if ($('.portfolio-image-slider').length > 0) {
    let swiperInstances = [];
    $(".portfolio-image-slider").each(function (i) {
      const $this = $(this);
      $this.addClass("slide-" + i);

      $this.parent().find(".arrow-slider_prev").addClass("p-" + i);
      $this.parent().find(".arrow-slider_next").addClass("n-" + i);

      swiperInstances[i] = new Swiper(".slide-" + i, {
        spaceBetween: 28,
        slidesPerView: 3,
        // allowTouchMove: false,
        speed: 700,
        a11y: false,
        navigation: {
          prevEl: ".p-" + i,
          nextEl: ".n-" + i,
        },
        breakpoints: {
          50: {
            slidesPerView: 1,
          },

          768: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
          },

          1300: {
            slidesPerView: 3,
          },
        },
      });
    });
  }
  // */

  /*
  function sliderPortfolio() {
    let swiperArr = [],
      sliderArr = [];

    const wrapper = document.querySelector('#portfolio-inner'),
      item = Array.from(wrapper.querySelectorAll('.portfolio-inner-slider__wrapper'));

    item.forEach((e, i) => {
      const parent = e.parentNode.parentNode;
      e.classList.add(`slider-${i}`);
      parent.querySelector('.arrow_prev').classList.add(`p-${i}`);
      parent.querySelector('.arrow_next').classList.add(`n-${i}`);

      sliderArr.push({
        wrapper: document.querySelector(`.slider-${i}`),
        arrowPrev: document.querySelector(`.p-${i}`),
        arrowNext: document.querySelector(`.n-${i}`),
      });

      swiperArr[0] = new Swiper(".slider-" + 0, {
        navigation: {
          prevEl: ".p-" + 0,
          nextEl: ".n-" + 0,
        },
        spaceBetween: 28,
        slidesPerView: 3,
        speed: 700,
        breakpoints: {
          50: {
            slidesPerView: 1,
          },

          768: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
          },

          1300: {
            slidesPerView: 3,
          },
        },
      });

    });

  }

  if (document.querySelector('#portfolio-inner')) {
    sliderPortfolio()
  }
  */
  // СЛАЙДЕРЫ НА СТРАНИЦЕ ПРОЕКТА
  function sliderProject() {
    let swiper = new Swiper('.slider-bottom', {
      spaceBetween: 10,
      slidesPerView: 4,
      speed: 700,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        320: {
          slidesPerView: 3,
        },

        768: {
          slidesPerView: 4,
        },

      },
    });

    let swiper2 = new Swiper('.slider-top', {
      spaceBetween: 10,
      speed: 700,
      navigation: {
        nextEl: '.slider-arrow_next',
        prevEl: '.slider-arrow_prev',
      },
      thumbs: {
        swiper: swiper,
      },
    });

    let swipe3 = new Swiper('.similar-projects-slider', {
      spaceBetween: 10,
      slidesPerView: 3,
      speed: 700,
      navigation: {
        nextEl: '.arrow-slider_next',
        prevEl: '.arrow-slider_prev',
      },
      breakpoints: {
        50: {
          slidesPerView: 1,
        },

        768: {
          slidesPerView: 2,
        },

        1024: {
          slidesPerView: 3,
        },

        1300: {
          slidesPerView: 3,
        },
      },
    });
  }

  if (document.querySelector('.project')) {
    sliderProject();
  }

  // ПОДКЛЮЧЕНИЕ ВСПЛЫВАЮЩЕЙ ГАЛЕРЕИ
  $('.certificates').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.certificates-slider__wrapper .certificates-slider__slide',
    getCaptionFromTitleOrAlt: false,
  });

  $('.main').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.gallery__item .gallery__link',
    getCaptionFromTitleOrAlt: false,
  });

  $('.project__content-top').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.slider-top__link',
    getCaptionFromTitleOrAlt: false,
  });

  $('.portfolio-image-slider').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.slide__link',
    getCaptionFromTitleOrAlt: false,
  });

  // ДОБАВЛЕНИЕ ОТСТУПА СПРАВА ПРИ ОТКРЫТИЕ ГАЛЕРИИ
  (() => {
    let html = document.querySelector('html'),
      body = document.querySelector('body');

    html.addEventListener('click', () => {
      if (body.classList.contains('lg-on')) {
        html.classList.add('galleryActive');
      } else {
        html.classList.remove('galleryActive');
      };
    });

    // УБИРАЕМ КЛАСС ПРИ НАЖАТИЕ НА "ESC"
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') html.classList.remove('galleryActive')
    });
  })();

  // SPOILER В БЛОКЕ КАЛЬКУЛЯТОР
  (() => {
    const acItem = document.querySelectorAll('.spoiler .js-ac-btn'),
      acText = document.querySelectorAll('.spoiler .js-ac-text');

    acText.forEach((e) => {
      e.classList.add('overflow-hidden');
    });

    acItem.forEach((e) => {
      e.addEventListener('click', () => {
        const acContent = e.nextElementSibling;

        if (acContent.style.maxHeight) {
          document.querySelectorAll('.spoiler .js-ac-text').forEach(e => (e.style.maxHeight = null));
          e.classList.remove('active');
        } else {
          document.querySelectorAll('.spoiler .js-ac-text').forEach(e => (e.style.maxHeight = null));
          acContent.style.maxHeight = acContent.scrollHeight + 'px';
          e.classList.add('active');
        }
      });
    });
  })();

  // SPOILER ФИЛЬТРА
  function spoilerFilter() {
    const btn = document.getElementById('filter-btn'),
          content = document.getElementById('filter-content'),
          label = document.querySelectorAll('.js-label');

    content.setAttribute('open', '0');

    if (content.getAttribute('open') === '0') {
      btn.addEventListener('click', e => {
        content.setAttribute('open', '1');

        const nextItem = e.currentTarget.nextElementSibling;

        if (content.style.maxHeight) {
          nextItem.style.maxHeight = null;
          e.currentTarget.classList.remove('active');
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
          e.currentTarget.classList.add('active');
        };
      });
    };
    
    label.forEach(e => {
      e.addEventListener('click', () => {
        if (content.getAttribute('open') === '1') {
          content.setAttribute('open', '0');
          content.style.maxHeight = content.scrollHeight + 75 + 'px';
        };
      });
    });

  };

  if (document.querySelector('.filter')) {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 991) {
        spoilerFilter();
      }
    })

    if (window.innerWidth <= 991) {
      spoilerFilter();
    }
  }

    
  // ТАБЫ НА СТРАНИЦЕ "PROJECT"
  function tabProject() {
    let tab = document.querySelectorAll('.js-btn'),
        tabWrapper = document.querySelector('.js-btn-wrapper'),
        tabContent = document.querySelectorAll('.js-item-content');

    function hideTabContent(a) {
      for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
      }
    }

    hideTabContent(1);

    // ДОБАВЛЕНИЕ ПЕРВЫМ ЭЛЕМЕНТАМ КЛАССЫ ACTIVE И SHOW
    function addActiveItem() {
      for (let i = 0; i < tab.length; i++) {
        let e = tab[i];
        if (i === 0) {
          e.classList.add('active');
        };
      }
      for (let i = 0; i < tabContent.length; i++) {
        let e = tabContent[i];
        if (i === 0) {
          e.classList.add('show');
        };
      }
    }

    addActiveItem()

    function showTabContent(b) {
      if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
      }
    }

    tabWrapper.addEventListener('click', function(event) {
      let target = event.target;
      if (target && target.classList.contains('js-btn')) {
        for(let i = 0; i < tab.length; i++) {
          
          if (target == tab[i]) {
            for (let a = 0; a < tab.length; a++) {
              tab[a].classList.remove('active')
            }
            tab[i].classList.add('active');
            hideTabContent(0);
            showTabContent(i);
            break;
          }
        }
      }
    });
  }

  if(document.querySelector('.project')) {
    tabProject();
  }

});
