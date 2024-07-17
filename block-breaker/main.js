// メッセージの表示を更新する関数
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

// ゲームの状態を変更する関数
const changeGameState = (newGameState) => {
    gameState = newGameState;
    updateMessage();
};

// アニメーションを実行する関数
const run = () => {

    // ゲームクリアしている状態ならアニメーションを止める
    if (gameState === 'gameClear') {
        return;
    }

    // canvasをまっさらな状態にする
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

// ゲーム画面をクリックしたときの関数
const click = () => {

    if (gameState === 'initial' || gameState === 'waiting') {
        changeGameState('running');

    } else if (gameState === 'gameClear') {
        changeGameState('waiting');

        // ゲームを初期状態にする
        initGame();
    };
};

// ゲームを初期状態にする関数
const initGame = () => {

    changeGameState('initial');

    initBar();

    initBlocks();

    initBall();

    run();

};

// イベントリスナーの設定
barBallsCanvas.addEventListener('mousemove', setBarX);
barBallsCanvas.addEventListener('touchmove', setBarX, { passive: true });
barBallsCanvas.addEventListener('click', click);

// ゲームの開始
initGame();