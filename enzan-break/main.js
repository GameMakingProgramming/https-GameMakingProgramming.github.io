const startMenu = document.getElementById('startMenu');
const gameStart = document.getElementById('gameStart');
const stairs = document.getElementById('stairs');
const stairsScreen = document.getElementById('stairsScreen');
const input = document.getElementById('input');
const numbers = document.getElementById('numbers');
const operator = document.getElementById('operator');
const special = document.getElementById('special');
const release = document.getElementById('release');
const parentheses = document.getElementById('parentheses');
const backSpace = document.getElementById('back-space');
const calculation = document.getElementById('calculation');
const damageCausedDisplay = document.getElementById('damageCausedDisplay');
const damageCausedHtml = document.getElementById('damageCausedHtml');
const damageReceivedDisplay = document.getElementById('damageReceivedDisplay');
const damageReceivedHtml = document.getElementById('damageReceivedHtml');

const floor = document.getElementById('floor');
const warning = document.getElementById('warning');
const rivalAnimasion = document.getElementById('rivalAnimasion');
const rivalAttack = document.getElementById('rivalAttack');
const rivalDefense = document.getElementById('rivalDefense');
const rivalWeakness = document.getElementById('rivalWeakness');
const rivalMAxLife = document.getElementById('rivalMAxLife');
const rivalLife = document.getElementById('rivalLife');
const rivalRemainingLifeBar = document.getElementById('rivalRemainingLifeBar');
const rivalLostlifeBar = document.getElementById('rivalLostlifeBar');
// const myLife = document.getElementById('myLife');
const lastLife = document.getElementById('lastLife');
const secondLife = document.getElementById('secondLife');
const firstLife = document.getElementById('firstLife');
const myMaxHp = document.getElementById('myMaxHp');
const myHp = document.getElementById('myHp');
const myHpBar = document.getElementById('myHpBar');
const barAnimasion = document.getElementById('barAnimasion');
const rivalImage = document.getElementById('rivalImage');
const drowCards = document.getElementById('drowCards');
const drowCard = document.getElementById('drowCard');

const compare = (a, b) => {return b - a;} //大きい順に並び替える

const slime = new Array
("./image/slime1.png","./image/slime2.png","./image/slime3.png",
"./image/slime4.png","./image/slime5.png","./image/slime6.png");
const jellyfish = new Array
("./image/jellyfish1.png","./image/jellyfish2.png","./image/jellyfish3.png",
"./image/jellyfish4.png","./image/jellyfish5.png","./image/jellyfish6.png",);
const boss = new Array("./image/boss1.png","./image/boss2.png");

// let attackFormula = []; //手札
let attackFormulaNum = []; //数字の手札
let attackFormulaOpe = []; //演算子の手札
let selectionField = []; //選んだ手札
let numOrOpe = 0; //切り替えスイッチ
let numLog = []; //選んだ数字の手札の位置
let opeLog = []; //選んだ演算子の手札の位置
let numReleaseLog = [];
let opeReleaseLog = [];
let releaseStep = 0;
let amountOfEnergy = 0;
let parenthesesCount = 0; //（）の数のカウンター
let turn = 0;
let numberOfFloors = 0; //階数
stairs.innerText = numberOfFloors; //0階を表示

let rivalStatus = [10, 3, 0, 4, 10] //HP[0], 攻撃[1], 防御[2], 弱点[3], 残りHP[4]
let myStatus = [3, 10, 10] //ライフ[0], HP[1] ,残りHP[2]


