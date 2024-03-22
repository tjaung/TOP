import {lunch} from "./lunchMenu"

function createMenuItem(item, info) {
    const itemDiv = document.createElement('li')
    itemDiv.classList.add('menu-item');
    
    const menuItemName = document.createElement('p')
    const menuItemDesc = document.createElement('p')
    const menuItemPrice = document.createElement('p')

    menuItemName.innerHTML = item
    menuItemDesc.innerHTML = info.desc
    menuItemPrice.innerHTML = info.price

    itemDiv.appendChild(menuItemName)
    itemDiv.appendChild(menuItemDesc)
    itemDiv.appendChild(menuItemPrice)

    return itemDiv
}

export function createLunchMenu() {
    let out = document.createElement('ul')
    for(const [key, value] of Object.entries(lunch)){
        out.appendChild(createMenuItem(key, value))
    }

    return out
}   

export function createDinnerMenu() {
    return 'DINNER'
 }

export function renderMenuSpace() {
    // menu div
    const menuDiv = document.createElement('div')

    // add menu buttons at top of menu div
    const btnArea = document.createElement('div')
    btnArea.classList.add('menu-btn-list')

    const lunchBtn = document.createElement('button')
    lunchBtn.classList.add('lunch-button')
    lunchBtn.innerHTML = 'LUNCH'

    const dinnerBtn = document.createElement('button')
    dinnerBtn.classList.add('dinner-button')
    dinnerBtn.innerHTML = 'DINNER'

    btnArea.appendChild(lunchBtn)
    btnArea.appendChild(dinnerBtn)

    menuDiv.appendChild(btnArea)

    // add the actual menu below buttons
    const menu = document.createElement('div')
    menu.classList.add('menu')

    menuDiv.appendChild(menu)
    // menuDiv.innerHTML = createLunchMenu()
    
    // button functionality
    lunchBtn.addEventListener('click', (e) => {
        if(menu.childNodes.length > 0){
            menu.removeChild(menu.childNodes[0])
        }
        menu.appendChild(createLunchMenu())
    })
    dinnerBtn.addEventListener('click', (e) => {
        menu.innerHTML = createDinnerMenu()
    })

    return menuDiv
}


// export default Menu