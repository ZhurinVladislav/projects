'use strict';

const scrollActiveElements = Array.from(document.querySelectorAll('[data-scroll]'));

const scrollActive = () => {
  for (let i = 0; i < scrollActiveElements.length; i++) {
    const elementСoord = scrollActiveElements[i].getBoundingClientRect().top + scrollY; // координаты секции
    const scrollCoord = window.scrollY; // текущая прокрутка
    let distance = 0;
    const positionTop = +scrollActiveElements[i].getAttribute('data-scroll'); // Значение атрибута data-scroll. Расстояние до секции в пикселя. Принимает значения как положительные так и отрицательные

    if (positionTop) distance = positionTop;

    if (scrollCoord >= elementСoord - distance) {
      const event = new CustomEvent('scrolled', { bubbles: true });

      scrollActiveElements[i].classList.add('animation-resolve');
      scrollActiveElements[i].dispatchEvent(event);
      scrollActiveElements.splice(i, 1);
    }

    if (!scrollActiveElements.length) window.removeEventListener('scroll', scrollActive);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (scrollActiveElements.length) {
    scrollActive(); // вызываем для первого блока, когда страница еще не прокручена
    window.addEventListener('scroll', scrollActive);
  }

  document.querySelectorAll('[data-animations]').forEach(element => {
    element.classList.add('animation-resolve');
  });
});
