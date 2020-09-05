const newTodoInputEl = document.getElementById("new-todo");
const newTodoAddButtonEl = document.getElementById("add-todo");
const filterAllButtonEl = document.getElementById("filter-all");
const filterNotDoneButtonEl = document.getElementById("filter-not-done");
const filterDoneButtonEl = document.getElementById("filter-done");
let todoList = [];
let nextId = 0;

newTodoAddButtonEl.addEventListener("click", function () {
  if (newTodoInputEl !== "") {
    addTodo(newTodoInputEl.value);
    newTodoInputEl.value = "";
  }
});

function addTodo(content) {
  todoList.push({
    content: content,
    id: nextId++,
    isComplete: false
  });
}

filterAllButtonEl.addEventListener("click", function () {});

filterNotDoneButtonEl.addEventListener("click", function () {});

filterDoneButtonEl.addEventListener("click", function () {});
