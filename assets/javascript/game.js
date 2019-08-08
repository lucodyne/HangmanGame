let letterGuess;
const hangman = {
  answerArray: [
    "Baka Mitai",
    "Judgement",
    "TwentyFour Hour Cinderella",
    "Rouge of Love",
    "Queen of Passion",
    "Shine",
    "Heartbreak Mermaid"
  ],
  answer: "",
  failCount: 0,
  winScore: 0,
  loseScore: 0,
  usedLetters: [],
  RNG: 0
};

// picks a random array value -> lower case, assigns answer
roulette = function() {
  hangman.RNG = Math.floor(Math.random() * hangman.answerArray.length);

  hangman.answer = hangman.answerArray[hangman.RNG].toLowerCase();
  console.log(hangman.answer);
  // THIS IS WHERE WE THROW DIVS INTO PLACEHOLDER
};
roulette();

// listening for keyboard input
document.onkeyup = function(keyPress) {
  console.log(keyPress.key);
  letterGuess = keyPress.key.toLowerCase();

  if (hangman.failCount < 7) {
    if ("abcdefghijklmnopqrstuvwxyz".includes(letterGuess) == true) {
      if (hangman.usedLetters.includes(letterGuess) == false) {
        if (hangman.answer.includes(letterGuess)) {
          console.log("yes");
        } else {
          console.log("no");
          hangman.failCount++;
          const targetDiv = document.getElementById("guessPool");
          const failDiv = document.createElement("div");
          failDiv.textContent = letterGuess;
          failDiv.className = "guessItem";
          targetDiv.appendChild(failDiv);
        }
        hangman.usedLetters.push(letterGuess);
        if (hangman.failCount == 7) {
          const bannerShow = document.getElementById("loseBanner");
          // opacity not working ;_; let's try display:
          hangman.loseScore++;
        }
      }
    }
  }
  //THIS IS WHERE THE RESET BUTTON GOES
  const resetBtn = document.getElementById("resetti");
  resetBtn.addEventListener("click", function() {
    hangman.failCount = 0;
    hangman.usedLetters = [];
    const resetDiv = document.getElementById("guessPool");
    resetDiv.innerHTML = "";
    roulette();
  });
};
