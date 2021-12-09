import * as fs from "fs";

var text = fs.readFileSync("./6.txt").toString('utf-8');
var fishes = text.split(',');

// var startFishes = [];
// textData.forEach(value => {
//     startFishes.push((value));
// })

// let allFishes = [];
// allFishes.push(startFishes);

const maxDay = 141;
let day = 0;
let extraFishes = [];

fs.appendFile('./lanterns.txt', data, (err) => {
      
    if (err) throw err;
})

while (day < maxDay) {
    day++;
    console.log(`day ${day}`)
    let newFishes = 0;

    for (let i = 0; i < fishes.length; i++) {
        fishes[i]--;
        if (fishes[i] < 0) {
            fishes[i] = 6;
            newFishes++;
        }
    }

        for (let i = 0; i < newFishes; i++) {
            fishes.push(8);
        }

    console.log(fishes.length + " fishes");
}



// while (day < maxDay) {
//     day++;
//     console.log(`day ${day}`)
//     let fishBuffer = [];
//     for (let i = 0; i < allFishes.length; i++) {
//         let newFishes = doFishes(allFishes[i]);
//         fishBuffer.push(newFishes);
//     }
//     allFishes = allFishes.concat(fishBuffer);
//     console.log(sumFishes(allFishes) + " fishes");
// }

function doFishes(fishes) {

    let newFishes = [];

    for (let i = 0; i < fishes.length; i++) {
        fishes[i]--;
        if (fishes[i] < 0) {
            fishes[i] = 6;
            newFishes.push(8);
        }
    }

    return newFishes;
}

function sumFishes(arrays) {
    let total = 0;
    arrays.forEach(array => {
        total += array.length;
    })
    return total;
}

function oneFish(start, maxDays) {
    let total = 0;
    let day = 0;
    let fish = start;
    while(day < maxDays) {
        day++;
        fish--
        if(fish < 0) {
            fish = 6;
            total++;
        }
    }
    return total;
}




