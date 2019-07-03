import React from "react";
import $ from 'jquery';

class SixDice{
  constructor(){
    this.sideOne = 1;
    this.sideTwo = 2;
    this.sideThree = 3;
    this.sideFour = 4;
    this.sideFive = 5;
    this.sideSix = 6;
    this.currentVal = 0;
  }
}

SixDice.prototype.rollDice = function rollDice(){
console.log('Rolling the dice...');
var myRoll = Math.floor(Math.random()*(6 - 1 + 1)) + 1;
return myRoll;
};

SixDice.prototype.getVal = function getVal(myRoll){
console.log('Getting the value of the roll');
switch (myRoll) {
  case 1:
    return this.sideOne;
    break;
  case 2:
    return this.sideTwo;
    break;
  case 3:
    return this.sideThree;
    break;
  case 4:
    return this.sideFour;
    break;
  case 5:
    return this.sideFive;
    break;
  case 6:
    return this.sideSix;
    break;
}
};

SixDice.prototype.resetCurr = function resetCurr(){
console.log('Reseting the currentVal');
this.currentVal = 0;
};

//Player class setup
class Player{
  constructor(){
    this.score = 0;
    this.rollScore = 0;
    this.turnNum = 1;
    this.winningScore = 5000; //Should be 5000 for non testing
    this.playerDice = [];
    this.playerRoll = [];
    this.playerSel = [];
    this.nonWinners = [2,3,4,6];
  }
}

Player.prototype.resetRollScore = function resetRollScore(){
this.rollScore = 0;
};

Player.prototype.resetPlayerSel = function resetPlayerSel(){
this.playerSel = [];
};
Player.prototype.playerEndTurn = function playerEndTurn(){
this.rollScore = 0;
this.playerDice = [];
this.playerRoll = [];
this.playerSel = [];
this.nonWinners = [2,3,4,6];
};

//ThisRoll class setup
class ThisRoll{
  constructor(){
    this.numOne = 0;
    this.numTwo = 0;
    this.numThree = 0;
    this.numFour = 0;
    this.numFive = 0;
    this.numSix = 0;
    this.rollBust = false;
    this.tripleMatch = [];
  }
}

