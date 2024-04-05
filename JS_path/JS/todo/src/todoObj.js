import { createCard } from "./cardDisplay"

export class TodoItem {
    // jobStatus = 0;
    constructor(title, priority, dueDate, detail){
        this.title = title,
        this.jobStatus = 0,
        this.priority = priority,
        this.dueDate = dueDate,
        this.detail = detail
    }

    updateStatus(newStatus) {
        if(this.jobStatus != newStatus) { this.jobStatus = newStatus }
    }

    updateDetail(newDetail) {
        this.detail = newDetail
    }

    updateTitle(newTitle) {
        this.title = newTitle
    }

    updatePriority(newPriority){
        this.priority = newPriority
    }

    updateDueDate(newDate){
        this.dueDate = newDate
    }

    returnTitle() {
        return this.title
    }

    returnStatus() {
        return this.jobStatus
    }

    returnPriority() {
        return this.priority
    }

    returnDueDate() {
        return this.dueDate
    }

    returnDetail() {
        return this.detail
    }

    returnItemJSON() {
        return {'title': this.returnTitle(),
         'status': this.returnStatus(),
        'dueDate': this.returnDueDate(),
        'priority': this.returnPriority(),
        'detail': this.returnDetail()}
    }
}

