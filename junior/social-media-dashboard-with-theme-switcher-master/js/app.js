// Global variables
const lightTheme = {
  "toggle-from": "hsl(230, 22%, 74%)",
  "toggle-to": "hsl(230, 22%, 74%)",
  bg: "hsl(0, 0%, 100%)",
  "top-bg-pattern": "hsl(225, 100%, 98%)",
  "card-bg": "hsl(227, 47%, 96%)",
  "card-bg-hover": "hsl(227, 47%, 92%)",
  "main-text": "hsl(230, 17%, 14%)",
  "secondary-text": "hsl(228, 12%, 44%)",
};

const darkTheme = {
  "toggle-from": "hsl(210, 78%, 56%)",
  "toggle-to": "hsl(146, 68%, 55%)",
  bg: "hsl(230, 17%, 14%)",
  "top-bg-pattern": "hsl(232, 19%, 15%)",
  "card-bg": "hsl(228, 28%, 20%)",
  "card-bg-hover": "hsl(228, 28%, 24%)",
  "main-text": "hsl(0, 0%, 100%)",
  "secondary-text": "hsl(228, 34%, 66%)",
};

const togglerContainer = document.querySelector(".toggler-container");
const toggler = document.querySelector(".toggler");
let currentTheme = lightTheme;

// Helper functions

function changeTheme() {
  toggler.classList.toggle("toggled");

  currentTheme = toggler.classList.contains("toggled") ? darkTheme : lightTheme;

  for (let property in currentTheme) {
    document.documentElement.style.setProperty(
      `--${property}`,
      `${currentTheme[property]}`
    );
  }
}

// Main
togglerContainer.addEventListener("click", changeTheme);
