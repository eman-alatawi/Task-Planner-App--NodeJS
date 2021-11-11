var readlineSync = require("readline-sync");

console.log("\n == Track Your Tasks Node app ==");

var quit = false;
let tasks = [];

const showCommands = () => {
  const choicedCommand = readlineSync.question(
    "\n A: Add New Task \n R: Remove Task \n L: List Tasks \n Q: Quit \n Enter Your choice: "
  );
  return choicedCommand;
};

const addTask = (newTask) => {
  console.log("== Add New Task ==");
  tasks.push(newTask);
  console.log(`${newTask} Task has been added successfully. `);
  console.log("-----------------------------------------------");
};

const listTasks = () => {
  console.log("== List Tasks ==");

  if (!tasks.length == 0) {
    for (var i = 0; i < tasks.length; i++) {
      console.log(`Task-${i + 1}: ${tasks[i]} `);
    }
  } else {
    console.log("There is no Tasks Yet");
  }
};

const removeTask = () => {
  console.log("== Remove Task ==");
  listTasks();

  const slectedTaskNumber = readlineSync.question(
    "Enter the task number provided from the list: "
  );

  const taskIndex = slectedTaskNumber - 1;

  // console.log(taskIndex);

  const filterdTasks = tasks.filter(
    (task) => tasks.indexOf(task) !== taskIndex
  );
  console.log(`Task ${slectedTaskNumber} has been removed successfully `);

  //    console.log(filterdTasks);
  tasks = filterdTasks;
  console.log(
    `This is the List Of Tasks After Removing Task ${slectedTaskNumber}`
  );
  listTasks();
  console.log("-----------------------------------------------");
};

while (!quit) {
  const choice = showCommands();
  console.log("-----------------------------------------------");
  switch (choice) {
    case "A":
      const newTask = readlineSync.question("Enter the task you want to add: ");
      addTask(newTask);
      break;

    case "R":
      removeTask();
      break;

    case "L":
      listTasks();
      break;

    case "Q":
      quit = true;
      break;
  }
}
