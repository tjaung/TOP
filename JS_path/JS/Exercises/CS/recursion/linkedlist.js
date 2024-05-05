let list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
  };

function printlist(list) {
    // console.log(list.next)
    if(list.next === null) console.log(list)
    else{
        console.log(list) 
        printlist(list.next)
    }
}

function printReverseList(list) {

    if (list.next) {
      printReverseList(list.next);
    }
  
    console.log(list.value);
  }

printlist(list)
printReverseList(list)