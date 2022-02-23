import Task from './task.js';

export default class Todolist {
  constructor() {
    this.tasks = [];
  }

  add(description) {
    if(description===undefined){
      throw new Error("you need to add a description");
    }else {
      const newTask = new Task(description, this.tasks.length + 1);
      this.tasks.push(newTask);
      return this.tasks;
    }
  }

  update(description, index) {
    this.tasks[index - 1].description = description;
  }

  checkCompleted(index) {
    this.tasks[index - 1].completed = !this.tasks[index - 1].completed;
  }

  updateIdexes() {
    let i = 1;
    this.tasks.map((task) => {
      task.index = i;
      i += 1;
      return task;
    });
  }

  remove(index) {
    this.tasks.splice(index - 1, 1);
    this.updateIdexes();
  }

  removeCompleted() {
    this.tasks = this.tasks.filter((task) => task.completed === false);
    this.updateIdexes();
  }
}