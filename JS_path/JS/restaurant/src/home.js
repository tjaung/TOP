import {renderMenuSpace} from "./menu"
import { renderAbout } from "./about"

function renderHome() {
    // grab the page content div
    const screenInfo = document.getElementById('screen-info')
    //create page buttons
    const btnDiv = document.createElement('div')
    btnDiv.classList.add('btn-list')

    const menu = document.createElement('button')
    menu.innerHTML = 'MENU'
    menu.classList.add('menu-button')
    menu.addEventListener('click', (e) => {
        btnDiv.remove()
        console.log(renderMenuSpace())
        screenInfo.append(...renderMenuSpace())
    })

    const about = document.createElement('button')
    about.classList.add('about-btn')
    about.innerHTML = 'ABOUT'
    about.addEventListener('click', (e) => {
        btnDiv.remove()
        screenInfo.appendChild(renderAbout())
    })

    btnDiv.appendChild(menu)
    btnDiv.appendChild(about)
    
    return btnDiv
}

export {renderHome}