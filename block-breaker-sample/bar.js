let bar;

const initBar = () => {

    bar = {
        x: canvasWidth / 2,
        y: barPosition,
        bottomY: barPosition + barHeight,
        get leftX () { return this.x - barHalfWidth; },
        get rightX () { return this.x + barHalfWidth; }
    };
};

const setBarX = (event) => {

    if (event.offsetX) {
        bar.x = event.offsetX;

    } else {
        const touchEvent = event.changedTouches[0];
        bar.x = touchEvent.clientX - touchEvent.target.getBoundingClientRect().left;
    }

    if (bar.leftX < 0) {
        bar.x = barHalfWidth;

    } else if (bar.rightX > canvasWidth) {
        bar.x = canvasWidth - barHalfWidth;
    }
};

const drawBar = () => {

    barBallsCtx.fillStyle = barColor;
    barBallsCtx.fillRect(bar.leftX, bar.y, barWidth, barHeight);
};

const clideBar = (ball) => {
    ball.dy = -ball.dy;
};