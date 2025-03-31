function log(variablesObject) {
    Object.keys(variablesObject).forEach(variableName => {
        console.log('----');
        console.log(variableName + '  (' + typeof variablesObject[variableName] + ')' );
        console.log('');
        console.log(JSON.stringify(variablesObject[variableName], 0, 2));
        console.log('');
    })
}

function solve(input) {

    const chemicalsCount = input.shift();

    const chemicals = input.splice(0, chemicalsCount).reduce((chemicalsObj, entry) => {
        const [ chemical, amount ] = entry.split(' # ');

        chemicalsObj[chemical] = { quantity: Number(amount) }

        return chemicalsObj;
    }, {});

    input.forEach(entry => {

        const line = entry.split(' # ');
        const command = line.shift();

        let name = '';

        switch (command) {
            case 'Mix':

                const [ chemical1, chemical2, amount ] = line;

                if ( chemicals[chemical1].quantity >= amount && chemicals[chemical2].quantity >= amount ) {

                    chemicals[chemical1].quantity -= amount;
                    chemicals[chemical2].quantity -= amount;

                    console.log(`${chemical1} and ${chemical2} have been mixed. ${amount} units of each were used.`);

                } else {

                    console.log(`Insufficient quantity of ${chemical1}/${chemical2} to mix.`);
                }

                break;
            case 'Replenish':

                name = line.shift();
                const [ addedAmount ] = line;

                if ( ! chemicals.hasOwnProperty(name) ) {
                    console.log(`The Chemical ${name} is not available in the lab.`);
                } else {

                    if ( ( chemicals[name].quantity + Number(addedAmount) ) > 500 ) {
                        console.log(`${name} quantity increased by ${500 - chemicals[name].quantity} units, reaching maximum capacity of 500 units!`);
                        chemicals[name].quantity = 500;
                    } else {
                        chemicals[name].quantity += Number(addedAmount);
                        console.log(`${name} quantity increased by ${addedAmount} units!`);
                    }
                }

                break;
            case 'Add Formula':

                name = line.shift();
                const [ formula ] = line;

                if ( ! chemicals.hasOwnProperty(name) ) {
                    console.log(`The Chemical ${name} is not available in the lab.`);
                } else {
                    chemicals[name].formula = formula;
                    console.log(`${name} has been assigned the formula ${formula}.`);
                }

                break;
        }

    });

    // log({ chemicals });


    Object.keys(chemicals).forEach(name => {

        let output = '';

        output += `Chemical: ${name}, Quantity: ${chemicals[name].quantity}`;

        if ( chemicals[name].hasOwnProperty('formula') ) {
            output += `, `;
            output += `Formula: ${chemicals[name].formula}`;
        }

        console.log(output);

    });

}



solve([
    '4',
    'Water # 200',
    'Salt # 100',
    'Acid # 50',
    'Base # 80',
    'Mix # Water # Salt # 50',
    'Replenish # Salt # 150',
    'Add Formula # Acid # H2SO4',
    'End'
]);

// Water and Salt have been mixed. 50 units of each were used.
// Salt quantity increased by 150 units!
// Acid has been assigned the formula H2SO4.
// Chemical: Water, Quantity: 150
// Chemical: Salt, Quantity: 200
// Chemical: Acid, Quantity: 50, Formula: H2SO4
// Chemical: Base, Quantity: 80


// solve([
//     '3',
//     'Sodium # 300',
//     'Chlorine # 100',
//     'Hydrogen # 200',
//     'Mix # Sodium # Chlorine # 200',
//     'Replenish # Sodium # 250',
//     'Add Formula # Sulfuric Acid # H2SO4',
//     'Add Formula # Sodium # Na',
//     'Mix # Hydrogen # Chlorine # 50',
//     'End'
// ]);


// Insufficient quantity of Sodium/Chlorine to mix.
// Sodium quantity increased by 200 units, reaching maximum capacity of 500 units!
// The Chemical Sulfuric Acid is not available in the lab.
// Sodium has been assigned the formula Na.
// Hydrogen and Chlorine have been mixed. 50 units of each were used.
// Chemical: Sodium, Quantity: 500, Formula: Na
// Chemical: Chlorine, Quantity: 50
// Chemical: Hydrogen, Quantity: 150
