//ФИКСИРОВАННАЯ ШАПКА ПРИ СКРОЛЛЕ
// document.addEventListener('DOMContentLoaded', function () {
//   (() => {
//     const main = document.getElementById('main').classList;

//     // Сразу создаём переменные
//     let header = document.getElementById('header').classList,
//         active_class = "header_active",
//         active_class_main = "main_active";

//     // Слушаем событие прокрутки
//     window.addEventListener('scroll', e => {
//       if(pageYOffset > 20) {
//         header.add(active_class); 
//         main.add(active_class_main);
//       } else {
//         header.remove(active_class)
//         main.remove(active_class_main);
//       };
//     });
    
//   })();
// });

// ОТКРЫТИЕ ВСПЛЫВАЮЩЕГО СПИСКА В МОБ. МЕНЮ
function openList() {
  const parentItem = document.querySelectorAll('.item__btn'),
        listInner = document.querySelectorAll('.parent .list');

  let searchActive = 0;
  let arrLength;


  listInner.forEach((e) => {
    e.classList.add('overflow-hidden');
  });

  for (let i = 0; i < listInner.length; i++) {
    const el = listInner[i],
          elChild = el.children;
    
    for (let i = 0; i < elChild.length; i++) {
      let parent = elChild[i].parentNode;
      const arrow  = parent.previousElementSibling;

      arrLength = elChild.length;

      if (elChild[i].classList.contains('active')) {
        document.querySelectorAll('.list').forEach((e) => (e.style.maxHeight = null));
        parent.style.maxHeight = 'max-content';
        arrow.classList.add('active');
      }
    };
  };

  parentItem.forEach(e => {

    e.addEventListener('click', () => {
      const acContent = e.nextElementSibling;
      
      if (acContent.style.maxHeight) {
        document.querySelectorAll('.list').forEach((e) => (e.style.maxHeight = null));
        e.classList.remove('active');
      } else {
        document.querySelectorAll('.list').forEach((e) => (e.style.maxHeight = null));
        acContent.style.maxHeight = acContent.scrollHeight + 'px';
        e.classList.add('active');
      }

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

// ФУНКЦИЯ УДАЛЕНИЕ ОТСТУПА У PAGINATION, ЕСЛИ У НЕГО НЕТ ДЕТЕЙ
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
  const swiper = new Swiper('.projects-slider', {
    spaceBetween: 28,
    slidesPerView: 3,
    speed: 700,
    loop: true,
    navigation: {
      nextEl: '.projects__swiper-wrapper .arrow_next',
      prevEl: '.projects__swiper-wrapper .arrow_prev',
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

if (document.querySelector('.projects')) {
  swiperSlider();
}

// МОБИЛЬНОЕ МЕНЮ
function burgerMenu() {
  const burgerBtn = document.getElementById('burger-toggle'),
        burgerMenu = document.getElementById('burger-menu'),
        header = document.getElementById('header'),
        html = document.querySelector('html'),
        body = document.querySelector('body');

  // ОТКРЫТИЕ И ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('menu-toggle_active');
    burgerMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
    html.classList.toggle('menu-open');
    header.classList.toggle('menu-active');
  });

  // ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ КНОПКОЙ "ESC"
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      burgerBtn.classList.remove('menu-toggle_active');
      burgerMenu.classList.remove('active');
      body.classList.remove('menu-open');
      html.classList.remove('menu-open');
      header.classList.remove('menu-active');
    }
  });
}
burgerMenu();

// ПОДКЛЮЧАЕМ ВСПЛЫВАЮЩУЮ ГАЛЕРЕЮ
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


// АНИМАЦИЯ
// gsap.registerPlugin(ScrollTrigger, SmoothScroll)

// if (ScrollTrigger.isTouch !== 1) {

// 	SmoothScroll({
// 			// Время скролла 400 = 0.4 секунды
// 			animationTime    : 800,
// 			// Размер шага в пикселях 
// 			stepSize         : 50,

// 			// Дополнительные настройки:
// 			// Ускорение 
// 			accelerationDelta : 30,  
// 			// Максимальное ускорение
// 			accelerationMax   : 2,   

// 			// Поддержка клавиатуры
// 			keyboardSupport   : true,  
// 			// Шаг скролла стрелками на клавиатуре в пикселях
// 			arrowScroll       : 50,

// 			// Pulse (less tweakable)
// 			// ratio of "tail" to "acceleration"
// 			pulseAlgorithm   : true,
// 			pulseScale       : 4,
// 			pulseNormalize   : 1,

// 			// Поддержка тачпада
// 			touchpadSupport   : true,
// 	})
// };

function lightGallery() {
  let html = document.querySelector('html'),
      body = document.querySelector('body');

  html.addEventListener('click', () => {
    if (body.classList.contains('lg-on')) {
      html.classList.add('galleryActive');
    } else {
      html.classList.remove('galleryActive');
    };
  });
};

lightGallery();
