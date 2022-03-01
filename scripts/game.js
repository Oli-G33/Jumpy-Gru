const croak = new Audio ('/sounds/croak.wav');

class Game {

  constructor(canvas, screens) {
    this.canvas = canvas;
    this.canvas.width = canvas.width;
    this.canvas.height = canvas.height;
    this.context = canvas.getContext("2d");
    this.screen = screens;
    this.running = false;  
    this.enableControls();    
    }

    
  start() {
    this.running = true;
    this.lives = 3;
    this.player = new Player(this);
    this.traffic = [];
    console.log(this.traffic);
    this.Lane2 = [];
    this.spells = [];
    console.log(this.spells);

    this.displayScreen('game')
    croak.play();
    this.loop();
  }

  displayScreen(name) {
    
    for (let screenName in this.screen){
      this.screen[screenName].style.display = 'none'
    }

    this.screen[name].style.display = '';
   
  }

  lose() {
    if (this.lives <= 0) {
    this.running = false;
    this.displayScreen('end');
    }
  }

  reset(){

  };


  win() {
        this.running = false;
        this.displayScreen('win');
    
  };

  enableControls () {
    window.addEventListener('keydown', (event) => {
      if (this.running) {

      
      const code = event.code;
      switch (code) {
        case 'ArrowUp':
          event.preventDefault();
          this.player.y -= 69.2;
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.player.y += 69.2;
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.player.x += 69.2;
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.player.x -= 69.2;
          break;
        case 'Space':
          event.preventDefault();
          this.fireSpell();
          break;
      }
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
      if (this.running) {
      this.loop();
      }
    });
  }

  /*reset(){
    if (this.lives)
  }*/

  runLogic () {
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
    if (Math.random() < 0.01){
      this.generateTraffic();
    }

    for (const vehicle of this.traffic){
      vehicle.runLogic();

      const crash = vehicle.checkIntersection(this.player);
      const outOfBounds = vehicle.x - vehicle.width > this.canvas.width;
      const splatSound = new Audio ('/sounds/splat.wav');
      
       if (crash){
         this.lives -= 1;
         splatSound.play();
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

    if (this.lives <= 0 ) {
      
      this.lose(); 

    }
      if(this.player.y < 50) {
      this.win();

  }

  
}


  drawLives () {
    this.context.font = '24px monospace';
    this.context.fillText(`Lives: ${this.lives}`, 5, 30);
  }
  
  draw () {
    this.context.clearRect(0, 0, 1500, 900);
    this.player.draw();
    console.log(this.player.x, this.player.y);
    this.drawLives();
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
  









