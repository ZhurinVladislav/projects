// Проверка на webp
import * as flsFunctions from "./libs/functions.js";

flsFunctions.isWebp();
// End

// import $ from "jquery";

//.products, .rates на десктопе
$(".products").find(".products__link")
    .mouseenter(function() {
        $(this).find('.subtitle').slideDown(200, 'linear', function() {
            $(this).addClass('hover')
        });
    })
    .mouseleave(function(){     
        $(this).find('.subtitle').slideUp(100, 'linear', function() {
            $(this).removeClass('hover')  
        });
    });

$(".rates").find(".rates__link")
.mouseenter(function() {
    $(this).find('.subtitle').slideDown(200, 'linear', function() {
        $(this).addClass('hover')
    });
})
.mouseleave(function(){     
    $(this).find('.subtitle').slideUp(100, 'linear', function() {
        $(this).removeClass('hover')  
    });
});

//.products, .rates на мобиле
$(".products .rates").find(".button-more").on('click', function() {

    let $this = $(this);
    $this.toggleClass('active');

    if($this.hasClass('active')) {
        $this.parents('.item').find('.subtitle').slideDown(200, 'linear', function() {
            $(this).addClass('hover')
        });
        $this.text('скрыть описание');
    } else {
        $this.parents('.item').find('.subtitle').slideUp(100, 'linear', function() {
            $(this).removeClass('hover')
        });
        $this.text('показать описание')
    }
})

$('.slider-wrapper .slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    fade: true,
    cssEase: "linear",
    prevArrow: '.main-arrow-left',
    nextArrow: '.main-arrow-right',
});

(function(){
    if (document.querySelector('.slide-content__slider')) {
        //	количество элементов в нижнем слайдере
        var productSliderCount = 3;
        var productSliderX;
        var productSliderY;
        //	инициализируем верхний слайдер с большим фото
        $(".slider-left__top").slick({
            dots: false,
            infinite: true,
            speed: 500,
            swipe: true,
            autoplay: false,
            waitForAnimate: false,
            prevArrow: '<span class="arrow left" style=""><svg><use xlink:href="/app/img//icons/icons.svg#arrow-slider"></use></svg></span>',
            nextArrow: '<span class="arrow right" style=""><svg><use xlink:href="/app/img//icons/icons.svg#arrow-slider"></use></svg></span>',
            responsive: [
                {
                  breakpoint: 970,
                  settings: {
                    //prevArrow: '',
                    //nextArrow: ''
                  }
                }
            ]
        });
    
        //	инициализируем нижний слайдер с маленькими фото
        $(".slider-left__bottom").slick({
            slidesToShow: productSliderCount,
            dots: false,
            infinite: false,
            swipeToSlide: true,
            speed: 500,
            autoplay: false,
            waitForAnimate: false,
            slidesToShow: 4,
            arrows: false,
            responsive: [
                {
                  breakpoint: 970,
                  settings: {
                    slidesToShow: 3,
                  }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });        
    
    
        //	подключаем к верхним фото всплывающие фото
        // $(".slider-left__top").lightGallery({
        //     selector: '.slick-slide:not(.slick-cloned)',
        //     thumbnail: false,
        //     share: false,
        //     getCaptionFromTitleOrAlt: false
        // });
    
        
        if(document.querySelector('.slider-left__bottom')){
            //	добавляем первому картинке класс 'active' для отображения рамки
            document.querySelector('.slider-left__bottom .slick-slide:first-child img').classList.add('active');

            document.querySelector('.slider-left__bottom .slick-slide').addEventListener('click', (e) => {
                e.preventDefault()
            })
        
            //	листаем верхний слайдер при клике на элементы нижнего слайдера
            // var slide = document.querySelector(".slider-left__bottom");
            var slide = document.querySelector(".slider-wrapper .slider");
            
            slide.onmousedown = function(e) {
                //	если кликнули по картинке, а не по обёртке, записываем текущие координаты мыши
                if (e.target.tagName == 'IMG') {
                    productSliderX = e.screenX;
                    productSliderY = e.screenY;
                }
            }
            slide.onmouseup = function(e) {
                if (e.target.tagName == 'IMG') {
                //	если при клике курсор сдвинулся не больше, чем на 10px
                    if (e.screenX < productSliderX + 10 &&
                        e.screenX > productSliderX - 10 &&
                        e.screenY < productSliderY + 10 &&
                        e.screenY > productSliderY - 10) {
                        //	листаем верхний слайдер до выбранного элемента
                        $(".slider-left__top").slick('slickGoTo', e.target.closest('.slick-slide').getAttribute('data-slick-index'));
                    }
                }
            }
        
            //	при листании верхнего слайдера
            //	меняем активный элемент в нижнем
            //	и, при необходимости, листаем нижний (синхронизируем слайдеры)
            $(".slider-left__top").on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                //	убираем и добавляем классы
                document.querySelector('.slider-left__bottom img.active').classList.remove('active');
                $('.slider-left__bottom .slick-slide[data-slick-index="'+nextSlide+'"] img').addClass('active');
        
                //	проверяем, будет ли виден нижний слайд после пролистывания верхнего, если нет, крутим вручную
                if (document.querySelector('.slider-left__bottom .slick-slide[data-slick-index="'+nextSlide+'"]').classList.contains('slick-active') != true) {
        
                    if (currentSlide < nextSlide) {
                        if ((nextSlide - (productSliderCount - 1)) > 0) {
                            //	если листаем вправо, то нужно крутить на (количество слайдов минус один)
                            $(".slider-left__bottom").slick('slickGoTo', nextSlide - (productSliderCount - 1));
                        }
                    } else {
                        $(".slider-left__bottom").slick('slickGoTo', nextSlide);
                    }
                }
            });
        }
    }
}());

