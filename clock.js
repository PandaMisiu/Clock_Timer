"use strict";

// TODO:

const clock = document.querySelector(".time-container");
const hour = document.querySelector(".hour-container");
const minutes = document.querySelector(".minutes-container");
const seconds = document.querySelector(".seconds-container");
const switchBtn = document.getElementById("check");
const switchBtnText = document.querySelector(".checkbox-text");

// TITLE
const titleText = document.querySelector(".title-text-content");
const titleFill = document.querySelector(".title-fill");

// buttons queries
const controlBtns = document.querySelector(".timer-btns-container");
const startBtn = document.querySelector(".start-timer-btn");
const pauseBtn = document.querySelector(".pause-timer-btn");
const resetBtn = document.querySelector(".reset-timer-btn");
const alarmBtn = document.querySelector(".alarm-container");
const alarmCheckbox = document.getElementById("alarm");

// ADD/LOW BUTTONS
const addLowBtns = document.querySelectorAll(".add-low-buttons");

// ALARM
const alarmSound = new Audio("/music/alarm.mp3");

// PROGRESS BAR
const progressBarCont = document.querySelector(".progress-bar-container");
const progressBar = document.querySelector(".progress-bar");

let isSwitched = false; // bool to check if the checkbox is checked

// function that updates the clock and timer
function updateClock() {
  if (!isSwitched) {
    const time = new Date(Date.now());

    let currHour = time.getHours();
    let currMinutes = time.getMinutes();
    let currSeconds = time.getSeconds();

    if (currHour < 10) currHour = "0" + currHour;
    if (currMinutes < 10) currMinutes = "0" + currMinutes;
    if (currSeconds < 10) currSeconds = "0" + currSeconds;

    hour.textContent = currHour;
    minutes.textContent = currMinutes;
    seconds.textContent = currSeconds;
  }
}
updateClock();
setInterval(updateClock, 1000);

// Switch slider
switchBtn.addEventListener("click", function () {
  if (switchBtn.checked) {
    isSwitched = true;
    document.title = "Timer";
    reset();
    updateClock();
    switchBtnText.textContent = "Timer";
    clock.classList.remove("time-container");
    clock.classList.add("time-container-timer");

    controlBtns.classList.remove("hidden");
    controlBtns.classList.add("btnExpandAnim");

    alarmBtn.classList.remove("hidden");
    alarmBtn.classList.add("slideFromRightAnim");

    titleText.textContent = "TIMER";
    titleText.classList.toggle("title-text");
    titleText.classList.toggle("title-text-timer");

    titleFill.textContent = "TIMER";
    titleFill.classList.toggle("title-fill");
    titleFill.classList.toggle("title-fill-timer");
    for (let i = 0; i < addLowBtns.length; i++)
      addLowBtns[i].classList.remove("fully-hidden");
  } else {
    resetMusic();
    document.title = "Clock";
    clock.classList.remove("time-container-timer");
    clock.classList.add("time-container");
    isSwitched = false;
    switchBtnText.textContent = "Clock";

    controlBtns.classList.remove("btnExpandAnim");
    controlBtns.classList.add("hidden");
    startBtn.textContent = "Start";

    alarmBtn.classList.add("hidden");
    alarmBtn.classList.remove("slideFromRightAnim");
    document.getElementById("alarm").checked = false;

    titleText.textContent = "CLOCK";
    titleText.classList.toggle("title-text");
    titleText.classList.toggle("title-text-timer");

    titleFill.textContent = "CLOCK";
    titleFill.classList.toggle("title-fill");
    titleFill.classList.toggle("title-fill-timer");

    progressBarCont.classList.add("hidden");
    progressBarCont.classList.remove("opacityAnim");
    progressBar.classList.add("hidden");
    progressBar.classList.remove("progressBarExpandAnim");
    currentProgress = 0;

    for (let i = 0; i < addLowBtns.length; i++)
      addLowBtns[i].classList.add("fully-hidden");

    updateClock();
  }
});

// UPDATE HOUR/MINUTES/SECONDS (add "0" if smaller than 10)

const updateHour = function (current) {
  if (current < 10) hour.textContent = "0" + current;
  else hour.textContent = current;
};

const updateMinutes = function (current) {
  if (current < 10) minutes.textContent = "0" + current;
  else minutes.textContent = current;
};

const updateSeconds = function (current) {
  if (current < 10) seconds.textContent = "0" + current;
  else seconds.textContent = current;
};

