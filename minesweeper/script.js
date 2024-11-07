import { createGrid, createDiffButtons } from '../lib/lib.js';

const cellSize = 30
const cellGap = 3

const [easyButton, mediumButton, hardButton] = createDiffButtons();

easyButton.addEventListener('click', () => {
    let grid = createGrid(15, 15, cellSize, cellGap, tileClick);
});
mediumButton.addEventListener('click', () => {
    let grid = createGrid(23, 23, cellSize, cellGap, tileClick);
});
hardButton.addEventListener('click', () => {
    let grid = createGrid(23, 33, cellSize, cellGap, tileClick);
});

function tileClick(event) {
    
}

function init(grid) {
    
}