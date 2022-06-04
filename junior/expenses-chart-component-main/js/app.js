// Global variables
const daysArr = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const chart = document.querySelector(".chart");
const date = new Date();
const currentDay = daysArr[date.getDay()];
const maxHeight = 200;

// Helper functions
async function getInfo() {
  await fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      let copyOfData = [...data];
      let maxAmount = copyOfData.sort((a, b) => b.amount - a.amount)[0].amount;
      chart.innerHTML = data
        .map((ele) => {
          let height = maxHeight * (ele.amount / maxAmount);
          return `<div class="day ${ele.day === currentDay ? "active" : ""}">
        <div class="stat">
          <div class="percentage" style="height:${Math.floor(
            height
          )}px" data-value="$${ele.amount}"></div>
        </div>
        <p class="name">${ele.day}</p>
      </div>`;
        })
        .join("");
    })
    .catch((error) => console.log(error));
}

// Main
getInfo();
