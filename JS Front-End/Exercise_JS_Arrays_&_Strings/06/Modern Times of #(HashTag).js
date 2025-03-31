// function solve(sentence) {
//     const words = sentence.split(' ');
//
//     for (let w of words) {
//         // Check if the word starts with '#' and has more than 1 character
//         if (w.startsWith('#') && w.length > 1) {
//             const asciiCode = w.charCodeAt(1);  // Get ASCII code of the character after '#'
//
//             // Check if the next character is a letter (A-Z or a-z)
//             if ((asciiCode >= 65 && asciiCode <= 90) || (asciiCode >= 97 && asciiCode <= 122)) {
//                 console.log(w.substring(1));  // Print the word without the '#'
//             }
//         }
//     }
// }
//

function solve(sentense) {
    let pattern = /#[A-Za-z]+/g;
    const captures = sentense.match(pattern);

    captures.forEach(function (element){
        console.log(element.substring(1))
    });
}