// Global Variables
const subscribeForm = document.querySelector(".subscribe-form");
const userEmail = document.querySelector("#email");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let changesRequired = false;

// Helper functions
function checkEmail(e) {
  e.preventDefault();
  if (!emailRegex.test(userEmail.value)) {
    this.classList.add("require-change");
    changesRequired = true;
  }
}

function removeWarning() {
  if (!changesRequired) return;
  subscribeForm.classList.remove("require-change");
}

// Main
subscribeForm.addEventListener("submit", checkEmail);

userEmail.addEventListener("input", removeWarning);
