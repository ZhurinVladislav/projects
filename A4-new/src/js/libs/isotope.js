document.addEventListener('DOMContentLoaded', () => {
  // Сетка на главной, архитектуру и интерьеры страницах
  let elem = document.querySelector('.main__container');
  let iso = new Isotope( elem, {
    itemSelector: '.main__item',
    layoutMode: 'masonry',
  });

  console.log('asd')

});
