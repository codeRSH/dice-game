/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var playerScore, roundScore, activePlayer, gamePlaying, previousDice0, previousDice1, winnerScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
  var changePlayer;

  if (!gamePlaying) {
    return;
  }

  var dice0 = Math.floor(Math.random() * 6) + 1;
  var dice1 = Math.floor(Math.random() * 6) + 1;
  var dice0DOM = document.getElementById('dice-0');
  var dice1DOM = document.getElementById('dice-1');

  dice0DOM.style.display = 'block';
  dice1DOM.style.display = 'block';
  // diceDOM.setAttribute('src', 'dice-' + dice0 + '.png');
  dice0DOM.src = 'dice-' + dice0 + '.png';
  dice1DOM.src = 'dice-' + dice1 + '.png';

  if (dice0 === 1 || dice1 === 1) {
    changePlayer = true;
  } // else if ((dice0 === previousDice0 && dice0 === 6) || (dice1 === previousDice1 && dice1 === 6)) {
    else if ( dice0 === dice1 && dice1 === 6 ) {
    changePlayer = true;
    playerScore[activePlayer] = 0;
    document.getElementById('score-' + activePlayer).textContent = playerScore[activePlayer];
  } else {
    roundScore += (dice0 + dice1);
  }

  document.querySelector('#current-' + activePlayer).textContent = roundScore;

  console.log('ActivePlayer : ' + activePlayer + ' Dice0 : ' + previousDice0 + ' ' + dice0 +
    ' Dice1 : ' + previousDice1 + ' ' + dice1);

  previousDice0 = dice0;
  previousDice1 = dice1;

  if (changePlayer) {
    changeActivePlayer();
  }

});


document.querySelector('.btn-hold').addEventListener('click', function () {

  if (!gamePlaying) {
    return;
  }

  playerScore[activePlayer] += roundScore;
  roundScore = 0;

  // document.querySelector('#score-' + activePlayer).textContent = playerScore[activePlayer];
  document.getElementById('score-' + activePlayer).textContent = playerScore[activePlayer];

  document.querySelector('#current-' + activePlayer).textContent = roundScore;

  document.querySelector('#dice-0').style.display = 'none';
  document.querySelector('#dice-1').style.display = 'none';

  if (playerScore[activePlayer] >= winnerScore) {
    document.getElementById('name-' + activePlayer).textContent = 'Winner!!';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
  } else
    changeActivePlayer();
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  gamePlaying = true;
  playerScore = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  previousDice0 = 0;
  previousDice1 = 0;

  var winValue = Number(document.getElementById('win-value').value);

  if (winValue !== NaN && winValue > 0)
    winnerScore = winValue;
  else
    winnerScore = 100;

  for (let i = 0; i < playerScore.length; i++) {
    document.getElementById('score-' + i).textContent = playerScore[i];
    document.getElementById('current-' + i).textContent = roundScore;
    document.getElementById('name-' + i).textContent = 'Player ' + (i + 1);

    document.querySelector('.player-' + i + '-panel').classList.remove('winner');
    document.querySelector('.player-' + i + '-panel').classList.remove('active');
    if (i === 0)
      document.querySelector('.player-' + i + '-panel').classList.add('active');

  }

  document.querySelector('#dice-0').style.display = 'none';
  document.querySelector('#dice-1').style.display = 'none';
}


function changeActivePlayer() {
  roundScore = 0;
  if (activePlayer !== 0) {
    activePlayer = 0;
    // document.querySelector('.player-0-panel').classList.add('active');
    // document.querySelector('.player-1-panel').classList.remove('active');
  } else {
    activePlayer = 1;
    // document.querySelector('.player-0-panel').setAttribute('class', 'player-0-panel');
    // document.querySelector('.player-1-panel').setAttribute('class', 'player-1-panel active');
  }

  for (let i = 0; i < playerScore.length; i++) {
    document.querySelector('.player-' + i + '-panel').classList.toggle('active');
    document.querySelector('#dice-' + i).style.display = 'none';
  }
  previousDice0 = dice0 = 0;
  previousDice1 = dice1 = 0;
}
