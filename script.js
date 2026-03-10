const itemFrom = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const inputFilter = document.getElementById("filter");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
}

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please enter");
    return;
  }
  //   Create li Item DOM element
  addItemToDOM(newItem);
  // Add item to local storage
  addItemStorage(newItem);

  ckeckUI();
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
// Remove Item in to the DOM
function removeItem(e) {
  if (e.target.classList.contains("fa-solid")) {
    if (confirm("Are you sure?")) {
      e.target.closest("li").remove();
      ckeckUI();
    }
  }
}

function clearListItem() {
  // Estudar esta parte
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // Opcao Moderna JS
  // itemList.innerHTML = "";
  ckeckUI();
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

function ckeckUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    inputFilter.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    inputFilter.style.display = "block";
    clearBtn.style.display = "block";
  }
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li the DOM
  itemList.appendChild(li);
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
itemFrom.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearListItem);
inputFilter.addEventListener("input", filterItem);
document.addEventListener("DOMContentLoaded", displayItems);
// OCultando UI filter Input e btn Clear
ckeckUI();
