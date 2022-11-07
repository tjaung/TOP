class Library {
    constructor() {
        this.cards = [];
    }
    // add books to shelf
    addCardToList = function (card) {
        this.cards.push(card);
    };

    // remove books
    removeCardFromList(title) {
        this.cards = this.cards.filter((card) => 
            card.title !== title
        );
    };
    
    // search for book in library
    getCard(title) {
        return this.books.find((card) => 
            card.title.toLowerCase() === title.toLowerCase()
        );
    };
    
    // return
    isInList(newCard) {
        return this.cards.some((card) => 
            card.title.toLowerCase() === newCard.title.toLowerCase()
        );
    };

    // get all books
    returnAllCards(cards) {
        return this.values
    };

    // add card details to DOM
    addCardHTML(cards) {
        let newCard = document.createElement('div');

        newCard.innerHTML = `
        <span slot="title">Title 1</span>
        <span slot="details">detail 1</span>
        <span slot="assignee">Me</span>
        <span slot="status">In Progress</span>
        <span slot="priority">High</span>
        `
        return newCard
    }
}

export default Library;