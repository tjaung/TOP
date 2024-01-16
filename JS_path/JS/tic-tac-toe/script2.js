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
        // console.log(boardWithCellValues)
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
      playerHuman
    ) {
      // Initialize Players
      this.playerOneHuman = playerHuman === '1' ? true : false
      this.playerTwoHuman = this.playerOneHuman ? false : true

      this.player1 = new Player('X', this.playerOneHuman)
      this.player2 = new Player('O', this.playerTwoHuman)
      this.players = [this.player1, this.player2]

      // Get new board
      this.board = new GameBoard();
      this.board.initializeBoard();

      // Setup first Round
      this.activePlayer = this.players[0];
      this.printNewRound();

      // get win rate
      this.winCount = 0;
        }
  
    switchPlayerTurn() {
      this.activePlayer = this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
    }
  
    getActivePlayer() {
      return this.activePlayer;
    }
  
    printNewRound() {
      this.board.printBoard();
      console.log(`${this.getActivePlayer().getToken()}'s turn.`);
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
        let val = this.getActivePlayer().getToken()
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
          if(this.getActivePlayer().getHuman()){
            return 1
          }
          else{return -2}
        }
        else if(!this.checkAvailableMoves() && !result) return -1
      }

      return 0;
    }

    playRound(space) {
      // get active player
      const token = this.getActivePlayer().getToken();
      let human = this.getActivePlayer().getHuman()
      console.log(`active player bot: ${human}`)

      if(!human){
        this.moveBot()
      }
      else if(human){
        console.log('Player move')
        this.movePlayer(space)
      }
      // console.log(this.board.printBoard())
    }

    moveBot() {
      if(!this.getActivePlayer().getHuman()){
        let botMove = this.getActivePlayer().getBotMove(this.board)
        this.board.placeMove(botMove, this.getActivePlayer().getToken());
        console.log(`bot move: ${botMove}`)
        if(this.checkWinCondition() != 0){
          return 1
        }
        this.switchPlayerTurn();
        this.printNewRound();
      }
    }

    movePlayer(space) {
      if(this.board.printBoard()[space] === null){
        this.board.placeMove(space, this.getActivePlayer().getToken());

        if(this.checkWinCondition() != 0){
          return 1
        }
        this.printNewRound();
      }
    
      console.log(`Player turn just went is bot: ${this.getActivePlayer().getHuman()}`)
      this.switchPlayerTurn();
      console.log(`Next player is bot: ${this.getActivePlayer().getHuman()}`)
      this.moveBot();
    }

    clearBoard() {
      this.board = new GameBoard()
      this.board.initializeBoard()
      }
    }
  
class Player {
  constructor(
    token,
    human
  ) 
    {
        this.playerToken = token
        this.human = human;
    }

    getToken(){return this.playerToken}
    getHuman(){return this.human}

   //bot moves
   makeEasyBotMove(board) {
    //randomly pick an available space
    const available = board.printBoard()
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

    makeMediumBotMove(available) {

    }

    getBotMove(board, diff){
      let move = null
      move = this.makeEasyBotMove(board)
      return move
    }

}

function ScreenController() {
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const restartDiv = document.querySelector('.restart');

    let playerHuman = 1;
    let game = new GameController();
    let winCount = 0
    let newWinCount = winCount
    // get human or bot
    function clickPlayerButtonValue(e){
      const target = e.target;
      if(target.className.includes('1')){playerHuman = target.value}
      else if(target.className.includes('2')){playerHuman = target.value}
      console.log(`playerHuman: ${playerHuman}`);
      // return target.value;
    }
    const startGame = (winCount) => {
      game = new GameController(playerHuman = playerHuman, botDiff = winCount);
      console.log(`Player 1: ${game.players[0].getToken()}, Human: ${game.players[0].getHuman()}`)
      console.log(`Player 2: ${game.players[1].getToken()}, Human: ${game.players[1].getHuman()}`)
      // game.playRound();
      updateScreen();
    }

    function clickStartGame(e) {
      const target = e.target;
      startGame(winCount)
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
    const renderNewGame = (newWinCount) => {

        // const restartDiv = document.createElement('div');
        // restartDiv.classList.add('.restart');
        const newButton = document.createElement("button");
        const mainMenuButton = document.createElement("button");
        // newButton.classList.add('newGameButton')
      
        if(newWinCount === winCount){
          btnText = 'Restart'
        }
        else if(newWinCount > winCount){
          btnText = 'Next Round'
          winCount = newWinCount;
        }
        else{
          btnText = 'New Game'
          winCount = 0
          newWinCount = 0
        }
        newButton.innerHTML = btnText;
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
      playerTurnDiv.textContent = `${activePlayer.getToken()}'s turn... Win Count: ${winCount}`
  
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
            if(cellButton.innerHTML === ''){
              cellButton.addEventListener('click', clickHandlerBoard)
            }
            
          }
          boardDiv.appendChild(cellButton);
        })
    }
  
    // Add event listener for the board
    function clickHandlerBoard(e) {
      const selectedButton = e.target;
    
      if (!selectedButton) return;
      
      game.playRound(selectedButton.dataset.cell);
      updateScreen(false)
      console.log(game.board.printBoard())
      let result = game.checkWinCondition(game.activePlayer);
      console.log(game.activePlayer)
      if(result == 1){
        newWinCount += 1
        console.log('win')
        updateScreen(true)
        renderNewGame(newWinCount)
      }
      else if(result == -2){
        newWinCount -= 1
        console.log('win bot')
        updateScreen(true)
        renderNewGame(newWinCount)
      }
      else if(result==-1){
        console.log('draw')
        updateScreen(true)
        renderNewGame(newWinCount)
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
        startGame(winCount)
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