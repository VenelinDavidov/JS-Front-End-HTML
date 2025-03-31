// function solve(array, step) {
//     const newArr = [];
//     for (let i = 0; i < array.length; i++) {
//         if (i % step === 0) newArr.push(array[i])
//     }
//
//     return newArr;
// }

// function solve(array, step) {
//
//     return array.filter(function (el, index){
//         return index % step === 0;
//     })
// }

function solve(array, step) {

    return array.filter((el, i) => i % step == 0);

}