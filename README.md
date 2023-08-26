![HTML](https://img.shields.io/badge/HTML5-Canvas-orange.svg) ![Javascript](https://img.shields.io/badge/Javascript-working-brightgreen.svg)

# HTML5 Snake Game

**Name:** Allen Aboytes

**Code:** Javascript, HTML5 Canvas

**Created:** August 2017
--------------------------------------

![Snake](https://github.com/PandaZ3D/Canvas-Games/blob/master/Snake/img/snake.png)

**8-bit Snake Game**

This game is a simple snake game made with HTML5's Canvas element. The snake can be thought of as an array segments that move only when the last element is pushed to the front. The game has a running high score, and a current score. The home page displays a game cover with a round start button. 

**HTML Snake Gameplay**

![Home](https://github.com/PandaZ3D/Canvas-Games/blob/master/Snake/home.png)

![Play](https://github.com/PandaZ3D/Canvas-Games/blob/master/Snake/play.png)

**Working On...**

* Esc exit code
* AI mode
* Pop up menu
* Random Colors
* Snek color choice

**For working code**

```
var drawModule = (function () { 

  var bodySnake = function(x, y) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = "2";
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var apple = function(x, y) {
        ctx.fillStyle = 'white';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }

  var scoreText = function() {
    var score_text = "Score: " + score;
    var high_text = "High: " + high;

    ctx.font = "15px Helvetica";
    ctx.fillStyle = 'white';
    ctx.fillText(score_text, 5, h-5);

    ctx.font = "15px Helvetica";
    ctx.fillStyle = 'white';
    ctx.fillText(high_text, w-60, h-5);
  }

  var drawSnake = function() {
      var length = 4;
      snake = [];
      for (var i = length-1; i>=0; i--) {
          snake.push({x:i, y:0});
      }  
  }
    
  var paint = function(){
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, w, h);

      btn.setAttribute('disabled', true);
      click = true;

      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      if (direction == 'right') { 
        snakeX++; }
      else if (direction == 'left') { 
        snakeX--; }
      else if (direction == 'up') { 
        snakeY--; 
      } else if(direction == 'down') { 
        snakeY++; }

      if (snakeX == -1 || snakeX == w/snakeSize || snakeY == -1 || snakeY == h/snakeSize || checkCollision(snakeX, snakeY, snake)) {
          //restart game
          btn.removeAttribute('disabled', true);
          click = false;
          
          score = 0;
          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
          return;          
        }
        
        if(snakeX == food.x && snakeY == food.y) {
          var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
          score ++;
          if(score > high) {
            high++;
          }
          createFood(); //Create new food
        } else {
          var tail = snake.pop(); //pops out the last cell
          tail.x = snakeX; 
          tail.y = snakeY;
        }
        //The snake can now eat the food.
        snake.unshift(tail); //puts back the tail as the first cell

        for(var i = 0; i < snake.length; i++) {
          bodySnake(snake[i].x, snake[i].y);
        } 
        
        apple(food.x, food.y); 
        scoreText();
  }

  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;
      
        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 30) + 1);
          food.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  }

  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }

  var init = function(){
      direction = 'down';
      drawSnake();
      createFood();
      gameloop = setInterval(paint, 80);
  }


    return {
      init : init
    };

    
}());
```