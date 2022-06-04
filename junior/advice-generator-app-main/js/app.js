// Global variables
const url = "https://api.adviceslip.com/advice";
const loadingSpinner = document.querySelector(".spinner-container");
const newAdviceBtn = document.querySelector(".new-advice");
const adviceHolder = document.querySelector(".advice");
const adviceNumber = document.querySelector(".advice-number .number");
let adviceObj;

// Helper functions
async function getAdvice() {
  loadingSpinner.classList.remove("hide");
  adviceHolder.innerHTML = "";
  adviceNumber.innerHTML = "";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      adviceObj = data.slip;
    })
    .catch((error) => console.log(error))
    .then(() => {
      loadingSpinner.classList.add("hide");
      adviceHolder.innerHTML = `"${adviceObj.advice}"`;
      adviceNumber.innerHTML = `${adviceObj.id}`;
    });
}

// Main
getAdvice();

newAdviceBtn.addEventListener("click", getAdvice);
