import { createDomElement } from "./componentMakers"
import '../styles/projectArea.css';

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
            const projectTitle = createDomElement(
                'li',
                {class:'project-list-item', id:`${proj.returnProjectNameWithNoWhitespace()}-sidebar`},
                proj.returnProjectName()
            )
            projectTitle.addEventListener('click', (e) => {
                this.showSingleProject(proj.returnProjectNameWithNoWhitespace())
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
        const head = document.querySelector('.top')
        const projectSection = document.querySelector('#projects')
        const newProject = document.querySelector('#new-project')
        const foot = document.querySelector('#foot')

        function openNav() {
            const mq = window.matchMedia("(min-width: 768px)")
            if(mq.matches){
                sidebar.style.width = "250px";
                head.style.marginLeft = "250px";
                projectSection.style.marginLeft = "250px"
                newProject.style.marginLeft = "250px"
                foot.style.marginLeft = "250px"
            }

          }
          
          function closeNav() {
            const mq = window.matchMedia("(min-width: 768px)")
            if(mq.matches){
                sidebar.style.width = "0";
                head.style.marginLeft = "0px";
                projectSection.style.marginLeft = "0px"
                newProject.style.marginLeft = "0px"
                foot.style.marginLeft = "0px"
            }
          }

        let _toggleSidebar = () => {
            sidebar.classList.toggle("sidebar--isHidden");
            openButton.classList.toggle('.openbtn--isHidden');

            if(sidebar.classList.contains('sidebar--isHidden')){
                closeNav()
                openButton.innerHTML = "☰";
            }
            else{
                openNav()
                openButton.innerHTML = "X";
            }
            // openButton.innerHTML = sidebar.classList.contains(
            //     "sidebar--isHidden"
            // )
            //     ? "X"
            //     : "☰";
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