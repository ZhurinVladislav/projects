"use strict"

let srollActiveElements = Array.from(document.querySelectorAll('[data-scroll]'));

document.addEventListener("DOMContentLoaded", function() {
	if(srollActiveElements.length){
		scrollActive(); // вызываем для первого блока, когда страница еще не прокручена
		window.addEventListener('scroll', scrollActive);
	}

	if (document.querySelector('.text-default')) {
		animateText();
	}
});

function scrollActive() {
	for(let i = 0; i < srollActiveElements.length; i++){
		let elementСoord = srollActiveElements[i].getBoundingClientRect().top + pageYOffset, // координаты секции
				scrollCoord = window.pageYOffset, // текущая прокрутка
		 		distanse = 0,
				positionTop = +srollActiveElements[i].getAttribute('data-scroll'); // Значение атрибута data-scroll. Расстояние до секции в пикселя. Принимает значения как положительные так и отрицательные
				
		if(positionTop){
			distanse = positionTop;
		}

		if(scrollCoord >= elementСoord - distanse){
			srollActiveElements[i].classList.add('animation-resolve');
			let event = new CustomEvent('scrolled', { bubbles: true });
			srollActiveElements[i].dispatchEvent(event);
			srollActiveElements.splice(i, 1);
		}
		if (!srollActiveElements.length) {
			window.removeEventListener('scroll', scrollActive);
		}
	}
}

