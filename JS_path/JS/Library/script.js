// Initialize DOM
const newBook = document.querySelector('.newBook');


// Initialize Data Structures
let shelf = [];

// Book object
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;

        this.info = function () {
            info = title + ' is a book written by ' + author + '. It is ' + pages + ' pages long. ';
            if (read == true) {
                info += 'You have read this book.';
            }
            else {
                info += 'You have not read this book yet.';
            }

            console.log(info);

        };
    }
}

class Library {
    constructor() {
        this.books = [];
    }
    // add books to shelf
    addBookToShelf = function (book) {
        this.books.push(book);
    };

    // remove books
    removeBookFromShelf(title) {
        this.books = this.books.filter((book) => 
            book.title !== title
        );
    };
    
    // search for book in library
    getBook(title) {
        return this.books.find((book) => 
            book.title.toLowerCase() === title.toLowerCase()
        );
    };
    
    // return
    isInLibrary(newBook) {
        return this.books.some((book) => 
            book.title.toLowerCase() === newBook.title.toLowerCase()
        );
    };

    // get all books
    returnAllBooks(books) {
        return this.values
    };
}
const myLibrary = new Library();
let theHobbit = new Book('The Hobbit', 'J.R. Tolkien', 304, true, 'good book');
myLibrary.addBookToShelf(theHobbit);

// New book function
// get dom elements for data input. Push this data to the book constructor
// once a new book object is created, push it to the shelf object.
// if the shelf is full, create a new shelf and add book to new shelf
//let 


//UI functions
const openButt = document.querySelector('.openbtn');
const closeButt = document.querySelector('.closebtn');
const container = document.querySelector('.container');
const sidebar = document.querySelector('.sidebar');
const newButt = document.querySelector('.newButt');
const cardArea = document.querySelector('.card-space');
const removeButts = document.querySelectorAll('#remove');
const searchBar = document.querySelector('[card-search]');
const cards = document.getElementsByClassName('card');

window.addEventListener("DOMContentLoaded", () => {
	document.querySelector('.openbtn').addEventListener("click", () => {
		const sidebarEl = document.getElementsByClassName("sidebar")[0];
        const sidebutton = document.querySelector('.openbtn');

		sidebarEl.classList.toggle("sidebar--isHidden");
        sidebutton.classList.toggle('.openbtn--isHidden');

		sidebutton.innerHTML = sidebarEl.classList.contains(
			"sidebar--isHidden"
		)
			? "☰"
			: "☰";
	});
});

// Nav bar
let openNav = () => {
    container.style.transition = "all 0.75s";
    container.style.gridTemplateColumns = "1fr 3fr 1fr";
    console.log('open nav');
    sidebar.style.display='';
    };

let closeNav = () => {
    container.style.transition = "all 0.75s";
    container.style.gridTemplateColumns = "0px 4fr 1fr";
    console.log('close nav');
    sidebar.style.display = 'none';
};

// search bar filter function
searchBar.addEventListener('input', function(e) {
    const cards = document.querySelectorAll('.card');
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
});



// New card form
let closeForm = (closeForm) => {
    const form = document.querySelector('.closeBG');
    form.parentNode.removeChild(form);
}

removeButts.forEach(button => {
    button.addEventListener('click', function(e) {
        let title = this.parentNode.nextSibling.innerHTML; 
        console.log(title);
        myLibrary.removeBookFromShelf(title);

        e.currentTarget.parentNode.parentNode.remove();
      }, false);
});

