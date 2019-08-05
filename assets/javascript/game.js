const answerArray = ["tempOne", "tempTwo", "tempThree", "tempFour", "tempFive"];
let guessedLetters = [];
let RNG;
let answer;
let letterGuess;

RNG = Math.floor(Math.random() * answerArray.length);

console.log(answerArray[RNG]);

answer = answerArray[RNG].toLowerCase();

document.onkeyup = function(keyPress) {
  letterGuess = keyPress.key.toString().toLowerCase();
  accurate = letterGuess.indexOf("abcdefghijklmnopqrstuvwxyz" > -1);
  if (accurate == true) {
    if (answer.includes(letterGuess) == true) {
      console.log("yes");
    } else {
      console.log("no");
    }
  } else {
  }
};
