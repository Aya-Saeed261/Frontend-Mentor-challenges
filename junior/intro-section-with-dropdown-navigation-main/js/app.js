// Global variables
const NavLinksDropdownsBtns = document.querySelectorAll(
  ".nav-link-holder .nav-link"
);
const navMenu = document.querySelector(".main-header .content");
const showNavMenuBtn = document.querySelector(".show-nav");
const hideNavMenuBtn = document.querySelector(".hide-nav");

// Helper functions
function toggleDropdown() {
  const dropdownList = this.classList.toggle("active");
}

function toggleNavMenu() {
  navMenu.classList.toggle("hidden");
}

// Main
NavLinksDropdownsBtns.forEach((btn) =>
  btn.addEventListener("click", toggleDropdown)
);

showNavMenuBtn.addEventListener("click", toggleNavMenu);

hideNavMenuBtn.addEventListener("click", toggleNavMenu);
