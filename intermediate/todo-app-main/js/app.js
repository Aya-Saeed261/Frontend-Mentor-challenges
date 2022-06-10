// Global variables
const darkTheme = {
  bg: "hsl(235, 21%, 11%)",
  "todo-bg": "hsl(235, 24%, 19%)",
  "main-text": "hsl(234, 39%, 85%)",
  "hover-text": "hsl(236, 33%, 92%)",
  "secondary-text": "hsl(234, 11%, 52%)",
  completed: "hsl(233, 14%, 35%)",
  border: "hsl(237, 14%, 26%)",
};

const lightTheme = {
  bg: "hsl(236, 33%, 92%)",
  "todo-bg": "hsl(0, 0%, 98%)",
  "main-text": "hsl(235, 19%, 35%)",
  "hover-text": "hsl(235, 19%, 35%)",
  "secondary-text": "hsl(236, 9%, 61%)",
  completed: "hsl(233, 11%, 84%)",
  border: "hsl(233, 11%, 84%)",
};

const filterBtns = document.querySelectorAll(".filter-btn");
const themeBtns = document.querySelectorAll(".theme-btn");
const newTodoBtn = document.querySelector(".create-item");
const clearCompletedBtn = document.querySelector(".clear-completed");
const todotasksList = document.querySelector(".todo-list");
const tasksLeft = document.querySelector(".items-left .number");
let allTodoTasks = JSON.parse(window.localStorage.getItem("allTasks")) || [];
let currentTheme = darkTheme;
let filter = "all";
let dragSrcEl;

// Helper functions
function generateUniqueId() {
  let id = "task-007";

  for (let i = 0; i < 6; i++) {
    id += Math.floor(Math.random() * 10);
  }
  if (allTodoTasks.some((task) => task.id === id)) generateUniqueId();

  return id;
}

function updateLocalStorage() {
  window.localStorage.setItem("allTasks", JSON.stringify(allTodoTasks));
}

function updateStatus(task) {
  let index = allTodoTasks.findIndex((item) => item.id === task.id);
  allTodoTasks[index].status = task.classList.contains("active")
    ? "active"
    : "completed";

  updateLocalStorage();
}

function setActive(btn) {
  filterBtns.forEach((btn) => btn.classList.remove("active"));
  btn.classList.add("active");
}

function deleteTask(task) {
  task.remove();

  allTodoTasks = allTodoTasks.filter((item) => item.id !== task.id);
  updateLocalStorage();
}

function updateNumberOfTasksLeft() {
  let number = document.querySelectorAll(".todo-item.active").length;
  tasksLeft.innerHTML = `${number}`;
}

function toggleChecked(task) {
  let todoItem = task.parentElement;
  todoItem.classList.toggle("completed");
  todoItem.classList.toggle("active");
  if (filter !== "all" && !todoItem.classList.contains(`${filter}`)) {
    todoItem.classList.add("filtered-out");
  }

  updateStatus(todoItem);
  updateNumberOfTasksLeft();
}

function filterList() {
  setActive(this);

  filter = this.dataset.filter;
  const todoItems = document.querySelectorAll(".todo-item");
  if (todoItems.length === 0) return;
  todoItems.forEach((item) => item.classList.remove("filtered-out"));
  if (filter === "all") return;
  todoItems.forEach((item) =>
    !item.classList.contains(`${filter}`)
      ? item.classList.add("filtered-out")
      : ""
  );
}

function changeTheme() {
  let newTheme = this.dataset.theme;
  currentTheme = newTheme === "light" ? lightTheme : darkTheme;
  document.body.classList.toggle("light-theme");
  document.body.classList.toggle("dark-theme");
  for (let property in currentTheme) {
    document.documentElement.style.setProperty(
      `--${property}`,
      `${currentTheme[property]}`
    );
  }
}

