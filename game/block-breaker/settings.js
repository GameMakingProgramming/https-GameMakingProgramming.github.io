// canvasの横幅
const canvasWidth = 400;

// canvasの縦幅
const canvasHeight = 550;

// canvasの背景色
const backgroundColor = '#333333';

// ブロックエリアの横幅
const blockAreWidth = canvasWidth;

// ブロックエリアの縦幅
const blockAreHeight = 400;

// 行の個数
const blocksRowLength = 50;

// 列の個数
const blocksColumnLength = 50;

// 1つのブロックの横幅
const blockWidth = blockAreWidth / blocksColumnLength;

// 1つのブロックの縦幅
const blockHeight = blockAreHeight / blocksRowLength;

// 操作バーの横幅
const barWidth = 100;

// 操作バーの横幅の半分の長さ
const barHalfWidth = barWidth / 2;

// 操作バーの縦幅
const barHeight = 5;

// 操作バーの縦方向の位置
const barPosition = canvasHeight - 60;

// 操作バーの色
const barColor = 'white';

// ボールの半径
const ballRadius = 3;

// ボールの色
const ballColor = 'orange';

// ボールの移動スピード
const speed = 5;


let gameState = 'initial'

const blocksCanvas = document.getElementById('blocks-canvas');

// canvasのサイズを設定
blocksCanvas.width = canvasWidth;
blocksCanvas.height = canvasHeight;

// コンテキストの取得
const blocksCtx = blocksCanvas.getContext('2d');


const barBallsCanvas = document.getElementById('bar-balls-canvas');
barBallsCanvas.width = canvasWidth;
barBallsCanvas.height = canvasHeight;

const barBallsCtx = barBallsCanvas.getContext('2d');

const messageLabel = document.getElementById('message');
const blocksCountLabel = document.getElementById('blocks-count');