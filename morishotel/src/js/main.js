// Проверка на webp
// import * as flsFunctions from "./libs/functions.js";

// flsFunctions.isWebp();
// End

// gallery
// $(function(){
//     const status = $('.arrow-wrapper__pagination');
//     const slickElement = $('.gallery .slider');
//     slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
//         let i = (currentSlide ? currentSlide : 0) + 1;
//         status.text(i + '/' + slick.slideCount);
//     });

//     $('.gallery .slider').slick({
//         useTransform: true,
//         lazyLoad: "ondemand",
//         infinite: true,
//         speed: 600,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         variableWidth: true,
//         swipe: true,
//         cssEase: "linear",
//         prevArrow: '.gallery__slider-wrapper .arrow-wrapper__left',
//         nextArrow: '.gallery__slider-wrapper .arrow-wrapper__right',
//         responsive: [
//             {
//                 breakpoint: 700,
//                 settings: {
//                   variableWidth: false,
//                 }
//               }
//         ]
//     });
//     // let firstSlide = $(`[data-slick-index="2"]`);
//     // firstSlide.addClass('active')
//     if(window.innerWidth >= 1438){
//         let firstSlide = $(`[data-slick-index="2"]`);
//         firstSlide.addClass('active')
//     } else if (window.innerWidth >= 700) {
//         let firstSlide = $(`[data-slick-index="1"]`);
//         firstSlide.addClass('active')
//     } else {
//         let firstSlide = $(`[data-slick-index="0"]`);
//         firstSlide.addClass('active')
//     }

//     if(window.innerWidth >= 1438){
//         $('.gallery .slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
//             let current = currentSlide + 2;
//             let next = nextSlide + 2;

//             // console.log(slick.slideCount);

//             let sumSlide = currentSlide + 1;

//             let slideActive = $(`[data-slick-index="${next}"]`)

//             // console.log($(`[data-slick-index="${next + 1}"]`));

//             if (sumSlide >= slick.slideCount) {
//                 // slideActive.addClass('transformSlider');
//                 console.log(nextSlide);
//             }

//             // console.log(currentSlide);

//             $(`[data-slick-index="${current}"]`).removeClass('active');
//             $(`[data-slick-index="${next + 2}"]`).removeClass('active');
//             $(`[data-slick-index="${next}"]`).addClass('active');
//         });
//    } else if (window.innerWidth >= 700) {
//         $('.gallery .slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
//             let current = currentSlide + 1;
//             let next = nextSlide + 1;
//             $(`[data-slick-index="${current}"]`).removeClass('active');
//             $(`[data-slick-index="${next + 1}"]`).removeClass('active');
//             $(`[data-slick-index="${next}"]`).addClass('active');
//         });
//     } else {
//         $('.gallery .slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
//             let current = currentSlide;
//             let next = nextSlide ;
//             $(`[data-slick-index="${current}"]`).removeClass('active');
//             $(`[data-slick-index="${next + 1}"]`).removeClass('active');
//             $(`[data-slick-index="${next}"]`).addClass('active');
//         });
//     }

//     // $('.gallery .slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
//     //     let current = currentSlide + 2;
//     //     let next = nextSlide + 2;
//     //     $(`[data-slick-index="${current}"]`).removeClass('active');
//     //     $(`[data-slick-index="${next + 2}"]`).removeClass('active');
//     //     $(`[data-slick-index="${next}"]`).addClass('active');
//     // });
// });