ThisRoll.prototype.resetRollNum = function resetRollNum(){
this.numOne = 0;
this.numTwo = 0;
this.numThree = 0;
this.numFour = 0;
this.numFive = 0;
this.numSix = 0;
this.rollBust = false;
this.isFlush = false;
this.tripleMatch = [];
};
//helper Functions
function initDice(playerDice){
for(var i = 0; i < 6; i++){
  var myDice = new SixDice();
  playerDice[i] = myDice;
}
};
function myRoll(playerArr, playerRollArr){
for(var i = 0; i < playerArr.length; i++){
  var myRoll = playerArr[i].rollDice();
  var rollVal = playerArr[i].getVal(myRoll);
  playerArr[i].currentVal = rollVal;
  playerRollArr[i] = playerArr[i].currentVal;
}
};
function populateButtons(playerRollArr){
var leftOvers = 6 - playerRollArr.length;
var start = 6 - leftOvers;
for(var i = 0; i < playerRollArr.length; i++){
  var num = i + 1;
  var myId = '#diceBut' + num;
  $(myId).prop('disabled', false);
  $(myId).text(playerRollArr[i]);
}
if(leftOvers > 0){
  leftOverButtons(start);
}

};
function leftOverButtons(myNum){
for(var i = myNum; i < 6; i++){
  var num = i + 1;
  var myId = '#diceBut' + num;
  $(myId).text('X');
  $(myId).prop('disabled', true);
}
};
function isBust(playerClass, rollClass){
for(var i = 0; i < playerClass.playerRoll.length; i++){
  dieNum(rollClass, playerClass.playerRoll[i]);
}
if(rollClass.numOne > 0 || rollClass.numFive > 0){
  return false;
}
if(rollClass.numTwo >= 3 || rollClass.numThree >= 3 || rollClass.numFour >= 3 || rollClass.numFive >= 3 || rollClass.numSix >= 3){
  return false;
}else{
  return true;
}
};
function canSubmit(playerClass, rollClass){
var oneOrFive = false;
var tripleNum = false;
for(var i = 0; i < playerClass.playerSel.length; i++){
  dieNum(rollClass, playerClass.playerSel[i]);
}
oneOrFive = subConditionalsOneFive(rollClass);
tripleNum = subConditionalsTriples(rollClass, playerClass);
if(oneOrFive && tripleNum){
  return true;
}
if(rollClass.numOne === 1 && rollClass.numTwo === 1 && rollClass.numThree === 1 && rollClass.numFour === 1 && rollClass.numFive === 1 && rollClass.numSix === 1){
  rollClass.isFlush = true;
  return true;
}
return false;
};
function subConditionalsOneFive(rollClass){
if(rollClass.numOne > 2){
  rollClass.tripleMatch.push[1];
  return true;
}
if(rollClass.numFive > 2){
  rollClass.tripleMatch.push[5];
  return true;
}
return true;
};
function subConditionalsTriples(rollClass, playerClass){
var tripleCondition = false;
var noLoners =  false;
var onlyWinners = false;
for(var i = 0; i < playerClass.playerSel.length; i++){
  if(playerClass.nonWinners.indexOf(playerClass.playerSel[i]) === -1){
    onlyWinners = true;
  }else{
    onlyWinners = false;
    break;
  }
}
console.log(onlyWinners);
if(onlyWinners){
  noLoners = true;
  return noLoners;
}
if(rollClass.numTwo > 2){
  tripleCondition = true;
  rollClass.tripleMatch.push(2);
}
if(rollClass.numThree > 2){
  tripleCondition = true;
  rollClass.tripleMatch.push(3);
}
if(rollClass.numFour > 2){
  tripleCondition = true;
  rollClass.tripleMatch.push(4);
}
if(rollClass.numSix > 2){
  tripleCondition = true;
  rollClass.tripleMatch.push(6);
}
if(tripleCondition){
  for(var i = 0; i < playerClass.playerSel.length; i++){
    if(playerClass.nonWinners.indexOf(playerClass.playerSel[i]) != -1){
      if(rollClass.tripleMatch.indexOf(playerClass.playerSel[i]) != -1){
        noLoners = true;
      }else{
        noLoners = false;
      }
    }
  }
}
return noLoners;
};
function dieNum(rollClass, myNum){
switch (myNum) {
  case 1:
    rollClass.numOne++;
    break;
  case 2:
    rollClass.numTwo++;
    break;
  case 3:
    rollClass.numThree++;
    break;
  case 4:
    rollClass.numFour++;
    break;
  case 5:
    rollClass.numFive++;
    break;
  case 6:
    rollClass.numSix++;
    break;
}
};
function calcScore(rollClass, playerClass){
if(rollClass.isFlush){
  playerClass.rollScore += 1500;
  return;
}
if(rollClass.numOne){
  playerClass.rollScore += compoundScore(1, rollClass.numOne);
}
if(rollClass.numTwo){
  playerClass.rollScore += compoundScore(2, rollClass.numTwo);
}
if(rollClass.numThree){
  playerClass.rollScore += compoundScore(3, rollClass.numThree);
}
if(rollClass.numFour){
  playerClass.rollScore += compoundScore(4, rollClass.numFour);
}
if(rollClass.numFive){
  playerClass.rollScore += compoundScore(5, rollClass.numFive);
}
if(rollClass.numSix){
  playerClass.rollScore += compoundScore(6, rollClass.numSix);
}
};
function compoundScore(myNum, numAmt){
switch (myNum) {
  case 1:
    if(numAmt <= 2){
      return 100*numAmt;
    }else{
      return 1000 * Math.pow(2,(numAmt-3));
    }
    break;
  case 5:
    if(numAmt <= 2){
      return 50*numAmt;
    }else{
      return 500 * Math.pow(2,(numAmt-3));
    }
    break;
  case 2:
    return 200 * Math.pow(2,(numAmt-3));
    break;
  case 3:
    return 300 * Math.pow(2,(numAmt-3));
    break;
  case 4:
    return 400 * Math.pow(2,(numAmt-3));
    break;
  case 6:
    return 600 * Math.pow(2,(numAmt-3));
    break;
}
};
function playerTurnInit(){
playerOne.turnNum++;
playerOne.playerEndTurn();
selectedDice.resetRollNum();
myRollClass.resetRollNum();
var turnStr = 'Turn: ';
var resetStr = 'Round Score: 0';
$('#roundScore').text(resetStr);
turnStr += playerOne.turnNum;
var myStr = "Your Turn!";
$('#whichTurn').text(myStr);
$('#myTurn').text(turnStr);
$('#formBut').prop('disabled', false);
$('button').removeClass('btn-success');
$('#submitVal').addClass('btn-warning');
$('#endTurn').addClass('btn-danger');
};
function computerInit(){
console.log('Computer is taking their turn...');
computerPlayer.playerEndTurn();
var myStr = "Opponent's Turn!";
$('#whichTurn').text(myStr);
$('button').prop('disabled', true);
$('button').addClass('btn-success').removeClass('btn-danger').removeClass('btn-warning');
selectedDice.resetRollNum();
myRollClass.resetRollNum();
initDice(computerPlayer.playerDice);
};
function computerTurn(){
var myStr = 'Computer Score: ';
while(computerPlayer.playerDice.length >= 3 || computerPlayer.playerDice.length === 0){
  myRollClass.resetRollNum();
  selectedDice.resetRollNum();
  computerRoll();
  myRollClass.rollBust = isBust(computerPlayer, myRollClass);
  if(myRollClass.rollBust){
    console.log('The computer busted! ');
    playerTurnInit();
    return;
  }
  computerDecision(computerPlayer);
  canSubmit(computerPlayer, selectedDice);
  calcScore(selectedDice, computerPlayer);
  console.log('Computer Scored ' +computerPlayer.rollScore+ ' this turn so far!');
}
computerPlayer.score += computerPlayer.rollScore;
myStr += computerPlayer.score;
$('#compScore').text(myStr);
if(computerPlayer.score >= computerPlayer.winningScore){
  console.log('Winner');
  var winningStr = 'The computers destroyed humanity in a mere ' + playerOne.turnNum + ' turn(s)!';
  $('#youWin').show();
  $('#youWin').find('h1').text(winningStr);
  $('#formBut').prop('disabled', true);
  $('#endTurn').prop('disabled', true);
  return;
}
console.log('The computer is passing their turn to you. How graceful.');
playerTurnInit();
return;
};
function computerRoll(){
console.log('Computer is rolling the dice...');
console.log(computerPlayer.playerDice.length);
if(computerPlayer.playerDice.length === 0){
  initDice(computerPlayer.playerDice);
  myRollClass.resetRollNum();
}
myRoll(computerPlayer.playerDice, computerPlayer.playerRoll);
populateButtons(computerPlayer.playerRoll);
$('button').prop('disabled', true);
};
function computerDecision(compPlayer){
computerPlayer.playerSel = [];
for(var i = 0; i < compPlayer.playerRoll.length;i++){
  var num = i + 1;
  var myId = '#diceBut' + num;
  if(compPlayer.playerRoll[i] === 1){
    compPlayer.playerSel.push(compPlayer.playerRoll[i]);
  }
  if(compPlayer.playerRoll[i] === 5){
    compPlayer.playerSel.push(compPlayer.playerRoll[i]);
  }
  if(compPlayer.playerRoll[i] === 2 && myRollClass.numTwo > 2){
    compPlayer.playerSel.push(compPlayer.playerRoll[i]);
  }
  if(compPlayer.playerRoll[i] === 3 && myRollClass.numThree > 2){
    compPlayer.playerSel.push(compPlayer.playerRoll[i]);
  }
  if(compPlayer.playerRoll[i] === 4 && myRollClass.numFour > 2){
    compPlayer.playerSel.push(compPlayer.playerRoll[i]);
  }
  if(compPlayer.playerRoll[i] === 6 && myRollClass.numSix > 2){
    compPlayer.playerSel.push(compPlayer.playerRoll[i]);
  }
}
console.log('The computer rolled: ' + computerPlayer.playerRoll);
for(var i = 0; i < compPlayer.playerSel.length; i++){
  index = compPlayer.playerRoll.indexOf(compPlayer.playerSel[i]);
  compPlayer.playerRoll.splice(index, 1);
  compPlayer.playerDice.pop();
}
console.log('The computer selected: ' + compPlayer.playerSel);
};
function buttonReset(){
$('button').prop('disabled', true);
$('#formBut').prop('disabled', false);
};
//globals
let playerOne = new Player();
let computerPlayer = new Player();
let myRollClass =  new ThisRoll();
let selectedDice = new ThisRoll();
initDice(playerOne.playerDice);


