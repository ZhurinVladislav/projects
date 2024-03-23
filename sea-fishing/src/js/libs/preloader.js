const preloader = () => {
  document.querySelector('body').classList.add('loading');
};

window.addEventListener('load', preloader);
