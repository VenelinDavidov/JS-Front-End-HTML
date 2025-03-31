function perfectNumber(num) {
    let sum = 1;


    for (let i = 2; i < num; i++) {
        if (num % i === 0) sum += i;
    }

    if (num === sum) {
        console.log("We have a perfect number!");

    }else {
        console.log("It's not so perfect.")
    }


}