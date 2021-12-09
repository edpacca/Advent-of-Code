import * as fs from "fs";

var text = fs.readFileSync("./3.txt").toString('utf-8');
var data = (text.split(/\r?\n/));

let gamma = [0,0,0,0,0,0,0,0,0,0,0,0];
let epsilon = [0,0,0,0,0,0,0,0,0,0,0,0];

data.forEach(value => {
    
    for (let i = 0; i < 12; i++) {
        gamma[i] += Number(value.charAt(i));
    }

});

let gammaBin = "";
let epsilonBin = "";

let gammaDec = 0;
let epsilonDec = 0;

const count = data.length;

for (let i = 0; i < gamma.length; i++) {
    
    gamma[i] = gamma[i] / count;
    console.log(gamma[i]);
    gamma[i] = Number(gamma[i].toFixed(0));
    epsilon[i] = gamma[i] === 0 ? 1 : 0;
 //   console.log(i + ": "+ gamma[i] + " " + epsilon[i] + "\n" + "_____");
}

for (let i = 0; i < gamma.length; i++) {
    epsilonBin += gamma[i].toString();
    gammaDec += gamma[i] * (Math.pow(2, i));
    gammaBin += epsilon[i].toString();
    epsilonDec += epsilon[i] * (Math.pow(2, i));
}

console.log(`gamma: ${gamma}`);
console.log(`epsilon: ${epsilon}`);
console.log(gammaBin + " = " + gammaDec);
console.log(epsilonBin + " = " + epsilonDec);
console.log("POWER: " + gammaDec * epsilonDec);
console.log("\n")

let o2List = data;
let co2List = data;

let i = 0;
do {
    const bit = findCriteriaValue(o2List, i, 1);
    o2List = filter(o2List, i, bit);
    i++;
} while(o2List.length > 1);

let j = 0;
do {
    const bit = findCriteriaValue(co2List, j, 0);
    co2List = filter(co2List, j, bit);
    j++;
} while(co2List.length > 1);

function filter(list, index, startsWith) {
    return list.filter(value => value.substring(index).startsWith(startsWith));
}

console.log("O2: " + o2List)
console.log("CO2: " + co2List)

let o2 = o2List[0];
let co2 = co2List[0];

let o2Bin = "";
let co2Bin = "";
let o2Dec = 0;
let co2Dec = 0;

for (let i = 0; i < o2.length; i++) {
    let j = 11 - i;
    o2Bin += o2[i].toString();
    o2Dec += o2[j] * (Math.pow(2, i));
}

for (let i = 0; i < co2.length; i++) {
    let j = 11 - i;
    co2Bin += co2[i].toString();
    co2Dec += co2[j] * (Math.pow(2, i));
}


console.log(o2Bin + " = " + o2Dec)
console.log(co2Bin + " = " + co2Dec)
console.log("LIFE: " + o2Dec * co2Dec);


function findCriteriaValue(list, position, criterion) {

    let total = 0;
    list.forEach(value => {
        total += Number(value.charAt(position));
    });

    let bit = total / list.length;
    bit = Number(bit.toFixed(0));

    bit = criterion === 0 ? (bit === 1 ? 0 : 1) : bit;
    const suffix = criterion === 1 ? 'most' : 'least';
    console.log(`${suffix} common value at pos ${position} = ${bit}`);
    return bit;
}


