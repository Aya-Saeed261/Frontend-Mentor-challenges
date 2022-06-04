// Global variables
const toggleNavBtn = document.querySelector(".show-nav-btn");
const toggleNavBtnIcons = toggleNavBtn.querySelectorAll(".icon");
const navMenu = document.querySelector(".main-nav .nav-list");
const headerNavLinks = navMenu.querySelectorAll(".nav-link");

// Helper functions
function toggleNavMenu() {
  navMenu.classList.toggle("shown");

  changeBtnIcon();
}

function changeBtnIcon() {
  toggleNavBtnIcons.forEach((icon) => icon.classList.toggle("hidden"));
}

// Main
toggleNavBtn.addEventListener("click", toggleNavMenu);
