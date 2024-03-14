import {renderMenuSpace} from "./menu"

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
        screenInfo.appendChild(renderMenuSpace())
    })

    const about = document.createElement('button')
    about.classList.add('about-btn')
    about.innerHTML = 'ABOUT'

    btnDiv.appendChild(menu)
    btnDiv.appendChild(about)
    
    return btnDiv
}

export {renderHome}