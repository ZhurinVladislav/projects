document.addEventListener('DOMContentLoaded', () => {
  const arrIframe = document.querySelectorAll('iframe');
  const arrImg = document.querySelectorAll('img');

  arrIframe.forEach(el => {
    el.setAttribute('loading', 'lazy');
  });

  arrImg.forEach(el => {
    el.setAttribute('loading', 'lazy');
  });
});
