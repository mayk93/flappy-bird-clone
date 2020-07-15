const block = document.querySelector('#block');
const hole = document.querySelector('#hole');

hole.addEventListener('animationiteration', () => {
    const random = -(Math.random() * 300 + 150);
    hole.style.top = `${random}px`;
})