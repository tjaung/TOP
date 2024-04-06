import { createDomElement } from "./componentMakers"
import { CardRenderer, createMinimizedCard} from "./cardDisplay"
import { submitNewTask } from "./createNewTask"
import { Project } from "./projectObj";
import './styles/projectArea.css';


class ProjectRenderer {
    constructor(project){
        this.project = project

        document.addEventListener('statusChange', (event) => {
            const id = event.detail.id.replaceAll('-', ' ').toLowerCase();
            const newStatus = event.detail.newStatus;
            const taskTitles = this.project.returnAllTaskTitles()
            taskTitles.forEach((title) => title.toLowerCase())
            console.log(taskTitles)
            console.log(id)
            console.log(newStatus)
            console.log(taskTitles.includes(id))
            if (taskTitles.includes(id)) { // Assuming title is unique for each TodoItem
                this.project.filterTasks(id).updateStatus(newStatus)
                // task.updateStatus(newStatus)
                
                console.log(`Status of TodoItem ${this.project.filterTasks(id).title} changed to ${this.project.filterTasks(id).jobStatus}`);
            }
        });
    }
    
    clearAllChildren(target){
        while (target.childNodes.length > 0) {
            target.removeChild(target.lastChild);
        }
    }

    renderAndUpdateProject()  {        
        const projectId = this.project.returnProjectNameWithNoWhitespace()
        const columnsToUpdate = document.querySelectorAll(`#${projectId} .project-status-col`)

        columnsToUpdate.forEach((col) => {
            if(col.hasChildNodes()){
                this.clearAllChildren(col)
            }
        })
        this.placeTaskCardsIntoProjectDOM()
    }

    createNewTaskForm(project) {
        const cardTitle = createDomElement(
            'input', 
            {id: 'new-card-title', class:'new-card-info', type:'text'})

        const cardDueDate = createDomElement(
            'input', 
            {id: 'new-card-dueDate', class:'new-card-info'})
       
        const priorities = createDomElement(
            'datalist', 
            {id:'priorities'}, 
            createDomElement('option', {value: 'low'}), 
            createDomElement('option', {value: 'medium'}), 
            createDomElement('option', {value: 'high'}
            ))

        const cardPriority = createDomElement(
            'input', 
            {id: 'new-card-priority', class:'new-card-info', list:'priorities'}, 
            priorities)

        const cardDetail = createDomElement(
            'input', 
            {id: 'new-card-detail', class:'new-card-info', type:'text'})

        const cardSubmitButton = createDomElement(
            'button', 
            {id: 'new-card-create-button', class: 'new-card-info'}, 
            'Create Task')
        const card = createDomElement(
            'div', 
            {class: 'full-card'},
             cardTitle, cardDueDate, cardPriority, cardDetail, cardSubmitButton)

        const removeBG = createDomElement(
            'div', 
            {class: 'remove-bg', id:'remove-full-card-bg'}, 
            card)
    
        const cardArea = createDomElement(
            'div', 
            {id: 'card-area'}, 
            card, removeBG)

        removeBG.addEventListener('click', function(e){
            e.currentTarget.parentNode.remove();
        })

        cardSubmitButton.addEventListener('click', (e) => {
            project = submitNewTask(project), 
            this.renderAndUpdateProject()
            e.currentTarget.parentNode.parentNode.remove()})

        document.body.append(cardArea)
    }

