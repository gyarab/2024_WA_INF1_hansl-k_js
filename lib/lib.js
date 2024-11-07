export function createGrid(rows, cols, cellSize, gap, clickCallback) {    
    const existingGrid = document.getElementById('grid-container');
    if (existingGrid) {
        existingGrid.remove();
    }

    const gridContainer = document.createElement('div');
    gridContainer.id = 'grid-container';
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    const containerWidth = cols * cellSize + (cols - 1) * gap;
    const containerHeight = rows * cellSize + (rows - 1) * gap;

    gridContainer.style.width = `${containerWidth}px`;
    gridContainer.style.height = `${containerHeight}px`;

    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const button = document.createElement('button');
            button.classList.add('grid-button');
            button.style.width = `${cellSize}px`;
            button.style.height = `${cellSize}px`;
            button.addEventListener('click', clickCallback);
            gridContainer.appendChild(button);
            row.push(button);
        }
        grid.push(row);
    }

    document.getElementById('app').appendChild(gridContainer);

    return grid;
}

export function createDiffButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'button-container';

    const easyButton = document.createElement('button');
    easyButton.innerText = 'Easy';
    easyButton.classList.add('difficulty-button');
    buttonContainer.appendChild(easyButton);

    const mediumButton = document.createElement('button');
    mediumButton.innerText = 'Medium';
    mediumButton.classList.add('difficulty-button');
    buttonContainer.appendChild(mediumButton);

    const hardButton = document.createElement('button');
    hardButton.innerText = 'Hard';
    hardButton.classList.add('difficulty-button');
    buttonContainer.appendChild(hardButton);

    document.getElementById('app').appendChild(buttonContainer);

    return [easyButton, mediumButton, hardButton];
}