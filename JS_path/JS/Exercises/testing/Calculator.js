class Calculator {
    constructor(){

    }

    add(num1, num2) {
        if((typeof num1 !== 'number') || (typeof num2 !== 'number')) throw new Error('Values should be Numbers.')

        return num1 + num2
    }

    subtract(num1, num2) {
        if((typeof num1 !== 'number') || (typeof num2 !== 'number')) throw new Error('Values should be Numbers.')

        return num1 - num2
    }

    divide(num1, num2) {
        if((typeof num1 !== 'number') || (typeof num2 !== 'number')) throw new Error('Values should be Numbers.')

        return num1 / num2
    }

    multiply(num1, num2) {
        if((typeof num1 !== 'number') || (typeof num2 !== 'number')) throw new Error('Values should be Numbers.')

        return num1 * num2
    }

}

module.exports = Calculator