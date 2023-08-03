/* eslint-disable no-undef */

const todoList = require("../todo");

const { all, markAsComplete, add, overdueItems, itemsDueToday, itemsDueLater } =
  todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString("en-CA"),
    });
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
    expect(todoItemsCount).not.toBeNull();
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
    expect(all[0].completed).not.toBeNull();
  });
  test("Checks retrieval of Overdue items", () => {
    expect(overdueItems).not.toBeNull();
  });
  test("Checks retrieval of Duetoday items", () => {
    expect(itemsDueToday).not.toBeNull();
  });
  test("Checks retrieval of Duelater items", () => {
    expect(itemsDueLater).not.toBeNull();
  });
});