let inputCardInfo = () => {
    const closeBG = document.createElement('div');
    const newCard = document.createElement('div');
    const newForm = document.createElement('form');
    const newTitle = document.createElement('input');
    const newAuthor = document.createElement('input');
    const newPages = document.createElement('input');
    const newRead = document.createElement('input');
    newPages.setAttribute("type", "number");
    newRead.setAttribute("type", "checkbox");

    const newDetail = document.createElement('textarea');
    const newButtDiv = document.createElement('div');
    const newSubmit = document.createElement('button');
    
    //get body heights
    let topHeight = document.querySelector('.top').clientHeight;
    let mainHeight = document.querySelector('.main').clientHeight;
    let footHeight = document.querySelector('.foot').clientHeight;
    
    const bgHeight = topHeight + mainHeight + footHeight;
    const bgHeightPX = bgHeight.toString() + 'px';

    closeBG.className = 'closeBG';
    newCard.className = 'new-card';
    newForm.className = 'new-form';
    newTitle.className = 'new-item';
    newAuthor.className = 'new-item';
    newPages.className = 'new-item';
    newRead.className = 'new-item';

    newCard.id = 'new-card';
    newForm.id = 'new-form';
    newTitle.id = 'title-input';
    newAuthor.id = 'author-input';
    newPages.id = 'page-input';
    newRead.id = 'read-input';
    newDetail.id = 'note-input';
    newButtDiv.className = 'butt-holder';
    newSubmit.id = 'submit-new';

    //newForm.action = '';
    //newForm.method = 'post';

    closeBG.style.height = bgHeight + 'px';

    newForm.id = 'newCardInfo';
    
    // create form parameters
    newTitle.placeholder = 'Enter Title';
    newTitle.name = 'card-title';
    newTitle.minLength = 1;
    newTitle.maxLength = 50;
    newTitle.required = true;

    newAuthor.placeholder = 'Enter Author(s)';
    newAuthor.name = 'card-author';
    newAuthor.minLength = 1;
    newAuthor.maxLength = 50;
    newAuthor.required = true;

   // newPages.placeholder = 'Enter Page Numbers';
    newPages.name = 'card-pages';
    newPages.placeholder = 'Pages';
    newPages.min = 0;
    newPages.max = 10000;
    newPages.required = true;

   // newRead.placeholder = 'Have you read this?';
    newRead.name = 'card-read';
    newRead.placeholder = 'Completed?'

    newDetail.placeholder = 'Enter details here';
    newDetail.name = 'new-detail';
    newDetail.maxLength = 250;

    newSubmit.innerHTML = 'Submit';
    //newSubmit.type = 'submit';
    closeBG.addEventListener("click", () => {
        closeBG.remove();
        newCard.remove();
    });

    newSubmit.addEventListener("click", () => {
        //const info = getInput(newForm)
        const cardDiv = document.createElement('div');
        const cardTitle = document.createElement('p');
        const cardAuthor = document.createElement('p');
        const cardPages = document.createElement('p');
        const cardRead = document.createElement('p');
        const cardText = document.createElement('p');
        console.log(newTitle.value)
        console.log(newDetail.value)


        makeCard(newTitle.value, newAuthor.value, newPages.value, newRead.value, newDetail.value);

        closeBG.remove();
        newCard.remove();
        });
        
        newButtDiv.append(newSubmit);
        newForm.append(newTitle, newAuthor, newPages, newRead, newDetail);
        newCard.append(newForm, newButtDiv);

        document.body.append(newCard);
        document.body.append(closeBG);
    
}

// New card function
let makeCard = (title, author, pages, read, details) => {
    const removeButton = document.createElement('button');
    const removeDiv = document.createElement('div');
    const cardDiv = document.createElement('div');
    const cardTitle = document.createElement('p');
    const cardAuthor = document.createElement('p');
    const cardPages = document.createElement('p');
    const cardRead = document.createElement('p');
    const cardText = document.createElement('p');
    console.log(title)
    console.log(details)

    // Remove button
    removeButton.innerHTML = 'X';
        removeButton.addEventListener('click', function(e) {
            let title = this.parentNode.nextSibling.innerHTML; 
            console.log(title);
            myLibrary.removeBookFromShelf(title);
    
            e.currentTarget.parentNode.parentNode.remove();
          }, false);

    removeDiv.appendChild(removeButton);

    //append children to parent div
    cardTitle.className = 'title';
    cardAuthor.className = 'author';
    cardPages.className = 'pages';
    cardRead.className = 'read';
    cardText.className = 'notes';

    cardDiv.append(removeDiv, cardTitle, cardAuthor, cardPages, cardRead, cardText);
    
    // add details
    cardTitle.innerHTML = title;
    cardAuthor.innerHTML = author;
    cardPages.innerHTML = pages;
    cardRead.innerHTML = (cardRead ? 'Finished' : 'Unfinished');
    cardText.innerHTML = details;

    // add card to card space
    cardArea.appendChild(cardDiv).className = 'card';

    // Initialize new book
    let newBook = new Book(title, author, pages, cardRead, details);
    myLibrary.addBookToShelf(newBook);
}
        
//openButt.onclick = openNav;
//closeButt.onclick = closeNav;

newButt.onclick = inputCardInfo;