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

let score = 0;

let gameOver = false;

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

const init = () => {
  renderBoard();
  updateScore();
}

window.onload = init;

const renderBoard = () => {
  gameBoardElement.innerHTML = '';

  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.style.width = '20px';
      cellElement.style.height = '20px';

      if (rowIndex === playerPosY && colIndex === playerPosX) {
        cellElement.style.backgroundColor = player.color;
      } else {
        const isInvader = invaders.some(
          (invader) => invader.x === colIndex && invader.y === rowIndex
        );
        const isLaser = lasers.some(
          (laser) => laser.x === colIndex && laser.y === rowIndex
        );
        if (isInvader) {
          cellElement.style.backgroundColor = invader.color;
        } else if (isLaser) {
          cellElement.style.backgroundColor = 'red';
        } else {
          cellElement.style.backgroundColor = 'transparent';
        }
      }
      gameBoardElement.appendChild(cellElement);
    });
  });
};

const movePlayerLeft = () => {
  if (playerPosX > 0) {
    playerPosX--;
  }
  renderBoard()
}

const movePlayerRight = () => {
  if (playerPosX < board[0].length - 1) {
    playerPosX++;
  }
  renderBoard()
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
  renderBoard();
}

const checkCollision = () => {
  lasers = lasers.filter((laser) => {
    const hitIndex = invaders.findIndex(
      (invader) => invader.x === laser.x && invader.y === laser.y
    );
    if (hitIndex > -1) {
      invaders.splice(hitIndex, 1);
      score += 10;
      updateScore();
      return false;
    }
    return true;
  });
}

const shootLaser = () => {
  lasers.push({ x: playerPosX, y: playerPosY - 1 });
}

const moveLaser = () => {
  lasers.forEach((laser, index) => {
    laser.y -= 1;
    if (laser.y < 0) lasers.splice(index, 1);
  });
  checkCollision();
  renderBoard()
}

const updateScore = () => {
  scoreBoardElement.textContent = score;
}

setInterval(moveInvader, 300)
setInterval(moveLaser, 100)

/*----------- Event Listeners ----------*/

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    movePlayerLeft();
  } else if (event.key === 'ArrowRight') {
    movePlayerRight();
  } else if (event.key === ' ') {
    shootLaser();
  }
})