function rivalStatusSetting() {
    if ((numberOfFloors + 1) % 10 == 0) {
        rivalStatus[0] = random(1000+numberOfFloors,500+numberOfFloors);
        if (random(6,0) > 2) {
            rivalStatus[1] = random(11,8);
            rivalStatus[2] = random(2,0);
            rivalImage.src = boss[1]
        } else {
            rivalStatus[1] = random(6,3);
            rivalStatus[2] = random(11,8);
            rivalImage.src = boss[0];
        }
        rivalStatus[3] = random(4,0);
    } else if ((numberOfFloors + 1) % 5 == 0) {
        rivalStatus[0] = random(500+numberOfFloors,100+numberOfFloors);
        if (random(6,0) > 2) {
            rivalStatus[1] = random(9,6);
            rivalStatus[2] = random(2,0);
            rivalImage.src = boss[1]
        } else {
            rivalStatus[1] = random(6,3);
            rivalStatus[2] = random(9,6);
            rivalImage.src = boss[0];
        }
        rivalStatus[3] = random(4,0);
    } else {
        rivalStatus[0] = random(30+numberOfFloors,5+numberOfFloors);
        if (random(6,0) > 2) {
            rivalStatus[1] = random(8,4);
            rivalStatus[2] = random(2,0);
            rivalImage.src = jellyfish[random(6,0)];
        } else {
            rivalStatus[1] = random(4,1);
            rivalStatus[2] = random(7,3);
            rivalImage.src = slime[random(6,0)];
        }
        rivalStatus[3] = random(5,0);
    }
    rivalStatus[4] = rivalStatus[0];
}


//セッティング
function setting () {
    floor.innerText = numberOfFloors;
    rivalMaxLife.innerText = rivalStatus[0];
    rivalLife.innerText = rivalStatus[0];
    rivalAttack.innerText = rivalStatus[1];
    rivalDefense.innerText = rivalStatus[2];
    // myLife.innerText = myStatus[0];
    myMaxHp.innerText = myStatus[1];
    myHp.innerText = myStatus[2];
    if (rivalStatus[3] == 0) {
        rivalWeakness.innerText = 'マイナス';
    } else if (rivalStatus[3] == 1) {
        rivalWeakness.innerText = '小さい数';
    } else if (rivalStatus[3] == 2) {
        rivalWeakness.innerText = '小数点';
    } else if (rivalStatus[3] == 3) {
        rivalWeakness.innerText = '奇数';
    } else if (rivalStatus[3] == 4) {
        rivalWeakness.innerText = 'なし';
    }
}
//階段を上る
function goUpTheStairs () {
    setTimeout(() => { //1秒後に
        numberOfFloors++; //階数を1増やす
            if (numberOfFloors % 10 == 0) {warning.style.visibility = 'visible';}
            stairs.innerText = numberOfFloors; //階数を表示する
            setting ();
            stairsScreen.addEventListener('click', function screenEvent() { //画面をクリックしたら
                stairsScreen.removeEventListener('click', screenEvent);
                stairsScreen.style.visibility = 'hidden'; //階段画面を非表示にする
                if (numberOfFloors % 10 == 0) {warning.style.visibility = 'hidden';}
                rivalAnimasion.classList.replace('rival-down-animasion', 'rival-up-animasion');
                setTimeout(() => {
                    rivalAnimasion.classList.replace('rival-up-animasion', 'rival-sway-animasion');
                    if (numberOfFloors == 1) {
                        getItem(8,4);
                    } else {
                        if (turn == 1) {
                            getItem(numberOfAcquisitions(6)[0], numberOfAcquisitions(6)[1]);
                            turn = 0;
                        } else {
                            getItem(numberOfAcquisitions(5)[0], numberOfAcquisitions(5)[1]);
                            turn = 0;
                        }
                    }
                }, 2500);
            })
        }, 1000);
    }

//与えたダメージの表示
function rivalDamageDisplay () { 
    selectionField = []; //選んだ手札をリセット
    numLog = []; //選んだ数字の手札の位置
    opeLog = []; //選んだ演算子の手札の位置
    input.innerText = ''; //入力フォームをリセット
    damageCausedHtml.style.visibility = 'visible'; //htmlを表示
    setTimeout(() => { //1.5秒後に
        damageCausedHtml.style.visibility = 'hidden'; //ダメージの表示を消す
    }, 1000);
}

//弱点
function Weakness(a) {
           if (rivalStatus[3] == 0 && 0 > a) {
        return -2 * a;
    } else if (rivalStatus[3] == 1) {
        return 10 / a;
    } else if (rivalStatus[3] == 2 && !Number.isInteger(a)) {
        return 10 * a;
    } else if (rivalStatus[3] == 3 && a % 2 == 1) {
        return 2 * a;
    } else {
        return a;
    }
}

