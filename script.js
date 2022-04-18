'use strict';

// We are creating both elements at the start so that we don't have to call this element over and over again
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
// getElementById also works in the same way as querySelector method.

/* Initialize both the players score to 0 and dice image hidden

score0Element.textContent = 0;
score1Element.textContent = 0;

 By default we have enabled the dice face even if game is reset. So, let's hide it
 We'll create a hidden class and add it to classList to hide as shown below
diceElement.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;  it's a state variable which will monitor whether we can play further or not */
let scores, currentScore, activePlayer, playing;
// Initialization condition
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; // it's a state variable which will monitor whether we can play further or not

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active'); //  No need to remove player--active class as when game is reset, then also player0 will be the active player
  player1Element.classList.remove('player--active');
};
// Basically, playing will disable the roll and hold button once any player wins. So, the game will be idle until user wants to play again
init();

const switchPlayer = function () {
  // switch to the next player but before that make currentScore of activePlayer=0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;

  // toggle will basically remove the given class if its there and add if it's not there
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};
// Implementing dice roll functionality
btnRoll.addEventListener('click', function () {
  // create a random number between 1 to 6
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the dice. First, remove the hidden class to show the image.

    diceElement.classList.remove('hidden');

    // Notice that we have to show the image. We'll use template literal for that

    diceElement.src = `dice-${dice}.png`;

    // Check if the dice is 1 or not.
    // If yes, switch to next player

    if (dice !== 1) {
      // add the value to the current score
      // Now, we have to store the dice value to current score and in some variable (which is outside this function) so that each time we roll a dice, the current score doesn't reset each time.
      currentScore += dice;
      // current0Element.textContent = currentScore; Here we are updating only player0 value but it should be dynamic means whichever be the active player, there currentScore needs to be changed

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // Add currentScore to the active player score
  if (playing) {
    scores[activePlayer] += currentScore; // for e.g. scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if the player's score is >=100. if yes, finish the game
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // add the hidden class so that dice image vanishes as the game is over
      diceElement.classList.add('hidden');
    } else {
      // switch the player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
