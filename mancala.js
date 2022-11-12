let p1Row = Array.from(document.querySelectorAll('.p1'));
let p1RowRvs = Array.from(document.querySelectorAll('.p1'));
p1RowRvs = p1RowRvs.reverse();
p1Row.push(document.getElementById('p1'));

let p2Row = Array.from(document.querySelectorAll('.p2'));
let p2RowFwd = Array.from(document.querySelectorAll('.p2'));
p2Row = p2Row.reverse();
p2Row.push(document.getElementById('p2'));

let p1Score = document.getElementById('p1score');
let p2Score = document.getElementById('p2score');
let message = document.getElementById('message');
message.addEventListener('click', function start() {
    playGame();
})

// let p1name = prompt("Player 1 Name:");
// let p2name = prompt("Player 2 Name:");
let p1Pot = document.getElementById('p1');
let p2Pot = document.getElementById('p2');
let board = document.querySelector('.board');

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}

class Player1 extends Player {
    turn(space) {
        let player = p1Row;
        if (space > 5) {
            console.log("Invalid space!");
        } else {
            let moves = player[space].innerText;
            player[space].innerText = '';
            for (let i = moves.length; i > 0; i--) {
                space++;
                if (player === p2Row && space > 5) {
                    space -= 6;
                    player = p1Row;
                } 
                if (space > 6) {
                    space -= 7;
                    player = p2Row;
                } 
                player[space].innerText += 'o';
                if (i === 1 && space < 6 && player === p1Row && player[space].innerText === 'o' && p2RowFwd[space].innerText != '') {
                    let capture = player[space].innerText;
                    player[space].innerText = '';
                    capture += p2RowFwd[space].innerText;
                    p2RowFwd[space].innerText = '';
                    p1Row[6].innerText += capture;
                }
                let score = p1Pot.innerText;
                this.score = score.length;
                p1Score.innerText = `${p1.name} Score: ${p1.score}`;

            }
        }
    }
}

class Player2 extends Player {
    turn(space) {
        let player = p2Row;
        if (space > 5) {
            console.log("Invalid space!");
        } else {
            let moves = player[space].innerText;
            player[space].innerText = '';
            for (let i = moves.length; i > 0; i--) {
                space++;
                if (player === p1Row && space > 5) {
                    space -= 6;
                    player = p2Row;
                } 
                if (space > 6) {
                    space -= 7;
                    player = p1Row;
                } 
                player[space].innerText += 'o';
                if (i === 1 && space < 6 && player === p2Row && player[space].innerText === 'o' && p1RowRvs[space].innerText != '') {
                    let capture = player[space].innerText;
                    player[space].innerText = '';
                    capture += p1RowRvs[space].innerText;
                    p1RowRvs[space].innerText = '';
                    p2Row[6].innerText += capture;
                }
                let score = p2Pot.innerText;
                this.score = score.length;
                p2Score.innerText = `${p2.name} Score: ${p2.score}`;

            }
        }
    }
}

let p1 = new Player1('bebo');
let p2 = new Player2('alex');

function randomNum() {
    return Math.floor(Math.random() * 2);
}

let p1buttons = Array.from(document.querySelectorAll('.p1buttons'));
let p2buttons = Array.from(document.querySelectorAll('.p2buttons'));
p2buttons = p2buttons.reverse();

let played = false;
function move(player, buttons, row) {
    if (played) {
    if(player === p1) {
        for (let b = 0; b < buttons.length; b++) {
            let button = buttons[b];
            button.appendChild(row[b]);
            board.insertBefore(button, null);
        }} else {
            for (let b = buttons.length - 1; b > -1; b--) {
                let button = buttons[b];
                button.appendChild(row[b])
                board.insertBefore(button, p1Pot)
            }
        }
    }
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.addEventListener('click', function play() {
            player.turn(i);
            for (let j = 0; j < buttons.length; j++) {
                let button = buttons[j];
                button.parentNode.replaceChild(row[j], button);
                played = true;
            } 
        });
    }
}
// function move(player, row) {
//     for (let i = 0; i < row.length; i++) {
//         let button = row[i];
//         button.addEventListener('click', function play() {
//             player.turn(i);
//             for (let i = 0; i < row.length; i++) {
//                 button = row[i];
//                 button.removeEventListener('click', play);
//             }
//         });
//     }
// }

// let test = document.querySelector('.button');
// let t2 = document.getElementById('ten');
// test.addEventListener('click', function ply() {
//     p1.turn(3);
//     p1.turn(0);
//     test.parentNode.replaceChild(t2, test);
// })

function playGame() {
    p1Score.innerText = `${p1.name} Score: ${p1.score}`;
    p2Score.innerText = `${p2.name} Score: ${p2.score}`;
    if (randomNum() === 0) {
        message.innerText = `${p1.name} goes first! Choose your space. (Bottom row)`;
        move(p1, p1buttons, p1Row);
    } else {
        message.innerText = `${p2.name} goes first! Choose your space. (Top row)`;
        move(p2, p2buttons, p2Row);
    }     
}

// function move(player, space) {
//     if (space > 5) {
//         console.log("Invalid space!");
//     } else {
//     let moves = player[space].innerText;
//     player[space].innerText = '';
//     for (let i = moves.length; i > 0; i--) {
//         space++;
//         if (space > 6) {
//             space -= 7; 
//             player = p2Row;
//         }
//         player[space].innerText += 'o';
//         if (i === 1 && player[space].innerText === 'o' && space < 6) {
//             let capture = player[space].innerText;
//             player[space].innerText = '';
//             capture += p2RowFwd[space].innerText;
//             p2RowFwd[space].innerText = '';
//             p1Row[6].innerText += capture;
//         }
//     }    
// }
// }
