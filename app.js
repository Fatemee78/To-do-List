const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')


loadEventListener();

function loadEventListener(){
    // Dom Loaad Eveent
    document.addEventListener('DOMContentLoaded', getTasks)
    // add list
    form.addEventListener('submit', addTask)
    // remove list
    taskList.addEventListener('click', removeTask)
    // clear task event
    clearBtn.addEventListener('click', clearTask)
    // filter
    filter.addEventListener('keyup', filterTask)
}
// Add Task
function addTask(e){
    if(taskInput === ''){
        alert("add a task")
    }
    // create elememnt
    const li = document.createElement('li')
    li.className = 'collection-item'

    // create text node and append to child
    li.appendChild(document.createTextNode(taskInput.value))

    // create a tag
    const link = document.createElement('a')
    link.className= "delete-item secondary-content"

    // add icon
    link.innerHTML = `<i class="fa fa-remove"></i>`

    li.appendChild(link)

    // append li to ul
    taskList.appendChild(li)

    // storage
    storeTaskInLocalStorage(taskInput.value);


    // clear input
    taskInput.value = ''; 

    e.preventDefault()
}

// store task

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// getTasks

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
         // create elememnt
     const li = document.createElement('li')
     li.className = 'collection-item'
 
     // create text node and append to child
     li.appendChild(document.createTextNode(task))
 
     // create a tag
     const link = document.createElement('a')
     link.className= "delete-item secondary-content"
 
     // add icon
     link.innerHTML = `<i class="fa fa-remove"></i>`
 
     li.appendChild(link)
 
     // append li to ul
     taskList.appendChild(li)
 
    })
    
}
// remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You sure?')){
           e.target.parentElement.parentElement.remove()
            // remove from ls
            removeTaskFromLs(e.target.parentElement.parentElement)
        }
    }
    console.log(e.target)

}

// ClearTask

function clearTask(){
    // taskList.innerHTML = ''

    // faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
    clearTasksFromLs();
}


// remove from ls
function removeTaskFromLs(taskItem){
    // console.log(taskItem)
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// clear Tasks
function clearTasksFromLs(){
    localStorage.clear();
}

// filterTask
function filterTask(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        }else{
            task.style.display = 'none'

        }
    })
    // console.log(text)  
}