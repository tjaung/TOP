const Board = (() => {
    let _board = document.querySelector('.board');
    let _space = Array.from(document.getElementsByClassName('board-square'));

    // let Player1 = Player(true, 1);
    // let Player2 = Player(false, 2);

    const getSpace = (i) => _board[i];

    //for each button get click event
    _space.forEach(space => {
        space.addEventListener('click', getMarker);
    });

    // update player info
    function updatePlayers() {
        
    }
    function getMarker(e) {
        //get player turn
        //get player symbol

        //check if space is empty
        //if space is empty
            //turn button p innerhtml to player marker
        //else
            //do nothing
        //return space index to board and player
    } 


    function checkBoard(move) {
        let boardArray = newArray(9); //could this be the private board?
        // take the player move and add to the stored array
        // check if theres a win
    }

    function checkWins(board) {
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
        
        //if board is full and now wins
            //invoke draw function
    }

    function isWin() {
        //show winner page or loser page depnding on player number
    }

    function isDraw() {
        //show draw page
    }

})();

const Player = (humanOrBot, number) => {
    const isHuman = humanOrBot;
    const playerNumber = number;
    const symbol = (playerNumber == 1? 'X' : 'O');

    // functions
    const _isWin = () => console.log('winner: ${playerName}')//win function
    const _isLose = () => console.log('loser: ${playerName}')//lose function

    return {playerNumber, isHuman, symbol}
}

const PlayerSelection = (() => {
    let _board = document.querySelector('#board');
    let _playerSelection = document.querySelector('#player-selection');
    let _players = Array.from(document.querySelectorAll('players'));
   // let player1 = _players[0], player2 = _players[1];

    let _selection_butts = document.querySelectorAll('.player-button');
    let _startButt = document.querySelector('#start-butt');
    let _ready = document.querySelectorAll('.ready');


    // give player selection buttons functionality
    for (let i=0; i < _selection_butts.length; i++) {
        _selection_butts[i].addEventListener('click', (e) => {
            getPlayerInfo(e.target.classList[0], i);
            showStartButton(player1, player2);
        });
    }

    
    //hide player selection and initialize game board
    _startButt.addEventListener('click', (e) => {
        
        showBoard();
    })

    let player1 = null;
    let player2 = null;
    // for button press, get player role (human or bot) and number
    function getPlayerInfo(playerRole, index) {
        let isHuman = playerRole == 'human'? true: false;
        let number = index < 2? 1: 2;

        _ready[number-1].textContent = `'Player ${number} ${isHuman}'`
        return number == 1 ? player1 = [isHuman, number] : player2 = [isHuman, number];
    }

    //initialize start button
    function showStartButton(player1, player2) {
        if (player1 != null && player2 != null) {_startButt.style.display = 'block'};
    }
    // get child elements of _players as well. This will be the info needed to create new Player objects

    // initialize game board
    function showBoard() {
       // let board = document.querySelector('#board');
        _playerSelection.style.animation = 'fadeOut 1s forwards';
        _playerSelection.style.zIndex = 0;
        _board.style.animationDelay = '1s';
        _board.style.animation = 'fadeIn 1s forwards';
        _board.style.zIndex = 999;

    }

    return {
        getPlayerInfo: getPlayerInfo,
        player1Flag: player1,
        player2Flag: player2
        
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