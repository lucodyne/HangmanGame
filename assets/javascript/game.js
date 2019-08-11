// adding onload, hopefully fixes something...:
// function hangmanScript() {
// commented onload because it didn't help

// controlling audio
const sounds = document.getElementsByClassName("soundEffect");
Array.from(sounds).forEach(item => {
  item.volume = 0.45;
});
const music = document.getElementsByClassName("song");
Array.from(music).forEach(item => {
  item.volume = 0.25;
});
const bgm = document.getElementById("smile");
bgm.volume = 0.1;

let letterGuess;
const hangman = {
  answerArray: [
    "BLACKPINK",
    "BTS",
    "EXO",
    "iKON",
    "Monsta X",
    "NCT U",
    "Red Velvet",
    "SEVENTEEN",
    "TWICE",
    "Wanna One"
  ],
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
};

// function to assign answer
function shuffle() {
  hangman.RNG = Math.floor(Math.random() * hangman.answerArray.length);

  hangman.answer = hangman.answerArray[hangman.RNG].toLowerCase();

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
// function to reset per-game values
function tryAgain() {
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
  // MAKING THE IMAGES DISAPPEAR WILL BE SIMILAR TO CHANGING LETTERS
  let drawOut = document.getElementsByClassName(`hangDraw`);
  Array.from(drawOut).forEach(item => {
    item.style.opacity = "0";
  });
}

// starts the game
shuffle();

// listening for keyboard input
document.onkeyup = function(keyPress) {
  letterGuess = keyPress.key.toLowerCase();
  // check if backspace was entered, for reset
  if (keyPress.keyCode == 8) {
    tryAgain();
    shuffle();
  } else {
    // comparing guess to answer blocks
    // checks for game over first
    if (hangman.failCount < 7) {
      if (hangman.correctLetters < hangman.answer.length) {
        if ("abcdefghijklmnopqrstuvwxyz".includes(letterGuess) == true) {
          if (hangman.usedLetters.includes(letterGuess) == false) {
            if (hangman.answer.includes(letterGuess)) {
              // count multiples with a function, hard googled for this: https://teamtreehouse.com/community/how-to-count-the-number-of-times-a-specific-character-appears-in-a-string
              function multiCheck(checkAnswer, x) {
                let letterConvert = new RegExp(letterGuess, "g");
                dupeCount = checkAnswer.match(letterConvert).length;
                hangman.correctLetters += dupeCount;
              }
              multiCheck(hangman.answer, letterGuess);

              // REPLACE THE "_"s WITH LETTERS AND COUNT
              let changeOut = document.getElementsByClassName(
                `letter${letterGuess}`
              );
              Array.from(changeOut).forEach(item => {
                item.textContent = letterGuess;
              });
              const se1 = document.getElementById("Scribble1");
              se1.play();
              // THIS IS WHERE WE WIN
              if (hangman.correctLetters == hangman.answer.length) {
                bannerShow = document.getElementById("winBanner");

                bannerShow.style.opacity = "100";
                hangman.winScore++;
                const winUpdate = document.getElementById("winDisplay");
                winUpdate.textContent = hangman.winScore;
                const se3 = document.getElementById("goodSound");
                se3.play();
                // pauses all music
                const stopAll = document.getElementsByClassName("song");
                Array.from(stopAll).forEach(music => {
                  music.pause();
                  music.currentTime = 0;
                });
                const songChoice = document.getElementById(
                  `${hangman.answerArray[hangman.RNG]}`
                );
                songChoice.play();
              }
            } else {
              // this is the "wrong letter" section
              hangman.failCount++;
              const targetDiv = document.getElementById("guessPool");
              const failDiv = document.createElement("div");
              failDiv.textContent = letterGuess;
              failDiv.className = "guessItem";
              targetDiv.appendChild(failDiv);
              // also, makes images appear
              const drawFail = document.getElementById(
                `life${hangman.failCount}`
              );
              drawFail.style.opacity = "100";
              const se2 = document.getElementById("Scribble2");
              se2.play();
            }
            hangman.usedLetters.push(letterGuess);
            // this is where we lose
            if (hangman.failCount == 7) {
              const bannerShow = document.getElementById("loseBanner");
              bannerShow.style.opacity = "100";
              hangman.loseScore++;
              const loseUpdate = document.getElementById("loseDisplay");
              loseUpdate.textContent = hangman.loseScore;
              const se4 = document.getElementById("badSound");
              se4.play();
            }
          }
        }
      }
    }
  }
  //THIS IS THE RESET BUTTON
};

let resetBtn = document.getElementById("resetti");
resetBtn.addEventListener("click", function() {
  tryAgain();
  shuffle();
});

// }
// ^ this is the close }bracket for onload
// window.onload = hangmanScript()
