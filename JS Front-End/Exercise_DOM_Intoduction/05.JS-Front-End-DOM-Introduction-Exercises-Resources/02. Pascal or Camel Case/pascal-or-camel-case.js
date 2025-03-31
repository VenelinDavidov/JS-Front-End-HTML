function solve() {

    const inputText =
        document.querySelector('#text')
            .value.toLowerCase()
            .split(' ');

    const namingConvention =
        document.querySelector('#naming-convention')
            .value.toLowerCase()
            .trim();


    const resultEl = document.querySelector('#result');

    function capitaliseWord(word) {
        return word[0].toUpperCase() + word.slice(1)
    }


    switch (namingConvention) {
        case "camel case":
            resultEl.textContent = inputText[0] + inputText.slice(1).map(capitaliseWord).join('');
            break;
        case "pascal case":
            resultEl.textContent = inputText.map(capitaliseWord).join('');
            break;
        default:
            resultEl.textContent = 'Error!';
    }


}