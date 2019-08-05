const answerArray = ["tempOne", "tempTwo", "tempThree", "tempFour", "tempFive"];
let guessedLetters = [];

let RNG = Math.floor(Math.random() * answerArray.length);

console.log(answerArray[RNG]);
