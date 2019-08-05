const answerArray = ["tempOne tempTwo tempThree tempFour tempFive"];
const guessedLetters = [];

let RNG = Math.floor(Math.random() * answerArray.length);

console.log(answerArray[RNG]);