function createNewTodo(e) {
  e.preventDefault();

  let task = document.querySelector(".new-item").value;
  let newItem = document.createElement("li");
  newItem.classList.add("todo-item");
  newItem.classList.add("active");
  newItem.setAttribute("id", generateUniqueId());
  newItem.setAttribute("draggable", "true");
  newItem.innerHTML = `<div class="checkbox"></div>
  <p>${task}</p>
  <button class="delete-item"><img src="images/icon-cross.svg" alt="icon"></button>`;
  todotasksList.append(newItem);

  allTodoTasks.push({
    task: task,
    id: newItem.id,
    status: "active",
  });
  updateLocalStorage();

  updateNumberOfTasksLeft();

  document.querySelector(".new-item").value = "";
}

function removeCompleted() {
  let completedItems = document.querySelectorAll(".completed");
  if (completedItems.length === 0) return;
  completedItems.forEach((item) => deleteTask(item));

  allTodoTasks = allTodoTasks.filter((item) => item.status !== "completed");
  updateLocalStorage();
}

function checkForChanges(e) {
  if (e.target.matches(".checkbox")) {
    toggleChecked(e.target);
    updateNumberOfTasksLeft();
  }

  if (e.target.matches(".delete-item img")) {
    deleteTask(e.target.parentElement.parentElement);
    updateNumberOfTasksLeft();
  }
}

function populateList() {
  todotasksList.innerHTML = allTodoTasks
    .map((item) => {
      return `<li class="todo-item ${item.status}" id=${item.id} draggable="true">
    <div class="checkbox"></div>
    <p>${item.task}</p>
    <button class="delete-item"><img src="images/icon-cross.svg" alt="icon"></button></li>`;
    })
    .join("");

  updateNumberOfTasksLeft();
}

function handleDragStart(e) {
  dragSrcEl = e.target;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", e.target.innerHTML);
  e.dataTransfer.setData("id/html", e.target.id);
  e.dataTransfer.setData("class/html", e.target.classList.value);
}

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDragEnter(e) {
  e.target.closest(".todo-item").classList.add("over");
}

function handleDragLeave(e) {
  e.target.closest(".todo-item").classList.remove("over");
}

function handleDrop(e) {
  e.stopPropagation();

  if (!(e.target.matches(".todo-item") || e.target.matches(".todo-item *"))) {
    return;
  }

  let targetPosition = e.target.closest(".todo-item");
  targetPosition.classList.remove("over");

  if (dragSrcEl !== e.target) {
    dragSrcEl.innerHTML = targetPosition.innerHTML;
    dragSrcEl.id = targetPosition.id;
    dragSrcEl.classList.value = targetPosition.classList.value;

    targetPosition.innerHTML = e.dataTransfer.getData("text/html");
    targetPosition.id = e.dataTransfer.getData("id/html");
    targetPosition.classList.value = e.dataTransfer.getData("class/html");
  }

  reorderTasksInStorage();

  return false;
}

function reorderTasksInStorage() {
  let todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item, indx) => {
    if (item.id !== allTodoTasks[indx].id) {
      let requiredElement = allTodoTasks.find((ele) => ele.id === item.id);
      allTodoTasks.splice(allTodoTasks.indexOf(requiredElement), 1);
      allTodoTasks.splice(indx, 0, requiredElement);
    }
  });
  updateLocalStorage();
}

// Main
window.localStorage.setItem("allTasks", JSON.stringify(allTodoTasks));

populateList();

filterBtns.forEach((btn) => btn.addEventListener("click", filterList));

themeBtns.forEach((btn) => btn.addEventListener("click", changeTheme));

newTodoBtn.addEventListener("submit", createNewTodo);

clearCompletedBtn.addEventListener("click", removeCompleted);

todotasksList.addEventListener("click", checkForChanges);

todotasksList.addEventListener("dragstart", handleDragStart);
todotasksList.addEventListener("dragover", handleDragOver);
todotasksList.addEventListener("dragenter", handleDragEnter);
todotasksList.addEventListener("dragleave", handleDragLeave);
todotasksList.addEventListener("drop", handleDrop);
