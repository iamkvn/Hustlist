const log = console.log;

let checkboxNum = 0;

// ELEMENTS
const todoForm = document.querySelector('.js-todo__form');
const todoInput = document.querySelector('.js-todo__input');
const todoList = document.querySelector('.js-todo__list');

// FUNCTIONS

const task = (e) => {
  const event = e.target;

  if (event.type === 'checkbox') {
    const task = event.nextElementSibling.nextElementSibling;
    task.classList.toggle('u-complete');
  }

  if (event.classList[0] === 'todo__icon') {
    const item = event.parentElement;
    item.remove();
  }
};

const createTask = (e) => {
  e.preventDefault();
  checkboxNum++;
  const html = `
    <li class="todo__item js-todo__item">
        <input
            class="todo__checkbox js-todo__checkbox"
            id="checkbox-${checkboxNum}"
            type="checkbox"
            hidden
        />
        <label class="todo__checkmark" for="checkbox-${checkboxNum}"></label>
        <p class="todo__task js-todo__task">${todoInput.value}</p>
        <i class="todo__icon fas fa-times"></i>
    </li>
  `;
  todoList.insertAdjacentHTML('beforeend', html);
  todoForm.reset();
  //   const todoCheckbox = document.querySelectorAll('.js-todo__checkbox');
  //   const todoTask = document.querySelector('.js-todo__task');
  const todoItem = document.querySelectorAll('.js-todo__item');
  todoItem.forEach((item) => {
    item.addEventListener('click', task);
  });
};

// EVENT LISTENERS

todoForm.addEventListener('submit', createTask);
