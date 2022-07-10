"use strict";

const startBtn = document.getElementById("start");
const timeList = document.getElementById("time-list");
const timeL = document.getElementById("time");
const board = document.getElementById("board");
const screens = document.querySelectorAll(".screen");

const colors = [
  "#ffffff",
  "#dcf3fc",
  "#ff4949",
  "#ffad49",
  "#ffe049",
  "#e6ff49",
  "#9bff49",
  "#49ff56",
  "#49ffb0",
  "#ff49f2",
  "#ff499e",
  "#49daff",
  "#5949ff",
];

let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeL.innerHTML = `00:${value}`;
}

function finishGame() {
  timeL.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  // Random colors for new circles
  circle.style.backgroundColor = `${getRandomColor()}`;

  // Random colors on mouse click
  // circle.addEventListener("mouseover", setColor);

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  return colors[getRandomNumber(0, colors.length - 1)];
}

function setColor(event) {
  const color = getRandomColor();
  event.target.style.backgroundColor = color;
}
