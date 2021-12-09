import * as fs from "fs";

var text = fs.readFileSync("./5.txt").toString('utf-8');
var data = text.split(/\r?\n/);

let vents = data.map(value => {
    let coords = value.split(' -> ');
    return coords.map(value => {
        let vent = (value.split(','));
        return vent.map(v => {
            return parseInt(v);
        })
    })    
})

const horizontal = [];
const vertical = []; 
const diagonal = [];

vents.forEach(vent => {
    if (vent[0][0] === vent[1][0]) {
        vertical.push(vent);
    } else if (vent[0][1] === vent[1][1]) {
        horizontal.push(vent);
    } else {
        diagonal.push(vent);
    }
});

let overlaps = [];
let map = []

horizontal.forEach(vent => {
    recordHorizontalToMap(vent);
});

vertical.forEach(vent => {
    recordVerticalToMap(vent);
});

diagonal.forEach(vent => {
    recordDiagonalToMap(vent);
})

function recordVerticalToMap(vent) {

    const lowY = Math.min(vent[0][1], vent[1][1]);
    const highY = Math.max(vent[0][1], vent[1][1]);

    for (let i = lowY; i <= highY; i++) {
        let coordString = `${vent[0][0]},${i}`
        if (map.includes(coordString) && !overlaps.includes(coordString)) {
            overlaps.push(coordString);

        } else {
            map.push(coordString);
        }
    }
}

function recordHorizontalToMap(vent) {

    const lowX = Math.min(vent[0][0], vent[1][0]);
    const highX = Math.max(vent[0][0], vent[1][0]);

    for (let i = lowX; i <= highX; i++) {
        let coordString = `${i},${vent[1][1]}`
        if (map.includes(coordString) && !overlaps.includes(coordString)) {
            overlaps.push(coordString);
        } else {
            map.push(coordString);
        }
    }
}

function recordDiagonalToMap(vent) {
    const lowY = Math.min(vent[0][1], vent[1][1]);
    const highY = Math.max(vent[0][1], vent[1][1]);
    const lowX = Math.min(vent[0][0], vent[1][0]);
    const highX = Math.max(vent[0][0], vent[1][0]);

    let yMod = 0;
    let y = 0;

    if (lowX === vent[0][0]) {
        if (lowY === vent[0][1]) {
            yMod = 1;
            y = lowY;
        } else {
            yMod = -1;
            y = highY;
        }
    } else {
        if (highY === vent[0][1]) {
            yMod = 1;
            y = lowY;
        } else {
            yMod = -1;
            y = highY;
        }
    }

    for (let x = lowX; x <= highX; x++) {
        let coordString = `${x},${y}`
        if (map.includes(coordString) && !overlaps.includes(coordString)) {
            overlaps.push(coordString);
        } else {
            map.push(coordString);
        }
        y += yMod;
    }
}

console.log(overlaps.length);

