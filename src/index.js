const newTodoInputEl = document.getElementById("new-todo");
const newTodoAddButtonEl = document.getElementById("add-todo");
const filterAllButtonEl = document.getElementById("filter-all");
const filterNotDoneButtonEl = document.getElementById("filter-not-done");
const filterDoneButtonEl = document.getElementById("filter-done");
const todoListEl = document.getElementById("todo-list");
const storageKey = "learn-web_todo-app";
let todoList = [];
let nextId = 0;
let filter = "none";

try {
  const savedList = localStorage.getItem(storageKey);
  if (savedList !== null) {
    todoList = JSON.parse(savedList);
    drawTodos();
  }
} catch (error) {}

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
  localStorage.setItem(storageKey, JSON.stringify(todoList));
  drawTodos();
}

function drawTodos() {
  todoListEl.innerHTML = "";

  todoList
    .filter(function () {
      switch (filter) {
        case "done":
          return todo.isComplete;
        case "not-done":
          return !todo.iscomplete;
        default:
          return true;
      }
    })
    .forEach(function (todo) {
      const listItemEl = document.createElement("li");
      const labelEl = document.createElement("label");
      const checkboxEl = document.createElement("input");
      const spanEl = document.createElement("span");

      checkboxEl.setAttribute("type", "checkbox");
      if (todo.isComplete) {
        checkboxEl.setAttribute("checked", todo.isComplete);
      }
      checkboxEl.addEventListener("click", function () {
        todoList = todoList.map(function (task) {
          if (task.id === todo.id) {
            task.iscomplete = !task.iscomplete;
          }
          return task;
        });
        localStorage.setItem(storageKey, JSON.stringify(todoList));
        drawTodos();
      });

      spanEl.innerText = todo.content;

      labelEl.appendChild(checkboxEl);
      labelEl.appendChild(spanEl);

      listItemEl.appendChild(labelEl);

      todoListEl.appendChild(listItemEl);
    });
}

filterAllButtonEl.addEventListener("click", function () {
  filter = "none";
  drawTodos();
});

filterNotDoneButtonEl.addEventListener("click", function () {
  filter = "not-done";
  drawTodos();
});

filterDoneButtonEl.addEventListener("click", function () {
  filter = "done";
  drawTodos();
});
