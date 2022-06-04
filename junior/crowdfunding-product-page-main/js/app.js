// Global variables
const bookmarkBtn = document.querySelector(".bookmark");
const backProjectBtn = document.querySelector(".back-project");
const selectionModal = document.querySelector(".modal-container.selection");
const successnModal = document.querySelector(".modal-container.success");
const modalExitBtns = document.querySelectorAll(".close-modal");
const selectRewardBtns = document.querySelectorAll(
  ".plan:not(.out-of-stock) .select-plan"
);
const selectionPlans = selectionModal.querySelectorAll(".plan");
const plansRadios = document.querySelectorAll(".radio");
const plansForm = document.querySelector(".plans-form");
const navMenuBtn = document.querySelector(".toggle-nav-menu");
const navMenuBtnIcons = navMenuBtn.querySelectorAll(".icon");
const navMenu = document.querySelector(".main-nav");

// Helper functions
function markAsBookmarked() {
  this.classList.toggle("bookmarked");
}

function showSelectionModal() {
  let rewardSelected = this.dataset.reward;
  let planSelected = [...selectionPlans].filter((plan) =>
    plan.dataset.reward === rewardSelected ? plan : ""
  )[0];
  let planRadio = planSelected.querySelector(".radio");

  showModal(selectionModal, planSelected);
  planRadio.checked = true;
  highlightSelectedPlan(planSelected);
}

function highlightSelectedPlan(plan) {
  selectionPlans.forEach((plan) => plan.classList.remove("selected"));
  plan.classList.add("selected");
}

function closeModal() {
  const parentModal = this.closest(".modal-container");
  parentModal.classList.add("hide");
}

function selectPlan() {
  if (this.checked === false) return;
  let plan = this.closest(".plan");
  highlightSelectedPlan(plan);
}

function showSuccessModal(e) {
  e.preventDefault();
  selectionModal.classList.add("hide");
  showModal(successnModal);
}

function showModal(modal, contentToShow = modal) {
  modal.classList.remove("hide");
  contentToShow.scrollIntoView({
    behavior: "smooth",
  });
}

function toggleNavMenu() {
  navMenu.classList.toggle("show");
  changeIcon();
}

function changeIcon() {
  navMenuBtnIcons.forEach((icon) => icon.classList.toggle("hide"));
}

function handleBackingProject() {
  showModal(selectionModal);
  selectionPlans.forEach((plan) => plan.classList.remove("selected"));
  plansRadios.forEach((radio) => (radio.checked = false));
}

// Main
bookmarkBtn.addEventListener("click", markAsBookmarked);

backProjectBtn.addEventListener("click", handleBackingProject);

modalExitBtns.forEach((btn) => btn.addEventListener("click", closeModal));

selectRewardBtns.forEach((btn) =>
  btn.addEventListener("click", showSelectionModal)
);

plansRadios.forEach((radio) => radio.addEventListener("change", selectPlan));

plansForm.addEventListener("submit", showSuccessModal);

navMenuBtn.addEventListener("click", toggleNavMenu);
