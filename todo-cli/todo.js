/* eslint-disable no-undef */
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const today = new Date().toISOString().split("T")[0];
    const overdueItems = all.filter((todo) => todo.dueDate < today);
    return overdueItems;
  };

  const dueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    const itemsDueToday = all.filter((todo) => todo.dueDate === today);
    return itemsDueToday;
  };

  const dueLater = () => {
    const today = new Date().toISOString().split("T")[0];
    const itemsDueLater = all.filter((todo) => todo.dueDate > today);
    return itemsDueLater;
  };

  const toDisplayableList = (list) => {
    let output = "";
    for (let i = 0; i < list.length; i++) {
      const todo = list[i];
      const status = todo.completed ? "x" : " ";
      if (i === list.length - 1) {
        if (todo.dueDate === today) {
          output += `[${status}] ${todo.title}`;
        } else {
          output += `[${status}] ${todo.title} ${todo.dueDate}`;
        }
      } else {
        if (todo.dueDate === today) {
          output += `[${status}] ${todo.title}\n`;
        } else {
          output += `[${status}] ${todo.title} ${todo.dueDate}\n`;
        }
      }
    }
    return output;
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
