document.addEventListener('DOMContentLoaded', () => {
  /**
   * Аккордеон
   * @returns void
   */
  const accordion = () => {
    const accordion = Array.from(document.querySelectorAll('.js-accordion'));
    const accordionBtn = Array.from(document.querySelectorAll('.js-accordion-btn'));
    const accordionText = Array.from(document.querySelectorAll('.js-accordion-content'));

    if (accordion.length === 0) return;

    accordionText.forEach(el => el.classList.add('accordion-hidden'));

    accordionBtn[0].classList.add('active');
    accordionBtn[0].parentNode.classList.add('active');
    accordionText[0].style.maxHeight = `${accordionText[0].scrollHeight}px`;

    accordionBtn.forEach(el => {
      el.addEventListener('click', () => {
        const parentItem = el.parentNode;
        const accordionContent = el.nextElementSibling;

        if (accordionContent.style.maxHeight) {
          accordionText.forEach(el => (el.style.maxHeight = null));
          parentItem.classList.remove('active');
          el.classList.remove('active');
        } else {
          accordionText.forEach(el => {
            el.style.maxHeight = null;
            el.parentNode.classList.remove('active');
            el.previousElementSibling.classList.remove('active');
          });
          accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
          parentItem.classList.add('active');
          el.classList.add('active');
        }
      });
    });
  };

  accordion();

  /**
   * Функция для управления кнопкой прокрутки вверх.
   */
  const scrollTop = () => {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    const updateScrollButton = () => {
      btn.classList.toggle('visible', window.scrollY > 100);
    };

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateScrollButton);
    updateScrollButton();
  };

  scrollTop();
});
