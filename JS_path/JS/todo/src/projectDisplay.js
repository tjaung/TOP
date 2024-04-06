import { createDomElement } from "./componentMakers"
import { CardRenderer, createMinimizedCard} from "./cardDisplay"
import { submitNewTask } from "./createNewTask"
import { Project } from "./projectObj";
import { TodoItem } from "./todoObj";
import './styles/projectArea.css';
import * as Drag from './dragFunctions.js'

class ProjectRenderer {
    constructor(projectHandler, project){
        this.project = project
        this.handler = projectHandler

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
            this.submitNewTask(this.project), 
            this.renderAndUpdateProject()
            e.currentTarget.parentNode.parentNode.remove()})

        document.body.append(cardArea)
    }

    submitNewTask() {
        const title = document.querySelector('#new-card-title').value
        const duedate = document.querySelector('#new-card-dueDate').value
        const priority = document.querySelector('#new-card-priority').value
        const detail = document.querySelector('#new-card-detail').value

        const status = 'not-started'
        let newTask = new TodoItem(title, status, priority, duedate, detail)
        
        this.project.addTask(newTask)
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

        const projectDOMTitle = createDomElement(
            'div',
            {
                class:'project-name', 
                id: `${this.project.returnProjectNameWithNoWhitespace()}-title`, 
            },
            this.project.name
            )
        projectDOMTitle

        const projectDOMEditTitleButton = createDomElement(
            'button',
            {
                class:'project-name-change-button', 
                id: `${this.project.returnProjectNameWithNoWhitespace()}-edit`
            },
            'Edit'
            )
        function editTitle(e){
                projectDOMTitle.setAttribute('contenteditable', true)
                projectDOMTitle.focus() 
                e.classList.add('save')
        }
        
        function saveTitle(e){
                e.innerHTML = 'Edit'
                projectDOMTitle.setAttribute('contenteditable', false)  
                e.classList.remove('save')
        }

        projectDOMEditTitleButton.addEventListener('click', (e) => {
            if(projectDOMEditTitleButton.classList.contains('save')){
                saveTitle(projectDOMEditTitleButton)
                console.log('save on')
            }
            else{
                editTitle(projectDOMEditTitleButton)
                console.log('edit on')
            }
        });

        const projectDOMDeleteButton = createDomElement(
            'button',
            {
                class:'project-delete-button', 
                id: `${this.project.returnProjectNameWithNoWhitespace()}-delete`, 
            },
            'Delete'
            )
        projectDOMDeleteButton.addEventListener('click', () => {
            this.handler.removeProject(this.project.name)
            console.log(this.handler.returnAllProjectTitles())
            projectDOM.remove()
        });

        const projectDOMCollapseButton = createDomElement(
            'button',
            {
                class:'project-collapse-button', 
                id: `${this.project.returnProjectNameWithNoWhitespace()}-collapse`, 
                // type:"checkbox"
            }
            )
        const projectCollapseLabel = createDomElement('label',
        {for:'project-collapse-button',
        class:'lbl-toggle'})

        projectDOMCollapseButton.addEventListener('click', () => {
            // projectColumnsWrapper.classList.toggle('expanded')
            // projectColumnsWrapper.classList.toggle('collapsed')
            // projectDOMCollapseButton.classList.toggle('toggle-button-transition')
            if(projectColumnsWrapper.classList.contains('collapsed')){
                projectColumnsWrapper.classList.remove('collapsed')
                projectDOMCollapseButton.classList.remove('toggle-button-transition')
            }
            else{
                projectColumnsWrapper.classList.add('collapsed')
                projectDOMCollapseButton.classList.add('toggle-button-transition')
            }
            
        });

        const projectDOMOptions = createDomElement(
            'div', 
            {class:'project-options'}, 
            projectDOMTitle,
            projectDOMEditTitleButton,
            projectDOMDeleteButton,
            newTaskButton,
            projectDOMCollapseButton
            // projectCollapseLabel
            )

        const projectHeader = createDomElement(
            'div',
            {class: 'project-header'},
            projectDOMOptions)



        // -------------------- Progress columns --------------------------------------------------------------------//
        const projectNotStartedColumn = createDomElement(
            'div',
            {
                class:'project-status-col', 
                id:`not-started-${this.project.returnProjectNameWithNoWhitespace()}`,
            })
        projectNotStartedColumn.classList.add('not-started')
        projectNotStartedColumn.setAttribute('data-status', 'not-started')
        projectNotStartedColumn.addEventListener("dragover", (e) => {
            Drag.onDragOver(e)
          });
        projectNotStartedColumn.addEventListener("drop", (e) => {
            Drag.onDrop(e)
          });
        projectNotStartedColumn.addEventListener("dragleave", (e) => {
            Drag.onDragLeave(e)
          });

        const projectInProgressColumn = createDomElement(
            'div',
            {
                class:'project-status-col', 
                id:`in-progress-${this.project.returnProjectNameWithNoWhitespace()}`,
            })
        projectInProgressColumn.classList.add('in-progress')
        projectInProgressColumn.setAttribute('data-status', 'in-progress')
        projectInProgressColumn.addEventListener("dragover", (e) => {
            Drag.onDragOver(e)
          });
        projectInProgressColumn.addEventListener("drop", (e) => {
            Drag.onDrop(e)
          });
        projectInProgressColumn.addEventListener("dragleave", (e) => {
            Drag.onDragLeave(e)
          });

        const projectCompletedColumn = createDomElement(
            'div',
            {
                class:'project-status-col', 
                id:`completed-${this.project.returnProjectNameWithNoWhitespace()}`,
            })
        projectCompletedColumn.classList.add('completed')
        projectCompletedColumn.setAttribute('data-status', 'completed')
        projectCompletedColumn.addEventListener("dragover", (e) => {
            Drag.onDragOver(e)
          });
        projectCompletedColumn.addEventListener("drop", (e) => {
            Drag.onDrop(e)
          });
          projectCompletedColumn.addEventListener("dragleave", (e) => {
            Drag.onDragLeave(e)
          });

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
            let editButton = document.querySelector(`#${this.project.returnProjectNameWithNoWhitespace()}-edit`)
            if(editButton.innerHTML != 'Save') editButton.innerHTML = 'Save'
            this.project.updateProjectName(newProjectName)
            projectDOM.setAttribute('id', newProjectName)
            projectNotStartedColumn.setAttribute('id', `not-started-${newProjectName}`)
            projectInProgressColumn.setAttribute('id', `in-progress-${newProjectName}`)
            projectCompletedColumn.setAttribute('id', `completed-${newProjectName}`)
            projectDOMTitle.setAttribute('id', `${newProjectName}-title`)
            projectDOMEditTitleButton.setAttribute('id', `${newProjectName}-edit`),
            projectDOMDeleteButton.setAttribute('id', `${newProjectName}-delete`)
            projectDOMCollapseButton.setAttribute('id', `${newProjectName}-collapse`)
        
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
        const NewProjectRenderer = new ProjectRenderer(this.projectHandler, NewProject)
        // console.log(this.projectHandler)
        this.projectHandler.addProject(NewProject)
        NewProjectRenderer.createProjectDOM(true)
    }

    initialize() {
        const projectDiv = document.querySelector('#projects')

        let projectList = this.projectHandler.returnAllProjects()

        const out = []
        for (let proj of projectList){
            let ProjectManager = new ProjectRenderer(this.projectHandler, proj)
            ProjectManager.createProjectDOM()
            ProjectManager.placeTaskCardsIntoProjectDOM()
        }

        this.setCreateNewProjectButton()
    }
}
