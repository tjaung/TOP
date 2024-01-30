class Library {
    constructor() {
        this.cards = [];
    }
    // add books to shelf
    addCardToList(card) {
        this.cards.push(card);
    };

    // remove books
    removeCardFromList(title) {
        this.cards = this.cards.filter((card) => 
            card._title !== title
        );
    };
    
    // search for book in library
    getCard(title) {
        return this.books.find((card) => 
            card.title.toLowerCase() === title.toLowerCase()
        );
    };

    // filter card list
    filterCards(search) {
        let indexes = [], i;
        for(i = 0; i < this.cards.length; i++)
            if (this.cards[i]._title.toLowerCase().includes(search.toLowerCase()))
                indexes.push(i);
        return this.cards[indexes];
    }
    
    // return
    isInList(newCard) {
        return this.cards.some((card) => 
            card._title.toLowerCase() === newCard._title.toLowerCase()
        );
    };

    // get all books
    returnAllCards() {
        return this.cards
    };

    // add card details to DOM
    addCardHTML() {
        let cards = []
        for(let i; i<this.cards.length; i++){
            let cardHTML = this.cards[i].createCard();
            cards.append(cardHTML)
        }
        return cards
    }
}


class Card {
    constructor(title, detail, assignee, status, priority) {
        this._title = title,
        this._detail = detail,
        this._assignee = assignee,
        this._status = status,
        this._priority = priority,
        this._showInfo = false
    }

    // setters
    setTitle(newTitle) {
        this._title = newTitle
    }
    setDetail(newDetail){
        this._detail = newDetail
    }
    setAssignee(newAssignee) {
        this._assignee = newAssignee
    }
    setStatus(newStatus){
        this._status = newStatus
    }
    setPriority(newPriority) {
        this._priority = newPriority
    }
    // getters
    getTitle(newTitle) {
        return this._title
    }
    getDetail(newDetail){
        return this._detail
    }
    getAssignee(newAssignee) {
        return this._assignee
    }
    getStatus(newStatus){
        return this._status
    }
    getPriority(newPriority) {
        return this._priority
    }

    getInfo() {
        return{
            'title':this.getTitle(),
            'detail': this.getDetail(),
            'assignee': this.getAssignee(),
            'status':this.getStatus(),
            'priority': this.getPriority(),
            'showInfo': this._showInfo
        }
    }
 
    createCard() {
        const card = document.createElement('div')
        const toggleInfoButton = document.createElement('button')
        const title = document.createElement('h3')
        const detail = document.createElement('p')
        const assignee = document.createElement('h4')
        const status = document.createElement('h4')
        const priority = document.createElement('h4')

        let gets = [this.getTitle(), this.getDetail(), this.getAssignee(), this.getStatus(), this.getPriority()]
        let sets = [title, detail, assignee, status, priority]

        toggleInfoButton.addEventListener('click', this.removeCard)
        toggleInfoButton.innerHTML='X'

        title.innerHTML = this.getTitle()
        detail.innerHTML = this.getDetail()
        assignee.innerHTML = `For: ${this.getAssignee()}`
        status.innerHTML = this.getStatus()
        priority.innerHTML = `Priority: ${this.getPriority()}`

        title.className = 'card-title'
        detail.className = 'card-info'
        assignee.className = 'card-info'
        status.className = 'card-info'
        priority.className = 'card-info'

        card.className = 'card'
        card.append(toggleInfoButton, title, detail, assignee, status, priority)

        return card
    }


    removeCard = (e) => {
        const target = e.target
        library.removeCardFromList(this._title)
        CardSpace.showCards()
    }
}

const Sidebar = (() => {

    // --- GET MODULE DOM COMPONENTS
    let _sidebar = document.querySelector('.sidebar');
    let _openButt = document.querySelector('.openbtn');


    let _toggleSidebar = () => {
        _sidebar.classList.toggle("sidebar--isHidden");
        _openButt.classList.toggle('.openbtn--isHidden');

        _openButt.innerHTML = _sidebar.classList.contains(
            "sidebar--isHidden"
        )
            ? "☰"
            : "☰";
    }

    _openButt.addEventListener("click", _toggleSidebar);

})();

