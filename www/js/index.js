window.onload = function () {
  const taskContainer = document.getElementById("tasks");
  const tasksDoneContainer = document.getElementById("tasks-done");
  const addTaskButton = document.getElementById("add-task");
  const reset = document.getElementById("reset");
  const taskField = document.getElementById("task-field");
  const form = document.getElementById("task-form");
  const tasksOnProgress = [];
  const tasksDone = [];

  const addRemooveEventListner = function (taskElement) {
    $(taskElement).on("swipeleft", function () {
      $(taskElement).hide("slow", function () {
        const taskId = taskElement.getAttribute("id");
        deleteTask(taskId);
        refreshTaskLists();
      });
    });
  }

  const deleteTask = function (taskId) {
    const isOnProgress = tasksOnProgress.some(task => task.id === taskId);
    const isDone = tasksDone.some(task => task.id === taskId);

    if (isOnProgress) {
      const taskIndex = tasksOnProgress.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        tasksOnProgress.splice(taskIndex, 1);
      }
    }
    else if (isDone) {
      const taskIndex = tasksDone.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        tasksDone.splice(taskIndex, 1);
      }
    }
  }

  const addMarkAsDoneEventListner = function (taskElement) {
    $(taskElement).on("swiperight", function () {
      const taskId = taskElement.getAttribute("id");
      const isOnProgress = tasksOnProgress.some(task => task.id === taskId);
      const isDone = tasksDone.some(task => task.id === taskId);

      if (isOnProgress) {
        markAsDone(taskId);
      }
      else if (isDone) {
        markAsOnProgress(taskId);
      }
      refreshTaskLists();
    });
  }

  const createTaskElement = function (task) {
    const taskElement = document.createElement("li");
    taskElement.className = "task";
    taskElement.innerHTML = task.task;
    taskElement.setAttribute("id", task.id);
    addRemooveEventListner(taskElement);
    addMarkAsDoneEventListner(taskElement);

    return taskElement;
  }

  const saveTask = function (task) {
    const taskId = Math.random().toString(36).slice(2, 11);
    tasksOnProgress.push({ id: taskId, task: task, status: "on-progress" });
    console.log("Created task: ", taskId, task);
  }

  const markAsDone = function (taskId) {
    const taskIndex = tasksOnProgress.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const task = tasksOnProgress[taskIndex];
      tasksDone.push({ id: task.id, task: task.task, status: "done" });
      tasksOnProgress.splice(taskIndex, 1);
    }
  }

  const markAsOnProgress = function (taskId) {
    const taskIndex = tasksDone.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const task = tasksDone[taskIndex];
      tasksOnProgress.push({ id: task.id, task: task.task, status: "on-progress" });
      tasksDone.splice(taskIndex, 1);
    }
  }

  const refreshTaskLists = function () {
    taskContainer.innerHTML = "";
    tasksDoneContainer.innerHTML = "";

    tasksOnProgress.forEach(task => {
      const taskElement = createTaskElement(task);
      taskContainer.appendChild(taskElement);
    });

    tasksDone.forEach(task => {
      const taskElement = createTaskElement(task);
      tasksDoneContainer.appendChild(taskElement);
    });

    $(tasksDoneContainer).listview("refresh");
    $(taskContainer).listview("refresh");
  }

  addTaskButton.addEventListener("click", function () {
    const newTask = taskField.value.trim();
    if (newTask) {
      saveTask(newTask);
      refreshTaskLists();
    }
  });

  reset.addEventListener("click", function () {
    tasksOnProgress.length = 0;
    tasksDone.length = 0;
    taskField.value = "";
    taskField.focus();
    refreshTaskLists();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
  });
}
