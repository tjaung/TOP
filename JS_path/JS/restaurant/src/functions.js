import { createNav } from "./nav";
import { renderHome } from './home'
import * as Carousel from './carousel'
import { createElementWithClass } from "./helpers";

function createImageCarousel() {
    const slideDiv = document.createElement('div')
    // const slides = document.createElement('div') // chagne to img

    slideDiv.classList.add('slides')
    // slides.innerHTML = 'INSERT SLIDES HERE'
    slideDiv.appendChild(Carousel.createCarousel())

    document.addEventListener('DOMContentLoaded', Carousel.rotateCarousel)

    return Carousel.createCarousel()
}

function initialize() {
    const body = document.getElementById('body');
    const siteContent = createElementWithClass('div', ['site-content'])

    const screenInfo = createElementWithClass('div', ['screen-info'])
    screenInfo.setAttribute("id", "screen-info")

    body.appendChild(createNav())
    siteContent.appendChild(createImageCarousel())
    siteContent.appendChild(screenInfo)
    body.appendChild(siteContent)

    screenInfo.append(...renderHome())
}

export {initialize}