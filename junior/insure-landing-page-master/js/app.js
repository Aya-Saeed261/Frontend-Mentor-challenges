// Global variables
const navMenuBtn = document.querySelector(".toggleNavMenu");
const navMenuBtnIcons = navMenuBtn.querySelectorAll(".icon");
const navMenu = document.querySelector(".main-header .holder");

// Helper functions
function toggleNavMenu() {
  navMenu.classList.toggle("hidden");
  changIcon();
}

function changIcon() {
  navMenuBtnIcons.forEach((icon) => icon.classList.toggle("hidden"));
}

// Main
navMenuBtn.addEventListener("click", toggleNavMenu);
