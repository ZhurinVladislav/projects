const preloader = () => {
  const preloader = document.getElementById('preloader');
  const html = document.querySelector('html');

  setTimeout(() => {
    preloader.classList.add('loading');
  }, 200);

  setTimeout(() => {
    preloader.remove();
    html.classList.remove('pre-hidden');
  }, 400);
};

window.addEventListener('load', preloader);
