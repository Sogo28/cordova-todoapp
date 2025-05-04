window.onload = function () {
  const taskContainer = document.getElementById("tasks");
  const addTaskButton = document.getElementById("add-task");
  const reset = document.getElementById("reset");
  const taskField = document.getElementById("task-field");

  const addRemooveEventListner = function (taskElement) {
    $(taskElement).on("swipeleft", function () {
      $(taskElement).hide("slow", function () {
        $(taskElement).remove();
      });
    });
  }

  const addMarkAsDoneEventListner = function (taskElement) {
    $(taskElement).on("swiperight", function () {
      $(taskElement).toggleClass("done");
    });
  }

  const createTaskElement = function (task) {
    const taskElement = document.createElement("li");
    taskElement.className = "task";
    taskElement.innerHTML = task;
    addRemooveEventListner(taskElement);
    addMarkAsDoneEventListner(taskElement);

    return taskElement;
  }

  addTaskButton.addEventListener("click", function () {
    const newTask = taskField.value.trim();
    if (newTask) {
      const taskElement = createTaskElement(newTask);
      taskContainer.appendChild(taskElement);
      $(taskContainer).listview("refresh");
    }
  });
}
