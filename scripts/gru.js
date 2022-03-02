const gruImg = new Image();
gruImg.src = '/images/frog_spritesheet.png';


class Player {
    constructor (gameInstance) {
      this.game = gameInstance;
      this.x = 700;
      this.y = 832.5;
      this.width = 150;
      this.height = 150;
      this.frame = 1;
    }
  
    draw () {
      this.frame++;
      this.game.context.save();
      //this.game.context.fillStyle = 'red';
      //this.game.context.fillRect(this.x, this.y, this.width, this.height);
      this.game.context.drawImage(gruImg, 70, 70, 250, 250, this.x, this.y, this.width, this.height);
      this.game.context.restore(); 
    }
  }
  
  const player = new Player;
  
 
  