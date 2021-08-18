const log = console.log;

let checkboxNum = 0;
let itemsLeft = 0;

//NOTES
//if input is empty handle it
//DRAG AND DROP MESSAGE DOESNT MOVE DOWN WHEN TODO LIST IS GETTING FULL

//========================= ELEMENTS ============================//
const todoForm = document.querySelector('.js-todo__form');
const todoInput = document.querySelector('.js-todo__input');
const todoList = document.querySelector('.js-todo__list');
const todoItemsLeft = document.querySelector('.js-todo__items-left');
const todoFilter = document.querySelector('.todo__filter');
const filter = document.querySelector('.filter');
const message = document.querySelector('.message');

//========================= FUNCTIONS ============================//

const updateItemsLeft = () => {
  todoItemsLeft.textContent = `${itemsLeft} items left`;

  itemsLeft === 0
    ? todoFilter.classList.add('u-display')
    : todoFilter.classList.remove('u-display');

  itemsLeft === 1
    ? (todoItemsLeft.textContent = `${itemsLeft} item left`)
    : `${itemsLeft} items left`;
};

const display = () => {
  todoFilter.classList.remove('u-display');
  filter.classList.remove('u-display');
  message.classList.add('u-display');
};

const completeTask = (event) => {
  if (event.type === 'checkbox') {
    const task = event.nextElementSibling.nextElementSibling;
    task.classList.toggle('u-complete');
  }
};

const deleteTask = (event) => {
  if (event.classList[0] === 'todo__icon') {
    const item = event.parentElement;
    item.remove();
    itemsLeft--;
    updateItemsLeft();
  }

  if (itemsLeft === 0) {
    message.classList.remove('u-display');
  }
};

const task = (e) => {
  const event = e.target;
  completeTask(event);
  deleteTask(event);
};

const createTask = (e) => {
  e.preventDefault();
  itemsLeft++;

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

  const todoItem = document.querySelectorAll('.js-todo__item');
  todoItem.forEach((item) => {
    item.addEventListener('click', task);
  });
  updateItemsLeft();

  if (itemsLeft === 1) {
    display();
  }
};

//========================= EVENT LISTENERS ============================//

todoForm.addEventListener('submit', createTask);
