// Global variables
const geolocationURL =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_6kVMlm7aqXQGXKQPQJao4uGAC5546&ipAddress=";
const IPRegex =
  /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
const inputForm = document.querySelector(".IP-form");
const userInput = document.querySelector(".IP-input");
const failMessage = document.querySelector(".fail-msg");
const IPAddressValue = document.querySelector(".IP-address");
const locationValue = document.querySelector(".location");
const timezoneValue = document.querySelector(".timezone");
const ispValue = document.querySelector(".isp");
let map;

// Helper functions
function handleSubmit(e) {
  e.preventDefault();
  let userIP = userInput.value.trim();
  let isAddressValid = validateIPaddress(userIP);
  if (isAddressValid) getIPAddress(userIP);
}

function validateIPaddress(IPAddress) {
  if (IPRegex.test(IPAddress)) return true;
  failMessage.classList.add("show");
  return false;
}

function hideFailMessageIfShown() {
  if (!failMessage.classList.contains("show")) return;
  failMessage.classList.remove("show");
}

async function getIPAddress(IP = "") {
  await fetch(geolocationURL + IP)
    .then((response) => response.json())
    .then((data) => {
      let { lat, lng } = data.location;
      showData(data);
      drawMap(lat, lng);
    })
    .catch((error) => console.log(error));
}

function showData(data) {
  IPAddressValue.innerHTML = `${data.ip}`;
  locationValue.innerHTML = `${data.location.city}${
    data.location.city ? "," : ""
  } ${data.location.region} ${data.location.postalCode}`;
  timezoneValue.innerHTML = `UTC ${data.location.timezone}`;
  ispValue.innerHTML = `${data.isp}`;
}

function drawMap(lat, lng) {
  if (map !== undefined) map.remove();
  map = L.map("map", { zoomControl: false }).setView([lat, lng], 13);
  const myIcon = L.icon({
    iconUrl: "images/icon-location.svg",
  });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  L.control
    .zoom({
      position: "bottomleft",
    })
    .addTo(map);
  let marker = L.marker([lat, lng], { icon: myIcon }).addTo(map);
}

// Main
getIPAddress();

inputForm.addEventListener("submit", handleSubmit);

userInput.addEventListener("input", hideFailMessageIfShown);
