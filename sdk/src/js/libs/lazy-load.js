const loadImg = () => {
  const arrIframe = Array.from(document.querySelectorAll('iframe'));
  const arrAllImg = Array.from(document.querySelectorAll('img'));
  const arrImgAndIframe = [...arrIframe, ...arrAllImg];

  const arrBgImg = Array.from(document.querySelectorAll('[data-image]'));
  const arrAttrImg = Array.from(document.querySelectorAll('img[data-src]'));

  if (!arrBgImg || !arrAttrImg || !arrImgAndIframe) return;

  arrBgImg.forEach(el => {
    const srcImg = el.getAttribute('data-image');

    el.style.backgroundImage = `url(${srcImg})`;

    el.removeAttribute('data-image');
  });

  arrAttrImg.forEach(el => {
    if (el.dataset.src) el.src = el.dataset.src;

    el.removeAttribute('data-src');
  });

  arrImgAndIframe.forEach(el => {
    el.setAttribute('loading', 'lazy');
  });
};

window.addEventListener('load', loadImg);
