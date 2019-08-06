const answerArray = [
  "BTS",
  "SEVENTEEN",
  "TWICE",
  "BLACKPINK",
  "Wanna One",
  "EXO",
  "Red Velvet"
];
let RNG;
let answer;
let failCount = 0;
let letterGuess;
let letterGuessLower;
let answerLower;
const hangman = {
  failCount: 0,
  winScore: 0,
  loseScore: 0,
  usedLetters: []
};

// picks a random array value, converts to lower case
RNG = Math.floor(Math.random() * answerArray.length);

answer = answerArray[RNG];
answerLower = answer.toLowerCase();

console.log(answerLower);

document.onkeyup = function(keyPress) {
  console.log(keyPress.key);
  letterGuess = keyPress.key;
  letterGuessLower = letterGuess.toLowerCase();
  if (hangman.failCount < 7) {
    if ("abcdefghijklmnopqrstuvwxyz".includes(letterGuessLower) == true) {
      if (hangman.usedLetters.includes(letterGuessLower) == false) {
        if (answerLower.includes(letterGuessLower)) {
          console.log("yes");
        } else {
          console.log("no");
          hangman.failCount++;
          const targetDiv = document.getElementById("guessPool");
          const failDiv = document.createElement("div");
          failDiv.textContent = letterGuessLower;
          failDiv.className = "guessItem";
          targetDiv.appendChild(failDiv);
        }
        hangman.usedLetters.push(letterGuessLower);
        if (hangman.failCount == 7) {
          document.getElementById("loseBanner").style.opacity = "100%";
          hangman.loseScore++;
        }
      }
    }
  }
};
