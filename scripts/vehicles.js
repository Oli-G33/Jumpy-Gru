
const basicEnemy = new Image();
basicEnemy.src = '/images/enemy-email.png';
const mediumEnemy = new Image();
mediumEnemy.src = '/images/enemy-meeting.png';
const advancedEnemy = new Image();
advancedEnemy.src = '/images/enemy-boss.png';

const vehicleImage = [basicEnemy, mediumEnemy, advancedEnemy];
const vehicleY = [700,600, 500, 400, 300]

class Vehicle {
    constructor (gameInstance, x, y, speed, vehicleImage) {
      this.game = gameInstance;
      this.x = x;
      this.y = y;
      this.width = 150;
      this.height = 75;
      this.speed = speed;
      this.vehicleImage = vehicleImage;
    }
  
    checkIntersection (element) {
      
      return (    

        element.x + element.width > this.x &&        
        element.x < this.x + this.width &&       
        element.y + element.height > this.y &&
        element.y < this.y + this.height
        
      );
    }
  
    runLogic () {
      this.x += this.speed;
    }
  
    draw () {
      this.game.context.save();
  
      this.game.context.fillStyle = 'aqua';
  
      this.game.context.fillRect(this.x, this.y, this.width, this.height);
          // this.game.context.drawImage(Img1, this.x, this.y, this.width, this.height);
      this.game.context.restore();
    }
  }

  
