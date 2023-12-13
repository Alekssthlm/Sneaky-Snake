
import { foodPosition, changeFoodPosition, drawFood } from "./food.js";
import { snake, rowMove, colMove, changeDirection, updateSnake, drawSnake } from "./snake.js";
import { checkScore } from "./score.js";
import { scoreboardBtnEl, resetBtn, scoreListEl, scoreboardToggle } from "./toolbar.js";
import { countdown } from "./timer.js";
import { getData } from "./api.js";
import { mobileDown, mobileUp, mobileLeft, mobileRight } from "./mobileControls.js";

let playBoard = document.querySelector('.play-board');
let startBtnEl = document.querySelector("#start_btn");
let gameOver = {state: false};
let setIntervalId;
let currentScore = 0;
let currentScoreEl = document.querySelector('#currentScore');
currentScoreEl.textContent = currentScore;
let timer = {minutes: '01', seconds: 60}
let timerEl = document.querySelector('#timer');
let timerSetInterval;
timerEl.textContent = '01:00'
let speed = 200;

// Declare top player list and variables to call localStorage items
let player1Name = JSON.parse(localStorage.getItem("player1Name")) || "Player 1";
let player1Score =
  Number(JSON.parse(localStorage.getItem("player1Score"))) || 0;

let player2Name = JSON.parse(localStorage.getItem("player2Name")) || "Player 2";
let player2Score =
  Number(JSON.parse(localStorage.getItem("player2Score"))) || 0;

let player3Name = JSON.parse(localStorage.getItem("player3Name")) || "Player 3";
let player3Score =
  Number(JSON.parse(localStorage.getItem("player3Score"))) || 0;

let topPlayersArr = [
  { player1: `${player1Name}`, score: `${player1Score}` },
  { player2: `${player2Name}`, score: `${player2Score}` },
  { player3: `${player3Name}`, score: `${player3Score}` },
];

// Select scoreboard items and show values based on localStorage items
let player1NameEl = document.querySelector("#player1Name");
let player1ScoreEl = document.querySelector("#player1Score");
player1NameEl.textContent = player1Name;
player1ScoreEl.textContent = player1Score;

let player2NameEl = document.querySelector("#player2Name");
let player2ScoreEl = document.querySelector("#player2Score");
player2NameEl.textContent = player2Name;
player2ScoreEl.textContent = player2Score;

let player3NameEl = document.querySelector("#player3Name");
let player3ScoreEl = document.querySelector("#player3Score");
player3NameEl.textContent = player3Name;
player3ScoreEl.textContent = player3Score;

// FUNCTION TO START THE GAME

function startGame() {
  if (gameOver.state)
    return checkScore(
      currentScore,
      gameOver,
      player1Name,
      player1Score,
      player2Name,
      player2Score,
      player3Name,
      player3Score,
      setIntervalId,
      timerSetInterval,
      topPlayersArr
    );
  playBoard.innerHTML = '';
  updateSnake(gameOver, playBoard);
  if (snake[0].x <= 0 || snake[0].x > 30 || snake[0].y <= 0 || snake[0].y > 30) {
    gameOver.state = true;
    playBoard.style.backgroundColor = 'darkred';
    return
  }
  drawSnake(playBoard, snake);
  if(snake[0].x === foodPosition.x && snake[0].y === foodPosition.y){
    currentScore += 1;
    currentScoreEl.textContent = currentScore;
    speed -= 10;
    clearInterval(setIntervalId);
    setIntervalId = setInterval(startGame, speed);
    changeFoodPosition();
    snake.push({ x: `${foodPosition.x}`, y: `${foodPosition.y}`})
  }
  drawFood(playBoard);
}

setIntervalId = setInterval(startGame, speed);
changeFoodPosition();
getData();

// EVENT LISTENERS

// Click on arrows (mobile) triggers key press to trigger direction change
mobileUp.addEventListener('click', function(){
  document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowUp'}))
})

mobileLeft.addEventListener('click', function(){
  document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}))
})

mobileDown.addEventListener('click', function(){
  document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}))
})

mobileRight.addEventListener('click', function(){
  document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowRight'}))
})

startBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  let boardCoverEl = document.querySelector("#boardCover");
  boardCoverEl.style.display = "none";
  playBoard.style.display = "grid";

  timerSetInterval = setInterval(() => {
    countdown(gameOver, timer, timerEl, timerSetInterval);
  }, 1000);
});


document.addEventListener('keydown', changeDirection);
scoreboardBtnEl.addEventListener('click', scoreboardToggle);
resetBtn.addEventListener('click', () =>{location.reload()});

