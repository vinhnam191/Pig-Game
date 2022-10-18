'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
let totalPlayer0Score = 0;
let totalPlayer1Score = 0;
let currentDice0 = 0;
let currentDice1 = 0;
let dice;
let playing = true;

function displayDiceRoll(dice) {
  document.querySelector('.dice').src = `dice-${dice}.png`;
}
function SwitchPlayer() {
  if (playing) {
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
}
function displayPlayerCurrentDice() {
  if (playing) {
    document.querySelector('.dice').classList.remove('hide');
    dice = Math.trunc(Math.random() * 6 + 1);
    displayDiceRoll(dice);
    if (
      player0.classList.contains('player--active') &&
      !player1.classList.contains('player--active')
    ) {
      if (dice !== 1) {
        currentDice0 += dice;
        current0.textContent = currentDice0;
      } else if (dice === 1) {
        currentDice0 = 0;
        current0.textContent = currentDice0;
        SwitchPlayer();
      }
    } else {
      if (dice !== 1) {
        currentDice1 += dice;
        current1.textContent = currentDice1;
      } else if (dice === 1) {
        currentDice1 = 0;
        current1.textContent = currentDice1;
        SwitchPlayer();
      }
    }
  }
}
function displayPlayerHoldScore() {
  if (playing) {
    if (
      player0.classList.contains('player--active') &&
      !player1.classList.contains('player--active')
    ) {
      totalPlayer0Score += currentDice0;
      score0.textContent = totalPlayer0Score;
      current0.textContent = 0;
      currentDice0 = 0;
      alertPlayerWin();
      SwitchPlayer();
    } else {
      totalPlayer1Score += currentDice1;
      score1.textContent = totalPlayer1Score;
      current1.textContent = 0;
      currentDice1 = 0;
      alertPlayerWin();
      SwitchPlayer();
    }
  }
}
function alertPlayerWin() {
  if (totalPlayer0Score >= 100) {
    player0.classList.add('player--winner');
    player0.classList.remove('player--active');
    player1.classList.remove('player--active');
    playing = false;
    document.querySelector('.dice').classList.add('hide');
  } else if (totalPlayer1Score >= 100) {
    player1.classList.add('player--winner');
    player0.classList.remove('player--active');
    player1.classList.remove('player--active');
    playing = false;
    document.querySelector('.dice').classList.add('hide');
  }
}
function resetGame() {
  document.querySelector('.dice').classList.add('hide');
  totalPlayer0Score = 0;
  totalPlayer1Score = 0;
  currentDice0 = 0;
  currentDice1 = 0;
  score0.textContent = totalPlayer0Score;
  score1.textContent = totalPlayer1Score;
  current0.textContent = currentDice0;
  current1.textContent = currentDice1;
  playing = true;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
}

btnRoll.addEventListener('click', displayPlayerCurrentDice);

btnHold.addEventListener('click', displayPlayerHoldScore);

btnNew.addEventListener('click', resetGame);
