const canvas = document.querySelector('canvas');

const startScreenElement = document.getElementById("start-screen");
const gameScreenElement = document.getElementById("game-screen");
const endScreenElement = document.getElementById("game-over-screen");
const winScreenElement = document.getElementById("win-screen");

const screenElements = {
    start: startScreenElement,
    game: gameScreenElement,
    end: endScreenElement,
    win: winScreenElement
   }

const game = new Game(canvas, screenElements);


const startButton = startScreenElement.querySelector('button');

startButton.addEventListener('click', () => {
    game.displayScreen('game');
    game.start();
});

const tryAgainButton = endScreenElement.querySelector('button');

tryAgainButton.addEventListener('click', () => {
    game.displayScreen('game');
    game.start();
});

const playAgainButton = winScreenElement.querySelector('button');

playAgainButton.addEventListener('click', () => {
    game.displayScreen('game');
    game.start();
});
