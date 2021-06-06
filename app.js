const winningMessageDiv = document.querySelector("#winning-message");
const winningMessageText = document.querySelector("#winning-message-text");
const restartButton = document.querySelector("#restartButton");
const containor = document.querySelector(".containor");
const turn = document.querySelector("#turn");

let board;
let boxes;
let box;

let counter = 0;
const players = [];
let currentPlayer;

const width = 6;
const height = 5;
const numPlayers = 3;

setPlayers(numPlayers);
setBoard(width, height);
startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.className = "box";
    box.innerText = "";
    box.addEventListener("click", handleClick, { once: true });
  });

  // setBoardHoverClass()
  winningMessageDiv.classList.remove("show");
  currentPlayer = players[0];
  turn.innerText = `${currentPlayer}'s turn`;
}

function setBoard(width, height) {
  board = document.createElement("div");
  board.classList.add("board");
  board.style.gridTemplateColumns = `repeat(${width}, auto)`;
  const numberBoxes = width * height;
  for (let i = 0; i < numberBoxes; i++) {
    box = document.createElement("div");
    box.classList.add("box");
    board.appendChild(box);
  }

  containor.appendChild(board);
}

function setPlayers(numPlayers) {
  for (let i = 0; i < numPlayers; i++) {
    players.push(`P${i + 1}`);
  }
  currentPlayer = players[0];
  turn.innerText = `${currentPlayer}'s turn`;
}

function handleClick(event) {
  const box = event.target;

  placeMark(box);

  if (checkWin(box)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns();
    // setBoardHoverClass()
  }
}

function placeMark(box) {
  box.innerText = currentPlayer;
  box.classList.add(currentPlayer);
}

function switchTurns() {
  counter++;
  currentPlayer = players[counter % players.length];
  turn.innerText = `${currentPlayer}'s turn`;
}

// function setBoardHoverClass(){
//     board.classList.remove("x")
//     board.classList.remove("circle")

//     if(circleTurn){
//         board.classList.add("circle")
//     } else{
//         board.classList.add("x")
//     }
// }

function checkWin(box) {
  const currentIndex = [...boxes].indexOf(box);

  //check horizontal conditions
  if (
    boxes[currentIndex + 1]?.classList.contains(currentPlayer) &&
    boxes[currentIndex + 2]?.classList.contains(currentPlayer)
  ) {
    return true;
  }
  if (
    boxes[currentIndex - 1]?.classList.contains(currentPlayer) &&
    boxes[currentIndex - 2]?.classList.contains(currentPlayer)
  ) {
    return true;
  }
  if (
    boxes[currentIndex - 1]?.classList.contains(currentPlayer) &&
    boxes[currentIndex + 1]?.classList.contains(currentPlayer)
  ) {
    return true;
  }

  //check vertical conditions

  if (
    boxes[currentIndex + width]?.classList.contains(currentPlayer) &&
    boxes[currentIndex + width * 2]?.classList.contains(currentPlayer)
  ) {
    return true;
  }

  if (
    boxes[currentIndex - width]?.classList.contains(currentPlayer) &&
    boxes[currentIndex - width * 2]?.classList.contains(currentPlayer)
  ) {
    return true;
  }

  if (
    boxes[currentIndex - width]?.classList.contains(currentPlayer) &&
    boxes[currentIndex + width]?.classList.contains(currentPlayer)
  ) {
    return true;
  }

  // check diognal conditions

  if (
    boxes[currentIndex + width + 1]?.classList.contains(currentPlayer) &&
    boxes[currentIndex + width * 2 + 2]?.classList.contains(currentPlayer)
  ) {
    return true;
  }

  if (
    boxes[currentIndex - width - 1]?.classList.contains(currentPlayer) &&
    boxes[currentIndex - width * 2 - 2]?.classList.contains(currentPlayer)
  ) {
    return true;
  }

  if (
    boxes[currentIndex + width + 1]?.classList.contains(currentPlayer) &&
    boxes[currentIndex - width - 1]?.classList.contains(currentPlayer)
  ) {
    return true;
  }

  if (
    boxes[currentIndex + width - 1]?.classList.contains(currentPlayer) &&
    boxes[currentIndex + width * 2 - 2]?.classList.contains(currentPlayer)
  ) {
    return true;
  }

  if (
    boxes[currentIndex - width + 1]?.classList.contains(currentPlayer) &&
    boxes[currentIndex - width * 2 + 2]?.classList.contains(currentPlayer)
  ) {
    return true;
  }

  if (
    boxes[currentIndex - width + 1]?.classList.contains(currentPlayer) &&
    boxes[currentIndex + width - 1]?.classList.contains(currentPlayer)
  ) {
    return true;
  }
}

function isDraw() {
  return [...boxes].every((box) => {
    return box.classList.length > 1;
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "Draw";
  } else {
    winningMessageText.innerText = `${currentPlayer} Wins!`;
  }

  winningMessageDiv.classList.add("show");
}
