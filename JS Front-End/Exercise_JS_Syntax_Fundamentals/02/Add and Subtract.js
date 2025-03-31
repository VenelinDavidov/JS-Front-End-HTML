function addEndSubstract(num1, num2, num3) {
    const sum = (x, y) => x + y;
    const substract = (x, y) => x - y;

    return substract(sum(num1, num2), num3 )
}