export let foodPosition = {}

export const changeFoodPosition = () => {
  foodPosition.x = Math.floor(Math.random() * 30) + 1;
  foodPosition.y = Math.floor(Math.random() * 30) + 1;
}

export function drawFood(playBoard){
  let food = document.createElement('div');
  food.classList.add('food');
  food.style.gridArea = `${foodPosition.x} / ${foodPosition.y}`;
  playBoard.append(food);
}