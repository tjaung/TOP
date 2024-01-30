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

const Bot = (humanOrBot, number) => {
    const isHuman = humanOrBot;
    const playerNumber = number;
    const symbol = (playerNumber == 1? 'X' : 'O');
    const difficulty = 0;

    // function for easy mode: random open spot
    function getMove(botDifficulty, board) {
        let spaces = Board.boardArray.multiIndexOf('');
        let move = null;
        if(botDifficulty == 0){
            move = spaces[Math.floor(Math.random()*spaces.length)];
            console.log(move)
        }

        return move
    }

    return {playerNumber, isHuman, symbol,
    getMove: getMove}
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

    // game start
    function startGame(playerOne, playerTwo) {
        console.log
        Player1 = playerOne[0]? Player(playerOne[0], playerOne[1]): Bot(playerOne[0], playerOne[1])
        Player2 = playerTwo[0]? Player(playerTwo[0], playerTwo[1]): Bot(playerTwo[0], playerTwo[1])
        _scores.children[0].innerHTML = `${Player1['playerNumber']} ${Player1['isHuman']} ${Player1['symbol']}`
        _scores.children[2].innerHTML = `${Player2['playerNumber']} ${Player2['isHuman']} ${Player2['symbol']}`
        console.log(Player1)
        console.log(Player2)
        //while turn move is less than 10:
        // get the turn move i.e. move 1. if odd, player1 goes.
        // on turn move, on button click, add symbol to button. make button unclickable after
        // check wins, if none:
        // iterate turn move
    }

    function getPlayerTurn(move) {
        // determine if theres a bot and what player
        if(move % 2){
            _scores.children[1].innerHTML = "Player Two's Turn"
            if(!Player2.isHuman) {return Player2.getMove(0, boardArray)}
            else{return 2}
        }
        _scores.children[1].innerHTML = "Player One's Turn"
        if(!Player1.isHuman){return Player1.getMove(0, boardArray)}
        else {return 1}
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

    function getAllIndexes(arr, val) {
        var indexes = [], i = -1;
        while ((i = arr.indexOf(val, i+1)) != -1){
            indexes.push(i);
        }
        return indexes;
    }

    function checkEnd(board, counter, boardFlag) {
        let moves = getAllIndexes(board, boardFlag);

        // easy win method: check if indices are in win index conditions
        let across1 = [0,1,2]
        let across2 = [3,4,5]
        let across3 = [6,7,8]

        let down1 = [0,3,6]
        let down2 = [1,4,7]
        let down3 = [2,5,8]

        let diagnal1 = [0,4,8]
        let diagnal2 = [2,4,6]
        let permutations = [across1, across2, across3, down1, down2, down3, diagnal1, diagnal2]

        for(let i = 0; i<permutations.length; i++){
            let result = permutations[i].every(j => moves.includes(j));
            if(result){
                isWin(boardFlag)
                return {moveCount: moveCount,
                    outcome: true}
            }
        }
      
        // programatic for game of any size: in prgoress
        // for(f){
        // // let winCount = [1,1,1,1]
        // // // let downCount = 1;
        // // // let diagnalCount = 1;
        // // // let reverseDiagnalCount = 1;
        // // let n = 3;
        // // // no matter board size, winning permutations will always be following:
        // // //  across will always be +1
        // // //  down will always be +n
        // // //  diagnol will always be +(n+1)
        // // let restOfMoves = [];
        // // let difference = 0;

        // // // across
        // // for(let i=1; i<moves.length; i++) {
        // //     restOfMoves = moves.slice(i-1)

        // //     for(j=0; j<restOfMoves.length; j++){
        // //         difference = restOfMoves[j] - moves[i];
        // //         console.log(difference)
        // //         if(difference == 1){
        // //             winCount[0] += 1;
        // //             console.log('+1 across')
        // //             if(restOfMoves.indexOf(j+1) !== -1){
        // //                 isWin(boardFlag)
        // //                 return {moveCount: moveCount,
        // //                     outcome: true,
        // //                     winCount: winCount}
        // //             }
        // //         }
        // //         else if(difference == n){
        // //             winCount[1] += 1;
        // //             console.log('+1 down')
        // //             if(restOfMoves.indexOf(j+n) !== -1){
        // //                 isWin(boardFlag)
        // //                 return {moveCount: moveCount,
        // //                     outcome: true,
        // //                     winCount: winCount}
        // //             }
        // //         }
        // //         else if(difference == n+1){
        // //             winCount[2] += 1;
        // //             console.log('+1 diagnal')
        // //             if(restOfMoves.indexOf(j+n+1) !== -1){
        // //                 isWin(boardFlag)
        // //                 return {moveCount: moveCount,
        // //                     outcome: true,
        // //                     winCount: winCount}
        // //             }
        // //         }
        // //         else if(difference == n-1){
        // //             winCount[3] += 1;
        // //             console.log('+1 reverse diagnal')
        // //             if(restOfMoves.indexOf(j+n-1) !== -1){
        // //                 isWin(boardFlag)
        // //                 return {moveCount: moveCount,
        // //                     outcome: true,
        // //                     winCount: winCount}
        // //             }
        // //         }
        //         // if (winCount.indexOf(3) !== -1){
        //         // // winCount=[1,1,1,1]
        //         //     isWin(boardFlag)
        //         //     console.log(`${boardFlag}`)
        //         //     return {moveCount: moveCount,
        //         //         outcome: true,
        //         //         winCount: winCount}
        //         // };

        // // down
        // // for(let i=0; i<moves.length; i++){
        // //     if(moves[i+1]-moves[i] == n){
        // //         rowCount++
        // //         console.log(rowCount)
        // //         if (rowCount == n){
        // //             moveCount=1
        // //             isWin(boardFlag)
        // //             console.log(`${boardFlag} down`)
        // //             return {moveCount: moveCount,
        // //                 outcome: true}
        // //         }
        // //     }
        // //     else{
        // //         rowCount=1;
        // //     };
        // // }; 
        // // // diagnal
        // // for(let i=0; i<moves.length; i++){
        // //     if(moves[i+1]-moves[i] == n+1){
        // //         rowCount++
        // //         console.log(rowCount)
        // //         if (rowCount == n){
        // //             moveCount=1
        // //             isWin(boardFlag)
        // //             console.log(`${boardFlag} diagnal`)
        // //             return {moveCount: moveCount,
        // //                 outcome: true}
        // //         }
        // //     }
        // //     else{
        // //         rowCount=1;
        // //     };
        // // };

        // // // reverse diagnal
        // // for(let i=0; i<moves.length; i++){
        // //     if(moves[i+1]-moves[i] == n-1){
        // //         rowCount++
        // //         console.log(rowCount)
        // //         if (rowCount == n){
        // //             moveCount=1
        // //             isWin(boardFlag)
        // //             console.log(`${boardFlag} diagnal`)
        // //             return {moveCount: moveCount,
        // //                 outcome: true}
        // //         }
        // //     }
        // //     else{
        // //         rowCount=1;
        // //     };
        // // };
        // }

        if(counter == 9){
            moveCount=1
            isDraw()
            return {moveCount: moveCount,
                    outcome: true}
        }
        else{
           // winCount = [1,1,1,1];
            return {moveCount: moveCount++,
                     outcome: false}
        }
    };

    function resetBoard() {
        _scores.children[1].innerHTML = "Player One's Turn"
        _space.forEach(butt => {
            butt.innerHTML = '';
            butt.classList = 'board-square';
            });
        boardArray = [0,0,0,
                    0,0,0,
                    0,0,0]
        return {boardArray: boardArray}
    };

    function isWin(player) {
        //show winner page or loser page depnding on player number
        console.log('Winner!')
        let outcome = `${player} Wins!`
        Results.displayResultMessage(outcome)
        return moveCount = 1;
    }

    function isDraw() {
        //show draw page
        console.log('Draw')
        let outcome = "It's a Draw!"
        Results.displayResultMessage(outcome)
        return moveCount = 1;
    }

    //for each button get click event
    _space.forEach((space, index) => {
        space.addEventListener('click', (e) => {       
            boardChanges = updateBoard(getPlayerTurn(moveCount), index, boardArray);
            e.target.innerHTML = boardChanges.symbol;
            e.target = toggleButtonClickability(e.target);
            console.log(boardArray)
            checkEnd(boardArray, moveCount, boardChanges.symbol)        
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
        startNewGameWithNewPlayers();
        PlayerSelection.showPlayerSelection();
    });

    newGame.addEventListener('click', () => {
        startNewGame();
    });

    // functions
    function displayResultMessage(outcome) {
     //   resultDOM.style.animationDelay = '1s';
        winLose.children[0].innerHTML = outcome;
        resultDOM.style.animation = 'fadeInHalf 1s forwards';
        resultDOM.style.zIndex = 999;
    }

    // hide message
    function hideResultMessage() {
        //resultDOM.style.animationDelay = '1s';
        resultDOM.style.animation = 'fadeOut 1s forwards';
        resultDOM.style.zIndex = 0;
    }
    
    function startNewGameWithNewPlayers() {
        Board.hideBoard();
        Board.resetBoard();
        hideResultMessage();
        PlayerSelection.showPlayerSelection();
    }

    function startNewGame() {
        Board.resetBoard();
        hideResultMessage();
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