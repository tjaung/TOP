import Card from './cards/card.js';
import Library from './cards/Library.js';

window.customElements.define('new-card', Card);

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
    let filterCards = () => {
        const cards = CardHolder.cards;
        let searchItem;
        searchItem = e.target.value.toLowerCase();
        console.log(cards)

        //Loop through library
        cards.forEach(card => {
            let titles = card.querySelector('.title');
            let authors = card.querySelector('.author');
            
            const isVisible = 
                titles.innerHTML.toLowerCase().includes(searchItem) ||
                authors.innerHTML.toLowerCase().includes(searchItem)
            console.log(isVisible);
            card.classList.toggle('hide', !isVisible)
        });
    };

    searchBar.addEventListener('input', filterCards);

})();

const CardSpace = (() => {

    // --- GET MODULE DOM COMPONENTS
    const cardArea = document.querySelector('.card-space');
    let CardLibrary = new Library();

    // create cards
    let createCards = () => {
        let cards = []
        for(let i=0; i<allCards.length; i++){
            let card = window.customElements.define('new-card', allCards[i]);
            console.log(allCards[i]);
        }
    }

    // show the cards in the card library
    let showCards = () => {
        let allCards = CardLibrary.returnAllCards();
        cardArea.innerHTML = CardSpace.addCardHTML();
        for(let i=0; i<allCards.length; i++){
            let card = window.customElements.define('new-card', allCards[i]);
            cardArea.innerHTML.append(card)
            console.log(allCards[i]);
        }
    }

    return{cards: CardLibrary,
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
        console.log(newTitle.value, 
            newDetail.value,
            newAssignee.value,
            newStatus.value,
            newPriority.value)
        let newCard = new Card(
            newTitle.value, 
            newDetail.value,
            newAssignee.value,
            newStatus.value,
            newPriority.value);
        let foot = document.querySelector('.foot');
        foot.innerHTML = newCard;
        console.log(newCard)
        // CardSpace.cards.addCardToList(newCard)
        // CardSpace.showCards(CardSpace.cards.returnAllCards())
        // console.log(CardSpace.cards.returnAllCards())
       
    }

    newButt.addEventListener('click', showForm);
    submitButt.addEventListener('click', sendCardData);
    return {closeBG: closeBG}

})()
