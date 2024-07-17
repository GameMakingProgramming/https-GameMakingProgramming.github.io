let blocks;
let blocksCount = 0;

const blockDictionary = {

    'normal': {
        borderColor: 'midnightblue',
        fillColor: 'deepskyblue',
        hitPoints: 1,
    },

    'hard': {
        borderColor: 'black',
        fillColor: 'blue',
        hitPoints: 2,
        effect () {
            this.borderColor = 'midnightblue';
            this.fillColor = 'deepskyblue';
            drawBlock(this);
        }
    },

    'double': {
        borderColor: 'chocolate',
        fillColor: 'orange',
        hitPoints: 1,
        effect (ball) {
            const degree = Math.random() * 100 + 220;
            createBall(ball.x, ball.y, degree);
        },
    },

    'wall': {
        borderColor: 'lightgray',
        fillColor: 'whitesmoke',
        isUnbreakable: true,
    },
};

const createBlock = (blockName, rowIndex, columnIndex) => {

    const block = {
        ...blockDictionary[blockName],
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        x: columnIndex * blockWidth,
        y: rowIndex * blockHeight
    };

    blocks[rowIndex][columnIndex] = block;

    if (!block.isUnbreakable) {
        blocksCount++;
    }

    drawBlock(block);
};

const drawBlock = (block) => {

    blocksCtx.fillStyle = block.borderColor;
    blocksCtx.fillRect(block.x, block.y, blockWidth, blockHeight);

    blocksCtx.fillStyle = block.fillColor;
    blocksCtx.fillRect(block.x + 1, block.y + 1, blockWidth - 2, blockHeight - 2);
};

const eraseBlock = (block) => {

    blocksCtx.fillStyle = backgroundColor;
    blocksCtx.fillRect(block.x, block.y, blockWidth, blockHeight);
};

const removeBlock = (block) => {

    blocks[block.rowIndex][block.columnIndex] = null;

    eraseBlock(block);

    blocksCount--;

    updateBlocksCountLabel();

    if (blocksCount === 0) {
        changeGameState('gameClear');
    }
};

const clideBlock = (ball, block) => {

    if (block.isUnbreakable) {
        return;
    }

    block.hitPoints--;

    if (block.effect) {
        block.effect(ball);
    }

    if (block.hitPoints === 0) {
        removeBlock(block);
    }
};

const initBlocks = () => {

    blocks = [];
    blocksCount = 0;

    blocksCtx.fillStyle = backgroundColor;
    blocksCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    for (let rowIndex = 0; rowIndex < blocksRowLength; rowIndex++) {
        blocks.push([]);

        for (let columnIndex = 0; columnIndex < blocksColumnLength; columnIndex++) {

            if (
                rowIndex >= 1 && rowIndex <= 6 && columnIndex >= 18 && columnIndex <= 48
                || rowIndex >= 6 && rowIndex <= 13 && columnIndex >= 18 && columnIndex <= 24
                || rowIndex > 1 && columnIndex >= 43 && columnIndex < 49
            ) {

                blocks[rowIndex][columnIndex] = null;

            } else if (
                rowIndex >= 0 && rowIndex <= 9 && columnIndex === 17
                || rowIndex >= 7 && rowIndex <= 9 && columnIndex === 25
                || rowIndex === 0 && columnIndex >= 18
                || rowIndex === 7 && columnIndex >= 25
                || rowIndex >= 1 && (columnIndex === 42 || columnIndex === 49)
            ) {
                createBlock('wall', rowIndex, columnIndex);

            } else if (
                rowIndex >= 10 && rowIndex <= 14 && (columnIndex === 17 || columnIndex === 25)
                || rowIndex === 14 && columnIndex >= 17 && columnIndex <= 25
            ) {
                createBlock('normal', rowIndex, columnIndex);

            } else if (rowIndex >= 10 && rowIndex <= 36 && columnIndex >= 4 && columnIndex <= 37) {
                createBlock('double', rowIndex, columnIndex);

            } else {
                createBlock('hard', rowIndex, columnIndex);
            }
        }
    }

    updateBlocksCountLabel();
};

const updateBlocksCountLabel = () => {
    blocksCountLabel.textContent = blocksCount;
};