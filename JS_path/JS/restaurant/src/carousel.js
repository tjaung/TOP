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

    // Create container div
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container');

    // Create slider wrapper div
    const sliderWrapperDiv = document.createElement('div');
    sliderWrapperDiv.classList.add('slider-wrapper');

    // Create inner wrapper div
    const innerWrapperDiv = document.createElement('div');
    innerWrapperDiv.classList.add('inner-wrapper');

    // Create slide divs and append them to inner wrapper
    for (let i = 1; i <= 5; i++) {
        let slideDiv = document.createElement('div');
        slideDiv.classList.add('slide');
        slideDiv.textContent = i;
        innerWrapperDiv.appendChild(slideDiv);
    }

    // Append inner wrapper to slider wrapper
    sliderWrapperDiv.appendChild(innerWrapperDiv);

    // Create previous button div
    const prevButtonDiv = document.createElement('div');
    prevButtonDiv.classList.add('button', 'prev', 'arrow');
    
    // Create next button div
    const nextButtonDiv = document.createElement('div');
    nextButtonDiv.classList.add('button', 'next', 'arrow');

    // create scroll indicator arrow
    const indicatorArrow = document.createElement('a');
    indicatorArrow.classList.add('indicator-arrow', 'button');
    indicatorArrow.href = '#screen-info';

    // Append all elements to the container div
    containerDiv.appendChild(sliderWrapperDiv);
    containerDiv.appendChild(prevButtonDiv);
    containerDiv.appendChild(nextButtonDiv);
    containerDiv.appendChild(indicatorArrow);

    return containerDiv
  }
