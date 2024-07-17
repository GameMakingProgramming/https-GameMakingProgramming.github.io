// ボールを生成する関数
let balls = [];

const createBall = (x, y, degree) => {

    const { dx, dy } = calcDeltaXY(degree); 

    balls.push({ x, y, dx, dy, __proto__: ballProto});
};

const ballProto = {
    get topY () { return this.y - ballRadius; },
    get bottomY () { return this.y + ballRadius; },
    get leftX () { return this.x - ballRadius; },
    get rightX () { return this.x + ballRadius; },
};

// ボールを初期配置する関数
const initBall = () => {

    balls = [];
    createBall(bar.x, bar.y - ballRadius, 80);
};

// ボールをcanvasに描く関数
const drawBall = (ball) => {

    barBallsCtx.fillStyle = ballColor;
    barBallsCtx.beginPath();
    barBallsCtx.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI);
    barBallsCtx.fill();
};

// ボールを操作バーの上に移動させる関数
const moveBallOnBar = () => {

    balls[0].x = bar.x;
    drawBall(balls[0]);
};

// ボールを動かす関数
const moveBalls = () => {

    for (let i = balls.length - 1; i >= 0; i--) {

        const ball = balls[i];

        // ボールの座標を移動させる
        ball.x += ball.dx;
        ball.y += ball.dy;

        // 画面端と衝突しているかの検証
        checkEdgeCollision(ball);

        // 操作バーと衝突しているかの検証
        checkBarCollision(ball);

        // ブロックと衝突しているかの検証
        checkBlockCollision(ball);

        // 画面下に落ちているかの検証
        checkDropped(ball,i);

        // ボールを描く
        drawBall(ball);
    }
};

// 画面端と衝突しているか検証する関数
const checkEdgeCollision = (ball) => {

    // canvasの上橋からはみ出している場合
    if (ball.topY < 0) {
        ball.y = ballRadius;
        ball.dy = -ball.dy;

    // canvasの左端からはみ出している場合
    } else if (ball.leftX < 0) {
        ball.x = ballRadius;
        ball.dx = -ball.dx;

    // canvasの右端からはみ出している場合
    } else if (ball.rightX > canvasWidth) {
        ball.x = canvasWidth - ballRadius;
        ball.dx = -ball.dx;
    }
};

// 操作バーと衝突しているか検証する関数
const checkBarCollision = (ball) => {

    if (
        ball.rightX > bar.leftX
        && ball.leftX < bar.rightX
        && ball.bottomY > bar.y
        && ball.topY < bar.bottomY
    ) {

        clideBar(ball);
    }
};

// ブロックと衝突しているか検証する関数
const checkBlockCollision = (ball) => {

    // 座標から行番号や列番号を計算する
    const topRowIndex = Math.floor(ball.topY / blockHeight);
    const centerRowIndex = Math.floor(ball.y / blockHeight);
    const bottomRowIndex = Math.floor(ball.bottomY / blockHeight);
    const leftColumnIndex = Math.floor(ball.leftX / blockWidth);
    const centerColumnIndex = Math.floor(ball.x / blockWidth);
    const rightColumnIndex = Math.floor(ball.rightX / blockWidth);


    // ボールの上端がブロックと衝突した場合
    if (blocks[topRowIndex] && blocks[topRowIndex][centerColumnIndex]) {
        clideBlock(ball, blocks[topRowIndex][centerColumnIndex]);
        
        if (ball.dy < 0) {
            ball.dy = -ball.dy;

        } else {
            ball.dx = -ball.dx;
        }

    // ボールの下端がブロックと衝突した場合
    } else if (blocks[bottomRowIndex] && blocks[bottomRowIndex][centerColumnIndex]) {

        clideBlock(ball, blocks[bottomRowIndex][centerColumnIndex]);
        
        if (ball.dy > 0) {
            ball.dy = -ball.dy;

        } else {
            ball.dx = -ball.dx;
        }

    // ボールの左端がブロックと衝突した場合
    } else if (blocks[centerRowIndex] && blocks[centerRowIndex][leftColumnIndex]) {

        clideBlock(ball, blocks[centerRowIndex][leftColumnIndex]);
        
        if (ball.dx < 0) {
            ball.dx = -ball.dx;

        } else {
            ball.dy = -ball.dy;
        }

    // ボールの右端がブロックと衝突した場合
    } else if (blocks[centerRowIndex] && blocks[centerRowIndex][rightColumnIndex]) {

        clideBlock(ball, blocks[centerRowIndex][rightColumnIndex]);
        
        if (ball.dx > 0) {
            ball.dx = -ball.dx;

        } else {
            ball.dy = -ball.dy;
        }
    }
};

// 画面下に落ちているか検証する関数
const checkDropped = (ball, index) => {

    if (ball.topY > canvasHeight) {
        balls.splice(index, 1);

        if (balls.length === 0) {
            changeGameState('waiting');
            initBall();
        }
    }
};