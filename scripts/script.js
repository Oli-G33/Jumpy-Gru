const canvas = document.querySelector('canvas');

const game = new Game(canvas);



const startScreenElement = document.getElementById("start-screen");
const gameScreenElement = document.getElementById("game-screen");
const endScreenElement = document.getElementById("game-over-screen");

const startButton = startScreenElement.querySelector('button');

startButton.addEventListener('click', () => {
    startScreenElement.style.display = 'none';
    gameScreenElement.style.display = 'block'
    game.loop();
});

const tryAgainButton = endScreenElement.querySelector('button');

tryAgainButton.addEventListener('click', () => {
    endScreenElement.style.display = 'none';
    gameScreenElement.style.display = 'block'
    game.loop();
});
