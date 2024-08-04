const startMenu = document.getElementById('startMenu');
const gameStart = document.getElementById('gameStart');
const input = document.getElementById('input');
const numbers = document.getElementById('numbers');
const operator = document.getElementById('operator');
const backSpace = document.getElementById('back-space');
const calculation = document.getElementById('calculation');
const damageCaused = document.getElementById('damageCaused');
const damage = document.getElementById('damage');
const rivalLife = document.getElementById('rivalLife');
let attackFormula = [1, '+', 2, '+', 5, 5, '-', '×', '÷', 7, 8,];
let selectionField = [];
let numOrOpe = [0];
let log = []; 

// 数字と演算子を分ける
function sorting () {
    attackFormulaNum = attackFormula.filter((x) => {return typeof x === 'number'}) //attackFormulaから数字を取り出す
    attackFormulaOpe = attackFormula.filter((x) => {return typeof x === 'string'}) //attackFormulaから演算子を取り出す
}

function rivalDamageDisplay (num) {
    selectionField = [];
    input.value = '';
    numOrOpe = num;
    damage.style.visibility = 'visible'; //htmlを表示
    setTimeout(() => {
        damage.style.visibility = 'hidden';
    }, 1500);
}

// 数字と演算子の処理
function buttonSetting () {
// 数字
attackFormulaNum.forEach((value, index) => {
    const cards = document.createElement('a'); //aタグを作る
    cards.innerText = value; //aタグにattackFormulaNumを入れる
    numbers.appendChild(cards); //aタグをnumbersの子要素にする
    cards.addEventListener("click", function () {//aタグをクリックしたら
    if (numOrOpe == 0 && !cards.classList.contains('selected')) { //numOrOpeが0でボタンが押されていなかったら
        log.push(index); //logに入力した数字の配置を記録する
        cards.classList.add('selected'); //クリックしたaタグにselectedのクラスをつける
        numOrOpe++; //numOrOpeを1にする
        selectionField.push(cards.textContent); //配列selectionFieldにクリックしたaタグの内容を入れる
        input.value = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
    }
    });
});
// 演算子
attackFormulaOpe.forEach((value, index) => {
    const cards = document.createElement('a'); //aタグを作る
    cards.innerText = value; //aタグにattackFormulaOpeを入れる
    operator.appendChild(cards); //aタグをoperatorの子要素にする
    cards.addEventListener("click", function () { //aタグをクリックしたら
    if (numOrOpe == 1 && !cards.classList.contains('selected')) { //numOrOpeが1でボタンが押されていなかったら
            log.push(index); //logに入力した演算子の配置を記録する
        cards.classList.add('selected'); //クリックしたaタグにselectedのクラスをつける
        numOrOpe--; //numOrOpeを0にする
        selectionField.push(cards.textContent); //配列selectionFieldにクリックしたaタグの内容を入れる
        input.value = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
    }
    });
});
backSpace.addEventListener('click', function () { //クリックされたら
    if(selectionField[0]) { //入力欄に何も入力されていなかったら
        if (numOrOpe == 0) { //numOrOpeが0、演算子だったら
            operator.children[log[log.length-1]].classList.remove('selected'); //直前に入力されたボタンのクラスを外す
            log.pop(); //配列logの最後の演算子を削除する
            selectionField.pop(); //入力欄の演算子を削除する
            numOrOpe++; //numOrOpeを1にする
            input.value = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
            } else if (numOrOpe == 1) { //numOrOpeが1、数字だったら
                numbers.children[log[log.length-1]].classList.remove('selected'); //直前に入力されたボタンのクラスを外す
                log.pop(); //配列logの最後の数字を削除する
                selectionField.pop(); //入力欄の数字を削除する
                numOrOpe--; //numOrOpeを0にする
                input.value = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
                }}
});
calculation.addEventListener('click', function () { //演斬をクリックしたら
    if(numOrOpe == 1) { //numOrOpeが1、数字だったら
        numOrOpe++; //numOrOpeを3にする
        let selectedElement = document.getElementsByClassName('selected');
        if (0 < selectedElement.length) {
                [...selectedElement].forEach(function(v){ return v.remove() })
            }
        let result = input.value.replace(/×/g, '*').replace(/÷/g, '/'); //入力された式を変換
        let calculationResult = Function('return ('+result+');') (); //式を計算
        damageCaused.innerText = calculationResult; //htmlに結果を入力
        let rivalLifeConversion = rivalLife.innerText.split('/').map(Number);
        let remainingHp = rivalLifeConversion[0] - calculationResult
        if (0 < remainingHp) {
            rivalLife.innerText = remainingHp + '/' + rivalLifeConversion[1];
            rivalDamageDisplay(0);
        } else {
            rivalLife.innerText = 0 + '/' + rivalLifeConversion[1];
            rivalDamageDisplay(4);
            console.log('yaatta');
        }
    }
})
}
// attackFormulaNum = attackFormula.map(Number);

gameStart.addEventListener('click', function () {
    startMenu.style.visibility = 'hidden';
// 数字と演算子を分ける
sorting ();
// 数字と演算子の処理
buttonSetting ();
})