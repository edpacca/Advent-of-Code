import * as fs from "fs";

var text = fs.readFileSync("./8.txt").toString('utf-8');
var lines = text.split(/\r?\n/);

var inputs = [];
var outputs = [];
let total = 0;

lines.forEach(line => {
    let parts = line.split('|');
    let input = parts[0].trimEnd().split(' ');
    let output = parts[1].trimStart().split(' ');
    outputs.push(output);
    inputs.push(input);
})



