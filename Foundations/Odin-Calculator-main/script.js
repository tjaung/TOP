class Calculator {

  //Initialize
  constructor(previousInput, currentInput) {
    this.previousInput = previousInput;
    this.currentInput = currentInput;
    this.clear();
    this.mem = null;
  }
  
  //clear functions
  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
  }
  
  clearCurr() {
    this.currentOperand = '0';
  }
  
  clearOne() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }
  
  //Memory functions
  saveM() {
    if(this.currentOperand == '0') return
    this.mem = this.currentOperand;
  }
  
  returnM() {
    if(this.mem === null) return;
    this.currentOperand = this.mem;
  }
  
  addM() {
    if(this.currentOperand == '0') return
    let m = parseFloat(this.mem);
    this.mem = m + parseFloat(this.currentOperand);
  }  
  
  subtractM() {
    if(this.currentOperand == '0') return
    let m = parseFloat(this.mem);
    this.mem = m - parseFloat(this.currentOperand);
  }  
  
  clearM() {
    if(this.mem == null) return
    this.mem = null;
  }
  
  getMemFunc(input) {
    switch(input) {
      case 'MC':
        this.clearM();
        break;
      case 'MR':
        this.returnM();
        break;
      case 'M+':
        this.addM();
        break;
      case 'M-':
        this.subtractM();
        break;
      case 'MS':
        this.saveM();
        break;
      default:
        return;
    };
  }
  
  //input functions
  appendItem(item) {
    if(item ==='.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + item.toString()
  }
  
  chooseMath(operation) {
    if (this.currentOperand === '0') return;
    if(this.previousOperand !== '0') {
      this.compute();
    };
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '0';
    
  }
  
  compute() {
    let result;
    
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    
    if(isNaN(prev) || isNaN(curr)) return;
    
    switch(this.operation) {
      case '+':
        result = prev+curr;
        break;
      case '-':
        result = prev-curr;
        break;
      case '/':
        result = prev/curr;
        break;
      case '*':
        result = prev*curr;
        break;
      default:
        return;
    };
   
   this.currentOperand = result;
   this.previousOperand = '';
   this.operation = undefined;
   
  }
  
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const intDigits = parseFloat(stringNumber.split('.')[0]);
    const decDigits = stringNumber.split('.')[1];
    const floatNum = parseFloat(number);
    
    let intDisplay;
    
    if(isNaN(intDigits)) {
      intDisplay = '0';
    } else {
     intDisplay = intDigits.toLocaleString('en', {
       maximumFractionDigits: 0});     
    }
    
    if(decDigits != null) {
      return `${intDisplay}.${decDigits}`;
    } else {
      return intDisplay;
    }
  }
  
  updateUI() {
    this.currentInput.innerHTML = this.getDisplayNumber(this.currentOperand);
    if(this.operation != null) {
      this.previousInput.innerHTML = `${this.previousOperand} ${this.operation}`;
    }
    else {this.previousInput.innerHTML = this.previousOperand};
    
  }
}

const numberButts = document.querySelectorAll('[data-number]');
const operationButts = document.querySelectorAll('[data-operation]');
const memoryButts = document.querySelectorAll('[data-memory]');
const clearAll = document.querySelector('[data-deleteAll]');
const clearCurrent = document.querySelector('[data-deleteCurrent]');
const clearOne = document.querySelector('[data-deleteOne]');
const equalButt = document.querySelector('[data-equals]');
const specialButt = document.querySelector('[data-special]');
const previousInput = document.querySelector('[data-previous]');
const currentInput = document.querySelector('[data-current]');

const calculator = new Calculator(previousInput, currentInput);


// add functions to buttons

//number buttons for ui
numberButts.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendItem(button.value)
    calculator.updateUI()
  })
})

// add operations
operationButts.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseMath(button.value)
    calculator.updateUI()
  })
})
//results
equalButt.addEventListener('click', button => { 
  calculator.compute();
  calculator.updateUI();
});


// clear buttons
clearAll.addEventListener('click', button => { 
  calculator.clear();
  calculator.updateUI();
});
clearCurrent.addEventListener('click', button => { 
  calculator.clearCurr();
  calculator.updateUI();
});
clearOne.addEventListener('click', button => {
  calculator.clearOne();
  calculator.updateUI();
});

// memory buttons
memoryButts.forEach(button => {
  button.addEventListener('click', () => {
    console.log(button.value)
    calculator.getMemFunc(button.value);
    calculator.updateUI();
  });
});
