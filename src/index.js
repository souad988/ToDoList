import _ from 'lodash';//eslint-disable-line
import './style.css';

const todolist = [
  {
    description: 'exercice',
    completed: false,
    index: 0,
  },
  {
    description: 'do homeWork',
    completed: true,
    index: 1,
  },
  {
    description: 'exercice',
    completed: false,
    index: 2,
  },
  {
    description: 'do homeWork',
    completed: true,
    index: 3,
  },
];

function displayToDoTasks(todolist, tasks) {
  tasks.innerHTML = '';
  // Lodash, now imported by this script
  todolist.forEach((task) => {
    tasks.innerHTML += `<li class="task_row"><form class="task">
    <input type="checkbox" id="${task.index}" name="task" value="task">
    <label for="${task.index}">${task.description}</label>
    <i class="fas fa-trash-alt hide" ></i>
    <i class="fas fa-ellipsis-v show"></i>
    </form></li>`;
  });
}

const tasks = document.querySelector('.tasks');
displayToDoTasks(todolist, tasks);

tasks.addEventListener('click', (e) => {
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
  // dotsList=e.path.filter(item=>)
  const dots = e.target.querySelector('.fa-ellipsis-v');
  const trush = e.target.querySelector('.fa-trash-alt');
  trush.classList.remove('hide');
  dots.classList.remove('show');
  dots.classList.add('hide');
  trush.classList.add('show');
  console.log('entered');
});
