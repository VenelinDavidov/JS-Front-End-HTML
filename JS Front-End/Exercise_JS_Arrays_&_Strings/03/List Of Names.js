function solve(array) {
    array
        .sort((a, b) => a.localeCompare(b))
        .forEach(function (element, index) {
            console.log(`${index + 1}.${element}`);
        });
}

solve(["John", "Bob", "Christina", "Ema"])