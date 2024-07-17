let bar;


const initBar = () => {
    bar = {
        x: canvasWidth / 2,
        y: barPosition,
        bottomY: barPosition + barHeight,
        get leftX () {return this.x - barHalfWidth; },
        get rightX () {return this.x + barHalfWidth; }
    }
}

const setBarX = (event) => {
    // パソコンのマウスで操作した場合
    if (event.offsetX) {
        bar.x = event.offsetX;

    // スマホのドラッグで操作した場合
    } else {
        const touchEvent = event.changedTouches[0];
        bar.x = touchEvent.clientX - touchEvent.target.getBoundingClientRect().left;
    }

    // 縮尺の調整をする
    bar.x *= barBallsCanvas.width / barBallsCanvas.clientWidth;

    // canvasの左端からはみ出してしまう場合、canvas内に収まるようにする
    if(bar.leftX < 0){
        bar.x = barHalfWidth;

    // canvasの右端からはみ出してしまう場合、canvas内に収まるようぬする
    } else if (bar.rightX > canvasWidth) {
        bar.x = canvasWidth - barHalfWidth;
    }
};


const drawBar = () => {
    barBallsCtx.fillStyle = barColor;
    barBallsCtx.fillRect(bar.leftX, bar.y, barWidth, barHeight);
};

// 操作バーに当たったときの角度の変更
const clideBar = (ball) => {
    
    // 操作バーの当たった位置(0~1)
    const clidedPosition = (bar.rightX - ball.x) / barWidth;

    // 反射後の角度(40~140)
    const degree = clidedPosition * 100 + 40;

    // ボールのdxとdyを計算する
    const { dx, dy} = calcDeltaXY(degree);

    ball.dx = dx;
    ball.dy = dy;
};

// ボールの進行方法を三角関数で計算する
const calcDeltaXY = (degree) => {

    const radian = degree * Math.PI / 180;

    return {
        dx: Math.cos(radian) * speed,
        dy: -Math.sin(radian) * speed,
    };
};