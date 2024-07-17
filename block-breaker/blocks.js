let blocks = [];
let blocksCount = 0;

// ブロックの種類を作成
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
            // 色を変更したあとcanvasに描く
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
            // 新しく生成するボールの進行角度
            const degree=Math.random() * 100 + 200
            createBall(ball.x, ball.y, degree);
        },
    },

    'wall': {
        borderColor: 'lightgray',
        fillColor: 'whitesmoke',
        // 壊れないブロック
        isUnbreakable: true,
    },
};

// ブロックを作成する関数
const createBlock = (blockName, rowIndex, columnIndex) => {

    const block = {
        ...blockDictionary[blockName],
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        x: columnIndex * blockWidth,
        y: rowIndex * blockHeight
    };

    blocks[rowIndex][columnIndex] = block;
    // 壊れるブロックなら個数を1個増やす
    if(!block.isUnbreakable){
        blocksCount++;
    }

    // ブロックを描く関数
    drawBlock(block);
};

// ブロックをcanvasに描く関数
const drawBlock = (block) => {
    // 縁を描く
    blocksCtx.fillStyle = block.borderColor;
    blocksCtx.fillRect(block.x, block.y, blockWidth, blockHeight);
    
    // 中身を描く
    blocksCtx.fillStyle = block.fillColor;
    blocksCtx.fillRect(block.x + 1, block.y + 1, blockWidth - 2, blockHeight -2);
};

// ブロックをcanvasから消す関数
const eraseBlock = (block) => {
    blocksCtx.fillStyle = backgroundColor;
    blocksCtx.fillRect(block.x, block.y, blockWidth, blockHeight);
};

// ブロックを削除する関数
const removeBlock = (block) => {
    blocks[block.rowIndex][block.columnIndex] = null;
    
    // ブロックをcanvasから消す
    eraseBlock(block);

    // ブロックの個数を1つ減らす
    blocksCount--;

    // ブロックの個数の表示を更新する
    updateBlocksCountLabel();

    if (blocksCount === 0) {
        // ゲームの状態を変える
        changeGameState('gameClear');
    }
};

// ボールが当たったときの関数
const clideBlock = (ball, block) => {

    // 当たったブロックが壊れないブロックだったら何もしない
    if (block.isUnbreakable) {
        return;
    }

    // hitPointを1つ減らす
    block.hitPoints--;

    // 特殊効果があれば実行する
    if (block.effect) {
        block.effect(ball);
    }

    // hitPointが0になったらこのブロックを削除する
    if (block.hitPoints === 0) {
        removeBlock(block);
    }
};

// ブロックを初期配置する関数
const initBlocks = () => {

    blocks = [];
    blocksCount = 0;

   // canvas全体の背景色を塗る
   blocksCtx.fillStyle = backgroundColor;
   blocksCtx.fillRect(0, 0, canvasWidth, canvasHeight);

   for (let rowIndex = 0; rowIndex < blocksRowLength; rowIndex++) {
       blocks.push([]);

       for (let columnIndex = 0; columnIndex < blocksColumnLength; columnIndex++) {
        
        // ブロックを置かないで通路を作る
        if (
            rowIndex >= 1 && rowIndex <= 6 && columnIndex >= 18 && columnIndex <= 48
            || rowIndex >= 6 && rowIndex <= 13 && columnIndex >= 18 && columnIndex <= 24
            || rowIndex > 1 && columnIndex >= 43 && columnIndex < 49
        ) {
            blocks[rowIndex][columnIndex] = null;

        // 通路の両脇にある壁ブロック
        } else if (
            rowIndex >= 0 && rowIndex <= 9 && columnIndex ===17
            || rowIndex >= 7 && rowIndex <= 9 && columnIndex === 35
            || rowIndex === 0 && columnIndex >= 18
            || rowIndex === 7 && columnIndex >= 25
            || rowIndex >= 1 && (columnIndex === 42 || columnIndex === 49)
        ) {
            createBlock('wall', rowIndex, columnIndex);

        // 通路の出口にあるノーマルブロック
        } else if (
            rowIndex >= 10 && rowIndex <= 14 && (columnIndex === 17 || columnIndex === 25)
            || rowIndex === 14 && columnIndex >= 17 && columnIndex <= 25
        ) {
            createBlock('normal', rowIndex, columnIndex);

        // 中央付近にあるダブルブロックの塊
        } else if (rowIndex >= 10 && rowIndex <= 36 && columnIndex >= 4 && columnIndex <= 37) {
            createBlock('double', rowIndex, columnIndex);

        // それ以外はハードブロック
        } else {
            createBlock('hard', rowIndex, columnIndex);
        }
        }
    }
       // ブロックの個数の表示を更新させる
       updateBlocksCountLabel();
};

// ブロックの工数を表示させる関数
const updateBlocksCountLabel = () => {
    blocksCountLabel.textContent = blocksCount;
};