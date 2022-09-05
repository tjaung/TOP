// GLOBALS
var playerScore = 0;
var computerScore = 0;
var winScore = 5;
var imgSrc = 'images/'

// html items
//let playerSelection = document.getElementById('player').value;
const playfield = document.getElementById('playfield');
const battlefield = document.querySelector('.battleground');
const playerSelection = document.querySelectorAll(".choice");
const resultMessage = document.getElementById('result');
const playerLives = [...document.querySelectorAll(".playerLives")];
const compLives = [...document.querySelectorAll(".compLives")];
const btn = document.getElementById('play-again');
const playerWeapon = document.getElementById('playerWeapon');
const compWeapon = document.getElementById('compWeapon');
const winLose = document.getElementById('win-or-lose');
const gameOver = document.querySelector(".game-over");
const endMessage = document.getElementById('endgameMsg');
const title = document.querySelector('h1')


//play again function
btn.onclick = () => {
  //reset lives
  playerLives.forEach(item => item.style.display = "block");
  compLives.forEach(item => item.style.display = "block");
  
  //reset vars
  winLose.innerText = "";
  playerScore=0;
  computerScore = 0;
  result.innerText = "Choose your weapon!";
  title.innerText = "Rocks Paper Scissors"
  
  // restore playfield
  resultMessage.style.display = 'block'
  playfield.style.display = 'block';
  playfield.style.gridTemplateColumns = 'repeat(6,1fr)'
  playerWeapon.style.display = 'none'
  compWeapon.style.display = 'none'
  battlefield.style.opacity = 0;
  
  //hide endgame
  gameOver.style.opacity = 0;
  //btn.style.display = 'none'
}

// randomly generate a computer choice
function computerPlay() {
    // generate random number between 1 and 3
    let choice = Math.floor((Math.random() * 3) + 1);
    // depending and integer 1:3, generate computer choice
    if(choice == 1){
        choice = 'rock';
    } else if(choice == 2){
        choice = 'paper';
    } else if(choice == 3){
        choice = 'scissor';
    }
    return(choice);
}
const computerSelection = computerPlay();

// get the results of the game
function playRound(playerSelection, computerSelection) {
    // get player selection
    let player = playerSelection;
    if(player == 'None'){
      return('None');
    }
    
    // logic for results
    if(player == 'rock'){
        if(computerSelection == 'rock'){
            return(0);
        } else if(computerSelection == 'paper'){
            return(-1);
        } else if(computerSelection == 'scissor'){
            return(1);
        }
    } else if(player == 'paper'){
        if(computerSelection == 'rock'){
            return(1);
        } else if(computerSelection == 'paper'){
            return(0);
        } else if(computerSelection == 'scissor'){
            return(-1);
        }
    } else if(player == 'scissor'){
        if(computerSelection == 'rock'){
            return(-1);
        } else if(computerSelection == 'paper'){
            return(1);
        } else if(computerSelection == 'scissor'){
            return(0)
        }
    }
  };

function updateScore(results, playerSelection) {
    // update scores and return results
    if(results == 1){
        playerScore += results;
        compLives[compLives.length - playerScore].style.display = 'none'
	winLose.innerText = 'beats'
        resultMessage.innerText = `You Win! ${playerSelection} beats ${computerSelection}`
    }
    else if(results == -1){
        computerScore += 1;
        playerLives[computerScore-1].style.display = 'none'
        winLose.innerText = 'loses to'
        resultMessage.innerText = `You Lose! ${computerSelection} beats ${playerSelection}`
    }
    else if(results == 0){
        resultMessage.innerText = `Tie!`
        winLose.innerText = 'ties with'
    }
}

// check if game is over
function isGameOver() {
  if(playerScore===winScore){
    return 1
  } else if(computerScore===winScore){
    return 2
  }
}

function showWeapons(playerSelection, computerSelection) {
    // place choices on battlefield
    
    playerWeapon.style.display = 'block'
    compWeapon.style.display = 'block'
    playerWeapon.src = imgSrc.concat(playerSelection, '.jpg');
    compWeapon.src = imgSrc.concat(computerSelection, '.jpg');
}

// return the results of the game in ui and update scores.
function game(playerSelection, computerSelection) {
    // play game
    let result = playRound(playerSelection, computerSelection)
    battlefield.style.opacity = 100;
    showWeapons(playerSelection, computerSelection)
    
    // update scores and return results
    updateScore(result, playerSelection)
    //check result
    if(isGameOver() == 1){
      openEndGame(1)   
    } else if(isGameOver() == 2){
       openEndGame(2)
    }
 }

// end game module
function openEndGame(result) {
  playfield.style.display = 'none'
  gameOver.style.opacity = 100
  resultMessage.style.display = 'none'
  btn.style.opacity = 100;
  if(result==1){
    title.innerText = "You Won!"
    endgameMsg.innerText = `You won 5 times!`
  } else if(result ==2){
    title.innerText = "You Lost!"
    endgameMsg.innerText = `The computer won 5 times`
  }

}


// add event to each player choice
for (let i=0; i<playerSelection.length; i++) {
  playerSelection[i].addEventListener('click', function(e) {
    let choice = playerSelection[i].id;
    game(choice, computerPlay())
  }
  );
}

