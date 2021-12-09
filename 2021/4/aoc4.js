import * as fs from "fs";

var text = fs.readFileSync("./4.txt").toString('utf-8').replace(/  +/g, ' ');
var data = text.split(/\r?\n/);
const boardSize = 5;

const draw = data[0].split(',');

let rows = [];
data.forEach(row => {
    if (row !== '' && !row.includes(',')) {
        rows.push(row.trimStart());
    }
});

let boards = [];
let wins = [];

for (let i = 0; i < rows.length; i+=boardSize) {
    let board = [];
    let win = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];
    for (let j = 0; j < boardSize; j++) {
        board.push(rows[i + j].split(' '));
    }
    boards.push(board);
    wins.push(win);
}

let winScore = 0;
let isWon = false;
let winningBoards = [];

draw.forEach(value => {
    checkBoards(value);
});

function checkBoards(value) {
    
    for (let i = 0; i < boards.length; i++) {
        if (!winningBoards.includes(i)) {
            for (let j = 0; j < boardSize; j++) {
                for (let k = 0; k < boardSize; k++) {
                    if (boards[i][j][k] === value) {
                        wins[i][j][k] = 1;
                        
                        if (checkWin(wins[i])) {
                            winScore = sumUnmarked(wins[i], boards[i]) * value;
                            console.log(winScore);
                            console.log(`board ${i} won`);
                            winningBoards.push(i);
                            break;
                        }
                    }
                }
            }
        }
    }
}

function checkWin(win) {
    for (let i = 0; i < boardSize; i++) {

        if (sumArray(win[i]) === boardSize) {
            return true;
        }

        let sum = 0;
        for (let j = 0; j < boardSize; j++) {
            sum += win[j][i]
        }

        if (sum === boardSize) return true;
    }
}


function sumArray(arr) {
    let sum = 0;
    arr.forEach(v => {
        sum += v;
    });
    return sum;
}

function sumUnmarked(win, board) {
    let sum = 0;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (win[i][j] === 0) {
                sum += +board[i][j];
            }
        }
    }
    return sum;
}