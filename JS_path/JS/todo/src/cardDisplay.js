import { createDomElement } from "./componentMakers"
import * as Drag from './dragFunctions.js'
import './styles/cards.css';

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
            console.log(this.projectRenderer.project.returnProjectJSON())})

        const cardTitle = createDomElement('h1', {id: 'full-card-title', class:'full-card-info', contenteditable :true}, this.task.title)
        const cardStatus = createDomElement('h2', {id: 'full-card-status', class:'full-card-info', contenteditable :true}, this.task.jobStatus)
        const cardDueDate = createDomElement('h2', {id: 'full-card-dueDate', class:'full-card-info', contenteditable :true}, this.task.dueDate)
        const cardPriority = createDomElement('h2', {id: 'full-card-priority', class:'full-card-info', contenteditable :true}, this.task.priority)
        const cardDetail = createDomElement('p', {id: 'full-card-detail', class:'full-card-info', contenteditable :true}, this.task.detail)
        const card = createDomElement('div', {class: 'full-card'}, cardTitle, cardStatus, cardDueDate, cardPriority, cardDetail, cardRemoveButton)
        const removeBG = createDomElement('div', {class: 'remove-bg', id:'remove-full-card-bg'}, card)

        const cardArea = createDomElement('div', {id: 'card-area'}, card, removeBG)
        removeBG.addEventListener('click', (e) => {
            this.task.updateTitle(cardTitle.innerHTML)
            this.task.updateStatus(cardStatus.innerHTML)
            this.task.updateDueDate(cardDueDate.innerHTML)
            this.task.updateDetail(cardDetail.innerHTML)
            this.task.updatePriority(cardPriority.innerHTML)
            this.deleteParent(e)
            this.projectRenderer.renderAndUpdateProject()
            console.log(this.projectRenderer.project.returnProjectJSON())
        })

        return cardArea
    }

    createMinimizedCard() {

        const cardTitle = createDomElement('h1', {id: 'mini-card-title', class:'mini-card-info'}, `Title: ${this.task.title}`)
        const cardStatus = createDomElement('h2', {id: 'mini-card-status', class:'mini-card-info'}, this.task.jobStatus)
        const cardDueDate = createDomElement('h2', {id: 'mini-card-dueDate', class:'mini-card-info'}, `Due: ${this.task.dueDate}`)
        const cardPriority = createDomElement('h2', {id: 'mini-card-priority', class:'mini-card-info'}, `Priority: ${this.task.priority}`)

        const card = createDomElement(
            'div', 
            {
                class: 'mini-card', 
                id: this.task.title.replace(/\s+/g, '-'), 
                draggable:true,
                // ondragstart: 'onDragStart(event)',
                // ondragover: 'onDragOver(event)'
            }, 
            cardTitle, cardDueDate, cardPriority)
            card.setAttribute('data-project', this.projectRenderer.project.returnProjectNameWithNoWhitespace())
            card.setAttribute('data-status', this.task.returnStatusAsHtmlData())

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
