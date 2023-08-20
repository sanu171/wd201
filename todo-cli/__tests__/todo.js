/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    // Clear the todo list before each test
    all.length = 0;

    // Add a test todo item with a future due date
    const futureDueDate = new Date();
    futureDueDate.setDate(futureDueDate.getDate() + 1);
    add({
      title: "Test todo",
      completed: false,
      dueDate: futureDueDate.toISOString(),
    });
  });

  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString(),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Checks retrieval of Overdue items", () => {
    const pastDueDate = new Date();
    pastDueDate.setDate(pastDueDate.getDate() - 1);
    add({
      title: "Overdue todo",
      completed: false,
      dueDate: pastDueDate.toISOString(),
    });

    expect(overdue().length).toBe(1);
  });

  test("Checks retrieval of Duetoday items", () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    add({
      title: "Due today todo",
      completed: false,
      dueDate: today.toISOString(),
    });

    expect(dueToday().length).toBe(1);
  });

  test("Checks retrieval of Duelater items", () => {
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
