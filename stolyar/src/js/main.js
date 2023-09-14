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

// МИНИПРЕЛОАДЕР
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('body').classList.add('loading');
});

// ФУНКЦИЯ УДАЛЕНИЕ ОТСТУПА У pagination, ЕСЛИ У НЕГО НЕТ ДЕТЕЙ
function removePadding() {
  const pagination = document.querySelector('.pagination'),
        paginationChild = pagination.children;

  if (paginationChild.length === 0) pagination.style.paddingTop = '0';
};

if(document.querySelector('.pagination')) {
  removePadding();
}

// Slider
function swiperSlider() {
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
      nextEl: '.arrow_next',
      prevEl: '.arrow_prev',
    },
    thumbs: {
      swiper: swiper,
    },
  });

  let swipe3 = new Swiper('.see-also-slider', {
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

if (document.querySelector('.product')) {
  swiperSlider();
}

// СЛАЙДЕР БЛОКА "CERTIFICATES"

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

// Стрелка прокрутка на вверх
$(function () {
  //Стрелка прокрутка на вверх
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      $('.scroll-top').addClass('active');
    } else {
      $('.scroll-top').removeClass('active');
    }
  });
  $('.scroll-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1000);
    return false;
  });
});

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
$('.main').lightGallery({
  thumbnail: false,
  share: false,
  selector: '.gallery__item .gallery__link',
  getCaptionFromTitleOrAlt: false,
});

// Подключаем всплывающую галерею на странице товара
$(".product .content-top__swiper").lightGallery({
  selector: '.slider-top__slide',
  thumbnail: false,
  share: false,
  getCaptionFromTitleOrAlt: false
});

// FAQ
$(function () {
  //tab
  // const tabItem = $('.faq .faq__item');
  const tab = $('.faq .faq__tab');
  tab.on('click', function () {
    let $this = $(this);
    $this.toggleClass('active');
    $this.parents('.faq__item').toggleClass('active');
    $this.next('.spoller-content').slideToggle();
  });
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
