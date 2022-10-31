const Player = (humanOrBot, number) => {
    const isHuman = humanOrBot;
    const playerNumber = number;
    const symbol = (playerNumber == 1? 'X' : 'O');
    const isTurn = false;
    // functions
    function toggleTurn() {
        isTurn = isTurn? false: true;
    }
    return {playerNumber, isHuman, symbol, isTurn}
}

const PlayerSelection = (() => {

    // --- GET MODULE DOM COMPONENTS
    let _playerSelection = document.querySelector('#player-selection');
    let _playerCard = Array.from(document.querySelectorAll('.card-container'));
    let _selection_butts = document.querySelectorAll('.player-button');
    let _startButt = document.querySelector('#start-butt');
    let _ready = Array.from(document.querySelectorAll('.ready'));

    // other local vars
    let player1 = null;
    let player2 = null;

    // --- GIVE FUNCTIONALITY ---

    // Player selection buttons
    for (let i=0; i < _selection_butts.length; i++) {
        _selection_butts[i].addEventListener('click', (e) => {
            console.log(i)
            getPlayerInfo(e.target.classList[0], i);
            _toggleStartButton(player1, player2);
        });
    }

    // Start game button
        _startButt.addEventListener('click', (e) => {
            console.log(player1)
            console.log(player2)
            _hidePlayerSelection();
            window.setTimeout(() => Board.initializeBoard(), 500);
            Board.startGame(player1, player2);
        });

        
    // --- FUNCTIONS ---

    // reset player selection
    function resetSelection() {
        player1 = null;
        player2 = null;
        _ready.forEach(div => div.textContent = '');
        _startButt.style.display = 'none';
        return {player1: player1,
                player2: player2}
    }

    // for button press, get player role (human or bot) and number
    function getPlayerInfo(playerRole, index) {
        let isHuman = playerRole == 'human'? true: false;
        let number = index < 2? 1: 2;

        _ready[number-1].textContent = `'Player ${number} ${isHuman}'`
        return number == 1 ? player1 = [isHuman, number] : player2 = [isHuman, number];
    }

    //initialize start button
    function _toggleStartButton(player1, player2) {
        if (player1 != null && player2 != null) {_startButt.style.display = 'block'}
        else {_startButt.style.display = 'none'};
    }

    // show player selection
    function showPlayerSelection() {
        _playerSelection.style.animationDelay = '1s';
        _playerSelection.style.animation = 'fadeIn 1s forwards';
        _playerSelection.style.zIndex = 999;
        resetSelection();
    }
    
    // initialize game board
    function _hidePlayerSelection() {
        _playerSelection.style.animation = 'fadeOut 1s forwards';
        _playerSelection.style.zIndex = 0;
    }

    return {
        getPlayerInfo: getPlayerInfo,
        showPlayerSelection: showPlayerSelection,
        resetSelection: resetSelection,
        player1Info: player1,
        player2Info: player2
        
    }
})();

