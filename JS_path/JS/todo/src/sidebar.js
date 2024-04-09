import { createDomElement } from "./componentMakers"
import './styles/projectArea.css';

export class Sidebar {
    constructor(handler){
        this.handler = handler
        this.projectList = this.handler.returnAllProjects()
        this.DOM = document.querySelector('.sidebar')
    }

    getProjectList(){
        return this.handler.returnAllProjects()
    }

    getProjectTitles(){
        return this.handler.returnAllProjectTitles()
    }

    displayProjects(){
        const projectList = document.querySelector('#sidebar-project-list')
        if(projectList.hasChildNodes){
            projectList.innerHTML = ''
        }

        const titles = this.getProjectList()
        for(let proj of titles){
            console.log(proj)
            const projectTitle = createDomElement(
                'li',
                {class:'project-list-item', id:`${proj.returnProjectNameWithNoWhitespace()}-sidebar`},
                proj.returnProjectName()
            )
            projectTitle.addEventListener('click', (e) => {
                this.showSingleProject(proj.returnProjectNameWithNoWhitespace())
                console.log(e)
                e.target.classList.add('clicked')
            })
            projectList.appendChild(projectTitle)
        }
    }

    showSingleProject(project){
        const allProjectDOMS = document.querySelectorAll('.project')
        allProjectDOMS.forEach(dom => {dom.classList.add('hide')})
        
        const listItems = document.querySelectorAll('li')
        listItems.forEach(li => li.classList.remove('clicked'))

        const targetDOM = document.querySelector(`#${project}`)
        targetDOM.classList.remove('hide')
    }

    giveSidebarOpenButtonFunction(){
        const openButton = document.querySelector('.openbtn')
        const sidebar = document.querySelector('.sidebar')

        let _toggleSidebar = () => {
            sidebar.classList.toggle("sidebar--isHidden");
            openButton.classList.toggle('.openbtn--isHidden');

            openButton.innerHTML = sidebar.classList.contains(
                "sidebar--isHidden"
            )
                ? "☰"
                : "☰";
        }

        openButton.addEventListener("click", _toggleSidebar);
    }

    showAllProjects() {
        const allProjectDOMS = document.querySelectorAll('.project')
        allProjectDOMS.forEach(dom => {dom.classList.remove('hide')})
        
        const listItems = document.querySelectorAll('li')
        listItems.forEach(li => li.classList.remove('clicked'))
    }

    giveShowAllFunction(){
        const showAllButton = document.querySelector('#show-all')
        showAllButton.addEventListener('click', this.showAllProjects)
    }

    activateSidebar(){
        this.giveSidebarOpenButtonFunction()
        this.giveShowAllFunction()
    }

}