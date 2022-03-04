const gruImg = new Image();
gruImg.src = '/images/frog_spritesheet.png';


class Player {
    constructor (gameInstance) {
      this.game = gameInstance;
      this.x = 700;
      this.y = 832.5;
      this.frame = 1;
      this.spriteWidth = 250;
      this.spriteHeight = 250;
      this.width = this.spriteWidth / 5;
      this.height = this.spriteHeight / 5;
    }
    draw () {
      this.frame++;
      this.game.context.save();
      this.game.context.fillStyle = 'red';
      this.game.context.fillRect(this.x, this.y, this.width, this.height);
      this.game.context.drawImage(gruImg, 0, 0, this.spriteWidth, this.spriteHeight, this.x-50, this.y-45, this.width * 3, this.height * 3);
      this.game.context.restore(); 
    }
  }
  
  const player = new Player;
  
 
  