var Board = (() => {

    // --- INITIALIZE MODULE DOM COMPONENTS
    let _board = document.querySelector('#board');
    let _space = Array.from(document.getElementsByClassName('board-square'));
    let _scores = document.querySelector('#score');

    // get local vars
    let Player1 = null;
    let Player2 = null;
    let boardArray = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
    ];
    Array.prototype.multiIndexOf = function (el) { 
        var idxs = [];
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i] === el) {
                idxs.unshift(i);
            }
        }
        return idxs;
    };

    const getSpace = (i) => _board[i];
    var moveCount = 1;
    let outcome = null;

    // initialize board
    function initializeBoard() {
        _board.style.animationDelay = '1s';
        _board.style.animation = 'fadeIn 1s forwards';
        _board.style.zIndex = 999;
    }

    // hide board
    function hideBoard() {
        //_board.style.animationDelay = '1s';
        _board.style.animation = 'fadeOut 1s forwards';
        _board.style.zIndex = 0;
    }

    // update player info
    function updatePlayers(playerInfo) {
        let [playerHuman, playerNumber] = [playerInfo[0], playerInfo[1]]
        let newPlayer = Player(playerHuman, playerNumber);
        return {newPlayer}
    }

    // game start
    function startGame(playerOne, playerTwo) {
        console.log
        Player1 = Player(playerOne[0], playerOne[1])
        Player2 = Player(playerTwo[0], playerTwo[1])
        _scores.children[0].innerHTML = `${Player1['playerNumber']} ${Player1['isHuman']} ${Player1['symbol']}`
        _scores.children[1].innerHTML = `${Player2['playerNumber']} ${Player2['isHuman']} ${Player2['symbol']}`

        //while turn move is less than 10:
        // get the turn move i.e. move 1. if odd, player1 goes.
        // on turn move, on button click, add symbol to button. make button unclickable after
        // check wins, if none:
        // iterate turn move
    }

    function getPlayerTurn(move) {
        if(move % 2){
            return 2
        }
        return 1
    };

    function toggleButtonClickability(butt) {
        return butt.classList.contains('disabled')?  butt.classList: butt.classList.toggle('disabled');
    };

    function updateBoard(move, index, boardArray) {
        // take the player move and add to the stored array
        // check if theres a win
        if(move % 2){
            boardArray[index] = 'O';
            return {symbol: 'O',
                    boardArray: boardArray}}
        else {
            boardArray[index] = 'X';
            return {symbol: 'X',
                    boardArray: boardArray}}
    };

    function checkEnd(board, counter, boardFlag) {
        let moves = board.multiIndexOf(boardFlag).sort();
        let rowCount = 1;
        let n = 3;
        // no matter board size, winning permutations will always be following:
        //  across will always be +1
        //  down will always be +n
        //  diagnol will always be +(n+1)

        // across
        for(let i=0; i<moves.length; i++){
            if(moves[i+1]-moves[i] == 1){
                rowCount++
                console.log(rowCount)
                if (rowCount == n){
                    moveCount=1
                    isWin()
                    console.log(`${boardFlag} across`)
                    return {moveCount: moveCount,
                        outcome: true}
                };
            }
            else{
                rowCount=1;
            };
        };
        // down
        for(let i=0; i<moves.length; i++){
            if(moves[i+1]-moves[i] == n){
                rowCount++
                console.log(rowCount)
                if (rowCount == n){
                    moveCount=1
                    isWin()
                    console.log(`${boardFlag} down`)
                    return {moveCount: moveCount,
                        outcome: true}
                }
            }
            else{
                rowCount=1;
            };
        }; 
        // diagnal
        for(let i=0; i<moves.length; i++){
            if(moves[i+1]-moves[i] == n+1){
                rowCount++
                console.log(rowCount)
                if (rowCount == n){
                    moveCount=1
                    isWin()
                    console.log(`${boardFlag} diagnal`)
                    return {moveCount: moveCount,
                        outcome: true}
                }
            }
            else{
                rowCount=1;
            };
        };

        if(counter == 9){
            moveCount=1
            isDraw()
            return {moveCount: moveCount,
                    outcome: true}
        }
        else{
            rowCount = 1;
            return {moveCount: moveCount++,
                     outcome: false}
        }
    };

    function resetBoard(boardArray) {
        _space.forEach(butt => {
            butt.innerHTML = '';
            butt.classList = butt.classList.contains('disabled')? butt.classList.toggle('disabled'): butt.classList;
            });
        return boardArray = [0,0,0,
                            0,0,0,
                            0,0,0]
    };

    function isWin() {
        //show winner page or loser page depnding on player number
        console.log('Winner!')
        Results.displayResultMessage()
        return moveCount = 1;
    }

    function isDraw() {
        //show draw page
        console.log('Draw')
        Results.displayResultMessage()
        return moveCount = 1;
    }

    //for each button get click event
    _space.forEach((space, index) => {
        space.addEventListener('click', (e) => {
            out = getPlayerTurn(moveCount)
            boardChanges = updateBoard(out, index, boardArray);
            e.target.innerHTML = boardChanges.symbol;
            boardArray = boardChanges.boardArray;
            e.target = toggleButtonClickability(e.target);
           
            if(checkEnd(boardArray, moveCount, boardChanges.symbol).outcome){
                // show play again
                console.log('outcome')
            }
            
        });
    });



    return {
        initializeBoard: initializeBoard,
        hideBoard: hideBoard,
        startGame: startGame,
        resetBoard: resetBoard,
        Player1: Player1,
        Player2: Player2,
        count: moveCount,
        boardArray: boardArray   
    }
})();

const Results = (() => {
    const resultDOM = document.querySelector('#result');
    const winLose = document.getElementById('win-or-lose');
    const newGame = document.getElementById('new-game');
    const newPlayers = document.getElementById('new-players');

    newPlayers.addEventListener('click', () => {
        startNewGame();
        PlayerSelection.showPlayerSelection();
    });

    // functions
    function displayResultMessage() {
     //   resultDOM.style.animationDelay = '1s';
        resultDOM.style.animation = 'fadeIn 1s forwards';
        resultDOM.style.zIndex = 999;
    }

    // hide message
    function hideResultMessage() {
        //resultDOM.style.animationDelay = '1s';
        resultDOM.style.animation = 'fadeOut 1s forwards';
        resultDOM.style.zIndex = 0;
    }
    
    function startNewGame() {
        Board.hideBoard();
        Board.resetBoard(Board.boardArray);
        hideResultMessage();
        PlayerSelection.showPlayerSelection();
    }

    function getNewPlayers() {
        // toggle player selection display to visible
        // toggle board display to hidden

        // reset Player Objects
    }

    return {
        displayResultMessage: displayResultMessage
    }
})();

const Score = (() => {
    let _scoreboard = document.getElementById('score');
    let _player1 = document.getElementById('player1-score');
    let _player2 = document.getElementById('player2-score');
    
    function updateScore() {
        //if there is a win
        // update score of appropriate player
    }

})();