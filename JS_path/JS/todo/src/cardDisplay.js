import { createDomElement } from "./componentMakers"

export class CardRenderer {
    constructor(project, task){
        this.task = task
        this.project = project
    }
    setProject(project){
        this.project=project
    }
    createFullCard() {
        const cardRemoveButton = createDomElement('button', {id: 'card-remove-button', class: 'full-card-info'}, 'Delete Task')
        cardRemoveButton.addEventListener('click', (e) => {
            const cardArea = document.querySelector('#card-area')
            this.deleteTarget(cardArea),
            this.project.removeTask(this.task.title)
            console.log(this.project.returnProjectJSON())})

        const cardTitle = createDomElement('h1', {id: 'full-card-title', class:'full-card-info', contenteditable :true}, this.task.title)
        const cardStatus = createDomElement('h2', {id: 'full-card-status', class:'full-card-info', contenteditable :true}, this.task.status)
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
            this.project.
            console.log(this.project)
        })

        return cardArea
    }

    createMinimizedCard() {

        const cardTitle = createDomElement('h1', {id: 'mini-card-title', class:'mini-card-info'}, this.task.title)
        const cardStatus = createDomElement('h2', {id: 'mini-card-status', class:'mini-card-info'}, this.task.status)
        const cardDueDate = createDomElement('h2', {id: 'mini-card-dueDate', class:'mini-card-info'}, this.task.dueDate)
        const cardPriority = createDomElement('h2', {id: 'mini-card-priority', class:'mini-card-info'}, this.task.priority)

        const card = createDomElement('div', {class: 'mini-card'}, cardTitle, cardStatus, cardDueDate, cardPriority)

        card.addEventListener('click', () => {
            document.body.append(this.createFullCard(this.project, this.task))
        })
        // console.log(card)
        return card
    }

    deleteParent(e) {
        e.currentTarget.parentNode.remove();
    }

    deleteTarget(target) {
        target.remove()
    }
}
