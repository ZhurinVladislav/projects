gsap.registerPlugin(ScrollTrigger, SmoothScroll)

if (ScrollTrigger.isTouch !== 1) {

	SmoothScroll({
			// Время скролла 400 = 0.4 секунды
			animationTime    : 800,
			// Размер шага в пикселях 
			stepSize         : 50,

			// Дополнительные настройки:
			
			// Ускорение 
			accelerationDelta : 30,  
			// Максимальное ускорение
			accelerationMax   : 2,   

			// Поддержка клавиатуры
			keyboardSupport   : true,  
			// Шаг скролла стрелками на клавиатуре в пикселях
			arrowScroll       : 50,

			// Pulse (less tweakable)
			// ratio of "tail" to "acceleration"
			pulseAlgorithm   : true,
			pulseScale       : 4,
			pulseNormalize   : 1,

			// Поддержка тачпада
			touchpadSupport   : true,
	})

	gsap.fromTo('.home-page__hero .content', { y: 0 }, {
		y: 20,
		scrollTrigger: {
			trigger: '.home-page__hero .content',
			start: '-200',
			end: '100',
			scrub: true
		}
	})

	// gsap.fromTo('.home-page__hero .hero__list', { y: 0 }, {
	// 	y: 30,
	// 	scrollTrigger: {
	// 		trigger: '.home-page__hero .content',
	// 		start: '-200',
	// 		end: '100',
	// 		scrub: true
	// 	}
	// })

	// gsap.fromTo('.home-page__about .img-wrapper__img-number', { y: 0 }, {
	// 	y: 50,
	// 	scrollTrigger: {
	// 		trigger: '.img-wrapper__img-number',
	// 		start: '-200',
	// 		end: '100',
	// 		scrub: true
	// 	}
	// })

	gsap.fromTo('.home-page__about .about__content', { y: 0 }, {
		y: -40,
		scrollTrigger: {
			trigger: '.about__content',
			start: '-150',
			end: '100',
			scrub: true
		}
	})

	gsap.fromTo('.home-page__about .img-wrapper__img-item', { y: 0 }, {
		y: 20,
		scrollTrigger: {
			trigger: '.img-wrapper__img-item',
			start: '-150',
			end: '100',
			duration: .2,
			scrub: true
		}
	})

	gsap.fromTo('.home-page__main-gallery .gallery__number', { y: 0 }, {
		y: 50,
		scrollTrigger: {
			trigger: '.gallery__number',
			start: '-200',
			end: '100',
			scrub: true
		}
	})

	gsap.fromTo('.home-page__main-gallery .rooms__number', { y: 0 }, {
		y: 50,
		scrollTrigger: {
			trigger: '.rooms__number',
			start: '-200',
			end: '100',
			scrub: true
		}
	})


	gsap.fromTo('.home-page__special-offers .special-offers__number', { y: 0 }, {
		y: 50,
		scrollTrigger: {
			trigger: '.special-offers__number',
			start: '-200',
			end: '100',
			scrub: true
		}
	})

	// gsap.fromTo('.basic-information__location .img-wrapper__img-number', { y: 0 }, {
	// 	y: 50,
	// 	scrollTrigger: {
	// 		trigger: '.basic-information__location .img-wrapper__img-number',
	// 		start: '-200',
	// 		end: '100',
	// 		scrub: true
	// 	}
	// })

	gsap.fromTo('.basic-information__location .location__content', { y: 0 }, {
		y: -40,
		scrollTrigger: {
			trigger: '.basic-information__location .location__content',
			start: '-150',
			end: '100',
			scrub: true
		}
	})

	gsap.fromTo('.basic-information__location .img-wrapper__img-item', { y: 0 }, {
		y: 20,
		scrollTrigger: {
			trigger: '.basic-information__location .img-wrapper__img-item',
			start: '-150',
			end: '100',
			duration: .2,
			scrub: true
		}
	})

	// gsap.fromTo('.basic-information__concept .img-wrapper__img-number', { y: 0 }, {
	// 	y: 50,
	// 	scrollTrigger: {
	// 		trigger: '.basic-information__concept .img-wrapper__img-number',
	// 		start: '-200',
	// 		end: '100',
	// 		scrub: true
	// 	}
	// })

	gsap.fromTo('.basic-information__concept .concept__content', { y: 0 }, {
		y: -40,
		scrollTrigger: {
			trigger: '.basic-information__concept .concept__content',
			start: '-150',
			end: '100',
			scrub: true
		}
	})

	gsap.fromTo('.basic-information__concept .img-wrapper__img-item', { y: 0 }, {
		y: 20,
		scrollTrigger: {
			trigger: '.basic-information__concept .img-wrapper__img-item',
			start: '-150',
			end: '100',
			duration: .2,
			scrub: true
		}
	})
	

}
