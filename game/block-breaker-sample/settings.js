const canvasWidth = 400;
const canvasHeight = 550;
const backgroundColor = '#333333';
const blocksAreaWidth = canvasWidth;
const blocksAreaHeight = 200;

const blocksRowLength = 4;
const blocksColumnLength = 4;
const blockWidth = blocksAreaWidth / blocksColumnLength;
const blockHeight = blocksAreaHeight / blocksRowLength;

const barWidth = 200;
const barHalfWidth = barWidth / 2;
const barHeight = 10;
const barPosition = canvasHeight - 60;
const barColor = 'white';

const ballRadius = 8;
const speed = 3;
const ballColor = 'orange';

let gameState = 'initial';

const blocksCanvas = document.getElementById('blocks-canvas');
blocksCanvas.width = canvasWidth;
blocksCanvas.height = canvasHeight;
const blocksCtx = blocksCanvas.getContext("2d");

const barBallsCanvas = document.getElementById('bar-balls-canvas');
barBallsCanvas.width = canvasWidth;
barBallsCanvas.height = canvasHeight;
const barBallsCtx = barBallsCanvas.getContext("2d");

const messageLabel = document.getElementById('message');
const blocksCountLabel = document.getElementById('blocks-count');