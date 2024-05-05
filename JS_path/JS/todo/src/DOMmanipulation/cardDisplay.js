import { createDomElement } from "./componentMakers.js"
import * as Drag from './dragFunctions.js'
import * as DateFNS from "date-fns"
import '../styles/cards.css';
import { addDays } from "date-fns";

export class CardRenderer {
    constructor(projectRenderer, task){
        this.task = task
        this.projectRenderer = projectRenderer
    }

    setProjectRenderer(projectRenderer) {
        this.projectRenderer = projectRenderer;
    }

    createFullCard() {
        const cardRemoveButton = createDomElement('button', {id: 'card-remove-button', class: 'full-card-info'}, 'Delete Task')
        cardRemoveButton.addEventListener('click', (e) => {
            const cardArea = document.querySelector('#card-area')
            this.deleteTarget(cardArea),
            this.projectRenderer.project.removeTask(this.task.title)
            this.projectRenderer.renderAndUpdateProject()
    })


            let dueDate = this.task.returnDueDate()
            const dueDateLabel = createDomElement('label', {id:"dueDate-label", for:"new-card-dueDate"}, "Due: ")
            const cardDueDate = createDomElement('input', {id: 'full-card-dueDate', class:'full-card-info', type:'date', value:dueDate})
            cardDueDate.value = dueDate
            const dueDateDiv = createDomElement('div',{id:'due-date'},dueDateLabel, cardDueDate)

            const priorityLabel = createDomElement('label',{id:'priority-label',for:"new-card-priority"},'Priority:')
            const cardPriority = createDomElement('select', {id:'new-card-priority'},//, selected:`${this.task.priority}`}, 
                createDomElement('option', {value: 'low'}, "Low"), 
                createDomElement('option', {value: 'medium'}, "Medium"), 
                createDomElement('option', {value: 'high'}, "High"
                ))
            cardPriority.value = this.task.priority
            const prioritiesDiv = createDomElement('div',{id:'priorities'},priorityLabel, cardPriority)
    
            const detailLabel = createDomElement('label',{id:"detail-label",for:"new-card-detail"},'Details:')
            const cardDetail = createDomElement('textarea', {id: 'full-card-detail', class:'full-card-info', contenteditable :true}, this.task.detail)
            const detailDiv = createDomElement('div', {id:"detail"}, detailLabel, cardDetail)

            const statusLabel = createDomElement('label',{id:"status-label",for:"new-card-detail"},'Status:')
            const cardStatus = createDomElement('select', {id: 'full-card-status', class:'full-card-info', contenteditable :false}, 
                createDomElement('option', {value: 'not-started'}, "Not Started"), 
                createDomElement('option', {value: 'in-progress'}, "In Progress"), 
                createDomElement('option', {value: 'completed'}, "Completed"
            ))
            cardStatus.value = this.task.jobStatus
            const statusDiv = createDomElement('div', {id:"status"}, statusLabel, cardStatus)

        const cardTitle = createDomElement('h2', {id: 'full-card-title', class:'full-card-info', contenteditable :true}, this.task.title)
        const card = createDomElement('div', {class: 'full-card'}, cardTitle, statusDiv, dueDateDiv, prioritiesDiv, detailDiv, cardRemoveButton)
        const removeBG = createDomElement('div', {class: 'remove-bg', id:'remove-full-card-bg'}, card)

        const cardArea = createDomElement('div', {id: 'card-area'}, card, removeBG)
        removeBG.addEventListener('click', (e) => {
            this.task.updateTitle(cardTitle.innerHTML)
            this.task.updateStatus(cardStatus.value)
            this.task.updateDueDate(cardDueDate.value)
            this.task.updateDetail(cardDetail.innerHTML)
            this.task.updatePriority(cardPriority.value)
            this.deleteParent(e)
            this.projectRenderer.renderAndUpdateProject()
            console.log(this.projectRenderer.project.returnProjectJSON())
        })

        return cardArea
    }

    createMinimizedCard() {

        const cardTitle = createDomElement('h1', {id: 'mini-card-title', class:'mini-card-info'}, `Title: ${this.task.title}`)
        const cardStatus = createDomElement('h2', {id: 'mini-card-status', class:'mini-card-info'})
        const cardDueDate = createDomElement('h2', {id: 'mini-card-dueDate', class:'mini-card-info'}, `Due: ${this.task.dueDate}`)
        const cardPriority = createDomElement('h2', {id: 'mini-card-priority', class:'mini-card-info'}, `Priority: ${ this.task.priority.charAt(0).toUpperCase()
            + this.task.priority.slice(1)}`)

        const card = createDomElement(
            'div', 
            {
                class: 'mini-card', 
                id: this.task.title.replace(/\s+/g, '-'), 
                draggable:true,
            }, 
            cardTitle, cardDueDate, cardPriority, cardStatus)
            card.setAttribute('data-project', this.projectRenderer.project.returnProjectNameWithNoWhitespace())
            card.setAttribute('data-status', this.task.returnStatusAsHtmlData())

        // set class for status
        if(this.task.jobStatus == 'not-started'){cardStatus.classList.add('not-started')}
        else if(this.task.jobStatus == 'in-progress'){cardStatus.classList.add('in-progress')}
        else if(this.task.jobStatus == 'completed'){cardStatus.classList.add('completed')}

        // Add event listeners for click to open, drag, and drop
        card.addEventListener('click', () => {
            document.body.append(this.createFullCard(this.projectRenderer.project, this.task))
        })

        card.addEventListener("dragstart", (e) => {
            Drag.onDragStart(e)
          });
        card.addEventListener("dragend", (e) => {
            Drag.onDragEnd(e)
          });

        const date = new Date()
        // let currentDate = date.getDate()
        let dueDate = this.task.returnDueDate()
        let dueDateTimer = DateFNS.differenceInDays(dueDate, date);

        if(dueDateTimer >= 7){cardDueDate.classList.add('haveTime')}
        else if((dueDateTimer < 7) && (dueDateTimer >= 2)){cardDueDate.classList.add('shouldDo')}
        else if(dueDateTimer < 2){cardDueDate.classList.add('urgent')}

        if(this.task.priority == 'low'){cardPriority.classList.add('haveTime')}
        else if(this.task.priority == 'medium'){cardPriority.classList.add('shouldDo')}
        else if(this.task.priority == 'high'){cardPriority.classList.add('urgent')}
        // console.log(card)
        return card
    }

    deleteParent(e) {
        e.currentTarget.parentNode.remove();
    }

    deleteTarget(target) {
        target.remove()
    }

    returnStatus(){
        return this.task.jobStatus
    }
}
