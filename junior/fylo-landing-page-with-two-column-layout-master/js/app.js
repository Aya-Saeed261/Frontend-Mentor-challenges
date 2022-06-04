// Global variables
const forms = document.querySelectorAll(".subscription-form");
const inputs = document.querySelectorAll(".user-email");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper functions
function checkEmail(e) {
  e.preventDefault();

  let userEmail = this.querySelector(".user-email").value;
  if (emailRegex.test(userEmail)) return;

  this.classList.add("require-changes");
}

function removeMsg(indx) {
  if (!forms[indx].classList.contains("require-changes")) return;

  forms[indx].classList.remove("require-changes");
}

// Main
forms.forEach((form) => form.addEventListener("submit", checkEmail));

inputs.forEach((input, indx) =>
  input.addEventListener("input", () => removeMsg(indx))
);
