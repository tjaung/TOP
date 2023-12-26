class GameBoard {
    constructor(
        rows = 3,
        columns = 3,
        // boardArray = []
    ) {
        this.boardArray = new Array(rows*columns)
        // for (let i = 0; i < this.rows*this.columns; i++) {
        //     this.boardArray.push(Cell());
        //     this.boardArray[i].addIndex(i);
        //   }
    }

    initializeBoard() {
        for (let i = 0; i < this.boardArray.length; i++) {
            this.boardArray[i] = Cell();
            this.boardArray[i].addIndex(i);
          }
          console.log(this.boardArray)
          return this.boardArray
    };

    getBoard() {
        return this.boardArray;
    };

    placeMove(space, player){
        if(this.boardArray[space].getValue() === null){
            this.boardArray[space].addToken(player);
        };
    }

    printBoard() {
        const boardWithCellValues = this.boardArray.map((cell) => cell.getValue())
        console.log(boardWithCellValues)
        // console.log(this.boardArray[0].getValue(), this.boardArray[1].getValue(), this.boardArray[2].getValue())
        // console.log(this.boardArray[3].getValue(), this.boardArray[4].getValue(), this.boardArray[5].getValue())
        // console.log(this.boardArray[6].getValue(), this.boardArray[7].getValue(), this.boardArray[8].getValue())
    }

}


function Cell() {
  let value = null;
  let cellIndex = null;

  // add cell index
  const addIndex = (i) => {
    cellIndex = i
  }
  // Get cell index
  const getIndex = () => cellIndex;

  // Accept a player's token to change the value of the cell
  const addToken = (player) => {
    value = player;
    // return value;
  };

  // How we will retrieve the current value of this cell through closure
  const getValue = () => value;

  return {
    addIndex,
    getIndex,
    addToken,
    getValue
  };
}

class GameController {
    constructor(
        playerOneName = "Player One", 
        playerTwoName = "Player Two") {
            this.board = new GameBoard();
            this.board.initializeBoard();
            this.players = [
                {
                name: playerOneName,
                token: 0
                },
                {
                name: playerTwoName,
                token: 1
                }
            ];
            this.activePlayer = this.players[0];
            this.printNewRound();
        }
  
    switchPlayerTurn() {
      this.activePlayer = this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
    }
  
    getActivePlayer() {
      return this.activePlayer;
    }
  
    printNewRound() {
      this.board.printBoard();
      console.log(`${this.getActivePlayer().name}'s turn.`);
    }
  
    checkAvailableMoves() {
        const availableMoves = this.board.getBoard().map((cell) => cell.getValue()).filter((val) => val == null);
        console.log(availableMoves)
        if(availableMoves.length != 0){
            return true
        }
        else return false

    }

    checkWinCondition() {
        let val = this.getActivePlayer().token
        const boardWithCellValues = this.board.getBoard().map(function (cell) {
            if (cell.getValue() === val) {
            return cell.getIndex();
            }
        }).filter((i) => i !== null);
  
      const across1 = [0, 1, 2];
      const across2 = [3, 4, 5];
      const across3 = [6, 7, 8];
      const down1 = [0, 3, 6];
      const down2 = [1, 4, 7];
      const down3 = [2, 5, 8];
      const diagnal1 = [0, 4, 8];
      const diagnal2 = [2, 4, 6];
      const permutations = [across1, across2, across3, down1, down2, down3, diagnal1, diagnal2];
  
      for (let i = 0; i < permutations.length; i++) {
        const result = permutations[i].every((j) => boardWithCellValues.includes(j));
        if (result) {
          return 1;
        }
        else if(!this.checkAvailableMoves() && !result) return -1
      }
  
      return 0;
    }
  
    playRound(space) {
        const token = this.getActivePlayer().token;
        this.board.placeMove(space, token);
        if(this.checkWinCondition()!=0){
            console.log('end')
        }
        else{
            this.switchPlayerTurn();
            this.printNewRound();  
        };
    }
  }


function ScreenController() {
    let game = new GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const newGame = document.querySelector('.restart');

    // render newgame button
    const renderNewGame = () => {
        const newButton = document.createElement("button");
        newButton.classList.add('newGameButton')
        newButton.addEventListener('click', clickNewGame)
        newGame.appendChild(newButton);
    }

    const updateScreen = (end) => {
      // clear the board
      boardDiv.textContent = "";
  
      // get the newest version of the board and player turn
      const board = game.board.getBoard();
      const activePlayer = game.getActivePlayer();
  
    
      // Display player's turn
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
  
      // Render board squares
      board.forEach((cell, index) => {
          // Anything clickable should be a button!!
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          // Create a data attribute to identify the column
          // This makes it easier to pass into our `playRound` function 
          cellButton.dataset.cell = index
          cellButton.textContent = cell.getValue();
          if(!end){
            cellButton.addEventListener('click', clickHandlerBoard)
          }
          boardDiv.appendChild(cellButton);
        })
    }
  
    // Add event listener for the board
    function clickHandlerBoard(e) {
      const selectedButton = e.target;
    
      // Make sure I've clicked a column and not the gaps in between
      if (!selectedButton) return;
      
      game.playRound(selectedButton.dataset.cell);
      let result = game.checkWinCondition(game.activePlayer);
      if(result == 1){
        console.log('win')
        updateScreen(true)
        renderNewGame()
      }
      else if(result==-1){
        console.log('draw')
        updateScreen(true)
        renderNewGame()
      }
      else updateScreen(false);
    }

    function clickNewGame(e){
        const button = e.target;
        game = new GameController()
        newGame.removeChild(button)
        // game.board.resetBoard();
        updateScreen();
    }
    // newGame.addEventListener('click', clickNewGame)
    // const buttons = document.querySelector('.cell');
    // buttons.forEach((btn) => btn.addEventListener("click", clickHandlerBoard));
  
    // Initial render
    updateScreen();
  
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }
  
  ScreenController();