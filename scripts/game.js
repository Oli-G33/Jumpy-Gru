class Game {

  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = canvas.width;
    this.canvas.height = canvas.height;
    this.context = canvas.getContext("2d");
    this.player = new Player(this);
    this.score = 3;
    this.enableControls();
    this.traffic = []
    console.log(this.traffic);
    this.spells = []
    console.log(this.spells);
  }

  enableControls () {
    window.addEventListener('keydown', (event) => {
      const code = event.code;
      switch (code) {
        case 'ArrowUp':
          this.player.y -= 69.2;
          event.preventDefault();
          break;
        case 'ArrowDown':
          this.player.y += 69.2;
          event.preventDefault();
          break;
        case 'ArrowRight':
          this.player.x += 69.2;
          event.preventDefault();
          break;
        case 'ArrowLeft':
          this.player.x -= 69.2;
          event.preventDefault();
          break;
        case 'Space':
          this.fireSpell();
          event.preventDefault();
          break;
      }
      
      this.player.x = Clamp(this.player.x, 0, this.canvas.width - this.player.width);
      this.player.y = Clamp(this.player.y, 0, this.canvas.height - this.player.height);
      this.draw();
    });
  }

  fireSpell() {
    const spell = new Spell(this, this.player.x + this.player.width / 2, this.player.y);
    this.spells.push(spell);
  }

  generateTraffic () {
    const trafficY = Math.random() * this.canvas.height - 75;
    const trafficX = this.canvas.width - this.canvas.width;
    const vehicle = new Vehicle(this, trafficX, trafficY, (Math.random() + 1.5));
    this.traffic.push(vehicle);
  }

  loop () {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      this.loop();
    });
  }

  runLogic () {
    /*
    if (this.lifes <= 0) {
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
    if (Math.random() < 0.01){
      this.generateTraffic();
    }

    for (const vehicle of this.traffic){
      vehicle.runLogic();

      const crash = vehicle.checkIntersection(this.player);
      const outOfBounds = vehicle.x - vehicle.width > this.canvas.width;
      
       if (crash){
         this.score -=1;
      }

       if (outOfBounds){
        const indexOfVehicle= this.traffic.indexOf(vehicle);
        this.traffic.splice(indexOfVehicle, 1);
      }
      }

    
      for (const spell of this.spells) {
      spell.runLogic();

      for (const vehicle of this.traffic) {

          const crash = vehicle.checkIntersection(spell);
          
        
              if (crash) {
                const indexOfVehicle= this.traffic.indexOf(vehicle);
                this.traffic.splice(indexOfVehicle, 1);    
                const indexOfSpell =this.spells.indexOf(spell);
                this.spells.splice(indexOfSpell,1)
      }

              
             if (spell.y + spell.height < 0) {
              const indexOfSpell =this.spells.indexOf(spell);
              this.spells.splice(indexOfSpell,1)
             }
    }
  }
}


  drawScore () {
    this.context.font = '24px monospace';
    this.context.fillText(`Lifes: ${this.score}`, 5, 30);
  }
  
  draw () {
    this.context.clearRect(0, 0, 1500, 900);
    this.player.draw();
    this.drawScore();
    for (const vehicle of this.traffic){
      vehicle.draw();
    }  
    for (const spell of this.spells){
      spell.draw();
    }  
  }
  }




  function Clamp(n, min, max) {
    return Math.min(Math.max(n, min), max);
  }
  









