// Global variables
const form = document.querySelector("form");
const userEmail = document.querySelector(".user-email");
const changesRequired = document.querySelector(".changes");
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper functions
function checkEmail(e) {
  e.preventDefault();
  if (userEmail.value.length === 0 || !emailReg.test(userEmail.value)) {
    form.classList.add("require-change");
    changesRequired.innerHTML = `Please provide a valid email`;
  }
}

function removeWarning() {
  if (!form.classList.contains("require-change")) return;
  form.classList.remove("require-change");
}

// Main
form.addEventListener("submit", checkEmail);

userEmail.addEventListener("input", removeWarning);
