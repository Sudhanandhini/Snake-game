const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scorevalue');

// const WIDTH = gameBoard.width;
// const HEIGTH = gameBoard.heigth;

 const UNIT = 25;
 let foodX;
 let foodY;

 let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
 ];

 let xVel = 25;
 let yVel = 0;
 let score = 0;
 let active = true;
 let started = false;

 window.addEventListener('keydown',keyPress)

startGame();

function startGame() {

    context.fillStyle = '#212121';
    context.fillRect(0,0,500,500);
    // fill rectangle is function and x, y, width,height.....

     createFood();
     displayFood();
     displaySnake();
    // moveSnake();
    // clearBoard();
    // displaySnake();

   

}

function clearBoard(){
    context.fillStyle = '#212121';
    context.fillRect(0,0,500,500);
}

function createFood(){
    foodX = Math.floor(Math.random()*500/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*500/UNIT)*UNIT;
}

function displayFood() {
    context.fillStyle = 'red';
    context.fillRect(foodX,foodY,UNIT,UNIT);
}

function displaySnake(){
    context.fillStyle = 'aqua';
    context.strokeStyle = 'black';
    snake.forEach((snakePart) =>{
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT)
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)
    })
}

function moveSnake(){
    const head = {x:snake[0].x+xVel, y:snake[0].y+yVel }
    snake.unshift(head);
    if(snake[0].x==foodX && snake[0].y==foodY ){
        score += 1; 
        scoreText.textContent = score;
        createFood();
    }
    else
        snake.pop();
    
       
}

function nextTick(){
    if(active){
        setTimeout(()=>{
            clearBoard();
            displayFood();
            moveSnake();
            displaySnake();
            checkGameOver();
            nextTick();
        },200)
    }
    else{
        clearBoard();
        context.font = "bold 50px serif";
        context.fillStyle = "white";
        context.textAlign = "center" ;
        context.fillText("Game Over!!", 500/2,500/2 )
    }
   
}

function keyPress(event){
    if(!started){
        started = true;
        nextTick();
    }
     const LEFT = 37;
     const UP = 38;
     const RIGHT = 39;
     const DOWN = 40;

     switch(true){
        case(event.keyCode==LEFT && xVel!=-UNIT) :
         xVel = -UNIT; 
          yVel = 0;
         break;
        case(event.keyCode==RIGHT && xVel!=UNIT) : 
        xVel = UNIT;
         yVel = 0;
        break;
        case(event.keyCode==UP &&  yVel!=UNIT  ) : 
        xVel = 0; 
        yVel = -UNIT;
        break;
        case(event.keyCode==DOWN && yVel!=-UNIT) : 
        xVel = 0;
         yVel = UNIT;
        break;
     }


 }  
 
 function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=500):
        case(snake[0].y<0):
        case(snake[0].y>=500):
       
              active = false;
              break;

    }
 }