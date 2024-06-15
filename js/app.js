/*-------------- Constants -------------*/

const player = {
  color: 'white',
}
const invader = {
  color: 'green',
}

/*---------- Variables (state) ---------*/

board = Array.from({ length: 15 }, () => Array(15).fill(0));
let playerPosX = 7;
let playerPosY = 14;
let invaderDirection = 1;
let invaders = [];
let lasers = []; 
let score = 0;

/*----- Cached Element References  -----*/

const gameBoardElement = document.querySelector('.game-board')
const scoreBoardElement = document.querySelector('.score-board')
const popUpElement = document.querySelector('.message')
const resetElement = document.querySelector('#reset-button');
const finalScoreElement = document.querySelector('#final-score')
const popUpMessageElement = document.querySelector('#win-or-lose')

/*-------------- Functions -------------*/

const init = () => {
  renderBoard();
  updateScore();
  renderInvaders();
}

const renderBoard = () => {
  gameBoardElement.innerHTML = '';
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = createCells(rowIndex, colIndex);
      gameBoardElement.appendChild(cellElement);
    });
  });
}

const createCells = (rowIndex, colIndex) => {
  const cell = document.createElement('div');
  cell.style.width = '30px';
  cell.style.height = '30px';
  if (rowIndex === playerPosY && colIndex === playerPosX) {
    cell.style.backgroundColor = player.color;
  } else {
    const isInvader = invaders.some(invader => invader.x === colIndex && invader.y === rowIndex);
    const isLaser = lasers.some(laser => laser.x === colIndex && laser.y === rowIndex);
    if (isInvader) {
      cell.style.backgroundColor = invader.color;
    } else if (isLaser) {
      cell.style.backgroundColor = 'red';
    } else {
      cell.style.backgroundColor = 'transparent';
    }
  }
  return cell;
}

const renderInvaders = () => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 10; col++) {
      invaders.push({x:col, y:row})
    };
  };
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
  gameOver();
}

const updateScore = () => {
  lasers = lasers.filter((laser) => {
    const hitIndex = invaders.findIndex(
      (invader) => invader.x === laser.x && invader.y === laser.y
    );
    if (hitIndex > -1) {
      invaders.splice(hitIndex, 1);
      score += 10;
      scoreBoardElement.textContent = score;
      return false;
    }
    return true;
  });
}

const playerControls = (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      if (playerPosX > 0) {
        playerPosX--;
      }
      break;
    case 'ArrowRight':
      if (playerPosX < board[0].length - 1) {
        playerPosX++;
      }
      break;
    case ' ':
      lasers.push({ x: playerPosX, y: playerPosY});
      break;
    default:
      break;  
  } 
  renderBoard();
}

const moveLaser = () => {
  lasers.forEach((laser, index) => {
    laser.y -= 1;
    if (laser.y < 0) lasers.splice(index, 1);
  });
  updateScore();
  renderBoard()
}

const gameOver = () => {
  const reachedPlayer = invaders.some(invader => invader.y === playerPosY);
  const invadersDestroyed = invaders.length === 0; 
  if (reachedPlayer || invadersDestroyed) {
    if (reachedPlayer) {
      showPopUp('lose')
    } else if (invadersDestroyed){
      showPopUp('win')
    }
  }
}

const showPopUp = (condition) => {
  if (condition === 'win') {
    popUpMessageElement.textContent = 'Mission Complete!'
  } else if (condition === 'lose') {
    popUpMessageElement.textContent = "Mission Failed"
  }
  finalScoreElement.textContent = `Your Score: ${score}`;
  popUpElement.classList.remove('hidden');
}

const resetGame = () => {
  board = Array.from({ length: 15 }, () => Array(15).fill(0));
  playerPosX = 7;
  playerPosY = 14;
  invaderDirection = 1;
  invaders = [];
  lasers = []; 
  score = 0;
  popUpElement.classList.add('hidden')
  init()
}

setInterval(moveInvader, 300)
setInterval(moveLaser, 100)

/*----------- Event Listeners ----------*/

document.addEventListener('keydown', playerControls)
resetElement.addEventListener('click', resetGame)
document.addEventListener('DOMContentLoaded', () =>{
  init()
})