// Слайдер на странице товара
(function(){
    if (document.querySelector('.catalog-slider')) {
        //	количество элементов в нижнем слайдере
        var productSliderCount = 3;
        var productSliderX;
        var productSliderY;
        //	инициализируем верхний слайдер с большим фото
        $(".catalog-slider__top").slick({
            dots: false,
            infinite: true,
            speed: 500,
            swipe: true,
            autoplay: false,
            waitForAnimate: false,
            prevArrow: '<span class="arrow left" style=""><svg><use xlink:href="/app/img//icons/icons.svg#arrow-slider"></use></svg></span>',
            nextArrow: '<span class="arrow right" style=""><svg><use xlink:href="/app/img//icons/icons.svg#arrow-slider"></use></svg></span>',
            responsive: [
                {
                  breakpoint: 970,
                  settings: {
                    //prevArrow: '',
                    //nextArrow: ''
                  }
                }
            ]
        });
    
        //	инициализируем нижний слайдер с маленькими фото
        $(".catalog-slider__bottom").slick({
            slidesToShow: productSliderCount,
            dots: false,
            infinite: false,
            swipeToSlide: true,
            speed: 500,
            autoplay: false,
            waitForAnimate: false,
            slidesToShow: 4,
            arrows: false,
            responsive: [
                {
                  breakpoint: 970,
                  settings: {
                    slidesToShow: 3,
                  }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });        
        
        if(document.querySelector('.catalog-slider__bottom')){
            //	добавляем первому картинке класс 'active' для отображения рамки
            document.querySelector('.catalog-slider__bottom .slick-slide:first-child img').classList.add('active');

            document.querySelector('.catalog-slider__bottom .slick-slide').addEventListener('click', (e) => {
                e.preventDefault()
            })
        
            //	листаем верхний слайдер при клике на элементы нижнего слайдера
            var slide = document.querySelector(".catalog-slider__bottom");
            
            slide.onmousedown = function(e) {
                //	если кликнули по картинке, а не по обёртке, записываем текущие координаты мыши
                if (e.target.tagName == 'IMG') {
                    productSliderX = e.screenX;
                    productSliderY = e.screenY;
                }
            }
            slide.onmouseup = function(e) {
                if (e.target.tagName == 'IMG') {
                //	если при клике курсор сдвинулся не больше, чем на 10px
                    if (e.screenX < productSliderX + 10 &&
                        e.screenX > productSliderX - 10 &&
                        e.screenY < productSliderY + 10 &&
                        e.screenY > productSliderY - 10) {
                        //	листаем верхний слайдер до выбранного элемента
                        $(".catalog-slider__top").slick('slickGoTo', e.target.closest('.slick-slide').getAttribute('data-slick-index'));
                    }
                }
            }
        
            //	при листании верхнего слайдера
            //	меняем активный элемент в нижнем
            //	и, при необходимости, листаем нижний (синхронизируем слайдеры)
            $(".catalog-slider__top").on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                //	убираем и добавляем классы
                document.querySelector('.catalog-slider__bottom img.active').classList.remove('active');
                $('.catalog-slider__bottom .slick-slide[data-slick-index="'+nextSlide+'"] img').addClass('active');
        
                //	проверяем, будет ли виден нижний слайд после пролистывания верхнего, если нет, крутим вручную
                if (document.querySelector('.catalog-slider__bottom .slick-slide[data-slick-index="'+nextSlide+'"]').classList.contains('slick-active') != true) {
        
                    if (currentSlide < nextSlide) {
                        if ((nextSlide - (productSliderCount - 1)) > 0) {
                            //	если листаем вправо, то нужно крутить на (количество слайдов минус один)
                            $(".catalog-slider__bottom").slick('slickGoTo', nextSlide - (productSliderCount - 1));
                        }
                    } else {
                        $(".catalog-slider__bottom").slick('slickGoTo', nextSlide);
                    }
                }
            });
        }
    }
}());

