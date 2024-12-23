// script.js

let tasks = []; // Array to store tasks

// Task object constructor
function Task(description, completed = false, dateCompleted = null) {
    this.description = description;
    this.completed = completed;
    this.dateCompleted = dateCompleted;
}

// Add Task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = taskInput.value.trim();
    
    if (!taskDescription) {
        alert('Please enter a valid task!');
        return;
    }
    
    const newTask = new Task(taskDescription);
    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
}

// Render All Tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${task.description} 
                        <button onclick="markAsCompleted(${index})">Mark as Completed</button>
                        <button onclick="deleteTask(${index})">Delete</button>`;
        
        if (task.completed) {
            li.classList.add('completed');
        }
        
        taskList.appendChild(li);
    });
}

// Mark Task as Completed
function markAsCompleted(index) {
    tasks[index].completed = true;
    tasks[index].dateCompleted = new Date().toISOString().split('T')[0]; // Store current date in YYYY-MM-DD format
    renderTasks();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Show Completed Tasks
function showCompletedTasks() {
    const completedTasks = tasks.filter(task => task.completed);
    if (completedTasks.length === 0) {
        alert('No completed tasks!');
        return;
    }
    
    const completedTaskList = document.getElementById('completedTaskList');
    const completedTasksContainer = document.getElementById('completedTasksContainer');
    completedTaskList.innerHTML = '';
    
    completedTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task.description} (Completed on: ${task.dateCompleted})`;
        completedTaskList.appendChild(li);
    });
    
    completedTasksContainer.style.display = 'block';
}

// Sort Tasks by Date (using dropdown)
function sortTasks() {
    const sortOrder = document.getElementById('sortDropdown').value;
    const completedTasks = tasks.filter(task => task.completed);
    
    if (completedTasks.length === 0) {
        alert('No completed tasks to sort!');
        return;
    }

    if (sortOrder === "none") return; // If no sort option is selected, return early

    completedTasks.sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.dateCompleted) - new Date(b.dateCompleted);
        } else if (sortOrder === 'desc') {
            return new Date(b.dateCompleted) - new Date(a.dateCompleted);
        }
    });

    renderSortedTasks(completedTasks);
}

// Filter Completed Tasks by Custom Date
function filterByDate() {
    const filterDate = document.getElementById('filterDate').value;
    const completedTasks = tasks.filter(task => task.completed && task.dateCompleted === filterDate);
    
    const completedTaskList = document.getElementById('completedTaskList');
    completedTaskList.innerHTML = '';
    
    if (completedTasks.length === 0) {
        completedTaskList.innerHTML = '<li>No completed tasks for this date.</li>';
    } else {
        completedTasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `${task.description} (Completed on: ${task.dateCompleted})`;
            completedTaskList.appendChild(li);
        });
    }
}

// Render Sorted Tasks
function renderSortedTasks(sortedTasks) {
    const completedTaskList = document.getElementById('completedTaskList');
    completedTaskList.innerHTML = '';
    
    sortedTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task.description} (Completed on: ${task.dateCompleted})`;
        completedTaskList.appendChild(li);
    });
}
