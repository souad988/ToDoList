import { populateStorage, setInputs } from './localStorage.js';

const todo = 'add';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

describe('populate storage tests', () => {
  test('populate storage', () => {
    expect(() => populateStorage()).toThrow('no argument given');
  });

  test('populate storage', () => {
    populateStorage(todo);
    expect(JSON.parse(localStorage.getItem('todolist'))).toBe('add');
  });
});

describe('get local storage tests', () => {
  test('setinput function', () => {
    expect(setInputs()).toBe('add');
  });
});
