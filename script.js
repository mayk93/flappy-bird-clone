const game = document.querySelector('#game');
game.focus();

const character = document.querySelector('#character');
const block = document.querySelector('#block');
const hole = document.querySelector('#hole');

let score = 0;
let isJumping = false;

const clamp = (value, min, max) => {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    }
    return value;
}

setInterval(() => {
    if (!isJumping) {
        const characterTop = clamp(
            parseInt(window.getComputedStyle(character).getPropertyValue('top')),
            25,
            474
        );
        const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue('top'));
        const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
        const invertedCharacterTop = -(500 - characterTop);

        const collision = (blockLeft < 25) && (blockLeft > -50) &&
            ((invertedCharacterTop < holeTop) || (invertedCharacterTop > holeTop + 130));

        if (characterTop > 470 || collision) {
            alert(`You lose! Score: ${score}`);
            score = 0;
            character.style.top = '100px';
        } else {
            character.style.top = `${characterTop + 3}px`;
        }

    }
}, 10);

const jump = () => {
    console.log('jump: called');

    isJumping = true;
    let jumpCount = 0;

    const jumpIntervalId = setInterval(() => {
        const characterTop = clamp(
            parseInt(window.getComputedStyle(character).getPropertyValue('top')),
            25,
            474
        );
        character.style.top = `${characterTop - 5}px`;
        jumpCount += 1;
        if (jumpCount > 20) {
            clearInterval(jumpIntervalId);
            isJumping = false;
        }
    }, 10);
}

hole.addEventListener('animationiteration', () => {
    const random = -(Math.random() * 300 + 150);
    hole.style.top = `${random}px`;
    score += 1;
})