// ADD/REMOVE hour, minutes, seconds

// ------ hours -------
document.querySelector(".add-hour-btn").addEventListener("click", function () {
  let current = Number(hour.textContent);
  current = (current + 1) % 24;

  updateHour(current);
});

document.querySelector(".rem-hour-btn").addEventListener("click", function () {
  let current = Number(hour.textContent);
  current = (current - 1) % 24;

  if (current < 0) return;

  updateHour(current);
});

// ------ minutes -------
document
  .querySelector(".add-minutes-btn")
  .addEventListener("click", function () {
    let current = Number(minutes.textContent);
    current = (current + 1) % 60;

    updateMinutes(current);
  });

document
  .querySelector(".rem-minutes-btn")
  .addEventListener("click", function () {
    let current = Number(minutes.textContent);
    current = (current - 1) % 60;

    if (current < 0) return;

    updateMinutes(current);
  });

// ------ seconds -------
document
  .querySelector(".add-seconds-btn")
  .addEventListener("click", function () {
    let current = Number(seconds.textContent);
    current = (current + 1) % 60;

    updateSeconds(current);
  });

document
  .querySelector(".rem-seconds-btn")
  .addEventListener("click", function () {
    let current = Number(seconds.textContent);
    current = (current - 1) % 60;

    if (current < 0) return;

    updateSeconds(current);
  });

// ------ START/PAUSE/RESET BTNS ------

let isPaused = true; // true - timer paused, false - timer not paused

let setTime;
let progressBarPart = 0; // how much width for each second
let currentProgress = 0;

function updateProgressBar() {
  currentProgress += progressBarPart;
  progressBar.style.right = currentProgress + "px";
}

function timer() {
  if (!isPaused) {
    let currentHours = Number(hour.textContent);
    let currentMinutes = Number(minutes.textContent);
    let currentSeconds = Number(seconds.textContent);

    currentSeconds--;
    if (currentSeconds === -1 && currentMinutes > 0) {
      currentMinutes--;
      currentSeconds = 59;
    } else if (currentSeconds === -1 && currentHours > 0) {
      currentHours--;
      currentMinutes = 59;
      currentSeconds = 59;
    } else if (currentMinutes === -1 && currentHours > 0) {
      currentHours--;
      currentMinutes = 59;
    }

    updateHour(currentHours);
    updateMinutes(currentMinutes);
    updateSeconds(currentSeconds);
    updateProgressBar();
    if (currentHours === 0 && currentMinutes === 0 && currentSeconds === 0) {
      if (alarmCheckbox.checked) {
        alarmSound.volume = 0.1;
        alarmSound.play();
      }
      reset();
    }
  }
}

setInterval(timer, 1000);

startBtn.addEventListener("click", function () {
  if (
    hour.textContent === "00" &&
    minutes.textContent === "00" &&
    seconds.textContent === "00"
  )
    return;
  if (startBtn.textContent === "Start") {
    setTime =
      Number(hour.textContent) * 60 * 60 +
      Number(minutes.textContent) * 60 +
      Number(seconds.textContent);
    progressBarPart = progressBarCont.offsetWidth / setTime;
    progressBar.classList.remove("hidden");
    progressBar.classList.add("progressBarExpandAnim");
    progressBarCont.classList.remove("hidden");
    progressBarCont.classList.add("opacityAnim");
    for (let i = 0; i < addLowBtns.length; i++)
      addLowBtns[i].classList.add("fully-hidden");
  }

  startBtn.textContent = "Resume";
  isPaused = false;
});

pauseBtn.addEventListener("click", function () {
  isPaused = true;
});

function reset() {
  isPaused = true;
  hour.textContent = "00";
  minutes.textContent = "00";
  seconds.textContent = "00";
}

const resetMusic = function () {
  alarmSound.pause();
  alarmSound.currentTime = 0;
};

resetBtn.addEventListener("click", function () {
  currentProgress = 0;
  progressBar.style.right = 0 + "px";
  startBtn.textContent = "Start";
  progressBar.classList.add("hidden");
  progressBar.classList.remove("progressBarExpandAnim");
  progressBarCont.classList.add("hidden");
  progressBarCont.classList.remove("opacityAnim");
  for (let i = 0; i < addLowBtns.length; i++)
    addLowBtns[i].classList.remove("fully-hidden");
  reset();
  resetMusic();
});

alarmCheckbox.addEventListener("change", resetMusic);
