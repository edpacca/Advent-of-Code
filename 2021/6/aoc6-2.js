import * as fs from "fs";

var text = fs.readFileSync("./6.txt").toString('utf-8');
var data = text.split(',');

var fishes = [0, 0, 0, 0, 0, 0, 0, 0, 0];

data.forEach(value => {
    fishes[value]++;
});

console.log(fishes);

const maxDay = 256;
let day = 0;
while (day < maxDay) {
    day++;
    console.log(`day ${day}`)

    let buffer = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 8; i > 0; i--) {
        buffer[i - 1] = fishes[i];
    }

    buffer[6] += fishes[0];
    buffer[8] += fishes[0];

    fishes = buffer;
}

let total = 0;
fishes.forEach(value => total += value);
console.log(total);
