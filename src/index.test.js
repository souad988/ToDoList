/**
 * @jest-environment jsdom
 */

import Todolist from './modules/crud.js';

const myTodolist = new Todolist();
const Body = document.body;
Body.innerHTML = '';
const task = {
  description: 'task',
  index: 1,
  completed: false,
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
