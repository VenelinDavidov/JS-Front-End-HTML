function factorialDivision(num1, num2) {


    const calculateFactorial = (num) => {

        if (num == 0 || num == 1 || num <= 1) {
            return 1;
        } else {
            return num * calculateFactorial(num - 1);
        }
    }

    const  factorial1 = calculateFactorial(num1);
    const factoriel2 = calculateFactorial(num2);

    const result = factorial1/factoriel2;
    console.log(result.toFixed(2));

}