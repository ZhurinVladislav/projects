// АНИМАЦИЯ С ЧИСЛАМИ
const numberAnimate = () => {
  if (!document.querySelector('.js-number')) return;

  const animate = () => {
    const numWrapper = [...Array.from(document.querySelectorAll('.js-number-wrapper'))];
    const numbers = [...Array.from(document.querySelectorAll('.js-number'))];

    const easeOutQuart = (t, b, c, d) => {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };

    numWrapper.forEach(el => {
      el.setAttribute('position', `${el.offsetTop}`);
      el.setAttribute('animate', false);
    });

    const animateNumbers = (num, value) => {
      const time = {
        total: 2000,
        start: performance.now(),
      };

      const tick = now => {
        const elapsed = now - time.start;
        const progress = easeOutQuart(elapsed, 0, 1, time.total);

        num.textContent = Math.round(progress * value).toLocaleString();

        elapsed < time.total ? window.requestAnimationFrame(tick) : null;
      };
      window.requestAnimationFrame(tick);
    };

    const startAnimate = el => {
      el.setAttribute('animate', true);

      numbers.forEach(num => {
        const maxNum = num.getAttribute('data-target');
        animateNumbers(num, maxNum);
      });
    };

    window.addEventListener('scroll', () => {
      let scrollY = 0;

      numWrapper.forEach(el => {
        const position = parseInt(el.getAttribute('position')) - document.documentElement.clientWidth / 3;
        const animate = el.getAttribute('animate');

        scrollY = window.scrollY;
        numbers.forEach(num => {
          const textNum = num.textContent;

          if (textNum !== '0') return;

          if (position <= scrollY && animate === 'false') startAnimate(el);
          return;
        });
      });
    });

    numbers.forEach(el => {
      const elPosition = {
        top: window.scrollY + el.getBoundingClientRect().top,
        left: window.scrollX + el.getBoundingClientRect().left,
        right: window.scrollX + el.getBoundingClientRect().right,
        bottom: window.scrollY + el.getBoundingClientRect().bottom,
      };

      const windowPosition = {
        top: window.scrollY,
        left: window.scrollX,
        right: window.scrollX + document.documentElement.clientWidth,
        bottom: window.scrollY + document.documentElement.clientHeight,
      };

      if (elPosition.bottom > windowPosition.top && elPosition.top < windowPosition.bottom && elPosition.right > windowPosition.left && elPosition.left < windowPosition.right) {
        startAnimate(el);
      }
    });
  };

  window.addEventListener('load', () => animate());
};
numberAnimate();
