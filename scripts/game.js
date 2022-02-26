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
    this.spells = []
  }

  enableControls () {
    window.addEventListener('keydown', (event) => {
      const code = event.code;
      switch (code) {
        case 'ArrowUp':
          this.player.y -= 69.2;
          break;
        case 'ArrowDown':
          this.player.y += 69.2;
          break;
        case 'ArrowRight':
          this.player.x += 69.2;
          break;
        case 'ArrowLeft':
          this.player.x -= 69.2;
          break;
        case 'Space':
          this.fireSpell();
          break;
      }
      
      this.player.x = Clamp(this.player.x, 0, this.canvas.width - this.player.width);
      this.player.y = Clamp(this.player.y, 0, this.canvas.height - this.player.height);
      this.draw();
    });
  }

  fireSpell() {
    const spell = new Spell(this, this.player.x, this.player.y);
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
    if (Math.random() < 0.01){
      this.generateTraffic();
    }
    for (const vehicle of this.traffic){
      vehicle.runLogic();

      const crash = vehicle.checkIntersection(this.player);

      if (crash){
        this.score -=1;
      }
      }
      
    for (const spell of this.spells){
      this.spells.runLogic();
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
  









