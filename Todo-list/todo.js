const todoInput = document.querySelector(".todo-input");
const addTodoBtn = document.querySelector(".add-todo-btn");
const listElement = document.getElementsByClassName("todo-list")[0];

const checkBox1 = document.createElement("input");
checkBox1.setAttribute("type", "checkbox");
listElement.appendChild(checkBox1);
let inputValue = "";

const handleSelectUnselect = (e, element) => {
  let radio = e.target;
  console.log(radio.checked, element);

  element.style.textDecoration = radio.checked ? "line-through" : "none";
  addToLocalStorage();
};

const createEntry = () => {
  console.log(isInputValid(inputValue));
  if (isInputValid(inputValue)) {
    createTodos(inputValue);
    addToLocalStorage();
  }
  todoInput.value = null;
  inputValue = null;
};

const createTodos = (value, flag) => {
  const listEntry = document.createElement("li");
  const deleteTodoBtn = document.createElement("button");
  const checkBox1 = document.createElement("input");

  deleteTodoBtn.setAttribute("class", "delete-btn");
  deleteTodoBtn.innerHTML = "Delete";
  deleteTodoBtn.addEventListener("click", () => removeTodo(listEntry));

  checkBox1.setAttribute("type", "checkbox");
  //   checkBox1.classList.add("todo-check");
  listEntry.appendChild(checkBox1);

  const todoText = document.createElement("p");
  todoText.classList.add("todo-text");
  todoText.textContent = value;

  listEntry.appendChild(todoText);

  listEntry.appendChild(deleteTodoBtn);
  listElement.appendChild(listEntry);
  checkBox1.addEventListener("click", (e) => handleSelectUnselect(e, todoText));
  checkBox1.checked = flag;
  checkBox1.style.textDecoration = checkBox1.checked ? "line-through" : "none";
};

const isInputValid = (value) => {
  return value.trim() ? true : false;
};
const removeTodo = (element) => {
  element.remove();
  addToLocalStorage();
};

const handleChange = (event) => {
  inputValue = event.target.value;
};

todoInput.addEventListener("input", (e) => handleChange(e));
addTodoBtn.addEventListener("click", createEntry);

const addToLocalStorage = () => {
  let todos = [];
  listElement.querySelectorAll("li").forEach((item) => {
    console.log(item.querySelector("input"));
    let flag = item.querySelector("input").checked;
    let todoText = item.querySelector("p").innerText;
    let itemStyle = item.querySelector("input").style.textDecoration;
    console.log(todoText);
    todos.push({ text: todoText, check: flag, style: itemStyle });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

const fetchFromLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos && todos.length > 0) {
    todos.forEach((item) => {
      console.log(item.check);
      return createTodos(item.text, item.check);
    });
  }
};

fetchFromLocalStorage();
