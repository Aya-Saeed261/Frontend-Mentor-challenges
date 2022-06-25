// Global variables
let currentThemeId =
  JSON.parse(window.localStorage.getItem("preferred-theme")) || 0;
const themesBtns = document.querySelectorAll(".theme-radio");
const solveBtn = document.querySelector(".equal-sign");
const resultHolder = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const keysBtns = document.querySelectorAll(".key");
const resetBtn = document.querySelector(".reset");
let gotResult = false;
let expression = "";
let lastChar = "";
let result = 0;

// Helper functions
function handleThemeChange(btn) {
  let chosenThemeId = +btn.dataset.theme;
  if (chosenThemeId === currentThemeId) return;
  checkRadio(btn);
  changeTheme(chosenThemeId);
}

function setTheme(id) {
  let rootEle = document.querySelector(":root");
  rootEle.classList.remove("theme-0", "theme-1", "theme-2");
  rootEle.classList.add(`theme-${id}`);
}

function changeTheme(id) {
  currentThemeId = id;
  updateLocalStorage(currentThemeId);
  setTheme(currentThemeId);
}

function checkRadio(radio) {
  themesBtns.forEach((btn) => {
    btn.checked = false;
    btn.removeAttribute("aria-checked");
  });
  radio.checked = true;
  radio.setAttribute("aria-checked", true);
}

function checkOsColorScheme() {
  if (!window.matchMedia) return false;
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    changeTheme(1);
    return true;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    changeTheme(0);
    return true;
  }
  return false;
}

function updateLocalStorage(id) {
  window.localStorage.setItem("preferred-theme", JSON.stringify(id));
}

function handlePageFirstLoad() {
  if (JSON.parse(window.localStorage.getItem("preferred-theme")) === null) {
    // Check if operating system has a preferred color scheme
    let OsHasColorScheme = checkOsColorScheme();
    if (!OsHasColorScheme) setTheme(currentThemeId);
  } else {
    setTheme(currentThemeId);
  }
  checkRadio(themesBtns[currentThemeId]);
}

function getResult() {
  if (
    expression.length === 0 ||
    /(\+|-|\*|\/)$/.test(expression) ||
    resultHolder.textContent === "Error"
  ) {
    return;
  }
  gotResult = true;
  try {
    result = Number(eval(expression)).toLocaleString("en-US", {
      maximumFractionDigits: 5,
    });
  } catch (error) {
    displayOnscreen("Error");
    return;
  }
  displayOnscreen(result);
}

function handleExpression(pressedKey) {
  // Check for repeated operators
  if (/\.|\+|-|\*|\//.test(lastChar)) {
    if (lastChar === pressedKey) {
      return;
    } else if (/\+|-|\*|\//.test(pressedKey)) {
      deleteLastChar();
    }
  }
  // Check whether user uses the result for another calculation
  if (gotResult) {
    if (pressedKey.match(/\+|-|\*|\//)) {
      expression = result;
    } else {
      expression = "";
    }
    gotResult = false;
  }
  expression += pressedKey;
  displayOnscreen(expression.replaceAll("*", "x"));
  lastChar = pressedKey;
}

function handleReset() {
  expression = "";
  resultHolder.textContent = "";
  lastChar = "";
  gotResult = false;
}

function displayOnscreen(calculations) {
  resultHolder.textContent = calculations;
}

function handleDelete() {
  if (expression.length === 0) return;
  // Check whether user's deleting something or returning to previuos calculation
  if (!gotResult) {
    deleteLastChar();
  } else {
    gotResult = false;
  }
  displayOnscreen(expression.replaceAll("*", "x"));
}

function deleteLastChar() {
  expression = expression.split("");
  expression.pop();
  lastChar = expression[expression.length - 1];
  expression = expression.join("");
}

function handleKeyboardInput(e) {
  if (!e.code.startsWith("Numpad")) return;
  if (e.code.endsWith("Enter")) {
    e.preventDefault();
    getResult();
  } else {
    let pressedKeyValue = String.fromCharCode(e.keyCode);
    handleExpression(pressedKeyValue);
  }
}

// Main
handlePageFirstLoad();

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    const themeId = event.matches ? 0 : 1;
    changeTheme(themeId);
  });

themesBtns.forEach((btn) => {
  btn.addEventListener("click", () => handleThemeChange(btn));
  btn.addEventListener("keypress", (e) => {
    if (e.code !== "Enter") return;
    handleThemeChange(btn);
  });
});

keysBtns.forEach((btn) => {
  btn.addEventListener("click", () => handleExpression(btn.dataset.key));
  btn.addEventListener("keypress", (e) => {
    if (e.code !== "Enter") return;
    e.preventDefault();
    handleExpression(btn.dataset.key);
  });
});

solveBtn.addEventListener("click", getResult);

resetBtn.addEventListener("click", handleReset);

deleteBtn.addEventListener("click", handleDelete);

document.addEventListener("keypress", handleKeyboardInput);
