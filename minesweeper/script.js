import { createGrid, createDiffButtons } from '../lib/lib.js';

const cellSize = 30
const cellGap = 3

const [easyButton, mediumButton, hardButton] = createDiffButtons();

easyButton.addEventListener('click', () => {
    createGrid(15, 15, cellSize, cellGap);
});
mediumButton.addEventListener('click', () => {
    createGrid(23, 23, cellSize, cellGap);
});
hardButton.addEventListener('click', () => {
    createGrid(23, 33, cellSize, cellGap);
});