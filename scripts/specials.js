class Spell {
    constructor (gameInstance, x, y){
        this.game = gameInstance;
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 10;
    }

    runLogic() {
        this.y -= 4;
    }

    draw () {
        this.game.context.save();
    
        this.game.context.fillStyle = 'lime';
    
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    
        this.game.context.restore();
      }




}