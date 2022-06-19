// Global variables\
const navBtn = document.querySelector(".nav-btn");
const navBtnIcons = navBtn.querySelectorAll(".icon");
const navMenu = document.querySelector(".main-nav");

// Helper functions
function toggleNavMenu() {
  navMenu.classList.toggle("hide");
  changeIcon();
}

function changeIcon() {
  navBtnIcons.forEach((icon) => icon.classList.toggle("hide"));
}

// Main
navBtn.addEventListener("click", toggleNavMenu);
