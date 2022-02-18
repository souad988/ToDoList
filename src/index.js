import _ from 'lodash';//eslint-disable-line
import './style.css';
import { storageAvailable, populateStorage, setInputs } from './modules/localStorage.js';
import Todolist from './modules/crud.js';


const todolist = new Todolist();

if (storageAvailable('localStorage')) {
  console.log('local storage');
  if (!localStorage.getItem('todolist')) {
    populateStorage(todolist.tasks);
  } else {
    todolist.tasks=setInputs();
  }
}

function displayToDoTasks(tasksContainer) {
  tasksContainer.innerHTML = '';
  // Lodash, now imported by this script
  todolist.tasks.forEach((task) => {
    
    tasksContainer.innerHTML += `<li class="task_row"><form class="task">
    <input class="checkbox" type="checkbox" id="${task.index}" name="task" value="task">
    <input class="description" value="${task.description}"/>
    <i class="fas fa-trash-alt hide" ></i>
    <i class="fas fa-ellipsis-v show"></i>
    </form></li>`;
    
  });
  const removeBtns = document.querySelectorAll('.fa-trash-alt');
    
      removeBtns.forEach((removeBtn)=>{
        if(removeBtn!==null){
        removeBtn.addEventListener('click',(e)=>{
        console.log(e.path[1].querySelector('.checkbox').id);
        todolist.remove(e.path[1].querySelector('.checkbox').id);
        populateStorage(todolist.tasks);
        displayToDoTasks(tasksContainer);
      })}});
  const descriptionInputs = document.querySelectorAll('.description');
  controleDeleteIcons(descriptionInputs)
}

const tasksContainer = document.querySelector('.tasks');
const addTaskForm = document.querySelector('.add_task');
const addTaskInput = document.querySelector('.add_task_input');
const addTaskButton = document.querySelector('.add_task_button');

displayToDoTasks( tasksContainer);


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


function controleDeleteIcons(descriptionInputs){
    descriptionInputs.forEach((desc)=>{desc.addEventListener('click', (e) => {
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
    
      console.log('from event listner!!!',e.path[1].querySelector('.fa-trash-alt'));
      
      const dots = e.path[1].querySelector('.fa-ellipsis-v');
      const trush = e.path[1].querySelector('.fa-trash-alt');
      trush.classList.remove('hide');
      dots.classList.remove('show');
      dots.classList.add('hide');
      trush.classList.add('show');
      
    });}); 
}
