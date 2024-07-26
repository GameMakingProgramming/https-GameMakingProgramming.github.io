const input = document.getElementById('input');
const numbers = document.getElementById('numbers');
const operator = document.getElementById('operator');
let attackFormula = [1, '+', 2, '+', 5,];
sorting ();
input.value = attackFormula.join('');



attackFormulaNum.forEach((value) => {
    const cards = document.createElement('a');
    cards.innerText = value;
    numbers.appendChild(cards);
    cards.addEventListener("click", function () {
    cards.classList.toggle("selected");
    });
});

attackFormulaOpe.forEach((value) => {
    const cards = document.createElement('a');
    cards.innerText = value;
    operator.appendChild(cards);
    cards.addEventListener("click", function () {
    cards.classList.toggle("selected");
    });
});


// attackFormulaNum = attackFormula.map(Number);
function sorting () {
    attackFormulaNum = attackFormula.filter((x) => {return typeof x === 'number'})
    attackFormulaOpe = attackFormula.filter((x) => {return typeof x === 'string'})
}
