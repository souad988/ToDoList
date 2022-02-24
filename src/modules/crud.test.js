/**
 * @jest-environment jsdom
 */

import Todolist from './crud';

const myTodolist = new Todolist();

describe('add task correctly', () => {
  test('empty to throw error', () => {
    expect(() => myTodolist.add()).toThrow('you need to add a description');
  });

  test('item added', () => {
    expect(myTodolist.add('todo task')[0].description).toBe('todo task');
  });

  test('tasks length to be 2', () => {
    expect(myTodolist.add('todo task')).toHaveLength(2);
  });

  test('task id to be 3', () => {
    expect(myTodolist.add('todo task')[2].index).toBe(3);
  });

  test('task completed attribute to be false', () => {
    expect(myTodolist.add('todo task')[3].completed).toBe(false);
  });
});

describe('Remove task correctly', () => {
  test('if invalid index', () => {
    expect(() => {
      myTodolist.remove(-1);
    }).toThrow('invalid index!');
  });
  test('if no index provided', () => {
    expect(() => {
      myTodolist.remove();
    }).toThrow('index not provided!');
  });

  test('have the right index', () => {
    expect(myTodolist.remove(3)[2].index).toBe(3);
  });

  test('check if the last task is removed', () => {
    expect(myTodolist.remove(myTodolist.tasks.length)[myTodolist.tasks.length]).toBe(undefined);
  });
});

describe('Update task correctly', () => {
  test('description for second task should be do exercice', () => {
    myTodolist.update('do exercice',2);
    expect(myTodolist.tasks[1].description).toBe('do exercice');
  });
  
  test('if description is not provided should throw error', () => {
    expect(() => {
      myTodolist.update('',2);
    }).toThrow('description not provided!');
  });
});

