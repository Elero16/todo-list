document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const totalTasks = document.getElementById('total-tasks');
    const clearAllBtn = document.getElementById('clear-all');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                <span class="task-text">${task.text}</span>
                <button class="delete-btn" data-index="${index}">×</button>
            `;
            
            taskList.appendChild(taskItem);
        });
        
        totalTasks.textContent = `${tasks.length} ${getTaskWord(tasks.length)}`;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function getTaskWord(count) {
        if (count % 10 === 1 && count % 100 !== 11) return 'задача';
        if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'задачи';
        return 'задач';
    }
    
    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    }
    
    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }
    
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }
    
    function clearAllTasks() {
        if (confirm('Вы уверены, что хотите удалить все задачи?')) {
            tasks = [];
            renderTasks();
        }
    }
    
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    
    clearAllBtn.addEventListener('click', clearAllTasks);
    
    taskList.addEventListener('click', (e) => {
        if (e.target.matches('input[type="checkbox"]')) {
            toggleComplete(parseInt(e.target.dataset.index));
        } else if (e.target.matches('.delete-btn')) {
            deleteTask(parseInt(e.target.dataset.index));
        }
    });
    
    renderTasks();
});
