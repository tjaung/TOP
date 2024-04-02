import { createElementWithClass } from "./helpers";

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
    for (let i = 1; i <= 5; i++) {
        let slideDiv = createElementWithClass('div', ['slide'])
        slideDiv.textContent = i;
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

    if(mediaQuery.matches){
      indicatorArrow.classList.add('hide')
    }

    // Append all elements to the container div
    containerDiv.appendChild(sliderWrapperDiv);
    containerDiv.appendChild(prevButtonDiv);
    containerDiv.appendChild(nextButtonDiv);
    containerDiv.appendChild(indicatorArrow);

    return containerDiv
  }
