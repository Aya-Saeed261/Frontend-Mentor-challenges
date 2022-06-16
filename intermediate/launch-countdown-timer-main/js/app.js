// Global variables
const days = document.querySelector(".days");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
let newTimeInDays = 14;
let newTimeInHours = 0;
let newTimeInMins = 0;
let newTimeInSecs = 0;

// Helper functions
function handleCountdown() {
  --newTimeInSecs;

  if (newTimeInSecs < 0) {
    newTimeInSecs += 60;
    --newTimeInMins;
  }

  if (newTimeInMins < 0) {
    newTimeInMins += 60;
    --newTimeInHours;
  }

  if (newTimeInHours < 0) {
    newTimeInHours += 24;
    --newTimeInDays;
  }

  handleUpdatingTime(seconds, newTimeInSecs);
  handleUpdatingTime(minutes, newTimeInMins);
  handleUpdatingTime(hours, newTimeInHours);
  handleUpdatingTime(days, newTimeInDays);
}

function handleUpdatingTime(unit, newTime) {
  let oldValue = +unit.dataset.time;
  if (newTime === oldValue) return;

  const topHalf = unit.querySelector(".top");
  const bottomHalf = unit.querySelector(".bottom");

  // create new flipping parts every second
  const flippingTop = document.createElement("div");
  flippingTop.classList.add("flip-top", "flip");
  const flippingBottom = document.createElement("div");
  flippingBottom.classList.add("flip-bottom", "flip");

  // set old value to all
  topHalf.innerHTML = `${oldValue < 10 ? "0" : ""}${oldValue}`;
  bottomHalf.innerHTML = `${oldValue < 10 ? "0" : ""}${oldValue}`;
  flippingTop.innerHTML = `${oldValue < 10 ? "0" : ""}${oldValue}`;
  flippingBottom.innerHTML = `${oldValue < 10 ? "0" : ""}${oldValue}`;

  // update time for non flipping parts and remove flipping parts
  flippingTop.addEventListener("animationstart", () => {
    topHalf.innerHTML = `${newTime < 10 ? "0" : ""}${newTime}`;
  });

  flippingTop.addEventListener("animationend", () => {
    flippingTop.remove();
  });

  flippingBottom.addEventListener("animationstart", () => {
    flippingBottom.innerHTML = `${newTime < 10 ? "0" : ""}${newTime}`;
  });

  flippingBottom.addEventListener("animationend", () => {
    bottomHalf.innerHTML = `${newTime < 10 ? "0" : ""}${newTime}`;
    flippingBottom.remove();
  });

  unit.append(flippingTop, flippingBottom);

  unit.dataset.time = newTime;
}

// Main
setInterval(handleCountdown, 1000);
