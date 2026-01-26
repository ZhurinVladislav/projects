/*! For license information please see scripts.js.LICENSE.txt */
'Accept' === localStorage.getItem('YourPrivacy') && document.querySelector('aside.cookie').remove();
(() => {
  let e = null,
    t = window.innerWidth;
  const o = () => {
    const e = document.querySelector('.header').clientHeight,
      t = document.querySelector('.warning');
    document.documentElement.style.setProperty('--heightHeader', e + 'px'), t && document.documentElement.style.setProperty('--warningHeight', t.clientHeight + 'px');
  };
  if (
    (o(),
    window.addEventListener('resize', n => {
      window.requestAnimationFrame(() => {
        null === e &&
          (e = setTimeout(() => {
            (e = null), (t === window.innerWidth && !1 !== n.isTrusted) || ((t = window.innerWidth), o());
          }, 100));
      });
    }),
    window.addEventListener('load', () => {
      localStorage.setItem('fastLoadScript', !0), document.documentElement.style.setProperty('--transitionDefault', '.3s'), o();
    }),
    null === localStorage.getItem('fastLoadScript'))
  ) {
    const e = () => {
      window.dispatchEvent(new Event('fastLoadScript')), window.removeEventListener('click', e), window.removeEventListener('scroll', e);
    };
    window.addEventListener('click', e), window.addEventListener('scroll', e);
  }
  (window.cssAnimation = e => {
    let t,
      o,
      n = document.createElement('cssanimation');
    switch (e) {
      case 'animation':
        t = { animation: 'animationend', OAnimation: 'oAnimationEnd', MozAnimation: 'animationend', WebkitAnimation: 'webkitAnimationEnd' };
        break;
      case 'transition':
        t = { transition: 'transitionend', OTransition: 'oTransitionEnd', MozTransition: 'transitionend', WebkitTransition: 'webkitTransitionEnd' };
    }
    for (o in t) if (void 0 !== n.style[o]) return t[o];
  }),
    (window.isInViewport = e => {
      const t = e.getBoundingClientRect();
      return t.top >= 0 && t.bottom <= window.innerHeight;
    });
})(),
  (e => {
    e.length &&
      [...e].forEach(e => {
        let t = !1,
          o = null;
        const n = e.querySelectorAll('.accordion__item');
        [...n].forEach(e => {
          const i = e.querySelector('.accordion__btn'),
            l = e.querySelector('.accordion__head'),
            r = e.querySelector('.accordion__body');
          i.addEventListener('click', () => {
            (t = !0), e === o ? (e.classList.remove('is-open'), (o = null)) : ((o = e), [...n].forEach(t => t.classList.toggle('is-open', t === e)));
          }),
            r.addEventListener(window.cssAnimation('transition'), () => {
              t && o === e && !window.isInViewport(l) && l.scrollIntoView({ behavior: 'smooth' }), (t = !1);
            });
        });
      });
  })(document.querySelectorAll('.accordion')),
  (e => {
    if (e) {
      const t = e.querySelector('.buy-concierge__table'),
        o = e.querySelector('.buy-concierge__compare .btn'),
        n = o.textContent;
      o.addEventListener('click', () => {
        t.classList.contains('is-open') ? (t.classList.remove('is-open'), (o.textContent = n)) : (t.classList.add('is-open'), (o.textContent = o.getAttribute('data-alt')));
      }),
        e.addEventListener('click', t => {
          const o = t.target.closest('.buy-concierge__toggle-btn');
          if (o) {
            const t = o.getAttribute('data-id'),
              n = e.querySelectorAll('[data-toggle-id]');
            [...e.querySelectorAll('.buy-concierge__toggle-btn')].forEach(e => e.classList.toggle('is-active', e === o)),
              [...n].forEach(e => e.classList.toggle('is-active', e.getAttribute('data-toggle-id') === t));
          }
        });
    }
  })(document.querySelector('.buy-concierge')),
  (e => {
    if (e) {
      const t = document.querySelector('.footer');
      let o = null;
      window.addEventListener('scroll', () => {
        window.requestAnimationFrame(() => {
          null === o &&
            (o = setTimeout(() => {
              (o = null), e.classList.toggle('is-show', window.pageYOffset > window.innerHeight && t.getBoundingClientRect().top - window.innerHeight > 0);
            }, 1e3));
        });
      });
    }
  })(document.querySelector('.contact-bar')),
  (e => {
    e &&
      'Accept' !== localStorage.getItem('YourPrivacy') &&
      (e.classList.remove('hide'),
      e.querySelector('.cookie__accept').addEventListener('click', () => {
        localStorage.setItem('YourPrivacy', 'Accept'), e.classList.add('hide');
      }));
  })(document.querySelector('.cookie')),
  (e => {
    e &&
      e.addEventListener('change', () => {
        [...e.elements].forEach(t => {
          t.checked && e.querySelector('.btn').setAttribute('data-modal', t.value);
        });
      });
  })(document.querySelector('.corporate-services-opening-bank-account__form-modal')),
  (e => {
    if (e.length) {
      const t = e => {
        [...document.querySelectorAll('[data-currency-site]')].forEach(t => {
          t.classList.toggle('hide', t.getAttribute('data-currency-site') !== e);
        });
      };
      localStorage.getItem('currency-site') && t(localStorage.getItem('currency-site')),
        [...e].forEach(e => {
          e.value === localStorage.getItem('currency-site') && (e.checked = !0),
            e.addEventListener('change', () => {
              localStorage.setItem('currency-site', e.value), t(e.value);
            });
        });
    }
  })(document.querySelectorAll('.set-currency-site')),
  (e => {
    0 !== e.length &&
      ([...e].forEach(e => {
        const t = e.querySelector('.dropdown__value');
        [...e.querySelectorAll('.dropdown__item-input')].forEach(o => {
          o.addEventListener('change', () => {
            e.classList.remove('is-open'), (t.textContent = o.parentNode.textContent);
          });
        });
      }),
      window.addEventListener('click', t => {
        const o = t.target.closest('.dropdown');
        [...e].forEach(e => {
          e.classList.toggle('is-open', e === o && !1 === o.classList.contains('is-open'));
        });
      }));
  })(document.querySelectorAll('.dropdown')),
  (e => {
    if (e.length) {
      const t = document.querySelector('.modal-done');
      [...e].forEach(e => {
        const o = e.querySelector('[type="submit"]');
        e.addEventListener('submit', async n => {
          n.preventDefault(), (o.disabled = !0), o.classList.add('is-loading');
          let i = {};
          [...e.elements].forEach(e => {
            e.name && (i[e.name] = e.value);
          }),
            (i.lang = document.documentElement.lang);
          const l = await fetch(e.action, {
            method: e.method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': e.elements.csrf.value },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(i),
          });
          let r = await l.json();
          console.log(r),
            t.classList.toggle('is-ok', 'ok' === r.status),
            (t.querySelector('.modal-done__title').innerHTML = r.title),
            (t.querySelector('.modal-done__text').innerHTML = r.text),
            (t.querySelector('.modal__close').innerHTML = r.button);
          const s = new CustomEvent('modalShow', { detail: { selector: 'done' } });
          window.modal.dispatchEvent(s), e.reset(), (o.disabled = !1), o.classList.remove('is-loading');
        });
      });
    }
  })(document.querySelectorAll('[data-send="fetch"]')),
  (e => {
    if (e) {
      const t = document.querySelector('#modal-gallery');
      [...e.querySelectorAll('.photo-gallery__item')].forEach((e, o) => {
        e.addEventListener('click', e => {
          e.preventDefault();
          const n = new CustomEvent('modalShow', { detail: { selector: 'gallery' } });
          window.modal.dispatchEvent(n);
          const i = new CustomEvent('setSlides', { detail: { index: o } });
          t.dispatchEvent(i);
        });
      });
    }
  })(document.querySelector('.photo-gallery')),
  (e => {
    if (e) {
      let t = null;
      window.addEventListener('scroll', () => {
        window.requestAnimationFrame(() => {
          null === t &&
            (t = setTimeout(() => {
              (t = null), e.classList.toggle('is-fixed', window.pageYOffset > 0);
            }, 100));
        });
      });
    }
  })(document.querySelector('.header')),
  (e => {
    e &&
      window.addEventListener('click', t => {
        t.target.closest('.lang__list') || (t.target.closest('.lang__current') ? e.classList.toggle('is-open') : e.classList.remove('is-open'));
      });
  })(document.querySelector('.header .lang')),
  (e => {
    if (!e.length) return;
    const t = document.createElement('script');
    if (
      ((t.src = './js/inputmask.min.js'),
      (t.onload = () => {
        [...e].forEach(e => {
          let t;
          e.classList.contains('inputmask--phone') && (t = new Inputmask({ mask: e.getAttribute('data-mask'), placeholder: '0' })), t.mask(e);
        });
      }),
      localStorage.getItem('fastLoadScript'))
    )
      document.head.appendChild(t);
    else {
      let o = !0;
      const n = () => {
          o && ((o = null), document.head.append(t)), window.removeEventListener('fastLoadScript', n);
        },
        i = new IntersectionObserver((e, t) => {
          let i = !1;
          (i = [...e].some(e => (t.unobserve(e.target), e.isIntersecting))) ? n() : (o = setTimeout(n, 3e4));
        });
      [...e].forEach(e => i.observe(e)), window.addEventListener('fastLoadScript', n);
    }
  })(document.querySelectorAll('.inputmask')),
  (e => {
    if (e) {
      const t = e.querySelector('.marquee__text p');
      (t.style.animationDuration = t.clientWidth / 70 + 's'), t.insertAdjacentElement('afterend', t.cloneNode(!0));
    }
  })(document.querySelector('.marquee')),
  (e => {
    if (null === e) return;
    let t = window.pageYOffset;
    const o = document.querySelector('.wrapper');
    (e => {
      e &&
        e.addEventListener('click', () => {
          (t = window.pageYOffset),
            document.documentElement.classList.add('scroll-behavior-off'),
            setTimeout(() => {
              (o.style.top = -t + 'px'), document.body.classList.add('menu-show'), window.scrollTo(0, 0);
            });
        });
    })(document.querySelector('.btn-menu-open')),
      (e => {
        e &&
          e.addEventListener('click', () => {
            document.body.classList.remove('menu-show'), (o.style.top = 0), window.scrollTo(0, t), setTimeout(() => document.documentElement.classList.remove('scroll-behavior-off'));
          });
      })(document.querySelector('.btn-menu-close')),
      e.addEventListener('click', o => {
        ((o.target.closest('a') && o.target.closest('a').href.includes('#')) || o.target === e) &&
          (document.body.classList.remove('menu-show'), window.scrollTo(0, t), setTimeout(() => document.documentElement.classList.remove('scroll-behavior-off')));
      }),
      document.querySelector('.btn-menu-lang').addEventListener('click', () => e.classList.add('is-level2')),
      document.querySelector('.btn-menu-back').addEventListener('click', () => e.classList.remove('is-level2'));
  })(document.querySelector('.mobile-menu')),
  (e => {
    if (!e) return;
    const t = e.querySelectorAll('.modal__item'),
      o = (document.querySelectorAll('[data-modal]'), document.querySelector('.wrapper'));
    let n = null,
      i = window.pageYOffset;
    e.addEventListener('hide', () => {
      document.body.classList.remove('modal-show'),
        (o.style.top = 0),
        window.scrollTo(0, i),
        (n = !1),
        setTimeout(() => document.documentElement.classList.remove('scroll-behavior-off'), 500),
        (document.querySelector('#modal-video').innerHTML = '');
    }),
      e.addEventListener('keyup', t => {
        'Escape' === t.key && e.dispatchEvent(new Event('hide'));
      });
    const l = l => {
      n || (i = window.pageYOffset),
        (n = e.querySelector('.modal__item--' + l)),
        document.body.classList.toggle('modal-show--full', n.classList.contains('is-full')),
        [...t].forEach(e => e.classList.toggle('visuallyhidden', e !== n)),
        document.documentElement.classList.add('scroll-behavior-off'),
        setTimeout(() => {
          (o.style.top = -i + 'px'), document.body.classList.add('modal-show'), window.scrollTo(0, 0), n.focus();
        });
    };
    e.addEventListener('click', t => {
      (t.target.classList.contains('modal') || t.target.closest('.modal__close')) && e.dispatchEvent(new Event('hide'));
    }),
      document.addEventListener('click', e => {
        let t = e.target;
        for (; t !== document && null !== t; ) t.hasAttribute('data-modal') && l(t.getAttribute('data-modal')), (t = t.parentNode);
      }),
      e.addEventListener('modalShow', e => l(e.detail.selector));
  })(document.querySelector('.modal')),
  (e => {
    0 !== e.length &&
      ([...e].forEach(e => {
        const t = e.querySelector('.phone-country__mask'),
          o = e.querySelector('.phone-country__code'),
          n = e.querySelector('.phone-country__toggle-flag');
        [...e.querySelectorAll('.phone-country__item')].forEach(e => {
          e.addEventListener('click', () => {
            let i,
              l = e.getAttribute('data-mask');
            (l = (l = (l = l.replace(/\\9/g, '$')).replace(/9/g, '0')).replace(/\$/g, '9')),
              t.setAttribute('placeholder', l),
              (t.value = ''),
              Inputmask(e.getAttribute('data-mask')).mask(t),
              (i = new Inputmask({ mask: e.getAttribute('data-mask'), placeholder: '0' })).mask(t),
              t.focus(),
              (o.value = e.getAttribute('data-code')),
              (n.innerHTML = e.querySelector('.phone-country__item-flag').innerHTML);
          });
        });
      }),
      window.addEventListener('click', t => {
        const o = t.target.closest('.phone-country__toggle') ? t.target.closest('.phone-country') : null;
        [...e].forEach(e => {
          e.classList.toggle('is-open', e === o && !1 === o.classList.contains('is-open'));
        });
      }));
  })(document.querySelectorAll('.phone-country')),
  (e => {
    e.length &&
      [...e].forEach(e => {
        const t = e.querySelector('.readmore-text__btn'),
          o = t.textContent;
        t.addEventListener('click', () => {
          e.classList.contains('is-open') ? (e.classList.remove('is-open'), (t.textContent = o)) : (e.classList.add('is-open'), (t.textContent = t.getAttribute('data-alt')));
        });
      });
  })(document.querySelectorAll('.readmore-text')),
  (e => {
    if (e) {
      let t = window.pageYOffset;
      const o = document.querySelector('.wrapper');
      document.querySelector('.real-estate-filter__mobile-open').addEventListener('click', () => {
        (t = window.pageYOffset),
          document.documentElement.classList.add('scroll-behavior-off'),
          setTimeout(() => {
            (o.style.top = -t + 'px'), document.body.classList.add('real-estate-filter-mobile-show'), window.scrollTo(0, 0);
          });
      }),
        document.body.appendChild(e),
        e.querySelector('.real-estate-filter-mobile__close').addEventListener('click', () => {
          document.body.classList.remove('real-estate-filter-mobile-show'),
            (o.style.top = 0),
            window.scrollTo(0, t),
            setTimeout(() => document.documentElement.classList.remove('scroll-behavior-off'));
        });
    }
  })(document.querySelector('.real-estate-filter-mobile')),
  (e => {
    if (!e.length) return;
    [...e].forEach(e => {
      let t = null,
        o = null,
        n = null;
      const i = document.createElement('div'),
        l = document.createElement('div'),
        r = document.createElement('div'),
        s = document.createElement('button'),
        a = document.createElement('button'),
        c = e.querySelectorAll('.swiper-slide'),
        d = (c.length, e.classList.contains('swiper-container--standart')),
        u = e.classList.contains('swiper-container--realty'),
        m = e.classList.contains('swiper-container--gallery'),
        w = e.classList.contains('swiper-container--related');
      if (
        ((l.className = 'swiper-pagination'),
        (i.className = 'swiper-controls'),
        (r.className = 'swiper-navigation'),
        (a.className = 'swiper-button-prev button'),
        (s.className = 'swiper-button-next button'),
        a.setAttribute('aria-label', 'Previous slide'),
        s.setAttribute('aria-label', 'Next slide'),
        (a.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16"><path d="m5.22 7.33 3.57-3.57-.94-.95L2.67 8l5.18 5.19.94-.95-3.57-3.57h8.11V7.33H5.22Z"/></svg>'),
        (s.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M10.78 7.33 7.21 3.76l.94-.95L13.33 8l-5.18 5.19-.94-.95 3.57-3.57H2.67V7.33h8.11Z"/></svg>'),
        r.appendChild(a),
        r.appendChild(s),
        i.appendChild(r),
        i.appendChild(l),
        (n = () => {
          t && (t.destroy(!1, !0), (t = void 0)),
            l.classList.add('hide'),
            r.classList.add('hide'),
            i.classList.add('hide'),
            e.closest('.swiper-container-style') && e.closest('.swiper-container-style').classList.remove('swiper-container-style');
        }),
        d &&
          (r.remove(),
          (o = () => {
            (o = !1), new Swiper(e, { loop: !0, autoplay: { delay: 3e3 }, pagination: { el: l, clickable: !0, bulletClass: 'button', bulletActiveClass: 'is-active' } });
          })),
        w &&
          ((o = () => {
            n(),
              window.innerWidth < 768 &&
                (e.parentNode.classList.add('swiper-container-style'), r.classList.remove('hide'), i.classList.remove('hide'), (t = new Swiper(e, { loop: !0, navigation: { nextEl: s, prevEl: a } })));
          }),
          e.addEventListener('swiperResize', o)),
        u &&
          (l.remove(),
          (o = () => {
            (o = !1),
              e.parentNode.parentNode.classList.add('swiper-container-style'),
              e.parentNode.appendChild(i),
              new Swiper(e, {
                loop: !0,
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 36,
                navigation: { nextEl: s, prevEl: a },
                breakpoints: { 320: { slidesPerView: 1 }, 768: { slidesPerView: 2, spaceBetween: 24 }, 1200: { slidesPerView: 3, spaceBetween: 36 } },
              });
          })),
        m)
      ) {
        const n = e.querySelector('.swiper-container-counter__current');
        (modalBox = document.querySelector('#modal-gallery')),
          (desktopBox = document.querySelector('#desktop-gallery')),
          l.remove(),
          (o = () => {
            window.innerWidth < 768 ? desktopBox.appendChild(e.parentNode) : modalBox.appendChild(e.parentNode),
              null === t &&
                (t = new Swiper(e, {
                  loop: !0,
                  navigation: { nextEl: s, prevEl: a },
                  on: {
                    slideChange: () => {
                      n.textContent = e.swiper.realIndex + 1;
                    },
                  },
                }));
          }),
          e.addEventListener('swiperResize', o),
          modalBox.addEventListener('setSlides', e => {
            console.log(e.detail.index), t.slideTo(e.detail.index + 1, 0), (n.textContent = e.detail.index + 1);
          });
      }
      e.addEventListener('swiperJsLoad', () => {
        e.appendChild(i), [...e.querySelectorAll('[loading="lazy"]')].forEach(e => e.setAttribute('loading', 'eager')), [...c].forEach(e => e.classList.remove('hide')), o();
      });
    });
    let t = null,
      o = window.innerWidth;
    window.addEventListener('resize', () => {
      window.requestAnimationFrame(() => {
        null === t &&
          (t = setTimeout(() => {
            (t = null), o !== window.innerWidth && ((o = window.innerWidth), window.Swiper && [...e].forEach(e => e.dispatchEvent(new Event('swiperResize'))));
          }, 1e3));
      });
    });
    const n = document.createElement('script');
    if (((n.src = './js/swiper.min.js'), (n.onload = () => [...e].forEach(e => e.dispatchEvent(new Event('swiperJsLoad')))), localStorage.getItem('fastLoadScript'))) document.head.appendChild(n);
    else {
      let t = !0;
      const o = () => {
          t && ((t = null), document.head.append(n)), window.removeEventListener('fastLoadScript', o);
        },
        i = new IntersectionObserver((e, n) => {
          let i = !1;
          (i = [...e].some(e => (n.unobserve(e.target), e.isIntersecting))) ? o() : (t = setTimeout(o, 3e4));
        });
      [...e].forEach(e => i.observe(e)), window.addEventListener('fastLoadScript', o);
    }
  })(document.querySelectorAll('.swiper-container')),
  (e => {
    e.length > 0 &&
      [...e].forEach(e => {
        const t = e.querySelectorAll('.tabs__btn'),
          o = e.querySelectorAll('.tabs__item');
        [...t].forEach(e => {
          e.addEventListener('change', () => {
            [...o].forEach(t => t.classList.toggle('visuallyhidden', t.getAttribute('data-tab') !== e.value));
          });
        });
      });
  })(document.querySelectorAll('.tabs')),
  (e => {
    if (e.length) {
      let t = new MutationObserver(e => {
        const t = e[0].target.getBoundingClientRect();
        console.log(t.left > window.innerWidth - t.right);
      });
      [...e].forEach(e => {
        e.querySelector('summary');
        t.observe(e, { attributes: !0 }),
          e.addEventListener('mouseenter', () => {
            window.innerWidth >= 1200 && (e.open = !0);
          }),
          e.addEventListener('mouseleave', () => {
            window.innerWidth >= 1200 && (e.open = !1);
          });
      }),
        window.addEventListener('click', t => {
          const o = t.target.closest('.tooltip');
          [...e].forEach(e => {
            o !== e && (e.open = !1);
          });
        });
    }
  })(document.querySelectorAll('.tooltip details')),
  (e => {
    if (e.length) {
      let t = new MutationObserver(e => {
        const t = e[0].target,
          o = t.querySelector('.tooltip-info__inner');
        if (t.open) {
          const e = o.getBoundingClientRect();
          if (
            (document.documentElement.clientWidth < e.right ? (o.style.marginLeft = document.documentElement.clientWidth - e.right + 'px') : e.left < 0 && (o.style.marginLeft = -e.left + 'px'),
            window.innerWidth < 768)
          ) {
            document.querySelector('#mobile-tooltip').innerHTML = o.innerHTML;
            const e = new CustomEvent('modalShow', { detail: { selector: 'tooltip' } });
            window.modal.dispatchEvent(e);
          }
        } else o.removeAttribute('style');
      });
      [...e].forEach(e => {
        e.querySelector('.tooltip-info__btn');
        t.observe(e, { attributes: !0 }),
          e.addEventListener('mouseenter', () => {
            window.innerWidth >= 1200 && (e.open = !0);
          }),
          e.addEventListener('mouseleave', () => {
            window.innerWidth >= 1200 && (e.open = !1);
          });
      }),
        window.addEventListener('click', t => {
          const o = t.target.closest('.tooltip-info');
          [...e].forEach(e => {
            o !== e && (e.open = !1);
          });
        });
    }
  })(document.querySelectorAll('.tooltip-info')),
  (e => {
    if (!e.length) return;
    const t = () => {
      [...e].forEach(e => {
        console.log(e), e.setAttribute('preload', 'auto'), e.setAttribute('autoplay', 'autoplay'), e.setAttribute('playsinline', 'playsinline'), e.play();
      });
    };
    if (localStorage.getItem('fastLoadScript')) t();
    else {
      let o = !0;
      const n = () => {
          o && ((o = null), t()), window.removeEventListener('fastLoadScript', n);
        },
        i = new IntersectionObserver((e, n) => {
          let i = !1;
          (i = [...e].some(e => (n.unobserve(e.target), e.isIntersecting))) ? t() : (o = setTimeout(t, 3e4));
        });
      [...e].forEach(e => i.observe(e)), window.addEventListener('fastLoadScript', n);
    }
  })(document.querySelectorAll('video[preload="none"]')),
  (e => {
    if (e) {
      e.querySelector('.warning__close').addEventListener('click', () => {
        (e.style.marginTop = '-' + e.clientHeight + 'px'),
          localStorage.setItem('warning', 'hide'),
          setTimeout(() => {
            e.remove(), window.dispatchEvent(new Event('resize'));
          }, 1e3);
      });
    }
  })(document.querySelector('.warning')),
  (e => {
    if (e.length) {
      const t = document.querySelector('#modal-video');
      [...e].forEach(e => {
        const o = e.getAttribute('data-youtube');
        e.addEventListener('click', e => {
          e.preventDefault();
          const n = document.createElement('iframe');
          n.setAttribute('allowfullscreen', ''), n.setAttribute('allow', 'autoplay'), n.setAttribute('src', 'https://www.youtube.com/embed/' + o + '?rel=0&showinfo=0&autoplay=1'), t.appendChild(n);
          const i = new CustomEvent('modalShow', { detail: { selector: 'video' } });
          window.modal.dispatchEvent(i);
        });
      });
    }
  })(document.querySelectorAll('[data-youtube]')),
  (e => {
    if (!e.length) return;
    const t = () => {
      [...e].forEach(e => {
        console.log(e), e.setAttribute('preload', 'auto'), e.setAttribute('autoplay', 'autoplay'), e.setAttribute('playsinline', 'playsinline'), e.play();
      });
    };
    if (localStorage.getItem('fastLoadScript')) t();
    else {
      let o = !0;
      const n = () => {
          o && ((o = null), t()), window.removeEventListener('fastLoadScript', n);
        },
        i = new IntersectionObserver((e, n) => {
          let i = !1;
          (i = [...e].some(e => (n.unobserve(e.target), e.isIntersecting))) ? t() : (o = setTimeout(t, 3e4));
        });
      [...e].forEach(e => i.observe(e)), window.addEventListener('fastLoadScript', n);
    }
  })(document.querySelectorAll('video[preload="none"]'));
setTimeout(() => {
  fetch('/palladiumgroup/country.json')
    .then(t => t.json())
    .then(t => {
      document.querySelectorAll('div.phone-country__list').forEach(e => {
        t.forEach(t => {
          let n = document.createElement('button');
          (n.className = 'phone-country__item button'),
            n.setAttribute('type', 'button'),
            n.setAttribute('data-mask', t.mask),
            n.setAttribute('data-code', t.code_str),
            (n.innerHTML = `<span class="phone-country__item-name">${t.name}</span><span class="phone-country__item-flag"><img src="${t.flag}" width="16" height="12" loading="lazy" alt="${t.name}"></span><span class="phone-country__item-pref">${t.code_num}</span>`),
            e.appendChild(n);
        });
      });
    });
}, 8000);