// ハート表示
function heart() {
           if (myStatus[0] == 3) {
        firstLife.classList.remove('lost-heart');
    } else if (myStatus[0] == 2) {
        firstLife.classList.add('lost-heart');
        secondLife.classList.remove('lost-heart');
    } else if (myStatus[0] == 1) {
        secondLife.classList.add('lost-heart');
    } else if (myStatus[0] == 0) {
        lastLife.classList.add('lost-heart');
    }
}

//ランダム計算
function random (a, b) {
    return Math.floor(Math.random() * (a - b) + b);
}

//アイテム入手
//数字a個と演算子b個を配列に追加して表示させる
function getItem (a, b) {
    let drawNumCards = [];
    let drawOpeCards = [];
    for (let index = 0; index < a; index++) {
        if (0 == random(10,0)) {
            let drawNum = random(9,1) / 10
            attackFormulaNum.push(drawNum);
            drawNumCards.push(drawNum);
        } else {
            let drawNum = random(9,1)
            attackFormulaNum.push(drawNum);
            drawNumCards.push(drawNum);
        }
    }
    for (let index = 0; index < b; index++) {
        switch (random(5,0)) {
            case 0:
            case 1:
                attackFormulaOpe.push('+');
                drawOpeCards.push('+');
                break;
        
            case 2:
                attackFormulaOpe.push('-');
                drawOpeCards.push('-');
                break;

            case 3:
                attackFormulaOpe.push('×');
                drawOpeCards.push('×');
                break;
        
            case 4:
                attackFormulaOpe.push('÷');
                drawOpeCards.push('÷');
                break;
        }
    }
    eraseAllButtons(drowCard,drowCard)
    drawNumCards.forEach((value, index) => {
        const cards = document.createElement('a'); //aタグを作る
        cards.innerText = value; //aタグにdrawNumCardsを入れる
        drowCard.appendChild(cards); //aタグをnumbersの子要素にする
    });
    drawOpeCards.forEach((value, index) => {
        const cards = document.createElement('a'); //aタグを作る
        cards.innerText = value; //aタグにdrawOpeCardsを入れる
        drowCard.appendChild(cards); //aタグをnumbersの子要素にする
    });
    drowCards.classList.replace('drow-cards-end', 'drow-cards-start');
    drowCards.style.visibility = 'visible';
    setTimeout(() => {
        let cardsChildren = drowCard.children;
        for (let i = 0, len = cardsChildren.length; i < len; i++) {
            cardsChildren[i].classList.add('drow-card-move');
        };
    setTimeout(() => {
        eraseAllButtons(numbers,operator);
        buttonSetting();
    setTimeout(() => {
        drowCards.classList.replace( 'drow-cards-start', 'drow-cards-end');
    setTimeout(() => {
        drowCards.style.visibility = 'hidden';
    }, 3000);
    }, 1000);
    }, 1000);
    }, 3000);
}

// function numberOfAcquisitions (a, b) {
//     let x = 0; let y = 5;
//     for (let i = 0; i < 5 && ((a+x)/20) < ((b+y)/15); i++) {
//         x++; y--;
//     }
//     console.log(x);
//     console.log(y);
//     return [x, y];
// }
// console.log(numberOfAcquisitions(8,5));

function numberOfAcquisitions (num) {
    let x = 0; let y = num;
    for (let i = 0; i < num && ((attackFormulaNum.length+x)/20) < ((attackFormulaOpe.length+y)/15); i++) {
        x++; y--;
    }
    return [x, y];
}


//ボタンを削除する
function eraseAllButtons(num, ope) {
    while(num.firstChild) {
        num.removeChild(num.firstChild);
    }
    while(ope.firstChild) {
        ope.removeChild(ope.firstChild);
    }
}

