/*!

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

https://github.com/htmlpluscss/

*/

( () => {

	window.addEventListener("load", () => {

		localStorage.setItem('fastLoadScript', true);

		document.documentElement.style.setProperty('--transitionDefault', '.3s');

	});

	// обработчик анимаций
	window.cssAnimation = a=>{let b,c,d=document.createElement("cssanimation");switch(a){case'animation':b={"animation":"animationend","OAnimation":"oAnimationEnd","MozAnimation":"animationend","WebkitAnimation":"webkitAnimationEnd"};break;case'transition':b={"transition":"transitionend","OTransition":"oTransitionEnd","MozTransition":"transitionend","WebkitTransition":"webkitTransitionEnd"}}for(c in b)if(d.style[c]!==undefined)return b[c]}

	// Determine if an element is in the visible viewport
	window.isInViewport = el => {
		const rect = el.getBoundingClientRect();
		return (rect.top >= 0 && rect.bottom <= window.innerHeight);
	}

})();
( items => {

	if(!items.length) {

		return;

	}

	[...items].forEach( accordion => {

		let animateOn = false,
			activeItem = null;

		const items = accordion.querySelectorAll('.accordion__item');

		[...items].forEach( item => {

			const btn = item.querySelector('.accordion__btn'),
				  head = item.querySelector('.accordion__head'),
				  body = item.querySelector('.accordion__body'),
				  arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");

			arrow.setAttributeNS(null, "viewBox", "0 0 24 24");
			arrow.setAttributeNS(null, "width", 24);
			arrow.setAttributeNS(null, "height", 24);
			arrow.innerHTML = '<line x1="19" x2="19" y1="7" y2="17"/><line x1="14" x2="24" y1="12" y2="12"/>';

			head.append(arrow);

			btn.addEventListener('click', () => {

				animateOn = true;

				if( item === activeItem ){

					item.classList.remove('is-open');
					activeItem = null;

				} else {

					activeItem = item;

					[...items].forEach( el => el.classList.toggle('is-open', el === item));

				}

			});

			body.addEventListener(window.cssAnimation('transition'), () => {

				if(animateOn && activeItem && !window.isInViewport(head)){

					head.scrollIntoView({ behavior: 'smooth' });

				}

				animateOn = false;

			});

		});

	});

})(document.querySelectorAll('.accordion'));
( forms => {

	//reCaptcha v3

	const PUBLIC_KEY = '6LdjubYiAAAAAJCJFaBWu5DDvJWUxBrApeqJF_WC';

	const reCaptcha = () => {

		[...forms].forEach( form => {

			form.removeEventListener('input', reCaptcha);

		});

		const script = document.createElement('script');

		script.src = 'https://www.google.com/recaptcha/api.js?render=' + PUBLIC_KEY;

		document.head.appendChild(script);

	}

	// utm

	const searchParams = new URLSearchParams(location.search);

	[...forms].forEach( form => {

		// url

		if ( form.elements.url ) {

			form.elements.url.value = location.search;

		}

		form.addEventListener('input', reCaptcha);

		form.addEventListener('change', ()=> {

			form.classList.toggle('not-rule', form.querySelectorAll('.checkbox__input').length !== form.querySelectorAll('.checkbox__input:checked').length);

		});

		form.addEventListener('submit', event => {

			event.preventDefault();

			if (typeof(grecaptcha) === 'undefined') {

				alert('Error! Google reCaptcha');

			} else {

				grecaptcha.ready( () => {

					grecaptcha.execute(PUBLIC_KEY).then( token => {

						let goal = null;

						const formData = new FormData(form),
							  btn = form.querySelector('.form__submit');

						formData.append('g_recaptcha_response', token);

						// utm && goal

						searchParams.forEach( (value, key) => {

							if ( key.includes('utm') ) {

								formData.append(key, value);

							}

							if ( key.includes('goal') ) {

								formData.append(key, value);

								goal = value;

							}

						});

						btn.disabled = true;

						fetch(form.getAttribute('action'), {
							method: 'POST',
							body: formData
						})
						.then(response => response.json())
						.then(result => {

							console.log(result);

							btn.disabled = false;

							if ( form.classList.contains('contact__form') ) {

								form.querySelector('.contact__form-done').classList.remove('hide');
								return;

							}

							document.querySelector('.modal-done__title').innerHTML = result.title;
							document.querySelector('.modal-done__message').innerHTML = result.message;

							document.querySelectorAll('.modal-done__ico svg')[0].classList.toggle('hide', result.status !== 'ok');
							document.querySelectorAll('.modal-done__ico svg')[1].classList.toggle('hide', result.status === 'ok');

							const eventModalShow = new CustomEvent("modalShow", {
								detail: {
									selector: "done"
								}
							});

							modal.dispatchEvent(eventModalShow);

							form.reset();

							if ( goal ) {

								ym(91004279,'reachGoal',goal);

							}

						});

					});

				});

			}

		});

	});

})(document.querySelectorAll('.form'));
( elems => {

	if(!elems.length) {

		return;

	}

	const script = document.createElement('script');
	script.src = '/js/inputmask.min.js';
	script.onload = () => {

		[...elems].forEach( el => {

			let maskInput;

			if(el.classList.contains('inputmask--phone')) {

				maskInput = new Inputmask({
					mask: el.getAttribute('data-mask'),
					placeholder: '0'
				});

			}

			maskInput.mask(el);

		});

	};

	setTimeout( () => document.head.appendChild(script), localStorage.getItem('fastLoadScript') ? 0 : 10000);

})(document.querySelectorAll('.inputmask'));
( modal => {

	if(!modal) {

		return;

	}

	const items = modal.querySelectorAll('.modal__item'),
		  btns = document.querySelectorAll('[data-modal]'),
		  wrapper = document.querySelector('.wrapper'),
		  modalForm = document.querySelector('#modal-form'),
		  modalTitle = document.querySelector('#modal-title'),
		  titleDefault = modalTitle.innerHTML;

	let activeModal = null,
		windowScroll = window.pageYOffset;

	modal.addEventListener('hide', () => {

		document.body.classList.remove('modal-show');
		wrapper.style.top = 0;
		window.scrollTo(0,windowScroll);
		activeModal = false;

		window.requestAnimationFrame( () => document.documentElement.classList.remove('scroll-behavior-off'), 500);

		document.querySelector('#modal-video').innerHTML = '';

	});

	modal.addEventListener('keyup', event => {

		if(event.key === "Escape") {

			modal.dispatchEvent(new Event("hide"));

		}

	});

	const modalShow = (selector,title) => {

		if(!activeModal){

			windowScroll = window.pageYOffset;

		}

		if ( title ) {

			modalTitle.textContent = title;
			modalForm.elements.subject.value = title.trim();

		} else {

			modalTitle.innerHTML = titleDefault;
			modalForm.elements.subject.value = modalTitle.textContent.trim();

		}

		activeModal = modal.querySelector('.modal__item--' + selector);

		[...items].forEach( el => el.classList.toggle('visuallyhidden', el !== activeModal) );

		document.documentElement.classList.add('scroll-behavior-off');

		window.requestAnimationFrame( () => {

			wrapper.style.top = -windowScroll + 'px';
			document.body.classList.add('modal-show');
			window.scrollTo(0,0);

			activeModal.focus();

		});

	};

	modal.addEventListener('click', event => {

		if( event.target.classList.contains('modal') || event.target.closest('.modal__close')){

			modal.dispatchEvent(new Event("hide"));

		}

	});

	document.addEventListener('click', event => {

		let target = event.target;

		while (target !== document && target !== null) {

			if (target.hasAttribute('data-modal')) {

				modalShow(target.getAttribute('data-modal'), target.getAttribute('data-title'));

			}

			target = target.parentNode;

		}

	});

	modal.addEventListener('modalShow', event => modalShow(event.detail.selector));

})(document.querySelector('.modal'));
( elements => {

	if(elements.length === 0) {

		return;

	}

	[...elements].forEach( dropdown => {

		const mask = dropdown.querySelector('.phone-country__mask'),
			  code = dropdown.querySelector('.phone-country__code'),
			  flag = dropdown.querySelector('.phone-country__toggle-flag'),
			  item = dropdown.querySelectorAll('.phone-country__item');

		[...item].forEach( btn => {

			btn.addEventListener("click", () => {

				let placeholder = btn.getAttribute('data-mask');
				placeholder = placeholder.replace(/\\9/g, '$');
				placeholder = placeholder.replace(/9/g, '0');
				placeholder = placeholder.replace(/\$/g, '9');

				mask.setAttribute('placeholder', placeholder);
				mask.value = '';

				Inputmask(btn.getAttribute('data-mask')).mask(mask);

				let maskInput;

				maskInput = new Inputmask({
					mask: btn.getAttribute('data-mask'),
					placeholder: '0'
				});

				maskInput.mask(mask);

				mask.focus();

				code.value = btn.getAttribute('data-code');

				flag.innerHTML = btn.querySelector('.phone-country__item-flag').innerHTML;

			});

		});

	});

	window.addEventListener("click", event => {

		const isDropdown = event.target.closest('.phone-country__toggle') ? event.target.closest('.phone-country') : null;

		[...elements].forEach( dropdown => {

			dropdown.classList.toggle('is-open', dropdown === isDropdown && isDropdown.classList.contains('is-open') === false );

		});

	});

})(document.querySelectorAll('.phone-country'));
( links => {

	if ( links.length ) {

		const searchParams = new URLSearchParams(location.search),
			  start = searchParams.get('start');

		if ( start !== null ) {

			[...links].forEach( link => {

				if ( link.href.includes('start') === false ) {

					link.href = link.href + '?start=' + start;

				}

			});

		}

	}

})(document.querySelectorAll('.set-url-param'));
( youtube => {

	if( youtube.length ) {

		const modalBox = document.querySelector('#modal-video');

		[...youtube].forEach( link => {

			const id = link.getAttribute('data-youtube');

			link.addEventListener('click', event => {

				event.preventDefault();

				const iframe = document.createElement('iframe');

				iframe.setAttribute('allowfullscreen', '');
				iframe.setAttribute('allow', 'autoplay');
				iframe.setAttribute('src', 'https://www.youtube.com/embed/' + id + '?rel=0&showinfo=0&autoplay=1');

				modalBox.appendChild(iframe);

				const eventModalShow = new CustomEvent("modalShow", {
					detail: {
						selector: "video"
					}
				});

				window.modal.dispatchEvent(eventModalShow);

			});

		});

	}

})(document.querySelectorAll('[data-youtube]'));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzLmpzIiwiYWNjb3JkaW9uLmpzIiwiZm9ybS5qcyIsImlucHV0bWFzay5qcyIsIm1vZGFsLmpzIiwicGhvbmUtY291bnRyeS5qcyIsIlVSTFNlYXJjaFBhcmFtcy5qcyIsInlvdXR1YmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG5cclxuwqkga292cmlnaW5cclxu0JLRgdC1INC/0YDQsNCy0LAg0YDQsNC30YDQtdGI0LXQvdGLXHJcbtC60YDQsNGB0LjQstGL0Lkg0LTQuNC30LDQudC9INC00L7Qu9C20LXQvSDQuNC80LXRgtGMINC60YDQsNGB0LjQstGL0Lkg0LrQvtC0wq5cclxuXHJcbmh0dHBzOi8vZ2l0aHViLmNvbS9odG1scGx1c2Nzcy9cclxuXHJcbiovXHJcblxyXG4oICgpID0+IHtcclxuXHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuXHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmFzdExvYWRTY3JpcHQnLCB0cnVlKTtcclxuXHJcblx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdHJhbnNpdGlvbkRlZmF1bHQnLCAnLjNzJyk7XHJcblxyXG5cdH0pO1xyXG5cclxuXHQvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQsNC90LjQvNCw0YbQuNC5XHJcblx0d2luZG93LmNzc0FuaW1hdGlvbiA9IGE9PntsZXQgYixjLGQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNzc2FuaW1hdGlvblwiKTtzd2l0Y2goYSl7Y2FzZSdhbmltYXRpb24nOmI9e1wiYW5pbWF0aW9uXCI6XCJhbmltYXRpb25lbmRcIixcIk9BbmltYXRpb25cIjpcIm9BbmltYXRpb25FbmRcIixcIk1vekFuaW1hdGlvblwiOlwiYW5pbWF0aW9uZW5kXCIsXCJXZWJraXRBbmltYXRpb25cIjpcIndlYmtpdEFuaW1hdGlvbkVuZFwifTticmVhaztjYXNlJ3RyYW5zaXRpb24nOmI9e1widHJhbnNpdGlvblwiOlwidHJhbnNpdGlvbmVuZFwiLFwiT1RyYW5zaXRpb25cIjpcIm9UcmFuc2l0aW9uRW5kXCIsXCJNb3pUcmFuc2l0aW9uXCI6XCJ0cmFuc2l0aW9uZW5kXCIsXCJXZWJraXRUcmFuc2l0aW9uXCI6XCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCJ9fWZvcihjIGluIGIpaWYoZC5zdHlsZVtjXSE9PXVuZGVmaW5lZClyZXR1cm4gYltjXX1cclxuXHJcblx0Ly8gRGV0ZXJtaW5lIGlmIGFuIGVsZW1lbnQgaXMgaW4gdGhlIHZpc2libGUgdmlld3BvcnRcclxuXHR3aW5kb3cuaXNJblZpZXdwb3J0ID0gZWwgPT4ge1xyXG5cdFx0Y29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0cmV0dXJuIChyZWN0LnRvcCA+PSAwICYmIHJlY3QuYm90dG9tIDw9IHdpbmRvdy5pbm5lckhlaWdodCk7XHJcblx0fVxyXG5cclxufSkoKTsiLCIoIGl0ZW1zID0+IHtcclxuXHJcblx0aWYoIWl0ZW1zLmxlbmd0aCkge1xyXG5cclxuXHRcdHJldHVybjtcclxuXHJcblx0fVxyXG5cclxuXHRbLi4uaXRlbXNdLmZvckVhY2goIGFjY29yZGlvbiA9PiB7XHJcblxyXG5cdFx0bGV0IGFuaW1hdGVPbiA9IGZhbHNlLFxyXG5cdFx0XHRhY3RpdmVJdGVtID0gbnVsbDtcclxuXHJcblx0XHRjb25zdCBpdGVtcyA9IGFjY29yZGlvbi5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX19pdGVtJyk7XHJcblxyXG5cdFx0Wy4uLml0ZW1zXS5mb3JFYWNoKCBpdGVtID0+IHtcclxuXHJcblx0XHRcdGNvbnN0IGJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9fYnRuJyksXHJcblx0XHRcdFx0ICBoZWFkID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19oZWFkJyksXHJcblx0XHRcdFx0ICBib2R5ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19ib2R5JyksXHJcblx0XHRcdFx0ICBhcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cclxuXHRcdFx0YXJyb3cuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ2aWV3Qm94XCIsIFwiMCAwIDI0IDI0XCIpO1xyXG5cdFx0XHRhcnJvdy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcIndpZHRoXCIsIDI0KTtcclxuXHRcdFx0YXJyb3cuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJoZWlnaHRcIiwgMjQpO1xyXG5cdFx0XHRhcnJvdy5pbm5lckhUTUwgPSAnPGxpbmUgeDE9XCIxOVwiIHgyPVwiMTlcIiB5MT1cIjdcIiB5Mj1cIjE3XCIvPjxsaW5lIHgxPVwiMTRcIiB4Mj1cIjI0XCIgeTE9XCIxMlwiIHkyPVwiMTJcIi8+JztcclxuXHJcblx0XHRcdGhlYWQuYXBwZW5kKGFycm93KTtcclxuXHJcblx0XHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHJcblx0XHRcdFx0YW5pbWF0ZU9uID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0aWYoIGl0ZW0gPT09IGFjdGl2ZUl0ZW0gKXtcclxuXHJcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcclxuXHRcdFx0XHRcdGFjdGl2ZUl0ZW0gPSBudWxsO1xyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdGFjdGl2ZUl0ZW0gPSBpdGVtO1xyXG5cclxuXHRcdFx0XHRcdFsuLi5pdGVtc10uZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtb3BlbicsIGVsID09PSBpdGVtKSk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ym9keS5hZGRFdmVudExpc3RlbmVyKHdpbmRvdy5jc3NBbmltYXRpb24oJ3RyYW5zaXRpb24nKSwgKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRpZihhbmltYXRlT24gJiYgYWN0aXZlSXRlbSAmJiAhd2luZG93LmlzSW5WaWV3cG9ydChoZWFkKSl7XHJcblxyXG5cdFx0XHRcdFx0aGVhZC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhbmltYXRlT24gPSBmYWxzZTtcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb24nKSk7IiwiKCBmb3JtcyA9PiB7XHJcblxyXG5cdC8vcmVDYXB0Y2hhIHYzXHJcblxyXG5cdGNvbnN0IFBVQkxJQ19LRVkgPSAnNkxkanViWWlBQUFBQUpDSkZhQld1NUREdkpXVXhCckFwZXFKRl9XQyc7XHJcblxyXG5cdGNvbnN0IHJlQ2FwdGNoYSA9ICgpID0+IHtcclxuXHJcblx0XHRbLi4uZm9ybXNdLmZvckVhY2goIGZvcm0gPT4ge1xyXG5cclxuXHRcdFx0Zm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHJlQ2FwdGNoYSk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblxyXG5cdFx0c2NyaXB0LnNyYyA9ICdodHRwczovL3d3dy5nb29nbGUuY29tL3JlY2FwdGNoYS9hcGkuanM/cmVuZGVyPScgKyBQVUJMSUNfS0VZO1xyXG5cclxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuXHJcblx0fVxyXG5cclxuXHQvLyB1dG1cclxuXHJcblx0Y29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuXHRbLi4uZm9ybXNdLmZvckVhY2goIGZvcm0gPT4ge1xyXG5cclxuXHRcdC8vIHVybFxyXG5cclxuXHRcdGlmICggZm9ybS5lbGVtZW50cy51cmwgKSB7XHJcblxyXG5cdFx0XHRmb3JtLmVsZW1lbnRzLnVybC52YWx1ZSA9IGxvY2F0aW9uLnNlYXJjaDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHJlQ2FwdGNoYSk7XHJcblxyXG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKT0+IHtcclxuXHJcblx0XHRcdGZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnbm90LXJ1bGUnLCBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja2JveF9faW5wdXQnKS5sZW5ndGggIT09IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrYm94X19pbnB1dDpjaGVja2VkJykubGVuZ3RoKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mKGdyZWNhcHRjaGEpID09PSAndW5kZWZpbmVkJykge1xyXG5cclxuXHRcdFx0XHRhbGVydCgnRXJyb3IhIEdvb2dsZSByZUNhcHRjaGEnKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGdyZWNhcHRjaGEucmVhZHkoICgpID0+IHtcclxuXHJcblx0XHRcdFx0XHRncmVjYXB0Y2hhLmV4ZWN1dGUoUFVCTElDX0tFWSkudGhlbiggdG9rZW4gPT4ge1xyXG5cclxuXHRcdFx0XHRcdFx0bGV0IGdvYWwgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRcdFx0Y29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSksXHJcblx0XHRcdFx0XHRcdFx0ICBidG4gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19zdWJtaXQnKTtcclxuXHJcblx0XHRcdFx0XHRcdGZvcm1EYXRhLmFwcGVuZCgnZ19yZWNhcHRjaGFfcmVzcG9uc2UnLCB0b2tlbik7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyB1dG0gJiYgZ29hbFxyXG5cclxuXHRcdFx0XHRcdFx0c2VhcmNoUGFyYW1zLmZvckVhY2goICh2YWx1ZSwga2V5KSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmICgga2V5LmluY2x1ZGVzKCd1dG0nKSApIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCBrZXkuaW5jbHVkZXMoJ2dvYWwnKSApIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Z29hbCA9IHZhbHVlO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0XHRmZXRjaChmb3JtLmdldEF0dHJpYnV0ZSgnYWN0aW9uJyksIHtcclxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0XHRcdFx0XHRib2R5OiBmb3JtRGF0YVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcblx0XHRcdFx0XHRcdC50aGVuKHJlc3VsdCA9PiB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoIGZvcm0uY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250YWN0X19mb3JtJykgKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Zm9ybS5xdWVyeVNlbGVjdG9yKCcuY29udGFjdF9fZm9ybS1kb25lJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1kb25lX190aXRsZScpLmlubmVySFRNTCA9IHJlc3VsdC50aXRsZTtcclxuXHRcdFx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtZG9uZV9fbWVzc2FnZScpLmlubmVySFRNTCA9IHJlc3VsdC5tZXNzYWdlO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwtZG9uZV9faWNvIHN2ZycpWzBdLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnLCByZXN1bHQuc3RhdHVzICE9PSAnb2snKTtcclxuXHRcdFx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwtZG9uZV9faWNvIHN2ZycpWzFdLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnLCByZXN1bHQuc3RhdHVzID09PSAnb2snKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Y29uc3QgZXZlbnRNb2RhbFNob3cgPSBuZXcgQ3VzdG9tRXZlbnQoXCJtb2RhbFNob3dcIiwge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGV0YWlsOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdG9yOiBcImRvbmVcIlxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRtb2RhbC5kaXNwYXRjaEV2ZW50KGV2ZW50TW9kYWxTaG93KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Zm9ybS5yZXNldCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoIGdvYWwgKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0eW0oOTEwMDQyNzksJ3JlYWNoR29hbCcsZ29hbCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9KTtcclxuXHJcblx0fSk7XHJcblxyXG59KShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybScpKTsiLCIoIGVsZW1zID0+IHtcclxuXHJcblx0aWYoIWVsZW1zLmxlbmd0aCkge1xyXG5cclxuXHRcdHJldHVybjtcclxuXHJcblx0fVxyXG5cclxuXHRjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHRzY3JpcHQuc3JjID0gJy9qcy9pbnB1dG1hc2subWluLmpzJztcclxuXHRzY3JpcHQub25sb2FkID0gKCkgPT4ge1xyXG5cclxuXHRcdFsuLi5lbGVtc10uZm9yRWFjaCggZWwgPT4ge1xyXG5cclxuXHRcdFx0bGV0IG1hc2tJbnB1dDtcclxuXHJcblx0XHRcdGlmKGVsLmNsYXNzTGlzdC5jb250YWlucygnaW5wdXRtYXNrLS1waG9uZScpKSB7XHJcblxyXG5cdFx0XHRcdG1hc2tJbnB1dCA9IG5ldyBJbnB1dG1hc2soe1xyXG5cdFx0XHRcdFx0bWFzazogZWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1hc2snKSxcclxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyOiAnMCdcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG1hc2tJbnB1dC5tYXNrKGVsKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0c2V0VGltZW91dCggKCkgPT4gZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmFzdExvYWRTY3JpcHQnKSA/IDAgOiAxMDAwMCk7XHJcblxyXG59KShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5wdXRtYXNrJykpOyIsIiggbW9kYWwgPT4ge1xyXG5cclxuXHRpZighbW9kYWwpIHtcclxuXHJcblx0XHRyZXR1cm47XHJcblxyXG5cdH1cclxuXHJcblx0Y29uc3QgaXRlbXMgPSBtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWxfX2l0ZW0nKSxcclxuXHRcdCAgYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsXScpLFxyXG5cdFx0ICB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKSxcclxuXHRcdCAgbW9kYWxGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsLWZvcm0nKSxcclxuXHRcdCAgbW9kYWxUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC10aXRsZScpLFxyXG5cdFx0ICB0aXRsZURlZmF1bHQgPSBtb2RhbFRpdGxlLmlubmVySFRNTDtcclxuXHJcblx0bGV0IGFjdGl2ZU1vZGFsID0gbnVsbCxcclxuXHRcdHdpbmRvd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcblx0bW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignaGlkZScsICgpID0+IHtcclxuXHJcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLXNob3cnKTtcclxuXHRcdHdyYXBwZXIuc3R5bGUudG9wID0gMDtcclxuXHRcdHdpbmRvdy5zY3JvbGxUbygwLHdpbmRvd1Njcm9sbCk7XHJcblx0XHRhY3RpdmVNb2RhbCA9IGZhbHNlO1xyXG5cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwtYmVoYXZpb3Itb2ZmJyksIDUwMCk7XHJcblxyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsLXZpZGVvJykuaW5uZXJIVE1MID0gJyc7XHJcblxyXG5cdH0pO1xyXG5cclxuXHRtb2RhbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcclxuXHJcblx0XHRpZihldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuXHJcblx0XHRcdG1vZGFsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaGlkZVwiKSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9KTtcclxuXHJcblx0Y29uc3QgbW9kYWxTaG93ID0gKHNlbGVjdG9yLHRpdGxlKSA9PiB7XHJcblxyXG5cdFx0aWYoIWFjdGl2ZU1vZGFsKXtcclxuXHJcblx0XHRcdHdpbmRvd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB0aXRsZSApIHtcclxuXHJcblx0XHRcdG1vZGFsVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcclxuXHRcdFx0bW9kYWxGb3JtLmVsZW1lbnRzLnN1YmplY3QudmFsdWUgPSB0aXRsZS50cmltKCk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdG1vZGFsVGl0bGUuaW5uZXJIVE1MID0gdGl0bGVEZWZhdWx0O1xyXG5cdFx0XHRtb2RhbEZvcm0uZWxlbWVudHMuc3ViamVjdC52YWx1ZSA9IG1vZGFsVGl0bGUudGV4dENvbnRlbnQudHJpbSgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRhY3RpdmVNb2RhbCA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9faXRlbS0tJyArIHNlbGVjdG9yKTtcclxuXHJcblx0XHRbLi4uaXRlbXNdLmZvckVhY2goIGVsID0+IGVsLmNsYXNzTGlzdC50b2dnbGUoJ3Zpc3VhbGx5aGlkZGVuJywgZWwgIT09IGFjdGl2ZU1vZGFsKSApO1xyXG5cclxuXHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzY3JvbGwtYmVoYXZpb3Itb2ZmJyk7XHJcblxyXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xyXG5cclxuXHRcdFx0d3JhcHBlci5zdHlsZS50b3AgPSAtd2luZG93U2Nyb2xsICsgJ3B4JztcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1zaG93Jyk7XHJcblx0XHRcdHdpbmRvdy5zY3JvbGxUbygwLDApO1xyXG5cclxuXHRcdFx0YWN0aXZlTW9kYWwuZm9jdXMoKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0bW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcblxyXG5cdFx0aWYoIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsJykgfHwgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5tb2RhbF9fY2xvc2UnKSl7XHJcblxyXG5cdFx0XHRtb2RhbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImhpZGVcIikpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSk7XHJcblxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG5cclxuXHRcdGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcblxyXG5cdFx0d2hpbGUgKHRhcmdldCAhPT0gZG9jdW1lbnQgJiYgdGFyZ2V0ICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHRpZiAodGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1tb2RhbCcpKSB7XHJcblxyXG5cdFx0XHRcdG1vZGFsU2hvdyh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsJyksIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKSk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0pO1xyXG5cclxuXHRtb2RhbC5hZGRFdmVudExpc3RlbmVyKCdtb2RhbFNob3cnLCBldmVudCA9PiBtb2RhbFNob3coZXZlbnQuZGV0YWlsLnNlbGVjdG9yKSk7XHJcblxyXG59KShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKSk7IiwiKCBlbGVtZW50cyA9PiB7XHJcblxyXG5cdGlmKGVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG5cclxuXHRcdHJldHVybjtcclxuXHJcblx0fVxyXG5cclxuXHRbLi4uZWxlbWVudHNdLmZvckVhY2goIGRyb3Bkb3duID0+IHtcclxuXHJcblx0XHRjb25zdCBtYXNrID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLnBob25lLWNvdW50cnlfX21hc2snKSxcclxuXHRcdFx0ICBjb2RlID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLnBob25lLWNvdW50cnlfX2NvZGUnKSxcclxuXHRcdFx0ICBmbGFnID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLnBob25lLWNvdW50cnlfX3RvZ2dsZS1mbGFnJyksXHJcblx0XHRcdCAgaXRlbSA9IGRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3JBbGwoJy5waG9uZS1jb3VudHJ5X19pdGVtJyk7XHJcblxyXG5cdFx0Wy4uLml0ZW1dLmZvckVhY2goIGJ0biA9PiB7XHJcblxyXG5cdFx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHJcblx0XHRcdFx0bGV0IHBsYWNlaG9sZGVyID0gYnRuLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXNrJyk7XHJcblx0XHRcdFx0cGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlci5yZXBsYWNlKC9cXFxcOS9nLCAnJCcpO1xyXG5cdFx0XHRcdHBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIucmVwbGFjZSgvOS9nLCAnMCcpO1xyXG5cdFx0XHRcdHBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIucmVwbGFjZSgvXFwkL2csICc5Jyk7XHJcblxyXG5cdFx0XHRcdG1hc2suc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIHBsYWNlaG9sZGVyKTtcclxuXHRcdFx0XHRtYXNrLnZhbHVlID0gJyc7XHJcblxyXG5cdFx0XHRcdElucHV0bWFzayhidG4uZ2V0QXR0cmlidXRlKCdkYXRhLW1hc2snKSkubWFzayhtYXNrKTtcclxuXHJcblx0XHRcdFx0bGV0IG1hc2tJbnB1dDtcclxuXHJcblx0XHRcdFx0bWFza0lucHV0ID0gbmV3IElucHV0bWFzayh7XHJcblx0XHRcdFx0XHRtYXNrOiBidG4uZ2V0QXR0cmlidXRlKCdkYXRhLW1hc2snKSxcclxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyOiAnMCdcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0bWFza0lucHV0Lm1hc2sobWFzayk7XHJcblxyXG5cdFx0XHRcdG1hc2suZm9jdXMoKTtcclxuXHJcblx0XHRcdFx0Y29kZS52YWx1ZSA9IGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29kZScpO1xyXG5cclxuXHRcdFx0XHRmbGFnLmlubmVySFRNTCA9IGJ0bi5xdWVyeVNlbGVjdG9yKCcucGhvbmUtY291bnRyeV9faXRlbS1mbGFnJykuaW5uZXJIVE1MO1xyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH0pO1xyXG5cclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcclxuXHJcblx0XHRjb25zdCBpc0Ryb3Bkb3duID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5waG9uZS1jb3VudHJ5X190b2dnbGUnKSA/IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucGhvbmUtY291bnRyeScpIDogbnVsbDtcclxuXHJcblx0XHRbLi4uZWxlbWVudHNdLmZvckVhY2goIGRyb3Bkb3duID0+IHtcclxuXHJcblx0XHRcdGRyb3Bkb3duLmNsYXNzTGlzdC50b2dnbGUoJ2lzLW9wZW4nLCBkcm9wZG93biA9PT0gaXNEcm9wZG93biAmJiBpc0Ryb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucygnaXMtb3BlbicpID09PSBmYWxzZSApO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5waG9uZS1jb3VudHJ5JykpOyIsIiggbGlua3MgPT4ge1xyXG5cclxuXHRpZiAoIGxpbmtzLmxlbmd0aCApIHtcclxuXHJcblx0XHRjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCksXHJcblx0XHRcdCAgc3RhcnQgPSBzZWFyY2hQYXJhbXMuZ2V0KCdzdGFydCcpO1xyXG5cclxuXHRcdGlmICggc3RhcnQgIT09IG51bGwgKSB7XHJcblxyXG5cdFx0XHRbLi4ubGlua3NdLmZvckVhY2goIGxpbmsgPT4ge1xyXG5cclxuXHRcdFx0XHRpZiAoIGxpbmsuaHJlZi5pbmNsdWRlcygnc3RhcnQnKSA9PT0gZmFsc2UgKSB7XHJcblxyXG5cdFx0XHRcdFx0bGluay5ocmVmID0gbGluay5ocmVmICsgJz9zdGFydD0nICsgc3RhcnQ7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufSkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNldC11cmwtcGFyYW0nKSk7IiwiKCB5b3V0dWJlID0+IHtcclxuXHJcblx0aWYoIHlvdXR1YmUubGVuZ3RoICkge1xyXG5cclxuXHRcdGNvbnN0IG1vZGFsQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsLXZpZGVvJyk7XHJcblxyXG5cdFx0Wy4uLnlvdXR1YmVdLmZvckVhY2goIGxpbmsgPT4ge1xyXG5cclxuXHRcdFx0Y29uc3QgaWQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS15b3V0dWJlJyk7XHJcblxyXG5cdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG5cclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuXHJcblx0XHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xyXG5cdFx0XHRcdGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93JywgJ2F1dG9wbGF5Jyk7XHJcblx0XHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgKyBpZCArICc/cmVsPTAmc2hvd2luZm89MCZhdXRvcGxheT0xJyk7XHJcblxyXG5cdFx0XHRcdG1vZGFsQm94LmFwcGVuZENoaWxkKGlmcmFtZSk7XHJcblxyXG5cdFx0XHRcdGNvbnN0IGV2ZW50TW9kYWxTaG93ID0gbmV3IEN1c3RvbUV2ZW50KFwibW9kYWxTaG93XCIsIHtcclxuXHRcdFx0XHRcdGRldGFpbDoge1xyXG5cdFx0XHRcdFx0XHRzZWxlY3RvcjogXCJ2aWRlb1wiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHdpbmRvdy5tb2RhbC5kaXNwYXRjaEV2ZW50KGV2ZW50TW9kYWxTaG93KTtcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG59KShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS15b3V0dWJlXScpKTsiXX0=
