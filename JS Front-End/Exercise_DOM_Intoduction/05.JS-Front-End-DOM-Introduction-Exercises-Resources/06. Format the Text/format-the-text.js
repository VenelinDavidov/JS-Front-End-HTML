function solve() {

    const inputEl = document.querySelector('#input');
    const outputEl = document.querySelector('#output');

    const sentences = inputEl.value.split('. ');
    const sentPerPer = 3;

    const numberOfParagraphs = Math.ceil(sentences.length / sentPerPer);

    let output = '';

    for (let i = 0; i < numberOfParagraphs; i++) {
        const p = i * numberOfParagraphs;
        output += '<p>';
        output += sentences.slice(p, (p + sentPerPer)).join('. ');
        output += '</p>';
    }

    outputEl.innerHTML = output;
}