// Табы на товарах
$('.tab .tab__item').on('click', function(){
    let $this = $(this);
    let index = $this.index();
    
    $('.tab .tab__item.active').removeClass('active');
    $('.tab .tab__content-item.active').removeClass('active');

    $this.addClass('active');
    $('.tab .tab__content-item').eq(index).addClass('active');
});

// Стрелка прокрутка на вверх
$('.scroll-top').click(function(){
  $("html, body").animate({scrollTop: 0}, 1000);
  return false;
});

// Преимущества
$(function(){
  //tab
  let tab = $('.faq .faq__tab');
  tab.on('click', function(){
      let $this = $(this);
      $this.toggleClass('active');
      $this.next('.faq__spoller').slideToggle();
  });

  let tabTwo = $('.service-main .service-main__tab');
  tabTwo.on('click', function(){
      let $this = $(this);
      let $parent = $this.parents('.service-main__item');
      if($parent.hasClass('active')) {
          $parent.find('.service-main__spoller').slideUp();
          setTimeout(function(){
              $parent.removeClass('active');
          },300)
      } else {
          $parent.find('.service-main__spoller').slideDown();
          setTimeout(function(){
              $parent.addClass('active');
          },300)
      }
      
      
  });
  //spoller
  let btn = $('#dignities-btn');
  let listSpoller = $('.dignities .list-spoller')
  btn.on('click', function(){
      let $this = $(this);
      $this.toggleClass('active');
      if ($this.hasClass('active')){
          $this.text('Скрыть');
      } else {
          $this.text('Ещё преимущества')
      }
      listSpoller.slideToggle();
  })
});

$('.card__item .slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    fade: true,
    cssEase: "linear",
    prevArrow: '<span class="card__btn-left arrow left"><svg><use xlink:href="/app/img//icons/icons.svg#arrow-slider"></use></svg></span>',
    nextArrow: '<span class="card__btn-right arrow right"><svg><use xlink:href="/app/img//icons/icons.svg#arrow-slider"></use></svg></span>',
});

