export function createLunchMenu() {
    return 'LUNCH'
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
        menu.innerHTML = createLunchMenu()
    })
    dinnerBtn.addEventListener('click', (e) => {
        menu.innerHTML = createDinnerMenu()
    })

    return menuDiv
}


// export default Menu