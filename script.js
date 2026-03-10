const itemFrom = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const inputFilter = document.getElementById("filter");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const formBtn = itemFrom.querySelector(".btn");
let isEditMode = false;
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();
  let newItem = itemInput.value.trim();
  // Validate Input Value
  if (newItem === "") {
    alert("Please enter");
    return;
  }
  newItem = newItem
    .split(" ")
    .map((text) => text[0].toUpperCase() + text.slice(1).toLowerCase())
    .join(" ");

  // Check for Edit Mode
  if (isEditMode) {
    const itemToEdit = document.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  }
  //   Create li Item DOM element
  addItemToDOM(newItem);
  // Add item to local storage
  addItemStorage(newItem);

  checkUI();
  itemInput.value = "";
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  // Add new Item to array

  return itemsFromStorage;
}

function onClickItem(e) {
  const target = e.target;
  if (target.classList.contains("fa-solid")) {
    removeItem(target.closest("li"));
  } else {
    setItemToEdit(target);
  }
}

// Edit Item
function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll(".edit-mode")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");

  formBtn.innerHTML = '   <i class="fa-solid fa-pen"></i> Update Item';
 formBtn.style.backgroundColor = "#228B22"
  itemInput.value = item.firstChild.textContent;
  console.log();
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localstorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Remove Item in to the DOM
function removeItem(item) {
  if (confirm("Are you sure?")) {
    item.remove();
    checkUI();
  }
}

function clearListItem() {
  // Estudar esta parte
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // Opcao Moderna JS
  // itemList.innerHTML = "";
  localStorage.removeItem("items");
  checkUI();
}

function filterItem(e) {
  const inputText = e.target.value.toLowerCase();
  // console.log(inputText);/*  */
  const items = itemList.querySelectorAll("li");
  // Array.from(items).filter((item) => {
  //   const isTrue = item.textContent.toLowerCase().includes(inputText);
  //   if (isTrue) {
  //     item.style.display = "flex";
  //   } else {
  //     item.style.display = "none";
  //   }
  // });

  items.forEach((item) => {
    const itemName = item.firstChild.textContent
      .toLowerCase()
      .indexOf(inputText);
    if (itemName != -1) item.style.display = "flex";
    else item.style.display = "none";
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    inputFilter.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    inputFilter.style.display = "block";
    clearBtn.style.display = "block";
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333'
  isEditMode = false;
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li the DOM
  setTimeout(() => {
    itemList.appendChild(li);
    itemInput.value = "";
    checkUI();
  }, Math.random() * 1000);
  // Eddit Item

  // addItemStorage(item);
}

function addItemStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new Item to array

  itemsFromStorage.push(item);

  // To convert JSON String to set localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// ADD Item into the DOM

// itemList.innerHTML = localStorage.getItem("item");

// Event Listeners
function init() {
  itemFrom.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearListItem);
  inputFilter.addEventListener("input", filterItem);
  document.addEventListener("DOMContentLoaded", displayItems);
  checkUI();
}
// OCultando UI filter Input e btn Clear
init();
