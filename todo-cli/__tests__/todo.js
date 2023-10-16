/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  beforeEach(() => {
    // Clear the todo list before each test
    all.length = 0;
  });

  test("Creating a new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "New todo",
      completed: false,
      dueDate: new Date().toISOString(),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Marking a todo as completed", () => {
    add({
      title: "Todo to be completed",
      completed: false,
      dueDate: new Date().toISOString(),
    });
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Retrieval of overdue items", () => {
    const pastDueDate = new Date();
    pastDueDate.setDate(pastDueDate.getDate() - 1);
    add({
      title: "Overdue todo",
      completed: false,
      dueDate: pastDueDate.toISOString(),
    });

    expect(overdue().length).toBe(1);
  });

  test("Retrieval of due today items", () => {
    const today = new Date();
    today.setDate(today.getDate());
    add({
      title: "Due today todo",
      completed: false,
      dueDate: today.toISOString(),
    });

    expect(dueToday().length).toBe(0);
  });

  test("Retrieval of due later items", () => {
    const futureDueDate = new Date();
    futureDueDate.setDate(futureDueDate.getDate() + 2);
    add({
      title: "Due later todo",
      completed: false,
      dueDate: futureDueDate.toISOString(),
    });

    expect(dueLater().length).toBe(1);
  });
});
