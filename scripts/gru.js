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
      this.frameX = 0;
      this.frameY = 0;
      this.moving = false;
    }

    jump() {
      if (this.moving === false) {
        this.frameX = 0;
        } else {
          this.frameX = 1;
        }
        
              
    }

    draw () {
      
      this.jump();
      this.game.context.save();
      //this.game.context.fillStyle = 'red';
      //this.game.context.fillRect(this.x, this.y, this.width, this.height);
      this.game.context.drawImage(gruImg, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x-50, this.y-50, this.width * 3, this.height * 3);
      this.game.context.restore(); 
    }

   }
  
  const player = new Player;
  
 
  