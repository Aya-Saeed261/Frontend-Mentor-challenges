// Global variables
const resetBtn = document.querySelector(".reset");
const billInput = document.querySelector("#bill");
const customTip = document.querySelector("#custom-tip");
const changesToMake = document.querySelector(".changes");
const peopleNumInput = document.querySelector("#people-number-input");
const totalPerPerson = document.querySelector(".total-result .value");
const peopleNumHolder = document.querySelector(".people-number-holder");
const tipPerPerson = document.querySelector(".tip-amount-result .value");
const tipValues = document.querySelectorAll(".tip-value");
let totalBill,
  peopleNum,
  totalTip,
  tipPercentage = 0,
  gotBill = false,
  gotTip = false,
  gotPeopleNum = false;

// Helper functions
function getTotalBill() {
  totalBill = +this.value;
  gotBill = true;
  calculateTotalPerPerson();
  calculateTipPerPerson(tipPercentage);
}

function getNumOfPeople() {
  peopleNum = +this.value;
  if (peopleNum !== 0 && peopleNum === parseInt(peopleNum)) {
    peopleNumHolder.classList.remove("require-change");
    gotPeopleNum = true;
    calculateTotalPerPerson();
    calculateTipPerPerson(tipPercentage);
    return;
  }
  gotPeopleNum = false;
  totalPerPerson.innerHTML = "$0.00";
  tipPerPerson.innerHTML = "$0.00";
  peopleNumHolder.classList.add("require-change");
  peopleNum === 0
    ? (changesToMake.innerHTML = `Can't be zero`)
    : (changesToMake.innerHTML = `Seriously? please enter an integer`);
}

function calculateTotalPerPerson() {
  if (!(gotPeopleNum && gotBill)) return;
  totalPerPerson.innerHTML = `$${(totalBill / peopleNum).toFixed(2)}`;
  resetBtn.classList.remove("no-changes");
}

function calculateTipPerPerson(percentage) {
  if (!(gotPeopleNum && gotBill)) return;
  totalTip = (percentage * totalBill) / 100;
  tipPerPerson.innerHTML = `$${(totalTip / peopleNum).toFixed(2)}`;
  resetBtn.classList.remove("no-changes");
}

function tipsValuesHandler() {
  gotTip = true;
  tipValues.forEach((tipValue) => tipValue.classList.remove("selected-tip"));
  this.classList.add("selected-tip");
  tipPercentage = +this.dataset.tip;
  calculateTipPerPerson(tipPercentage);
  customTip.value = "";
}

function customTipHandler() {
  gotTip = true;
  tipValues.forEach((tipValue) => tipValue.classList.remove("selected-tip"));
  tipPercentage = +this.value;
  calculateTipPerPerson(tipPercentage);
}

function resetHandler() {
  resetBtn.classList.add("no-changes");
  tipValues.forEach((tipValue) => tipValue.classList.remove("selected-tip"));
  totalPerPerson.innerHTML = "$0.00";
  tipPerPerson.innerHTML = "$0.00";
  peopleNumInput.value = "";
  customTip.value = "";
  billInput.value = "";
  gotPeopleNum = false;
  gotBill = false;
  gotTip = false;
}

// Main
billInput.addEventListener("input", getTotalBill);

peopleNumInput.addEventListener("input", getNumOfPeople);

tipValues.forEach((tipValue) =>
  tipValue.addEventListener("click", tipsValuesHandler)
);

customTip.addEventListener("input", customTipHandler);

resetBtn.addEventListener("click", resetHandler);
