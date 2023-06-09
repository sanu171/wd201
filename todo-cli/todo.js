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

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n");