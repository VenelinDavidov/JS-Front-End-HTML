function checForPalindromes (numbers){

    const isPalindrome = (num) => {
        const strNum = num.toString();
        const strNumReverse = strNum.split("").reverse().join("");

        return strNum === strNumReverse;
    }

   numbers.forEach(num => console.log(isPalindrome(num)))
}