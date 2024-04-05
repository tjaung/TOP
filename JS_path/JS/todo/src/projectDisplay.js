import { createDomElement } from "./componentMakers"
import { CardRenderer, createMinimizedCard} from "./cardDisplay"
import { submitNewTask } from "./createNewTask"
// import { initialize } from "./domController"

class ProjectRenderer {
    constructor(project){
        this.project = project
    }
    
    renderAndUpdateProject()  {
        const projectDiv = document.querySelector(`#${this.project.name}`)
        console.log(projectDiv)
        if(projectDiv !== null){
            while (projectDiv.firstChild) {
                projectDiv.removeChild(projectDiv.lastChild);
            }
        }
        projectDiv.append(...this.renderTaskCards())
        console.log(this.project.returnAllTasks())
    }
    createNewTaskForm(project) {

        console.log(project)
        const cardTitle = createDomElement('input', {id: 'new-card-title', class:'new-card-info', type:'text'})
        const cardDueDate = createDomElement('input', {id: 'new-card-dueDate', class:'new-card-info'})
       
        const priorities = createDomElement('datalist', {id:'priorities'}, 
            createDomElement('option', {value: 'low'}), 
            createDomElement('option', {value: 'medium'}), 
            createDomElement('option', {value: 'high'}))
        const cardPriority = createDomElement('input', {id: 'new-card-priority', class:'new-card-info', list:'priorities'}, priorities)
        const cardDetail = createDomElement('input', {id: 'new-card-detail', class:'new-card-info', type:'text'})
        const cardSubmitButton = createDomElement('button', {id: 'new-card-create-button', class: 'new-card-info'}, 'Create Task')
        const card = createDomElement('div', {class: 'full-card'}, cardTitle, cardDueDate, cardPriority, cardDetail, cardSubmitButton)
        const removeBG = createDomElement('div', {class: 'remove-bg', id:'remove-full-card-bg'}, card)
    
        const cardArea = createDomElement('div', {id: 'card-area'}, card, removeBG)
        removeBG.addEventListener('click', function(e){
            e.currentTarget.parentNode.remove();
        })

        
        cardSubmitButton.addEventListener('click', (e) => {
            console.log(project)
            project = submitNewTask(project), 
            // func(project),
            this.renderAndUpdateProject()
            e.currentTarget.parentNode.parentNode.remove()})
        // cardSubmitButton.addEventListener('submit', function(e){e.preventDefault()})
    
        document.body.append(cardArea)

        //end
    }
    createProjectDOM(){
        const proj = this.project
        const newTaskButton = createDomElement('button', {class:'new-task-button'}, '+')
        newTaskButton.addEventListener('click', () => {
            this.createNewTaskForm(proj);
        });

        const projectDOM = createDomElement('div', {class:'project', id: this.project.name}, this.project.name, newTaskButton)
        const allTasks = this.project.returnAllTasks()
        projectDOM.append(...this.renderTaskCards())
 
        const projectArea = document.querySelector('#projects')
        projectArea.appendChild(projectDOM)
    }

    renderTaskCards(){
        const allTasks = this.project.returnAllTasks()

        let out = []
        for(let task of allTasks) {
            let Card = new CardRenderer(this.project, task).bind(this.renderAndUpdateProject)
            out.push(Card.createMinimizedCard())
        }
        console.log(out)
        return out
    }

    getProject(){
        return this.project
    }
    
}




export class PageInitializer {
    constructor(projectHandler){
        this.projectHandler = projectHandler
    }

    initialize() {
        let projectList = this.projectHandler.returnAllProjects()
        console.log(this.projectHandler)

        const out = []
        for (let proj of projectList){
            console.log(proj)
            let ProjectManager = new ProjectRenderer(proj)
            console.log(ProjectManager.getProject())
            out.push(ProjectManager.createProjectDOM())
        }
        // console.log(...out)
        const projectDiv = document.querySelector('#projects')
        projectDiv.append(...out)
    }
}
// function createNewTaskForm(project) {

//     const cardTitle = createDomElement('input', {id: 'new-card-title', class:'new-card-info', type:'text'})
//     // const cardStatus = createDomElement('input', {id: 'new-card-status', class:'new-card-info'})
//     const cardDueDate = createDomElement('input', {id: 'new-card-dueDate', class:'new-card-info'})
   
//     const priorities = createDomElement('datalist', {id:'priorities'}, 
//         createDomElement('option', {value: 'low'}), 
//         createDomElement('option', {value: 'medium'}), 
//         createDomElement('option', {value: 'high'}))
//     const cardPriority = createDomElement('input', {id: 'new-card-priority', class:'new-card-info', list:'priorities'}, priorities)
//     const cardDetail = createDomElement('input', {id: 'new-card-detail', class:'new-card-info', type:'text'})
//     // const cardProject = createDomElement('input', {id: 'new-card-project', class:'new-card-info'})
//     const cardSubmitButton = createDomElement('button', {id: 'new-card-create-button', class: 'new-card-info'}, 'Create Task')

//     // const form = createDomElement('form', {id: 'new-task-form', class:'form'}, cardTitle, cardDueDate, cardPriority, cardDetail, cardSubmitButton)
//     const card = createDomElement('div', {class: 'full-card'}, cardTitle, cardDueDate, cardPriority, cardDetail, cardSubmitButton)
//     const removeBG = createDomElement('div', {class: 'remove-bg', id:'remove-full-card-bg'}, card)

//     const cardArea = createDomElement('div', {id: 'card-area'}, card, removeBG)
//     removeBG.addEventListener('click', function(e){
//         e.currentTarget.parentNode.remove();
//     })

//     cardSubmitButton.addEventListener('click', function(e){
//         submitNewTask(project), 
//         renderAndUpdateProject(project), 
//         e.currentTarget.parentNode.parentNode.remove()})
//     // cardSubmitButton.addEventListener('submit', function(e){e.preventDefault()})

//     document.body.append(cardArea)
// }


// export {initialize}
