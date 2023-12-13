
export let rowMove = 0, colMove = 0;
export let snake = [
  {x: 5, y: 5}
];

export const changeDirection = (e) => {
  if(e.key === 'ArrowUp' && colMove != 1) {
    rowMove = 0;
    colMove = -1;
  } else if(e.key === 'ArrowDown' && colMove != -1) {
    rowMove = 0;
    colMove = 1;
  } else if(e.key === 'ArrowLeft' && rowMove != 1) {
    rowMove = -1;
    colMove = 0;
  } else if(e.key === 'ArrowRight' && rowMove != -1) {
    rowMove = 1;
    colMove = 0;
  }
}

export function updateSnake(gameOver, playBoard){
  for(let i = snake.length - 1; i > 0; i--){
    
    if (
      i !== 0 &&
      snake[0].x === snake[i].x &&
      snake[0].y === snake[i].y
    ) {
      playBoard.style.backgroundColor = 'darkred';
      gameOver.state = true;
    } else {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;
    }
  }
  snake[0].x += colMove;
  snake[0].y += rowMove;
}

export function drawSnake(playBoard, snake){
  for(let i = 0; i < snake.length; i++){
    let snakePart = document.createElement('div');
    if(i === 0){
      snakePart.classList.add('head');
      snakePart.style.gridArea = `${snake[i].x} / ${snake[i].y}`;
      playBoard.appendChild(snakePart);
    } else {
    snakePart.classList.add('snake');
    snakePart.style.gridArea = `${snake[i].x} / ${snake[i].y}`;
    playBoard.appendChild(snakePart);
  }
}
}
