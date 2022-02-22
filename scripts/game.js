class Game {

  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = canvas.width;
    this.canvas.height = canvas.height;
    this.context = canvas.getContext("2d");
    this.player = new Player(this);
    this.vehicle = new Vehicle(this);
    this.traffic = [];
    this.enableControls();
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
          
      }
      
      this.player.x = Clamp(this.player.x, 0, this.canvas.width - this.player.width);
      this.player.y = Clamp(this.player.y, 0, this.canvas.height - this.player.height);
      this.draw();
    });
  }

  generateTraffic () {
    const vehicleSpeed = Math.random() + 0.5;
    const vehicleX = this.canvas.width;
    const vehicleY = Math.random() * this.canvas.height - 75;
    const vehicle = new Vehicle (this, vehicleX, vehicleY, vehicleSpeed);
    this.traffic.push(vehicle);
  }

  runLogic () {
    if (Math.random() < 0.01) {
      this.generateTraffic();
    }
    for (const vehicle of this.traffic) {
      vehicle.runLogic();
      // If enemy and player are intersecting,
      // remove enemy from array of enemies
      const enemyAndPlayerAreIntersecting = vehicle.checkIntersection(this.player);
      const enemyIsOutOfBounds = vehicle.x + vehicle.width < 0;
      if (enemyAndPlayerAreIntersecting || enemyIsOutOfBounds) {
        const indexOfEnemy = this.traffic.indexOf(vehicle);
        this.traffic.splice(indexOfEnemy, 1);
        this.score -= 10;
      }
    }
    for (const spell of this.spells) {
      spell.runLogic();
      for (const enemy of this.enemies) {
        // If enemy and spell are intersecting,
        // remove enemy from array of enemies
        // and remove spell from array of spells
        const spellAndEnemyAreIntersecting = enemy.checkIntersection(spell);
        if (spellAndEnemyAreIntersecting) {
          const indexOfEnemy = this.enemies.indexOf(enemy);
          this.enemies.splice(indexOfEnemy, 1);
          const indexOfSpell = this.spells.indexOf(spell);
          this.spells.splice(indexOfSpell, 1);
          this.score += 5;
        }
      }
      if (spell.x - spell.width > this.canvas.width) {
        const indexOfSpell = this.spells.indexOf(spell);
        this.spells.splice(indexOfSpell, 1);
      }
    }
  }

  draw () {
    this.context.clearRect(0, 0, 1500, 900);
    for (const vehicle of this.traffic) {
      enemy.draw();
    }
    this.player.draw();
    this.vehicle.draw();
    
    
  }

}

  function Clamp(n, min, max) {
    return Math.min(Math.max(n, min), max);
  }
  









