let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = "#2d414b"; // just store the color

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = O_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        let winning_blocks = playerHasWon();
        if (winning_blocks) {
            playerText.innerText = `${currentPlayer} has Won!`;
           
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            return;
        }

        currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
    }
}

const winningComs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon() {
    for (const condition of winningComs) {
        let [a, b, c] = condition;

        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return [a, b, c];
        }
    }
    return null;
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = ''; // reset background
    });
    playerText.innerText = 'Tic Tac Toe';
    currentPlayer = O_TEXT;
}

startGame();
