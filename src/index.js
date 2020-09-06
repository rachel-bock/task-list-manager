const newTodoInputEl = document.getElementById("new-todo");
const newTodoAddButtonEl = document.getElementById("add-todo");
const filterAllButtonEl = document.getElementById("filter-all");
const filterNotDoneButtonEl = document.getElementById("filter-not-done");
const filterDoneButtonEl = document.getElementById("filter-done");
const todoListEl = document.getElementById("todo-list");
let todoList = [];
let nextId = 0;

newTodoAddButtonEl.addEventListener("click", function () {
  if (newTodoInputEl !== "") {
    addTodo(newTodoInputEl.value);
    newTodoInputEl.value = "";
    newTodoInputEl.focus();
  }
});

function addTodo(content) {
  todoList.push({
    content: content,
    id: nextId++,
    isComplete: false
  });
  drawTodos();
}

function drawTodos() {
  todoListEl.innerHTML = "";

  todoList.forEach(function (todo) {
    const listItemEl = document.createElement("li");
    const labelEl = document.createElement("label");
    const checkboxEl = document.createElement("input");
    const spanEl = document.createElement("span");

    checkboxEl.setAttribute("type", "checkbox");
    if (todo.isComplete) {
      checkboxEl.setAttribute("checked", todo.isComplete);
    }
    checkboxEl.addEventListener("change", function () {
      todolist = todolist.map(function (todo) {});
    });

    spanEl.innerText = todo.content;

    labelEl.appendChild(checkboxEl);
    labelEl.appendChild(spanEl);

    listItemEl.appendChild(labelEl);

    todoListEl.appendChild(listItemEl);
  });
}

filterAllButtonEl.addEventListener("click", function () {});

filterNotDoneButtonEl.addEventListener("click", function () {});

filterDoneButtonEl.addEventListener("click", function () {});
