import { createDomElement } from "./componentMakers.js"
import { CardRenderer} from "./cardDisplay.js"
import { TodoItem } from "../objects/todoObj.js";
import '../styles/projectArea.css';
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
    }

    renderAndUpdateProject()  {        
        const projectId = this.project.returnProjectNameWithNoWhitespace()
        const columnsToUpdate = document.querySelectorAll(`#${projectId} .project-status-col`)

        columnsToUpdate.forEach((col) => {
            if(col.hasChildNodes()){
                this.clearAllChildren(col)
            }
        })
        this.project.returnProjectJSON()
        this.handler.updateLocalStorage()
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
        this.handler.updateLocalStorage()
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
        if(editButton.innerHTML != '\u270E') editButton.innerHTML = '\u270E'

        const projectDOM = document.querySelector(`#${oldName}`)
        projectDOM.setAttribute('id', newName)
        
        const projectStatusWrapper = document.querySelector(`#columns-${oldName}`)
        projectStatusWrapper.setAttribute('id', `#columns-${newName}`)
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
            {id: 'new-card-title', class:'new-card-info', type:'text', placeholder:"New Task"})

        const dueDateLabel = createDomElement(
            'label',
            {id:"dueDate-label",
            for:"new-card-dueDate"},
            "Due: "
        )

        const cardDueDate = createDomElement(
            'input', 
            {id: 'new-card-dueDate', class:'new-card-info', type:'date'})
       
        const dueDateDiv = createDomElement(
            'div',
            {id:'due-date'},
            dueDateLabel, cardDueDate
        )
        
        const priorityLabel = createDomElement(
            'label',
            {id:'priority-label',
            for:"new-card-priority"},
            'Priority:'
        )

        const priorities = createDomElement(
            'select', 
            {id:'new-card-priority'}, 
            createDomElement('option', {value: 'low'}, "Low"), 
            createDomElement('option', {value: 'medium'}, "Medium"), 
            createDomElement('option', {value: 'high'}, "High"
            ))

        const prioritiesDiv = createDomElement(
            'div',
            {id:'priorities'},
            priorityLabel, priorities
        )

        const detailLabel = createDomElement(
            'label',
            {id:"detail-label",
            for:"new-card-detail"},
            'Details:'
        )

        const cardDetail = createDomElement(
            'textarea', 
            {id: 'new-card-detail', class:'new-card-info', type:'text'})

        const detailDiv = createDomElement(
            'div',
            {id:"detail"},
            detailLabel,
            cardDetail
        )

        const cardSubmitButton = createDomElement(
            'button', 
            {id: 'new-card-create-button', class: 'new-card-info'}, 
            'Create Task')
        const card = createDomElement(
            'div', 
            {class: 'full-card'},
             cardTitle, detailDiv, prioritiesDiv, dueDateDiv, cardSubmitButton)

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
        const header = this.renderProjectHeader()
        const projectColumns = this.renderProjectTaskColumns(newDOM)
    }
    
    renderProjectHeader(){
        const proj = this.project

        const newTaskButton = createDomElement('button', 
            {class:'new-task-button'}, 
            '+')

        newTaskButton.addEventListener('click', () => {
            this.createNewTaskForm(this.project);
        });

        // Header
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
            '\u270E'
            )
        function editTitle(e){
                projectDOMTitle.setAttribute('contenteditable', true)
                projectDOMTitle.focus() 
                e.innerHTML = '\uD83D\uDCBE'
                e.classList.add('save')
        }
        
        function saveTitle(e){
                e.innerHTML = '\u270E'
                projectDOMTitle.setAttribute('contenteditable', false)  
                e.classList.remove('save')
        }

        projectDOMEditTitleButton.addEventListener('click', (e) => {
            const projectDOM = document.querySelector(`#${this.project.returnProjectNameWithNoWhitespace()}`)
            if(projectDOMEditTitleButton.classList.contains('save')){
                let oldID = projectDOM.id
                let newID = projectDOMTitle.innerHTML.replace(/\s+/g, '-')

                saveTitle(projectDOMEditTitleButton)
                this.updateIDsToNewProjectName(oldID, newID)
                this.handler.updateLocalStorage()
            }
            else{
                editTitle(projectDOMEditTitleButton)
                projectDOMEditTitleButton.innerHTML = '\uD83D\uDCBE'
            }
        });

        const projectDOMDeleteButton = createDomElement(
            'button',
            {
                class:'project-delete-button', 
                id: `${this.project.returnProjectNameWithNoWhitespace()}-delete`, 
            },
            '\uD83D\uDDD1'
            )
        projectDOMDeleteButton.addEventListener('click', () => {
            const projectDOM = document.querySelector(`#${this.project.returnProjectNameWithNoWhitespace()}`)
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

        projectDOMCollapseButton.addEventListener('click', (e) => {
            console.log(`#columns-${this.project.returnProjectNameWithNoWhitespace()}`)
            const projectColumnsWrapper = e.target.parentNode.parentNode.nextSibling //document.getElementById(`#columns-${this.project.returnProjectNameWithNoWhitespace()}`)
            console.log(projectColumnsWrapper)
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
            // projectDOMTitle,
            projectDOMEditTitleButton,
            newTaskButton,
            projectDOMDeleteButton,
            projectDOMCollapseButton
            // projectCollapseLabel
            )

        const projectHeader = createDomElement(
            'div',
            {class: 'project-header'},
            projectDOMTitle,
            projectDOMOptions)

        //update project name and div ids when editting
        projectDOMTitle.addEventListener('input', (e) => {
            let editButton = document.querySelector(`#${this.project.returnProjectNameWithNoWhitespace()}-edit`)
            if(editButton.innerHTML != '\u270E') editButton.innerHTML = '\uD83D\uDCBE'
        })

        return projectHeader
    }
    
    renderProjectTaskColumns(newDOM){
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
            // newTaskButton,
            projectNotStartedColumn, projectInProgressColumn, projectCompletedColumn)

        // pull everything together
        const projectHeader = this.renderProjectHeader()

        const projectDOM = createDomElement('div', 
            {class:'project', 
                id: this.project.returnProjectNameWithNoWhitespace()}, 
            projectHeader, projectColumnsWrapper)

        // projectDOM.append(...this.renderTaskCards())
 
        const projectArea = document.querySelector('#projects')
        if(newDOM){
            const projectSectionHeader = document.querySelector('#project-section-header')
            projectArea.insertBefore(projectDOM, null)
        }
        else projectArea.insertBefore(projectDOM, null)
    }
}
