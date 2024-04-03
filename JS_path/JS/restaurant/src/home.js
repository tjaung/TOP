import {renderMenuSpace} from "./menu"
import { renderAbout } from "./about"
import { createElementWithClass, toggleIndicator } from "./helpers"

function renderHome() {
    // grab the page content div
    const screenInfo = document.getElementById('screen-info')
    //create page buttons
    const btnDiv = createElementWithClass('div', ['btn-list'])

    const menu = createElementWithClass('button', ['home-buttons'], 'MENU')
    menu.addEventListener('click', (e) => {
        const screenInfo = document.getElementById('screen-info')
        btnDiv.remove()
        screenInfo.append(...renderMenuSpace())
    })

    const about = createElementWithClass('button', ['home-buttons'], 'ABOUT')
    about.addEventListener('click', (e) => {
        screenInfo.append(...renderAbout())
        btnDiv.remove()
    })

    btnDiv.appendChild(menu)
    btnDiv.appendChild(about)
    
    //toggleIndicator(false)

    return [btnDiv]
}

export {renderHome}