// Модальное окно iframe на странице проекта
$(function(){

    $(function () {
        let btn = $('[data-frame-load]');
        let iframe = $('[data-src]');
        let iframeAttr = iframe.attr('data-src');
        
        console.log(iframeAttr)
        
        if (iframeAttr === '') {
            btn.css('display', 'none')
        }
    
        btn.on('click', function(){
            iframe.attr('src', iframeAttr)
        })
    })
    
      function showOverlay (classname, timeout, attributes) {
          $('.' + classname).addClass('active');
          $('.overlay-iframe').addClass('active');
          $('html, body').addClass('overlay-iframe-active');
          $('body').addClass('overlay-iframe-' + classname);
    
          //  так как свойство 'display', которое меняется с этим классом не анимируется
          //  делаем задержку в 5мс
          setTimeout(function() {
              $('.overlay-iframe').css('opacity', '1');
              $('.overlay-iframe__content').css('transform', 'scale(1)');
          }, 5); 
      }
    
      //  Закрывает все активные всплывающие окна
      function closeOverlay() {
          $('.overlay-iframe').css('opacity', '0');
          $('.overlay-iframe__content').css('transform', 'scale(.8)');
          setTimeout(function() {
              $('.overlay-iframe').removeClass('active');
              $('html, body').removeClass('overlay-iframe-active');
              $('.overlay-iframe__content>*').removeClass('active');
    
              $('.form-reviews .reviews-block').innerHTML = "";
          }, 200);
      }
    
    //   console.log(data-frame-load)
    
      $('[data-frame-load]').on('click', function(e) {
          var target = $(this)[0];
          var attributes = e.target.attributes;
          if($(this).hasClass('close-open-form')){
              closeOverlay();
              setTimeout(() => {
                  showOverlay($(this).attr('data-frame-load'), 'default');
              },1000)
          }
    
          showOverlay($(this).attr('data-frame-load'), 'default');
      });
    
      //  Вызов функции closeOverlay() при клике на крестик или фон всплывающего окна
      $('.overlay-iframe__close, .overlay-iframe__bg, .close').on('click', function(e) {
          e.preventDefault();
          closeOverlay();
      });
    
    });