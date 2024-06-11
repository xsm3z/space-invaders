/*-------------- Constants -------------*/

const player = {
  speed: 1,
  color: 'white',
}
const invader = {
  speed: 1,
  color: 'green',
}

/*---------- Variables (state) ---------*/

let board = [
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];

let playerPosX = 7;
let playerPosY = 14;

let invaders = [];

/*----- Cached Element References  -----*/

const gameBoardElement = document.querySelector('.game-board')
const scoreBoardElement = document.querySelector('.score-board')

/*-------------- Functions -------------*/

const render =  () => {
  
  gameBoardElement.innerHTML = '';
  
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.style.width = '40px';
      cellElement.style.height = '40px';

      if (rowIndex === playerPosY && colIndex === playerPosX) {
        cellElement.style.backgroundColor = player.color;
      } else if (cell === 2) {
        cellElement.style.backgroundColor = invader.color;
      } else {
        cellElement.style.backgroundColor = 'transparent'
      }
      gameBoardElement.appendChild(cellElement);
    });
  });
}

const movePlayerLeft = () => {
  if (playerPosX > 0) {
    playerPosX--;
    render();
  }
}

const movePlayerRight = () => {
  if (playerPosX < board[0].length - 1) {
    playerPosX++;
    render();
  }
}

/*----------- Event Listeners ----------*/

document.addEventListener('keydown', function(event) {
  if(event.key === 'ArrowLeft') {
    movePlayerLeft();
  } else if (event.key === 'ArrowRight') {
    movePlayerRight();
  }
})

document.addEventListener('DOMContentLoaded', () => {
  render();
})