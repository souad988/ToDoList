import _ from 'lodash'; //eslint-disable-line
import './style.css';
import { storageAvailable, populateStorage, setInputs } from './modules/localStorage.js';
import Todolist from './modules/crud.js';

const todolist = new Todolist();

if (storageAvailable('localStorage')) {
  console.log('local storage');
  if (!localStorage.getItem('todolist')) {
    populateStorage(todolist.tasks);
  } else {
    todolist.tasks = setInputs();
  }
}

function controleDeleteIcons(descriptionInputs) {
  descriptionInputs.forEach((desc) => {
    desc.addEventListener('click', (e) => {
      const dotIconList = document.querySelectorAll('.fa-ellipsis-v');
      const trushIconList = document.querySelectorAll('.fa-trash-alt');
      dotIconList.forEach((dotIcon) => {
        dotIcon.classList.remove('hide');
        dotIcon.classList.add('show');
      });
      trushIconList.forEach((trushIcon) => {
        trushIcon.classList.remove('show');
        trushIcon.classList.add('hide');
      });

      // console.log('from event listner!!!', e.path[1].querySelector('.fa-trash-alt'));

      const dots = e.path[1].querySelector('.fa-ellipsis-v');
      const trush = e.path[1].querySelector('.fa-trash-alt');
      trush.classList.remove('hide');
      dots.classList.remove('show');
      dots.classList.add('hide');
      trush.classList.add('show');
    });
  });
}

const editTaskDescription = (desc, id, todolist) => {
  todolist.update(desc, id);
  populateStorage(todolist.tasks);
};

const editTaskStatus = (id, todolist) => {
  todolist.checkCompleted(id);
  populateStorage(todolist.tasks);
};

function displayToDoTasks(tasksContainer) {
  tasksContainer.innerHTML = '';
  // Lodash, now imported by this script
  todolist.tasks.forEach((task) => {
    tasksContainer.innerHTML += `<li class="task_row"><form class="task">
    <input class="checkbox" type="checkbox" id="${task.index}" name="task" value="task"${console.log(task.completed)} >
    <input class="description ${task.completed ? 'highlight' : ''}" id="desc${task.index}" value="${task.description}"/>
    <i class="fas fa-trash-alt hide" id="trush${task.index}"></i>
    <i class="fas fa-ellipsis-v show" id="dots${task.index}"></i>
    </form></li>`;
  });
  const removeBtns = document.querySelectorAll('.fa-trash-alt');
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((check) => {
    check.checked = todolist.tasks[parseInt(check.id, 10) - 1].completed;
    check.addEventListener('click', () => {
      const id = check.id.match('d*$').input; //eslint-disable-line
      editTaskStatus(id, todolist);
      document.getElementById(`desc${id}`).classList.toggle('highlight');
    });
  });
  removeBtns.forEach((removeBtn) => {
    if (removeBtn !== null) {
      removeBtn.addEventListener('click', (e) => {
        console.log(e.path[1].querySelector('.checkbox').id);
        todolist.remove(e.path[1].querySelector('.checkbox').id);
        populateStorage(todolist.tasks);
        displayToDoTasks(tasksContainer);
      });
    }
  });
  const descriptionInputs = document.querySelectorAll('.description');
  descriptionInputs.forEach((description) => {
    description.addEventListener('change', (e) => {
      editTaskDescription(e.target.value, e.path[1].querySelector('.checkbox').id, todolist);
    });
  });
  controleDeleteIcons(descriptionInputs);
}

const tasksContainer = document.querySelector('.tasks');
const addTaskForm = document.querySelector('.add_task');
const addTaskInput = document.querySelector('.add_task_input');
const addTaskButton = document.querySelector('.add_task_button');
const clearCompleted = document.querySelector('.clear');
displayToDoTasks(tasksContainer);

addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  displayToDoTasks(tasksContainer);
});

addTaskButton.addEventListener('click', (e) => {
  e.preventDefault();
  todolist.add(addTaskInput.value);
  populateStorage(todolist.tasks);
  displayToDoTasks(tasksContainer);
  addTaskInput.value = '';
});

clearCompleted.addEventListener('click', () => {
  todolist.removeCompleted();
  populateStorage(todolist.tasks);
  displayToDoTasks(tasksContainer);
});
