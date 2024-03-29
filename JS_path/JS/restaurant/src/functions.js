import { createNav } from "./nav";
import { renderHome } from './home'
import * as Carousel from './carousel'

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
    const siteContent = document.createElement('div')
    siteContent.classList.add('site-content')

    const screenInfo = document.createElement('div')
    screenInfo.classList.add('screen-info')
    screenInfo.setAttribute("id", "screen-info")
    // screenInfo.innerHTML = 'Home Page'

    body.appendChild(createNav())
    siteContent.appendChild(createImageCarousel())
    siteContent.appendChild(screenInfo)
    body.appendChild(siteContent)

    screenInfo.appendChild(renderHome())
}

export {initialize}