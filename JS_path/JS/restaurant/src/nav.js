import { renderHome } from "./home";
import { renderMenuSpace } from "./menu";
import { renderAbout } from "./about";
import { createElementWithClass, removeAllChildren } from "./helpers";
import './styles.css';
import logoImg from './logo.png';

function createNav() {

    const mediaQuery = window.matchMedia( '( min-width: 768px )' )
    
    const nav = document.createElement('header')
    nav.setAttribute("id", 'nav')

    const siteLogo = createElementWithClass('div', ['logo-div'])
    const logo = new Image()
    logo.src = logoImg;
    logo.classList.add('logo')

    siteLogo.appendChild(logo)
    siteLogo.onclick = renderHome

    const sandwichBtn = createElementWithClass('button', ['hamburger'])
    
    sandwichBtn.innerHTML = "☰"
    sandwichBtn.addEventListener('click', toggleMenu)

    nav.appendChild(siteLogo)
    nav.appendChild(sandwichBtn)
    nav.appendChild(createNavMenu())

    // if desktop: addd aside tag
    if(mediaQuery.matches){
      const aside = document.createElement('aside')
      aside.appendChild(nav)
      return aside
    }
    else return nav
}

function toggleMenu() {
    const menu = document.querySelector(".hamburger-menu");
    const btn = document.getElementsByClassName('hamburger')

    if (menu.classList.contains("showMenu")) {
      menu.classList.remove("showMenu");
      menu.classList.add("hideMenu")
      menu.style.display = "none";
      btn.innerHTML = 'X'
    } else {
      menu.classList.remove('hideMenu')
      menu.classList.add("showMenu");
      menu.style.display = "block";
      btn.innerHTML = "☰"
    }
  }

function createNavMenu() {
    const nav = createElementWithClass('div', ['hamburger-menu'])

    // for media query
    const mediaQuery = window.matchMedia( '( min-width: 768px )' )
    if(!mediaQuery.matches) {
      nav.classList.add('hideMenu')
    }
    
    nav.setAttribute('id', 'hamburger-menu')

    //list items
    const list = document.createElement('ul')

    const home = createNavItems('HOME', renderHome())
    const menu = createNavItems('MENU', renderMenuSpace())
    const about = createNavItems('ABOUT', renderAbout())

    list.appendChild(home)
    list.appendChild(menu)
    list.appendChild(about)

    nav.appendChild(list)

    return nav
}

function refreshScreenInfo(page) {
  const mediaQuery = window.matchMedia( '( min-width: 768px )' )
  let screenInfo = document.getElementById("screen-info")
  if(!mediaQuery.matches) toggleMenu()
  screenInfo = removeAllChildren(screenInfo).append(...page)
}

function createNavItems(label, func) {
  const list_item = createElementWithClass('li', ['hamburger-li'])
  const btn = createElementWithClass('button', ['hamburger-btn'])
  btn.innerHTML = label

  btn.addEventListener('click', (e) => {
    refreshScreenInfo(func)
    let screenInfo = document.querySelector('#screen-info')
    screenInfo.scrollIntoView()
  })

  list_item.appendChild(btn)
  return list_item

}

export {createNav};