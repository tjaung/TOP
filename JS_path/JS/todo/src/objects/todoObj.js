import { createCard } from "../DOMmanipulation/cardDisplay"

export class TodoItem {
    // jobStatus = 0;
    constructor(title, jobStatus, priority, dueDate, detail){
        this.title = title,
        this.jobStatus = jobStatus,
        this.priority = priority,
        this.dueDate = dueDate,
        this.detail = detail

        document.addEventListener('statusChange', (event) => {
            const id = event.detail.id;
            const newStatus = event.detail.newStatus;
            if (id === this.title) { // Assuming title is unique for each TodoItem
                this.updateStatus(newStatus)
                console.log(`Status of TodoItem ${this.title} changed to ${this.jobStatus}`);
            }
        });
    }

    updateStatus(newStatus) {
        if(this.jobStatus != newStatus) {
            this.jobStatus = newStatus
            console.log(this.jobStatus)
        }; 
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
        let date = newDate.replace('/', '-').split('-')
        this.dueDate = date[0] + '-' + date[1] + '-' + date[2]
    }

    returnTitle() {
        return this.title
    }

    returnStatus() {
        return this.jobStatus
    }

    returnStatusAsHtmlData() {
        return this.jobStatus.replace(/\s+/g, '-')
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

