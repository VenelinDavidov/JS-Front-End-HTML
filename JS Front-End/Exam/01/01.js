function vikingSaga(input) {


    const n = Number(input[0]);
    const warriors = new Map();



    for (let i = 1; i <= n; i++) {
        const [name, weapon, strengthStr] = input[i].split("-");
        const strength = Number(strengthStr);
        warriors.set(name, {
            weapons: [weapon],
            strength: strength
        });
    }


    for (let i = n + 1; i < input.length; i++) {

        const line = input[i];

        if (line === "The Saga Ends") break;

        const [command, name, arg1, arg2] = line.split(" -> ");
        const warrior = warriors.get(name);
        if (!warrior || warrior.strength <= 0) continue;

        if (command === "Raid") {
            const weapon = arg1;
            const strengthRequired = Number(arg2);

            if (warrior.weapons.includes(weapon) && warrior.strength >= strengthRequired) {
                warrior.strength -= strengthRequired;
                console.log(`${name} fought bravely with ${weapon} and now has ${warrior.strength} strength!`);
            } else {
                console.log(`${name} couldn't join the raid with ${weapon}!`);
            }

        } else if (command === "Train") {
            const strengthGained = Number(arg1);
            if (warrior.strength === 100) {
                console.log(`${name} is already at full strength!`);
            } else {
                const actualGained = Math.min(strengthGained, 100 - warrior.strength);
                warrior.strength += actualGained;
                console.log(`${name} trained hard and gained ${actualGained} strength!`);
            }

        } else if (command === "Forge") {
            const newWeapon = arg1;
            if (warrior.weapons.includes(newWeapon)) {
                console.log(`${name} already wields ${newWeapon}.`);
            } else {
                warrior.weapons.push(newWeapon);
                console.log(`${name} has forged a new weapon: ${newWeapon}!`);
            }
        }
    }


    for (let [name, warrior] of warriors) {
        if (warrior.strength > 0) {
            console.log(`Warrior: ${name}`);
            console.log(` - Weapons: ${warrior.weapons.join(", ")}`);
            console.log(` - Strength: ${warrior.strength}`);
        }
    }
}

vikingSaga(["3",
    "Floki-Hammer-20",
    "Helga-Net-100",
    "Thorvald-Axe-70",
    "Forge -> Helga -> Trap",
    "Raid -> Floki -> Hammer -> 30",
    "Raid -> Helga -> Trap -> 80",
    "Forge -> Thorvald -> Hammer",
    "The Saga Ends"
]);
