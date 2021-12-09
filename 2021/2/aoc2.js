// DOWN is INCREASE in DEPTH
// UP is DECREASE in DEPTH
// FORWARD is increase in horrizontal position

import * as fs from "fs";

var text = fs.readFileSync("./2.txt").toString('utf-8');
var data = (text.split(/\r?\n/));

let up = 0;
let down = 0;
let forward = 0;
let aim = 0;
let depth = 0;

data.forEach(value => {

    let x = parse(value);

    if (value.startsWith("forward")) {
        forward += x
        depth += (aim * x);
    }
    else if (value.startsWith("up")) {
        up += x
        aim -= x;
    } else {
        down += x
        aim += x;
    }
});

console.log("answer: " + depth * forward);

function parse(input) {
    return (Number(input.split(" ")[1]));
}