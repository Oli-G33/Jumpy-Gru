class Player {
    constructor (gameInstance) {
      this.game = gameInstance;
      this.x = 300;
      this.y = 150;
      this.width = 25;
      this.height = 25;
    }
  
    draw () {
      this.game.context.save();
      this.game.context.fillStyle = 'red';
      this.game.context.fillRect(this.x, this.y, this.width, this.height);
      this.game.context.restore();
    }
  }
  
  const player = new Player (0,0);
  
 
  