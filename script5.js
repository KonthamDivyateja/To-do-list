const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

const createNewTask = (taskText) => {
    const listItem = document.createElement('li');
    listItem.className = 'flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm transition duration-200 hover:shadow-md border-l-4 border-blue-400 group';
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.className = 'text-gray-700 flex-grow mr-4 break-words'; 

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex space-x-2 flex-shrink-0';
    
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.className = 'complete-btn text-xs font-semibold py-1 px-2 rounded-full bg-green-200 text-green-700 hover:bg-green-300 transition duration-150';
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn text-xs font-semibold py-1 px-2 rounded-full bg-red-200 text-red-700 hover:bg-red-300 transition duration-150';

    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(deleteButton);
    listItem.appendChild(taskSpan);
    listItem.appendChild(buttonContainer);
    
    return listItem;
};

const handleAddTask = () => {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        taskInput.classList.add('border-red-500', 'ring-red-500');
        setTimeout(() => {
            taskInput.classList.remove('border-red-500', 'ring-red-500');
        }, 1000);
        return;
    }

    const placeholder = taskList.querySelector('.bg-blue-50');
    if (placeholder) {
        taskList.removeChild(placeholder);
    }

    const newTask = createNewTask(taskText);
    taskList.appendChild(newTask);

    taskInput.value = '';
    taskList.scrollTop = taskList.scrollHeight;
};

const handleTaskActions = (event) => {
    const target = event.target;
    
    const listItem = target.closest('li');
    if (!listItem) return; 

    if (target.classList.contains('delete-btn')) {
        taskList.removeChild(listItem);
        
        if (taskList.children.length === 0) {
             taskList.innerHTML = '<li class="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm text-center">Your tasks will appear here.</li>';
        }
    } 
    else if (target.classList.contains('complete-btn')) {
        const taskSpan = listItem.querySelector('span');
        
        taskSpan.classList.toggle('completed-task');
        
        if (taskSpan.classList.contains('completed-task')) {
            target.textContent = 'Undo';
            listItem.style.borderLeftColor = '#10b981';
        } else {
            target.textContent = 'Complete';
            listItem.style.borderLeftColor = '#60a5fa';
        }
    }
};