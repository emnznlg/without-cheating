const form = document.querySelector(".input-container");
const inputArea = form.querySelector("input");
const list = document.querySelector(".list");

let items = [];

function submitItem(e) {
  e.preventDefault();
  const name = inputArea.value;
  if (!name) return;
  let item = {
    name: name,
    isCompleted: false,
    id: Date.now(),
  };
  items.push(item);
  inputArea.value = "";
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function displayListItems() {
  const listHtml = items
    .map((item) => {
      return ` <li class="list-item">
              <span class="item-text ${item.isCompleted ? "completed" : ""}">
              ${item.name}</span>
              <div class="buttons">
                <button class="btn delete-btn" value="${item.id}">
                  <i class="fas fa-trash"></i>
                </button>
                <button class="btn completed-btn" value="${item.id}" >
                  <i class="fas fa-check"></i>
                </button>
              </div>
            </li>`;
    })
    .join("");
  list.innerHTML = listHtml;
}

function addItemsToLS() {
  localStorage.setItem("listItems.todoApp", JSON.stringify(items));
}

function getItemsFromLS() {
  const LSItems = JSON.parse(localStorage.getItem("listItems.todoApp"));
  if (LSItems.length) {
    items = LSItems;
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
}

function deleteItem(id) {
  items = items.filter((item) => {
    if (item.id != id) {
      return item;
    }
  });
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function completeItem(id) {
  const itemCompleted = items.find((item) => {
    if (item.id == id.value) {
      return item;
    }
  });
  if (itemCompleted.isCompleted) {
    itemCompleted.isCompleted = false;
  } else {
    itemCompleted.isCompleted = true;
  }

  const liItem = id.parentElement.parentElement;
  const spanItem = liItem.querySelector(".item-text");
  spanItem.classList.toggle("completed");
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

form.addEventListener("submit", submitItem);
list.addEventListener("itemsUpdated", displayListItems);
list.addEventListener("itemsUpdated", addItemsToLS);
list.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    deleteItem(e.target.value);
  } else if (e.target.classList.contains("completed-btn")) {
    completeItem(e.target);
  }
});

window.addEventListener("DOMContentLoaded", getItemsFromLS);
