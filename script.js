"use strict";


const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let cells = document.querySelectorAll(".cell");
  let rounds = 0;
  return {
    board,
    rounds,
    cells
  };
})();

const players = {
  playerX: { symbol: "X" },
  playerO: { symbol: "O" },
  p1round: true
};

const text = {
  winText: document.querySelector(".win-txt"),
  playAgain: document.querySelector(".play-again"),
};

const winCombos = {
  wins: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],

  winChecker: function () {
    for (let win of winCombos.wins) {
      let val1 = gameBoard.board[win[0]];
      let val2 = gameBoard.board[win[1]];
      let val3 = gameBoard.board[win[2]];
      if (val1 == "" || val2 == "" || val3 == "")
        continue;

      if (val1 == val2 && val2 == val3) {
        text.winText.textContent = `Player ${val1} won!`;
        playAgain();
        break;
      }
      else if (gameBoard.rounds == 9) {
        text.winText.textContent = "It's a tie!";
        playAgain();
        break;
      }
    }
  }
};

gameBoard.cells.forEach(cell => cell.addEventListener("click", () => {
  if (cell.textContent == ""
    && players.p1round == true
    && gameBoard.rounds != 9) {

    cell.textContent = players.playerX.symbol;
    gameBoard.board[cell.dataset.index] = players.playerX.symbol;
    players.p1round = false;

  }

  else if (cell.textContent == ""
    && players.p1round == false
    && gameBoard.rounds != 9) {

    cell.textContent = players.playerO.symbol;
    gameBoard.board[cell.dataset.index] = players.playerO.symbol;
    players.p1round = true;

  }

  gameBoard.rounds++;
  winCombos.winChecker();

}));

function playAgain() {
  text.playAgain.textContent = "Play again?";
  text.playAgain.classList.add("active");
  gameBoard.cells.forEach(cells => cells.classList.add("stopclick"));
  text.playAgain.addEventListener("click", () => {
    gameBoard.board = ["", "", "", "", "", "", "", "", ""];
    gameBoard.rounds = 0;
    text.winText.textContent = "";
    text.playAgain.textContent = "";
    text.playAgain.classList.remove("active");
    gameBoard.cells.forEach(cell => cell.textContent = "");
    gameBoard.cells.forEach(cells => cells.classList.remove("stopclick"));
  });
}
