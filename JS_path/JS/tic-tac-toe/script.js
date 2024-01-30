function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForTime(time, func, ...args) {
    await sleep(time);
    func(...args)
}

class GameBoard {
  constructor(
      rows = 3,
      columns = 3,
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

  placeMove(space, player ){
    const spaceVal = this.boardArray[space].getValue()

    if (spaceVal === null){
      this.boardArray[space].addToken(player);
    }
    else{this.boardArray[space].addToken(spaceVal)}
  }

  printBoard() {
    const boardWithCellValues = this.boardArray.map((cell) => cell.getValue())
    return boardWithCellValues;
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

  switchPlayerTurn = async () => {
    this.activePlayer = this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  getActivePlayer() {
    return this.activePlayer;
  }

  printNewRound() {
    this.board.printBoard();
  }

  checkAvailableMoves() {
      const availableMoves = this.board.getBoard().map((cell) => cell.getValue()).filter((val) => val == null);
      if(availableMoves.length != 0){return true}
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
      if (result) {
        if(this.getActivePlayer().getHuman()) return 1
        else return -2
      }
    }
    if(!this.checkAvailableMoves()) return -1
    else return 0;
  }

  playRound = async(space) => {
    // get active player
    const token = this.getActivePlayer().getToken();
    let human = this.getActivePlayer().getHuman()

    if(!human){
      this.moveBot()
    }
    else if(human){
      this.movePlayer(space)
    }
  }

  moveBot = async() => {
    let currentBoard = this.board.printBoard()
    let currentToken = this.getActivePlayer().getToken()
    let currentHuman = this.getActivePlayer().getHuman()
    let otherToken = currentToken == 'O' ? 'X': 'O'

    // await waitForTime(500, console.log, 'wait for bot')
    if(!currentHuman){
      let botMove = this.getActivePlayer().getBotMove(currentBoard, currentToken, otherToken, currentHuman, this.winCount)
      this.board.placeMove(botMove, currentToken);
      let updatedBoard = this.board.getBoard();

      if(this.checkWinCondition(updatedBoard) != 0) return 1
      else {
        this.switchPlayerTurn();
        this.printNewRound();
      }
    }
  }

  movePlayer(space) {
    if(this.board.printBoard()[space] === null){
      this.board.placeMove(space, this.getActivePlayer().getToken());

      if(this.checkWinCondition(this.board.getBoard()) != 0) return 1
      else {
        // this.printNewRound();
        this.switchPlayerTurn();
        this.moveBot()
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
  ) {
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
    ) return true;
    else return false;
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
    }, []);


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
    let move = this.makeAIBotMove(board, botToken, humanToken, bot, diff)
    return move
  }

}

function ScreenController() {
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');
  const restartDiv = document.querySelector('.restart');
  const winDiv = document.querySelector('.wins')

  let playerHuman = 1;
  let game = new GameController();
  let winCount = 0
  let newWinCount = winCount
  
  function typeText(target, text) {
    speed = 25
    i = 0;
    if (i < text.length) {
      let t = text.charAt(i)
      target.innerHTML += text.charAt(i);
      i++;
      waitForTime(speed, typeText, target, text.substring(i))
    }
  }
  
  // info button
  function clickToggleInfo(e){
    const target = e.target;
    const infoWindow = document.createElement('div');
    const closeButton = document.createElement('button')
    const infoText = document.createElement('p');
    const body = document.querySelector('body')
    text = "10 hackers are trying to hack into your computer for your personal information! Luckily, you've set up your machine's defenses to block them out by beating them at a game of tic-tac-toe. Can you defeat all 10 hackers? Every opponent will get increasingly difficult as you defeat more of them."
    typeText(infoText, text)
    
    closeButton.addEventListener('click', clickCloseInfo)
    closeButton.innerHTML = 'X'
    infoWindow.appendChild(closeButton)
    infoWindow.appendChild(infoText)
    infoWindow.className = 'info-window'
    info.disabled=true;
    body.appendChild(infoWindow)
  }

  function clickCloseInfo(e) {
    const target = e.target
    const infowin = document.querySelector('.info-window')
    const body = document.querySelector('body')
    // body = body.removeChild(info)
    infowin.remove()
    info.disabled = false;
  }

  const info = document.querySelector('.info');
  info.addEventListener('click', clickToggleInfo)

  // get human or bot
  function clickPlayerButtonValue(e){
    const target = e.target;
    if(target.className.includes('1')){playerHuman = target.value}
    else if(target.className.includes('2')){playerHuman = target.value}
    console.log(`playerHuman: ${playerHuman}`);
  }
  const startGame = (winCount) => { 
    game = new GameController(playerHuman = playerHuman, winCount = winCount);
    console.log(`Player 1: ${game.players[0].getToken()}, Human: ${game.players[0].getHuman()}`)
    console.log(`Player 2: ${game.players[1].getToken()}, Human: ${game.players[1].getHuman()}`)
    
    updateScreen();
  }

  // toggle board fade in and out
  function fadeIn(id) {
    const target = document.getElementById(id)
    target.style.animation = 'fadeIn 0.5s forwards';
    // if(target.className === 'fadeout') {
    target.className ='fadein'
      // target.classList.toggle('fadeout')
    target.style.zIndex = 999;
  }

  function fadeOut(id) {
    const target = document.getElementById(id)
    target.style.animation = 'fadeOut 0.5s';
    // target.classList.toggle('fadeout')
    // if(target.className === 'fadeout') {
    target.className ='fadeout'
    // target.classList.toggle('fadein')
    target.style.zIndex = 0; 
  }

  function clickStartGame(e) {
    const target = e.target;
    const container = document.getElementsByClassName('.container')
    const mainMenu = document.getElementById('mainmenu')
    
    const runStartGame = async () => {
      fadeOut('mainmenu')
      waitForTime(1000, console.log, 'wait')
      // mainMenu.style.display = 'none';
      waitForTime(1000, fadeIn, 'game-container')
      startGame(winCount)
    }
    runStartGame()
  }

  const renderStart = () => {
    const startButton = document.querySelector('.start');
    const player1 = document.querySelector('#player1')
    const player2 = document.querySelector('#player2')
    const selectionButts = player1.getElementsByTagName('button');
    const selectionButts2 = player2.getElementsByTagName('button');
    const gameContainer = document.querySelector('#game-container')
    const container = document.querySelector('.container')
    
    container.style.display = 'flex'
    winCount = 0
    newWinCount = 0

    if(gameContainer.className === 'fadein') {
      fadeOut('game-container')
      restartDiv.querySelectorAll('*').forEach(n => n.remove());
      waitForTime(1000, fadeIn, 'mainmenu')
      restartDiv.querySelectorAll('*').forEach(n => n.remove());
    }
    else fadeIn('mainmenu')

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
    const activePlayer = game.getActivePlayer();
 
    const newButton = document.createElement("button");
    const mainMenuButton = document.createElement("button");

    playerTurnDiv.textContent = `${activePlayer.getToken()} Wins!`
    if(newWinCount === winCount){
      btnText = 'Restart'
      playerTurnDiv.textContent = `It's a draw!`
    }
    else if(newWinCount > winCount){
      btnText = 'Next Round'
      winCount = newWinCount;
      playerTurnDiv.textContent = `${activePlayer.getToken()} Wins!`
    }
    else{
      btnText = 'New Game'
      winCount = 0
      newWinCount = 0
      playerTurnDiv.textContent = `${activePlayer.getToken()} Wins!`
    }
    newButton.innerHTML = btnText;
    newButton.addEventListener('click', clickNewGame);
    mainMenuButton.innerHTML = 'Main Menu';
    mainMenuButton.addEventListener('click', renderStart)
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
    playerTurnDiv.textContent = `${activePlayer.getToken()}'s turn`
    winDiv.textContent = `Win Count: ${winCount}`

    // Render board squares
    board.forEach((cell, index) => {
        // Anything clickable should be a button
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
      restartDiv.querySelectorAll('*').forEach(n => n.remove());
      startGame(winCount)
  }

  // start animation
  const loadStart = () => {
    var intervalID = window.setInterval(updateScreen, 200);
    var console = document.getElementById("console");
    const msg = document.querySelector(".msg");

    var txt = [
      "FORCE: XX0022. ENCYPT://000.222.2345",
      "TRYPASS: ********* AUTH CODE: ALPHA GAMMA: 1___ PRIORITY 1",
      "RETRY: REINDEER FLOTILLA",
      "Z:> /FALKEN/GAMES/TICTACTOE/ EXECUTE -PLAYERS 0",
      "================================================",
      "Priority 1 // local / scanning...",
      "scanning ports...",
      "BACKDOOR FOUND (23.45.23.12.00000000)",
      "BACKDOOR FOUND (13.66.23.12.00110000)",
      "BACKDOOR FOUND (13.66.23.12.00110044)",
      "...",
      "...",
      "BRUTE.EXE -r -z",
      "...locating vulnerabilities...",
      "...vulnerabilities found...",
      "MCP/> DEPLOY CLU",
      "SCAN: __ 0100.0000.0554.0080",
      "SCAN: __ 0020.0000.0553.0080",
      "SCAN: __ 0001.0000.0554.0550",
      "SCAN: __ 0012.0000.0553.0030",
      "SCAN: __ 0100.0000.0554.0080",
      "SCAN: __ 0020.0000.0553.0080"
    ];

    var docfrag = document.createDocumentFragment();

    function updateScreen() {
      //Shuffle the "txt" array
      txt.push(txt.shift());
      //Rebuild document fragment
      txt.forEach(function (e) {
        var p = document.createElement("p");
        p.className = 'hackerText'
        p.textContent = e;
        docfrag.appendChild(p);
      });
      //Clear DOM body
      while (console.firstChild) {
        console.removeChild(console.firstChild);
      }
      console.appendChild(docfrag);
    }

    setTimeout(() => {
      msg.style.background = "limegreen";
      msg.innerHTML = "ACCESS GRANTED";
      msg.style.boxShadow = "0 0 30px limegreen";
      console.style.display = "none";
    }, 5000);

    setTimeout(() => {
      msg.style.animation = 'fadeOut 0.5s forwards';
    }, 6000);

    setTimeout(() => {
      msg.remove()
      console.remove()
    }, 8000);
    // setTimeout(() => {
    //   renderStart()
    // }, 9000);
    // renderStart()
  }
  
  const start = () => {
    loadStart()
    setTimeout(() => {
      renderStart()
    }, 8000);
    // waitForTime(8000, renderStart)
  }
  // Initial render
  start()
  // renderStart()
}

ScreenController();
