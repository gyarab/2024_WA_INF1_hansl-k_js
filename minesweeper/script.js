import { createGrid, createDiffButtons } from '../lib/lib.js';

const cellSize = 30
const cellGap = 3

const [easyButton, mediumButton, hardButton] = createDiffButtons();

easyButton.addEventListener('click', () => {
    let grid = createGrid(15, 15, cellSize, cellGap);
});
mediumButton.addEventListener('click', () => {
    let grid = createGrid(23, 23, cellSize, cellGap);
});
hardButton.addEventListener('click', () => {
    let grid = createGrid(23, 33, cellSize, cellGap);
});