// adding onload, hopefully fixes something...:
// function hangmanScript() {
// commented onload because it didn't help
let letterGuess;
const hangman = {
  answerArray: ["BTS", "Seventeen", "Twice", "EXO"],
  answer: "",
  bannerShow: "",
  failCount: 0,
  winScore: 0,
  loseScore: 0,
  usedLetters: [],
  RNG: 0,
  dupeCount: 0,
  checkAnswer: "",
  correctLetters: 0
  // note: these will be counted as UNIQUE letters, dupes will apply simulateously
  // ...maybe
};

// picks a random array value -> lower case, assigns answer
function shuffle() {
  hangman.RNG = Math.floor(Math.random() * hangman.answerArray.length);

  hangman.answer = hangman.answerArray[hangman.RNG].toLowerCase();
  console.log(hangman.answer);
  // THIS IS WHERE WE THROW DIVS INTO PLACEHOLDER
  for (answerIndex = 0; answerIndex < hangman.answer.length; answerIndex++) {
    const blankSpace = document.getElementById("keyBlanks");
    const newBlank = document.createElement("div");
    if (hangman.answer.charAt(answerIndex) == " ") {
      newBlank.textContent = " ";
      hangman.correctLetters++;
    } else {
      newBlank.textContent = "_";
    }
    // divs get different classes based on what letter should go inside
    newBlank.className = `hiddenLetter letter${hangman.answer.charAt(
      answerIndex
    )}`;
    blankSpace.appendChild(newBlank);
  }
}
// starts the game
shuffle();

// listening for keyboard input
document.onkeyup = function(keyPress) {
  console.log(keyPress.key);
  letterGuess = keyPress.key.toLowerCase();

  // comparing guess to answer blocks
  //check for game over first
  if (hangman.failCount < 7) {
    if (hangman.correctLetters < hangman.answer.length) {
      if ("abcdefghijklmnopqrstuvwxyz".includes(letterGuess) == true) {
        if (hangman.usedLetters.includes(letterGuess) == false) {
          if (hangman.answer.includes(letterGuess)) {
            console.log("yes");
            // count multiples with a function, hard googled for this: https://teamtreehouse.com/community/how-to-count-the-number-of-times-a-specific-character-appears-in-a-string
            function multiCheck(checkAnswer, x) {
              let letterConvert = new RegExp(letterGuess, "g");
              dupeCount = checkAnswer.match(letterConvert).length;
              hangman.correctLetters += dupeCount;
            }
            // }
            multiCheck(hangman.answer, letterGuess);

            // REPLACE THE "_"s WITH LETTERS AND COUNT
            let changeOut = document.getElementsByClassName(
              `letter${letterGuess}`
            );
            Array.from(changeOut).forEach(item => {
              item.textContent = letterGuess;
            });

            console.log(changeOut);

            // hangman.correctLetters++;

            // THIS IS WHERE WE WIN
            if (hangman.correctLetters == hangman.answer.length) {
              bannerShow = document.getElementById("winBanner");
              console.log(bannerShow);
              bannerShow.style.opacity = "100";
              hangman.winScore++;
            }
          } else {
            // create divs with letters in them
            console.log("no");
            hangman.failCount++;
            const targetDiv = document.getElementById("guessPool");
            const failDiv = document.createElement("div");
            failDiv.textContent = letterGuess;
            failDiv.className = "guessItem";
            targetDiv.appendChild(failDiv);
          }
          hangman.usedLetters.push(letterGuess);
          // this is where we lose
          if (hangman.failCount == 7) {
            const bannerShow = document.getElementById("loseBanner");
            bannerShow.style.opacity = "100";
            hangman.loseScore++;
          }
        }
      }
    }
  }
  //THIS IS WHERE THE RESET BUTTON GOES
};
let resetBtn = document.getElementById("resetti");
resetBtn.addEventListener("click", function() {
  hangman.failCount = 0;
  hangman.usedLetters = [];
  const resetDiv = document.getElementById("guessPool");
  resetDiv.innerHTML = "";
  const resetKey = document.getElementById("keyBlanks");
  resetKey.innerHTML = "";
  hangman.correctLetters = 0;
  bannerShow = document.getElementById("loseBanner");
  bannerShow.style.opacity = "0";
  bannerShow = document.getElementById("winBanner");
  bannerShow.style.opacity = "0";
  console.log(bannerShow);
  shuffle();
});
// }
// ^ this is the close }bracket for onload, do not forget
// window.onload = hangmanScript()
