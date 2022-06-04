// Global variables
const headerMenuBtn = document.querySelector(".header-menu-btn");
const headerMenu = document.querySelector(".header-menu");
const headerMenuBtnIcons = headerMenuBtn.querySelectorAll(".icon");

// Helper functions
function toggleMenu() {
  headerMenu.classList.toggle("hidden");

  changeIcon();
}

function changeIcon() {
  headerMenuBtnIcons.forEach((icon) => icon.classList.toggle("hide"));
}

// Main
headerMenuBtn.addEventListener("click", toggleMenu);
