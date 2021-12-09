import * as fs from "fs";

var text = fs.readFileSync("./1.txt").toString('utf-8');
var data = (text.split(/\r?\n/));

let newData = [];

for (let i = 1; i < data.length - 1; i++) {
    let value = +data[i - 1] + +data[i] + +data[i + 1];

    newData.push(value);
}

let increase = 0;

for (let i = 1; i < newData.length; i++) {
    if (newData[i] > newData[i - 1]) {
        increase++;
    }
}

console.log(increase);