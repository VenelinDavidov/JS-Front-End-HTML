function solve(words, sentence) {

    words = words.split(', ')

    for (let w of words) {
        sentence = sentence.replace('*'.repeat(w.length), w);
    }
    console.log(sentence)
}