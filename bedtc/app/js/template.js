

// Мобильное меню
$(function(){
    let menuToggle = $('.menu__toggle');
    let menu = $('.menu-mobie');
    let header = $('.header');
    let close = $('.menu-mobie .close');
    let toggler = false;

    function openMenu () {
        $('html,body').addClass('menu-open');
        menuToggle.addClass('active');
        header.addClass("menu-open");
        menu.addClass("display");
        setTimeout(() => {menu.addClass("active")}, 20)
    }
    function closeMenu () {
        $('html,body').removeClass('menu-open');
        menuToggle.removeClass('active');
        header.removeClass("menu-open");
        menu.removeClass("active")
        setTimeout(() => {menu.removeClass("display")}, 300)
    }

    menuToggle.on('click', function(){
        if(toggler){
            closeMenu()
            toggler = false
        } else {
            openMenu()
            toggler = true
        }
    })
    close.on('click',function(e){
        closeMenu ()
        toggler = false
    })
});

// споллер на заработать на просмотре
$(function(){
    $('.account-viewing .rightnow-link-more').on('click', function(){
        let $this = $(this);
        let text = $this.find('.rightnow-link-more__text')

        $this.toggleClass('active')
        $this.parents('.rightnow').find('.spoller').slideToggle();
        if($this.hasClass('active')){
            text.text('скрыть')
        } else {
            text.text('подробней')
        }
    })
})

// споллер на faq
$(function(){
    $('.faq .item-title').on('click', function(){
        let $this = $(this);

        $this.toggleClass('active')
        $this.next('.item-block').slideToggle();
    })
})

//Убираем фокус с инпута
$(function(){
    $('input, textarea').change(function(){
        if($(this).val()){
            $(this).addClass('focus')
        } else {
            $(this).removeClass('focus')
        }
    })
});

// форма регистрации
$(function(){
    let eye = $('.eye');
    let toggler = true;
    let hint = $('.hint')
    eye.on('click', function(event){
        event.preventDefault();
        if(toggler){
            $(this).parent('.input-wrap').children('input').attr('type', 'text');
            toggler = false;
        } else {
            $(this).parent('.input-wrap').children('input').attr('type', 'password');
            toggler = true;
        }
    })

    hint.on('click',function(event){
        event.preventDefault();
    })
})

//aside
$(function(){
    let button = $('.aside-menu__arrow, .menu2-arrow');
    button.on('click', function(){
        $(this).parent().toggleClass('open')
        $(this).parent().children('ul').slideToggle()
    })
})

//overlay
$(function(){
    function showOverlay (classname, timeout, attributes) {
        $('.' + classname).addClass('active');
        $('.overlay').addClass('active');
        $('html, body').addClass('overlay-active');
        $('body').addClass('overlay-' + classname);

        setTimeout(function() {
            $('.overlay').css('opacity', '1');
            $('.overlay__content').css('transform', 'scale(1)');
        }, 5); 
    }
    function closeOverlay() {
        $('.overlay').css('opacity', '0');
        $('.overlay__content').css('transform', 'scale(.8)');
        setTimeout(function() {
            $('.overlay').removeClass('active');
            $('html, body').removeClass('overlay-active');
            $('.overlay__content>*').removeClass('active');
        }, 200);
    }

    $('[data-open]').on('click', function(e) {
        if($(this).hasClass('close-open-form')){
            closeOverlay();
            setTimeout(() => {
                showOverlay($(this).attr('data-open'), 'default');
            },1000)
        }

        showOverlay($(this).attr('data-open'), 'default');
    });
    $('.overlay__close, .overlay__bg').on('click', function(e) {
        e.preventDefault();
        closeOverlay();
    });
    //showOverlay('form-success', 'default');
});