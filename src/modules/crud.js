import Task from './task.js';

export default class Todolist {
  constructor() {
    this.tasks = [];
  }

  add(description) {
    const newTask = new Task(description, this.tasks.length + 1);
    this.tasks.push(newTask);
  }

  update(description, index) {
    this.tasks[index].description = description;
  }
  updateIdexes(){
    var i=1;
    this.tasks.map((task)=>{
      task.index=i;
      i+=1;
    })
  }
  remove(index) {
    this.tasks.splice(index-1, 1);
    console.log(index);
    this.updateIdexes();
  }
}