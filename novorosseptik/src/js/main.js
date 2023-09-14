// rooms
$(function(){

  $('.slider-wrapper .slider').slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      fade: true,
      cssEase: "linear",
      prevArrow: '<span class="arrow left" style=""><svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg></span>',
      nextArrow: '<span class="arrow right" style=""><svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg></span>',
  });

  $('.slider-certific .slider').slick({
      // dots: true,
      lazyLoad: "ondemand",
      // infinite: true,
      speed: 600,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipe: true,
      // centerPadding: '50px',
      // fade: true,
      // cssEase: "linear",
      prevArrow: '.slider-certific__arrow-left',
      nextArrow: '.slider-certific__arrow-right',
      responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
            }
          },
          {
              breakpoint: 645,
              settings: {
                slidesToShow: 1,
              }
            }
      ]
  });

  $('.slider-work .slider').slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      fade: true,
      cssEase: "linear",
      prevArrow: '<span class="arrow left" style=""><svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg></span>',
      nextArrow: '<span class="arrow right" style=""><svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg></span>',
  });
  
  
  // бегущая строка
  $('.running-line__marquee').marquee({
      // direction: 'left'
      duration: 15000,
      duplicated: true,
      direction: 'left',
      startVisible: true,
      gap: '10px',
  });

  // $(function() {
  //     var marquee = $("#marquee"); 
  //     marquee.css({"overflow": "hidden", "width": "100%"});
  //     // оболочка для текста ввиде span (IE не любит дивы с inline-block)
  //     marquee.wrapInner("<span>");
  //     // marquee.find("span").css({ "width": "50%", "display": "inline-block", "text-align":"center" }); 
  //     marquee.find("span").css({ "width": "100%", "display": "inline-block", "text-align":"center" });
  //     marquee.append(marquee.find("span").clone()); // тут у нас два span с текстом
  //     marquee.wrapInner("<div>");
  //     marquee.find("div").css("width", "200%");
  //     var reset = function() {
  //         $(this).css("margin-left", "0%");
  //         $(this).animate({ "margin-left": "-100%" }, 12000, 'linear', reset);
  //     };
  //     reset.call(marquee.find("div"));
  // });
  
  // инициализация слайдера
  $('.rooms .results .slider').on('init', function(event, slick){
      let $this = $(this);
      let allSlide = $this.parents('.result').find('.all-slide');
      let curentSlide = $this.parents('.result').find('.current-slide');
      let progressBar = $this.parents('.result').find('.progress-bar-wrapper span');
      
      allSlide.text(slick.slideCount);
      curentSlide.text(1);
      progressBar.css('width', 1 * 100 / +slick.slideCount + "%")
  });

  $('.rooms .results .slider').slick({
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      arrows: false,
  });

  $('.rooms .results').slick({
      dots: false,
      infinite: false,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: false,
      fade: true,
      arrows: false,
  });

  // После переключения слайдера
  $('.rooms .results .slider').on('afterChange', function(event, slick, currentSlide){
      let $this = $(this);
      let curentSlide = $this.parents('.result').find('.current-slide');
      let progressBar = $this.parents('.result').find('.progress-bar-wrapper span');
      
      curentSlide.text(+currentSlide + 1)
      progressBar.css('width', (+currentSlide + 1) * 100 / +slick.slideCount + "%")
  });

  // Табы
  $('.rooms .tab').on('click', function(){
      $('.rooms .item-tab.active').removeClass('active');
      $(this).parent().addClass('active');
      let index = $(this).parent().index();
      $('.rooms .results').slick('slickGoTo', index)
  });  

  // Cтрелки переключения
  $('.rooms .result .arrow.next').on('click', function() {
      $(this).parents('.result').find('.slider').slick('slickNext');
  });
  $('.rooms .result .arrow.prev').on('click', function() {
      $(this).parents('.result').find('.slider').slick('slickPrev');
  });

  // Подключаем всплывающую галерею
  $('.rooms .result .slider').lightGallery({
      thumbnail: false,
      share: false,
      selector: '.slick-slide:not(.slick-cloned)',
      getCaptionFromTitleOrAlt: false
  });
});

// Стрелка прокрутка на вверх
$('.scroll-top').click(function(){
  $("html, body").animate({scrollTop: 0}, 1000);
  return false;
});

