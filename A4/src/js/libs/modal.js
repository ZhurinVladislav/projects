/*
document.addEventListener('DOMContentLoaded', function () {
  const attributeImg = document.querySelectorAll('[data-open]');
//   const overlayTitle = document.querySelector('.overlay__title');
  const overlayImg = document.querySelector('.overlay__img');
  // const close = document.querySelector('.overlay__close');

  attributeImg.forEach(item => {
    item.addEventListener('click',function () {
      let itemSrc = this.getAttribute('src');
    //   let imgTitle = this.getAttribute('alt');

    //   overlayTitle.textContent = imgTitle;
      overlayImg.setAttribute('src', itemSrc);
    })
  })

  // close.addEventListener('click', function() {
  //   setTimeout(function() {
  //     srcImg.src = '';
  //   }, 200);
  // })


});
*/

document.addEventListener('DOMContentLoaded', () => {
  const attributeImg = document.querySelectorAll('[data-open]');
    //const overlayTitle = document.querySelector('.overlay__title');
  const overlayImg = document.querySelector('.overlay__img');
  // const close = document.querySelector('.overlay__close');

  attributeImg.forEach(item => {
    item.addEventListener('click',function () {
      let itemSrc = this.getAttribute('src');
    //   let imgTitle = this.getAttribute('alt');

    //   overlayTitle.textContent = imgTitle;
      overlayImg.setAttribute('src', itemSrc);
    })
  })

  // close.addEventListener('click', function() {
  //   setTimeout(function() {
  //     srcImg.src = '';
  //   }, 200);
  // })

});

$(document).on('pdopage_load', function(e, config, response) {
    let elem = document.querySelector('.main__container');
    let loading ;
    let imagesLoad = document.querySelectorAll('.main__container .main__img')
    
    imagesLoad.forEach((image, index, arr) => {
        image.addEventListener("load", () => {
            if(index == imagesLoad.length - 1) {
                
                let iso = new Isotope( elem, {
                    itemSelector: '.main__item',
                    layoutMode: 'masonry',
                });
                
            }
        })
    });
    

    const attributeImg = document.querySelectorAll('[data-open]');
    const overlayImg = document.querySelector('.overlay__img');
    
    attributeImg.forEach(item => {
        
        item.addEventListener("load", () => {
            
            item.addEventListener('click',function () {
                let itemSrc = this.getAttribute('src');
        
                overlayImg.setAttribute('src', itemSrc);
            })

        })
        
        // item.addEventListener('click',function () {
        //     let itemSrc = this.getAttribute('src');
        
        //     overlayImg.setAttribute('src', itemSrc);
        // })
    })

});

