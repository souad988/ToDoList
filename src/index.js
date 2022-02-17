import _ from 'lodash';
import './style.css';

let todolist = [
  {description :'exercice',
  completed :false,
  index: 0,
  },
  {
    description :'do homeWork',
    completed :true,
    index: 1,
  },
  {description :'exercice',
  completed :false,
  index: 0,
  },
  {
    description :'do homeWork',
    completed :true,
    index: 1,
  },
];

function displayToDoTasks(todolist,tasks) {
  tasks.innerHTML =``;
  // Lodash, now imported by this script
  todolist.forEach(task => {
    tasks.innerHTML +=`<li><form class="task">
    <input type="checkbox" id="${task.index}" name="task" value="task">
    <label for="${task.index}">${task.description}</label>
    <i class="fas fa-trash-alt"></i>
    </form></li>`;
  });
}

const tasks = document.querySelector('.tasks');
displayToDoTasks(todolist,tasks);