const SearchBar = (() => {

    // --- GET MODULE DOM COMPONENTS
    const searchBar = document.querySelector('[card-search]');

    // search bar filter function
    let filterCards = (e) => {
        const cards = document.querySelectorAll('.card');
        let searchItem;
        searchItem = e.target.value.toLowerCase();
        console.log(cards)
        //Loop through library
        cards.forEach(card => {
            let titles = card.querySelector('.card-title');
            // let assignee = card.querySelector('.author');
            
            const isVisible = 
                titles.innerHTML.toLowerCase().includes(searchItem)
                // authors.innerHTML.toLowerCase().includes(searchItem)
            console.log(isVisible);
            card.classList.toggle('hide', !isVisible)
        });
    }

    searchBar.addEventListener('input', filterCards);

})();

const CardSpace = (() => {

    // --- GET MODULE DOM COMPONENTS
    let cardArea = document.querySelector('.card-space');

    // create cards
    let createCards = () => {
        let allCards = library.returnAllCards();

        console.log(`updated library with library list: ${JSON.stringify(allCards)}`)
        let cards = []
        console.log(allCards.length)
        for(let i = 0; i<allCards.length; i++){


            let addCard = allCards[i].createCard()
            cardArea.append(addCard)
        }
        console.log(JSON.stringify(cards))
        return cards
    }

    let clearCards = () => {
        cardArea.removeChild
        while (cardArea.firstChild) {
            cardArea.removeChild(cardArea.lastChild);
          }
    }

    // show the cards in the card library
    let showCards = () => {
        clearCards()
        createCards()
    }

    return {createCards: createCards,
        showCards: showCards}

})();

const NewForm = (() => {
    const closeBG = document.querySelector('.closeBG');
    const newButt = document.querySelector('.newButt');
    const newForm = document.querySelector('.new-form');
    const newCard = document.querySelector('.new-card');
    let newTitle = document.querySelector("#new-title")
    let newDetail = document.querySelector("#new-detail")
    let newAssignee = document.querySelector("#new-assignee")
    let newStatus = document.querySelector("#new-status")
    let newPriority = document.querySelector("#new-priority");
    let submitButt = document.querySelector('#submit-new');
    
    let newInputs = [newTitle, newDetail, newAssignee, newStatus, newPriority];
    //toggle visibility
    let showForm = () => {
        let topHeight = document.querySelector('.top').clientHeight;
        let mainHeight = document.querySelector('.main').clientHeight;
        let footHeight = document.querySelector('.foot').clientHeight;
        
        const bgHeight = topHeight + mainHeight + footHeight;
        const bgHeightPX = bgHeight.toString() + 'px';

        closeBG.style.height = bgHeight + 'px';
        closeBG.style.display = 'flex';
        newCard.style.display = 'flex';
    }

    let hideForm = () => {
        closeBG.style.display = 'none';
        closeBG.style.zIndex = 0;
        newCard.style.display = 'none';
    }

    // reset form
    let resetForm = () => {
        newForm.reset();
    }
    //close form by clicking bg
    closeBG.addEventListener("click", () => {
        hideForm();
        resetForm();
    });

    // get form inputs

    //send inputs
    let sendCardData = () => {
        
        let newCard = new Card()
        newCard.setTitle(newTitle.value)
        newCard.setDetail(newDetail.value)
        newCard.setAssignee(newAssignee.value)
        newCard.setStatus(newStatus.value)
        newCard.setPriority(newPriority.value)
        return newCard
    }
    getBookFromForm = () =>{
        let card = sendCardData()
        library.addCardToList(card)
    }
    let addNewBook = (e) => {
        e.preventDefault();
        sendCardData()
        getBookFromForm()
        CardSpace.showCards()
        hideForm()
        resetForm()
    }
       
    newButt.addEventListener('click', showForm);
    submitButt.addEventListener('click', addNewBook);
    return {closeBG: closeBG}

})()

var library = new Library()