import { populateStorage, setInputs } from './localStorage.js';
import LocalStorageMock from '../../__mocks__/localstorage.js';

const todo = 'add';

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
