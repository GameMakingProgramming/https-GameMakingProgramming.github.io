const input = document.getElementById('input');
const numbers = document.getElementById('numbers');
let attackFormula = ['1', '+', '2', '+', '5',];
input.value = attackFormula.join('');



attackFormula.forEach((value) => {
    const cards = document.createElement('a');
    cards.innerText = value;
    numbers.appendChild(cards);
    cards.addEventListener("click", function () {
        cards.classList.toggle("selected");
        
    });
    
})
