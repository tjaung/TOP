function fibonnaci(n) {
    if(n<= 1) return n
    else return fibonnaci(n-1) + fibonnaci(n-2)
}

function fibonnaciEfficient(n){
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
      let c = a + b;
      a = b;
      b = c;
    }
    return b;
}
console.log(fibonnaciEfficient(1))
console.log(fibonnaciEfficient(2))
console.log(fibonnaciEfficient(3))
console.log(fibonnaciEfficient(7))
console.log(fibonnaciEfficient(77))
