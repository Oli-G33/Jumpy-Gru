const croak = new Audio('/sounds/croak.wav');
const splatSound = new Audio('/sounds/splat.wav');
const backgroundMusic = new Audio('/sounds/backgroundMusic.mp3')

class Game {
  constructor(canvas, screens) {
    this.canvas = canvas;
    this.canvas.width = canvas.width;
    this.canvas.height = canvas.height;
    this.context = canvas.getContext('2d');
    this.screen = screens;
    this.running = false;
    this.timer = 0;
    this.player = new Player(this);
    this.enableControls();
      }

  countDown() {
    // setTimeout(() => {console.log("this is the third message")setTimeout(() => {console.log("this is the third message")setTimeout(() => {console.log("this is the third message")}, 1000);}, 1000);}, 1000);
  }

  start() {
    this.displayScreen('game');
    console.log("startGame");
    this.gameStart = Date.now();
    this.running = true;
   // this.enableControls();
    this.lives = 3;
    this.traffic = [
      new Vehicle(this, 430, vehicleY[0], 2, vehicleImage[1]),
      new Vehicle(this, 400, vehicleY[1], 1, vehicleImage[0]),
      new Vehicle(this, 0, vehicleY[2], 1.5, vehicleImage[2]),
      new Vehicle(this, 350, vehicleY[3], 1, vehicleImage[2]),
      new Vehicle(this, 300, vehicleY[4], 2, vehicleImage[3])
    ];
    backgroundMusic.play();

    this.spells = [];

    
    croak.play();
    this.loop();
  }

  displayScreen(name) {
    for (let screenName in this.screen) {
      this.screen[screenName].style.display = 'none';
    }

    this.screen[name].style.display = '';
  }

  lose() {
    if (this.lives <= 0) {
      this.running = false;
      this.displayScreen('end');
    }
  }

  reset() {
    this.gameStart = Date.now();
    this.traffic = [
      new Vehicle(this, 200, vehicleY[0], 2, vehicleImage[1]),
      new Vehicle(this, 400, vehicleY[1], 1, vehicleImage[0]),
      new Vehicle(this, 500, vehicleY[2], 1.5, vehicleImage[2]),
      new Vehicle(this, 430, vehicleY[3], 1, vehicleImage[2]),
      new Vehicle(this, 400, vehicleY[4], 2, vehicleImage[3])
    ];
    this.lives -= 1;
    this.player.x = 700;
    this.player.y = 832.5;
    backgroundMusic.play();
    this.timer = 0;
    

  }

