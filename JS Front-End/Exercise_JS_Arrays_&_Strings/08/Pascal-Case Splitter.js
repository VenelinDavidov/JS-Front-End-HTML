function solve (string) {

    console.log(string.match(/[A-Z][a-z]*/g).join(', '));

}