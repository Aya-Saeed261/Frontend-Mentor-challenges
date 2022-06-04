// Global variables
const openNavBtn = document.querySelector(".open-nav");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
let navMenuOpened = false;

// Helper functions
function toggleNavMenu() {
  openNavBtn.classList.toggle("opened");
  navbar.classList.toggle("hide-menu");
  navMenuOpened = !navMenuOpened;
}

function closeNavbarIfOpened(e) {
  if (!navMenuOpened) return;
  if (!e.target.closest(".open-nav")) toggleNavMenu();
}

function setActive() {
  navLinks.forEach((link) => link.classList.remove("active"));
  this.classList.add("active");
}

// Main
openNavBtn.addEventListener("click", toggleNavMenu);

document.addEventListener("click", closeNavbarIfOpened);

navLinks.forEach((link) => link.addEventListener("click", setActive));