///// Мобильное меню
$(function(){
  let menuToggle = $('.menu__toggle');
  let menu = $('.menu-mobile');
  let header = $('.header');

  let close = $('.menu-mobile .close');
  let flag = false;

  menuToggle.on('click', function(){
      $(this).toggleClass('active');
      $('html,body').toggleClass('menu-open');
      header.toggleClass("menu-open");
      
      if(flag){
          menu.removeClass("active");
          setTimeout(function () {
              menu.removeClass("display");
          }, 300)
          flag = false
      } else {
          menu.addClass("display");
          setTimeout(function () {
              menu.addClass("active");
          }, 20)
          flag = true
      }
  })


  close.on('click',function(e){
      menuToggle.removeClass('active');
      $('body').removeClass('menu-open');
      header.removeClass("menu-open");

      menu.removeClass("active");
      setTimeout(function () {
          menu.removeClass("display");
      }, 300)
      flag = false
  })

  $('.menu-mobile .menu-item.parent').on('click',function(){
      let $this = $(this);
      $this.toggleClass('open')
      $this.children('ul').slideToggle()
  })

});

/// Подключаем всплывающую галерею
// $('.main').lightGallery({
//   thumbnail: false,
//   share: false,
//   selector: '.gallery-item a',
//   getCaptionFromTitleOrAlt: false
// });

$(".catalog__filter .catalog__list-title").click(function() {
    $('.catalog__list-title').toggleClass('active');
    $('.catalog__list').slideToggle(300);
})

//overlay
$(function(){

  function showOverlay (classname, timeout, attributes) {
      $('.' + classname).addClass('active');
      $('.overlay').addClass('active');
      $('html, body').addClass('overlay-active');
      $('body').addClass('overlay-' + classname);

      //  так как свойство 'display', которое меняется с этим классом не анимируется
      //  делаем задержку в 5мс
      setTimeout(function() {
          $('.overlay').css('opacity', '1');
          $('.overlay__content').css('transform', 'scale(1)');
      }, 5); 
  }

  //  Закрывает все активные всплывающие окна
  function closeOverlay() {
      $('.overlay').css('opacity', '0');
      $('.overlay__content').css('transform', 'scale(.8)');
      setTimeout(function() {
          $('.overlay').removeClass('active');
          $('html, body').removeClass('overlay-active');
          $('.overlay__content>*').removeClass('active');

          $('.form-reviews .reviews-block').innerHTML = "";
          //let formReviewsText = document.querySelector('.form-reviews .reviews-block');
      }, 200);
  }

  $('[data-open]').on('click', function(e) {
      var target = $(this)[0];
      var attributes = e.target.attributes;
      if($(this).hasClass('close-open-form')){
          closeOverlay();
          setTimeout(() => {
              showOverlay($(this).attr('data-open'), 'default');
          },1000)
      }

      showOverlay($(this).attr('data-open'), 'default');
  });

  //  Вызов функции closeOverlay() при клике на крестик или фон всплывающего окна
  $('.overlay__close, .overlay__bg, .close').on('click', function(e) {
      e.preventDefault();
      closeOverlay();
  });

  //успешная отправка для modx ajax form 
  $(document).on('af_complete', function(event, response) {
      closeOverlay();
      setTimeout(() => {
          showOverlay('form-success', 'default');
      },1000)
  });

  //showOverlay('form-success', 'default');

  // miniShop2.Callbacks.add('Cart.add.response.success', 'restrict_cart', function() {
  //     showOverlay('form-compleat', 'default');
  // });
  
});

/// Отправка форм
(function(){
  let submitButtons = document.querySelectorAll('button.submit');

  /// novalid если не прошла валидацию запрещаем отправку
  for(let submitButton of submitButtons){
      submitButton.addEventListener('click', function(event){
          let target =event.target;
          if(target.classList.contains('submit')){
              let formNovalid = target.closest('.novalid');
              if(formNovalid){
                  event.preventDefault();
              }
          }
      })
  }
}());

//Убираем фокус с инпута
(function(){
  $('input, textarea').change(function(){
      if($(this).val()){
          $(this).addClass('focus')
      } else {
          $(this).removeClass('focus')
      }
  })
}());