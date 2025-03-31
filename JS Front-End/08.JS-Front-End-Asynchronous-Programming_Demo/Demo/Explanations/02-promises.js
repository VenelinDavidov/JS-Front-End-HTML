// Create promise 

const shoppingPromise = new Promise((resolve, reject) => {
    
    setTimeout(() => {
        if ( Math.random() < 0.7 ) {
            resolve('STATE - SUCCESS: Got bread!');
        } else {
            reject('STATE - FAILED: There was no bread to be found. :( ');
        }
    }, 1000);
    
})

// Consume promise
shoppingPromise
    .then((result) => { // fulfilled state
        console.log(result);
    })
    .catch((reason) => {
        console.log(reason);
    })
    .finally(() => {
        console.log('Time has been lost! Pay for gas!');
    });

// Promise all - if one rejects, all are rejected
Promise.all([
    shoppingPromise,
    Promise.resolve('Successfully resolved'),
    'Stuff',
    Promise.reject('Rejected')
])
    .then((result) => { // fulfilled state
        console.log(result);
    })
    .catch((reason) => { // failed state
        console.log(reason);
    })

// Promise all
Promise.allSettled([
    shoppingPromise,
    Promise.resolve('Successfully resolved'),
    'Stuff',
    Promise.reject('Rejected')
])
    .then((result) => {
        console.log(result);
    })
    .catch((reason) => { 
        console.log(reason);
    })