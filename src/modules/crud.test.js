import Todolist from "./crud";

const myTodolist = new Todolist();

describe('add task correctly', () => {
test('empty to throw error', () => {
    expect(
    () => myTodolist.add()).toThrow("you need to add a description");
});

test('item added', () => {
    expect(
        myTodolist.add('todo task')[0].description).toBe("todo task");
    
});

test('tasks length to be 1', () => {
    expect(
        myTodolist.add('todo task')).toHaveLength(2);
    
}); 

test('task id to be 3', () => {
    expect(
        myTodolist.add('todo task')[2].index).toBe(3);
    
});

test('task completed attribute to be false', () => {
    expect(
        myTodolist.add('todo task')[3].completed).toBe(false);
    
});
});

