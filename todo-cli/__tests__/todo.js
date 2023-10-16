/* eslint-disable no-undef */
let todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
describe("Todo test cases", () => {
  beforeAll(() => {
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    [
      {
        title: "Complete assignment",
        completed: false,
        dueDate: new Date(today.getTime() - 1 * oneDay).toLocaleDateString(
          "en-CA",
        ),
      },
      {
        title: "Go for shopping",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "Complete project",
        completed: false,
        dueDate: new Date(today.getTime() + 1 * oneDay).toLocaleDateString(
          "en-CA",
        ),
      },
    ].forEach(add);
  });
  test("Add new todo", () => {
    let prevlength = all.length;

    add({
      title: "Take the test",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(prevlength + 1);
  });

  test("Todo mark as complete", () => {
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("Test for overdue", () => {
    const overdueItems = overdue();
    const today = new Date().toISOString().split("T")[0];
    add({
      title: "Overdue Todo",
      completed: false,
      dueDate: new Date(
        new Date(today).getTime() - 1 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString("en-CA"),
    });

    expect(overdue().length).toBe(overdueItems.length + 1);
  });

  test("Test due today", () => {
    const dueTodayItems = dueToday();
    const today = new Date().toISOString().split("T")[0];
    add({
      title: "Due Today Todo",
      completed: false,
      dueDate: today,
    });

    expect(dueToday().length).toBe(dueTodayItems.length + 1);
  });

  test("Test for due later", () => {
    const dueLaterItems = dueLater();
    add({
      title: "Due Later Todo",
      completed: false,
      dueDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    });

    expect(dueLater().length).toBe(dueLaterItems.length + 1);
  });
});
