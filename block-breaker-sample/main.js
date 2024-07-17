const updateMessage = () => {

    if (gameState === 'initial') {
        messageLabel.style.display = 'block';
        messageLabel.textContent = 'クリックしてスタート！';

    } else if (gameState === 'gameClear') {
        messageLabel.style.display = 'block';
        messageLabel.innerHTML = 'ゲームクリア！<br>クリックしてリセット';

    } else {
        // メッセージを非表示にさせる
        messageLabel.style.display = 'none';
    }
};

const changeGameState = (newGameState) => {
    gameState = newGameState;
    updateMessage();
};

const run = () => {

    // ゲームクリアしている状態ならアニメーションを止める
    if (gameState === 'gameClear') {
        return;
    }

    // canvasをまっさらの状態にする
    barBallsCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 操作バーを描く
    drawBar();

    if (gameState === 'running') {
        // ボールを動かす
        moveBalls();

    } else {
        // ボールを操作バーの上に動かす
        moveBallOnBar();
    }

    // 繰り返しrunを実行させる
    window.requestAnimationFrame(run);
};

const click = () => {

    if (gameState === 'initial' || gameState === 'waiting') {
        changeGameState('running');

    } else if (gameState === 'gameClear') {
        changeGameState('waiting');

        // ゲームを初期状態にする
        initGame();
    };
};

const initGame = () => {

    changeGameState('initial');

    initBar();

    initBlocks();

    initBall();

    run();
};

barBallsCanvas.addEventListener("mousemove", setBarX);
barBallsCanvas.addEventListener("touchmove", setBarX, { passive: true });
barBallsCanvas.addEventListener("click", click);

initGame();