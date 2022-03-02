
const car1 = new Image();
car1.src = '/images/car1.png';
const car2 = new Image();
car2.src = '/images/car2.png';
const car3 = new Image();
car3.src = '/images/car3.png';
const car4 = new Image();
car4.src = '/images/car4.png';
const car5 = new Image();
car5.src = '/images/car5.png';
const car6 = new Image();
car6.src = '/images/car6.png';
const car7 = new Image();
car7.src = '/images/car7.png';

const vehicleImage = [car1, car2, car3, car4, car5, car6, car7];
const vehicleY = [640, 505, 375, 245, 105]
const vehicleX = [0, 100, 200, 300, 400, 500]

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
  
      //this.game.context.fillStyle = 'aqua';
  
      //this.game.context.fillRect(this.x, this.y, this.width, this.height);
         this.game.context.drawImage(this.vehicleImage, this.x, this.y, this.width, this.height);
      this.game.context.restore();
    }
  }

  
