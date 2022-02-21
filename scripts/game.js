




class Game {

  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.player = new Player(this);
    this.traffic = [];
    this.enableControls();
  }

  enableControls () {
    window.addEventListener('keydown', (event) => {
      const code = event.code;
      switch (code) {
        case 'ArrowUp':
           this.player.y -= 50;
          drawEverything();
          break;
        case 'ArrowDown':
          this.player.y += 50;
          drawEverything();
          break;
        case 'ArrowRight':
          this.player.x += 50;
          drawEverything();
          break;
        case 'ArrowLeft':
          this.player.x -= 50;
          drawEverything();
          break;
      }
    });
  }
  
}








