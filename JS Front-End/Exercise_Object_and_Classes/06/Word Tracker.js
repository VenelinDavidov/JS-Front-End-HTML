function solve(input) {


    const searchWords = input.shift().split(' ');

    const matched = searchWords.reduce((matched, word) => ({...matched, [word]: 0}), {});


    input.forEach(word => {
        if (matched.hasOwnProperty(word)) matched[word] += 1;
    });

    Object
        .entries(matched)
        .sort((a, b) => b[1] - a[1])
        .forEach(([word, count]) => console.log(`${word} - ${count}`));

}