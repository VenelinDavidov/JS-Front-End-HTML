// Callback functions

// addEventListener
// function documentLoadedHandler() {
//     console.log('document content has loaded');
// }

// document.addEventListener('DOMContentLoaded', documentLoadedHandler)

// setTimeout

// console.log(1);

// setTimeout(() => console.log(2), 1000);

// console.log(3);

// Counter

let counter = 1;

for (let i = 0; i <= 10; i++) {
    setTimeout(() => {
        counter += 1;
        console.log(counter);
    }, 1000);
}

// console.log(counter);