// 数字と演算子の処理
function buttonSetting () {
//アニメーションリセット
    barAnimasion.classList.remove('bar-animasion');
    katana.classList.remove('katana-animation');
// 数字
attackFormulaNum.forEach((value, index) => {
    const cards = document.createElement('a'); //aタグを作る
    cards.innerText = value; //aタグにattackFormulaNumを入れる
    numbers.appendChild(cards); //aタグをnumbersの子要素にする
    if (value >= 1) {
        cards.classList.add('color-' + value);
    } else {
        cards.classList.add('color-0');
    }

    cards.addEventListener("click", function () {//aタグをクリックしたら
    if (numOrOpe == 0 && !cards.classList.contains('selected')) { //numOrOpeが0でボタンが押されていなかったら
        numLog.push(index); //logに入力した数字の配置を記録する
        cards.classList.add('selected'); //クリックしたaタグにselectedのクラスをつける
        numOrOpe = 1; //numOrOpeを1にする
        selectionField.push(cards.textContent); //配列selectionFieldにクリックしたaタグの内容を入れる
        input.innerText = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
    }
    });

    cards.addEventListener('click', function () {
    if (numOrOpe == 6) {
        if (numReleaseLog.some(elm => {return elm == index})) {
            numReleaseLog = numReleaseLog.filter(elm => {return elm !== index});
            cards.classList.remove('erase');
        } else if (numbers.childElementCount - numReleaseLog.length > 2) {
            numReleaseLog.push(index);
            cards.classList.add('erase');
        }
    }    
    });
});
// 演算子
attackFormulaOpe.forEach((value, index) => {
    const cards = document.createElement('a'); //aタグを作る
    cards.innerText = value; //aタグにattackFormulaOpeを入れる
    operator.appendChild(cards); //aタグをoperatorの子要素にする
           if (value == '+') {
        cards.classList.add('color-p');
    } else if (value == '-') {
        cards.classList.add('color-m');
    } else if (value == '×') {
        cards.classList.add('color-t');
    } else if (value == '÷') {
        cards.classList.add('color-d');
    }

    cards.addEventListener("click", function () { //aタグをクリックしたら
    if (numOrOpe == 1 && !cards.classList.contains('selected')) { //numOrOpeが1でボタンが押されていなかったら
        opeLog.push(index); //logに入力した演算子の配置を記録する
        cards.classList.add('selected'); //クリックしたaタグにselectedのクラスをつける
        numOrOpe = 0; //numOrOpeを0にする
        selectionField.push(cards.textContent); //配列selectionFieldにクリックしたaタグの内容を入れる
        input.innerText = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
} else if (numOrOpe == 0 && !cards.classList.contains('selected') && cards.textContent == '-' && 
           selectionField[selectionField.length-1] !== '-' ) { //numOrOpeが0でボタンが押されていなくマイナスが連続していなかったら
            opeLog.push(index); //logに入力した演算子の配置を記録する
        cards.classList.add('selected'); //クリックしたaタグにselectedのクラスをつける
        selectionField.push(cards.textContent); //配列selectionFieldにクリックしたaタグの内容を入れる
        input.innerText = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
        }});

    cards.addEventListener('click', function () {
        if (numOrOpe == 6) {
            if (opeReleaseLog.some(elm => {return elm == index})) {
                opeReleaseLog = opeReleaseLog.filter(elm => {return elm !== index});
                cards.classList.remove('erase');
            } else if (operator.childElementCount - opeReleaseLog.length > 1) {
                opeReleaseLog.push(index);
                cards.classList.add('erase');
            }
        }
    });
});
}
//固定ボタンセット
function fixedButtonSetting () {
//（）ボタン
parentheses.addEventListener('click', function () {
           if (numOrOpe == 0) {
            parenthesesCount++;
            selectionField.push('(');
            input.innerText = selectionField.join('');
    } else if (numOrOpe == 1 && parenthesesCount > 0) {
            parenthesesCount--;
            selectionField.push(')');
            input.innerText = selectionField.join('');
    }
})

release.addEventListener('click', function () {
    if (numOrOpe == 0 && !selectionField[0]) {
        numOrOpe = 6;
    } else if (numOrOpe == 6) {
        let eraseElement = document.getElementsByClassName('erase'); //selectedクラス、押されていたボタン
        if (0 < eraseElement.length) { //ボタンが押されたものがあったら
                [...eraseElement].forEach(function(v){ return v.remove() }) //それを消す
                amountOfEnergy = amountOfEnergy + numReleaseLog.length + opeReleaseLog.length;
                numReleaseLog.sort(compare); //数字の位置ログを大きい順
                opeReleaseLog.sort(compare); //演算子の位置ログを大きい順
                numReleaseLog.forEach(element => attackFormulaNum.splice(element, 1,)); //後半のボタンから1つずつ削除
                opeReleaseLog.forEach(element => attackFormulaOpe.splice(element, 1,));
                eraseAllButtons(numbers,operator);
                buttonSetting();
                numReleaseLog = [];
                opeReleaseLog = [];
            }
            numOrOpe = 0;
    }
})

//バックスペース
backSpace.addEventListener('click', function () { //クリックされたら
    if(selectionField[0]) { //入力欄に何も入力されていなかったら
               if (selectionField[selectionField.length-1] == '(') {
            selectionField.pop(); //入力欄の演算子を削除する
            input.innerText = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
            parenthesesCount--;
        } else if (selectionField[selectionField.length-1] == ')') {
            selectionField.pop(); //入力欄の演算子を削除する
            input.innerText = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
            parenthesesCount++;
        } else if (numOrOpe == 0) { //numOrOpeが0、演算子だったら
            operator.children[opeLog[opeLog.length-1]].classList.remove('selected'); //直前に入力されたボタンのクラスを外す
            opeLog.pop(); //配列logの最後の演算子を削除する
            selectionField.pop(); //入力欄の演算子を削除する
            input.innerText = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
            let selectionFieldLast = selectionField[selectionField.length-1]
            if ((!selectionField[0] || isNaN(selectionFieldLast)) &&  //消した後最後が文字、もしくは空欄だったら
                    selectionFieldLast !== ')') { //かつ ）じゃなかったら
                        numOrOpe = 0; //numOrOpeを0にする
                    } else { //数字だったら
                        numOrOpe = 1; //numOrOpeを1にする
                    }
        } else if (numOrOpe == 1) { //numOrOpeが1、数字だったら
            numbers.children[numLog[numLog.length-1]].classList.remove('selected'); //直前に入力されたボタンのクラスを外す
            numLog.pop(); //配列logの最後の数字を削除する
            selectionField.pop(); //入力欄の数字を削除する
            input.innerText = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
            let selectionFieldLast = selectionField[selectionField.length-1]
            if ((!selectionField[0] || isNaN(selectionFieldLast)) &&  //消した後最後が文字、もしくは空欄だったら
                    selectionFieldLast !== ')') { //かつ ）じゃなかったら
                        numOrOpe = 0; //numOrOpeを0にする
                    } else { //数字だったら
                        numOrOpe = 1; //numOrOpeを1にする
                    }
        }
            }
});
//演斬ボタン
calculation.addEventListener('click', function () { //演斬をクリックしたら
    if(numOrOpe == 1 && parenthesesCount == 0) { //numOrOpeが1、数字だったら
        numOrOpe++; //numOrOpeを3にする
        turn++;
        let selectedElement = document.getElementsByClassName('selected'); //selectedクラス、押されていたボタン
        if (0 < selectedElement.length) { //ボタンが押されたものがあったら
                [...selectedElement].forEach(function(v){ return v.remove() }) //それを消す
                numLog.sort(compare); //数字の位置ログを大きい順
                opeLog.sort(compare); //演算子の位置ログを大きい順
                numLog.forEach(element => attackFormulaNum.splice(element, 1,)); //後半のボタンから1つずつ削除
                opeLog.forEach(element => attackFormulaOpe.splice(element, 1,)); 
            }
        let rivalLifeRatio = rivalStatus[4] / rivalStatus[0] * 100; //残りHP率
        let result = input.innerText.replace(/×/g, '*').replace(/÷/g, '/'); //入力された式を変換
        let calculationResult = Function('return ('+result+');') (); //式を計算
        input.innerText = calculationResult;
        let damageCaused = Weakness(calculationResult) - rivalStatus[2]; //ダメージを防御力で軽減
        if (0 > damageCaused) { //ダメージがマイナスになったら
            damageCaused = 0; //ダメージを0にする
        }
        damageCausedDisplay.innerText = damageCaused; //htmlに結果を入力
        rivalStatus[4] = rivalStatus[4] - damageCaused; //残ったHP
        setTimeout(() => {
        katana.classList.add('katana-animation');
        setTimeout(() => { //500後に
        if (0 < rivalStatus[4]) { //相手HPが残っていたら
            rivalLife.innerText = rivalStatus[4]; //残りHPを表示
            let rivalRemainingLifeRatio = rivalStatus[4] / rivalStatus[0] * 100; //残りHP率
            let rivalLostLifeRatio = rivalLifeRatio - rivalRemainingLifeRatio;
            rivalRemainingLifeBar.style.width = rivalRemainingLifeRatio + '%'; //HPバーを残りHP率に変える
            rivalLostlifeBar.style.width = rivalLostLifeRatio + '%';
            barAnimasion.classList.add('bar-animasion');
            rivalDamageDisplay(); //ダメージを表示
            damageReceivedDisplay.innerText = rivalStatus[1]; // 受けたダメージをhtmlに書き込む
            setTimeout(() => {
                rivalAnimasion.classList.replace('rival-sway-animasion', 'rival-attack-animasion');
            setTimeout(() => { //3秒後に
                damageReceivedHtml.style.visibility = 'visible'; //htmlを表示
                myStatus[2] = myStatus[2] - rivalStatus[1]; //自分のHPを減らす
                if (0 < myStatus[2]) { //HPが残ったら
                    myHp.innerText = myStatus[2]; //残ったHPを表示させる
                    let myHpRatio = myStatus[2] / myStatus[1] * 100; //HPバーの割合
                    myHpBar.style.width = myHpRatio + '%'; //HPバーを減らす
                } else { //HPが無くなったら
                    myHp.innerText = 0; //0を表示させる
                    myHpBar.style.width = 0 + '%'; //HPバーを無くす
                    setTimeout(() => { //3秒後に
                    myStatus[0]--; //ハートを減らして
                    myStatus[2] = myStatus[1]; //HPを最大にする
                    heart();
                    if (myStatus[0] > 0) {
                        myHp.innerText = myStatus[2]; //HPを表示させる
                        myHpBar.style.width = 100 + '%' //HPバーを最大にする   
                    } else {
                        console.log('ゲームオーバー');
                        
                    }
                    }, 3000);
                }
                setTimeout(() => { //1.5秒後に
                    rivalAnimasion.classList.replace( 'rival-attack-animasion', 'rival-sway-animasion');
                    damageReceivedHtml.style.visibility = 'hidden'; //ダメージの表示を消す
                    numOrOpe = 0; //切り替えスイッチを0にする
                    setTimeout(() => {
                        getItem(numberOfAcquisitions(5)[0], numberOfAcquisitions(5)[1]);
                    }, 1000);
                    }, 1500);
            }, 500);
        }, 2000);
        } else { //相手HPがなくなったら
            rivalLife.innerText = 0 //残りHPを0にして表示
            rivalRemainingLifeBar.style.width = 0 + '%'; //HPバーを0にする
            rivalLostlifeBar.style.width = rivalLifeRatio + '%';
            barAnimasion.classList.add('bar-animasion');
            numOrOpe = 4; //切り替えスイッチを4にする
            rivalDamageDisplay(); //ダメージを表示
            setTimeout(() => {
            rivalAnimasion.classList.replace('rival-sway-animasion', 'rival-down-animasion');
            setTimeout(() => { //1.5秒後に
                stairsScreen.style.visibility = 'visible'; //階段画面を表示
                rivalStatusSetting();
                rivalRemainingLifeBar.style.width = 100 + '%';
                rivalLostlifeBar.style.width = 0 + '%';
                goUpTheStairs(); //階段を上る
                numOrOpe = 0; //切り替えスイッチを0にする
                console.log('yaatta');
            }, 3000);
        }, 1000);
        }
    }, 500);
}, 600);
    }
})
}

