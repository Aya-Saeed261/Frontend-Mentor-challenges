// Global Variables
const slides = document.querySelectorAll(".slide");
const slidingBtns = document.querySelectorAll(".slider-btn");

// Helper functions
function showOtherSlide() {
  slides.forEach((slide) => slide.classList.toggle("active"));
}

// Main
slidingBtns.forEach((btn) => btn.addEventListener("click", showOtherSlide));
