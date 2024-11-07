import { createGrid, createDiffButtons } from '../lib/lib.js';

const cellSize = 90
const cellGap = 5

let players = [{
    name: 'Player 1',
    score: 0
},{
    name: 'Player 2',
    score: 0
}]
let currentPlayer = 0;
let moves = 0;
let clickedTiles = [];
let completeTiles = [];
let gridSize = 0;

const [easyButton, mediumButton, hardButton] = createDiffButtons();

easyButton.addEventListener('click', async () => {
    let grid = createGrid(2, 4, cellSize, cellGap, tileClick);
    await init(grid);
});
mediumButton.addEventListener('click', async () => {
    let grid = createGrid(4, 4, cellSize, cellGap, tileClick);
    await init(grid);
});
hardButton.addEventListener('click', async () => {
    let grid = createGrid(6, 6, cellSize, cellGap, tileClick);
    await init(grid);
});

createPlayerScores();
createMoveCounter();

function tileClick(event) {
    if (clickedTiles.includes(event.target) || completeTiles.includes(event.target)) {
        return;
    }

    clickedTiles.push(event.target)
    event.target.style.backgroundImage = event.target.dataset.image;

    if (clickedTiles.length === 2) {
        moves++;
        document.getElementById('move-counter').innerText = `Moves: ${moves}`;
        if (clickedTiles[0].dataset.image === clickedTiles[1].dataset.image) {
            players[currentPlayer].score++;
            document.getElementById(`player-${currentPlayer}`).innerText = `${players[currentPlayer].name}: ${players[currentPlayer].score}`;
            completeTiles.push(clickedTiles[0], clickedTiles[1]);
            clickedTiles = [];
            if (players[0].score + players[1].score === gridSize / 2) {
                winnerWinnerChickenDinner();
            }
        } else {
            setTimeout(() => {
                clickedTiles[0].style.backgroundImage = '';
                clickedTiles[1].style.backgroundImage = '';
                clickedTiles = [];
                currentPlayer = currentPlayer === 0 ? 1 : 0;
            }, 1000);
        }
    }
}

function winnerWinnerChickenDinner() {
    let winner = players[0].score > players[1].score ? players[0] : players[1];

    let winnerHeader = document.createElement('h1');
    winnerHeader.innerText = `${winner.name} wins!`;
    winnerHeader.id = 'winner-header';

    document.getElementById('app').appendChild(winnerHeader);
}

function createMoveCounter() {
    const existingCounter = document.getElementById('move-counter');
    if (existingCounter) {
        existingCounter.remove();
    }

    const moveCounter = document.createElement('div');
    moveCounter.id = 'move-counter';
    moveCounter.innerText = `Moves: ${moves}`;

    document.getElementById('app').appendChild(moveCounter);
}

function createPlayerScores() {
    const existingPlayers = document.getElementById('player-container');
    if (existingPlayers) {
        existingPlayers.remove();
    }

    const container = document.createElement('div');
    container.id = 'player-container';

    for (let i = 0; i < players.length; i++) {
        const player = document.createElement('div');
        player.innerText = `${players[i].name}: ${players[i].score}`;
        player.id = `player-${i}`;
        player.classList.add('player-score');
        container.appendChild(player);
    }
    document.getElementById('app').appendChild(container);
}

async function init(grid) {
    players = [{
        name: 'Player 1',
        score: 0
    },{
        name: 'Player 2',
        score: 0
    }]
    currentPlayer = 0;
    moves = 0;
    clickedTiles = [];
    completeTiles = [];
    gridSize = grid.length * grid[0].length;

    let winnerHeader = document.getElementById('winner-header');
    let playerScores = document.getElementsByClassName('player-score');
    let moveCounter = document.getElementById('move-counter');
    moveCounter.innerText = `Moves: ${moves}`;
    if (winnerHeader) {
        winnerHeader.remove();
    }
    for (let i = 0; i < playerScores.length; i++) {
        playerScores[i].innerText = `${players[i].name}: ${players[i].score}`;
    }

    const images = []
    for (let i = 0; i < gridSize / 2; i++) {
        let response = await fetch(`https://picsum.photos/${cellSize}`);
        images.push(response.url);
        images.push(response.url);
    }

    for (let i = images.length - 1; i > 0; i--) {
        
        const j = Math.floor(Math.random() * (i + 1));
        
        [images[i], images[j]] = [images[j], images[i]];
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j].dataset.image = `url(${images[i * grid[i].length + j]})`;
            grid[i][j].dataset.pos = [i, j];
        }
    }
}