special.addEventListener('click', function () {
    if (amountOfEnergy > 10) {
        amountOfEnergy = 0;
        let rivalLifeRatio = rivalStatus[4] / rivalStatus[0] * 100; //残りHP率
        damageCausedDisplay.innerText = 30; //htmlに結果を入力
        rivalStatus[4] = rivalStatus[4] - 30; //残ったHP
        setTimeout(() => {
        katana.classList.add('katana-animation');
        setTimeout(() => { //500後に
        if (0 < rivalStatus[4]) { //相手HPが残っていたら
            rivalLife.innerText = rivalStatus[4]; //残りHPを表示
            let rivalRemainingLifeRatio = rivalStatus[4] / rivalStatus[0] * 100; //残りHP率
            let rivalLostLifeRatio = rivalLifeRatio - rivalRemainingLifeRatio;
            rivalRemainingLifeBar.style.width = rivalRemainingLifeRatio + '%'; //HPバーを残りHP率に変える
            rivalLostlifeBar.style.width = rivalLostLifeRatio + '%';
            barAnimasion.classList.add('bar-animasion');
            rivalDamageDisplay(); //ダメージを表示
        } else { //相手HPがなくなったら
            rivalLife.innerText = 0 //残りHPを0にして表示
            rivalRemainingLifeBar.style.width = 0 + '%'; //HPバーを0にする
            rivalLostlifeBar.style.width = rivalLifeRatio + '%';
            barAnimasion.classList.add('bar-animasion');
            numOrOpe = 4; //切り替えスイッチを4にする
            rivalDamageDisplay(); //ダメージを表示
            setTimeout(() => {
                rivalAnimasion.classList.replace('rival-sway-animasion', 'rival-down-animasion');
            setTimeout(() => { //1.5秒後に
                stairsScreen.style.visibility = 'visible'; //階段画面を表示
                rivalStatusSetting();
                rivalRemainingLifeBar.style.width = 100 + '%';
                rivalLostlifeBar.style.width = 0 + '%';
                goUpTheStairs(); //階段を上る
                numOrOpe = 0; //切り替えスイッチを0にする
                console.log('yaatta');
            }, 3000);
            }, 1000);
        }
        }, 500);
        }, 600);
    }
})