//card
;(function(){
  if (document.querySelector('.card')) {
      //	количество элементов в нижнем слайдере
      var productSliderCount = 3;
      var productSliderX;
      var productSliderY;
      //	инициализируем верхний слайдер с большим фото
      $(".slider-top").slick({
          dots: false,
          infinite: true,
          speed: 500,
          swipe: true,
          autoplay: false,
          waitForAnimate: false,
          prevArrow: '<span class="arrow left" style=""><svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg></span>',
          nextArrow: '<span class="arrow right" style=""><svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg></span>',
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
      $(".slider-bottom").slick({
          slidesToShow: productSliderCount,
          dots: false,
          infinite: false,
          swipeToSlide: true,
          speed: 500,
          autoplay: false,
          waitForAnimate: false,
          prevArrow: '<span class="arrow left slick-arrow" style=""><svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg></span>',
          nextArrow: '<span class="arrow right slick-arrow" style=""><svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg></span>',
          responsive: [
              {
                breakpoint: 970,
                settings: {
                  slidesToShow: 3,
                }
              }
          ]
      });
  
  
      //	подключаем к верхним фото всплывающие фото
      $(".slider-top").lightGallery({
          selector: '.slick-slide:not(.slick-cloned)',
          thumbnail: false,
          share: false,
          getCaptionFromTitleOrAlt: false
      });
  
      
      if(document.querySelector('.slider-bottom')){
          //	добавляем первому картинке класс 'active' для отображения рамки
          document.querySelector('.slider-bottom .slick-slide:first-child img').classList.add('active');

          document.querySelector('.slider-bottom .slick-slide').addEventListener('click', (e) => {
              e.preventDefault()
          })
      
          //	листаем верхний слайдер при клике на элементы нижнего слайдера
          var slide = document.querySelector(".slider-bottom .slick-track");
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
                      $(".slider-top").slick('slickGoTo', e.target.closest('.slick-slide').getAttribute('data-slick-index'));
                  }
              }
          }
      
          //	при листании верхнего слайдера
          //	меняем активный элемент в нижнем
          //	и, при необходимости, листаем нижний (синхронизируем слайдеры)
          $(".slider-top").on('beforeChange', function(event, slick, currentSlide, nextSlide) {
              //	убираем и добавляем классы
              document.querySelector('.slider-bottom img.active').classList.remove('active');
              $('.slider-bottom .slick-slide[data-slick-index="'+nextSlide+'"] img').addClass('active');
      
              //	проверяем, будет ли виден нижний слайд после пролистывания верхнего, если нет, крутим вручную
              if (document.querySelector('.slider-bottom .slick-slide[data-slick-index="'+nextSlide+'"]').classList.contains('slick-active') != true) {
      
                  if (currentSlide < nextSlide) {
                      if ((nextSlide - (productSliderCount - 1)) > 0) {
                          //	если листаем вправо, то нужно крутить на (количество слайдов минус один)
                          $(".slider-bottom").slick('slickGoTo', nextSlide - (productSliderCount - 1));
                      }
                  } else {
                      $(".slider-bottom").slick('slickGoTo', nextSlide);
                  }
              }
          });
      }
  }
}());

//Кастомный селект
;(function(){
  let select = $('.custom-select');
  select.on('click', function(){
      $(this).toggleClass('active');
      $(this).siblings('.custom-select__list').slideToggle()
  })
  $('.custom-select__item').on('click', function(){
      let text = $(this).text();
      $(this).parents('.custom-select__wrap').find('.custom-select__text').text(text);
      $(this).parents('.custom-select__wrap').find('input').val(text);

      $(this).parents('.custom-select__wrap').find('.custom-select').removeClass('active');
      $(this).parents('.custom-select__wrap').find('.custom-select__list').css('display', 'none');
  })
}());

//фиксированное меню, на мобиле
// ;(function(){
  
//     let header = $('.header');
//     let body = $('body');
//     $(window).scroll(function(eventData){
//         if($(window).scrollTop() > 50){
//             header.addClass('fixed');
//             body.addClass("scroll")
//         } else {
//             header.removeClass('fixed');
//             body.removeClass("scroll")
//         };
//     })
  
// }());


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
  // //spoller
  // let btn = $('#dignities-btn');
  // let listSpoller = $('.dignities .list-spoller')
  // btn.on('click', function(){
  //     let $this = $(this);
  //     $this.toggleClass('active');
  //     if ($this.hasClass('active')){
  //         $this.text('Скрыть');
  //     } else {
  //         $this.text('Ещё преимущества')
  //     }
  //     listSpoller.slideToggle();
  // })
});

// $(function(){

// });


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
$('.main').lightGallery({
  thumbnail: false,
  share: false,
  selector: '.gallery-item a',
  getCaptionFromTitleOrAlt: false
});

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