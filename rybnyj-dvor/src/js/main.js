// МИНИПРЕЛОАДЕР
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('body').classList.add('loading');
});

// СКРОЛЛ В БЛОКЕ КАРТЫ
function scroll() {
  const blockFinish = document.querySelector('.content-wrapp__map');

  const tabWrapper = document.querySelector('.content__list');

  
  function offset(el) {
      let rect = el.getBoundingClientRect(),
          scroll,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      scroll = (rect.top + scrollTop) - 50;
      

      return scroll;
  }

  tabWrapper.addEventListener('click', function(event) {
    window.scrollTo({
      top: offset(blockFinish),
      left: 0,
      behavior: 'smooth',
    });
  })
  
};

if(document.querySelector('.content-wrapp__map')) {
  scroll();
};

// ОТКРЫТИЕ ВСПЛЫВАЮЩЕГО СПИСКА В МОБ. МЕНЮ
function openList() {
  const parentItem = document.querySelectorAll('.arrow-list-mob'),
        listInner = document.querySelectorAll('.menu-list__inner');

  for (let i = 0; i < listInner.length; i++) {
    const el = listInner[i],
          elChild = el.children;
    
    for (let i = 0; i < elChild.length; i++) {
      let parent = elChild[i].parentNode;
      const arrow  = parent.previousElementSibling;

      if (elChild[i].classList.contains('active')) {
        parent.classList.add('active');
        arrow.classList.add('active');
      };
    };
  };

  parentItem.forEach(e => {
    e.addEventListener('click', () => {
      const acContent = e.nextElementSibling;

      if(acContent.classList.contains('active')) {
        acContent.classList.remove('active');
        e.classList.remove('active');
      } else {
        acContent.classList.add('active');
        e.classList.add('active');
      }

      // if (acContent.style.maxHeight) {
      //   document.querySelectorAll('.menu-list__inner').forEach(e => (e.style.maxHeight = null));
      //   e.classList.remove('active');
      // } else {
      //   document.querySelectorAll('.menu-list__inner').forEach(e => (e.style.maxHeight = null));
      //   acContent.style.maxHeight = acContent.scrollHeight + 'px';
      //   e.classList.add('active');
      // }
    });
  });
};
openList();

// СТРЕЛКА ПРОКРУТКИ НА ВВЕРХ
function scrollTop() {
  const burgerMenu = document.getElementById('scrollTop');

  const btnUp = {
    el: burgerMenu,
    show() {
      // удалим у кнопки класс active
      this.el.classList.remove('scroll-top_active');
    },
    hide() {
      // добавим к кнопке класс active
      this.el.classList.add('scroll-top_active');
    },
    addEventListener() {
      // при прокрутке содержимого страницы
      window.addEventListener('scroll', () => {
        // определяем величину прокрутки
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
        scrollY > 400 ? this.show() : this.hide();
      });
      // при нажатии на кнопку
      burgerMenu.onclick = () => {
        // переместим в начало страницы
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      };
    },
  };

  btnUp.addEventListener();
}
scrollTop();

