"use strict"

let srollActiveElements = Array.from(document.querySelectorAll('[data-scroll]'));

document.addEventListener("DOMContentLoaded", function() {
	if(srollActiveElements.length){
		scrollActive(); // вызываем для первого блока, когда страница еще не прокручена
		window.addEventListener('scroll', scrollActive);
	}
});

function scrollActive() {
	for(let i = 0; i < srollActiveElements.length; i++){
		let elementСoord = srollActiveElements[i].getBoundingClientRect().top + pageYOffset; //координаты секции
		let scrollCoord = window.pageYOffset; //текущаяя прокрутка
		let distanse = 0;

		/*
			Значение атрибута data-scroll
			Растояние до секции в пикселя 
			Принимает значения как положительные так и отрицательные
		*/
		let positionTop = +srollActiveElements[i].getAttribute('data-scroll'); 
		if(positionTop){
			distanse = positionTop;
		}

		if(scrollCoord >= elementСoord - distanse){
			srollActiveElements[i].classList.add('scrolled');
			var event = new CustomEvent('scrolled', { bubbles: true });
			srollActiveElements[i].dispatchEvent(event);
			srollActiveElements.splice(i, 1);
			
		}
		if (!srollActiveElements.length) {
			window.removeEventListener('scroll', scrollActive);
		}
	}
}