//Front-end logic
$(document).ready(function(){
buttonReset();
$('#butForm').submit(function(event){
  event.preventDefault();
  $('#formBut').prop('disabled', true);
  $('busted').hide();
  console.log('butForm is being submitted');
  if(playerOne.playerDice.length === 0){
    initDice(playerOne.playerDice);
    myRollClass.resetRollNum();
  }
  var returnStr = 'Round Score: ';
  selectedDice.resetRollNum();
  myRollClass.resetRollNum();
  for(var i = 0; i < 6; i++){
    var num = i + 1;
    var myId = '#diceBut' + num;
    $(myId).prop('disabled', false);
  }
  myRoll(playerOne.playerDice, playerOne.playerRoll);
  console.log(playerOne.playerDice);
  console.log('Your roll is: \n' + playerOne.playerRoll);
  populateButtons(playerOne.playerRoll);
  myRollClass.rollBust = isBust(playerOne, myRollClass);
  if(myRollClass.rollBust){
    $('.busted').show();
    playerOne.rollScore = 0;
    returnStr += playerOne.rollScore;
    $('#resetSel').prop('disabled', true);
    $('#roundScore').text(returnStr);
    for(var i = 0; i < playerOne.playerDice.length; i++){
      var num = i + 1;
      var myId = '#diceBut' + num;
      $(myId).toggleClass('btn-primary');
      $(myId).toggleClass('btn-danger');
      $(myId).prop('disabled', true);
    }
    $('#endTurn').prop('disabled', false);
  }
});

$('.clickable').click(function(event){
  $('#resetSel').prop('disabled', false);
  var submitFlag = false;
  selectedDice.resetRollNum();
  $(this).prop('disabled', true);
  var myVal = parseInt($(this).html());
  playerOne.playerSel.push(myVal);
  submitFlag = canSubmit(playerOne, selectedDice);
  if(submitFlag){
    $('#submitVal').prop('disabled', false);
  }else{
    $('#submitVal').prop('disabled', true);
  }
});
$('#resetSel').click(function(){
  console.log('resetSel is clicked');
  selectedDice.resetRollNum();
  playerOne.playerSel = [];
  $('#submitVal').prop('disabled', true);
  for(var i = 0; i < playerOne.playerDice.length; i++){
    var num = i + 1;
    var myId = '#diceBut' + num;
    $(myId).prop('disabled', false);
  }
});
$('#submitVal').click(function(){
  console.log('submitVal is being clicked');
  $('#formBut').prop('disabled', false);
  $('#submitVal').prop('disabled', true);
  $('#resetSel').prop('disabled', true);
  for(var i = 0; i < 6; i++){
    var num = i + 1;
    var myId = '#diceBut' + num;
    $(myId).prop('disabled', true);
  }
  var returnStr = 'Round Score: ';
  var index = 0;
  for(var i = 0; i < playerOne.playerSel.length; i++){
    index = playerOne.playerRoll.indexOf(playerOne.playerSel[i]);
    playerOne.playerRoll.splice(index, 1);
    playerOne.playerDice.pop();

  }
  calcScore(selectedDice, playerOne);
  returnStr += playerOne.rollScore;
  $('#roundScore').text(returnStr);
  playerOne.resetPlayerSel();
  $('#endTurn').prop('disabled', false);
});
$('#endTurn').click(function(){
  console.log('endTurn is being clicked');
  var returnStr = 'Player Score: ';
  var resetStr = 'Round Score: 0';
  $('.busted').hide();
  if(!myRollClass.rollBust){
    playerOne.score += playerOne.rollScore;
    returnStr += playerOne.score;
    $('#playerScore').text(returnStr);
  }
  for(var i = 0; i < 6; i++){
    var num = i + 1;
    var myId = '#diceBut' + num;
    $(myId).addClass('btn-primary');
    $(myId).removeClass('btn-danger');
  }
  $('#roundScore').text(resetStr);
  if(playerOne.score >= playerOne.winningScore){
    console.log('Winner')
    var winningStr = 'Congrats! You won in ' + playerOne.turnNum + ' turn(s)!';
    $('#youWin').show();
    $('#youWin').find('h1').text(winningStr);
    $('button').prop('disabled', true);
    return;
  }
  computerInit();
  computerTurn();
});
});

