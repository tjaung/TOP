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
      const spaceVal = this.boardArray[space].getValue()
      if (spaceVal === null){
        this.boardArray[space].addToken(player);
      }
      else{this.boardArray[space].addToken(spaceVal)}

        // if(this.boardArray[space].getValue() === null){
        //     this.boardArray[space].addToken(player);
        // };
    }

    printBoard() {
        const boardWithCellValues = this.boardArray.map((cell) => cell.getValue())
        console.log(boardWithCellValues)
        return boardWithCellValues;
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

  const clearValue = () => {
    value = null;
  }

  // How we will retrieve the current value of this cell through closure
  const getValue = () => value;

  return {
    addIndex,
    getIndex,
    addToken,
    getValue,
    clearValue
  };
}

function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });  
}

class GameController {
    constructor(
        playerOneName = "Player One", 
        playerTwoName = "Player Two",
        playerOneHuman = true,
        playerTwoHuman = true) {
            this.board = new GameBoard();
            this.board.initializeBoard();
            this.players = [
                {
                name: playerOneName,
                token: 'X',
                human: playerOneHuman
                },
                {
                name: playerTwoName,
                token: 'O',
                human: playerTwoHuman
                }
            ];
            this.activePlayer = this.players[0];
            this.printNewRound();
        }

    //bot moves
    makeEasyBotMove() {
      //randomly pick an available space
      const available = this.board.printBoard()
      //get indices of available
      let indices = []
      let idx = available.indexOf(null);
      while (idx !== -1) {
        indices.push(idx);
        idx = available.indexOf(null, idx + 1);
      }
      console.log(indices)
      let move = indices[(Math.floor(Math.random() * indices.length))]
      return move
    }  

    getBotMove(diff){
      let move = null
      move = this.makeEasyBotMove()
      return move
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
        // console.log(availableMoves)
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
        let active = this.getActivePlayer().human
        console.log(active)
        if(active == 0){
          console.log('bot turn first')
          let botMove = this.getBotMove();
          console.log(botMove, this.getActivePlayer().token)
          this.board.placeMove(botMove, this.getActivePlayer().token);
          if(this.checkWinCondition()!=0){
            console.log('end')
          }
          else{
            this.switchPlayerTurn()
            this.printNewRound()
          }
        }
        // if(activePlayer.human === false){
        //     let botMove = this.game.makeEasyBotMove()
        //     console.log(botMove)
        //     this.board.placeMove(botMove, token);
  
        //   }
        // const filledVal = this.board[space].getValue();
        if(this.board.printBoard()[space] === null){
          this.board.placeMove(space, token);
                // if(this.board[space].getValue())
            if(this.checkWinCondition()!=0){
                console.log('end')
            }
            else{
                this.switchPlayerTurn();
                this.printNewRound();  
                active = this.getActivePlayer().human
                if(active == 0){
                  console.log('bot turn next')
                  let botMove = this.getBotMove();
                  console.log(botMove, this.getActivePlayer().token)
                  this.board.placeMove(botMove, this.getActivePlayer().token);
                  if(this.checkWinCondition()!=0){
                    console.log('end')
                  }
                  else{
                    this.switchPlayerTurn()
                    this.printNewRound()
                  }

                }
            };

        }
      
    }

    clearBoard() {
      this.board = new GameBoard()
      this.board.initializeBoard()
      }
    }
  


function ScreenController() {
    let game = new GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const restartDiv = document.querySelector('.restart');
    
    let player1Name = 'Player 1'
    let player2Name = 'Player 2'
    let player1Human = true;
    let player2Human = true;
    
    // get human or bot
    function clickPlayerButtonValue(e){
      const target = e.target;
      if(target.className.includes('1')){player1Human = target.value}
      else if(target.className.includes('2')){player2Human = target.value}
      console.log(`player1: ${player1Human}, player2: ${player2Human}`);
      // return target.value;
    }
    const startGame = () => {
      const player1NameInput = document.querySelector(".player1Name").value
      const player2NameInput = document.querySelector(".player2Name").value
      if(!player1Human){player1NameInput = 'Bot'};
      if(!player2Human){player2NameInput = 'Bot'};

      game = new GameController(
        player1Name = player1NameInput,
        player2Name = player2NameInput,
        player1Human = player1Human, 
        player2Human=player2Human);

      game.playRound();
      updateScreen();
    }

    function clickStartGame(e) {
      const target = e.target;
      startGame()
    }

    const renderStart = () => {
      const startButton = document.querySelector('.start');
      const player1 = document.querySelector('#player1')
      const player2 = document.querySelector('#player2')
      const selectionButts = player1.getElementsByTagName('button');
      const selectionButts2 = player2.getElementsByTagName('button');
      console.log(selectionButts)
      for(const btn of selectionButts){
        btn.addEventListener('click', clickPlayerButtonValue)
      }
      for(const btn of selectionButts2){
        btn.addEventListener('click', clickPlayerButtonValue)
      }
      startButton.addEventListener('click', clickStartGame);
    }
    // render newgame button
    const renderNewGame = () => {
        // const restartDiv = document.createElement('div');
        // restartDiv.classList.add('.restart');
        const newButton = document.createElement("button");
        const mainMenuButton = document.createElement("button");
        // newButton.classList.add('newGameButton')
        newButton.innerHTML = 'Restart'
        newButton.addEventListener('click', clickNewGame);
        mainMenuButton.innerHTML = 'Main Menu';
        restartDiv.appendChild(mainMenuButton);
        restartDiv.appendChild(newButton);
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
      else {
        updateScreen(false);
      }
    }

    function clickNewGame(e){
        const button = e.target;
        // game.clearBoard()
        restartDiv.querySelectorAll('*').forEach(n => n.remove());
        // updateScreen()
        // game.playRound();
        // updateScreen();
        startGame()
    }
    // newGame.addEventListener('click', clickNewGame)
    // const buttons = document.querySelector('.cell');
    // buttons.forEach((btn) => btn.addEventListener("click", clickHandlerBoard));
  
    // Initial render
    // updateScreen();
    renderStart()
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }
  
  ScreenController();