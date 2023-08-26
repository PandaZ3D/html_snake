//arrow key codes: 37, 38, 39, 40 in clockwise
//dir: u, d, r, l
(function (window, document, drawModule, undefined) {

  var btn = document.getElementById('btn');
  btn.addEventListener("click", function(){ drawModule.init();});

  document.onkeydown = function(event) {

        keyCode = window.event.keyCode; 
        keyCode = event.keyCode;

        switch(keyCode) {
          case 13:
            if(click == false) {
              drawModule.init();
              btn.setAttribute('disabled', true);
              click = true;
            }
            break;
          case 27:
            btn.removeAttribute('disabled', true);
            click = false;
            score = 0;
            colors.pop();
            ctx.clearRect(0,0,w,h);
            gameloop = clearInterval(gameloop);
            break;
          case 37: 
            if (direction != 'right') {
              direction = 'left';
            }
            console.log('left'); 
            break;

          case 39:
            if (direction != 'left') {
            direction = 'right';
            console.log('right');
            }
            break;

          case 38:
            if (direction != 'down') {
            direction = 'up';
            console.log('up');
            }
            break;

          case 40:
            if (direction != 'up') {
            direction = 'down';
            console.log('down');
            }
            break;
        }
      }


})(window, document, drawModule);
