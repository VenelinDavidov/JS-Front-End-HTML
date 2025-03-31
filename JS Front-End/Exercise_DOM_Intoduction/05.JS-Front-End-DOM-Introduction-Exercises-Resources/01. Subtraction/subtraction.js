// function subtract() {
//
//     const inputElementFirst = document.querySelector('#firstNumber');
//     const inputElementSecond = document.querySelector('#secondNumber');
//     const resultElem = document.querySelector('#result');
//
//     console.log(inputElementFirst)
//
//     const result = Number(inputElementFirst.value) - Number(inputElementSecond.value);
//
//     resultElem.textContent = result;
// }


function subtract() {

    const num1 = Number(  document.querySelector('#firstNumber').value);
    const num2 = Number ( document.querySelector('#secondNumber').value);

    document.querySelector('#result').textContent = num1 - num2;

}