  win() {
    this.running = false;
    this.displayScreen('win');
    this.player.x = 700;
    this.player.y = 832.5;
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      if (this.running && this.timer > 4000) {
        const code = event.code;
        switch (code) {
          case 'ArrowUp':
            event.preventDefault();
            this.player.y -= 50;
            this.player.moving = true;
            this.player.frameX = 1;
            this.player.frameY = 0;
            // if (this.player.moving === false) this.player.frameX = 1;
            // if (this.player.frameX === 1) this.player.frameX === 0;
            break;

          case 'ArrowDown':
            event.preventDefault();
            this.player.y += 50;
            this.player.moving = true;
            this.player.frameY = 3;
            // if (this.player.moving === false) this.player.frameX = 1;
            //if (this.player.frameX === 1) this.player.frameX === 0;
            break;

          case 'ArrowRight':
            event.preventDefault();
            this.player.x += 50;
            this.player.moving = true;
            this.player.frameY = 1;
            //if (this.player.moving === false) this.player.frameX = 1;
            //if (this.player.frameX === 1) this.player.frameX === 0;
            break;

          case 'ArrowLeft':
            event.preventDefault();
            this.player.x -= 50;
            this.player.moving = true;
            this.player.frameY = 2;
            //if (this.player.moving === false) this.player.frameX = 1;
            //if (this.player.frameX === 1) this.player.frameX === 0;
            break;

        }


      }

      this.player.x = Clamp(
        this.player.x,
        0,
        this.canvas.width - this.player.width
      );
      this.player.y = Clamp(
        this.player.y,
        0,
        this.canvas.height - this.player.height
      );
      this.draw();
    });

    window.addEventListener('keyup', (event) => {
        if (this.running && this.timer > 4000) {
          const code = event.code;
          switch (code) {
            case 'ArrowUp':
              event.preventDefault();
            
              this.player.moving = false;
              this.player.frameX = 1;
              this.player.frameY = 0;
              // if (this.player.moving === false) this.player.frameX = 1;
              // if (this.player.frameX === 1) this.player.frameX === 0;
              break;
  
            case 'ArrowDown':
              event.preventDefault();
             
              this.player.moving = false;
              this.player.frameY = 3;
              // if (this.player.moving === false) this.player.frameX = 1;
              //if (this.player.frameX === 1) this.player.frameX === 0;
              break;
  
            case 'ArrowRight':
              event.preventDefault();
            
              this.player.moving = false;
              this.player.frameY = 1;
              //if (this.player.moving === false) this.player.frameX = 1;
              //if (this.player.frameX === 1) this.player.frameX === 0;
              break;
  
            case 'ArrowLeft':
              event.preventDefault();
              
              this.player.moving = false;
              this.player.frameY = 2;
              //if (this.player.moving === false) this.player.frameX = 1;
              //if (this.player.frameX === 1) this.player.frameX === 0;
              break;
  
          }
  
  
        }
  
        
        this.draw();
      });
  }



  generateTraffic(y) {
    const trafficY = Math.floor(Math.random() * 5);
    const trafficX = 0;
    const speed = Math.random() + 2;
    const carRNG = Math.floor(Math.random() * 7);
    const vehicle = new Vehicle(this, trafficX, y, 1, vehicleImage[carRNG]);
    this.traffic.push(vehicle);
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      if (this.running) {
        this.loop();
      }
    });
  }

  runLogic() {
    this.timer = Date.now() - this.gameStart;

    for (const vehicle of this.traffic) {
      if (vehicle.x === 450) {
        this.generateTraffic(vehicle.y);
      }
      vehicle.runLogic();

      const crash = vehicle.checkIntersection(this.player);
      const outOfBounds = vehicle.x - vehicle.width > this.canvas.width;

      if (crash) {
        this.reset();
        splatSound.play();
      }

      if (outOfBounds) {
        const indexOfVehicle = this.traffic.indexOf(vehicle);
        this.traffic.splice(indexOfVehicle, 1);
      }
    }

    if (this.lives <= 0) {
      this.lose();
    }
    if (this.player.y < 50) {
      this.win();
    }

    /*
    if (this.lives <= 0) {
      // Reset method re-initializes player in starting position
      // sets lives to starting value
      // empties enemies array
      // and so on
      this.reset()
    }
    */
    /*
   Check if player has reached this.player.y < 50
   if so, you win,
   winning calls this.reset() and makes the speed of cars
   and number of cars increment
   */
  }

  drawTimer() {
    const seconds = 4 - Math.floor(this.timer / 1000);
    const message = seconds > 0 ? seconds : 'Go!';
    this.context.save();
    this.context.fillStyle = "limegreen"
    this.context.font = '64px monospace';
    this.context.fillText(message, 700, this.canvas.height / 2);
    console.log(message);
    this.context.restore();
  }

  drawLives() {
    this.context.save();
    this.context.fillStyle = "white"
    this.context.font = '36px monospace';
    this.context.fillText(`Lives: ${this.lives}`, 5, 30);
    this.context.restore();
  }

  draw() {
    this.context.clearRect(0, 0, 1500, 900);
    this.player.draw();

    this.drawLives();
    for (const vehicle of this.traffic) {
      vehicle.draw();
    }
    for (const spell of this.spells) {
      spell.draw();
    }
    if (this.timer < 5000) {
      this.drawTimer();
    }
  }
}

function Clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}
