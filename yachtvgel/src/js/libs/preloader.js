const html = document.querySelector('html');
html.classList.add('pre-hidden');

const preloader = html => {
  const preloader = document.getElementById('preloader-new');

  if (!preloader) return;

  preloader.className += ' hidden';
  html.classList.remove('pre-hidden');
};

window.addEventListener('load', () => preloader(html));
