import * as fs from "fs";

var text = fs.readFileSync("./9x.txt").toString('utf-8');
var data = text.split(/\r?\n/);

let sum = 0;

function isLowPoint(row, col) {
    
    let value = Number(data[row][col]);
    let values = [];

    for (let y = row - 1; y <= row + 1; y++) {
        for (let x = col - 1; x <= col + 1; x++) {
            let point = data[y][x];
            values.push(point);
            if (point === 'X' || x === col && y === row){
                continue;
            } else if (Number(point) <= value) {
                return false;
            } 
        }        
    }

    return true;
}

for (let row = 1; row < data.length - 1; row++) {
    for (let col = 1; col < data[0].length - 1; col++) {
        if (isLowPoint(row, col)) {
            sum += (Number(data[row][col]) + 1);
        }
    }
}

console.log(sum);