function solve(input) {

    const zippedArray = [];
    const initialArray = input.length;

    input.sort((a, b) => a - b);

    for (let i = 0; i < initialArray; i++) {
         if (i % 2 == 0) {
             const el = input.shift();
             zippedArray.push(el)
         }else {
             const el = input.pop();
             zippedArray.push(el);
         }
    }

    return zippedArray;
}

