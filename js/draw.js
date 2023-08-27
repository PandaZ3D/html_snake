var drawModule = (function () {
  //init paint on canvas
  var bodySnake = function (x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = "2";
    ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  }

  var apple = function (x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.fillStyle = 'red';
    ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
  }

  var scoreText = function () {
    var score_text = "Score: " + score;
    var high_text = "High: " + high;

    ctx.font = "15px Helvetica";
    ctx.fillStyle = 'white';
    ctx.fillText(score_text, 5, h - 5);

    ctx.font = "15px Helvetica";
    ctx.fillStyle = 'white';
    ctx.fillText(high_text, w - 60, h - 5);
  }

  //random methods
  var randCoor = function () {
    return Math.floor((Math.random() * 30) + 1);
  }

  //random color generation
  //https://www.paulirish.com/2009/random-hex-color-code-snippets/
  var randColor = function () {
    //0xffffff = 16777215 
    var n = Math.floor(Math.random() * 16777215).toString(16);
    //check for propetly formatted strings
    for (var i = n.length; i < 6; i++) {
      n = '0' + n;
    }
    // return '#' + n;
    return 'orange';
  }

  //drawing elements
  var drawSnake = function (x, y) {
    var length = 4;
    s = [];
    for (var i = length - 1; i >= 0; i--) {
      s.push({ x: x + i, y: y });
      world[x + i][y] = 1;
      console.log('Mapped snake...');
    }
    return s;
  }

  var paint = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, w, h);

    btn.setAttribute('disabled', true);
    click = true;

    //check snake player
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    // increment position based on direction
    if (direction == 'right') {
      snakeX++;
    }
    else if (direction == 'left') {
      snakeX--;
    }
    else if (direction == 'up') {
      snakeY--;
    } else if (direction == 'down') {
      snakeY++;
    }

    // check for out of bounds
    // check for collision with itself or enemy
    if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize
      || checkCollision(snakeX, snakeY, snake) || checkCollision(snakeX, snakeY, enemy)) {
      //restart game
      btn.removeAttribute('disabled', true);

      click = false;
      score = 0;
      colors.pop();

      console.log('you died!!!');

      ctx.clearRect(0, 0, w, h);
      gameloop = clearInterval(gameloop);
      return;
    }

    // check if we ate an apple
    if (snakeX == food.x && snakeY == food.y) {
      var tail = { x: snakeX, y: snakeY }; //Create a new head instead of moving the tail
      score++;
      if (score > high) {
        high++;
      }
      // FIXME: create new food only knows the current snake position ...
      // not the new position being drawn
      createFood(); //Create new food
      console.log('placing food at: (' + food.x +' ' + food.y+ ') = ' + world[food.x][food.y]);
    } else {
      var tail = snake.pop(); //pops out the last cell
      tail.x = snakeX;
      tail.y = snakeY;
    }
    //The snake can now eat the food.
    snake.unshift(tail); //puts back the tail as the first cell


    //move enemy snake
    var snakeX = enemy[0].x;
    var snakeY = enemy[0].y;

    pathStart = [snakeX, snakeY];
    pathEnd = [food.x, food.y];

    currentPath = findPath(world, pathStart, pathEnd, 'Manhattan');

    enemyDirection(currentPath);

    if (edir == 'right') {
      snakeX++;
    }
    else if (edir == 'left') {
      snakeX--;
    }
    else if (edir == 'up') {
      snakeY--;
    } else if (edir == 'down') {
      snakeY++;
    }

    if (snakeX == -1) {
      edir = "down";
      snakeX++;
    } else if (snakeX == w / snakeSize) {
      edir = "up";
      snakeX--;
    } else if (snakeY == -1) {
      edir = "left";
      snakeY++;
    } else if (snakeY == h / snakeSize) {
      edir = "right";
      snakeY--;
    }

    // FIXME: restarts game if AI hits player
    // it should respawn the snake elsewhere
    if (checkCollision(snakeX, snakeY, snake) || checkCollision(snakeX, snakeY, enemy)) {
      // restart game
      btn.removeAttribute('disabled', true);

      click = false;
      colors.pop();

      console.log('you won, enemy died!!');

      ctx.clearRect(0, 0, w, h);

      // draw on the screen
      var end_text = "Player Wins!!!";  
      ctx.font = "40px Helvetica";
      ctx.fillStyle = 'white';
      ctx.fillText(end_text, 40, h/2);
  
      // while (true) {};

      gameloop = clearInterval(gameloop);
      return;
    }

    if (snakeX == food.x && snakeY == food.y) {
      console.log("enemy ate food");
      var tail = { x: snakeX, y: snakeY }; //Create a new head instead of moving the tail
      createFood(); //Create new food
      console.log('placing food at: (' + food.x +' ' + food.y+ ') = ' + world[food.x][food.y]);
    } else {
      tail = enemy.pop();
      world[tail.x][tail.y] = 0;
      tail.x = snakeX;
      tail.y = snakeY;
    }
    //The snake can now eat the food.
    enemy.unshift(tail); //puts back the tail as the first cell
    world[tail.x][tail.y] = 1;


    //draw snakes
    for (var i = 0; i < snake.length; i++) {
      bodySnake(snake[i].x, snake[i].y, colors[0]);
    }

    for (var i = 0; i < enemy.length; i++) {
      bodySnake(enemy[i].x, enemy[i].y, colors[1]);
    }

    apple(food.x, food.y);
    scoreText();
  }

  //food initializer
  var createFood = function () {
    food = {
      x: randCoor(),
      y: randCoor()
    }

    //check for collision using world array
    if (world[food.x][food.y] == 1) {
      console.log('RETRY food spawn');
      createFood();
    }
  }

  //position and movement
  var checkCollision = function (x, y, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].x === x && array[i].y === y)
        return true;
    }
    return false;
  }

  var enemyDirection = function (path) {
    //console.log('Finding enemy direction...');

    var currentPos = path[0];
    var nextPos = path[1];

    var dir = "up";

    var x = 0;
    var y = 1;

    //check if horizontal movement
    //console.log('Checking horizontal...');
    if (currentPos[y] == nextPos[y]) {
      //console.log('Checking up...');
      //check for left or right
      if (nextPos[x] < currentPos[x]) {
        dir = "left";
      }
      //console.log('Checking down...');
      if (nextPos[x] > currentPos[x]) {
        dir = "right";
      }
    } //check if vertical movement 
    //console.log('Checkin vertical...');
    if (currentPos[x] == nextPos[x]) {
      //console.log('Checkin up...');
      //check for up or down
      if (nextPos[y] < currentPos[y]) {
        dir = "up";
      }
      //console.log('Checkin down...');
      if (nextPos[y] > currentPos[y]) {
        dir = "down";
      }
    }
    edir = dir;
  }

  var randPos = function () {
    var snakeX = randCoor();
    var snakeY = randCoor()

    if (world[snakeX][snakeY] == 1) {
      return randPos();
    }
    else {
      return { x: snakeX, y: snakeY };
    }
  }

  var randSnake = function () {
    var snek = [];
    var pos = randPos();
    var length = 4;
    for (var i = length - 1; i >= 0; i--) {
      if (world[pos.x + i][pos.y] == 1) {
        console.log("Reinit snake");
        return randSnake();
      }
      console.log("Add snake " + pos.x + i + "," + pos.y);
      snek.push({ x: pos.x + i, y: pos.y })
    }
    return snek;
  }

  var mapSnake = function (snek) {
    for (var i = 0; i < snek.length; i++) {
      var pos = snek[i];
      world[pos.x][pos.y] = 1;
    }
  }

  var init = function () {
    //initailize world
    initWorld(world, w / snakeSize, h / snakeSize);
    //initialize snake
    direction = "down";
    snake = drawSnake(0, 0);
    //initialize enemy
    edir = "right";
    colors.push(randColor());
    enemy = randSnake();
    mapSnake(enemy);
    //generate food
    createFood();
    //main game
    gameloop = setInterval(paint, 80);
  }


  return {
    init: init
  };


}());