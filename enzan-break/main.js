const input = document.getElementById('input');
const numbers = document.getElementById('numbers');
const operator = document.getElementById('operator');
const backSpace = document.getElementById('back-space');
const calculation = document.getElementById('calculation');
const damageCaused = document.getElementById('damageCaused');
let attackFormula = [1, '+', 2, '+', 5, 5, '-', '×', '÷',];
let selectionField = [];
let numOrOpe = [0];
let log = []; 

// 数字と演算子を分ける
function sorting () {
    attackFormulaNum = attackFormula.filter((x) => {return typeof x === 'number'}) //attackFormulaから数字を取り出す
    attackFormulaOpe = attackFormula.filter((x) => {return typeof x === 'string'}) //attackFormulaから演算子を取り出す
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
        if (numOrOpe == 0) { //numOrOpeが0だったら
            operator.children[log[log.length-1]].classList.remove('selected'); //直前に入力されたボタンのクラスを外す
            log.pop(); //配列logの最後の演算子を削除する
            selectionField.pop(); //入力欄の演算子を削除する
            numOrOpe++; //numOrOpeを1にする
            input.value = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
            } else { //numOrOpeが1だったら
                numbers.children[log[log.length-1]].classList.remove('selected'); //直前に入力されたボタンのクラスを外す
                log.pop(); //配列logの最後の数字を削除する
                selectionField.pop(); //入力欄の数字を削除する
                numOrOpe--; //numOrOpeを0にする
                input.value = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
                }}
});
calculation.addEventListener('click', function () {
    if(numOrOpe == 1) {
        console.log(input.value);
        let result = input.value.replace(/×/g, '*').replace(/÷/g, '/');
        let calculationResult = Function('return ('+result+');') ();
        console.log(result);
        console.log(calculationResult);
        damageCaused.innerText = calculationResult;
    }
})
}
// attackFormulaNum = attackFormula.map(Number);

// 数字と演算子を分ける
sorting ();
// 数字と演算子の処理
buttonSetting ();
