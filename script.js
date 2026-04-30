let itemArray = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.querySelector(".task-list");
const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(itemArray));
};

const renderTask = () => {
  taskList.innerHTML = "";
  itemArray.forEach((item, index) => {
    const list = document.createElement("li");
    list.innerHTML = `
     
    <input type="checkbox" class="checkTask" ${item.isCompleted ? "checked" : ""} />
  <span class="task-title ${item.isCompleted ? "completed" : ""}">
    ${item.title}
  </span>
        <div class="btn-group">
       <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
       </div>
        `;
    const editBtn = list.querySelector(".editBtn");
    const deleteBtn = list.querySelector(".deleteBtn");
    const checkbox = list.querySelector(".checkTask");
    editBtn.addEventListener("click", () => editTask(index));
    deleteBtn.addEventListener("click", () => deleteTask(index));
    checkbox.addEventListener("change", (e) => updateTask(index, e));
    taskList.appendChild(list);
  });
};
const updateTask = (index, event) => {
  itemArray[index].isCompleted = event.target.checked;
  saveToLocalStorage();
  renderTask();
};
let editIndex = null;
const editTask = (index) => {
  const input = document.getElementById("inputValue");
  const btn = document.getElementById("addBtn");
  input.value = itemArray[index].title;
  editIndex = index;
  btn.textContent = "Update";
};
const addTask = () => {
  let input = document.getElementById("inputValue");
  let addValue = input.value;
  const btn = document.getElementById("addBtn");
  if (!addValue.trim()) {
    alert("please enter value");
    return;
  }
  if (addValue.length < 3) {
    alert("Task must be at least 3 characters");
    return;
  }
  if (/\d/.test(addValue)) {
    alert("Numbers are not allowed in task");
    return;
  }
  if (addValue.length > 30) {
    alert("Task must be less than 30 characters");
    return;
  }
  if (editIndex !== null) {
    itemArray[editIndex].title = addValue;
    editIndex = null;
    btn.textContent = "Add";
  } else {
    itemArray.push({
      title: addValue,
      isCompleted: false,
    });
  }
  input.value = "";
  saveToLocalStorage();
  renderTask();
};

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addTask);
const input = document.getElementById("inputValue");
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addBtn.click();
  }
});
const deleteTask = (index) => {
  itemArray.splice(index, 1);
  saveToLocalStorage();
  renderTask();
};

renderTask();
