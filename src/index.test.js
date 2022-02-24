/**
 * @jest-environment jsdom
 */

import Todolist from './modules/crud.js';
import { populateStorage, setInputs } from './modules/localStorage.js';
import LocalStorageMock from '../__mocks__/localstorage.js';

global.localStorage = new LocalStorageMock();

const myTodolist = new Todolist();
const Body = document.body;
Body.innerHTML = '';
const task = {
  description: 'task',
  index: 1,
  completed: false,
};

// The same functions of the index.js just instead of importing it we created it here
// to prevent importing the styles, which give an error.
const editTaskDescription = (desc, id, todolist) => {
  todolist.update(desc, id);
  populateStorage(todolist.tasks);
};

const editTaskStatus = (id, todolist) => {
  todolist.checkCompleted(id);
  populateStorage(todolist.tasks);
};

test('add One Task to DOM using add() func', () => {
  myTodolist.add(task.description);

  myTodolist.tasks.forEach(() => {
    Body.innerHTML += '<li></li>';
  });
  expect(Body.innerHTML).toBe('<li></li>');
});

test('Remove One Task DOM using remove() func', () => {
  myTodolist.remove(1);
  if (myTodolist.tasks.length === 0) {
    Body.innerHTML = '';
  }
  expect(Body.innerHTML).toBe('');
});

describe('Test local storage', () => {
  test('Edit a Task description and check localstorage', () => {
    myTodolist.add(task.description);
    editTaskDescription('desc', 1, myTodolist);
    expect(setInputs()[0].description).toBe('desc');
  });

  test('Edit a Task description and check DOM', () => {
    editTaskDescription('desc', 1, myTodolist);
    myTodolist.tasks.forEach((task) => {
      Body.innerHTML += `<li>${task.description}</li>`;
    });
    expect(Body.innerHTML).toBe('<li>desc</li>');
  });
});

describe('Test check status', () => {
  test('Check if the Task is checked (have value of true)', () => {
    editTaskStatus(1, myTodolist);
    expect(setInputs()[0].completed).toBe(true);
  });
  test('Check if the Task is not checked (have value of false)', () => {
    editTaskStatus(1, myTodolist);
    expect(setInputs()[0].completed).toBe(false);
  });
});

describe('Test clear all completed ', () => {
  test('Should not remove uncompleted tasks ', () => {
    myTodolist.add('do exercice');
    myTodolist.add('learn js');
    myTodolist.removeCompleted();
    populateStorage(myTodolist.tasks);
    setInputs().forEach((task) => expect(task.completed).toBe(false));
  });

  test('Should remove all checked tasks ', () => {
    // edit all tasks as completed
    myTodolist.tasks.forEach((task) => editTaskStatus(task.index, myTodolist));
    myTodolist.removeCompleted();
    populateStorage(myTodolist.tasks);
    expect(setInputs().length).toBe(0);
  });
});