gameStart.addEventListener('click', function () { //ゲームスタートを押したら
    startMenu.style.visibility = 'hidden'; //スタート画面を消す
    goUpTheStairs (); //階段を上る
setting ();
// // 数字と演算子を分ける
// 数字と演算子の処理
//固定ボタンセット
fixedButtonSetting ()
})

/*
//バックスペース
backSpace.addEventListener('click', function () { //クリックされたら
    if(selectionField[0]) { //入力欄に何も入力されていなかったら
        if (numOrOpe == 0) { //numOrOpeが0、演算子だったら
            operator.children[opeLog[opeLog.length-1]].classList.remove('selected'); //直前に入力されたボタンのクラスを外す
            opeLog.pop(); //配列logの最後の演算子を削除する
            selectionField.pop(); //入力欄の演算子を削除する
            numOrOpe++; //numOrOpeを1にする
            input.value = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
            } else if (numOrOpe == 1) { //numOrOpeが1、数字だったら
                numbers.children[numLog[numLog.length-1]].classList.remove('selected'); //直前に入力されたボタンのクラスを外す
                numLog.pop(); //配列logの最後の数字を削除する
                selectionField.pop(); //入力欄の数字を削除する
                numOrOpe--; //numOrOpeを0にする
                input.value = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
                }}
});
*/

// const katana = document.getElementById('katana');
// katana.addEventListener('click', () => {
//     katana.classList.toggle('katana-animation');
// })
// input.addEventListener('click', () => {
//     rivalAnimasion.classList.replace('rival-up-animasion', 'rival-down-animasion');
//     console.log('aaaa');
// })