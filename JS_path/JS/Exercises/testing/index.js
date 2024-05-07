function capitalize(str) {
    if(typeof str === 'string') {
        let tmp = str.split("")
        const newStr = []
        for(let i = 0; i < tmp.length; i++){
            if(i === 0) newStr.push(tmp[i].toUpperCase())
            else newStr.push(tmp[i])
        }

        return newStr.join('')
    } 
    else{
        throw new Error('Enter a string');
    }

}

function reverseString(str) {
    if(typeof str !== 'string') throw new Error('Enter a string');

    const tmp = str.split("")
    const out = []
    for (let i = tmp.length-1; i >= 0; i--) {
        out.push(tmp[i])
    }

    return out.join("")
}

function caesarCipher(str, shift) {
    if(typeof str !== 'string') throw new Error('Value should be a string.')
    if(typeof shift !== 'number') throw new Error('Value should be a number.')

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const tmp = str.toLowerCase().split("")

    const out = tmp.map((char) => {
        if(char === ' ') return ' '

        let ind = alphabet.indexOf(char) + shift
        if(ind >= alphabet.length) {
            ind -= alphabet.length
        }
        return alphabet[ind]
    })

    return out.join('').toUpperCase()
}

function analyzeArray(arr) {
    if(!arr.every(function(ele) {return typeof ele === 'number';})) throw new Error('Should be array of all numbers.')

    const tmp = [...arr]
    const out = {
        average: 0,
        min: tmp[0],
        max: tmp[0],
        length: tmp.length
    }
    for (let i = 0; i < tmp.length; i++) {
        if(tmp[i] < out.min) out.min = tmp[i]
        if(tmp[i] > out.max) out.max = tmp[i]
        out.average += tmp[i]
    }
    out.average = out.average / out.length

    return out
}

module.exports = {
    capitalize: capitalize,
    reverseString: reverseString,
    caesarCipher: caesarCipher,
    analyzeArray: analyzeArray
}