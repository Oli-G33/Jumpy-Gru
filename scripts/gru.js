class Player {
    constructor (gameInstance) {
      this.game = gameInstance;
      this.x = 700;
      this.y = 832.5;
      this.width = 70;
      this.height = 69.2;
    }
  
    draw () {

      this.game.context.save();
      this.game.context.fillStyle = 'red';
      this.game.context.fillRect(this.x, this.y, this.width, this.height);
      this.game.context.restore(); 
    }
  }
  
  const player = new Player;
  
 
  