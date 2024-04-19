const preloader = html => {
  const preloaderWrapper = document.getElementById('preloader');

  if (!preloaderWrapper) return;

  setTimeout(() => {
    preloaderWrapper.classList.add('loading');
  }, 200);

  setTimeout(() => {
    preloaderWrapper.remove();
    html.classList.remove('pre-hidden');
  }, 400);
};

const html = document.querySelector('html');
html.classList.add('pre-hidden');

window.addEventListener('load', () => preloader(html));
