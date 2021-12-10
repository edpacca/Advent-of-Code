import * as fs from "fs";
import { get } from "http";

var text = fs.readFileSync("./10.txt").toString('utf-8');
var data = text.split(/\r?\n/);

const chunk0 = [`(`, `)`];
const chunk1 = [`[`, `]`];
const chunk2 = [`{`, `}`];
const chunk3 = [`<`, `>`];
const chunks = [chunk0, chunk1, chunk2, chunk3]
const openers = [chunk0[0], chunk1[0], chunk2[0], chunk3[0]];
const closers = [chunk0[1], chunk1[1], chunk2[1], chunk3[1]];


function searchIllegalChars(line) {

    let openChunks = [];

    for (let i = 0; i < line.length; i++) {

        let char = line[i];

        if (openers.includes(char)) {
            openChunks.push(char);
            continue;
        }

        if (closers.includes(char)) {
            let index = closers.indexOf(char)

            if (openChunks[openChunks.length - 1] !== openers[index]) {
                return char;
            } else {
                let open = openChunks.pop();
                // console.log(`removed ${open}${char}`);
            }
        }
    }

    return null;
}

function getScore(line) {
    let result = searchIllegalChars(line);
    if (result === ')') return 3;
    if (result === ']') return 57;
    if (result === '}') return 1197;
    if (result === '>') return 25137;
    return 0;
}

let score = 0;

data.forEach(line => {
    score += getScore(line);
})

console.log(`total score ${score}`);