const log = console.log;

let checkboxNum = 0;
let itemsLeft = 0;
let active = false;
let completed = false;

//NOTES
//fix the items left depending on the button selected
//fix the corner of the top item

//========================= ELEMENTS ============================//
const todoForm = document.querySelector('.js-todo__form');
const todoInput = document.querySelector('.js-todo__input');
const todoList = document.querySelector('.js-todo__list');
const todoItemsLeft = document.querySelector('.js-todo__items-left');
const todoFilter = document.querySelector('.todo__filter');
const filters = document.querySelectorAll('.filter');
const message = document.querySelector('.message');
const buttons = document.querySelectorAll('.button');

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

  filters.forEach((filter) => {
    filter.classList.remove('u-display');
  });
  //   filters.classList.remove('u-display');
  message.classList.add('u-display');
};

const completeTask = (event) => {
  if (event.type === 'checkbox') {
    const task = event.nextElementSibling.nextElementSibling;
    task.classList.toggle('u-complete');

    if (!event.checked && completed) {
      setTimeout(() => {
        event.parentElement.classList.add('u-display');
      }, 600);
    }
    if (event.checked && active) {
      setTimeout(() => {
        event.parentElement.classList.add('u-display');
      }, 600);
    }
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
    filters.forEach((filter) => {
      filter.classList.add('u-display');
    });
  }
};

const task = (e) => {
  const event = e.target;
  completeTask(event);
  deleteTask(event);
};

const validateInput = (e) => {
  e.preventDefault();

  if (!todoInput.value) {
    alert('Cannot leave field empty. Enter a todo');
  }
  if (todoInput.value) {
    createTask();
  }
};

const createTask = () => {
  //   e.preventDefault();

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

const completeBtn = () => {
  completed = true;
  active = false;

  let items = todoList.children;
  for (item of items) {
    item.firstElementChild.checked
      ? item.classList.remove('u-display')
      : item.classList.add('u-display');
  }
};

const activeBtn = () => {
  active = true;
  completed = false;

  let items = todoList.children;
  for (item of items) {
    !item.firstElementChild.checked
      ? item.classList.remove('u-display')
      : item.classList.add('u-display');
  }
};

const allBtn = () => {
  active = false;
  completed = false;
  let items = todoList.children;
  for (item of items) {
    item.classList.remove('u-display');
  }
};

const todoButtons = (e) => {
  if (e.target.textContent === 'Completed') {
    completeBtn();
  }
  if (e.target.textContent === 'Active') {
    activeBtn();
  }
  if (e.target.textContent === 'All') {
    allBtn();
  }
};

//========================= EVENT LISTENERS ============================//

todoForm.addEventListener('submit', validateInput);
buttons.forEach((button) => {
  button.addEventListener('click', todoButtons);
});
