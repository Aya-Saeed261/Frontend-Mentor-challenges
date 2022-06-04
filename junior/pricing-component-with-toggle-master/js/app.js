// Global Variables
const togglerContainer = document.querySelector(".toggler-container");
const toggler = document.querySelector(".toggler");
const costs = document.querySelectorAll(".cost .number");

// Helper functions
function changePayment() {
  toggler.classList.toggle("toggled");
  costs.forEach((cost) => cost.classList.toggle("active"));
}

//Main
togglerContainer.addEventListener("click", changePayment);
