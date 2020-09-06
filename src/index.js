const newTodoInputEl = document.getElementById("new-todo");
const newTodoAddButtonEl = document.getElementById("add-todo");
const filterAllButtonEl = document.getElementById("filter-all");
const filterDoneButtonEl = document.getElementById("filter-done");
const filterNotDoneButtonEl = document.getElementById("filter-not-done");
const todoListEl = document.getElementById("todo-list");
const storageKey = "twitch-learn-web_todo-app";
const idKey = "twitch-learn-web_todo-app_id";
let todoList = [];
let nextId = 0;
let filter = "none";

try {
  const savedList = localStorage.getItem(storageKey);

  if (savedList !== null) {
    todoList = JSON.parse(savedList);
    drawTodos();
  }

  const savedId = localStorage.getItem(idKey);

  if (savedId !== null) {
    nextId = parseInt(savedId, 10);
  }
} catch (error) {
  // ignore
}

newTodoAddButtonEl.addEventListener("click", function () {
  if (newTodoInputEl.value !== "") {
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
  localStorage.setItem(idKey, nextId.toString());
  localStorage.setItem(storageKey, JSON.stringify(todoList));
  drawTodos();
}

function drawTodos() {
  todoListEl.innerHTML = "";

  todoList
    .filter(function (todo) {
      switch (filter) {
        case "done":
          return todo.isComplete;
        case "not-done":
          return !todo.isComplete;
        default:
          return true;
      }
    })
    .forEach(function (todo) {
      const listItemEl = document.createElement("li");
      const labelEl = document.createElement("label");
      const checkboxEl = document.createElement("input");
      const spanEl = document.createElement("span");
      const deleteButtonEl = document.createElement("button");

      checkboxEl.setAttribute("type", "checkbox");

      if (todo.isComplete) {
        checkboxEl.setAttribute("checked", true);
      }

      checkboxEl.addEventListener("click", function () {
        todoList = todoList.map(function (t) {
          if (t.id === todo.id) {
            t.isComplete = !t.isComplete;
          }

          return t;
        });
        localStorage.setItem(storageKey, JSON.stringify(todoList));
        drawTodos();
      });

      deleteButtonEl.addEventListener("click", function () {
        todoList = todoList.filter(function (t) {
          return todo.id !== t.id;
        });
        localStorage.setItem(storageKey, JSON.stringify(todoList));
        drawTodos();
      });
      deleteButtonEl.innerText = "Delete";

      spanEl.innerText = todo.content;

      labelEl.appendChild(checkboxEl);
      labelEl.appendChild(spanEl);

      listItemEl.appendChild(labelEl);
      listItemEl.appendChild(deleteButtonEl);

      todoListEl.appendChild(listItemEl);
    });
}

filterDoneButtonEl.addEventListener("click", function () {
  filter = "done";
  drawTodos();
});

filterNotDoneButtonEl.addEventListener("click", function () {
  filter = "not-done";
  drawTodos();
});

filterAllButtonEl.addEventListener("click", function () {
  filter = "none";
  drawTodos();
});
