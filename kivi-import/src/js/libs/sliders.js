// СЛАЙДЕР В БЛОКЕ "НАШИ ПРЕИМУЩЕСТВА"
const advantagesSwiper = () => {
  if (!document.getElementById('advantages-swiper')) return;

  new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();

      const swiper = new Swiper('#advantages-swiper', {
        slidesPerView: 1,
        spaceBetween: 4,
        grabCursor: true,
        speed: 800,
        lazy: true,
        slideActiveClass: 'advantages-swiper__slide_active',
        pagination: {
          el: '#advantages-swiper-pagination',
          clickable: true,
          bulletClass: 'swiper-pagination__item',
          bulletActiveClass: 'swiper-pagination__item_active',
        },
        autoplay: {
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: true,
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
      });
    }
  }).observe(document.querySelector('#advantages-swiper'));
};

advantagesSwiper();

// СЛАЙДЕР В БЛОКЕ "НАШИ КЛИЕНТЫ"
const clientsSwiper = () => {
  if (!document.getElementById('clients-swiper')) return;

  new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();

      const swiper = new Swiper('#clients-swiper', {
        slidesPerView: 1,
        spaceBetween: 4,
        speed: 800,
        lazy: true,
        slideActiveClass: 'clients-swiper__slide_active',
        pagination: {
          el: '#clients-swiper-pagination',
          clickable: true,
          bulletClass: 'swiper-pagination__item',
          bulletActiveClass: 'swiper-pagination__item_active',
        },
        autoplay: {
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: true,
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
      });
    }
  }).observe(document.querySelector('#clients-swiper'));
};

clientsSwiper();
