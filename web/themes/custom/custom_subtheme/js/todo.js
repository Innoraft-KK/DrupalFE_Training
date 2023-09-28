(function ($, Drupal) {
  Drupal.behaviors.todoList = {
    attach: function (context, settings) {
      const taskInput = document.getElementById("taskInput");
      const addTaskButton = document.getElementById("addTask");
      const taskList = document.getElementById("taskList");

      // Load tasks from local storage when the page loads
      loadTasks();

      addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText) {
          // Create a task item with the appropriate CSS classes
          const taskItem = document.createElement("li");
          taskItem.className = "todo-item";
          
          // Create a div for the task text with the appropriate CSS classes
          const taskTextDiv = document.createElement("div");
          taskTextDiv.className = "todo-text";
          taskTextDiv.textContent = taskText;
          taskItem.appendChild(taskTextDiv);

          // Create a delete button with the appropriate CSS classes
          const deleteButton = document.createElement("button");
          deleteButton.className = "todo-delete-button";
          deleteButton.textContent = "Delete";
          taskItem.appendChild(deleteButton);

          // Append the task item to the task list
          taskList.appendChild(taskItem);

          // Clear the input field
          taskInput.value = "";

          // Save tasks to local storage
          saveTasks();

          // Handle task deletion
          deleteButton.addEventListener("click", function () {
            taskItem.remove();
            saveTasks();
          });
        }
      });

      function saveTasks() {
        const tasks = Array.from(taskList.children).map((task) => task.querySelector(".todo-text").textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      function loadTasks() {
        // Clear the task list before loading tasks
        taskList.innerHTML = "";

        const savedTasks = localStorage.getItem("tasks");

        if (savedTasks) {
          const tasks = JSON.parse(savedTasks);

          tasks.forEach((taskText) => {
            // Create a task item with the appropriate CSS classes
            const taskItem = document.createElement("li");
            taskItem.className = "todo-item";

            // Create a div for the task text with the appropriate CSS classes
            const taskTextDiv = document.createElement("div");
            taskTextDiv.className = "todo-text";
            taskTextDiv.textContent = taskText;
            taskItem.appendChild(taskTextDiv);

            // Create a delete button with the appropriate CSS classes
            const deleteButton = document.createElement("button");
            deleteButton.className = "todo-delete-button";
            deleteButton.textContent = "Delete";
            taskItem.appendChild(deleteButton);

            // Append the task item to the task list
            taskList.appendChild(taskItem);

            // Handle task deletion
            deleteButton.addEventListener("click", function () {
              taskItem.remove();
              saveTasks();
            });
          });
        }
      }
    },
  };
})(jQuery, Drupal);