// ТАБЫ В СЕКЦИИ "CONTACTS"
function tabMap() {
  let tab = document.querySelectorAll('.btn'),
      tabWrapper = document.querySelector('.content__list'),
      tabContent = document.querySelectorAll('.map__item');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
      
    }
  }

  tabWrapper.addEventListener('click', function(event) {
    let target = event.target;
    if (target && target.classList.contains('btn')) {
      // target.classList.add('active');
      for(let i = 0; i < tab.length; i++) {
        
        if (target == tab[i]) {
          // console.log(tab[i]);
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

if(document.querySelector('.contacts')) {
  tabMap();
}

// ФУНКЦИЯ УДАЛЕНИЕ ОТСТУПА У pagination, ЕСЛИ У НЕГО НЕТ ДЕТЕЙ
function removePadding() {
  const pagination = document.querySelector('.pagination'),
        paginationChild = pagination.children;

  if (paginationChild.length === 0) pagination.style.paddingTop = '0';
};

if(document.querySelector('.pagination')) {
  removePadding();
}

// СЛАЙДЕР БЛОКА "CERTIFICATES"
function swiperSlider() {
  const swiper = new Swiper('.certificates-slider', {
    spaceBetween: 10,
    slidesPerView: 4,
    speed: 700,
    navigation: {
      nextEl: '.arrow_next',
      prevEl: '.arrow_prev',
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
        slidesPerView: 4,
      },
    },
  });
}
if (document.querySelector('.certificates')) {
  swiperSlider();
}

function openMenu() {
  const btn = document.querySelector('#btnMenu');
  const listMenu = document.querySelector('#scroll-item');
  console.log(btn);
  btn.addEventListener('click', () => {
    btn.classList.toggle('btn_active');

    if (btn.classList.contains('btn_active')) {
      listMenu.classList.add('list_active');
    } else {
      listMenu.classList.remove('list_active');
    }
  });
}
if (document.querySelector('.services-inner')) {
  openMenu();
}

// Мобильное меню
$(function () {
  let menuToggle = $('.menu__toggle');
  let menu = $('.menu-mobile');
  let header = $('.header');

  let close = $('.menu-mobile .close');
  let flag = false;

  menuToggle.on('click', function () {
    menuToggle.toggleClass('active');
    $('html,body').toggleClass('menu-open');

    if (flag) {
      menu.removeClass('active');
      setTimeout(function () {
        menu.removeClass('display');
      }, 300);
      flag = false;
    } else {
      menu.addClass('display');
      setTimeout(function () {
        menu.addClass('active');
      }, 20);
      flag = true;
    }
  });

  close.on('click', function (e) {
    menuToggle.removeClass('active');
    $('html,body').removeClass('menu-open');
    header.removeClass('menu-open');

    menu.removeClass('active');
    setTimeout(function () {
      menu.removeClass('display');
    }, 300);
    flag = false;
  });
});

// Подключаем всплывающую галерею
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

//overlay
$(function () {
  function showOverlay(classname, timeout, attributes) {
    $('.' + classname).addClass('active');
    $('.overlay').addClass('active');
    $('html, body').addClass('overlay-active');
    $('body').addClass('overlay-' + classname);

    //  так как свойство 'display', которое меняется с этим классом не анимируется
    //  делаем задержку в 5мс
    setTimeout(function () {
      $('.overlay').css('opacity', '1');
      $('.overlay__content').css('transform', 'scale(1)');
    }, 5);
  }

  //  Закрывает все активные всплывающие окна
  function closeOverlay() {
    $('.overlay').css('opacity', '0');
    $('.overlay__content').css('transform', 'scale(.8)');
    setTimeout(function () {
      $('.overlay').removeClass('active');
      $('html, body').removeClass('overlay-active');
      $('.overlay__content>*').removeClass('active');

      $('.form-reviews .reviews-block').innerHTML = '';
    }, 200);
  }

  $('[data-open]').on('click', function (e) {
    var target = $(this)[0];
    var attributes = e.target.attributes;
    if ($(this).hasClass('close-open-form')) {
      closeOverlay();
      setTimeout(() => {
        showOverlay($(this).attr('data-open'), 'default');
      }, 1000);
    }

    showOverlay($(this).attr('data-open'), 'default');
  });

  //  Вызов функции closeOverlay() при клике на крестик или фон всплывающего окна
  $('.overlay__close, .overlay__bg, .close').on('click', function (e) {
    e.preventDefault();
    closeOverlay();
  });

  //успешная отправка для modx ajax form
  $(document).on('af_complete', function (event, response) {
    closeOverlay();
    setTimeout(() => {
      showOverlay('form-success', 'default');
    }, 1000);
  });
});

/// Отправка форм
(function () {
  let submitButtons = document.querySelectorAll('button.submit');

  /// novalid если не прошла валидацию запрещаем отправку
  for (let submitButton of submitButtons) {
    submitButton.addEventListener('click', function (event) {
      let target = event.target;
      if (target.classList.contains('submit')) {
        let formNovalid = target.closest('.novalid');
        if (formNovalid) {
          event.preventDefault();
        }
      }
    });
  }
})();

//Убираем фокус с инпута
(function () {
  $('input, textarea').change(function () {
    if ($(this).val()) {
      $(this).addClass('focus');
    } else {
      $(this).removeClass('focus');
    }
  });
})();
