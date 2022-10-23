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

class Shelf {
    constructor() {
        this.books = [];

        // add books to shelf
        this.addBookToShelf = function (book) {
            this.books = [book];
        };

        // remove books
        this.removeBookFromShelf = function (book) {
            this.books = this.books.filter((book) => book.title !== title);
        };

    }
}
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


// New card form
let closeForm = (closeForm) => {
    const form = document.querySelector('.closeBG');
    form.parentNode.removeChild(form);
}

let inputCardInfo = () => {
    const closeBG = document.createElement('div');
    const newCard = document.createElement('div');
    const newForm = document.createElement('form');
    const newTitle = document.createElement('input');
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
    newTitle.className = 'title';
    newDetail.id = 'new-detail';
    newButtDiv.className = 'butt-holder';
    newSubmit.id = 'submit-new';

    //newForm.action = '';
    //newForm.method = 'post';

    closeBG.style.height = bgHeight + 'px';

    newForm.id = 'newCardInfo';
    
    newTitle.placeholder = 'Enter Title';
    newTitle.name = 'card-title';
    newTitle.minLength = 1;
    newTitle.maxLength = 50;
    newTitle.required = true;

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
        const cardText = document.createElement('p');
        console.log(newTitle.value)
        console.log(newDetail.value)

        makeCard(newTitle.value, newDetail.value);
        closeBG.remove();
        newCard.remove();
        });
        
        newButtDiv.append(newSubmit);
        newForm.append(newTitle, newDetail);
        newCard.append(newForm, newButtDiv);
        //closeBG.append(newCard);
        document.body.append(newCard);
        document.body.append(closeBG);

}

// New card function
let makeCard = (title, details) => {
    const cardDiv = document.createElement('div');
    const cardTitle = document.createElement('p');
    const cardText = document.createElement('p');
    console.log(title)
    console.log(details)

    //append children to parent div
    cardTitle.className = 'title';
    cardDiv.append(cardTitle, cardText);
    
    // add details
    cardTitle.innerHTML = title;
    cardText.innerHTML = details;

    // add card to card space
    cardArea.appendChild(cardDiv).className = 'card';

}
        
//openButt.onclick = openNav;
//closeButt.onclick = closeNav;

newButt.onclick = inputCardInfo;