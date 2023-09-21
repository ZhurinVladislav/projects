document.addEventListener('DOMContentLoaded', () => {

  // ОТКРЫТИЕ ВСПЛЫВАЮЩЕГО СПИСКА В МОБ. МЕНЮ
  (() => {
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
          document.querySelectorAll('.list').forEach(e => (e.style.maxHeight = null));
          e.classList.remove('active');
        } else {
          document.querySelectorAll('.list').forEach(e => (e.style.maxHeight = null));
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
  function removePadding() {
    const pagination = document.querySelector('.pagination'),
          paginationChild = pagination.children;

    if (paginationChild.length === 0) pagination.style.paddingTop = '0';
  };

  if(document.querySelector('.pagination')) {
    removePadding();
  }

  // СЛАЙДЕР БЛОКА "PROJECTS"
  function swiperSliderOne() {
    const swiper = new Swiper('.projects-slider', {
      spaceBetween: 28,
      slidesPerView: 3,
      speed: 700,
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
    swiperSliderOne();
  }

  // СЛАЙДЕР БЛОКА "PORTFOLIO"
  function swiperSliderTwo() {
    const swiper = new Swiper('.portfolio-slider', {
      spaceBetween: 28,
      slidesPerView: 3,
      speed: 700,
      allowTouchMove: false,
      navigation: {
        nextEl: '.portfolio__swiper-wrapper .arrow_next',
        prevEl: '.portfolio__swiper-wrapper .arrow_prev',
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

  if (document.querySelector('.portfolio')) {
    swiperSliderTwo();
  }

  // СЛАЙДЕР СТРАНИЦЫ "PORTFOLIO"
// /*
  if ($('.portfolio-inner-slider').length > 0) {
    let swiperInstances = [];
    $(".portfolio-inner-slider").each(function(index){
      const $this = $(this);
      // console.log($this);
      $this.addClass("instance-" + index);
      $this.parent().find(".swiper-pagination").addClass("pagination-" + index);

      $this.parent().find(".arrow_prev").addClass("prev-" + index);
      $this.parent().find(".arrow_next").addClass("next-" + index);
      
      swiperInstances[index] = new Swiper(".instance-" + index, {
        navigation: {
          prevEl: ".prev-" + index,
          nextEl: ".next-" + index,
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
      console.log(swiperInstances);
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

  });
  
}

if (document.querySelector('#portfolio-inner')) {
  sliderPortfolio()
}
*/

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
        nextEl: '.arrow_next',
        prevEl: '.arrow_prev',
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
          slidesPerView: 3,
        },
      },
    });
  }

  if (document.querySelector('.project')) {
    sliderProject();
  }

  // МОБИЛЬНОЕ МЕНЮ
  (() => {
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
  })();

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
          content = document.getElementById('filter-content');
    
    btn.addEventListener('click', e => {
      const nextItem = e.currentTarget.nextElementSibling;

      if (content.style.maxHeight) {
        nextItem.style.maxHeight = null
        e.currentTarget.classList.remove('active');
      } else {
        nextItem.style.maxHeight = null
        content.style.maxHeight = content.scrollHeight + 'px';
        e.currentTarget.classList.add('active');
      }
    })
  }

  if (document.querySelector('.filter')) {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 991) {
        spoilerFilter()
      }
    })
  
    if (window.innerWidth <= 991) {
      spoilerFilter()
    }
  }

});
