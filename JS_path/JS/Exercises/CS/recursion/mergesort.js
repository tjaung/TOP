function mergeSort(arr) {

    let tmp = [...arr]

    if(tmp.length == 1) return tmp
    else{
        const half = Math.ceil(tmp.length / 2);  

        let firstHalf = mergeSort(tmp.slice(0, half))
        let secondHalf = mergeSort(tmp.slice(half))
        
        const out = []
        let i = 0
        let j = 0
        let k = 0
        while((i < firstHalf.length) && (j < secondHalf.length)) {

            if((firstHalf[i] < secondHalf[j]) || (firstHalf[i] == secondHalf[j])){
                out.push(firstHalf[i])
                i++
            }
            if(firstHalf[i] > secondHalf[j]) {
                out.push(secondHalf[j])
                j++
            }
        }
        if(i < firstHalf.length) {
            for(let a = i; a < firstHalf.length; a++){
                out.push(firstHalf[a])
            }
        }
        else if(j < secondHalf.length) {
            for(let a = j; a < secondHalf.length; a++){
                out.push(secondHalf[a])
            }
        }
        return out
    }
}

const test1 = [3, 2, 1, 13, 8, 5, 0, 1] 
const test2 = [105, 79, 100, 110]

console.log(mergeSort(test1))
console.log(mergeSort(test2))
