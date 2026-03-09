const itemFrom = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clear = document.getElementById("clear");


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
  li.appendChild(button)
  itemList.appendChild(li)
  itemInput.value = "";
}
// Remove Item in to the DOM
function removeItem(e){
  if(e.target.classList.contains('fa-solid')){
   const li = e.target.closest('li').remove();
  }
  
}
function clearListItem (e){
  
  if(itemList.length === 0){
    e.returnValue ? itemList.innerHTML = '' : null
    alert('voce deseja limpar a carinha !!!')
}
  
}

clear.addEventListener('click',clearListItem)

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



