$(window).scroll(function(){
    if($(this).scrollTop() >= 200){
        $('.header').addClass('scroll');
    } else {
        $('.header').removeClass('scroll');
    }
});

$('.services .owl-carousel').owlCarousel({
    autoWidth: true,
    loop: true,
    nav: true,
    dots: false,
    items: 1,
    navText: [
        '<span class="slider-arrow left" style=""><svg viewBox="0 0 7 12" ><path fill-rule="evenodd" clip-rule="evenodd" d="M0.435313 6.07396L5.76031 0.749961L6.82031 1.80996L2.56331 6.06796L6.81731 10.268L5.76331 11.335L0.435313 6.07396Z"/></svg></span>',
        '<span class="slider-arrow right" style=""><svg viewBox="0 0 7 12" ><path fill-rule="evenodd" clip-rule="evenodd" d="M0.435313 6.07396L5.76031 0.749961L6.82031 1.80996L2.56331 6.06796L6.81731 10.268L5.76331 11.335L0.435313 6.07396Z"/></svg></span>'
    ]
});









$('.header .cf-city-link, .services .services-city').on('click',function(e){
    e.preventDefault();
    showOverlay('form-citys', 'default');
});

$('.header-feedback__button').on('click', function(e){
    e.preventDefault();
    $this = $(this);
    $this.parent().toggleClass('active');
    $this.next().slideToggle();
});

$('.home-about .link-more').on('click', function(e){
    e.preventDefault();
    let $this = $(this);
    let textSpoller = $this.parents('.home-about').find('.text-spoller')
    $this.toggleClass('active');
    if($this.hasClass('active')){
        textSpoller.slideDown();
        $this.text('Скрыть');
    } else {
        textSpoller.slideUp();
        $this.text('Читать дальше...');
    }
});



$('.card .owl-carousel').owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    items: 1,
    margin: 60,
    navText: [
        '<span class="slider-arrow left" style=""><svg viewBox="0 0 7 12" ><path fill-rule="evenodd" clip-rule="evenodd" d="M0.435313 6.07396L5.76031 0.749961L6.82031 1.80996L2.56331 6.06796L6.81731 10.268L5.76331 11.335L0.435313 6.07396Z"/></svg></span>',
        '<span class="slider-arrow right" style=""><svg viewBox="0 0 7 12" ><path fill-rule="evenodd" clip-rule="evenodd" d="M0.435313 6.07396L5.76031 0.749961L6.82031 1.80996L2.56331 6.06796L6.81731 10.268L5.76331 11.335L0.435313 6.07396Z"/></svg></span>'
    ],
    responsive:{
        767:{
            items: 2
        },
        991:{
            items: 3
        },
        1280:{
            items: 4
        }
    }
});

$('.header-sort-button').on('click', function(){
    let $this = $(this);
    $this.toggleClass('active');
    $this.next('.header-sort-spoller').slideToggle();
});

$('.card .doc').lightGallery({
    thumbnail: false,
    share: false,
    selector: '.owl-item:not(.cloned) .slide',
    getCaptionFromTitleOrAlt: false
});

// Стрелка прокрутка на вверх
$('.scroll-top').click(function(){
    $("html, body").animate({scrollTop: 0}, 1000);
    return false;
});

// Поблочный скролинг
$('.card .tab').click(function(e){
    e.preventDefault();
    let $href = $(this).attr("href");
    $("html, body").animate({scrollTop: ($($href).offset().top - 80) + "px"}, 1000);
    return;
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

//overlay
function showOverlay (classname, timeout, attributes) {
    $('.' + classname).addClass('active');
    $('.overlay').addClass('active');
    $('body').addClass('overlay-active');

    setTimeout(() => {
        $('.overlay').css('opacity', '1');
        $('.overlay__content').css('transform', 'scale(1)');
    }, 10);
}

function closeOverlay() {
    $('.overlay').css('opacity', '0');
    $('.overlay__content').css('transform', 'scale(0.85)');
    setTimeout(function() {
        $('.overlay').removeClass('active');
        $('body').removeClass('overlay-active');
        $('.overlay__content>*').removeClass('active');
    }, 200);
}

$('[data-open]').on('click', function(e) {
    e.preventDefault();
    showOverlay($(this).attr('data-open'), 'default');
});

$('.overlay__close, .overlay__bg, .close').on('click', function(e) {
    e.preventDefault();
    closeOverlay();
});

//успешная отправка для modx ajax form 
$(document).on('af_complete', function(event, response) {
    if(response.success){
        closeOverlay();
        setTimeout(() => {
            showOverlay('form-success', 'default');
        },1000)
    }
});



// miniShop2.Callbacks.add('Cart.add.response.success', 'restrict_cart', function() {
//     showOverlay('form-compleat', 'default');
// });
    
window.onload = function() {
    let dataSrcList = document.querySelectorAll('[data-src]');
    if(dataSrcList){
        dataSrcList.forEach((item, index) => {
            let attr = item.getAttribute('data-src');

            setTimeout(()=>{
                item.setAttribute('src', attr);
            }, index * 200 )

        })
    }
}

$('.catalog .filter-block-button').on('click', function(e){
    e.preventDefault();
    let $this = $(this);
    $this.toggleClass('active');
    $this.next().slideToggle();
});