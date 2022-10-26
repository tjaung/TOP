const Board = (() => {
    let _board = new Array(9);
    let _space = document.getElementsByClassName('board-square');

    const getSpace = (i) => _board[i];

    //for each button get click event
    _space.forEach(space => {
        space.addEventListener('click', getMarker);
    });

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

const Player = (name, human, whichPlayer) => {
    const playerName = name;
    const isHuman = human;
    const playerNumber = whichPlayer;
    const symbol = (whichPlayer == 1? X : O);

    // functions
    const _isWin = () => console.log('winner: ${playerName}')//win function
    const _isLose = () => console.log('loser: ${playerName}')//lose function
}

const PlayerSelection = (() => {
    let _playerSelection = document.getElementsByClassName('player-selection');
    let _players = document.getElementsByClassName('players');
    // get child elements of _players as well. This will be the info needed to create new Player objects

    function sendInfo() {
        // take the info from the player selection DOM

        // create new Player Objects and return them
    }

    function _takeAwaySelection () {
        // toggle the player selection DOM display to none
        // toggle the board DOM display on
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