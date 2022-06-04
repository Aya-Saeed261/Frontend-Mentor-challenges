// Global variables
const cards = document.querySelectorAll("[data-card]");
const statsBtns = document.querySelectorAll(".stats-btn");
let currentStat = "weekly";

// Helper functions
function setActive() {
  statsBtns.forEach((btn) => btn.classList.remove("active"));
  this.classList.add("active");
  currentStat = this.dataset.stats;
  getStats();
}

async function getStats() {
  await fetch("js/data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((obj) => {
        let card = document.querySelector(`[data-card="${obj.title}"]`);
        card.querySelector(
          ".current"
        ).innerHTML = `${obj["timeframes"][currentStat]["current"]}hrs`;
        card.querySelector(".previous").innerHTML = `Last ${
          currentStat === "daily"
            ? "Day"
            : currentStat === "weekly"
            ? "Week"
            : "Month"
        } - ${obj["timeframes"][currentStat]["previous"]}hrs`;
      });
    })
    .catch((error) => console.log(error));
}

// Main
statsBtns.forEach((btn) => btn.addEventListener("click", setActive));
