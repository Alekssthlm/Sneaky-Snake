export let scoreboardBtnEl = document.querySelector('#scoreboardBtn');
export let scoreListEl = document.querySelector('#score_list')
export let resetBtn = document.querySelector('#resetBtn');

export function scoreboardToggle(){
  scoreListEl.classList.toggle('show--scoreboard');
  if(scoreboardBtnEl.textContent == 'SCOREBOARD'){
    scoreboardBtnEl.textContent = 'BACK TO GAME';
  } else {
    scoreboardBtnEl.textContent = 'SCOREBOARD';
  }
}