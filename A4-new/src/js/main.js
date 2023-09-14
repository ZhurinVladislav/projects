// Проверка на webp

function testWebp(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    // Добавление класса _webp или _no-webp для HTML
    testWebp(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
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
        $("html, body").animate({scrollTop: 0}, 1000);
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

// Модальное окно фото на странице проекта
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

  $('body').on('click', '[data-open]', function(e) {
          console.log('asdas')
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
  
  
// обманываем google pagespead
$(function () {
    let link = $('[data-src]');
    let linkAttr = link.attr('data-src');
    setTimeout(() => {
        link.attr('src', linkAttr)
    }, 1000);
})

});

document.addEventListener('DOMContentLoaded', () => {
  // Сетка на главной, архитектуру и интерьеры страницах
  let elem = document.querySelector('.main__container');
  let iso = new Isotope( elem, {
    itemSelector: '.main__item',
    layoutMode: 'masonry',
  });

});

$(document).on('pdopage_load', function(e, config, response) {
    let elem = document.querySelector('.main__container');
    let loading ;
    let imagesLoad = document.querySelectorAll('.main__container .main__img')
    
    imagesLoad.forEach((image, index, arr) => {
        image.addEventListener("load", () => {
            if(index == imagesLoad.length - 1) {
                
                let iso = new Isotope( elem, {
                    itemSelector: '.main__item',
                    layoutMode: 'masonry',
                });
                
            }
        })
    });

});

