const itemFrom = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const inputFilter = document.getElementById("filter");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please enter");
    return;
  }
  //   Create li Item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li the DOM
  itemList.appendChild(li);
  itemInput.value = "";
  ckeckUI();
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
function clearListItem(e) {
  // Estudar esta parte
  // while (itemList.firstChild) {
  //   itemList.removeChild(itemList.firstChild);
  // }
  itemList.innerHTML = "";
  ckeckUI();
}

function filterItem(e) {
  const inputText = e.target.value.toLowerCase();
  // console.log(inputText);/*  */
  const items = itemList.querySelectorAll("li");
  Array.from(items).filter((item) => {
    const isTrue = item.textContent.toLowerCase().includes(inputText);
    if (isTrue) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
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
// Event Listeners
itemFrom.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearListItem);
inputFilter.addEventListener("input", filterItem);
// OCultando UI filter Input e btn Clear
ckeckUI();
