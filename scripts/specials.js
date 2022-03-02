class Fly {
    constructor (gameInstance, x, y){
        this.game = gameInstance;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    checkIntersection (element) {
      
        return (    
  
          element.x + element.width > this.x &&        
          element.x < this.x + this.width &&       
          element.y + element.height > this.y &&
          element.y < this.y + this.height
          
        );
      }
    

    draw () {

        const flyImg = new Image();
        playerImg.src = '../images/fly.jpg';
        playerImg.onload = () => {
          context.drawImage(flyImg, Math.random() * 1500 + 1, Math.random() * 900 + 1, this.width, this.height);
          
        };
      }

      }

      const fly = new Fly;