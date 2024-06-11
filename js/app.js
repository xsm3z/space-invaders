/*-------------- Constants -------------*/

const player = {
  speed: 1,
  color: 'white',
  x: 0,
  y: 0
}
const invader = {
  speed: 1,
  color: 'green',
  x: 0,
  y: 0
}

/*---------- Variables (state) ---------*/

let board = [
  [ 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0 ],
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
  [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ]
];

/*----- Cached Element References  -----*/

const gameBoardElement = document.querySelector('.game-board')
const scoreBoardElement = document.querySelector('.score-board')

/*-------------- Functions -------------*/

const render =  () => {
  board.forEach((row) => {
    row.forEach((cell) => {
      const cellElement = document.createElement('div');
      cellElement.style.width = '40px';
      cellElement.style.height = '40px';
      if (cell === 1) {
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

document.addEventListener('DOMContentLoaded', () => {
  render();
})


/*----------- Event Listeners ----------*/
