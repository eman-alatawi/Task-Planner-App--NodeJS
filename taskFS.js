var readlineSync = require("readline-sync");
const fs = require("fs");
const { Console } = require("console");
let tasksArr = null;
var quit = false;

let counter = 1;

console.log("\n == Track Your Tasks Node app ==");

const showCommands = () => {
  const choicedCommand = readlineSync.question(
    "\n A: Add New Task \n R: Remove Task \n L: List Tasks \n Q: Quit \n Enter Your choice: "
  );
  return choicedCommand;
};

const fetchTasks = () => {
  try {
    var tasksString = fs.readFileSync("tasks.json");
    return JSON.parse(tasksString);
  } catch (e) {
    return [];
  }
};

const addTask = (title) => {
  console.log("== Add New Task ==");

  var tasks = fetchTasks();
  var task = {
    title,
  };

  var duplicateTasks = tasks.filter((task) => task.title === title);

  if (duplicateTasks.length === 0) {
    tasks.push(task);
    fs.writeFileSync("tasks.json", JSON.stringify(tasks));
    console.log(`${title} Task has been added successfully. `);
    listTasks();
    console.log("-----------------------------------------------");
  } else {
    console.log(`${title} already added`);
  }
};

const listTasks = () => {
  console.log("== List Tasks ==");

  const fetchedTasks = fetchTasks();
  //   console.log(fetchedTasks)

  for (let task of fetchedTasks) {
    console.log(task.title);
  }
};

const removeTask = () => {
  console.log("== Remove Task ==");
  listTasks();
  const title = readlineSync.question("Enter the task you want to Delete: ");

  var tasks = fetchTasks();
  const filterdTasks = tasks.filter((task) => task.title !== title);

  fs.writeFileSync("tasks.json", JSON.stringify(filterdTasks));
  console.log(`${title} Task has been removed successfully `);

  console.log(`This is the List Of Tasks After Removing ${title} Task`);
  listTasks();
  console.log("-----------------------------------------------");
};


const quitFun = (fd) =>{
    quit = true;
    fs.close(fd, (err) => {
        if (err) {
            console.log("Error while closig a file " + err)

        } else {
            console.log("Bye Bye See You Next Time")
        }
    })
}

fs.open("tasks.json", "r+", (err, fd) => {
  if (err) {
    console.log("Error while opening a file " + err);
  }

  while (!quit) {
    const choice = showCommands();
    console.log("-----------------------------------------------");
    switch (choice) {
      case "A":
        const title = readlineSync.question("Enter the task you want to add: ");
        addTask(title);
        break;

      case "R":
        removeTask();
        break;

      case "L":
        listTasks();
        break;

      case "Q":
          quitFun(fd)
        
        break;
    }
  }
});
