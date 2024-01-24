class GameBoard {
    constructor(
        rows = 3,
        columns = 3,
        // boardArray = []
    ) {
        this.boardArray = new Array(rows*columns)

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class GameController {
    constructor(
      playerHuman,
      winCount
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
      this.winCount = winCount/10;
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

    checkWinCondition(b) {
        let val = this.getActivePlayer().getToken()
        const boardWithCellValues = b.map(function (cell) {
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
        console.log(result, permutations[i], this.getActivePlayer().getHuman())
        if (result) {
          if(this.getActivePlayer().getHuman()){
            return 1
          }
          else{return -2}
        }
      }
      if(!this.checkAvailableMoves()) return -1
      else {return 0;}
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
      let currentBoard = this.board.printBoard()
      let currentToken = this.getActivePlayer().getToken()
      let currentHuman = this.getActivePlayer().getHuman()
      let otherToken = currentToken == 'O' ? 'X': 'O'
      console.log(`current token: ${currentToken}, other token: ${otherToken}`)
      if(!currentHuman){
        let botMove = this.getActivePlayer().getBotMove(currentBoard, currentToken, otherToken, currentHuman, this.winCount)
        this.board.placeMove(botMove, currentToken);
        let updatedBoard = this.board.getBoard();

        console.log(`bot move: ${botMove}`)
        if(this.checkWinCondition(updatedBoard) != 0){
          console.log('end')
          return 1
        }
        else {
          this.switchPlayerTurn();
          this.printNewRound();
        }
      }
    }

    movePlayer(space) {
      if(this.board.printBoard()[space] === null){
        this.board.placeMove(space, this.getActivePlayer().getToken());

        if(this.checkWinCondition(this.board.getBoard()) != 0){
          console.log('end')
          return 1
        }
        else {
          this.printNewRound();
          console.log(`Player turn just went is bot: ${this.getActivePlayer().getHuman()}`)
          this.switchPlayerTurn();
          console.log(`Next player is bot: ${this.getActivePlayer().getHuman()}`)
          this.moveBot();
        }
      }
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
   findWin(board, player){
    if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
    ) {
    return true;
    } else {
    return false;
    }
   }

   makeEasyBotMove(board) {
    //randomly pick an available space
    const available = board
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


  minimax(board, botToken, humanToken, isHuman){
  
    // copy board
    let newBoard = []
    for(let i = 0; i< 9; i++){
      newBoard.push(board[i])
    }

    // get available
    let available = newBoard.reduce((acc, curr, index) => {
      if (curr === null) {
        acc.push(index);
      }
      return acc;
    }
      , []);

    // console.log(available)
    // console.log(newBoard)

    // scores for terminal states
    if(this.findWin(newBoard, humanToken)) return {score:-10}
    else if (this.findWin(newBoard, botToken)) return {score:10}
    else if(available.length === 0) return {score:0};

    // moves
    let moves = [];

    // loop available
    for (let i = 0; i < available.length; i++){
      let move  = {};
        move['index'] = available[i];

      // set empty spot to player
      if(isHuman){newBoard[available[i]] = humanToken}
      else{newBoard[available[i]] = botToken}

      // get score
      if (isHuman){
        let result = this.minimax(newBoard, botToken, humanToken, false)
        move['score'] = result.score;
      }
      else {
        let result = this.minimax(newBoard, botToken, humanToken, true);
        move['score'] = result.score;
      }

      //reset spot to empty
      newBoard[available[i]] = null;

      //push to array
      moves.push(move)  
    }

  // choose best move
  let bestMove;
  if(!isHuman){
    let bestScore = -10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  else {
    let bestScore = 10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  
  let best = moves[bestMove]
  return best

}

  makeAIBotMove(board, botToken, humanToken, bot, diff) {
    let chance = Math.random()
    if(diff < chance){return this.makeEasyBotMove(board)}
    else{return this.minimax(board, botToken, humanToken, bot).index}
  }

  getBotMove(board, botToken, humanToken, bot, diff){
    let move = null
    // move = this.makeEasyBotMove(board, player)
    move = this.makeAIBotMove(board, botToken, humanToken, bot, diff)
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
      game = new GameController(playerHuman = playerHuman, winCount = winCount);
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
      let result = game.checkWinCondition(game.board.getBoard());
      console.log(result)
      console.log(game.activePlayer)
      if(result == 1){
        newWinCount += 1
        console.log('win')
        updateScreen(true)
        renderNewGame(newWinCount)
      }
      else if(result == -2){
        newWinCount = 0
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