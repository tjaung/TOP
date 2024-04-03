import {antipasto} from "./menu/antipastoMenu"
import { pasta } from "./menu/pastaMenu";
import { entree } from "./menu/entreeMenu";
import { createElementWithClass, toggleIndicator } from "./helpers";

function createMenuItem(item, info) {
    const itemDiv = createElementWithClass('li', ['menu-item'])

    const menuItemName = createElementWithClass('p', ['item-title'], item)
    const menuItemDesc = createElementWithClass('p', [], info.desc)
    const menuItemPrice = createElementWithClass('p', [], info.price)

    itemDiv.appendChild(menuItemName)
    itemDiv.appendChild(menuItemDesc)
    itemDiv.appendChild(menuItemPrice)

    return itemDiv
}

export function createMenu(menu) {
    let out = document.createElement('ul')
    for(const [key, value] of Object.entries(menu)){
        out.appendChild(createMenuItem(key, value))
    }

    return out
} 

export function renderMenuSpace() {
    // menu div
    const menuDiv = document.createElement('div')

    // add menu buttons at top of menu div
    const btnArea = createElementWithClass('div', ['menu-btn-list'])
    const antipastoBtn = createElementWithClass('button', ['menu-buttons'], 'ANTIPASTO')
    const pastaBtn = createElementWithClass('button', ['menu-buttons'], 'PASTA')
    const entreeBtn = createElementWithClass('button', ['menu-buttons'], 'ENTREES')

    btnArea.appendChild(antipastoBtn)
    btnArea.appendChild(pastaBtn)
    btnArea.appendChild(entreeBtn)
    
    menuDiv.appendChild(btnArea)

    // add the actual menu below buttons
    const menu = createElementWithClass('div', ['menu'])

    menuDiv.appendChild(menu)
    
    // button functionality
    antipastoBtn.addEventListener('click', (e) => {
        if(menu.childNodes.length > 0){
            menu.removeChild(menu.childNodes[0])
        }
        menu.appendChild(createMenu(antipasto))
        menu.scrollIntoView()
    })
    pastaBtn.addEventListener('click', (e) => {
        if(menu.childNodes.length > 0){
            menu.removeChild(menu.childNodes[0])
        }
        menu.appendChild(createMenu(pasta))
        menu.scrollIntoView()
    })
    entreeBtn.addEventListener('click', (e) => {
        if(menu.childNodes.length > 0){
            menu.removeChild(menu.childNodes[0])
        }
        menu.appendChild(createMenu(entree))
        menu.scrollIntoView()
    })

    // toggleIndicator(true)

    return [btnArea, menu]
}
