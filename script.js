"use strict";
var state = "press_key";
var pattern = [];
var level = 0;
var indexplayerpattern = 0;
var nextColor;
var nextButton;
var title = document.getElementById("level_title");
var blue = document.getElementById("blue");
var green = document.getElementById("green");
var yellow = document.getElementById("yellow");
var red = document.getElementById("red");
var button = [red, blue, yellow, green];

document.addEventListener("keypress", startGame);
red.addEventListener("click", buttonPress);
green.addEventListener("click", buttonPress);
yellow.addEventListener("click", buttonPress);
blue.addEventListener("click", buttonPress);

function startGame() {
  if (state === "press_key" || state === "game-over") {
    newLevel();
    pattern = [];
    level = 0;
    indexplayerpattern = 0;
  }
}
function newLevel() {
  state = "waiting_pattern";
  setTimeout(() => {
    level = level + 1;
    title.textContent = "level " + level;
    nextColor = Math.floor(Math.random() * 4);
    nextButton = button[nextColor];
    lightButton(nextButton);
    pattern.push(nextButton);
    indexplayerpattern = 0;
    state = "waiting_player";
  }, 500);
}
function lightButton(button) {
  button.classList.add("pressed");
  var button_colors = ["red", "blue", "yellow", "green"];

  for (var i = 0; i <= 3; i++) {
    if (button_colors[nextColor] === button_colors[i]) {
      var audio = new Audio("sounds/" + button_colors[i] + ".mp3");
      audio.play();
    } else {
      var audio = new Audio("sounds/" + button_colors[nextColor] + ".mp3");
      audio.play();
    }
  }

  setTimeout(() => {
    button.classList.remove("pressed");
  }, 200);
}
function buttonPress(event) {
  if (state === "waiting_player") {
    var button = event.target;
    if (button === pattern[indexplayerpattern]) {
      indexplayerpattern = indexplayerpattern + 1;
      lightButton(button);
      if (indexplayerpattern === pattern.length) {
        newLevel();
      }
    } else {
      state = "gameover";
      var audio = new Audio("sounds/" + "wrong.mp3");
      audio.play();
      document.querySelector("body").classList.add("gameover");
      title.textContent =
        "game is over your level is  => " + level + "  double press to restart";
      setTimeout(() => {
        document.querySelector("body").classList.remove("gameover");
      }, 200);
    }
  }
}
document.addEventListener("keypress", function () {
  state = "press_key";
  pattern = [];
  level = 0;
  indexplayerpattern = 0;
});
