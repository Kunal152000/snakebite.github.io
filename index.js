// constants and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("foodeat.wav");
const gameEnd = new Audio("gameend.wav");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 5;
let Pause = false;
let lastPaintTime = 0;
// position of snake head when game will start
let snakeArr = [{ x: 13, y: 15 }];
// position of food
let food = { x: 19, y: 7 };
let score = 0;
let hiscore;
let hiscoreval;
// functions
// main loop of game 
function main(ctime) {
  window.requestAnimationFrame(main);
  //  console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
 
}
function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if u bump into the wall
  if (snake[0].x >= 20 || snake[0].x <= 0 ||snake[0].y >= 20 ||snake[0].y <= 0 ) {
    return true;
  }
}

function gameEngine() {
  // first work: updating the snake array.

  if (isCollide(snakeArr)) {
    /* when  the snake will collide with any of the wall all this function will be called */
    musicSound.pause();
    gameEnd.play();
    alert("GAME OVER press any key to continue");
    inputDir = { x: 0, y: 0 };
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
    speed = 5;
    scorebox.innerHTML='Score : 0'; 
  }

  // when the food is eaten by snake , increase score and generate new food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    for(let  i = 3; i<=score ; i+=4)
    {
      if(score==i+1)
      {
        speed+=3;
      }
    }
   
    if(score>hiscoreval)
    {
      hiscoreval = score; 
   localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
   hiscorebox.innerHTML = 'Hi score :'+ hiscoreval; 
    }

    scorebox.innerHTML='Score :'+ score; 
    // this line is to increase the size of snake in the directiion in which it is moving
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });

    // this line is to generate random food
    let a = 1;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // second work: display snake and food
  // Display the snake
  board.innerHTML =""; /* no value  is provided so that nothing gets added to head of the snake */
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div"); /* to create a new element*/
    snakeElement.style.gridRowStart = e.y; /* to add css of grid row */
    snakeElement.style.gridColumnStart = e.x; /* to add css of grid column*/
    if (index == 0) {
      snakeElement.classList.add("head");
    } else if (index > 0) {
      snakeElement.classList.add("snake");
    }
    board.appendChild( snakeElement); /*appendChild() method adds an item to the end of a node*/
  });

  //   Display the food
  foodElement = document.createElement("div"); /* to create a new element*/
  foodElement.style.gridRowStart = food.y; /* to add css of grid row */
  foodElement.style.gridColumnStart = food.x; /* to add css of grid column*/
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// logic
// window.requestAnimationFrame is used instead of set time interval because, it gives highest fps and can render again and again,for more visit stackoverflow
 hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "Hi Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      musicSound.play();
      inputDir = { x: 0, y: 1 }; /*game will start*/
      moveSound.play();
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      moveSound.play();
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      moveSound.play();
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      moveSound.play();
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});