// rooms
$(function(){

    // инициализация слайдера
    $('.rooms .slider-wrapper .slider').slick({
        lazyLoad: "ondemand",
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        cssEase: "linear",
        prevArrow: false,
        nextArrow: false,
        // variableWidth: true,
        // variableHeight: false,
    });

    $('.rooms .content-right').slick({
        dots: false,
        adaptiveHeight: true,
        infinite: false,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false,
        fade: true,
        arrows: false,
    });
    
    $(".room__list .slider-wrapper .slider").slick({
        centerMode: false,
        dots: false,
        infinite: true,
        swipeToSlide: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button class="arrow-wrapper__left arrow"><svg class="arrow__left-svg svg-reset"><use xlink:href="/app/img/icons/icons.svg#arrow-slider"></use></svg></button>',
        nextArrow: '<button class="arrow-wrapper__right arrow"><svg class="arrow__right-svg svg-reset"><use xlink:href="/app/img/icons/icons.svg#arrow-slider"></use></svg></button>'
    });

    // Подключаем всплывающую галерею
    $('.room__list .slider-wrapper .slider').lightGallery({
        thumbnail: false,
        share: false,
        selector: '.slick-slide:not(.slick-cloned)',
        getCaptionFromTitleOrAlt: false
    });

    // Табы
    $('.rooms .list__btn').on('click', function(){
        $('.rooms .list__btn.active').removeClass('active');
        $(this).addClass('active');
        
        let index = $(this).parent().index();
        $('.rooms .content-right').slick('slickGoTo', index)
    });  

    // Cтрелки переключения
    $('.rooms .arrow-wrapper__left').on('click', function() {
        $(this).parents('.slider-wrapper').find('.slider').slick('slickPrev');
    });
    $('.rooms .arrow-wrapper__right').on('click', function() {
        $(this).parents('.slider-wrapper').find('.slider').slick('slickNext');
    });

    // Подключаем всплывающую галерею
    $('.rooms .slider-wrapper .slider').lightGallery({
        thumbnail: false,
        share: false,
        selector: '.slick-slide:not(.slick-cloned)',
        getCaptionFromTitleOrAlt: false
    });
});


// Табы на страницы товара мобильная версия
$('.list__link-arrow-mob').on('click', function(){
    let $this = $(this);
    $this.toggleClass('active-mob');
    $this.parents('.content__list .list__item').find('.list-inner').toggleClass('active');
});

// Стрелка прокрутка на вверх
$(function(){
    //Стрелка прокрутка на вверх
    $(window).scroll(function(){
        if($(window).scrollTop() > 300){
            $('.scroll-top').addClass('active')
        } else {
            $('.scroll-top').removeClass('active')
        };
    })
    $('.scroll-top').click(function(){
        $("html, body").animate({scrollTop: 0}, 60);
        return false;
    });
});

// Мобильное меню
$(function(){
    let menuToggle = $('.menu__toggle');
    let menu = $('.menu-mobile');
    let header = $('.header');

    let close = $('.menu-mobile .close');
    let flag = false;

    menuToggle.on('click', function(){
        menuToggle.toggleClass('active');
        $('html,body').toggleClass('menu-open');
        //header.toggleClass("menu-open");
        
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
        $('html,body').removeClass('menu-open');
        header.removeClass("menu-open");

        menu.removeClass("active");
        setTimeout(function () {
            menu.removeClass("display");
        }, 300)
        flag = false
    })


    $('.menu-mobile .menu-item.parent .arrow-list-mob').on('click',function(){
        let $this = $(this);
        $this.next('ul').toggleClass('display')
        // $this.parents('.menu-item').children('.menu-list__inner').toggleClass('active')
    })

    $('.menu-mobile .menu-item.parent .menu-list__inner .menu-item.parent .arrow-list-mob').on('click',function(){
        let $this = $(this);
        console.log($this);
        // $this.next('ul').toggleClass('open')
        // $this.parents('.menu-item').toggleClass('active')
        $this.next('ul').toggleClass('open')
    })

});

/// Подключаем всплывающую галерею
// $('.main').lightGallery({
//   thumbnail: false,
//   share: false,
//   selector: '.gallery-item a',
//   getCaptionFromTitleOrAlt: false
// });

$('.main').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.gallery__item .gallery__link',
    getCaptionFromTitleOrAlt: false,
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
