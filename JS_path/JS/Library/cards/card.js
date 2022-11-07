const template = document.createElement("template");
template.innerHTML = `
    <style>
    .card {
        display: grid;
        grid-template-rows: 1fr 2fr;
        background: grey;
        min-height: 200px;
        border-radius: 10px;
    }

    .card-head {
        display: grid;
        grid-template-columns: 80% 10% 10%;
    }
    .details {
        display: none;
       
    }
    .card-info {
        padding-left:12px;
    }
    </style>
    <div class="card">
        <div class="card-head">
            <h2 id="card-title"><slot name='title' /></h2>
            <button id='show-btn'>View Details</button>
            <button id='remove-btn'>X</button>
        </div>
        <div class='details'>
            <p class='card-info' id="card-details">Details: <slot name='details' /></p>
            <p class='card-info' id="card-asignee">Assignee: <slot name='assignee' /></p>
            <p class='card-info' id="card-status">Status: <slot name='status' /></p>
            <p class='card-info' id="card-priority">Priority: <slot name='priority' /></p>
        </div>
    </div>
`

class Card extends HTMLElement {
    constructor(title, detail, assignee, status, priority) {
        super();
        this.showInfo = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.title = title;
        this.detail = detail;
        this.assignee = assignee;
        this.status = status;
        this.priority = priority;
    }

    static get observedAttributes() {
        return ['title', 'details', 'assignee', 'status', 'priority'];
    }

    attributeChangedCallBack(title, oldValue, newValue) {
        this.shadowRoot.querySelector(".card-head #card-title").innerText = this.getAttribute('title');
        this.shadowRoot.querySelector(".details #card-details").innerText = this.getAttribute('details');
        this.shadowRoot.querySelector(".details #card-asignee").innerText = this.getAttribute('assignee');
        this.shadowRoot.querySelector(".details #card-status").innerText = this.getAttribute('status');
        this.shadowRoot.querySelector(".details #card-priority").innerText = this.getAttribute('priority');
    } 

    connectedCallback() {
        this.shadowRoot.querySelector('#show-btn').addEventListener('click', this.toggleInfo);
        this.shadowRoot.querySelector('#remove-btn').addEventListener('click', this.removeCard);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#show-btn').removeEventListener('click', this.toggleInfo);
        this.shadowRoot.querySelector('#remove-btn').removeEventListener('click', this.removeCard);
    }

    toggleInfo = () => {
        this.showInfo = !this.showInfo;
        this.shadowRoot.querySelector(".details").style.display = this.showInfo
            ? "block"
            : "none";
        this.shadowRoot.querySelector("#show-btn").innerHTML = this.showInfo
            ? "Hide Details"
            : "View Details";
        };

    removeCard = () => {
        this.shadowRoot.querySelector(".card").remove();
        //Library.removeCard(this.shadowRoot.querySelector(''))
    }
}

export default Card;