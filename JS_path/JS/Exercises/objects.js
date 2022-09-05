function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        info = title + ' is a book written by ' + author + '. It is ' + pages + ' pages long. '
        if (read == true){
            info += 'You have read this book.'
        }
        else{
            info += 'You have not read this book yet.'
         }
        
         console.log(info)

    }
}

theHobbit = new Book('The Hobbit', 'J.R. Tolkien', 304, true);
theHobbit.info()