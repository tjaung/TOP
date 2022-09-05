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
let 