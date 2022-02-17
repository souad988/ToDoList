import Task from './task.js';

export default class Todolist {
  constructor() {
    this.tasks = [];
  }

  add(description) {
    const newTask = new Task(description,this.tasks.length);
    this.tasks.push(newTask);
  }

  update(description,index){
     this.tasks[index].description=description;
  }

  remove(index) {
    this.tasks.splice(index,1);
    for(var i=index;i<this.tasks.length;i++){
        this.tasks[i].index=this.tasks[i].index-1;
    }
  }

  getTasks() {
    return this.tasks;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }
}