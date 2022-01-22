let npcOrder = [];
let npcTurn = true;
let playerOrder = [];
let level = 0;
let correct;
let score = 0;
let started = false;

const highScore = localStorage.getItem("highScore");
if (!highScore) {
  localStorage.setItem("highScore", 0);
  document.querySelector("#high-score").innerHTML = `HighScore: 0`;
} else {
  document.querySelector("#high-score").innerHTML = `HighScore: ${highScore}`;
}

const startButton = document.querySelector(".start-button");

startButton.addEventListener("click", () => {
  startButton.classList.add("hidden");

  clearGame();
});

const topLeft = document.getElementById("sound1");
topLeft.addEventListener("click", (event) => {
  if (!npcTurn) {
    playSound("sound1");
    topLeft.classList.add("shine");
    setTimeout(() => {
      topLeft.classList.remove("shine");
    }, 600);
    playerOrder.push("sound1");
  }
});

const topRight = document.getElementById("sound2");
topRight.addEventListener("click", (event) => {
  if (!npcTurn) {
    playSound("sound2");
    topRight.classList.add("shine");
    setTimeout(() => {
      topRight.classList.remove("shine");
    }, 600);
    playerOrder.push("sound2");
  }
});

const bottomLeft = document.getElementById("sound3");
bottomLeft.addEventListener("click", (event) => {
  if (!npcTurn) {
    playSound("sound3");
    bottomLeft.classList.add("shine");
    setTimeout(() => {
      bottomLeft.classList.remove("shine");
    }, 600);
    playerOrder.push("sound3");
  }
});

const bottomRight = document.getElementById("sound4");
bottomRight.addEventListener("click", (event) => {
  if (!npcTurn) {
    playSound("sound4");
    bottomRight.classList.add("shine");
    setTimeout(() => {
      bottomRight.classList.remove("shine");
    }, 600);
    playerOrder.push("sound4");
  }
});

function playSound(soundNumber) {
  const audio = {
    sound1: "/assets/beep1.flac",
    sound2: "/assets/beep2.flac",
    sound3: "/assets/beep3.flac",
    sound4: "/assets/beep4.flac",
  };

  let beat = new Audio(audio[soundNumber]);
  beat.play();
}

function setDomScore(updatedScore) {
  document.querySelector("#score").innerHTML = updatedScore;
}

function clearGame() {
  npcOrder = [];
  playerOrder = [];
  level = 1;
  score = 0;
  setDomScore(score);

  showMoves();
}

function showMoves() {
  npcTurn = true;
  const random = Math.floor(Math.random() * 4) + 1;
  const sound = "sound" + random;
  // wird pro Level erhoeht
  npcOrder.push(sound);

  let index = 0;

  const intervalID = setInterval(() => {
    // wenn der index kleiner ist als die levelzahl/
    if (index < level) {
      const flash = document.getElementById(npcOrder[index]);
      flash.classList.add("shine");
      setTimeout(() => {
        flash.classList.remove("shine");
      }, 600);

      playSound(npcOrder[index]);
      index++;
    } else {
      npcTurn = false;
      setTimeout(() => {
        checkMoves();
      }, level * 1200);
      clearInterval(intervalID);
    }

    console.log("test");
  }, 1000);
}

function checkMoves() {
  if (npcOrder.join() === playerOrder.join()) {
    score += 10;
    setDomScore(score);
    nextRound();
  } else {
    const highScore = localStorage.getItem("highScore");
    if (highScore < score) {
      localStorage.setItem("highScore", score);
    }

    startButton.classList.remove("hidden");

    // const restartButton = document.createElement("button");
    // restartButton.innerHTML = "Start Again";

    // restartButton.onclick = () => location.reload();
    // restartButton.setAttribute("id", "restart-button-style");

    // const restartDIV = document.getElementById("restart-div");
    // restartDIV.appendChild(restartButton);

    alert(`Your score was: ${score}`);

    setTimeout(() => {
      console.log("timeout");
    }, 2000);
  }
}

// compare them both

function nextRound() {
  playerOrder = [];
  level += 1;
  showMoves();
  console.log(npcOrder);
}

// document.addEventListener("keyup", (e) => {
//   if (e.code === "ArrowUp") {
//     document.querySelector("h1").innerHTML = "Marc Is The Best ";
//     document.querySelector("#score").innerHTML = "Marc score is 10000000";
//   }
// });
