import { createDomElement } from "./componentMakers"
import { CardRenderer} from "./cardDisplay"
import { TodoItem } from "./todoObj";
import './styles/projectArea.css';
import * as Drag from './dragFunctions.js'

export class ProjectRenderer {
    constructor(projectHandler, project, sidebar){
        this.project = project
        this.handler = projectHandler
        this.sidebar = sidebar

        document.addEventListener('statusChange', (event) => {
            const id = event.detail.id.replaceAll('-', ' ').toLowerCase();
            const newStatus = event.detail.newStatus;
            const taskTitles = this.project.returnAllTaskTitles()
            taskTitles.forEach((title) => title.toLowerCase())
            if (taskTitles.includes(id)) { // Assuming title is unique for each TodoItem
                this.project.filterTasks(id).updateStatus(newStatus)
            }
        });
    }
    
    clearAllChildren(target){
        target.innerHTML = ''
        // while (target.childNodes.length > 0) {
        //     target.removeChild(target.lastChild);
        // }
    }

    renderAndUpdateProject()  {        
        const projectId = this.project.returnProjectNameWithNoWhitespace()
        const columnsToUpdate = document.querySelectorAll(`#${projectId} .project-status-col`)

        columnsToUpdate.forEach((col) => {
            if(col.hasChildNodes()){
                this.clearAllChildren(col)
            }
        })
        this.createProjectDOM()
        this.placeTaskCardsIntoProjectDOM()
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

    updateIDsToNewProjectName(oldName, newName){
        const projectDOMTitle = document.querySelector(`#${oldName}-title`)

        let editButton = document.querySelector(`#${this.project.returnProjectNameWithNoWhitespace()}-edit`)
        if(editButton.innerHTML != 'Edit') editButton.innerHTML = 'Edit'

        const projectDOM = document.querySelector(`#${oldName}`)
        projectDOM.setAttribute('id', newName)
        
        const projectNotStartedColumn = document.querySelector(`#not-started-${oldName}`)
        projectNotStartedColumn.setAttribute('id', `not-started-${newName}`)
        const projectInProgressColumn = document.querySelector(`#in-progress-${oldName}`)
        projectInProgressColumn.setAttribute('id', `in-progress-${newName}`)
        const projectCompletedColumn = document.querySelector(`#completed-${oldName}`)
        projectCompletedColumn.setAttribute('id', `completed-${newName}`)

        projectDOMTitle.setAttribute('id', `${newName}-title`)
        editButton.setAttribute('id', `${newName}-edit`)

        const projectDOMDeleteButton = document.querySelector(`#${oldName}-delete`)
        projectDOMDeleteButton.setAttribute('id', `${newName}-delete`)
        const projectDOMCollapseButton = document.querySelector(`#${oldName}-collapse`)
        projectDOMCollapseButton.setAttribute('id', `${newName}-collapse`)

        if(projectNotStartedColumn.hasChildNodes() || projectInProgressColumn.hasChildNodes() || projectCompletedColumn.hasChildNodes()){
            projectNotStartedColumn.childNodes.forEach(card => card.dataset.project = newName)
            projectInProgressColumn.childNodes.forEach(card => card.dataset.project = newName)
            projectCompletedColumn.childNodes.forEach(card => card.dataset.project = newName) 
        }
        this.project.updateProjectName(newName)
        this.sidebar.displayProjects()
    }

    createNewTaskForm() {
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
            e.currentTarget.parentNode.parentNode.remove()
        })
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

        const projectDOMTitle = createDomElement(
            'div',
            {
                class:'project-name', 
                id: `${this.project.returnProjectNameWithNoWhitespace()}-title`, 
            },
            this.project.name
            )

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
                e.innerHTML = 'Save'
                e.classList.add('save')
        }
        
        function saveTitle(e){
                e.innerHTML = 'Edit'
                projectDOMTitle.setAttribute('contenteditable', false)  
                e.classList.remove('save')
        }

        projectDOMEditTitleButton.addEventListener('click', (e) => {
            if(projectDOMEditTitleButton.classList.contains('save')){
                let oldID = projectDOM.id
                let newID = projectDOMTitle.innerHTML.replace(/\s+/g, '-')

                saveTitle(projectDOMEditTitleButton)
                this.updateIDsToNewProjectName(oldID, newID)
            }
            else{
                editTitle(projectDOMEditTitleButton)
                projectDOMEditTitleButton.innerHTML = 'Save'
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
            projectDOM.remove()
            this.sidebar.displayProjects()
        });

        const projectDOMCollapseButton = createDomElement(
            'button',
            {
                class:'project-collapse-button', 
                id: `${this.project.returnProjectNameWithNoWhitespace()}-collapse`, 
            }
            )
        // const projectCollapseLabel = createDomElement('label',
        // {for:'project-collapse-button',
        // class:'lbl-toggle'})

        projectDOMCollapseButton.addEventListener('click', () => {
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
            let editButton = document.querySelector(`#${this.project.returnProjectNameWithNoWhitespace()}-edit`)
            if(editButton.innerHTML != 'Save') editButton.innerHTML = 'Save'
        })
    }
}
