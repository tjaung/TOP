import {renderMenuSpace} from "./menu"
import { renderAbout } from "./about"
import { createElementWithClass } from "./helpers"

function renderHome() {
    // grab the page content div
    const screenInfo = document.getElementById('screen-info')
    //create page buttons
    const btnDiv = createElementWithClass('div', ['btn-list'])

    const indicatorArrow = document.querySelector('#indicatorArrow')
    const mediaQuery = window.matchMedia( '( min-width: 768px )' )

    const menu = createElementWithClass('button', ['home-buttons'], 'MENU')
    menu.addEventListener('click', (e) => {
        const screenInfo = document.getElementById('screen-info')
        btnDiv.remove()
        screenInfo.append(...renderMenuSpace())
        if(mediaQuery.matches){indicatorArrow.classList.remove('hide')}
    })

    const about = createElementWithClass('button', ['home-buttons'], 'ABOUT')
    about.addEventListener('click', (e) => {
        screenInfo.append(...renderAbout())
        if(mediaQuery.matches){indicatorArrow.classList.remove('hide')}
        btnDiv.remove()
        
    })

    btnDiv.appendChild(menu)
    btnDiv.appendChild(about)
    
    return [btnDiv]
}

export {renderHome}