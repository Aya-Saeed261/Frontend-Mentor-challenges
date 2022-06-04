// Global variables
const questions = document.querySelectorAll(".question-container");

// Helper functions
function showAns() {
  if (this.classList.contains("active")) {
    this.classList.remove("active");
    return;
  }

  questions.forEach((question) => question.classList.remove("active"));

  this.classList.add("active");
}

// Main
questions.forEach((question) => question.addEventListener("click", showAns));
