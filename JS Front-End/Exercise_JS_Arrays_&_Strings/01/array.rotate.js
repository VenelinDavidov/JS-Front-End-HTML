

// Array.prototype.rotate = function (count) {

 function solve (array, rotationCount) {

    for (let i = 0; i < rotationCount; i++) {
        array.push(array.shift());
    }
   console.log(array.join(' '))
}


solve([51, 47, 32, 61, 21], 2)
solve([32, 21, 61, 1], 4);
solve([2, 4, 15, 31], 5)



//
// let arr = [ 51, 47, 32, 61, 21];
// console.log(arr.rotate(2).join(' '))