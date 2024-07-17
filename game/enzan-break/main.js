/*
const input = document.getElementById('input');
let attackFormula = [];
// const numbers = document.getElementById('numbers');

// console.log(input.value);
// console.log(numbers.textContent);

let numbers = document.getElementById('numbers').getElementsByTagName('button');
let operator = document.getElementById('operator').getElementsByTagName('button');

cards (numbers);
cards (operator);


function cards (type) {
    for (let i = 0; i < type.length; i++) {
        type[i].addEventListener('click', function () {
            attackFormula.push(this.textContent);
            input.value = attackFormula.join('');
            this.remove();
        });
    };
};

let backSpace = document.getElementById('back-space');


backSpace.addEventListener('click', function () {
    if (input.value) {
    let numbersElement = document.getElementById('numbers');
    let newElement = document.createElement('button');
    newElement.innerText = attackFormula[attackFormula.length-1];
    numbersElement.appendChild(newElement);

    attackFormula.pop();
    input.value = attackFormula.join('');
    }
});
*/

const input = document.getElementById('input');
const numbers = document.getElementById('numbers');
let attackFormula = ['1', '+', '2', '+', '5',];
input.value = attackFormula.join('');



attackFormula.forEach((value) => {
    const cards = document.createElement('a');
    cards.innerText = value;
    numbers.appendChild(cards);
})
// cards.innerText = attackFormula[0]:
numbers.addEventListener("click", function () {
    numbers.classList.toggle("selected");
});