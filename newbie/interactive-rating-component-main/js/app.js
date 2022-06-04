// Global variables
const submitBtn = document.querySelector(".submit");
const ratings = document.querySelectorAll(".rating");
const ratingState = document.querySelector(".rating-state");
const thankYouMsg = document.querySelector(".thank-you-msg");
const userRating = document.querySelector(".user-rating .rating");
let chosenRating;

// Helper functions
function chooseRating() {
  ratings.forEach((rating) => rating.classList.remove("active"));
  chosenRating = this.dataset.rating;
  this.classList.add("active");
  submitBtn.classList.remove("not-rated");
}

function submitRating() {
  if (this.classList.contains("not-rated")) return;
  userRating.innerHTML = `${chosenRating}`;
  ratingState.classList.add("hide");
  thankYouMsg.classList.remove("hide");
}

// Main
ratings.forEach((rating) => rating.addEventListener("click", chooseRating));

submitBtn.addEventListener("click", submitRating);
