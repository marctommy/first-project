let npcOrder = [];
let npcTurn = true;
let playerOrder = [];
let level = 0;
let correct;
let score = 0;
let win = false;
let started = false;

const highScore = localStorage.getItem("highScore");
if (!highScore) {
  highScore = 0;
}
document.querySelector("#high-score").innerHTML = `HighScore: ${highScore}`;

const startButton = document.querySelector(".start-button");

startButton.addEventListener("click", () => {
  if (!started) {
    startButton.remove();

    setTimeout(() => {
      clearGame();
    }, 600);
  } else {
  }
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
    sound1: "/sounds/beep1.ogg",
    sound2: "/sounds/beep2.ogg",
    sound3: "/sounds/beep3.ogg",
    sound4: "/sounds/beep4.ogg",
  };

  let beat = new Audio(audio[soundNumber]);
  beat.play();
}

function clearGame() {
  npcOrder = [];
  humanOrder = [];
  level = 1;
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
      console.log("NPC:", npcOrder);

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
    document.querySelector("#score").innerHTML = score;
    nextRound();
  } else {
    const highScore = localStorage.getItem("highScore");
    if (highScore < score) {
      localStorage.setItem("highScore", score);
    }
    alert(`Your score was: ${score}`);

    console.log("Player", playerOrder);
  }
}

// compare them both

function nextRound() {
  playerOrder = [];
  level += 1;
  showMoves();
  console.log(npcOrder);
}

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowUp") {
    document.querySelector("h1").innerHTML = "Mir Is The Best ";
    document.querySelector("#score").innerHTML = "Mir score is 10000000";
  }
});