    createProjectDOM(newDOM){
        const proj = this.project

        // Header
        const newTaskButton = createDomElement('button', 
            {class:'new-task-button'}, 
            '+')

        newTaskButton.addEventListener('click', () => {
            this.createNewTaskForm(proj);
        });

        const projectDOMTitle = createDomElement('div', 
            {class:'project-name', 
                id: `${this.project.returnProjectNameWithNoWhitespace()}-title`, 
                contentEditable:true}, 
            this.project.name)

        const projectHeader = createDomElement(
            'div',
            {class: 'project-header'},
            projectDOMTitle, newTaskButton)

        // Progress columns
        const projectNotStartedColumn = createDomElement(
            'div',
            {
                class:'project-status-col', 
                id:`not-started-${this.project.returnProjectNameWithNoWhitespace()}`,
                ondragover:"onDragOver(event);",
                ondragleave:"onDragLeave(event);",
                ondrop:"onDrop(event);"
            })
        projectNotStartedColumn.classList.add('not-started')

        const projectInProgressColumn = createDomElement(
            'div',
            {
                class:'project-status-col', 
                id:`in-progress-${this.project.returnProjectNameWithNoWhitespace()}`,
                ondragover:"onDragOver(event);",
                ondragleave:"onDragLeave(event);",
                ondrop:"onDrop(event);"
            })
        projectInProgressColumn.classList.add('in-progress')

        const projectCompletedColumn = createDomElement(
            'div',
            {
                class:'project-status-col', 
                id:`completed-${this.project.returnProjectNameWithNoWhitespace()}`,
                ondragover:"onDragOver(event);",
                ondragleave:"onDragLeave(event);",
                ondrop:"onDrop(event);"
            })
        projectCompletedColumn.classList.add('completed')

        const projectColumnsWrapper = createDomElement(
            'div',
            {class:'project-status-wrapper', id:`columns-${this.project.returnProjectNameWithNoWhitespace()}`},
            projectNotStartedColumn, projectInProgressColumn, projectCompletedColumn)

        // pull everything together
        const projectDOM = createDomElement('div', 
            {class:'project', 
                id: this.project.returnProjectNameWithNoWhitespace()}, 
            projectHeader, projectColumnsWrapper)

        // projectDOM.append(...this.renderTaskCards())
 
        const projectArea = document.querySelector('#projects')
        if(newDOM){
            const projectSectionHeader = document.querySelector('#project-section-header')
            projectArea.insertBefore(projectDOM, projectSectionHeader.nextSibling)
        }
        else projectArea.appendChild(projectDOM)

        //update project name and div ids when editting
        projectDOMTitle.addEventListener('input', (e) => {
            let newProjectName = projectDOMTitle.innerHTML.replace(/\s+/g, '-')
            this.project.updateProjectName(newProjectName)
            projectDOM.setAttribute('id', newProjectName)
            projectNotStartedColumn.setAttribute('id', `not-started-${newProjectName}`)
            projectInProgressColumn.setAttribute('id', `in-progress-${newProjectName}`)
            projectCompletedColumn.setAttribute('id', `completed-${newProjectName}`)
        
            if(projectNotStartedColumn.hasChildNodes() || projectInProgressColumn.hasChildNodes() || projectCompletedColumn.hasChildNodes()){
                projectNotStartedColumn.childNodes.forEach(card => card.dataset.project = newProjectName)
                projectInProgressColumn.childNodes.forEach(card => card.dataset.project = newProjectName)
                projectCompletedColumn.childNodes.forEach(card => card.dataset.project = newProjectName)
                
            }
        })
    }

    renderTaskCards(){
        const listOfTasksInProject = this.project.returnAllTasks()

        let cardArray = []
        for(let task of listOfTasksInProject) {
            let CardCreaterObj = new CardRenderer(this, task)
            cardArray.push(CardCreaterObj)
        }
        return cardArray
    }

    placeTaskCardsIntoProjectDOM(){

        let tasks = this.renderTaskCards()

        for(let task of tasks){

            let status = task.returnStatus()
            let projectNameForHTML = this.project.returnProjectNameWithNoWhitespace()
            let targetID = `#${status}-${projectNameForHTML}`
            let columnForTaskCardByProgress = document.querySelector(targetID)

            columnForTaskCardByProgress.appendChild(task.createMinimizedCard())
        }
    }

    getProject(){
        return this.project
    } 

    updateProjectName(newName){
        this.project.updateProjectName(newName)
        this.renderAndUpdateProject()
    }
}


export class PageInitializer {
    constructor(projectHandler){
        this.projectHandler = projectHandler
    }

    setProjectHandler(projectHandler) {
        this.projectHandler = projectHandler;
    }

    setCreateNewProjectButton(){
        const newProjectButton = document.querySelector('#new-project-button')
        newProjectButton.addEventListener('click', this.createSingleProject.bind(this))
    }

    createSingleProject(){
        let newProjectTitleBase = 'New Project'
        let i = 1
        let newProjectTitle

        const projectTitles = this.projectHandler.returnAllProjectTitles()
        if(projectTitles.includes(newProjectTitleBase)){
            newProjectTitle = newProjectTitleBase + i
            do{
                i+=1
                newProjectTitle = newProjectTitleBase + i
            }
            while(projectTitles.includes(newProjectTitle));
        }
        else(newProjectTitle = newProjectTitleBase)

        const NewProject = new Project(newProjectTitle)
        const NewProjectRenderer = new ProjectRenderer(NewProject)
        // console.log(this.projectHandler)
        this.projectHandler.addProject(NewProject)
        NewProjectRenderer.createProjectDOM(true)
    }

    initialize() {
        const projectDiv = document.querySelector('#projects')

        let projectList = this.projectHandler.returnAllProjects()

        const out = []
        for (let proj of projectList){
            let ProjectManager = new ProjectRenderer(proj)
            ProjectManager.createProjectDOM()
            ProjectManager.placeTaskCardsIntoProjectDOM()
        }

        this.setCreateNewProjectButton()
    }
}
