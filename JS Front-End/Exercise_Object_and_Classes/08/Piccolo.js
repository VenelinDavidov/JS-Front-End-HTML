function solve(input) {

    const parking = {};

    input.forEach(entry => {

        const [direction, carNumber] = entry.split(', ');

        if (direction == 'IN') {
            if (! parking.hasOwnProperty(carNumber)) parking[carNumber] = 1;
        } else {
            if (parking.hasOwnProperty(carNumber)) delete parking[carNumber];
        }
    });


    if (Object.keys(parking).length > 0) {

        Object
            .entries(parking)
            .sort()
            .forEach(([carNumber]) => console.log(carNumber));

    } else {
        console.log('Parking Lot is Empty')
    }
}