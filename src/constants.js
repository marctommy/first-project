let npc = [];
let human = [];

let level = 0;
let correct;
let score = document.querySelector("#score");

const topLeft = document
  .getElementById("one")
  .addEventListener("click", playSound("sound1"));

const topRight = document
  .getElementById("two")
  .addEventListener("click", playSound("sound2"));

const bottomLeft = document
  .getElementById("three")
  .addEventListener("click", playSound("sound3"));

const bottomRight = document
  .getElementById("four")
  .addEventListener("click", playSound("sound4"));

const sounds = [topLeft, topRight, bottomLeft, bottomRight];

const startButton = document.querySelector(".start-btn");

const newGame = startGame();
