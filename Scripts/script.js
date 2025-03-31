const form = document.querySelector('form');
const input = document.getElementById('todo-input');
const ulList = document.getElementById('todo-list');

let allTodos = loadLocal();
updateList();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});

function addTodo() {
  const inputText = input.value.trim();
  if (inputText) {  
    const todoObject = {
      text: inputText,
      completed: false,
    };
    allTodos.push(todoObject);
    input.value = '';
    updateList();
    saveLocal();
  };
};

function updateList() {
  ulList.innerHTML = '';
  allTodos.forEach((todo, index) => {
    let item = createTodoLi(todo, index);
    ulList.append(item);
  });
};

function createTodoLi(todo, index) {
  const li = document.createElement('li');
  li.className = 'todo';

  li.innerHTML = `
    <input type="checkbox" id="todo-${index}">

    <label class="custom-checkbox" for="todo-${index}">
      <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
      </svg>
    </label>

    <label for="todo-${index}" class="todo-text">
      ${todo.text}
    </label>

    <button class="delete-button">
      <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
      </svg>
    </button>
  `;

  const deleteButton = li.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    deleteItem(index);
  });

  const checkbox = li.querySelector('input')
  checkbox.addEventListener('change', () => {
    allTodos[index].completed = checkbox.checked;
    saveLocal();
  });
  
  checkbox.checked = todo.completed
  return li;
};

function deleteItem(index) {
  allTodos = allTodos.filter((_, i) => i !== index);
  saveLocal();
  updateList();
};

function saveLocal() {
  const json = JSON.stringify(allTodos);
  localStorage.setItem('todos', json);
};

function loadLocal() {
  const todos = localStorage.getItem('todos') || "[]";
  return JSON.parse(todos);
};