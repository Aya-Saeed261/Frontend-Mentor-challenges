// Global variables
const pricesArr = [8, 12, 16, 24, 36];
const viewsArr = ["10K", "50K", "100K", "500K", "1M"];
const togglerController = document.querySelector(".toggler-controler");
const toggler = document.querySelector(".toggler");
const slider = document.querySelector(".slider");
const price = document.querySelector(".cost");
const views = document.querySelector(".num");
let userInput = 2;

// Helper functions
function togglePlan() {
  togglerController.classList.toggle("toggled");
}

function changeViews() {
  userInput = this.value;
  views.innerHTML = `${viewsArr[userInput]}`;
  price.innerHTML = `$${pricesArr[userInput].toFixed(2)}`;
  slider.style.background = `linear-gradient(to right,var(--full-slider-bar) 0%,var(--full-slider-bar) ${
    (userInput / 4) * 100
  }%,var(--empty-slider-bar) ${
    (userInput / 4) * 100
  }%,var(--empty-slider-bar) 100%)`;
}

function checkDiscount() {
  let appliedPrice = pricesArr[userInput];
  if (togglerController.classList.contains("toggled")) {
    appliedPrice -= appliedPrice * 0.25;
  }
  price.innerHTML = `$${appliedPrice.toFixed(2)}`;
}

// Main
toggler.addEventListener("click", togglePlan);

slider.addEventListener("input", changeViews);

toggler.addEventListener("click", checkDiscount);
