let balls = [];

const createBall = (x, y) => {

    const ball = {
        x: x,
        y: y,
        dx: 3,
        dy: -3,
        __proto__: ballProto
    };

    balls.push(ball);
};

const ballProto = {
    get topY () { return this.y - ballRadius; },
    get bottomY () { return this.y + ballRadius; },
    get leftX () { return this.x - ballRadius; },
    get rightX () { return this.x + ballRadius; },
};

const initBall = () => {

    balls = [];
    createBall(bar.x, bar.y - ballRadius);
};

const drawBall = (ball) => {

    barBallsCtx.fillStyle = ballColor;
    barBallsCtx.beginPath();
    barBallsCtx.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI);
    barBallsCtx.fill();
};

const moveBallOnBar = () => {

    balls[0].x = bar.x;
    drawBall(balls[0]);
};

const moveBalls = () => {

    for (let i = balls.length - 1; i >= 0; i--) {

        const ball = balls[i];

        ball.x += ball.dx;
        ball.y += ball.dy;

        checkEdgeCollision(ball);

        checkBarCollision(ball);

        checkBlockCollision(ball);

        checkDropped(ball, i);

        drawBall(ball);
    }
};

const checkEdgeCollision = (ball) => {

    if (ball.topY < 0) {
        ball.y = ballRadius;
        ball.dy = -ball.dy;

    } else if (ball.leftX < 0) {
        ball.x = ballRadius;
        ball.dx = -ball.dx;

    } else if (ball.rightX > canvasWidth) {
        ball.x = canvasWidth - ballRadius;
        ball.dx = -ball.dx;
    }
};

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

const checkBlockCollision = (ball) => {

    const topRowIndex = Math.floor(ball.topY / blockHeight);
    const centerRowIndex = Math.floor(ball.y / blockHeight);
    const bottomRowIndex = Math.floor(ball.bottomY / blockHeight);
    const leftColumnIndex = Math.floor(ball.leftX / blockWidth);
    const centerColumnIndex = Math.floor(ball.x / blockWidth);
    const rightColumnIndex = Math.floor(ball.rightX / blockWidth);

    if (blocks[topRowIndex] && blocks[topRowIndex][centerColumnIndex]) {

        clideBlock(ball, blocks[topRowIndex][centerColumnIndex]);
        ball.dy = -ball.dy;

    } else if (blocks[bottomRowIndex] && blocks[bottomRowIndex][centerColumnIndex]) {

        clideBlock(ball, blocks[bottomRowIndex][centerColumnIndex]);
        ball.dy = -ball.dy;

    } else if (blocks[centerRowIndex] && blocks[centerRowIndex][leftColumnIndex]) {

        clideBlock(ball, blocks[centerRowIndex][leftColumnIndex]);
        ball.dx = -ball.dx;

    } else if (blocks[centerRowIndex] && blocks[centerRowIndex][rightColumnIndex]) {

        clideBlock(ball, blocks[centerRowIndex][rightColumnIndex]);
        ball.dx = -ball.dx;
    }
};

const checkDropped = (ball, index) => {

    if (ball.topY > canvasHeight) {

        balls.splice(index, 1);

        if (balls.length === 0) {
            changeGameState('waiting');
            initBall();
        }
    }
};