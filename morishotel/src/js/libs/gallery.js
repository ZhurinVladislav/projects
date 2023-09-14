document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.swiper-wrapper'),
        slide = document.querySelectorAll('.swiper-slide'),
        arraySlide = Array.from(slide);
        nextArrow = document.querySelector('.arrow-wrapper__right');
        prevArrow = document.querySelector('.arrow-wrapper__left');
        
  let clonedNode,
      slideSum,
      activeSlides,
      number = document.querySelector('.arrow-wrapper__pagination');
  
  const swiper = new Swiper('.swiper', {
    loop: true,
    slideActiveClass: 'slider-item--active',
    loopedSlides: 4,
    speed: 900,
    spaceBetween: 20,
    allowTouchMove: false,
    slidesPerView: 1,
    centeredSlides: true,
    navigation: {
      nextEl: nextArrow,
      prevEl: prevArrow,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        // allowTouchMove: true,
        centeredSlides: false,
      },
      // 768: {
      //   centeredSlides: false,
      //   slidesPerView: 2,
      //   allowTouchMove: true,
      // },
      // 991: {
      //   slidesPerView: 2,
      //   centeredSlides: false,
      //   allowTouchMove: true,
      // },
      // 3840: {
      //   centeredSlides: true,
      //   allowTouchMove: false,
      // }
    },
  });
  
  
  for (let i = 0; i < arraySlide.length; i++) {
    slideSum = i + 1;
    clonedNode = arraySlide[i].cloneNode(true);
    clonedNode.setAttribute('data-swiper-slide-index', `${6 + i}`);
    clonedNode.setAttribute('slide-index', `${i + 1}`)
    clonedNode.classList.add('copy')
    slider.prepend(clonedNode);
  }
  
  function sort() {
    const nodeList = document.querySelectorAll('.swiper-slide');
    let itemsArray = [];
    let parent = nodeList[0].parentNode;
    for (let i = 0; i < nodeList.length; i++) {    
      itemsArray.push(parent.removeChild(nodeList[i]));
    }
    itemsArray.sort(function(nodeA, nodeB) {
        let textA = nodeA.getAttribute('data-swiper-slide-index'),
            textB = nodeB.getAttribute('data-swiper-slide-index'),
            numberA = parseInt(textA),
            numberB = parseInt(textB);

        if (numberA < numberB) {
          return -1;
        }
        if (numberA > numberB) {
          return 1;
        }
        return 0;
      })
      .forEach(function(node) {
        if (node.getAttribute('data-swiper-slide-index') <= 5) {
          parent.append(node)
        } 
        else if (node.getAttribute('data-swiper-slide-index') > 5) {
          parent.prepend(node)
        }
      });
  }
  sort()

  function reverseArr() {
    const sliderList = document.querySelectorAll('.swiper-slide');
    let arrResult = [];
    let parentSlider = sliderList[0].parentNode;
    for (let i = 0; i < sliderList.length; i++) {
      if (sliderList[i].getAttribute('data-swiper-slide-index') > 5) {
        arrResult.push(parentSlider.removeChild(sliderList[i]));
      }   
      
    }
    arrResult.forEach(function(node) {
      parentSlider.prepend(node)
    });
  }

  reverseArr()

  for (let i = 0; i < slide.length; i++) {
    slide[i].setAttribute('slide-index', `${i + 1}`)
  }

  // Пагинация
  function paginationCount() {
    const conutSlide = document.querySelector('.pagination__slide-count'),
          allSlide = document.querySelector('.pagination__all-slide');

    let count;
    activeSlides = document.querySelector('.slider-item--active');
  
    if (activeSlides.classList.contains('copy')) {
      count = 1;
    } else {
      count = activeSlides.getAttribute('slide-index');
    }

    conutSlide.textContent = count;
    allSlide.textContent = slideSum;
    number.textContent = `${count} / ${slideSum}`
    nextArrow.addEventListener('click', () => {
      activeSlides = document.querySelector('.slider-item--active')
      
      if (count === 1) {
        count++
      } else {
        count = activeSlides.getAttribute('slide-index');
      }
        
      number.textContent = `${count} / ${slideSum}`
    })

    prevArrow.addEventListener('click', () => {
      activeSlides = document.querySelector('.slider-item--active')
      count = activeSlides.getAttribute('slide-index');
      number.textContent = `${count} / ${slideSum}`
    })
  }
  paginationCount()
})

