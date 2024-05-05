function sumTo(n){
    result = 0
    for(let i = 0; i <= n; i++){
        result += i
    }
    return result
}

function sumToRecursion(n){
    if(n == 1) return n
    else{
        return n + sumToRecursion(n-1)
    }
}

function sumToAP(n){
    return (n * (1+n))/2
}
let correct = 5+4+3+2+1
console.log('Correct Output: ' + correct)
console.log('For Loop: ' + sumTo(100))
console.log('Recursion: ' + sumToRecursion(100))
console.log('Arithmetic Progression: ' + sumToAP(100))
