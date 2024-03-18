import { renderHome } from "./home";
import { renderMenuSpace } from "./menu";
import { renderAbout } from "./about";
import './styles.css';

function createNav() {
    const nav = document.createElement('header')
    nav.setAttribute("id", 'nav')
    const siteLogo = document.createElement('div')
    const logo = document.createElement('div'); //change to img
    siteLogo.classList.add('logo-div')
    logo.innerHTML = 'LOGO'

    siteLogo.appendChild(logo)

    const sandwichBtn = document.createElement('button')
    sandwichBtn.classList.add('hamburger')
    
    sandwichBtn.innerHTML = "☰"
    sandwichBtn.addEventListener('click', toggleMenu)

    nav.appendChild(siteLogo)
    nav.appendChild(sandwichBtn)
    nav.appendChild(createNavMenu())

    return nav
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
    const nav = document.createElement('div')
    nav.classList.add('hamburger-menu')
    nav.classList.add('hideMenu')
    nav.setAttribute('id', 'hamburger-menu')

    //list items
    const list = document.createElement('ul')
    const home = document.createElement('li')
    home.classList.add('hamburger-li')
    const homeBtn = document.createElement('button')
    homeBtn.innerHTML = 'HOME'
    homeBtn.classList.add('hamburger-btn')
    homeBtn.addEventListener('click', (e) => {
        const screenInfo = document.getElementById("screen-info")
        toggleMenu(),
        screenInfo.replaceChild(renderHome(), screenInfo.children[0])
    })
    home.appendChild(homeBtn)

    const menu = document.createElement('li')
    menu.classList.add('hamburger-li')
    const menuBtn = document.createElement('button')
    menuBtn.innerHTML = 'MENU'
    menuBtn.classList.add('hamburger-btn')
    menuBtn.addEventListener('click', (e) => {
        const screenInfo = document.getElementById("screen-info")
        toggleMenu(),
        screenInfo.replaceChild(renderMenuSpace(), screenInfo.children[0]
        )})
    menu.appendChild(menuBtn)

    const about = document.createElement('li')
    about.classList.add('hamburger-li')
    const aboutBtn = document.createElement('button')
    aboutBtn.innerHTML = 'ABOUT'
    aboutBtn.classList.add('hamburger-btn')
    aboutBtn.addEventListener('click', (e) => {
      const screenInfo = document.getElementById("screen-info")
      toggleMenu(),
      screenInfo.replaceChild(renderAbout(), screenInfo.children[0]
      )})
    about.appendChild(aboutBtn)

    list.appendChild(home)
    list.appendChild(menu)
    list.appendChild(about)

    nav.appendChild(list)

    return nav
}

export {createNav};