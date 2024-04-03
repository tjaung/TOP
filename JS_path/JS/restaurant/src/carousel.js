import { createElementWithClass } from "./helpers";
import slide1 from './slide1.png';
import slide2 from './slide2.png';
import slide3 from './slide3.png';
import slide4 from './slide4.png';
import slide5 from './slide5.png';
import slide6 from './slide6.png';

export function rotateCarousel() {

    var inWrap = document.querySelector('.inner-wrapper');
    var slides = document.querySelectorAll('.slide');
  
    function slideNext() {
        inWrap.style.transition = 'opacity 0.5s ease-in-out';
        inWrap.style.opacity = '0';

        setTimeout(function() {
            inWrap.style.transition = 'opacity 0.5s ease-in-out';
            inWrap.style.opacity = '1';
            inWrap.appendChild(inWrap.childNodes[0].cloneNode(true));
            inWrap.removeChild(inWrap.childNodes[0])
        }, 500);
    }
  
    // Enabling auto scroll
    var sliderInterval = setInterval(slideNext, 6000);
  
    document.querySelector('.prev').addEventListener('click', function() {
        inWrap.style.transition = 'opacity 0.5s ease-in-out';
        inWrap.style.opacity = '0';
    
        setTimeout(function() {
          inWrap.style.transition = 'opacity 0.5s ease-in-out';
          inWrap.style.opacity = '1';
          inWrap.insertBefore(inWrap.childNodes[inWrap.childNodes.length -1], inWrap.childNodes[0]);
        }, 500);
      });
    
      document.querySelector('.next').addEventListener('click', function() {
        clearInterval(sliderInterval);
        slideNext();
      });
}
  
export function createCarousel() {

    const mediaQuery = window.matchMedia( '( min-width: 768px )' )

    // Create container div
    const containerDiv = createElementWithClass('div', ['container'])

    // Create slider wrapper div
    const sliderWrapperDiv = createElementWithClass('div', ['slider-wrapper'])

    // Create inner wrapper div
    const innerWrapperDiv = createElementWithClass('div', ['inner-wrapper'])

    // Create slide divs and append them to inner wrapper
    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();
    const img4 = new Image();
    const img5 = new Image();
    const img6 = new Image();

    img1.src = slide1;
    img2.src = slide2;
    img3.src = slide3;
    img4.src = slide4;
    img5.src = slide5;
    img6.src = slide6;

    const imgs = [img1, img2, img3, img4, img5, img6]

    for (let i = 0; i <= 5; i++) {
        let slideDiv = createElementWithClass('div', ['slide'])
        // slideDiv.textContent = i;
        slideDiv.append(imgs[i])
        innerWrapperDiv.appendChild(slideDiv);
    }

    // Append inner wrapper to slider wrapper
    sliderWrapperDiv.appendChild(innerWrapperDiv);

    // Create previous button div
    const prevButtonDiv = createElementWithClass('div', ['button', 'prev', 'arrow'])
    
    // Create next button div
    const nextButtonDiv = createElementWithClass('div', ['button', 'next', 'arrow'])
    
    // create scroll indicator arrow
    const indicatorArrow = createElementWithClass('a', ['indicator-arrow', 'button'])
    indicatorArrow.href = '#screen-info';
    indicatorArrow.setAttribute("id", "indicatorArrow")

    //create title
    const title = createElementWithClass('h1', ['title'], 'shef')

    if(mediaQuery.matches){
      indicatorArrow.classList.add('hide')
    }

    // Append all elements to the container div
    containerDiv.appendChild(sliderWrapperDiv);
    containerDiv.appendChild(prevButtonDiv);
    containerDiv.appendChild(nextButtonDiv);
    containerDiv.appendChild(title);
    containerDiv.appendChild(indicatorArrow);

    return containerDiv
  }

export function createImageCarousel() {
  const slideDiv = document.createElement('div')
  // const slides = document.createElement('div') // chagne to img

  slideDiv.classList.add('slides')
  // slides.innerHTML = 'INSERT SLIDES HERE'
  slideDiv.appendChild(Carousel.createCarousel())

  document.addEventListener('DOMContentLoaded', Carousel.rotateCarousel)

  return Carousel.createCarousel()
}