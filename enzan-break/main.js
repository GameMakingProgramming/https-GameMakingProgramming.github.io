const input = document.getElementById('input');
const numbers = document.getElementById('numbers');
const operator = document.getElementById('operator');
const backSpace = document.getElementById('back-space');
let attackFormula = [1, '+', 2, '+', 5, 5,];
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
    if (numOrOpe == 0 && !cards.classList.contains('selected')) { //numOrOpeが0だったら
        log.push(index);
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
    if (numOrOpe == 1 && !cards.classList.contains('selected')) { //numOrOpeが0だったら
            log.push(index);
        cards.classList.add('selected'); //クリックしたaタグにselectedのクラスをつける
        numOrOpe--; //numOrOpeを0にする
        selectionField.push(cards.textContent); //配列selectionFieldにクリックしたaタグの内容を入れる
        input.value = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
    }
    });
});
}
        backSpace.addEventListener('click', function () {
            if (numOrOpe == 0) {
                operator.children[log[log.length-1]].classList.remove('selected');
                log.pop();
                selectionField.pop();
                numOrOpe--;
                input.value = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
            } else {
                numbers.children[log[log.length-1]].classList.remove('selected');
                log.pop();
                selectionField.pop();
                numOrOpe++;
                input.value = selectionField.join(''); //配列selectionFieldを',を取って入力フォームに表示する
            }
        })

// attackFormulaNum = attackFormula.map(Number);

// 数字と演算子を分ける
sorting ();
// 数字と演算子の処理
buttonSetting ();
