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

						//for amocrm

						formData.append('place', 'advisorymain');

						btn.disabled = true;

						fetch(form.getAttribute('action'), {
							method: 'POST',
							body: formData
						})
						.then(response => response.json())
						.then(result => {

							console.log(result);

							ym(91004279,'reachGoal','lead');

							if ( goal ) {

								ym(91004279,'reachGoal',goal);

							}

							btn.disabled = false;

							if ( form.elements.redirect ) {

								location.assign(form.elements.redirect.value);

								return;

							}

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

						});

					});

				});

			}

		});

	});

})(document.querySelectorAll('.form'));
( () => {

	const yaCounterId = 91004279,
		goals = [

			{
				selector: '#opencomp_btn',
				event: 'click',
				yandex: {
					target: 'opencomp'
				}
			},
			{
				selector: '#consult_btn',
				event: 'click',
				yandex: {
					target: 'consult'
				}
			},
			{
				selector: '#tg_ofzay_btn',
				event: 'click',
				yandex: {
					target: 'tg_ofzay'
				}
			},
			{
				selector: '#freezone_btn',
				event: 'click',
				yandex: {
					target: 'freezone'
				}
			},
			{
				selector: '#mainland_btn',
				event: 'click',
				yandex: {
					target: 'mainland'
				}
			},
			{
				selector: '#anketa_btn',
				event: 'click',
				yandex: {
					target: 'anketa'
				}
			},
			{
				selector: '#tg_head_btn',
				event: 'click',
				yandex: {
					target: 'tg_head'
				}
			},
			{
				selector: '#wa_head_btn',
				event: 'click',
				yandex: {
					target: 'wa_head'
				}
			},
			{
				selector: '#tel_head_btn_lg',
				event: 'click',
				yandex: {
					target: 'tel_head'
				}
			},
			{
				selector: '#tel_head_btn_sm',
				event: 'click',
				yandex: {
					target: 'tel_head'
				}
			},
			{
				selector: '#wa_foot_btn',
				event: 'click',
				yandex: {
					target: 'wa_foot'
				}
			},
			{
				selector: '#tg_foot_btn',
				event: 'click',
				yandex: {
					target: 'tg_foot'
				}
			},
			{
				selector: '#tel_foot_btn',
				event: 'click',
				yandex: {
					target: 'tel_foot'
				}
			}

		];


	goals.forEach( goal => {

		if (goal.page && goal.page !== location.pathname)
			return;

		if (goal.skipPages && goal.skipPages.indexOf(location.pathname) !== -1)
			return;

		const elements = document.querySelectorAll(goal.selector);

		[...elements].forEach( element => {

			element.addEventListener(goal.event, () => {

				console.log(goal.yandex.target);

				if (goal.yandex && window.ym) {

					ym(yaCounterId, 'reachGoal', goal.yandex.target);

				}

			});

		});

	});

})();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzLmpzIiwiYWNjb3JkaW9uLmpzIiwiZm9ybS5qcyIsImdvYWxzLmpzIiwiaW5wdXRtYXNrLmpzIiwibW9kYWwuanMiLCJwaG9uZS1jb3VudHJ5LmpzIiwiVVJMU2VhcmNoUGFyYW1zLmpzIiwieW91dHViZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG5cclxuwqkga292cmlnaW5cclxu0JLRgdC1INC/0YDQsNCy0LAg0YDQsNC30YDQtdGI0LXQvdGLXHJcbtC60YDQsNGB0LjQstGL0Lkg0LTQuNC30LDQudC9INC00L7Qu9C20LXQvSDQuNC80LXRgtGMINC60YDQsNGB0LjQstGL0Lkg0LrQvtC0wq5cclxuXHJcbmh0dHBzOi8vZ2l0aHViLmNvbS9odG1scGx1c2Nzcy9cclxuXHJcbiovXHJcblxyXG4oICgpID0+IHtcclxuXHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuXHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmFzdExvYWRTY3JpcHQnLCB0cnVlKTtcclxuXHJcblx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdHJhbnNpdGlvbkRlZmF1bHQnLCAnLjNzJyk7XHJcblxyXG5cdH0pO1xyXG5cclxuXHQvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQsNC90LjQvNCw0YbQuNC5XHJcblx0d2luZG93LmNzc0FuaW1hdGlvbiA9IGE9PntsZXQgYixjLGQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNzc2FuaW1hdGlvblwiKTtzd2l0Y2goYSl7Y2FzZSdhbmltYXRpb24nOmI9e1wiYW5pbWF0aW9uXCI6XCJhbmltYXRpb25lbmRcIixcIk9BbmltYXRpb25cIjpcIm9BbmltYXRpb25FbmRcIixcIk1vekFuaW1hdGlvblwiOlwiYW5pbWF0aW9uZW5kXCIsXCJXZWJraXRBbmltYXRpb25cIjpcIndlYmtpdEFuaW1hdGlvbkVuZFwifTticmVhaztjYXNlJ3RyYW5zaXRpb24nOmI9e1widHJhbnNpdGlvblwiOlwidHJhbnNpdGlvbmVuZFwiLFwiT1RyYW5zaXRpb25cIjpcIm9UcmFuc2l0aW9uRW5kXCIsXCJNb3pUcmFuc2l0aW9uXCI6XCJ0cmFuc2l0aW9uZW5kXCIsXCJXZWJraXRUcmFuc2l0aW9uXCI6XCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCJ9fWZvcihjIGluIGIpaWYoZC5zdHlsZVtjXSE9PXVuZGVmaW5lZClyZXR1cm4gYltjXX1cclxuXHJcblx0Ly8gRGV0ZXJtaW5lIGlmIGFuIGVsZW1lbnQgaXMgaW4gdGhlIHZpc2libGUgdmlld3BvcnRcclxuXHR3aW5kb3cuaXNJblZpZXdwb3J0ID0gZWwgPT4ge1xyXG5cdFx0Y29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0cmV0dXJuIChyZWN0LnRvcCA+PSAwICYmIHJlY3QuYm90dG9tIDw9IHdpbmRvdy5pbm5lckhlaWdodCk7XHJcblx0fVxyXG5cclxufSkoKTsiLCIoIGl0ZW1zID0+IHtcclxuXHJcblx0aWYoIWl0ZW1zLmxlbmd0aCkge1xyXG5cclxuXHRcdHJldHVybjtcclxuXHJcblx0fVxyXG5cclxuXHRbLi4uaXRlbXNdLmZvckVhY2goIGFjY29yZGlvbiA9PiB7XHJcblxyXG5cdFx0bGV0IGFuaW1hdGVPbiA9IGZhbHNlLFxyXG5cdFx0XHRhY3RpdmVJdGVtID0gbnVsbDtcclxuXHJcblx0XHRjb25zdCBpdGVtcyA9IGFjY29yZGlvbi5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX19pdGVtJyk7XHJcblxyXG5cdFx0Wy4uLml0ZW1zXS5mb3JFYWNoKCBpdGVtID0+IHtcclxuXHJcblx0XHRcdGNvbnN0IGJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9fYnRuJyksXHJcblx0XHRcdFx0ICBoZWFkID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19oZWFkJyksXHJcblx0XHRcdFx0ICBib2R5ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19ib2R5JyksXHJcblx0XHRcdFx0ICBhcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cclxuXHRcdFx0YXJyb3cuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ2aWV3Qm94XCIsIFwiMCAwIDI0IDI0XCIpO1xyXG5cdFx0XHRhcnJvdy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcIndpZHRoXCIsIDI0KTtcclxuXHRcdFx0YXJyb3cuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJoZWlnaHRcIiwgMjQpO1xyXG5cdFx0XHRhcnJvdy5pbm5lckhUTUwgPSAnPGxpbmUgeDE9XCIxOVwiIHgyPVwiMTlcIiB5MT1cIjdcIiB5Mj1cIjE3XCIvPjxsaW5lIHgxPVwiMTRcIiB4Mj1cIjI0XCIgeTE9XCIxMlwiIHkyPVwiMTJcIi8+JztcclxuXHJcblx0XHRcdGhlYWQuYXBwZW5kKGFycm93KTtcclxuXHJcblx0XHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHJcblx0XHRcdFx0YW5pbWF0ZU9uID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0aWYoIGl0ZW0gPT09IGFjdGl2ZUl0ZW0gKXtcclxuXHJcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcclxuXHRcdFx0XHRcdGFjdGl2ZUl0ZW0gPSBudWxsO1xyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdGFjdGl2ZUl0ZW0gPSBpdGVtO1xyXG5cclxuXHRcdFx0XHRcdFsuLi5pdGVtc10uZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtb3BlbicsIGVsID09PSBpdGVtKSk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ym9keS5hZGRFdmVudExpc3RlbmVyKHdpbmRvdy5jc3NBbmltYXRpb24oJ3RyYW5zaXRpb24nKSwgKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRpZihhbmltYXRlT24gJiYgYWN0aXZlSXRlbSAmJiAhd2luZG93LmlzSW5WaWV3cG9ydChoZWFkKSl7XHJcblxyXG5cdFx0XHRcdFx0aGVhZC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhbmltYXRlT24gPSBmYWxzZTtcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb24nKSk7IiwiKCBmb3JtcyA9PiB7XHJcblxyXG5cdC8vcmVDYXB0Y2hhIHYzXHJcblxyXG5cdGNvbnN0IFBVQkxJQ19LRVkgPSAnNkxkanViWWlBQUFBQUpDSkZhQld1NUREdkpXVXhCckFwZXFKRl9XQyc7XHJcblxyXG5cdGNvbnN0IHJlQ2FwdGNoYSA9ICgpID0+IHtcclxuXHJcblx0XHRbLi4uZm9ybXNdLmZvckVhY2goIGZvcm0gPT4ge1xyXG5cclxuXHRcdFx0Zm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHJlQ2FwdGNoYSk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblxyXG5cdFx0c2NyaXB0LnNyYyA9ICdodHRwczovL3d3dy5nb29nbGUuY29tL3JlY2FwdGNoYS9hcGkuanM/cmVuZGVyPScgKyBQVUJMSUNfS0VZO1xyXG5cclxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuXHJcblx0fVxyXG5cclxuXHQvLyB1dG1cclxuXHJcblx0Y29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuXHRbLi4uZm9ybXNdLmZvckVhY2goIGZvcm0gPT4ge1xyXG5cclxuXHRcdC8vIHVybFxyXG5cclxuXHRcdGlmICggZm9ybS5lbGVtZW50cy51cmwgKSB7XHJcblxyXG5cdFx0XHRmb3JtLmVsZW1lbnRzLnVybC52YWx1ZSA9IGxvY2F0aW9uLnNlYXJjaDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHJlQ2FwdGNoYSk7XHJcblxyXG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKT0+IHtcclxuXHJcblx0XHRcdGZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnbm90LXJ1bGUnLCBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja2JveF9faW5wdXQnKS5sZW5ndGggIT09IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrYm94X19pbnB1dDpjaGVja2VkJykubGVuZ3RoKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mKGdyZWNhcHRjaGEpID09PSAndW5kZWZpbmVkJykge1xyXG5cclxuXHRcdFx0XHRhbGVydCgnRXJyb3IhIEdvb2dsZSByZUNhcHRjaGEnKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGdyZWNhcHRjaGEucmVhZHkoICgpID0+IHtcclxuXHJcblx0XHRcdFx0XHRncmVjYXB0Y2hhLmV4ZWN1dGUoUFVCTElDX0tFWSkudGhlbiggdG9rZW4gPT4ge1xyXG5cclxuXHRcdFx0XHRcdFx0bGV0IGdvYWwgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRcdFx0Y29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSksXHJcblx0XHRcdFx0XHRcdFx0ICBidG4gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19zdWJtaXQnKTtcclxuXHJcblx0XHRcdFx0XHRcdGZvcm1EYXRhLmFwcGVuZCgnZ19yZWNhcHRjaGFfcmVzcG9uc2UnLCB0b2tlbik7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyB1dG0gJiYgZ29hbFxyXG5cclxuXHRcdFx0XHRcdFx0c2VhcmNoUGFyYW1zLmZvckVhY2goICh2YWx1ZSwga2V5KSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmICgga2V5LmluY2x1ZGVzKCd1dG0nKSApIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCBrZXkuaW5jbHVkZXMoJ2dvYWwnKSApIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Z29hbCA9IHZhbHVlO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdC8vZm9yIGFtb2NybVxyXG5cclxuXHRcdFx0XHRcdFx0Zm9ybURhdGEuYXBwZW5kKCdwbGFjZScsICdhZHZpc29yeW1haW4nKTtcclxuXHJcblx0XHRcdFx0XHRcdGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0XHRmZXRjaChmb3JtLmdldEF0dHJpYnV0ZSgnYWN0aW9uJyksIHtcclxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0XHRcdFx0XHRib2R5OiBmb3JtRGF0YVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcblx0XHRcdFx0XHRcdC50aGVuKHJlc3VsdCA9PiB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHltKDkxMDA0Mjc5LCdyZWFjaEdvYWwnLCdsZWFkJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmICggZ29hbCApIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR5bSg5MTAwNDI3OSwncmVhY2hHb2FsJyxnb2FsKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRidG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCBmb3JtLmVsZW1lbnRzLnJlZGlyZWN0ICkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGxvY2F0aW9uLmFzc2lnbihmb3JtLmVsZW1lbnRzLnJlZGlyZWN0LnZhbHVlKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCBmb3JtLmNsYXNzTGlzdC5jb250YWlucygnY29udGFjdF9fZm9ybScpICkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGZvcm0ucXVlcnlTZWxlY3RvcignLmNvbnRhY3RfX2Zvcm0tZG9uZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWRvbmVfX3RpdGxlJykuaW5uZXJIVE1MID0gcmVzdWx0LnRpdGxlO1xyXG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1kb25lX19tZXNzYWdlJykuaW5uZXJIVE1MID0gcmVzdWx0Lm1lc3NhZ2U7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbC1kb25lX19pY28gc3ZnJylbMF0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScsIHJlc3VsdC5zdGF0dXMgIT09ICdvaycpO1xyXG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbC1kb25lX19pY28gc3ZnJylbMV0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScsIHJlc3VsdC5zdGF0dXMgPT09ICdvaycpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRjb25zdCBldmVudE1vZGFsU2hvdyA9IG5ldyBDdXN0b21FdmVudChcIm1vZGFsU2hvd1wiLCB7XHJcblx0XHRcdFx0XHRcdFx0XHRkZXRhaWw6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0b3I6IFwiZG9uZVwiXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdG1vZGFsLmRpc3BhdGNoRXZlbnQoZXZlbnRNb2RhbFNob3cpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRmb3JtLnJlc2V0KCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH0pO1xyXG5cclxufSkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvcm0nKSk7IiwiKCAoKSA9PiB7XHJcblxyXG5cdGNvbnN0IHlhQ291bnRlcklkID0gOTEwMDQyNzksXHJcblx0XHRnb2FscyA9IFtcclxuXHJcblx0XHRcdHtcclxuXHRcdFx0XHRzZWxlY3RvcjogJyNvcGVuY29tcF9idG4nLFxyXG5cdFx0XHRcdGV2ZW50OiAnY2xpY2snLFxyXG5cdFx0XHRcdHlhbmRleDoge1xyXG5cdFx0XHRcdFx0dGFyZ2V0OiAnb3BlbmNvbXAnXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VsZWN0b3I6ICcjY29uc3VsdF9idG4nLFxyXG5cdFx0XHRcdGV2ZW50OiAnY2xpY2snLFxyXG5cdFx0XHRcdHlhbmRleDoge1xyXG5cdFx0XHRcdFx0dGFyZ2V0OiAnY29uc3VsdCdcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRzZWxlY3RvcjogJyN0Z19vZnpheV9idG4nLFxyXG5cdFx0XHRcdGV2ZW50OiAnY2xpY2snLFxyXG5cdFx0XHRcdHlhbmRleDoge1xyXG5cdFx0XHRcdFx0dGFyZ2V0OiAndGdfb2Z6YXknXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VsZWN0b3I6ICcjZnJlZXpvbmVfYnRuJyxcclxuXHRcdFx0XHRldmVudDogJ2NsaWNrJyxcclxuXHRcdFx0XHR5YW5kZXg6IHtcclxuXHRcdFx0XHRcdHRhcmdldDogJ2ZyZWV6b25lJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlbGVjdG9yOiAnI21haW5sYW5kX2J0bicsXHJcblx0XHRcdFx0ZXZlbnQ6ICdjbGljaycsXHJcblx0XHRcdFx0eWFuZGV4OiB7XHJcblx0XHRcdFx0XHR0YXJnZXQ6ICdtYWlubGFuZCdcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRzZWxlY3RvcjogJyNhbmtldGFfYnRuJyxcclxuXHRcdFx0XHRldmVudDogJ2NsaWNrJyxcclxuXHRcdFx0XHR5YW5kZXg6IHtcclxuXHRcdFx0XHRcdHRhcmdldDogJ2Fua2V0YSdcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRzZWxlY3RvcjogJyN0Z19oZWFkX2J0bicsXHJcblx0XHRcdFx0ZXZlbnQ6ICdjbGljaycsXHJcblx0XHRcdFx0eWFuZGV4OiB7XHJcblx0XHRcdFx0XHR0YXJnZXQ6ICd0Z19oZWFkJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlbGVjdG9yOiAnI3dhX2hlYWRfYnRuJyxcclxuXHRcdFx0XHRldmVudDogJ2NsaWNrJyxcclxuXHRcdFx0XHR5YW5kZXg6IHtcclxuXHRcdFx0XHRcdHRhcmdldDogJ3dhX2hlYWQnXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VsZWN0b3I6ICcjdGVsX2hlYWRfYnRuX2xnJyxcclxuXHRcdFx0XHRldmVudDogJ2NsaWNrJyxcclxuXHRcdFx0XHR5YW5kZXg6IHtcclxuXHRcdFx0XHRcdHRhcmdldDogJ3RlbF9oZWFkJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlbGVjdG9yOiAnI3RlbF9oZWFkX2J0bl9zbScsXHJcblx0XHRcdFx0ZXZlbnQ6ICdjbGljaycsXHJcblx0XHRcdFx0eWFuZGV4OiB7XHJcblx0XHRcdFx0XHR0YXJnZXQ6ICd0ZWxfaGVhZCdcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRzZWxlY3RvcjogJyN3YV9mb290X2J0bicsXHJcblx0XHRcdFx0ZXZlbnQ6ICdjbGljaycsXHJcblx0XHRcdFx0eWFuZGV4OiB7XHJcblx0XHRcdFx0XHR0YXJnZXQ6ICd3YV9mb290J1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlbGVjdG9yOiAnI3RnX2Zvb3RfYnRuJyxcclxuXHRcdFx0XHRldmVudDogJ2NsaWNrJyxcclxuXHRcdFx0XHR5YW5kZXg6IHtcclxuXHRcdFx0XHRcdHRhcmdldDogJ3RnX2Zvb3QnXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VsZWN0b3I6ICcjdGVsX2Zvb3RfYnRuJyxcclxuXHRcdFx0XHRldmVudDogJ2NsaWNrJyxcclxuXHRcdFx0XHR5YW5kZXg6IHtcclxuXHRcdFx0XHRcdHRhcmdldDogJ3RlbF9mb290J1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdF07XHJcblxyXG5cclxuXHRnb2Fscy5mb3JFYWNoKCBnb2FsID0+IHtcclxuXHJcblx0XHRpZiAoZ29hbC5wYWdlICYmIGdvYWwucGFnZSAhPT0gbG9jYXRpb24ucGF0aG5hbWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRpZiAoZ29hbC5za2lwUGFnZXMgJiYgZ29hbC5za2lwUGFnZXMuaW5kZXhPZihsb2NhdGlvbi5wYXRobmFtZSkgIT09IC0xKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0Y29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGdvYWwuc2VsZWN0b3IpO1xyXG5cclxuXHRcdFsuLi5lbGVtZW50c10uZm9yRWFjaCggZWxlbWVudCA9PiB7XHJcblxyXG5cdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZ29hbC5ldmVudCwgKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhnb2FsLnlhbmRleC50YXJnZXQpO1xyXG5cclxuXHRcdFx0XHRpZiAoZ29hbC55YW5kZXggJiYgd2luZG93LnltKSB7XHJcblxyXG5cdFx0XHRcdFx0eW0oeWFDb3VudGVySWQsICdyZWFjaEdvYWwnLCBnb2FsLnlhbmRleC50YXJnZXQpO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fSk7XHJcblxyXG59KSgpOyIsIiggZWxlbXMgPT4ge1xyXG5cclxuXHRpZighZWxlbXMubGVuZ3RoKSB7XHJcblxyXG5cdFx0cmV0dXJuO1xyXG5cclxuXHR9XHJcblxyXG5cdGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG5cdHNjcmlwdC5zcmMgPSAnL2pzL2lucHV0bWFzay5taW4uanMnO1xyXG5cdHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XHJcblxyXG5cdFx0Wy4uLmVsZW1zXS5mb3JFYWNoKCBlbCA9PiB7XHJcblxyXG5cdFx0XHRsZXQgbWFza0lucHV0O1xyXG5cclxuXHRcdFx0aWYoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnB1dG1hc2stLXBob25lJykpIHtcclxuXHJcblx0XHRcdFx0bWFza0lucHV0ID0gbmV3IElucHV0bWFzayh7XHJcblx0XHRcdFx0XHRtYXNrOiBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWFzaycpLFxyXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI6ICcwJ1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bWFza0lucHV0Lm1hc2soZWwpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHRzZXRUaW1lb3V0KCAoKSA9PiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCksIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXN0TG9hZFNjcmlwdCcpID8gMCA6IDEwMDAwKTtcclxuXHJcbn0pKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnB1dG1hc2snKSk7IiwiKCBtb2RhbCA9PiB7XHJcblxyXG5cdGlmKCFtb2RhbCkge1xyXG5cclxuXHRcdHJldHVybjtcclxuXHJcblx0fVxyXG5cclxuXHRjb25zdCBpdGVtcyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbF9faXRlbScpLFxyXG5cdFx0ICBidG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kYWxdJyksXHJcblx0XHQgIHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpLFxyXG5cdFx0ICBtb2RhbEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwtZm9ybScpLFxyXG5cdFx0ICBtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsLXRpdGxlJyksXHJcblx0XHQgIHRpdGxlRGVmYXVsdCA9IG1vZGFsVGl0bGUuaW5uZXJIVE1MO1xyXG5cclxuXHRsZXQgYWN0aXZlTW9kYWwgPSBudWxsLFxyXG5cdFx0d2luZG93U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuXHRtb2RhbC5hZGRFdmVudExpc3RlbmVyKCdoaWRlJywgKCkgPT4ge1xyXG5cclxuXHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWwtc2hvdycpO1xyXG5cdFx0d3JhcHBlci5zdHlsZS50b3AgPSAwO1xyXG5cdFx0d2luZG93LnNjcm9sbFRvKDAsd2luZG93U2Nyb2xsKTtcclxuXHRcdGFjdGl2ZU1vZGFsID0gZmFsc2U7XHJcblxyXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1iZWhhdmlvci1vZmYnKSwgNTAwKTtcclxuXHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwtdmlkZW8nKS5pbm5lckhUTUwgPSAnJztcclxuXHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnQgPT4ge1xyXG5cclxuXHRcdGlmKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG5cclxuXHRcdFx0bW9kYWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJoaWRlXCIpKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCBtb2RhbFNob3cgPSAoc2VsZWN0b3IsdGl0bGUpID0+IHtcclxuXHJcblx0XHRpZighYWN0aXZlTW9kYWwpe1xyXG5cclxuXHRcdFx0d2luZG93U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHRpdGxlICkge1xyXG5cclxuXHRcdFx0bW9kYWxUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xyXG5cdFx0XHRtb2RhbEZvcm0uZWxlbWVudHMuc3ViamVjdC52YWx1ZSA9IHRpdGxlLnRyaW0oKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0bW9kYWxUaXRsZS5pbm5lckhUTUwgPSB0aXRsZURlZmF1bHQ7XHJcblx0XHRcdG1vZGFsRm9ybS5lbGVtZW50cy5zdWJqZWN0LnZhbHVlID0gbW9kYWxUaXRsZS50ZXh0Q29udGVudC50cmltKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGFjdGl2ZU1vZGFsID0gbW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsX19pdGVtLS0nICsgc2VsZWN0b3IpO1xyXG5cclxuXHRcdFsuLi5pdGVtc10uZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LnRvZ2dsZSgndmlzdWFsbHloaWRkZW4nLCBlbCAhPT0gYWN0aXZlTW9kYWwpICk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbC1iZWhhdmlvci1vZmYnKTtcclxuXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XHJcblxyXG5cdFx0XHR3cmFwcGVyLnN0eWxlLnRvcCA9IC13aW5kb3dTY3JvbGwgKyAncHgnO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vZGFsLXNob3cnKTtcclxuXHRcdFx0d2luZG93LnNjcm9sbFRvKDAsMCk7XHJcblxyXG5cdFx0XHRhY3RpdmVNb2RhbC5mb2N1cygpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHRtb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuXHJcblx0XHRpZiggZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwnKSB8fCBldmVudC50YXJnZXQuY2xvc2VzdCgnLm1vZGFsX19jbG9zZScpKXtcclxuXHJcblx0XHRcdG1vZGFsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaGlkZVwiKSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9KTtcclxuXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcblxyXG5cdFx0bGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHJcblx0XHR3aGlsZSAodGFyZ2V0ICE9PSBkb2N1bWVudCAmJiB0YXJnZXQgIT09IG51bGwpIHtcclxuXHJcblx0XHRcdGlmICh0YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLW1vZGFsJykpIHtcclxuXHJcblx0XHRcdFx0bW9kYWxTaG93KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwnKSwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScpKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSk7XHJcblxyXG5cdG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ21vZGFsU2hvdycsIGV2ZW50ID0+IG1vZGFsU2hvdyhldmVudC5kZXRhaWwuc2VsZWN0b3IpKTtcclxuXHJcbn0pKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpKTsiLCIoIGVsZW1lbnRzID0+IHtcclxuXHJcblx0aWYoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XHJcblxyXG5cdFx0cmV0dXJuO1xyXG5cclxuXHR9XHJcblxyXG5cdFsuLi5lbGVtZW50c10uZm9yRWFjaCggZHJvcGRvd24gPT4ge1xyXG5cclxuXHRcdGNvbnN0IG1hc2sgPSBkcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcucGhvbmUtY291bnRyeV9fbWFzaycpLFxyXG5cdFx0XHQgIGNvZGUgPSBkcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcucGhvbmUtY291bnRyeV9fY29kZScpLFxyXG5cdFx0XHQgIGZsYWcgPSBkcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcucGhvbmUtY291bnRyeV9fdG9nZ2xlLWZsYWcnKSxcclxuXHRcdFx0ICBpdGVtID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvckFsbCgnLnBob25lLWNvdW50cnlfX2l0ZW0nKTtcclxuXHJcblx0XHRbLi4uaXRlbV0uZm9yRWFjaCggYnRuID0+IHtcclxuXHJcblx0XHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRsZXQgcGxhY2Vob2xkZXIgPSBidG4uZ2V0QXR0cmlidXRlKCdkYXRhLW1hc2snKTtcclxuXHRcdFx0XHRwbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyLnJlcGxhY2UoL1xcXFw5L2csICckJyk7XHJcblx0XHRcdFx0cGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlci5yZXBsYWNlKC85L2csICcwJyk7XHJcblx0XHRcdFx0cGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlci5yZXBsYWNlKC9cXCQvZywgJzknKTtcclxuXHJcblx0XHRcdFx0bWFzay5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIpO1xyXG5cdFx0XHRcdG1hc2sudmFsdWUgPSAnJztcclxuXHJcblx0XHRcdFx0SW5wdXRtYXNrKGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWFzaycpKS5tYXNrKG1hc2spO1xyXG5cclxuXHRcdFx0XHRsZXQgbWFza0lucHV0O1xyXG5cclxuXHRcdFx0XHRtYXNrSW5wdXQgPSBuZXcgSW5wdXRtYXNrKHtcclxuXHRcdFx0XHRcdG1hc2s6IGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWFzaycpLFxyXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI6ICcwJ1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRtYXNrSW5wdXQubWFzayhtYXNrKTtcclxuXHJcblx0XHRcdFx0bWFzay5mb2N1cygpO1xyXG5cclxuXHRcdFx0XHRjb2RlLnZhbHVlID0gYnRuLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2RlJyk7XHJcblxyXG5cdFx0XHRcdGZsYWcuaW5uZXJIVE1MID0gYnRuLnF1ZXJ5U2VsZWN0b3IoJy5waG9uZS1jb3VudHJ5X19pdGVtLWZsYWcnKS5pbm5lckhUTUw7XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fSk7XHJcblxyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xyXG5cclxuXHRcdGNvbnN0IGlzRHJvcGRvd24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnBob25lLWNvdW50cnlfX3RvZ2dsZScpID8gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5waG9uZS1jb3VudHJ5JykgOiBudWxsO1xyXG5cclxuXHRcdFsuLi5lbGVtZW50c10uZm9yRWFjaCggZHJvcGRvd24gPT4ge1xyXG5cclxuXHRcdFx0ZHJvcGRvd24uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtb3BlbicsIGRyb3Bkb3duID09PSBpc0Ryb3Bkb3duICYmIGlzRHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1vcGVuJykgPT09IGZhbHNlICk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH0pO1xyXG5cclxufSkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBob25lLWNvdW50cnknKSk7IiwiKCBsaW5rcyA9PiB7XHJcblxyXG5cdGlmICggbGlua3MubGVuZ3RoICkge1xyXG5cclxuXHRcdGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKSxcclxuXHRcdFx0ICBzdGFydCA9IHNlYXJjaFBhcmFtcy5nZXQoJ3N0YXJ0Jyk7XHJcblxyXG5cdFx0aWYgKCBzdGFydCAhPT0gbnVsbCApIHtcclxuXHJcblx0XHRcdFsuLi5saW5rc10uZm9yRWFjaCggbGluayA9PiB7XHJcblxyXG5cdFx0XHRcdGlmICggbGluay5ocmVmLmluY2x1ZGVzKCdzdGFydCcpID09PSBmYWxzZSApIHtcclxuXHJcblx0XHRcdFx0XHRsaW5rLmhyZWYgPSBsaW5rLmhyZWYgKyAnP3N0YXJ0PScgKyBzdGFydDtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59KShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2V0LXVybC1wYXJhbScpKTsiLCIoIHlvdXR1YmUgPT4ge1xyXG5cclxuXHRpZiggeW91dHViZS5sZW5ndGggKSB7XHJcblxyXG5cdFx0Y29uc3QgbW9kYWxCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwtdmlkZW8nKTtcclxuXHJcblx0XHRbLi4ueW91dHViZV0uZm9yRWFjaCggbGluayA9PiB7XHJcblxyXG5cdFx0XHRjb25zdCBpZCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLXlvdXR1YmUnKTtcclxuXHJcblx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcblxyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xyXG5cclxuXHRcdFx0XHRpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XHJcblx0XHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3cnLCAnYXV0b3BsYXknKTtcclxuXHRcdFx0XHRpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJyArIGlkICsgJz9yZWw9MCZzaG93aW5mbz0wJmF1dG9wbGF5PTEnKTtcclxuXHJcblx0XHRcdFx0bW9kYWxCb3guYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuXHJcblx0XHRcdFx0Y29uc3QgZXZlbnRNb2RhbFNob3cgPSBuZXcgQ3VzdG9tRXZlbnQoXCJtb2RhbFNob3dcIiwge1xyXG5cdFx0XHRcdFx0ZGV0YWlsOiB7XHJcblx0XHRcdFx0XHRcdHNlbGVjdG9yOiBcInZpZGVvXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0d2luZG93Lm1vZGFsLmRpc3BhdGNoRXZlbnQoZXZlbnRNb2RhbFNob3cpO1xyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcbn0pKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXlvdXR1YmVdJykpOyJdfQ==
