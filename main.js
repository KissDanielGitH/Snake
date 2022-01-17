const board = document.getElementById("board");
const snake = document.getElementById("snake");
const startBtn = document.getElementById("start-button");
const log = document.getElementById("log");
const restartBtn = document.getElementById("restart-button");
const coin = document.getElementById("coin");
const actualScore = document.getElementById("actual-score");
const popup = document.querySelector("#popupdiv");
const leaderboard = document.querySelector("#leaderboard");


let positionX = 0;
let positionY = 0;
let action = 4;
let coinPositionX;
let coinPositionY;
let score = 0;
let snakeRouteX = [];
let snakeRouteY = [];
let steps = 0;
let highScores = [0, 0, 0, 0, 0];


const goAhead = (i) => {
    setTimeout( () => {
        if (isHit()) {
            createCoin();
            score++;
            actualScore.firstElementChild.innerHTML = score;
            snakeGrow();
        }
        if (i == 1) {
            snakeRoute(); 
            positionY -= 1;
            snake.style.top = positionY + "px";
            if (score > 0) {tailMove();}
        }
        else if (i == 2) {
            snakeRoute(); 
            positionY += 1;
            snake.style.top = positionY + "px";
            if (score > 0) {tailMove();}
        }
         else if (i == 3) {
            snakeRoute();        
            positionX -= 1;
            snake.style.left = positionX + "px";
            if (score > 0) {tailMove();}
        }
         else if (i == 4) {  
            snakeRoute();           
            positionX += 1;
            snake.style.left = positionX + "px";
            if (score > 0) {tailMove();}
        }
    if (isGameRunning()) {
        goAhead(action);
    } else {
        alert("Game over!");
        resetGame();
    }}, 5);
};

const isGameRunning = () => {
    if (positionY < 0 || positionY > 480 || positionX > 480 || positionX < 0) {
        return false;
    }
    for (let i = 0; i < score*10; ++i) {
        if ((positionX+"px") == snakeRouteX[steps-1-i] && (positionY+"px") == snakeRouteY[steps-1-i]) {
            return false;
        }
    }
    return true;
};

const isHit = () => {
    let snakeHeadX = positionX + 10;
    let snakeHeadY = positionY - 10;
    let CoinX = coinPositionX + 10;
    let CoinY = coinPositionY - 10;
    let distanceX = Math.abs(snakeHeadX - CoinX);
    let distanceY = Math.abs(snakeHeadY - CoinY);
    if (distanceX < 13 && distanceY < 13) {
        return true;
    }
};

const resetGame = () => {
    highScore();
    restartBtn.classList.toggle("invisible");
    coin.classList.toggle("invisible");
    positionX = 0;
    positionY = 0;
    snake.style.left = positionX + "px";
    snake.style.top = positionY + "px";
    action = 4;
    score = 0;
    steps = 0;
    snakeRouteX = [];
    snakeRouteY = [];
    let boardChildrenNumber = board.children.length;
    let boardChildren = board.children;
    for (let i = boardChildrenNumber-1; i > 3; --i) {
        boardChildren[i].remove();
    }
    actualScore.firstElementChild.innerHTML = "SCORE";
};

const createCoin = () => {
    coinPositionX = Math.round(Math.random()*480);
    coin.style.left = coinPositionX + "px";
    coinPositionY = Math.round(Math.random()*480);
    coin.style.top = coinPositionY + "px";
};

const snakeGrow = () => {
    const tail = document.createElement("div");
    tail.className = 'snake';
    board.appendChild(tail);
};

const snakeRoute = () => {
    snakeRouteX[steps] = snake.style.left;
    snakeRouteY[steps] = snake.style.top;
    ++steps;
};

const tailMove = () => {
    const tail = board.children;
    tail[4].style.left = snakeRouteX[steps-10];
    tail[4].style.top = snakeRouteY[steps-10];
    if (score > 1) {
        for (let i = 2; i < score+1; ++i) {
            tail[i+3].style.left = snakeRouteX[steps-i*10-2];
            tail[i+3].style.top = snakeRouteY[steps-i*10-2];
        }
    }
};

const highScore = () => {
    for (let i = 0; i < 5; ++i) {
        if (score > highScores[i]) {
            let name = prompt("Congratulations! You made it to the top5!", "Enter your name here!");
            name = name.toUpperCase() +"\tScore: " + score;
            let names = leaderboard.children;
            for (let j = 4; j >= i; --j) {
                let term = highScores[j];
                highScores[j] = highScores[j+1];
                highScores[j+1] = term;
                let term2 = names[j].innerHTML;
                names[j].innerHTML = names[j+1].innerHTML
                names[j+1].innerHTML = term2;
            }
            highScores[i] = score;
            names[i].innerHTML = name;
            names[5].innerHTML = "";
            break;
        }
    }
};

document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key == 's' && action != 1) {
        action = 2;
    } else if (key == 'w' && action != 2) {
        action = 1;
    } else if (key == 'a' && action != 4) {
        action = 3;
    } else if (key == 'd' && action != 3) {
        action = 4;
    }
});

startBtn.addEventListener('click', () => {
    startBtn.className = 'invisible';
    createCoin();
    coin.classList.remove("invisible");
    goAhead(action);
})

restartBtn.addEventListener('click', () => {
    restartBtn.classList.toggle("invisible");
    createCoin();
    coin.classList.toggle("invisible");
    goAhead(action);
});

popup.addEventListener('click', () => {
    let actualPopup = document.querySelector("#my-popup");
    actualPopup.classList.toggle("show");
});


/* startBtn.addEventListener('click', () => {
    startBtn.className = 'invisible';
    const game = document.addEventListener("keydown", (event) => {
        let movement = setInterval(startSnake, 10);
        let key = event.key;
        if (key == 's') {
            movingSnakeDown();
        } else if (key == 'w') {
            movingSnakeUp();
        } else if (key == 'a') {
            movingSnakeLeft();
        } else {
            movingSnakeRight();
        }
    });
}); */


/* const startSnake = () => {
    positionX += 1;
    positionY += 1;
    snake.style.left = positionX + "px";
    snake.style.top = positionY + "px";
}


const movingSnakeLeft = () => {
    if (positionX == 0) {
        clearInterval(movement);
    } else  {
        positionX -= 1;
        snake.style.left = positionX + "px";
    }
}

const movingSnakeRight = () => {
    if (positionX == 480) {
        clearInterval(movement);
    } else  {
        positionX += 1;
        snake.style.left = positionX + "px";
    }
}

const movingSnakeUp = () => {
    if (positionY == 0) {
        clearInterval(movement);
    } else  {
        positionY -= 1;
        snake.style.top = positionY + "px";
    }
}

const movingSnakeDown = () => {
    if (positionY == 480) {
        clearInterval(movement);
    } else  {
        positionY += 1;
        snake.style.top = positionY + "px";
    }
} */

//let movement = setInterval(movingSnake, 10);