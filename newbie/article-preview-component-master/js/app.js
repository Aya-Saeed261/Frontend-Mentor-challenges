// Global variables
const shareBtn = document.querySelector(".share-btn");

// Helper functions
function toggleShareMethods() {
  shareBtn.classList.toggle("active");
}

function hideShareMethods(e) {
  if (!shareBtn.classList.contains("active")) return;

  if (e.target.matches(".share-btn i") || e.target.matches(".accounts")) return;

  toggleShareMethods();
}

// Main
shareBtn.addEventListener("click", toggleShareMethods);

document.addEventListener("click", hideShareMethods);
