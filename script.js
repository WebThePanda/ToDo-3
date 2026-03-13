const input = document.getElementById('task-input');
const btn = document.getElementById('add-btn');
const list = document.getElementById('task-list');
const counter = document.getElementById('counter');


btn.addEventListener('click', function() {
    addTask();
});

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
})

function addTask() {
    const text = input.value.trim();
    if (text === '') return;
    

    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');
    
    span.textContent = text;
    span.className = "list-object";
    span.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasks();
        updateCounter();
    });

    deleteBtn.textContent = "X";
    deleteBtn.addEventListener('click', function() {
        li.remove();
        saveTasks();
        updateCounter();
    });

    li.appendChild(span)
    li.appendChild(deleteBtn)
    list.appendChild(li);
    saveTasks();
    updateCounter();
    
    input.value = '';
}

function updateCounter() {
    var total = document.querySelectorAll('#task-list li').length;
    var completed = document.querySelectorAll('#task-list li.completed').length;
    counter.textContent = completed + '/' + total;
}

function saveTasks() {
    console.log("Hei")
    var tasks = [];

    document.querySelectorAll('#task-list li').forEach(function(li) {
        var taskText = '';
        if (li.querySelector('span')) {
            taskText = li.querySelector('span').textContent;
        } else {
            taskText = li.firstChild.textContent;
        }

        tasks.push({
            text: taskText,
            completed: li.classList.contains('completed')
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var saved = localStorage.getItem('tasks');
    if (saved) {
        var tasks = JSON.parse(saved);
        tasks.forEach(function(task) {
            console.log(task)
            const li = document.createElement('li');
            const span = document.createElement('span');
            const deleteBtn = document.createElement('button');
            
            span.textContent = task.text;
            span.className = "list-object";

            deleteBtn.textContent = "X";
            deleteBtn.addEventListener('click', function() {
                li.remove();
                saveTasks();
                updateCounter();
            });

            span.addEventListener('click', function() {
                li.classList.toggle('completed');
                saveTasks();
                updateCounter();
            });

            if (task.completed) {
                li.classList.toggle('completed');
            }

            li.appendChild(span);
            li.appendChild(deleteBtn);
            list.appendChild(li);
            
        })
    }
}

loadTasks();
updateCounter();