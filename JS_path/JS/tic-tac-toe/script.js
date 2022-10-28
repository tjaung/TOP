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
            _showStartButton(player1, player2);
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

    // for button press, get player role (human or bot) and number
    function getPlayerInfo(playerRole, index) {
        let isHuman = playerRole == 'human'? true: false;
        let number = index < 2? 1: 2;

        _ready[number-1].textContent = `'Player ${number} ${isHuman}'`
        return number == 1 ? player1 = [isHuman, number] : player2 = [isHuman, number];
    }

    //initialize start button
    function _showStartButton(player1, player2) {
        if (player1 != null && player2 != null) {_startButt.style.display = 'block'};
    }
    
    // initialize game board
    function _hidePlayerSelection() {
        _playerSelection.style.animation = 'fadeOut 1s forwards';
        _playerSelection.style.zIndex = 0;
    }

    return {
        getPlayerInfo: getPlayerInfo,
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

    const getSpace = (i) => _board[i];
    var moveCount = 1;

    // initialize board
    function initializeBoard() {
        _board.style.animationDelay = '1s';
        _board.style.animation = 'fadeIn 1s forwards';
        _board.style.zIndex = 999;
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


    function updateBoard(move) {
        // take the player move and add to the stored array
        // check if theres a win
        if(move % 2){return 'O'}
        else {return 'X'}
    }

    function checkEnd(board, counter) {
        // check the stored board array
        // is there 3 in a row?

        // permutations:
            //1 2 3
            //1 4 7
            //1 5 9

            //2 5 8

            //3 5 7
            //3 6 9
            
            //4 5 6
        
        // if there is a win
            //return player who won and invoke win function
        
        if(counter == 9){
            return 'draw';
        }
        else{return moveCount++}
    }

    function isWin() {
        //show winner page or loser page depnding on player number
        console.log('Winner!')
        return moveCount = 0;
    }

    function isDraw() {
        //show draw page
        console.log('Draw')
        return moveCount = 0;
    }

    //for each button get click event
    _space.forEach(space => {
        space.addEventListener('click', (e) => {
            e.target.innerHTML = updateBoard(getPlayerTurn(moveCount));
            console.log(moveCount)
            if(checkEnd(moveCount) == 9){
                isDraw();
                console.log('Draw');
                moveCount = 1;
            }
            
        });
    });



    return {
        initializeBoard: initializeBoard,
        startGame: startGame,
        Player1: Player1,
        Player2: Player2,
        count: moveCount   
    }
})();

const Results = (() => {
    const resultDOM = document.getElementsByClassName('result');
    const winLose = document.getElementById('win-or-lose');
    const newGame = document.getElementById('new-game');
    const newPlayers = document.getElementById('new-players');

    // functions
    function displayResultMessage(results) {
        // get the results from the Board Object

        //if win
            // put win message with player name and symbol in P tag
        // if one player
            //put win or lose message
        //if draw
            //put draw message
        
        // toggle results DOM display to visible
    }
    
    function startNewGame() {
        //restart board
        //restart score
        //restart player turn

    }

    function getNewPlayers() {
        // toggle player selection display to visible
        // toggle board display to hidden

        // reset Player Objects
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