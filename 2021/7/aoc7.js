import * as fs from "fs";

var text = fs.readFileSync("./7.txt").toString('utf-8');
var crabs = text.split(',').map((v) => parseInt(v, 10));
let fuels = [];
let max = Math.max(...crabs);

for (let i = 0; i < max; i++) {

    let totalFuel = 0;

    crabs.forEach(crab => {
        totalFuel += getFuel(crab, i);
    });

    fuels.push(totalFuel);
}

console.log(Math.min(...fuels));

function getFuel(num1, num2) {
    const difference = Math.abs(num1 - num2);
    let fuel = 0;

    for (let i = 0; i < difference; i++) {
        fuel += (difference - i);
    }

    return fuel;
}