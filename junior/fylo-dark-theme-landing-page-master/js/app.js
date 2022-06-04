// Global variables
const subForm = document.querySelector(".sub-form");
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
  if (!subForm.classList.contains("require-changes")) return;

  subForm.classList.remove("require-changes");
}

// Main
subForm.addEventListener("submit", checkEmail);

userEmail.addEventListener("input", removeMSG);
