import {lunch} from "./menu/lunchMenu"
import { dinner } from "./menu/dinnerMenu";
import { createElementWithClass } from "./helpers";

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
    const lunchBtn = createElementWithClass('button', ['menu-buttons'], 'LUNCH')
    const dinnerBtn = createElementWithClass('button', ['menu-buttons'], 'DINNER')

    btnArea.appendChild(lunchBtn)
    btnArea.appendChild(dinnerBtn)

    menuDiv.appendChild(btnArea)

    // add the actual menu below buttons
    const menu = createElementWithClass('div', ['menu'])

    menuDiv.appendChild(menu)
    
    // button functionality
    lunchBtn.addEventListener('click', (e) => {
        if(menu.childNodes.length > 0){
            menu.removeChild(menu.childNodes[0])
        }
        menu.appendChild(createMenu(lunch))
    })
    dinnerBtn.addEventListener('click', (e) => {
        if(menu.childNodes.length > 0){
            menu.removeChild(menu.childNodes[0])
        }
        menu.appendChild(createMenu(dinner))
    })

    return [btnArea, menu]
}