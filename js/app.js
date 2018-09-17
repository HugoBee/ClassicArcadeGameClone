// Enemies element
var Enemy = function(x,y, speed) {
    this.x = x;
    this.y = y + 58;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.screenboundary = this.step * 5;
    this.resetenemy = -this.step;
};

// Function used to move the enemy character across the screen
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x < this.screenboundary) {
      this.x += this.speed * dt; //Increases the speed of the enemy
    }
    else {
      this.x = this.resetenemy; //Resets the enemy to begining of the lane and loops
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Defining the Hero class - This will include; Constructor; Properties of the Hero - position of the Hero x and y coordinates on the board; The sprite image that will be loaded;
// Methods - will check for collision with the enemy class based on x and y coordinates on the game board and a win condition
// Render - Function for drawing the sprite on the game board based on x and y coordinates
// Keyboard Input - The handlers that will update the sprite's location based on the x and y coordinates
// Reset Hero - Resetting the sprite to the starting x and y coordinates

// Hero class
class hero {
  constructor() {
    this.sprite = 'images/char-horn-girl.png';
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = this.jump * 4 + 58;
    this.x = this.startX;
    this.y = this.startY;
    this.wingame = false;
  }

// This method will draw the  hero sprite on the current x and y coordinate
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// This string will move the hero sprite according to what keyboard key is pressed
/**
  *@param {string} input
  */
  handleInput(input) {
    switch(input) {
      case 'left':
          if (this.x > 0) {
              this.x -= this.step;
          }
        break;
      case 'up':
          if (this.y > this.jump) {
              this.y -= this.jump;
          }
            break;
      case 'right':
          if (this.x < this.step * 4) {
              this.x += this.step;
          }
        break;
      case 'down':
          if (this.y < this.jump * 4) {
              this.y += this.jump;
          }
        break;
      }
    }
//This method will check for collisions between the hero and the enemy
  update () {
    for(let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
          this.reset();
      }
    }
// Check for win condition
      if(this.y === 58) {
        this.wingame = true;
      }
    }
//This method will reset the Hero to its starting place
  reset() {
    this.y = this.startY;
    this.x = this.startX;
    }
}

// Player and bug constants used to initialize the hero and enemies
const player = new hero();
const bugone = new Enemy(-101, 0, 200);
const bugtwo = new Enemy(-101, 83, 300);
const bugthree = new Enemy((-101*2.5), 83, 300);
const bugfour = new Enemy((-101*5.5), 83, 400);
const bugfive = new Enemy((-101*2.5), 163, 300);
const bugsix = new Enemy((-101*2.5), 163, 500);
const allEnemies = []; // Array to hold our bug Enemies
allEnemies.push(bugone,bugtwo,bugthree,bugfour,bugfive,bugsix);




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
