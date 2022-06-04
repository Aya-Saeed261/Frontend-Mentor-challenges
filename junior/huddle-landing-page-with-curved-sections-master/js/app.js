// Global variables
const subscriptionForm = document.querySelector(".newsletter-form");
const userEmail = document.querySelector(".user-email");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper functions
function checkEmail(e) {
  e.preventDefault();

  if (!emailRegex.test(userEmail.value)) {
    this.classList.add("require-changes");
  }
}

function removeMSG() {
  if (!subscriptionForm.classList.contains("require-changes")) return;

  subscriptionForm.classList.remove("require-changes");
}

// Main
subscriptionForm.addEventListener("submit", checkEmail);

userEmail.addEventListener("input", removeMSG);
