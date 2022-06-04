// Global variables
const freeTrialForm = document.querySelector(".free-trial");
const formInputs = document.querySelectorAll("input");
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper functions
function checkInputs(e) {
  e.preventDefault();
  formInputs.forEach((input) => {
    let inputHolder = input.parentElement;
    let changes = inputHolder.querySelector("p");
    if (input.value.length === 0) {
      inputHolder.classList.add("require-changes");
      changes.innerHTML = `${input.dataset.input} cannot be empty`;
    } else if (input.name === "email" && !emailReg.test(input.value)) {
      inputHolder.classList.add("require-changes");
      changes.innerHTML = `looks like this is not an email`;
    }
  });
}

function removeWarning() {
  if (!this.parentElement.classList.contains("require-changes")) return;
  this.parentElement.classList.remove("require-changes");
}

// Main
freeTrialForm.addEventListener("submit", checkInputs);

formInputs.forEach((input) => input.addEventListener("input", removeWarning));