function Farkle(){
  return(
    <div className="container">
      <div className="centerWrap">
        <h1 id='whichTurn'>Your Turn!</h1>
      </div>
      <form id="butForm">
        <div className="form-group">
          <button type="submit" id='formBut'className="btn btn-primary form-control">Roll the dice!</button>
        </div>
      </form>
      <div className="row">
        <div className="col">
          <button type="button" id="diceBut1" className="btn btn-primary clickable">0</button>
        </div>
        <div className="col">
          <button type="button" id="diceBut2" className="btn btn-primary clickable">0</button>
        </div>
        <div className="col">
          <button type="button" id="diceBut3" className="btn btn-primary clickable">0</button>
        </div>
        <div className="col">
          <button type="button" id="diceBut4" className="btn btn-primary clickable">0</button>
        </div>
        <div className="col">
          <button type="button" id="diceBut5" className="btn btn-primary clickable">0</button>
        </div>
        <div className="col">
          <button type="button" id="diceBut6" className="btn btn-primary clickable">0</button>
        </div>
      </div>
      <div className="row pad">
        <div className="col">
          <button type="button" id="resetSel" className="btn btn-primary">Deselect Dice</button>
        </div>
        <div className="col">
          <button disabled type="button" id="submitVal" className="btn btn-warning">Submit Dice</button>
        </div>
        <div className="col">
          <button type="button" id="endTurn" className="btn btn-danger">End Turn</button>
        </div>
      </div>
      <div id='divScore'>
        <h3 id='roundScore'>Round Score: 0</h3>
        <h3 id='playerScore'>Player Score: 0</h3>
        <h3 id='compScore'>Computer Score: 0</h3>
        <h3 id='myTurn'>Turn: 1</h3>
      </div>
      <div id='youWin'>
        <h1></h1>
      </div>
      <div className="busted centerWrap">
        <h2>Bust!</h2>
      </div>
    </div>
  );
}

export default Farkle;
