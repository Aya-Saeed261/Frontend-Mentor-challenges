// Global Variables
const showNavLinksBtns = document.querySelectorAll(".main-nav .holder");
const showNavBtn = document.querySelector(".nav-menu-icon");
const navMenu = document.querySelector(".main-header .main-holder");
let isNavLinksOpen = false;

// Helper functions
function toggleNavLinks() {
  showNavLinksBtns.forEach((btn) =>
    btn !== this ? btn.classList.remove("opened") : ""
  );
  this.classList.toggle("opened");
  isNavLinksOpen = !isNavLinksOpen;
}

function toggleNav() {
  navMenu.classList.toggle("hide-in-mobile");
}

// Main
showNavLinksBtns.forEach((btn) =>
  btn.addEventListener("click", toggleNavLinks)
);

showNavBtn.addEventListener("click", toggleNav);
