const btn = document.getElementById('btn');
const bar = document.getElementById('bar');
const barAnimasion = document.getElementById('barAnimasion');
const animasion = document.getElementById('animasion');

btn.addEventListener('click', () => {
    animasion.classList.add('animasion');
})

bar.addEventListener('click', () => {
    
    animasion.classList.remove('animasion');
})