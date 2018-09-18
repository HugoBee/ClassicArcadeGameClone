// Enemies function
var Enemy = function(x,y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};


// Function used to move the enemy character across the screen
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
      this.x += this.speed * dt; //Increases the speed of the enemy
//Resets the enemy to begining of the lane and loops
      if (this.x > 550) {
          this.x = -100;
          this.speed = 100 + Math.floor(Math.random() * 512);
        }
//This method will check for collisions between the enemy and the hero
      if (player.x < this.x + 60 &&
          player.x + 37 > this.x &&
          player.y < this.y + 25 &&
          30 + player.y > this.y) {
          player.x = 200;
          player.y = 380;
      }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Defining the Hero class - This will include; 3 methods render (), update () and a handleInput key listener for the keyboard input
// Render - Function for drawing the sprite on the game board based on x and y coordinates
// Keyboard Input - The handlers that will update the sprite's location based on the x and y coordinates
// Reset Hero - Resetting the sprite to the starting x and y coordinates

// Hero  (player class)
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
    this.wingame = false;
};


// This method will draw the  hero sprite on the current x and y coordinate
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// This function will create the wall boundaries and determine the win condition
Player.prototype.update = function() {
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for hero win condition
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        this.wingame = true;
      }
    };


// This method will move the hero sprite according to what keyboard key is pressed
  Player.prototype.handleInput = function(keyPress) {
      switch (keyPress) {
          case 'left':
              this.x -= this.speed + 50;
              break;
          case 'up':
              this.y -= this.speed + 30;
              break;
          case 'right':
              this.x += this.speed + 50;
              break;
          case 'down':
              this.y += this.speed + 30;
              break;
      }
  };


// Player and bug constants used to initialize the hero and enemies
var allEnemies = []; // Array to hold our bug Enemies


// Position where the enemies will be created on the y axis
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});


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
