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
}, {once: true})

let p1name = prompt("Welcome to Mancala! Please enter your names. \n Player 1 Name:");
let p2name = prompt("Player 2 Name:");
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
                    let capture = p1Row[space].innerText;
                    p1Row[space].innerText = '';
                    capture += p2RowFwd[space].innerText;
                    p2RowFwd[space].innerText = '';
                    p1Row[6].innerText += capture;
                    message.innerText = `${this.name} captured ${capture.length - 1} piece(s)! ${p2.name}'s turn.`;
                    capture = '';
                    move(p2, p2buttons, p2Row);
                } else if (i === 1 && space === 6 && player === p1Row) {
                    message.innerText = `${this.name} ended in their pot! Take another turn. Click here to confirm.`;
                    message.addEventListener('click', function goAgain() {
                        move(p1, p1buttons, p1Row);
                    }, {once: true})
                } else if (i === 1) {
                    move(p2, p2buttons, p2Row);
                    message.innerText = `${p2.name}'s turn.`;
                }
                let score = p1Pot.innerText;
                this.score = score.length;
                p1Score.innerText = `${p1.name} Score: ${p1.score}`;
                if (emptySpaces(p1Row) === 6 || emptySpaces(p2Row) === 6) {
                    endGame()
                }
            }
        }
    }

class Player2 extends Player {
    turn(space) {
        let player = p2Row;
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
                    let capture = p2Row[space].innerText;
                    p2Row[space].innerText = '';
                    capture += p1RowRvs[space].innerText;
                    p1RowRvs[space].innerText = '';
                    p2Row[6].innerText += capture;
                    message.innerText = `${this.name} captured ${capture.length - 1} piece(s)! ${p1.name}'s turn.`;
                    capture = '';
                    move(p1, p1buttons, p1Row);
                } else if (i === 1 && space === 6 && player === p2Row) {
                    message.innerText = `${this.name} ended in their pot! Take another turn. Click here to confirm.`;
                    message.addEventListener('click', function goAgain() {
                        move(p2, p2buttons, p2Row);
                    }, {once: true})
                } else if (i === 1) {
                    move(p1, p1buttons, p1Row);
                    message.innerText = `${p1.name}'s turn.`;
                }
                let score = p2Pot.innerText;
                this.score = score.length;
                p2Score.innerText = `${p2.name} Score: ${p2.score}`;
                if (emptySpaces(p1Row) === 6 || emptySpaces(p2Row) === 6) {
                    endGame()
                }
            }
        }
    }

let p1 = new Player1(p1name);
let p2 = new Player2(p2name);

function randomNum() {
    return Math.floor(Math.random() * 2);
}

let p1buttons = Array.from(document.querySelectorAll('.p1buttons'));
let p2buttons = Array.from(document.querySelectorAll('.p2buttons'));
p2buttons = p2buttons.reverse();

let played = false;

function emptySpaces(row) {
    let spaces = 0;
    for (let i = 0; i < 6; i++) {
        if (row[i].innerText === '') {
            spaces++;
        }
    }
    return spaces;
}

function endGame() {
    for (let i = 0; i < p1Row.length - 1; i++) {
        let collect = '';
        if (p1Row[i].innerText != '') {
            collect += p1Row[i].innerText;
            p1Row[i].innerText = '';
        }
        p1Pot.innerText += collect;
        let score = p1Pot.innerText;
        p1.score = score.length;
        p1Score.innerText = `${p1.name} Score: ${p1.score}`;
    }
    for (let j = 0; j < p2Row.length - 1; j++) {
        let collect = '';
        if (p2Row[j].innerText != '') {
            collect += p2Row[j].innerText;
            p2Row[j].innerText = '';
        }
        p2Pot.innerText += collect;
        let score = p2Pot.innerText;
        p2.score = score.length;
        p2Score.innerText = `${p2.name} Score: ${p2.score}`;

    }
    if (p1.score > p2.score) {
        message.innerText = `Game Over! ${p1.name} has won with ${p1.score} pieces.`;
    } else {
        message.innerText = `Game Over! ${p2.name} has won with ${p2.score} pieces.`;
    }
}

function move(player, buttons, row) {
    if (played) {
        if(player === p1) {
            for (let b = 0; b < buttons.length; b++) {
                let button = buttons[b];
                button.appendChild(row[b]);
                board.insertBefore(button, null);
            }
        } else {
            for (let b = buttons.length - 1; b > -1; b--) {
                let button = buttons[b];
                button.appendChild(row[b]);
                board.insertBefore(button, p1Pot);
            }
        }
    }
    for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            button.addEventListener('click', function play() {
                if (row[i].innerText === '') {
                    return null;
                } else {
                    player.turn(i);
                    for (let j = 0; j < buttons.length; j++) {
                        let button = buttons[j];
                        button.parentNode.replaceChild(row[j], button);
                        played = true;
                    }
                }    
            });
    }
}

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