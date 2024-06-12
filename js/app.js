/*-------------- Constants -------------*/

const player = {
  color: 'white',
}
const invader = {
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

let lasers = []; 

let invaderDirection = 1;
let invaders = []; 

for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 9; col++) {
    invaders.push({x:col, y:row})
  }
}

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
    } else {
      const isInvader = invaders.some(invader => invader.x === colIndex && invader.y === rowIndex);
      if (isInvader) {
        cellElement.style.backgroundColor = invader.color;
      } else {
        cellElement.style.backgroundColor = 'transparent';
      }
    }
    gameBoardElement.appendChild(cellElement);
  });
});
}

const movePlayerLeft = () => {
  if (playerPosX > 0) {
    playerPosX--;
  }
  render()
}

const movePlayerRight = () => {
  if (playerPosX < board[0].length - 1) {
    playerPosX++;
  }
  render ()
}

const moveInvader = () => {
  let atEdge = false; 
  invaders.forEach(invader => {
    if (invader.x === 0 && invaderDirection === -1 || (invader.x === board[0].length - 1 && invaderDirection === 1)) {
      atEdge = true; 
    } 
  })
  if (atEdge) {
    invaderDirection *= -1;
    invaders.forEach(invader => {
      invader.y++;
    })
  } else {
    invaders.forEach(invader => {
      invader.x += invaderDirection;
    })
  }
  render();
}

setInterval(moveInvader, 250)

const checkCollision = () => {
  
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